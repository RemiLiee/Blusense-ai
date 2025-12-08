import { NextRequest, NextResponse } from 'next/server';
import { USE_MOCK } from '@/lib/config';
import { database } from '@/lib/database';
import { getDummySensorData } from '@/lib/sim';

// Mark as dynamic route
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { siteId: string } }
) {
  try {
    const siteId = params.siteId;

    if (USE_MOCK) {
      // Return mock data
      const mockData = getDummySensorData();
      
      return NextResponse.json({
        success: true,
        site_id: siteId,
        timestamp: mockData.timestamp,
        sensors: {
          energy: {
            value: mockData.energy,
            unit: 'kWh',
            sensor_id: 'energy-001',
          },
          flow: {
            value: mockData.flow,
            unit: 'm³/h',
            sensor_id: 'flow-001',
          },
          oxygen: {
            value: mockData.o2,
            unit: '%',
            sensor_id: 'o2-001',
          },
          temperature: {
            value: mockData.temp,
            unit: '°C',
            sensor_id: 'temp-001',
          },
        },
        source: 'mock',
      });
    }

    // Live data from database
    const endTime = Date.now();
    const startTime = endTime - 5 * 60 * 1000; // Last 5 minutes

    const readings = await database.getSensorReadings(siteId, startTime, endTime, 100);

    if (readings.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No sensor data found for this site',
          site_id: siteId,
        },
        { status: 404 }
      );
    }

    // Get latest reading for each sensor type
    const latestByType = new Map<string, any>();
    
    readings.forEach(reading => {
      const existing = latestByType.get(reading.sensor_type);
      if (!existing || reading.timestamp > existing.timestamp) {
        latestByType.set(reading.sensor_type, reading);
      }
    });

    // Build response
    const sensors: Record<string, any> = {};
    latestByType.forEach((reading, type) => {
      sensors[type] = {
        value: reading.value,
        unit: reading.unit,
        sensor_id: reading.sensor_id,
      };
    });

    return NextResponse.json({
      success: true,
      site_id: siteId,
      timestamp: Math.max(...Array.from(latestByType.values()).map(r => r.timestamp)),
      sensors,
      source: 'live',
    });
  } catch (error) {
    console.error('Error fetching latest site data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch site data',
        site_id: params.siteId,
      },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';
import { optimizationEngine } from '@/lib/optimization';

// Mark as dynamic route (API routes are always dynamic)
export const dynamic = 'force-dynamic';

interface SensorReading {
  id: string;
  type: string;
  value: number;
  unit: string;
}

interface IngestRequest {
  gateway_id: string;
  timestamp: string | number;
  sensors: SensorReading[];
}

export async function POST(request: NextRequest) {
  try {
    const body: IngestRequest = await request.json();
    
    // Validate incoming data structure
    if (!body.gateway_id || !body.timestamp || !body.sensors || !Array.isArray(body.sensors)) {
      return NextResponse.json(
        { error: 'Invalid sensor data format. Expected: { gateway_id, timestamp, sensors[] }' },
        { status: 400 }
      );
    }

    // Validate API key (in production, check against database)
    const apiKey = request.headers.get('X-API-Key');
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required. Include X-API-Key header.' },
        { status: 401 }
      );
    }

    const timestamp = typeof body.timestamp === 'string' ? parseInt(body.timestamp) : body.timestamp;

    // Store each sensor reading in database
    const savedReadings = [];
    for (const sensor of body.sensors) {
      const reading = {
        id: `${body.gateway_id}-${sensor.id}-${timestamp}`,
        gateway_id: body.gateway_id,
        sensor_id: sensor.id,
        sensor_type: sensor.type as any,
        value: sensor.value,
        unit: sensor.unit,
        timestamp: timestamp,
      };
      
      await database.saveSensorReading(reading);
      savedReadings.push(reading);
    }

    // Process data for optimization and alerts
    const sensorData = {
      timestamp,
      energy: savedReadings.find(r => r.sensor_type === 'energy')?.value || 0,
      flow: savedReadings.find(r => r.sensor_type === 'flow')?.value || 0,
      oxygen: savedReadings.find(r => r.sensor_type === 'oxygen')?.value || 0,
      temperature: savedReadings.find(r => r.sensor_type === 'temperature')?.value || 0,
    };

    // Get historical data for analysis
    const historical = await database.getSensorReadings(body.gateway_id, timestamp - 24 * 60 * 60 * 1000, timestamp);
    const historicalData = historical.map(r => ({
      timestamp: r.timestamp,
      energy: r.sensor_type === 'energy' ? r.value : 0,
      flow: r.sensor_type === 'flow' ? r.value : 0,
      oxygen: r.sensor_type === 'oxygen' ? r.value : 0,
      temperature: r.sensor_type === 'temperature' ? r.value : 0,
    }));

    // Run optimization analysis
    const analysis = optimizationEngine.analyzeEnergyConsumption([...historicalData, sensorData]);
    const recommendations = optimizationEngine.generateRecommendations(sensorData, historicalData);

    // Save recommendations as alerts if high priority
    for (const rec of recommendations.filter(r => r.priority === 'high')) {
      await database.saveAlert({
        id: `alert-${timestamp}-${rec.id}`,
        type: rec.type === 'maintenance' ? 'warning' : 'info',
        message: rec.title + ': ' + rec.description,
        sensor_type: rec.type,
        timestamp,
        resolved: false,
      });
    }

    // Log successful ingestion
    console.log('Sensor data ingested and processed:', {
      gateway_id: body.gateway_id,
      timestamp,
      sensors_received: body.sensors.length,
      potential_savings: analysis.potentialSavings.toFixed(1) + '%',
      savings_amount: analysis.savingsAmount.toFixed(0) + ' NOK/mnd',
    });

    return NextResponse.json({
      status: 'ok',
      message: 'Data ingested and analyzed successfully',
      gateway_id: body.gateway_id,
      timestamp: Date.now(),
      sensors_received: body.sensors.length,
      analysis: {
        potentialSavings: analysis.potentialSavings,
        savingsAmount: analysis.savingsAmount,
        recommendationsCount: recommendations.length,
      },
    });
  } catch (error) {
    console.error('Error ingesting sensor data:', error);
    return NextResponse.json(
      { error: 'Failed to ingest sensor data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return mock data for testing
  const { getDummySensorData } = await import('@/lib/sim');
  const mockData = getDummySensorData();

  return NextResponse.json({
    success: true,
    data: mockData,
    message: 'Mock sensor data generated',
  });
}


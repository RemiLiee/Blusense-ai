import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';
import { optimizationEngine } from '@/lib/optimization';
import { maintenanceEngine } from '@/lib/maintenance';

// Mark as dynamic route (API routes are always dynamic)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gatewayId = searchParams.get('gateway_id');
    
    if (!gatewayId) {
      return NextResponse.json(
        { error: 'gateway_id parameter required' },
        { status: 400 }
      );
    }

    // Get last 24 hours of data
    const endTime = Date.now();
    const startTime = endTime - 24 * 60 * 60 * 1000;

    const readings = await database.getSensorReadings(gatewayId, startTime, endTime);
    
    // Group readings by timestamp and convert to sensor data format
    const dataMap = new Map<number, any>();
    
    readings.forEach(reading => {
      if (!dataMap.has(reading.timestamp)) {
        dataMap.set(reading.timestamp, {
          timestamp: reading.timestamp,
          energy: 0,
          flow: 0,
          oxygen: 0,
          temperature: 0,
        });
      }
      
      const data = dataMap.get(reading.timestamp);
      if (reading.sensor_type === 'energy') data.energy = reading.value;
      if (reading.sensor_type === 'flow') data.flow = reading.value;
      if (reading.sensor_type === 'oxygen') data.oxygen = reading.value;
      if (reading.sensor_type === 'temperature') data.temperature = reading.value;
    });

    const sensorData = Array.from(dataMap.values()).sort((a, b) => a.timestamp - b.timestamp);

    if (sensorData.length === 0) {
      return NextResponse.json({
        error: 'No sensor data found for this gateway',
      }, { status: 404 });
    }

    // Run optimization analysis
    const analysis = optimizationEngine.analyzeEnergyConsumption(sensorData);
    const recommendations = optimizationEngine.generateRecommendations(
      sensorData[sensorData.length - 1],
      sensorData
    );

    // Get total savings history
    const savingsHistory = await database.getEnergySavingsHistory(30);
    const totalSavings = await database.getTotalSavings();

    // Run maintenance analysis
    const maintenanceAlerts = maintenanceEngine.analyzeMaintenance(sensorData);

    return NextResponse.json({
      success: true,
      analysis,
      recommendations,
      maintenanceAlerts,
      savingsHistory: savingsHistory.slice(-7), // Last 7 days
      totalSavings,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error getting optimization data:', error);
    return NextResponse.json(
      { error: 'Failed to get optimization data' },
      { status: 500 }
    );
  }
}


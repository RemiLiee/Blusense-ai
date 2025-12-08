import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';
import { optimizationEngine } from '@/lib/optimization';

// Mark as dynamic route (API routes are always dynamic)
export const dynamic = 'force-dynamic';

interface ControlRequest {
  gateway_id: string;
  action: 'pump_speed' | 'oxygen_level' | 'temperature' | 'auto_optimize';
  value?: number;
  enabled?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ControlRequest = await request.json();
    
    // Validate API key
    const apiKey = request.headers.get('X-API-Key');
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required' },
        { status: 401 }
      );
    }

    if (!body.gateway_id || !body.action) {
      return NextResponse.json(
        { error: 'gateway_id and action required' },
        { status: 400 }
      );
    }

    // Get current sensor data
    const readings = await database.getSensorReadings(body.gateway_id);
    const latest = readings[readings.length - 1];
    
    if (!latest) {
      return NextResponse.json(
        { error: 'No sensor data found for this gateway' },
        { status: 404 }
      );
    }

    let controlResult: any = {
      action: body.action,
      timestamp: Date.now(),
      success: true,
    };

    // Execute control action
    switch (body.action) {
      case 'auto_optimize':
        // Get optimization recommendations
        const historical = await database.getSensorReadings(
          body.gateway_id,
          Date.now() - 24 * 60 * 60 * 1000
        );
        const sensorData = historical.map(r => ({
          timestamp: r.timestamp,
          energy: r.sensor_type === 'energy' ? r.value : 0,
          flow: r.sensor_type === 'flow' ? r.value : 0,
          oxygen: r.sensor_type === 'oxygen' ? r.value : 0,
          temperature: r.sensor_type === 'temperature' ? r.value : 0,
        }));
        
        const recommendations = optimizationEngine.generateRecommendations(
          {
            timestamp: Date.now(),
            energy: readings.find(r => r.sensor_type === 'energy')?.value || 0,
            flow: readings.find(r => r.sensor_type === 'flow')?.value || 0,
            oxygen: readings.find(r => r.sensor_type === 'oxygen')?.value || 0,
            temperature: readings.find(r => r.sensor_type === 'temperature')?.value || 0,
          },
          sensorData
        );

        // Apply high-priority recommendations automatically
        const highPriorityRecs = recommendations.filter(r => r.priority === 'high');
        controlResult.recommendations = highPriorityRecs;
        controlResult.actionsApplied = highPriorityRecs.map(rec => ({
          type: rec.type,
          action: rec.action,
          estimatedSavings: rec.potentialSavings,
        }));

        break;

      case 'pump_speed':
        if (body.value === undefined) {
          return NextResponse.json(
            { error: 'value required for pump_speed action' },
            { status: 400 }
          );
        }
        controlResult.newPumpSpeed = body.value;
        controlResult.message = `Pumpehastighet satt til ${body.value} m³/h`;
        break;

      case 'oxygen_level':
        if (body.value === undefined) {
          return NextResponse.json(
            { error: 'value required for oxygen_level action' },
            { status: 400 }
          );
        }
        controlResult.newOxygenLevel = body.value;
        controlResult.message = `Oksygennivå satt til ${body.value}%`;
        break;

      case 'temperature':
        if (body.value === undefined) {
          return NextResponse.json(
            { error: 'value required for temperature action' },
            { status: 400 }
          );
        }
        controlResult.newTemperature = body.value;
        controlResult.message = `Temperatur satt til ${body.value}°C`;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // In production, this would send commands to actual hardware
    console.log('Control command executed:', controlResult);

    return NextResponse.json({
      success: true,
      ...controlResult,
    });
  } catch (error) {
    console.error('Error executing control command:', error);
    return NextResponse.json(
      { error: 'Failed to execute control command' },
      { status: 500 }
    );
  }
}


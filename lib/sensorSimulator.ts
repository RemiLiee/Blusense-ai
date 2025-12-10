// Dummy sensor data simulator for AquaEnergy AI

export interface SensorData {
  timestamp: number;
  energy: number; // kWh
  flow: number; // L/min
  oxygen: number; // mg/L
  temperature: number; // °C
  vibration?: number; // mm/s
  efficiency?: number; // %
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: number;
  sensor?: 'energy' | 'flow' | 'oxygen' | 'temperature';
}

class SensorSimulator {
  // Realistic values that will trigger recommendations
  private baseEnergy = 220; // Higher to show optimization potential
  private baseFlow = 35; // Higher than optimal (30) to trigger recommendations
  private baseOxygen = 95; // Higher than optimal (90) to show savings potential
  private baseTemperature = 12.5; // Slightly higher than optimal (11)
  private baseVibration = 8.5; // Higher than optimal (< 7) to trigger maintenance recommendations
  private baseEfficiency = 72; // Lower than optimal (> 80) to show efficiency issues

  private generateRandomValue(base: number, variance: number): number {
    return base + (Math.random() - 0.5) * variance;
  }

  generateSensorData(): SensorData {
    return {
      timestamp: Date.now(),
      energy: Math.max(0, this.generateRandomValue(this.baseEnergy, 2.5)),
      flow: Math.max(0, this.generateRandomValue(this.baseFlow, 15)),
      oxygen: Math.max(0, this.generateRandomValue(this.baseOxygen, 0.8)),
      temperature: this.generateRandomValue(this.baseTemperature, 1.5),
      vibration: Math.max(0, this.generateRandomValue(this.baseVibration, 2.5)),
      efficiency: Math.max(0, Math.min(100, this.generateRandomValue(this.baseEfficiency, 8))),
    };
  }

  generateHistoricalData(hours: number = 24, intervalMinutes: number = 15): SensorData[] {
    const data: SensorData[] = [];
    const now = Date.now();
    const intervalMs = intervalMinutes * 60 * 1000;
    const points = (hours * 60) / intervalMinutes;

    for (let i = points; i >= 0; i--) {
      const timestamp = now - (i * intervalMs);
      // Add some variation over time
      const timeVariation = Math.sin((i / points) * Math.PI * 2) * 0.3;
      
      data.push({
        timestamp,
        energy: Math.max(0, this.baseEnergy + timeVariation + (Math.random() - 0.5) * 2),
        flow: Math.max(0, this.baseFlow + timeVariation * 10 + (Math.random() - 0.5) * 10),
        oxygen: Math.max(0, this.baseOxygen + timeVariation * 0.2 + (Math.random() - 0.5) * 0.5),
        temperature: this.baseTemperature + timeVariation * 0.5 + (Math.random() - 0.5) * 1,
        vibration: Math.max(0, this.baseVibration + timeVariation * 0.5 + (Math.random() - 0.5) * 2),
        efficiency: Math.max(0, Math.min(100, this.baseEfficiency + timeVariation * 2 + (Math.random() - 0.5) * 5)),
      });
    }

    return data;
  }

  checkAlerts(data: SensorData): Alert[] {
    const alerts: Alert[] = [];

    // Energy alerts
    if (data.energy > 20) {
      alerts.push({
        id: `energy-${data.timestamp}`,
        type: 'warning',
        message: `Høy energiforbruk: ${data.energy.toFixed(2)} kWh`,
        timestamp: data.timestamp,
        sensor: 'energy',
      });
    } else if (data.energy < 5) {
      alerts.push({
        id: `energy-${data.timestamp}`,
        type: 'info',
        message: `Lavt energiforbruk: ${data.energy.toFixed(2)} kWh`,
        timestamp: data.timestamp,
        sensor: 'energy',
      });
    }

    // Flow alerts
    if (data.flow > 150) {
      alerts.push({
        id: `flow-${data.timestamp}`,
        type: 'warning',
        message: `Høy strømningshastighet: ${data.flow.toFixed(1)} L/min`,
        timestamp: data.timestamp,
        sensor: 'flow',
      });
    } else if (data.flow < 80) {
      alerts.push({
        id: `flow-${data.timestamp}`,
        type: 'error',
        message: `Lav strømningshastighet: ${data.flow.toFixed(1)} L/min`,
        timestamp: data.timestamp,
        sensor: 'flow',
      });
    }

    // Oxygen alerts
    if (data.oxygen < 6) {
      alerts.push({
        id: `oxygen-${data.timestamp}`,
        type: 'error',
        message: `Kritisk oksygennivå: ${data.oxygen.toFixed(2)} mg/L`,
        timestamp: data.timestamp,
        sensor: 'oxygen',
      });
    } else if (data.oxygen < 7) {
      alerts.push({
        id: `oxygen-${data.timestamp}`,
        type: 'warning',
        message: `Lavt oksygennivå: ${data.oxygen.toFixed(2)} mg/L`,
        timestamp: data.timestamp,
        sensor: 'oxygen',
      });
    }

    // Temperature alerts
    if (data.temperature > 22) {
      alerts.push({
        id: `temp-${data.timestamp}`,
        type: 'warning',
        message: `Høy temperatur: ${data.temperature.toFixed(1)}°C`,
        timestamp: data.timestamp,
        sensor: 'temperature',
      });
    } else if (data.temperature < 15) {
      alerts.push({
        id: `temp-${data.timestamp}`,
        type: 'warning',
        message: `Lav temperatur: ${data.temperature.toFixed(1)}°C`,
        timestamp: data.timestamp,
        sensor: 'temperature',
      });
    }

    // Vibration alerts
    if (data.vibration && data.vibration > 10) {
      alerts.push({
        id: `vibration-${data.timestamp}`,
        type: 'error',
        message: `Kritisk høy vibrasjon: ${data.vibration.toFixed(1)} mm/s (anbefalt < 7 mm/s)`,
        timestamp: data.timestamp,
        sensor: 'energy',
      });
    } else if (data.vibration && data.vibration > 7) {
      alerts.push({
        id: `vibration-${data.timestamp}`,
        type: 'warning',
        message: `Høy vibrasjon: ${data.vibration.toFixed(1)} mm/s (anbefalt < 7 mm/s)`,
        timestamp: data.timestamp,
        sensor: 'energy',
      });
    }

    // Efficiency alerts
    if (data.efficiency && data.efficiency < 70) {
      alerts.push({
        id: `efficiency-${data.timestamp}`,
        type: 'error',
        message: `Lav effektivitet: ${data.efficiency.toFixed(1)}% (anbefalt > 80%)`,
        timestamp: data.timestamp,
        sensor: 'energy',
      });
    } else if (data.efficiency && data.efficiency < 75) {
      alerts.push({
        id: `efficiency-${data.timestamp}`,
        type: 'warning',
        message: `Moderat effektivitet: ${data.efficiency.toFixed(1)}% (anbefalt > 80%)`,
        timestamp: data.timestamp,
        sensor: 'energy',
      });
    }

    return alerts;
  }
}

export const sensorSimulator = new SensorSimulator();


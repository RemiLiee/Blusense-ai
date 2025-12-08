// Database interface for AquaEnergy AI
// This can be connected to Supabase, PostgreSQL, MongoDB, etc.

export interface SensorReading {
  id: string;
  gateway_id: string;
  sensor_id: string;
  sensor_type: 'energy' | 'flow' | 'oxygen' | 'temperature' | 'vibration';
  value: number;
  unit: string;
  timestamp: number;
}

export interface AlertRecord {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  sensor_type?: string;
  timestamp: number;
  resolved: boolean;
}

export interface EnergySavings {
  date: string;
  actualConsumption: number;
  optimizedConsumption: number;
  savings: number;
  savingsAmount: number; // NOK
}

class DatabaseService {
  // In production, this would connect to a real database
  // For now, we'll use in-memory storage as a placeholder
  
  private sensorData: SensorReading[] = [];
  private alerts: AlertRecord[] = [];
  private savingsHistory: EnergySavings[] = [];

  async saveSensorReading(reading: SensorReading): Promise<void> {
    // In production: INSERT INTO sensor_readings ...
    this.sensorData.push(reading);
    
    // Keep only last 10,000 readings in memory
    if (this.sensorData.length > 10000) {
      this.sensorData = this.sensorData.slice(-10000);
    }
  }

  async getSensorReadings(
    gatewayId: string,
    startTime?: number,
    endTime?: number,
    limit: number = 1000
  ): Promise<SensorReading[]> {
    // In production: SELECT * FROM sensor_readings WHERE ...
    let filtered = this.sensorData.filter(r => r.gateway_id === gatewayId);
    
    if (startTime) {
      filtered = filtered.filter(r => r.timestamp >= startTime);
    }
    if (endTime) {
      filtered = filtered.filter(r => r.timestamp <= endTime);
    }
    
    return filtered.slice(-limit).sort((a, b) => a.timestamp - b.timestamp);
  }

  async saveAlert(alert: AlertRecord): Promise<void> {
    // In production: INSERT INTO alerts ...
    this.alerts.push(alert);
  }

  async getActiveAlerts(gatewayId?: string): Promise<AlertRecord[]> {
    // In production: SELECT * FROM alerts WHERE resolved = false ...
    return this.alerts
      .filter(a => !a.resolved)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 50);
  }

  async saveEnergySavings(savings: EnergySavings): Promise<void> {
    // In production: INSERT INTO energy_savings ...
    this.savingsHistory.push(savings);
  }

  async getEnergySavingsHistory(days: number = 30): Promise<EnergySavings[]> {
    // In production: SELECT * FROM energy_savings WHERE date >= ...
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    return this.savingsHistory
      .filter(s => new Date(s.date).getTime() >= cutoff)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async getTotalSavings(): Promise<{ totalSavings: number; totalAmount: number }> {
    // In production: SELECT SUM(savings), SUM(savingsAmount) FROM energy_savings
    const total = this.savingsHistory.reduce(
      (acc, s) => ({
        totalSavings: acc.totalSavings + s.savings,
        totalAmount: acc.totalAmount + s.savingsAmount,
      }),
      { totalSavings: 0, totalAmount: 0 }
    );
    return total;
  }
}

export const database = new DatabaseService();




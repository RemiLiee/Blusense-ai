// Predictive Maintenance System for AquaEnergy AI

export interface MaintenanceAlert {
  id: string;
  type: 'pump' | 'filter' | 'sensor' | 'gateway' | 'general';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  estimatedFailureTime: number; // Timestamp
  recommendedAction: string;
  costEstimate: number; // NOK
  urgency: 'immediate' | 'within_week' | 'within_month' | 'planned';
}

export interface SensorData {
  timestamp: number;
  energy: number;
  flow: number;
  oxygen: number;
  temperature: number;
  vibration?: number;
}

class MaintenanceEngine {
  analyzeMaintenance(data: SensorData[]): MaintenanceAlert[] {
    if (data.length < 10) {
      return []; // Need enough data for analysis
    }

    const alerts: MaintenanceAlert[] = [];
    const latest = data[data.length - 1];
    const avgEnergy = data.reduce((sum, d) => sum + d.energy, 0) / data.length;
    const avgFlow = data.reduce((sum, d) => sum + d.flow, 0) / data.length;

    // Pump maintenance detection
    if (latest.energy > avgEnergy * 1.3 && latest.flow < avgFlow * 0.9) {
      // High energy but low flow = pump efficiency decreasing
      alerts.push({
        id: `maintenance-pump-${latest.timestamp}`,
        type: 'pump',
        severity: 'warning',
        title: 'Pumpe trenger vedlikehold',
        description: `Energiforbruk er ${((latest.energy / avgEnergy - 1) * 100).toFixed(0)}% høyere enn normalt, mens strømning er lavere. Dette tyder på redusert pumpeeffektivitet.`,
        estimatedFailureTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        recommendedAction: 'Sjekk pumpe for slitasje, rengjør eller bytt filter',
        costEstimate: 5000,
        urgency: 'within_week',
      });
    }

    // Filter maintenance detection
    if (latest.energy > avgEnergy * 1.2 && latest.flow < avgFlow * 0.85) {
      alerts.push({
        id: `maintenance-filter-${latest.timestamp}`,
        type: 'filter',
        severity: 'warning',
        title: 'Filter trenger rengjøring',
        description: 'Økt energiforbruk og redusert strømning tyder på at filteret er tett.',
        estimatedFailureTime: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days
        recommendedAction: 'Rengjør eller bytt filter for å gjenopprette effektivitet',
        costEstimate: 2000,
        urgency: 'within_week',
      });
    }

    // Sensor drift detection
    const energyVariance = this.calculateVariance(data.map(d => d.energy));
    if (energyVariance > 50) {
      alerts.push({
        id: `maintenance-sensor-${latest.timestamp}`,
        type: 'sensor',
        severity: 'info',
        title: 'Sensor kalibrering anbefalt',
        description: 'Høy variasjon i målinger kan tyde på at sensorer trenger kalibrering.',
        estimatedFailureTime: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
        recommendedAction: 'Kalibrer energimåler og strømningssensorer',
        costEstimate: 3000,
        urgency: 'within_month',
      });
    }

    // Vibration analysis (if available)
    if (latest.vibration && latest.vibration > 1.2) {
      alerts.push({
        id: `maintenance-vibration-${latest.timestamp}`,
        type: 'pump',
        severity: 'critical',
        title: 'Høy vibrasjon detektert',
        description: `Vibrasjonsnivå på ${latest.vibration.toFixed(2)} er over anbefalt nivå. Dette kan tyde på mekanisk feil.`,
        estimatedFailureTime: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days
        recommendedAction: 'Stopp pumpe umiddelbart og inspekter for mekanisk skade',
        costEstimate: 15000,
        urgency: 'immediate',
      });
    }

    // Gateway connectivity issues
    const recentData = data.slice(-10);
    const timeGaps = [];
    for (let i = 1; i < recentData.length; i++) {
      const gap = recentData[i].timestamp - recentData[i - 1].timestamp;
      if (gap > 5 * 60 * 1000) { // More than 5 minutes
        timeGaps.push(gap);
      }
    }
    
    if (timeGaps.length > 2) {
      alerts.push({
        id: `maintenance-gateway-${latest.timestamp}`,
        type: 'gateway',
        severity: 'warning',
        title: 'Gateway kommunikasjonsproblemer',
        description: 'Uregelmessig datatilgang tyder på nettverksproblemer.',
        estimatedFailureTime: Date.now() + 14 * 24 * 60 * 60 * 1000,
        recommendedAction: 'Sjekk gateway nettverkstilkobling og signalstyrke',
        costEstimate: 1000,
        urgency: 'within_week',
      });
    }

    return alerts;
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return Math.sqrt(variance); // Standard deviation
  }

  getMaintenanceSchedule(installationDate: number): MaintenanceAlert[] {
    const now = Date.now();
    const ageMonths = (now - installationDate) / (30 * 24 * 60 * 60 * 1000);
    
    const schedule: MaintenanceAlert[] = [];

    // Quarterly maintenance
    if (ageMonths % 3 < 0.5) {
      schedule.push({
        id: `schedule-quarterly-${now}`,
        type: 'general',
        severity: 'info',
        title: 'Kvartalsvis vedlikehold',
        description: 'Rutinemessig vedlikehold anbefalt for optimal ytelse.',
        estimatedFailureTime: now + 7 * 24 * 60 * 60 * 1000,
        recommendedAction: 'Full inspeksjon av alle komponenter, rengjøring og kalibrering',
        costEstimate: 8000,
        urgency: 'within_week',
      });
    }

    // Annual maintenance
    if (ageMonths % 12 < 0.5) {
      schedule.push({
        id: `schedule-annual-${now}`,
        type: 'general',
        severity: 'info',
        title: 'Årlig vedlikehold',
        description: 'Omfattende vedlikehold for å sikre lang levetid.',
        estimatedFailureTime: now + 30 * 24 * 60 * 60 * 1000,
        recommendedAction: 'Full service, delerbytte og oppgradering av software',
        costEstimate: 20000,
        urgency: 'within_month',
      });
    }

    return schedule;
  }
}

export const maintenanceEngine = new MaintenanceEngine();




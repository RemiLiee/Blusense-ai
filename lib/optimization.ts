// AI Optimization Engine for AquaEnergy AI
// Analyzes sensor data and provides recommendations to save energy

export interface SensorData {
  timestamp: number;
  energy: number; // kWh
  flow: number; // m³/h
  oxygen: number; // %
  temperature: number; // °C
}

export interface OptimizationRecommendation {
  id: string;
  type: 'energy' | 'flow' | 'oxygen' | 'temperature' | 'maintenance';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  potentialSavings: number; // Estimated savings in NOK or percentage
  action: string;
  estimatedImpact: string;
}

export interface EnergyAnalysis {
  currentConsumption: number;
  optimalConsumption: number;
  potentialSavings: number; // Percentage
  savingsAmount: number; // NOK per month (estimated)
  recommendations: OptimizationRecommendation[];
}

class OptimizationEngine {
  // Baseline optimal values (can be adjusted per installation)
  private optimalFlow = 30; // m³/h
  private optimalOxygen = 90; // %
  private optimalTemp = 11; // °C
  private energyPricePerKWh = 1.2; // NOK per kWh (adjust based on actual rates)

  analyzeEnergyConsumption(data: SensorData[], avgEnergyPrice: number = 1.2): EnergyAnalysis {
    if (data.length === 0) {
      return {
        currentConsumption: 0,
        optimalConsumption: 0,
        potentialSavings: 0,
        savingsAmount: 0,
        recommendations: [],
      };
    }

    const currentAvg = data.reduce((sum, d) => sum + d.energy, 0) / data.length;
    
    // Calculate optimal consumption based on sensor readings
    const optimalAvg = this.calculateOptimalEnergy(data);
    
    const potentialSavingsPercent = ((currentAvg - optimalAvg) / currentAvg) * 100;
    const monthlySavings = (currentAvg - optimalAvg) * 24 * 30 * avgEnergyPrice; // Daily avg * hours * days * price

    const recommendations = this.generateRecommendations(data[data.length - 1], data);

    return {
      currentConsumption: currentAvg,
      optimalConsumption: optimalAvg,
      potentialSavings: Math.max(0, potentialSavingsPercent),
      savingsAmount: Math.max(0, monthlySavings),
      recommendations,
    };
  }

  private calculateOptimalEnergy(data: SensorData[]): number {
    // AI algorithm: Calculate optimal energy based on:
    // 1. Flow rate optimization
    // 2. Temperature management
    // 3. Oxygen level efficiency
    
    const latest = data[data.length - 1];
    let optimal = latest.energy;

    // Flow optimization: Reduce energy if flow is too high
    if (latest.flow > this.optimalFlow * 1.1) {
      const excessFlow = latest.flow - this.optimalFlow;
      optimal -= (excessFlow / this.optimalFlow) * latest.energy * 0.15; // Up to 15% savings
    }

    // Temperature optimization: Reduce heating/cooling if temp is outside optimal range
    const tempDiff = Math.abs(latest.temperature - this.optimalTemp);
    if (tempDiff > 2) {
      optimal -= (tempDiff / 10) * latest.energy * 0.1; // Up to 10% savings
    }

    // Oxygen optimization: Reduce aeration if oxygen is too high
    if (latest.oxygen > this.optimalOxygen + 5) {
      const excessOxygen = latest.oxygen - this.optimalOxygen;
      optimal -= (excessOxygen / 100) * latest.energy * 0.12; // Up to 12% savings
    }

    return Math.max(optimal * 0.7, latest.energy * 0.7); // Minimum 30% potential savings
  }

  generateRecommendations(current: SensorData, historical: SensorData[]): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    // Energy optimization recommendations
    if (current.energy > 200) {
      recommendations.push({
        id: 'energy-high-consumption',
        type: 'energy',
        priority: 'high',
        title: 'Høy energiforbruk detektert',
        description: `Nåværende forbruk: ${current.energy.toFixed(2)} kWh. Optimalisering kan redusere dette med 15-25%.`,
        potentialSavings: 15,
        action: 'Reduser pumpehastighet og juster ventilasjonssystem',
        estimatedImpact: 'Sparer ca. 3 000-5 000 kr/mnd',
      });
    }

    // Flow optimization
    if (current.flow > this.optimalFlow * 1.15) {
      recommendations.push({
        id: 'flow-optimize',
        type: 'flow',
        priority: 'high',
        title: 'Optimaliser vannstrøm',
        description: `Strømningshastighet er ${((current.flow / this.optimalFlow - 1) * 100).toFixed(0)}% høyere enn optimalt.`,
        potentialSavings: 12,
        action: `Reduser pumpehastighet til ${this.optimalFlow.toFixed(1)} m³/h`,
        estimatedImpact: 'Sparer ca. 2 000-3 500 kr/mnd',
      });
    } else if (current.flow < this.optimalFlow * 0.85) {
      recommendations.push({
        id: 'flow-increase',
        type: 'flow',
        priority: 'medium',
        title: 'Øk vannstrøm for bedre oksygen',
        description: 'Lav strøm kan påvirke oksygennivået negativt.',
        potentialSavings: 0,
        action: `Øk pumpehastighet til ${this.optimalFlow.toFixed(1)} m³/h`,
        estimatedImpact: 'Forbedrer fiskevelferd',
      });
    }

    // Oxygen optimization
    if (current.oxygen > this.optimalOxygen + 8) {
      recommendations.push({
        id: 'oxygen-reduce-aeration',
        type: 'oxygen',
        priority: 'high',
        title: 'Reduser oksygenering',
        description: `Oksygennivå er ${(current.oxygen - this.optimalOxygen).toFixed(1)}% høyere enn nødvendig.`,
        potentialSavings: 10,
        action: 'Reduser aerasjonsintensitet med 20-30%',
        estimatedImpact: 'Sparer ca. 1 500-2 500 kr/mnd',
      });
    } else if (current.oxygen < this.optimalOxygen - 5) {
      recommendations.push({
        id: 'oxygen-increase',
        type: 'oxygen',
        priority: 'high',
        title: 'Øk oksygenering',
        description: 'Lavt oksygennivå kan påvirke fiskevelferd negativt.',
        potentialSavings: 0,
        action: 'Øk aerasjonsintensitet',
        estimatedImpact: 'Kritisk for fiskevelferd',
      });
    }

    // Temperature optimization
    if (current.temperature > this.optimalTemp + 3) {
      recommendations.push({
        id: 'temp-cooling',
        type: 'temperature',
        priority: 'medium',
        title: 'Optimaliser temperatur',
        description: `Temperatur er ${(current.temperature - this.optimalTemp).toFixed(1)}°C høyere enn optimalt.`,
        potentialSavings: 8,
        action: 'Aktiver kjølesystem eller øk vannstrøm for kjøling',
        estimatedImpact: 'Sparer ca. 1 000-2 000 kr/mnd',
      });
    } else if (current.temperature < this.optimalTemp - 3) {
      recommendations.push({
        id: 'temp-heating',
        type: 'temperature',
        priority: 'medium',
        title: 'Optimaliser oppvarming',
        description: `Temperatur er ${(this.optimalTemp - current.temperature).toFixed(1)}°C lavere enn optimalt.`,
        potentialSavings: 5,
        action: 'Juster oppvarmingssystem',
        estimatedImpact: 'Forbedrer vekst og effektivitet',
      });
    }

    // Predictive maintenance
    const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
    if (current.energy > avgEnergy * 1.2) {
      recommendations.push({
        id: 'maintenance-pump',
        type: 'maintenance',
        priority: 'medium',
        title: 'Vedlikehold anbefalt',
        description: 'Økt energiforbruk kan tyde på at pumper eller utstyr trenger vedlikehold.',
        potentialSavings: 15,
        action: 'Planlegg vedlikehold av pumper og filtreringssystem',
        estimatedImpact: 'Forhindrer dyr nedetid og reduserer forbruk',
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  calculateROI(monthlySavings: number, initialCost: number, monthlySubscription: number): {
    paybackMonths: number;
    yearlySavings: number;
    threeYearROI: number;
  } {
    const netMonthlySavings = monthlySavings - monthlySubscription;
    const paybackMonths = netMonthlySavings > 0 ? initialCost / netMonthlySavings : 0;
    const yearlySavings = netMonthlySavings * 12;
    const threeYearROI = (yearlySavings * 3 - initialCost) / initialCost * 100;

    return {
      paybackMonths: Math.max(0, paybackMonths),
      yearlySavings: Math.max(0, yearlySavings),
      threeYearROI: Math.max(0, threeYearROI),
    };
  }
}

export const optimizationEngine = new OptimizationEngine();




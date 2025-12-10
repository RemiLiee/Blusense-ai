// AI Optimization Engine for AquaEnergy AI
// Analyzes sensor data and provides recommendations to save energy

export interface SensorData {
  timestamp: number;
  energy: number; // kWh
  flow: number; // m³/h
  oxygen: number; // %
  temperature: number; // °C
  vibration?: number; // mm/s
  efficiency?: number; // %
}

export interface OptimizationRecommendation {
  id: string;
  type: 'energy' | 'flow' | 'oxygen' | 'temperature' | 'maintenance' | 'vibration' | 'efficiency';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  potentialSavings: number; // Percentage
  savingsKWhPerYear?: number; // kWh per year
  savingsAmountPerYear: number; // NOK per year
  investmentCost?: number; // NOK
  paybackMonths?: number; // Months
  action: string;
  estimatedImpact: string;
  issue?: string; // Specific issue detected (e.g., "Høy vibrasjon: 8.5 mm/s")
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
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const savingsKWhPerYear = avgEnergy * 0.15 * 24 * 365;
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 5000; // System adjustments
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'energy-high-consumption',
        type: 'energy',
        priority: 'high',
        title: 'Høy energiforbruk detektert',
        description: `Nåværende forbruk: ${current.energy.toFixed(2)} kWh. Optimalisering kan redusere dette med 15-25%.`,
        potentialSavings: 15,
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Reduser pumpehastighet og juster ventilasjonssystem',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
      });
    }

    // Flow optimization
    if (current.flow > this.optimalFlow * 1.15) {
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const savingsKWhPerYear = avgEnergy * 0.12 * 24 * 365;
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 3000;
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'flow-optimize',
        type: 'flow',
        priority: 'high',
        title: 'Optimaliser vannstrøm',
        description: `Strømningshastighet er ${((current.flow / this.optimalFlow - 1) * 100).toFixed(0)}% høyere enn optimalt.`,
        potentialSavings: 12,
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: `Reduser pumpehastighet til ${this.optimalFlow.toFixed(1)} m³/h`,
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
        issue: `Høy vannstrøm: ${current.flow.toFixed(1)} L/min (optimalt: ${this.optimalFlow} L/min)`,
      });
    } else if (current.flow < this.optimalFlow * 0.85) {
      recommendations.push({
        id: 'flow-increase',
        type: 'flow',
        priority: 'medium',
        title: 'Øk vannstrøm for bedre oksygen',
        description: 'Lav strøm kan påvirke oksygennivået negativt.',
        potentialSavings: 0,
        savingsKWhPerYear: 0,
        savingsAmountPerYear: 0,
        action: `Øk pumpehastighet til ${this.optimalFlow.toFixed(1)} m³/h`,
        estimatedImpact: 'Forbedrer fiskevelferd',
        issue: `Lav vannstrøm: ${current.flow.toFixed(1)} L/min`,
      });
    }

    // Oxygen optimization
    if (current.oxygen > this.optimalOxygen + 8) {
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const savingsKWhPerYear = avgEnergy * 0.10 * 24 * 365;
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 2000;
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'oxygen-reduce-aeration',
        type: 'oxygen',
        priority: 'high',
        title: 'Reduser oksygenering',
        description: `Oksygennivå er ${(current.oxygen - this.optimalOxygen).toFixed(1)}% høyere enn nødvendig.`,
        potentialSavings: 10,
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Reduser aerasjonsintensitet med 20-30%',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
        issue: `Høyt oksygennivå: ${current.oxygen.toFixed(1)} mg/L (optimalt: ${this.optimalOxygen} mg/L)`,
      });
    } else if (current.oxygen < this.optimalOxygen - 5) {
      recommendations.push({
        id: 'oxygen-increase',
        type: 'oxygen',
        priority: 'high',
        title: 'Øk oksygenering',
        description: 'Lavt oksygennivå kan påvirke fiskevelferd negativt.',
        potentialSavings: 0,
        savingsKWhPerYear: 0,
        savingsAmountPerYear: 0,
        action: 'Øk aerasjonsintensitet',
        estimatedImpact: 'Kritisk for fiskevelferd',
        issue: `Lavt oksygennivå: ${current.oxygen.toFixed(1)} mg/L`,
      });
    }

    // Temperature optimization
    if (current.temperature > this.optimalTemp + 3) {
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const savingsKWhPerYear = avgEnergy * 0.08 * 24 * 365;
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 4000;
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'temp-cooling',
        type: 'temperature',
        priority: 'medium',
        title: 'Optimaliser temperatur',
        description: `Temperatur er ${(current.temperature - this.optimalTemp).toFixed(1)}°C høyere enn optimalt.`,
        potentialSavings: 8,
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Aktiver kjølesystem eller øk vannstrøm for kjøling',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
        issue: `Høy temperatur: ${current.temperature.toFixed(1)}°C (optimalt: ${this.optimalTemp}°C)`,
      });
    } else if (current.temperature < this.optimalTemp - 3) {
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const savingsKWhPerYear = avgEnergy * 0.05 * 24 * 365;
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 3000;
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'temp-heating',
        type: 'temperature',
        priority: 'medium',
        title: 'Optimaliser oppvarming',
        description: `Temperatur er ${(this.optimalTemp - current.temperature).toFixed(1)}°C lavere enn optimalt.`,
        potentialSavings: 5,
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Juster oppvarmingssystem',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
        issue: `Lav temperatur: ${current.temperature.toFixed(1)}°C (optimalt: ${this.optimalTemp}°C)`,
      });
    }

    // Vibration-based recommendations
    if (current.vibration && current.vibration > 10) {
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const savingsKWhPerYear = avgEnergy * 0.15 * 24 * 365; // 15% reduction
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 15000; // Estimated cost for maintenance/repair
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'vibration-critical',
        type: 'vibration',
        priority: 'high',
        title: 'Kritisk høy vibrasjon detektert',
        description: `Vibrasjon på ${current.vibration.toFixed(1)} mm/s er kritisk høy (anbefalt < 7 mm/s). Dette indikerer slitasje på lagere eller feiljustering som øker energiforbruket.`,
        potentialSavings: 15,
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Planlegg umiddelbart vedlikehold av pumper - sjekk lagere og justering',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
        issue: `Høy vibrasjon: ${current.vibration.toFixed(1)} mm/s (anbefalt < 7 mm/s)`,
      });
    } else if (current.vibration && current.vibration > 7) {
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const savingsKWhPerYear = avgEnergy * 0.10 * 24 * 365; // 10% reduction
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 8000;
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'vibration-high',
        type: 'vibration',
        priority: 'high',
        title: 'Høy vibrasjon detektert',
        description: `Vibrasjon på ${current.vibration.toFixed(1)} mm/s er høyere enn optimalt (anbefalt < 7 mm/s). Dette kan indikere behov for justering eller vedlikehold.`,
        potentialSavings: 10,
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Planlegg vedlikehold - sjekk pumpejustering og lagere',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
        issue: `Vibrasjon: ${current.vibration.toFixed(1)} mm/s`,
      });
    }

    // Efficiency-based recommendations
    if (current.efficiency && current.efficiency < 70) {
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const efficiencyLoss = (80 - current.efficiency) / 80; // How much below optimal
      const savingsKWhPerYear = avgEnergy * efficiencyLoss * 0.5 * 24 * 365; // 50% of loss can be recovered
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 25000; // Pump replacement or major maintenance
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'efficiency-low',
        type: 'efficiency',
        priority: 'high',
        title: 'Lav effektivitet detektert',
        description: `Effektivitet på ${current.efficiency.toFixed(1)}% er betydelig lavere enn optimalt (anbefalt > 80%). Dette tyder på at pumpekurven ikke matcher systemet optimalt.`,
        potentialSavings: Math.round(efficiencyLoss * 100 * 0.5),
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Vurder utskifting eller større justering av pumper for bedre match med systemet',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
        issue: `Lav effektivitet: ${current.efficiency.toFixed(1)}% (anbefalt > 80%)`,
      });
    } else if (current.efficiency && current.efficiency < 75) {
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const efficiencyLoss = (80 - current.efficiency) / 80;
      const savingsKWhPerYear = avgEnergy * efficiencyLoss * 0.4 * 24 * 365;
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 12000;
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'efficiency-moderate',
        type: 'efficiency',
        priority: 'medium',
        title: 'Moderat effektivitet',
        description: `Effektivitet på ${current.efficiency.toFixed(1)}% kan forbedres (anbefalt > 80%). Optimalisering kan gi besparelser.`,
        potentialSavings: Math.round(efficiencyLoss * 100 * 0.4),
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Vurder justering av pumpehastighet eller kurve for bedre match',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
        issue: `Effektivitet: ${current.efficiency.toFixed(1)}%`,
      });
    }

    // Combined vibration and efficiency issue
    if (current.vibration && current.vibration > 7 && current.efficiency && current.efficiency < 75) {
      const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
      const savingsKWhPerYear = avgEnergy * 0.20 * 24 * 365; // 20% reduction from fixing both
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 20000;
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'vibration-efficiency-combined',
        type: 'maintenance',
        priority: 'high',
        title: 'Høy vibrasjon og lav effektivitet',
        description: `Kombinasjonen av høy vibrasjon (${current.vibration.toFixed(1)} mm/s) og lav effektivitet (${current.efficiency.toFixed(1)}%) indikerer at pumper trenger omfattende vedlikehold eller utskifting.`,
        potentialSavings: 20,
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Planlegg omfattende vedlikehold eller vurder utskifting av pumper',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
        issue: `Vibrasjon: ${current.vibration.toFixed(1)} mm/s. Effektivitet: ${current.efficiency.toFixed(1)}%`,
      });
    }

    // Predictive maintenance
    const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
    if (current.energy > avgEnergy * 1.2) {
      const savingsKWhPerYear = avgEnergy * 0.15 * 24 * 365;
      const savingsAmountPerYear = savingsKWhPerYear * this.energyPricePerKWh;
      const investmentCost = 10000;
      const paybackMonths = (investmentCost / (savingsAmountPerYear / 12));

      recommendations.push({
        id: 'maintenance-pump',
        type: 'maintenance',
        priority: 'medium',
        title: 'Vedlikehold anbefalt',
        description: 'Økt energiforbruk kan tyde på at pumper eller utstyr trenger vedlikehold.',
        potentialSavings: 15,
        savingsKWhPerYear: savingsKWhPerYear,
        savingsAmountPerYear: savingsAmountPerYear,
        investmentCost: investmentCost,
        paybackMonths: paybackMonths,
        action: 'Planlegg vedlikehold av pumper og filtreringssystem',
        estimatedImpact: `Sparer ca. ${Math.round(savingsAmountPerYear / 12).toLocaleString('no-NO')} kr/mnd`,
      });
    }

    // Calculate savings for all recommendations
    recommendations.forEach(rec => {
      if (!rec.savingsAmountPerYear && rec.potentialSavings > 0) {
        const avgEnergy = historical.reduce((sum, d) => sum + d.energy, 0) / historical.length;
        rec.savingsKWhPerYear = avgEnergy * (rec.potentialSavings / 100) * 24 * 365;
        rec.savingsAmountPerYear = (rec.savingsKWhPerYear || 0) * this.energyPricePerKWh;
      }
      if (!rec.investmentCost) {
        // Default investment costs based on type
        rec.investmentCost = rec.type === 'maintenance' ? 10000 : rec.type === 'vibration' ? 15000 : 5000;
      }
      if (!rec.paybackMonths && rec.savingsAmountPerYear > 0) {
        rec.paybackMonths = (rec.investmentCost || 0) / (rec.savingsAmountPerYear / 12);
      }
    });

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












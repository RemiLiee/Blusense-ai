// Industriregler og logikk for AquaEnergy AI
// Basert på industriell praksis for elektromotorer, pumper og prosessutstyr

export interface Tiltak {
  asset: string;
  issue: string;
  severity: 'High' | 'Medium' | 'Low';
  saving_percent: string; // Format: "14–19 %"
  saving_nok_year: string; // Format: "38 000 – 52 000"
  reason: string;
  recommended_actions: string[];
  status: 'Ikke utført' | 'I gjennomføring' | 'Fullført';
}

// Energipris (kan hentes fra sensor data eller settes som standard)
export const DEFAULT_ENERGY_PRICE = 1.25; // kr/kWh

// Industriregler for elektromotorer
export function analyzeMotor(data: {
  power?: number; // kW
  current?: number; // A
  temperature?: number; // °C
  vibration?: number; // mm/s RMS
  runtime?: number; // timer
  historicalNormal?: {
    power?: number;
    current?: number;
    temperature?: number;
  };
}): {
  issues: string[];
  recommendations: string[];
  severity: 'High' | 'Medium' | 'Low';
  impact?: { energy: string; cost: string; risk: string };
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let severity: 'High' | 'Medium' | 'Low' = 'Low';

  // Effekt / strøm sjekk
  if (data.historicalNormal?.power && data.power) {
    const powerIncrease = ((data.power - data.historicalNormal.power) / data.historicalNormal.power) * 100;
    if (powerIncrease > 15) {
      issues.push(`Effektforbruk ${powerIncrease.toFixed(0)}% over historisk normal`);
      recommendations.push('Kontroller mekanisk last');
      recommendations.push('Sjekk lager og aksling');
      recommendations.push('Vurder regulering eller driftspunkt');
      severity = powerIncrease > 25 ? 'High' : 'Medium';
    }
  }

  // Temperatur sjekk
  if (data.historicalNormal?.temperature && data.temperature) {
    const tempIncrease = data.temperature - data.historicalNormal.temperature;
    if (tempIncrease > 10) {
      issues.push(`Temperatur stiger raskere enn normalt (+${tempIncrease.toFixed(1)}°C)`);
      recommendations.push('Sjekk kjøling og luftstrøm');
      recommendations.push('Kontroller smøring');
      recommendations.push('Planlegg inspeksjon');
      severity = tempIncrease > 20 ? 'High' : 'Medium';
    }
  }

  // Vibrasjon sjekk (ISO 10816 / 20816)
  if (data.vibration && data.vibration > 7.1) {
    issues.push(`Vibrasjon ${data.vibration.toFixed(1)} mm/s RMS (uakseptabel drift)`);
    recommendations.push('Lagerkontroll');
    recommendations.push('Mekanisk inspeksjon');
    recommendations.push('Balansering');
    severity = data.vibration > 10 ? 'High' : 'Medium';
  }

  return {
    issues,
    recommendations,
    severity,
  };
}

// Industriregler for pumper
export function analyzePump(data: {
  power?: number; // kW
  flow?: number; // L/min eller m³/h
  runtime?: number; // timer
  historicalNormal?: {
    power?: number;
    flow?: number;
  };
}): {
  issues: string[];
  recommendations: string[];
  severity: 'High' | 'Medium' | 'Low';
  impact?: { energy: string; cost: string; risk: string };
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let severity: 'High' | 'Medium' | 'Low' = 'Low';

  // Effekt vs ytelse
  if (data.historicalNormal?.power && data.historicalNormal?.flow && data.power && data.flow) {
    const powerRatio = data.power / data.flow;
    const normalPowerRatio = data.historicalNormal.power / data.historicalNormal.flow;
    if (powerRatio > normalPowerRatio * 1.1) {
      issues.push('Effekt øker uten tilsvarende prosessgevinst');
      recommendations.push('Kontroller filter');
      recommendations.push('Sjekk ventiler og rør');
      recommendations.push('Rengjør pumpehus');
      severity = 'Medium';
    }
  }

  // Driftstid
  if (data.runtime && data.runtime > 20) {
    issues.push('Pumpe går kontinuerlig uten behov');
    recommendations.push('Optimaliser driftssykluser');
    recommendations.push('Vurder automatisk styring');
    severity = 'Low';
  }

  return {
    issues,
    recommendations,
    severity,
  };
}

// Beregn økonomisk konsekvens (konservativt)
export function calculateEconomicImpact(
  extraPowerKw: number,
  hoursPerDay: number,
  energyPrice: number = DEFAULT_ENERGY_PRICE,
  daysPerYear: number = 365
): {
  extra_cost_nok_day: number;
  extra_cost_nok_year: string;
  saving_percent_range: string;
} {
  const dailyCost = extraPowerKw * hoursPerDay * energyPrice;
  const yearlyCost = dailyCost * daysPerYear;

  // Konservativ beregning med usikkerhet
  const lowEstimate = yearlyCost * 0.85;
  const highEstimate = yearlyCost * 1.15;

  // Anta at besparelse er 60-80% av ekstrakostnad
  const savingLow = lowEstimate * 0.6;
  const savingHigh = highEstimate * 0.8;

  return {
    extra_cost_nok_day: Math.round(dailyCost),
    extra_cost_nok_year: `${Math.round(savingLow / 1000)} 000 – ${Math.round(savingHigh / 1000)} 000`,
    saving_percent_range: '12–18 %', // Eksempel - kan beregnes mer presist
  };
}

// Formater tiltak-objekt for dashboard
export function createTiltak(
  asset: string,
  issue: string,
  severity: 'High' | 'Medium' | 'Low',
  reason: string,
  recommendedActions: string[],
  savingPercent: string,
  savingNokYear: string
): Tiltak {
  return {
    asset,
    issue,
    severity,
    saving_percent: savingPercent,
    saving_nok_year: savingNokYear,
    reason,
    recommended_actions: recommendedActions,
    status: 'Ikke utført',
  };
}


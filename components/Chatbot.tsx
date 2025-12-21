'use client';

import { useState, useEffect, useRef } from 'react';
import { SensorData } from '@/lib/sensorSimulator';
import { OptimizationRecommendation } from '@/lib/optimization';
import { analyzeMotor, analyzePump, calculateEconomicImpact } from '@/lib/industrialRules';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  dataContext?: {
    sensorData?: SensorData;
    recommendations?: OptimizationRecommendation[];
  };
}

interface ChatbotProps {
  currentSensorData?: SensorData | null;
  recommendations?: OptimizationRecommendation[];
  historicalData?: SensorData[];
}

export default function Chatbot({ currentSensorData, recommendations = [], historicalData = [] }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasShownInitialOverview, setHasShownInitialOverview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Automatically show overview when chatbot opens
  useEffect(() => {
    if (isOpen && currentSensorData && !hasShownInitialOverview) {
      showAutomaticOverview();
      setHasShownInitialOverview(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentSensorData, hasShownInitialOverview]);

  // Check for anomalies and recommendations automatically
  useEffect(() => {
    if (isOpen && currentSensorData) {
      checkAndShowAnomalies();
      checkAndShowRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentSensorData, recommendations]);

  const showAutomaticOverview = () => {
    if (!currentSensorData) return;

    const avgEnergy = historicalData.length > 0 
      ? historicalData.reduce((sum, d) => sum + d.energy, 0) / historicalData.length 
      : currentSensorData.energy;

    const optimalEnergy = avgEnergy * 0.75;
    const potentialSavings = avgEnergy - optimalEnergy;
    const monthlySavings = potentialSavings * 24 * 30 * 1.2;

    const overview: Message = {
      id: 'auto-overview',
      role: 'assistant',
      content: `📊 **Oversikt over ditt anlegg**\n\n**Nåværende målinger:**\n⚡ Energi: ${currentSensorData.energy.toFixed(1)} kWh\n💧 Vannstrøm: ${currentSensorData.flow.toFixed(1)} L/min\n🌊 Oksygen: ${currentSensorData.oxygen.toFixed(1)} mg/L\n🌡️ Temperatur: ${currentSensorData.temperature.toFixed(1)}°C\n\n**Gjennomsnitt (siste 24t):**\n- Energiforbruk: ${avgEnergy.toFixed(1)} kWh\n- Potensiell besparelse: ${(potentialSavings / avgEnergy * 100).toFixed(1)}%\n- Månedlig verdi: ${Math.round(monthlySavings).toLocaleString('no-NO')} kr\n\nJeg overvåker kontinuerlig og vil automatisk varsle deg om avvik og anbefalinger! 🔔`,
      timestamp: Date.now(),
      dataContext: { sensorData: currentSensorData },
    };

    setMessages(prev => [overview, ...prev]);
  };

  const checkAndShowAnomalies = () => {
    if (!currentSensorData) return;

    const anomalies: string[] = [];

    // Check for energy anomalies
    if (currentSensorData.energy > 250) {
      anomalies.push(`🚨 **Høyt energiforbruk detektert:** ${currentSensorData.energy.toFixed(1)} kWh er betydelig høyere enn normalt. Dette kan tyde på ineffektiv drift.`);
    }

    // Check for oxygen anomalies
    if (currentSensorData.oxygen < 80) {
      anomalies.push(`⚠️ **Lavt oksygennivå:** ${currentSensorData.oxygen.toFixed(1)} mg/L er under kritisk nivå. Dette kan påvirke kvaliteten.`);
    } else if (currentSensorData.oxygen > 100) {
      anomalies.push(`💡 **Høyt oksygennivå:** ${currentSensorData.oxygen.toFixed(1)} mg/L er høyere enn nødvendig. Du kan redusere aerasjonsintensitet for å spare energi.`);
    }

    // Check for flow anomalies
    if (currentSensorData.flow > 40) {
      anomalies.push(`💧 **Høy vannstrøm:** ${currentSensorData.flow.toFixed(1)} L/min er høyere enn optimalt. Reduksjon kan spare energi.`);
    } else if (currentSensorData.flow < 20) {
      anomalies.push(`⚠️ **Lav vannstrøm:** ${currentSensorData.flow.toFixed(1)} L/min kan være for lav for optimal oksygenfordeling.`);
    }

    // Check for temperature anomalies
    if (currentSensorData.temperature > 15) {
      anomalies.push(`🌡️ **Høy temperatur:** ${currentSensorData.temperature.toFixed(1)}°C er høyere enn optimalt. Kjøling kan være nødvendig.`);
    } else if (currentSensorData.temperature < 7) {
      anomalies.push(`🌡️ **Lav temperatur:** ${currentSensorData.temperature.toFixed(1)}°C er lavere enn optimalt. Oppvarming kan være nødvendig.`);
    }

    if (anomalies.length > 0) {
      const anomalyMessage: Message = {
        id: `anomaly-${Date.now()}`,
        role: 'assistant',
        content: `**Avvik detektert:**\n\n${anomalies.join('\n\n')}\n\nJeg anbefaler å sjekke anbefalingene nedenfor for tiltak.`,
        timestamp: Date.now(),
        dataContext: { sensorData: currentSensorData },
      };

      // Only add if not already shown
      setMessages(prev => {
        const hasAnomaly = prev.some(m => m.id.startsWith('anomaly-'));
        if (!hasAnomaly) {
          return [...prev, anomalyMessage];
        }
        return prev;
      });
    }
  };

  const checkAndShowRecommendations = () => {
    if (recommendations.length === 0) return;

    // Show top 3 recommendations automatically
    const topRecommendations = recommendations.slice(0, 3);
    const recsText = topRecommendations.map((rec, idx) => {
      // Calculate yearly savings from monthly estimate
      const monthlyMatch = rec.estimatedImpact.match(/(\d+(?:\s?\d+)?)\s*kr\/mnd/);
      const monthlySavings = monthlyMatch ? parseInt(monthlyMatch[1].replace(/\s/g, '')) : 0;
      const yearlySavings = monthlySavings * 12;
      
      return `${idx + 1}. **${rec.title}**\n   ${rec.description}\n   💰 Potensiell besparelse: ${rec.potentialSavings}%\n   📅 Månedlig: ${rec.estimatedImpact}\n   📅 Årlig: ${yearlySavings > 0 ? yearlySavings.toLocaleString('no-NO') + ' kr' : 'Se månedlig estimat'}\n   📋 Anbefalt tiltak: ${rec.action}`;
    }).join('\n\n');

    const recommendationMessage: Message = {
      id: `recommendations-${Date.now()}`,
      role: 'assistant',
      content: `💡 **Anbefalinger for å spare strøm (basert på avvik):**\n\n${recsText}\n\n${recommendations.length > 3 ? `\n+ ${recommendations.length - 3} flere anbefalinger tilgjengelig i dashboardet!` : ''}`,
      timestamp: Date.now(),
      dataContext: { recommendations: topRecommendations },
    };

    // Only add if not already shown
    setMessages(prev => {
      const hasRecs = prev.some(m => m.id.startsWith('recommendations-'));
      if (!hasRecs) {
        return [...prev, recommendationMessage];
      }
      return prev;
    });
  };

  const analyzeSensorData = (data: SensorData): string => {
    const insights: string[] = [];

    // Energy analysis
    if (data.energy > 200) {
      insights.push(`⚡ Energiforbruket ditt er ${data.energy.toFixed(1)} kWh, som er høyt. Dette indikerer at det er potensial for besparelser.`);
    } else if (data.energy < 100) {
      insights.push(`✅ Energiforbruket ditt er ${data.energy.toFixed(1)} kWh, som er relativt lavt. Bra jobbet!`);
    }

    // Flow analysis
    if (data.flow > 35) {
      insights.push(`💧 Vannstrømmen er ${data.flow.toFixed(1)} L/min, som er høyere enn optimalt. Reduksjon kan spare energi.`);
    } else if (data.flow < 25) {
      insights.push(`💧 Vannstrømmen er ${data.flow.toFixed(1)} L/min, som kan være for lav for optimal oksygenfordeling.`);
    }

    // Oxygen analysis
    if (data.oxygen > 95) {
      insights.push(`🌊 Oksygennivået er ${data.oxygen.toFixed(1)} mg/L, som er høyere enn nødvendig. Du kan redusere aerasjonsintensitet for å spare energi.`);
    } else if (data.oxygen < 85) {
      insights.push(`⚠️ Oksygennivået er ${data.oxygen.toFixed(1)} mg/L, som er under optimalt nivå. Vurder å øke aerasjonsintensitet.`);
    }

    // Temperature analysis
    if (data.temperature > 14) {
      insights.push(`🌡️ Temperaturen er ${data.temperature.toFixed(1)}°C, som er høyere enn optimalt. Kjøling kan være nødvendig.`);
    } else if (data.temperature < 8) {
      insights.push(`🌡️ Temperaturen er ${data.temperature.toFixed(1)}°C, som er lavere enn optimalt. Oppvarming kan være nødvendig.`);
    }

    return insights.join('\n\n');
  };

  const getTrendAnalysis = (recentData: SensorData[], current: SensorData): string => {
    if (recentData.length < 2) return '';

    const first = recentData[0];
    const trends: string[] = [];

    const energyTrend = current.energy - first.energy;
    if (Math.abs(energyTrend) > 5) {
      trends.push(`📈 Energi: ${energyTrend > 0 ? 'Økt' : 'Redusert'} med ${Math.abs(energyTrend).toFixed(1)} kWh siste time`);
    }

    const flowTrend = current.flow - first.flow;
    if (Math.abs(flowTrend) > 2) {
      trends.push(`💧 Vannstrøm: ${flowTrend > 0 ? 'Økt' : 'Redusert'} med ${Math.abs(flowTrend).toFixed(1)} L/min siste time`);
    }

    const oxygenTrend = current.oxygen - first.oxygen;
    if (Math.abs(oxygenTrend) > 3) {
      trends.push(`🌊 Oksygen: ${oxygenTrend > 0 ? 'Økt' : 'Redusert'} med ${Math.abs(oxygenTrend).toFixed(1)} mg/L siste time`);
    }

    const tempTrend = current.temperature - first.temperature;
    if (Math.abs(tempTrend) > 1) {
      trends.push(`🌡️ Temperatur: ${tempTrend > 0 ? 'Økt' : 'Redusert'} med ${Math.abs(tempTrend).toFixed(1)}°C siste time`);
    }

    return trends.length > 0 ? `**Trender (siste time):**\n${trends.join('\n')}\n\n` : '';
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Context-aware responses based on sensor data
    if (currentSensorData) {
      // Questions about current readings
      if (lowerMessage.includes('energi') || lowerMessage.includes('forbruk') || lowerMessage.includes('kwh')) {
        const analysis = analyzeSensorData(currentSensorData);
        return `Basert på dine nåværende sensordata:\n\n${analysis}\n\n${currentSensorData.energy > 200 ? 'Jeg anbefaler å se på våre optimaliseringsanbefalinger for å redusere energiforbruket.' : 'Ditt energiforbruk ser bra ut!'}`;
      }

      if (lowerMessage.includes('vannstrøm') || lowerMessage.includes('flow') || lowerMessage.includes('strøm')) {
        const optimal = 30;
        const diff = currentSensorData.flow - optimal;
        if (Math.abs(diff) > 5) {
          return `Din nåværende vannstrøm er ${currentSensorData.flow.toFixed(1)} L/min. Optimalt nivå er rundt ${optimal} L/min.\n\n${diff > 0 ? `Du bruker ${diff.toFixed(1)} L/min mer enn nødvendig. Ved å redusere pumpehastigheten kan du spare betydelig energi.` : `Strømmen er ${Math.abs(diff).toFixed(1)} L/min lavere enn optimalt, noe som kan påvirke oksygenfordelingen.`}\n\nJeg anbefaler å justere pumpehastigheten gradvis og overvåke resultatene.`;
        }
        return `Din vannstrøm er ${currentSensorData.flow.toFixed(1)} L/min, som er innenfor optimalt område. Bra!`;
      }

      if (lowerMessage.includes('oksygen') || lowerMessage.includes('o2')) {
        const optimal = 90;
        const diff = currentSensorData.oxygen - optimal;
        if (Math.abs(diff) > 5) {
          return `Ditt nåværende oksygennivå er ${currentSensorData.oxygen.toFixed(1)} mg/L. Optimalt nivå er rundt ${optimal} mg/L.\n\n${diff > 0 ? `Du har ${diff.toFixed(1)} mg/L mer oksygen enn nødvendig. Ved å redusere aerasjonsintensitet med 20-30% kan du spare betydelig energi uten å påvirke kvaliteten.` : `Oksygennivået er ${Math.abs(diff).toFixed(1)} mg/L lavere enn optimalt. Dette kan påvirke kvaliteten, så vurder å øke aerasjonsintensitet.`}\n\nJeg anbefaler gradvis justering og kontinuerlig overvåking.`;
        }
        return `Ditt oksygennivå er ${currentSensorData.oxygen.toFixed(1)} mg/L, som er optimalt. Perfekt!`;
      }

      if (lowerMessage.includes('temperatur') || lowerMessage.includes('temp')) {
        const optimal = 11;
        const diff = currentSensorData.temperature - optimal;
        if (Math.abs(diff) > 2) {
          return `Din nåværende temperatur er ${currentSensorData.temperature.toFixed(1)}°C. Optimalt nivå er rundt ${optimal}°C.\n\n${diff > 0 ? `Temperaturen er ${diff.toFixed(1)}°C høyere enn optimalt. Dette kan øke energiforbruket for kjøling. Vurder å aktivere kjølesystem eller øke vannstrøm for naturlig kjøling.` : `Temperaturen er ${Math.abs(diff).toFixed(1)}°C lavere enn optimalt. Dette kan påvirke vekst og effektivitet. Vurder å justere oppvarmingssystemet.`}\n\nGradvis justering anbefales for å unngå sjokk.`;
        }
        return `Din temperatur er ${currentSensorData.temperature.toFixed(1)}°C, som er innenfor optimalt område. Utmerket!`;
      }

      // Questions about recommendations - NYTT FORMAT: Hva vi ser, Hva det betyr, Konsekvens, Anbefalte tiltak
      if (lowerMessage.includes('anbefal') || lowerMessage.includes('tiltak') || lowerMessage.includes('hva skal jeg') || lowerMessage.includes('forklar')) {
        if (recommendations.length > 0) {
          const topRec = recommendations[0];
          
          // Beregn økonomiske konsekvenser
          const avgEnergy = historicalData.length > 0 
            ? historicalData.reduce((sum, d) => sum + d.energy, 0) / historicalData.length 
            : currentSensorData.energy;
          const extraPower = (topRec.potentialSavings / 100) * avgEnergy;
          const economic = calculateEconomicImpact(extraPower, 16, 1.25);
          
          // Bygg svar i nytt format
          let response = `**${topRec.title}**\n\n`;
          
          // 1. Hva vi ser
          response += `**1. Hva vi ser:**\n`;
          if (topRec.issue) {
            response += `${topRec.issue}\n\n`;
          } else {
            response += `${topRec.description}\n\n`;
          }
          
          // 2. Hva det betyr
          response += `**2. Hva det betyr:**\n`;
          if (topRec.type === 'vibration') {
            response += `Dette tyder på mekanisk slitasje eller feiljustering i pumpe- eller motordrift. Høy vibrasjon indikerer at utstyret jobber under suboptimale forhold, noe som øker energiforbruket og risikoen for uplanlagt stans.\n\n`;
          } else if (topRec.type === 'energy') {
            response += `Dette tyder på at utstyret bruker mer energi enn nødvendig. Dette kan skyldes overbelastning, ineffektiv drift, eller at driftspunktet ikke er optimalt justert.\n\n`;
          } else if (topRec.type === 'flow') {
            response += `Dette tyder på at pumpen jobber mot økt motstand i systemet. Dette kan skyldes tette filter, ventiler som ikke er optimalt justert, eller blokkeringer i rørledninger.\n\n`;
          } else {
            response += `${topRec.description}\n\n`;
          }
          
          // 3. Konsekvens (energi / kroner / risiko)
          response += `**3. Konsekvens:**\n`;
          response += `**Energi:** Dersom dette vedvarer, kan det gi ekstra energiforbruk på ca. ${extraPower.toFixed(1)}–${(extraPower * 1.2).toFixed(1)} kW over tid.\n\n`;
          response += `**Kroner:** Basert på konservativ vurdering kan dette gi en merkostnad på rundt ${economic.extra_cost_nok_year} kr per år dersom situasjonen vedvarer.\n\n`;
          response += `**Risiko:** Økt slitasje på utstyr kan føre til uplanlagt vedlikehold og potensielt produksjonstap.\n\n`;
          
          // 4. Anbefalte tiltak
          response += `**4. Anbefalte tiltak:**\n`;
          const actions = topRec.action.split('.').filter(a => a.trim()).map(a => a.trim());
          actions.forEach((action, idx) => {
            response += `${idx + 1}. ${action}\n`;
          });
          
          response += `\n*Merk: Dette er anbefalinger basert på sensordataene. Vurder sammen med din faglige kompetanse før implementering.*`;
          
          return response;
        }
        return `Basert på dine nåværende sensordata ser alt ut til å kjøre ganske optimalt! Ditt energiforbruk er ${currentSensorData.energy.toFixed(1)} kWh, som er innenfor normal område. Fortsett med god overvåking!`;
      }

      // Questions about how to implement
      if (lowerMessage.includes('hvordan') || lowerMessage.includes('implementer') || lowerMessage.includes('gjør jeg')) {
        if (recommendations.length > 0) {
          const rec = recommendations.find(r => 
            lowerMessage.includes('pumpe') && r.type === 'flow' ||
            lowerMessage.includes('oksygen') && r.type === 'oxygen' ||
            lowerMessage.includes('temperatur') && r.type === 'temperature' ||
            lowerMessage.includes('energi') && r.type === 'energy'
          ) || recommendations[0];

          let steps = '';
          if (rec.type === 'energy') {
            steps = `1. Gå til pumpestyringssystemet ditt\n2. Reduser pumpehastigheten med 10-15%\n3. Overvåk energiforbruket i dashboardet i 1 time\n4. Hvis energiforbruket synker uten negative effekter, kan du justere videre\n5. Justér ventilasjonssystemet tilsvarende`;
          } else if (rec.type === 'flow') {
            steps = `1. Lokaliser pumpekontrollen i ditt system\n2. Justér hastigheten til ${rec.action.match(/\d+\.?\d*/)?.[0] || 'optimal'} m³/h\n3. Overvåk oksygennivået i 30 minutter\n4. Kontroller at oksygennivået holder seg stabilt over 85 mg/L\n5. Justér videre hvis nødvendig`;
          } else if (rec.type === 'oxygen') {
            steps = `1. Finn aerasjonskontrollen i ditt system\n2. Reduser aerasjonsintensitet med 20-30%\n3. Overvåk oksygennivået kontinuerlig i dashboardet\n4. Hvis oksygennivået synker under 85 mg/L, justér tilbake litt\n5. Optimal nivå er rundt 90 mg/L`;
          } else if (rec.type === 'temperature') {
            steps = `1. Kontroller nåværende temperatur i dashboardet\n2. Justér kjøle- eller oppvarmingssystemet gradvis\n3. Overvåk temperaturen i 2 timer\n4. Kontroller at temperaturen stabiliserer seg rundt 11°C\n5. Justér videre hvis nødvendig`;
          } else {
            steps = `1. Planlegg vedlikehold i nærmeste vedlikeholdsperiode\n2. Kontroller pumper og filtreringssystem\n3. Rengjør eller bytt filtre hvis nødvendig\n4. Test systemet etter vedlikehold\n5. Overvåk energiforbruket for forbedringer`;
          }

          return `Her er en steg-for-steg guide for å implementere &ldquo;${rec.title}&rdquo;:\n\n${steps}\n\n**Tips:**\n- Gjør justeringer gradvis for å unngå sjokk\n- Overvåk alle parametere i dashboardet under implementering\n- Hvis noe ser ut til å gå feil, justér tilbake til forrige innstilling\n- Dokumenter endringene dine for fremtidig referanse\n\nHar du spørsmål om noen av stegene?`;
        }
      }

      // General data overview
      if (lowerMessage.includes('status') || lowerMessage.includes('oversikt') || lowerMessage.includes('hvordan går det')) {
        const analysis = analyzeSensorData(currentSensorData);
        const avgEnergy = historicalData.length > 0 
          ? historicalData.reduce((sum, d) => sum + d.energy, 0) / historicalData.length 
          : currentSensorData.energy;
        
        return `Her er en oversikt over ditt anlegg basert på sanntidsdata:\n\n**Nåværende målinger:**\n- Energi: ${currentSensorData.energy.toFixed(1)} kWh\n- Vannstrøm: ${currentSensorData.flow.toFixed(1)} L/min\n- Oksygen: ${currentSensorData.oxygen.toFixed(1)} mg/L\n- Temperatur: ${currentSensorData.temperature.toFixed(1)}°C\n\n**Analyse:**\n${analysis}\n\n**Gjennomsnittlig energiforbruk (siste 24t):** ${avgEnergy.toFixed(1)} kWh\n\n${recommendations.length > 0 ? `Jeg har ${recommendations.length} anbefaling(er) for deg som kan hjelpe med å optimalisere ytterligere. Vil du høre om dem?` : 'Alt ser bra ut! Fortsett med god overvåking.'}`;
      }
    }

    // General questions
    if (lowerMessage.includes('hei') || lowerMessage.includes('hallo')) {
      return `Hei! Jeg er AquaEnergy AI – din industrielle energi- og driftsrådgiver for elektromotorer, pumper og prosessutstyr.\n\nJeg kan hjelpe deg med:\n✅ Forstå hvorfor tiltak er foreslått\n✅ Forklare konsekvens i energi, kroner og drift\n✅ Utdype anbefalte tiltak i praktiske ord\n✅ Analysere sensordataene dine\n\nJeg gir aldri ordre, kun anbefalinger basert på faglig vurdering. Hva vil du vite mer om?`;
    }

    if (lowerMessage.includes('hjelp') || lowerMessage.includes('hva kan du')) {
      return `Jeg er AquaEnergy AI – en industriell energi- og driftsrådgiver for elektromotorer, pumper og prosessutstyr.\n\nJeg kan hjelpe deg med:\n\n📊 **Analysere sensordata:**\n- Forklare hva avvikene betyr\n- Identifisere trender og mønstre\n- Vurdere utstyr basert på industriregler\n\n💡 **Forklare tiltak:**\n- Forklare hvorfor tiltak er foreslått\n- Utdype konsekvenser i energi, kroner og drift\n- Gi praktiske anbefalinger (aldri ordre)\n\n⚙️ **Driftsrådgivning:**\n- Konservativ vurdering basert på faglige prinsipper\n- Fokus på elektromotorer, pumper og prosessutstyr\n- Anbefalinger som støtter din beslutning\n\n**Merk:** Jeg gir kun anbefalinger, ikke ordre. Du har alltid den endelige beslutningen basert på din faglige kompetanse.\n\nPrøv å spørre: "Forklar dette tiltaket" eller spør om spesifikke sensorverdier!`;
    }

    if (lowerMessage.includes('besparelse') || lowerMessage.includes('spare')) {
      return `Basert på dine sensordata og anbefalinger, kan du typisk spare 20-40% på energikostnader årlig.\n\n**Hvordan?**\n1. Optimalisering av pumpehastighet basert på faktisk behov\n2. Justering av aerasjonsintensitet til optimalt nivå\n3. Temperaturstyring for å unngå unødvendig kjøling/oppvarming\n4. Prediktivt vedlikehold for å forhindre ineffektiv drift\n\n${currentSensorData ? `Basert på dine nåværende data (${currentSensorData.energy.toFixed(1)} kWh), kan potensielle besparelser være betydelige.` : 'Se på dashboardet for konkrete anbefalinger basert på dine data.'}\n\nVil du at jeg skal analysere dine spesifikke data?`;
    }

    // Default response
    return `Jeg forstår at du spør om &ldquo;${userMessage}&rdquo;. For å gi deg best mulig hjelp, kan du spørre meg om:\n\n- Dine sensordata (energi, vannstrøm, oksygen, temperatur)\n- Anbefalinger og hvordan du implementerer dem\n- Status og oversikt over anlegget ditt\n- Energibesparelse og optimalisering\n\nEller si &ldquo;hjelp&rdquo; for å se alle mine funksjoner!`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await generateResponse(input);
    
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response,
      timestamp: Date.now(),
      dataContext: {
        sensorData: currentSensorData || undefined,
        recommendations: recommendations.length > 0 ? recommendations : undefined,
      },
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary-600 text-white rounded-full w-16 h-16 shadow-lg hover:bg-primary-700 transition-all flex items-center justify-center z-50 group"
          aria-label="Åpne chatbot"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border-2 border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 rounded-t-xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">AquaEnergy AI Assistent</h3>
              <p className="text-xs text-primary-100">Basert på dine sensordata</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Lukk chatbot"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  {message.dataContext?.sensorData && (
                    <div className="mt-2 pt-2 border-t border-gray-300 text-xs opacity-75">
                      📊 Basert på sanntidsdata
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 border border-gray-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Spør om sensordata, anbefalinger..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Prøv: &ldquo;Hvordan går det med energiforbruket?&rdquo; eller &ldquo;Forklar anbefalingene&rdquo;
            </p>
          </div>
        </div>
      )}
    </>
  );
}

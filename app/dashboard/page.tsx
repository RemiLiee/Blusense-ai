'use client';

import { useEffect, useState } from 'react';
import Graph from '@/components/Graph';
import Alerts from '@/components/Alerts';
import OptimizationPanel from '@/components/OptimizationPanel';
import VibrationGraph from '@/components/VibrationGraph';
import { sensorSimulator, SensorData, Alert } from '@/lib/sensorSimulator';
import { OptimizationRecommendation } from '@/lib/optimization';
import Chatbot from '@/components/Chatbot';

interface ImplementedAction {
  id: string;
  recommendationId: string;
  title: string;
  implementedAt: number;
  status: 'active' | 'completed' | 'paused';
  savings: number; // Percentage improvement
  savingsAmount: number; // NOK saved
}

export default function Dashboard() {
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [optimizationData, setOptimizationData] = useState<any>(null);
  const [implementedActions, setImplementedActions] = useState<ImplementedAction[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  useEffect(() => {
    // Generate initial data
    const initialData = sensorSimulator.generateHistoricalData(24, 15);
    setHistoricalData(initialData);
    
    const latest = initialData[initialData.length - 1];
    setCurrentData(latest);
    
    const initialAlerts = sensorSimulator.checkAlerts(latest);
    setAlerts(initialAlerts);

    // Load implemented actions from localStorage
    const savedActions = localStorage.getItem('implementedActions');
    if (savedActions) {
      setImplementedActions(JSON.parse(savedActions));
    }

    // Fetch optimization data
    fetchOptimizationData();

    // Update data every 5 seconds
    const interval = setInterval(() => {
      const newData = sensorSimulator.generateSensorData();
      setCurrentData(newData);
      
      // Add to historical data (keep last 24 hours)
      setHistoricalData(prev => {
        const updated = [...prev, newData];
        const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
        return updated.filter(d => d.timestamp >= oneDayAgo);
      });

      // Check for new alerts
      const newAlerts = sensorSimulator.checkAlerts(newData);
      setAlerts(prev => {
        const combined = [...prev, ...newAlerts];
        return combined.slice(-50);
      });
    }, 5000);

    // Update optimization data every 30 seconds
    const optimizationInterval = setInterval(fetchOptimizationData, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(optimizationInterval);
    };
  }, []);

  const fetchOptimizationData = async () => {
    try {
      const response = await fetch('/api/optimization?gateway_id=demo-gateway');
      if (response.ok) {
        const data = await response.json();
        setOptimizationData(data);
      }
    } catch (error) {
      console.error('Error fetching optimization:', error);
    }
  };

  const handleImplementAction = (recommendation: OptimizationRecommendation) => {
    const newAction: ImplementedAction = {
      id: `action-${Date.now()}`,
      recommendationId: recommendation.id,
      title: recommendation.title,
      implementedAt: Date.now(),
      status: 'active',
      savings: recommendation.potentialSavings,
      savingsAmount: recommendation.potentialSavings * 100, // Simplified calculation
    };
    
    const updated = [...implementedActions, newAction];
    setImplementedActions(updated);
    localStorage.setItem('implementedActions', JSON.stringify(updated));
  };

  const getTotalSavings = () => {
    return implementedActions.reduce((sum, action) => sum + action.savingsAmount, 0);
  };

  const getMonthlySavings = () => {
    // Calculate based on implemented actions and potential from recommendations
    const implementedSavings = getTotalSavings();
    const potentialSavings = optimizationData?.analysis?.savingsAmount || 0;
    return implementedSavings + (potentialSavings * 0.3); // 30% of potential if not all implemented
  };

  const getYearlySavings = () => {
    return getMonthlySavings() * 12;
  };

  const getSavingsPercentage = () => {
    if (!currentData || !optimizationData) return 0;
    const current = currentData.energy;
    const optimal = optimizationData.analysis?.optimalConsumption || current * 0.75;
    return Math.max(0, ((current - optimal) / current) * 100);
  };

  const getActiveActionsCount = () => {
    return implementedActions.filter(a => a.status === 'active').length;
  };

  const getBeforeAfterComparison = () => {
    if (!currentData || !optimizationData) return null;
    const current = currentData.energy;
    const optimal = optimizationData.analysis?.optimalConsumption || current * 0.75;
    const savings = current - optimal;
    return { before: current, after: optimal, savings };
  };

  if (!currentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Laster dashboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Energistyring Dashboard</h1>
              <p className="text-gray-600">Sanntids overvåking og AI-drevet optimalisering</p>
            </div>
            <div className="flex gap-2">
              {['24h', '7d', '30d'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe as any)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedTimeframe === timeframe
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border-2 border-green-200">
              <div className="text-sm text-gray-600 mb-1">Total besparelse</div>
              <div className="text-3xl font-bold text-green-700">{Math.round(getTotalSavings()).toLocaleString('no-NO')} kr</div>
              <div className="text-xs text-gray-600 mt-1">Fra implementerte tiltak</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-2 border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Aktive tiltak</div>
              <div className="text-3xl font-bold text-blue-700">{getActiveActionsCount()}</div>
              <div className="text-xs text-gray-600 mt-1">Iverksatt</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border-2 border-purple-200">
              <div className="text-sm text-gray-600 mb-1">Potensiell besparelse</div>
              <div className="text-3xl font-bold text-purple-700">
                {optimizationData?.analysis?.potentialSavings?.toFixed(1) || '0'}%
              </div>
              <div className="text-xs text-gray-600 mt-1">Fra AI-anbefalinger</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border-2 border-orange-200">
              <div className="text-sm text-gray-600 mb-1">Nåværende forbruk</div>
              <div className="text-3xl font-bold text-orange-700">{currentData.energy.toFixed(1)} kWh</div>
              <div className="text-xs text-gray-600 mt-1">Sanntids</div>
            </div>
          </div>
        </div>

        {/* Avvik og Anbefalinger - Automatisk vist */}
        {optimizationData?.recommendations && optimizationData.recommendations.length > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border-2 border-primary-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">🚨 Avvik Detektert & Anbefalinger</h2>
                <p className="text-gray-600">Automatiske anbefalinger basert på nåværende sensordata</p>
              </div>
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-semibold">
                {optimizationData.recommendations.length} {optimizationData.recommendations.length === 1 ? 'anbefaling' : 'anbefalinger'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {optimizationData.recommendations.map((rec: OptimizationRecommendation) => {
                // Calculate yearly savings from monthly estimate
                const monthlyMatch = rec.estimatedImpact.match(/(\d+(?:\s?\d+)?)\s*kr\/mnd/);
                const monthlySavings = monthlyMatch ? parseInt(monthlyMatch[1].replace(/\s/g, '')) : 0;
                const yearlySavings = monthlySavings * 12;
                const savingsPercentage = rec.potentialSavings || 0;

                return (
                  <div
                    key={rec.id}
                    className={`border-2 rounded-xl p-6 ${
                      rec.priority === 'high'
                        ? 'border-red-300 bg-red-50'
                        : rec.priority === 'medium'
                        ? 'border-yellow-300 bg-yellow-50'
                        : 'border-blue-300 bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{rec.title}</h3>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              rec.priority === 'high'
                                ? 'bg-red-200 text-red-800'
                                : rec.priority === 'medium'
                                ? 'bg-yellow-200 text-yellow-800'
                                : 'bg-blue-200 text-blue-800'
                            }`}
                          >
                            {rec.priority === 'high' ? '🔴 Høy prioritet' : rec.priority === 'medium' ? '🟡 Middels' : '🔵 Lav'}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{rec.description}</p>
                      </div>
                    </div>

                    {/* Besparelser og investering */}
                    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Potensiell reduksjon</div>
                          <div className="text-2xl font-bold text-green-600">{savingsPercentage}%</div>
                        </div>
                        {rec.savingsKWhPerYear && (
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Besparelse (kWh/år)</div>
                            <div className="text-2xl font-bold text-green-600">{Math.round(rec.savingsKWhPerYear).toLocaleString('no-NO')} kWh</div>
                          </div>
                        )}
                        {rec.savingsAmountPerYear && (
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Besparelse (kr/år)</div>
                            <div className="text-2xl font-bold text-green-600">{Math.round(rec.savingsAmountPerYear).toLocaleString('no-NO')} kr</div>
                          </div>
                        )}
                        {rec.investmentCost && (
                          <div>
                            <div className="text-xs text-gray-600 mb-1">Investeringskostnad</div>
                            <div className="text-2xl font-bold text-blue-600">{Math.round(rec.investmentCost).toLocaleString('no-NO')} kr</div>
                          </div>
                        )}
                      </div>
                      {rec.paybackMonths && rec.paybackMonths > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-600">Tilbakebetalingstid</div>
                            <div className="text-lg font-bold text-gray-900">
                              {rec.paybackMonths < 12 
                                ? `${Math.round(rec.paybackMonths)} måneder`
                                : `${Math.round(rec.paybackMonths / 12 * 10) / 10} år`
                              }
                            </div>
                          </div>
                        </div>
                      )}
                      {rec.issue && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-xs font-semibold text-gray-700 mb-1">Detektert avvik:</div>
                          <div className="text-sm text-gray-900">{rec.issue}</div>
                        </div>
                      )}
                    </div>

                    {/* Anbefalt handling */}
                    <div className="bg-white/80 rounded-lg p-3 mb-3 border border-gray-200">
                      <div className="text-sm font-semibold text-gray-700 mb-1">📋 Anbefalt tiltak:</div>
                      <div className="text-base text-gray-900">{rec.action}</div>
                    </div>

                    {/* Implementer knapp */}
                    {!implementedActions.some(a => a.recommendationId === rec.id) && (
                      <button
                        onClick={() => handleImplementAction(rec)}
                        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
                      >
                        ✅ Marker som implementert
                      </button>
                    )}
                    {implementedActions.some(a => a.recommendationId === rec.id) && (
                      <div className="w-full bg-green-100 text-green-800 px-6 py-3 rounded-lg font-semibold text-center border-2 border-green-300">
                        ✓ Tiltak er implementert
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total potensiell besparelse */}
            {optimizationData.recommendations.length > 0 && (
              <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Total Potensiell Besparelse</h3>
                    <p className="text-gray-600 text-sm">Hvis alle anbefalinger implementeres</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-green-700">
                      {optimizationData.analysis?.savingsAmount 
                        ? (optimizationData.analysis.savingsAmount * 12).toLocaleString('no-NO')
                        : '0'} kr
                    </div>
                    <div className="text-sm text-gray-600">per år</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Current Stats & Graphs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Sensor Readings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sanntids Målinger</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">Energi</div>
                  <div className="text-2xl font-bold text-blue-700">{currentData.energy.toFixed(2)} kWh</div>
                  <div className="text-xs text-gray-500 mt-1">Nåværende</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-gray-600 mb-1">Vannstrøm</div>
                  <div className="text-2xl font-bold text-green-700">{currentData.flow.toFixed(1)} L/min</div>
                  <div className="text-xs text-gray-500 mt-1">Nåværende</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <div className="text-sm text-gray-600 mb-1">Oksygen</div>
                  <div className="text-2xl font-bold text-purple-700">{currentData.oxygen.toFixed(2)} mg/L</div>
                  <div className="text-xs text-gray-500 mt-1">Nåværende</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                  <div className="text-sm text-gray-600 mb-1">Temperatur</div>
                  <div className="text-2xl font-bold text-orange-700">{currentData.temperature.toFixed(1)}°C</div>
                  <div className="text-xs text-gray-500 mt-1">Nåværende</div>
                </div>
                {currentData.vibration !== undefined && (
                  <div className={`rounded-lg p-4 border ${
                    currentData.vibration > 10 
                      ? 'bg-red-50 border-red-200' 
                      : currentData.vibration > 7 
                      ? 'bg-yellow-50 border-yellow-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="text-sm text-gray-600 mb-1">Vibrasjon</div>
                    <div className={`text-2xl font-bold ${
                      currentData.vibration > 10 
                        ? 'text-red-700' 
                        : currentData.vibration > 7 
                        ? 'text-yellow-700' 
                        : 'text-green-700'
                    }`}>
                      {currentData.vibration.toFixed(1)} mm/s
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {currentData.vibration > 10 ? 'Kritisk' : currentData.vibration > 7 ? 'Høy' : 'Normal'}
                    </div>
                  </div>
                )}
                {currentData.efficiency !== undefined && (
                  <div className={`rounded-lg p-4 border ${
                    currentData.efficiency < 70 
                      ? 'bg-red-50 border-red-200' 
                      : currentData.efficiency < 75 
                      ? 'bg-yellow-50 border-yellow-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="text-sm text-gray-600 mb-1">Effektivitet</div>
                    <div className={`text-2xl font-bold ${
                      currentData.efficiency < 70 
                        ? 'text-red-700' 
                        : currentData.efficiency < 75 
                        ? 'text-yellow-700' 
                        : 'text-green-700'
                    }`}>
                      {currentData.efficiency.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {currentData.efficiency < 70 ? 'Lav' : currentData.efficiency < 75 ? 'Moderat' : 'God'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Graph
                title="Energiforbruk (siste 24 timer)"
                data={historicalData}
                dataKey="energy"
                unit="kWh"
                color="primary"
              />
              <Graph
                title="Vannstrøm"
                data={historicalData}
                dataKey="flow"
                unit="L/min"
                color="blue"
              />
              <Graph
                title="Oksygennivå"
                data={historicalData}
                dataKey="oxygen"
                unit="mg/L"
                color="green"
              />
              <Graph
                title="Temperatur"
                data={historicalData}
                dataKey="temperature"
                unit="°C"
                color="orange"
              />
              {currentData.vibration !== undefined && (
                <VibrationGraph
                  title="Vibrasjon (siste 24 timer)"
                  data={historicalData.filter(d => d.vibration !== undefined)}
                  dataKey="vibration"
                  unit="mm/s"
                />
              )}
              {currentData.efficiency !== undefined && (
                <Graph
                  title="Effektivitet"
                  data={historicalData.filter(d => d.efficiency !== undefined)}
                  dataKey="efficiency"
                  unit="%"
                  color="green"
                />
              )}
            </div>

            {/* Alerts */}
            <div className="mb-8">
              <Alerts alerts={alerts} />
            </div>
          </div>

          {/* Right Column - AI Recommendations */}
          <div className="space-y-6">
            <OptimizationPanel 
              onImplementAction={handleImplementAction}
              implementedActions={implementedActions.map(a => a.recommendationId)}
            />
            
            {/* Implemented Actions */}
            {implementedActions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Implementerte Tiltak</h2>
                <div className="space-y-3">
                  {implementedActions.slice(-5).reverse().map((action) => (
                    <div
                      key={action.id}
                      className="bg-green-50 border-2 border-green-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{action.title}</h3>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-200 text-green-800">
                          {action.status === 'active' ? 'Aktiv' : action.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        Implementert: {new Date(action.implementedAt).toLocaleDateString('no-NO')}
                      </div>
                      <div className="text-sm font-semibold text-green-700">
                        Besparelse: {action.savings.toFixed(1)}% | {Math.round(action.savingsAmount).toLocaleString('no-NO')} kr
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Recommendations with Action Steps */}
        {optimizationData?.recommendations && optimizationData.recommendations.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Anbefalinger med Konkrete Tiltak</h2>
            <div className="space-y-6">
              {optimizationData.recommendations.map((rec: OptimizationRecommendation) => {
                const isImplemented = implementedActions.some(a => a.recommendationId === rec.id);
                return (
                  <div
                    key={rec.id}
                    className={`border-2 rounded-xl p-6 ${
                      rec.priority === 'high'
                        ? 'border-red-300 bg-red-50'
                        : rec.priority === 'medium'
                        ? 'border-yellow-300 bg-yellow-50'
                        : 'border-blue-300 bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{rec.title}</h3>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              rec.priority === 'high'
                                ? 'bg-red-200 text-red-800'
                                : rec.priority === 'medium'
                                ? 'bg-yellow-200 text-yellow-800'
                                : 'bg-blue-200 text-blue-800'
                            }`}
                          >
                            {rec.priority === 'high' ? '🔴 Høy prioritet' : rec.priority === 'medium' ? '🟡 Middels' : '🔵 Lav'}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{rec.description}</p>
                      </div>
                      {rec.potentialSavings > 0 && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{rec.potentialSavings}%</div>
                          <div className="text-sm text-gray-600">potensiell besparelse</div>
                          <div className="text-sm font-semibold text-green-700 mt-1">{rec.estimatedImpact}</div>
                        </div>
                      )}
                    </div>

                    {/* Action Steps */}
                    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                      <div className="text-sm font-semibold text-gray-700 mb-2">📋 Anbefalt handling:</div>
                      <div className="text-base text-gray-900 mb-3">{rec.action}</div>
                      
                      {/* Step-by-step instructions based on type */}
                      <div className="mt-4 space-y-2">
                        {rec.type === 'energy' && (
                          <>
                            <div className="text-sm font-semibold text-gray-700">Steg-for-steg:</div>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 ml-2">
                              <li>Gå til pumpestyringssystemet</li>
                              <li>Reduser pumpehastighet med 10-15%</li>
                              <li>Overvåk energiforbruk i 1 time</li>
                              <li>Justér videre hvis nødvendig</li>
                            </ol>
                          </>
                        )}
                        {rec.type === 'flow' && (
                          <>
                            <div className="text-sm font-semibold text-gray-700">Steg-for-steg:</div>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 ml-2">
                              <li>Kontroller nåværende pumpehastighet</li>
                              <li>Justér til anbefalt hastighet: {rec.action.match(/\d+\.?\d*/)?.[0] || 'optimal'} m³/h</li>
                              <li>Overvåk oksygennivå i 30 minutter</li>
                              <li>Kontroller at oksygennivået holder seg stabilt</li>
                            </ol>
                          </>
                        )}
                        {rec.type === 'oxygen' && (
                          <>
                            <div className="text-sm font-semibold text-gray-700">Steg-for-steg:</div>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 ml-2">
                              <li>Finn aerasjonskontrollen</li>
                              <li>Reduser aerasjonsintensitet med 20-30%</li>
                              <li>Overvåk oksygennivå kontinuerlig</li>
                              <li>Justér hvis oksygennivået synker under 85%</li>
                            </ol>
                          </>
                        )}
                        {rec.type === 'temperature' && (
                          <>
                            <div className="text-sm font-semibold text-gray-700">Steg-for-steg:</div>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 ml-2">
                              <li>Kontroller nåværende temperatur</li>
                              <li>Justér kjøle-/oppvarmingssystem</li>
                              <li>Overvåk temperatur i 2 timer</li>
                              <li>Kontroller at temperaturen stabiliserer seg</li>
                            </ol>
                          </>
                        )}
                        {rec.type === 'maintenance' && (
                          <>
                            <div className="text-sm font-semibold text-gray-700">Steg-for-steg:</div>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 ml-2">
                              <li>Planlegg vedlikehold i nærmeste vedlikeholdsperiode</li>
                              <li>Kontroller pumper og filtreringssystem</li>
                              <li>Rengjør eller bytt filtre hvis nødvendig</li>
                              <li>Test systemet etter vedlikehold</li>
                            </ol>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Implement Button */}
                    {!isImplemented && (
                      <button
                        onClick={() => handleImplementAction(rec)}
                        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
                      >
                        ✅ Marker som implementert
                      </button>
                    )}
                    {isImplemented && (
                      <div className="w-full bg-green-100 text-green-800 px-6 py-3 rounded-lg font-semibold text-center border-2 border-green-300">
                        ✓ Tiltak er implementert
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Savings Timeline */}
        {implementedActions.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Besparelser Over Tid</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-sm text-gray-600 mb-1">I dag</div>
                <div className="text-2xl font-bold text-green-700">
                  {Math.round(getTotalSavings() * 0.03).toLocaleString('no-NO')} kr
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-sm text-gray-600 mb-1">Denne måneden</div>
                <div className="text-2xl font-bold text-green-700">
                  {Math.round(getTotalSavings()).toLocaleString('no-NO')} kr
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-sm text-gray-600 mb-1">Årlig estimat</div>
                <div className="text-2xl font-bold text-green-700">
                  {Math.round(getTotalSavings() * 12).toLocaleString('no-NO')} kr
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Chatbot */}
        <Chatbot 
          currentSensorData={currentData}
          recommendations={optimizationData?.recommendations || []}
          historicalData={historicalData}
        />
      </div>
    </div>
  );
}

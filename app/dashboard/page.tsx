'use client';

import { useEffect, useState } from 'react';
import RechartsGraph from '@/components/RechartsGraph';
import Alerts from '@/components/Alerts';
import OptimizationPanel from '@/components/OptimizationPanel';

// Client-side safe default (use NEXT_PUBLIC_ prefix for env vars in Next.js)
const DEFAULT_SITE_ID = (typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_DEFAULT_SITE_ID || 'demo-gateway')
  : 'demo-gateway');

interface LatestSensorData {
  energy: number;
  flow: number;
  oxygen: number;
  temperature: number;
  timestamp: number;
}

export default function Dashboard() {
  const [currentData, setCurrentData] = useState<LatestSensorData | null>(null);
  const [energyData, setEnergyData] = useState<{ timestamp: number; value: number }[]>([]);
  const [flowData, setFlowData] = useState<{ timestamp: number; value: number }[]>([]);
  const [o2Data, setO2Data] = useState<{ timestamp: number; value: number }[]>([]);
  const [tempData, setTempData] = useState<{ timestamp: number; value: number }[]>([]);
  const [dataSource, setDataSource] = useState<'mock' | 'live'>('mock');

  const fetchLatestData = async () => {
    try {
      const siteId = DEFAULT_SITE_ID || 'demo-gateway';
      const response = await fetch(`/api/site/${siteId}/latest`);
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.sensors) {
          const newData: LatestSensorData = {
            energy: result.sensors.energy?.value || 0,
            flow: result.sensors.flow?.value || 0,
            oxygen: result.sensors.oxygen?.value || 0,
            temperature: result.sensors.temperature?.value || 0,
            timestamp: result.timestamp || Date.now(),
          };
          
          setCurrentData(newData);
          setDataSource(result.source || 'live');
          
          const now = Date.now();
          const oneHourAgo = now - 60 * 60 * 1000;
          
          setEnergyData(prev => {
            const updated = [...prev, { timestamp: newData.timestamp, value: newData.energy }];
            return updated.filter(d => d.timestamp >= oneHourAgo).slice(-30);
          });
          
          setFlowData(prev => {
            const updated = [...prev, { timestamp: newData.timestamp, value: newData.flow }];
            return updated.filter(d => d.timestamp >= oneHourAgo).slice(-30);
          });
          
          setO2Data(prev => {
            const updated = [...prev, { timestamp: newData.timestamp, value: newData.oxygen }];
            return updated.filter(d => d.timestamp >= oneHourAgo).slice(-30);
          });
          
          setTempData(prev => {
            const updated = [...prev, { timestamp: newData.timestamp, value: newData.temperature }];
            return updated.filter(d => d.timestamp >= oneHourAgo).slice(-30);
          });
        } else {
          // Fallback to mock data if API returns invalid response
          if (!currentData) {
            setCurrentData({
              energy: 150,
              flow: 30,
              oxygen: 90,
              temperature: 11,
              timestamp: Date.now(),
            });
            setDataSource('mock');
          }
        }
      } else {
        console.error('Failed to fetch latest data:', response.statusText);
        // Fallback to mock data on error
        if (!currentData) {
          setCurrentData({
            energy: 150,
            flow: 30,
            oxygen: 90,
            temperature: 11,
            timestamp: Date.now(),
          });
          setDataSource('mock');
        }
      }
    } catch (error) {
      console.error('Error fetching latest data:', error);
      // Fallback to mock data on error
      if (!currentData) {
        setCurrentData({
          energy: 150,
          flow: 30,
          oxygen: 90,
          temperature: 11,
          timestamp: Date.now(),
        });
        setDataSource('mock');
      }
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLatestData();

    // Update data every 2 seconds
    const interval = setInterval(fetchLatestData, 2000);

    return () => clearInterval(interval);
  }, []);

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
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Dashboard</h1>
              <p className="text-gray-600">Sanntids overvåking av akvakulturoperasjonene dine</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${dataSource === 'live' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm text-gray-600">
                {dataSource === 'live' ? 'Live data' : 'Mock data'}
              </span>
            </div>
          </div>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-blue-700">Energiforbruk</div>
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-blue-900">{currentData.energy.toFixed(2)}</div>
            <div className="text-sm text-blue-600 mt-1">kWh</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl shadow-lg border border-cyan-200 p-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-cyan-700">Vannstrøm</div>
              <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-cyan-900">{currentData.flow.toFixed(1)}</div>
            <div className="text-sm text-cyan-600 mt-1">m³/h</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-green-700">Oksygen</div>
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-900">{currentData.oxygen.toFixed(1)}</div>
            <div className="text-sm text-green-600 mt-1">%</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg border border-orange-200 p-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-orange-700">Temperatur</div>
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-orange-900">{currentData.temperature.toFixed(1)}</div>
            <div className="text-sm text-orange-600 mt-1">°C</div>
          </div>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RechartsGraph
            title="Energiforbruk (kWh)"
            data={energyData}
            unit="kWh"
            color="#1A73E8"
          />
          <RechartsGraph
            title="Vannstrøm (m³/h)"
            data={flowData}
            unit="m³/h"
            color="#0B3C61"
          />
          <RechartsGraph
            title="Oksygen (%)"
            data={o2Data}
            unit="%"
            color="#10b981"
          />
          <RechartsGraph
            title="Temperatur (°C)"
            data={tempData}
            unit="°C"
            color="#f59e0b"
          />
        </div>

        {/* Optimization Panel */}
        <div className="mb-8">
          <OptimizationPanel />
        </div>

        {/* Alerts */}
        <div className="mb-8">
          <Alerts alerts={[]} />
        </div>
      </div>
    </div>
  );
}



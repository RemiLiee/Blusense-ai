'use client';

import { SensorData } from '@/lib/sensorSimulator';

interface VibrationGraphProps {
  title: string;
  data: SensorData[];
  dataKey: keyof SensorData;
  unit: string;
}

export default function VibrationGraph({ title, data, dataKey, unit }: VibrationGraphProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500">Ingen data tilgjengelig</p>
      </div>
    );
  }

  const values = data.map(d => (d[dataKey] as number) || 0).filter(v => v > 0);
  if (values.length === 0) return null;

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const currentValue = values[values.length - 1];

  // Color coding: red > 10, yellow > 7, green <= 7
  const getColor = (value: number) => {
    if (value > 10) return 'bg-red-500';
    if (value > 7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          <div className={`text-2xl font-bold ${currentValue > 10 ? 'text-red-600' : currentValue > 7 ? 'text-yellow-600' : 'text-green-600'}`}>
            {currentValue.toFixed(1)} {unit}
          </div>
          {currentValue > 10 && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Kritisk</span>}
          {currentValue > 7 && currentValue <= 10 && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Høy</span>}
          {currentValue <= 7 && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Normal</span>}
        </div>
      </div>
      <div className="h-48 flex items-end space-x-1">
        {values.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`flex-1 ${getColor(value)} rounded-t opacity-70 hover:opacity-100 transition-opacity`}
              style={{ height: `${Math.max(height, 5)}%` }}
              title={`${value.toFixed(1)} ${unit} - ${value > 10 ? 'Kritisk' : value > 7 ? 'Høy' : 'Normal'}`}
            />
          );
        })}
      </div>
      <div className="mt-4 flex justify-between items-center text-xs">
        <div className="flex gap-4">
          <span>Min: {min.toFixed(1)} {unit}</span>
          <span>Max: {max.toFixed(1)} {unit}</span>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            Normal (&lt;7)
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            Høy (7-10)
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            Kritisk (&gt;10)
          </span>
        </div>
      </div>
    </div>
  );
}


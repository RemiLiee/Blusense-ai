'use client';

import { SensorData } from '@/lib/sensorSimulator';

interface GraphProps {
  title: string;
  data: SensorData[];
  dataKey: keyof SensorData;
  unit: string;
  color?: string;
}

export default function Graph({ title, data, dataKey, unit, color = 'primary' }: GraphProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500">Ingen data tilgjengelig</p>
      </div>
    );
  }

  const values = data.map(d => d[dataKey] as number);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const colorClasses = {
    primary: 'bg-primary-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  const currentValue = values[values.length - 1];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="text-2xl font-bold text-gray-900">
          {currentValue.toFixed(dataKey === 'temperature' ? 1 : 2)} {unit}
        </div>
      </div>
      <div className="h-48 flex items-end space-x-1">
        {values.map((value, index) => {
          const height = ((value - min) / range) * 100;
          return (
            <div
              key={index}
              className={`flex-1 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary} rounded-t opacity-70 hover:opacity-100 transition-opacity`}
              style={{ height: `${Math.max(height, 5)}%` }}
              title={`${value.toFixed(2)} ${unit}`}
            />
          );
        })}
      </div>
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>Min: {min.toFixed(2)} {unit}</span>
        <span>Max: {max.toFixed(2)} {unit}</span>
      </div>
    </div>
  );
}


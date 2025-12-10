'use client';

import { useState } from 'react';
import { Alert } from '@/lib/sensorSimulator';

interface AlertsProps {
  alerts: Alert[];
}

export default function Alerts({ alerts }: AlertsProps) {
  const [showAll, setShowAll] = useState(false);
  const maxVisible = 5; // Show max 5 alerts initially

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Varsler</h2>
        <p className="text-gray-500 text-sm">Ingen aktive varsler</p>
      </div>
    );
  }

  // Sort alerts by priority: error > warning > info
  const sortedAlerts = [...alerts].sort((a, b) => {
    const priority = { error: 3, warning: 2, info: 1 };
    return priority[b.type] - priority[a.type];
  });

  const visibleAlerts = showAll ? sortedAlerts : sortedAlerts.slice(0, maxVisible);
  const hiddenCount = sortedAlerts.length - maxVisible;

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Count by type
  const errorCount = sortedAlerts.filter(a => a.type === 'error').length;
  const warningCount = sortedAlerts.filter(a => a.type === 'warning').length;
  const infoCount = sortedAlerts.filter(a => a.type === 'info').length;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Varsler</h2>
        <div className="flex gap-2 text-xs">
          {errorCount > 0 && <span className="bg-red-100 text-red-800 px-2 py-1 rounded">{errorCount} kritisk</span>}
          {warningCount > 0 && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{warningCount} advarsel</span>}
          {infoCount > 0 && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{infoCount} info</span>}
        </div>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {visibleAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-2.5 flex items-start space-x-2 text-sm ${getAlertColor(alert.type)}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium leading-tight">{alert.message}</p>
              <p className="text-xs opacity-75 mt-0.5">
                {new Date(alert.timestamp).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
      {hiddenCount > 0 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-3 w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Vis {hiddenCount} flere varsler ↓
        </button>
      )}
      {showAll && sortedAlerts.length > maxVisible && (
        <button
          onClick={() => setShowAll(false)}
          className="mt-3 w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Vis færre ↑
        </button>
      )}
    </div>
  );
}


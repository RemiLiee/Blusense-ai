'use client';

import { MaintenanceAlert } from '@/lib/maintenance';

interface MaintenanceAlertsProps {
  alerts: MaintenanceAlert[];
}

export default function MaintenanceAlerts({ alerts }: MaintenanceAlertsProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Vedlikehold</h2>
        <p className="text-gray-500 text-sm">Ingen vedlikeholdsbehov detektert</p>
      </div>
    );
  }

  const getSeverityColor = (severity: MaintenanceAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-300 text-red-900';
      case 'warning':
        return 'bg-yellow-50 border-yellow-300 text-yellow-900';
      case 'info':
        return 'bg-blue-50 border-blue-300 text-blue-900';
      default:
        return 'bg-gray-50 border-gray-300 text-gray-900';
    }
  };

  const getUrgencyText = (urgency: MaintenanceAlert['urgency']) => {
    switch (urgency) {
      case 'immediate':
        return 'Umiddelbart';
      case 'within_week':
        return 'Innen uke';
      case 'within_month':
        return 'Innen måned';
      case 'planned':
        return 'Planlagt';
      default:
        return '';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('no-NO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Vedlikehold ({alerts.length})</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-2 rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{alert.title}</h3>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/50">
                {getUrgencyText(alert.urgency)}
              </span>
            </div>
            <p className="text-sm mb-3 opacity-90">{alert.description}</p>
            <div className="bg-white/50 rounded p-3 mb-2">
              <div className="text-xs font-semibold mb-1">Anbefalt handling:</div>
              <div className="text-sm">{alert.recommendedAction}</div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="font-semibold">Estimatet feil:</span>{' '}
                {formatDate(alert.estimatedFailureTime)}
              </div>
              <div className="font-semibold">
                Estimatet kostnad: {alert.costEstimate.toLocaleString('no-NO')} kr
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




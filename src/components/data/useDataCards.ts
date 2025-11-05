import { Moon, FileText } from 'lucide-react';
import { DataCard } from './types';

export function useDataCards(): DataCard[] {
  return [
    {
      title: 'Sleep',
      description: 'Sleep tracking data',
      icon: Moon,
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/20',
      gradientColor: 'rgb(59 130 246 / 0.15)',
      emptyMessage: 'No sleep data available'
    },
    {
      title: 'Logs',
      description: 'System activity logs',
      icon: FileText,
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/20',
      gradientColor: 'rgb(16 185 129 / 0.15)',
      emptyMessage: 'No logs available'
    }
  ];
}

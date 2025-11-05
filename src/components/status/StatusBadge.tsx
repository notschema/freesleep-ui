import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ServiceStatus } from './types';

interface StatusBadgeProps {
  status: ServiceStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'healthy') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        <span className="text-xs font-semibold text-emerald-400">Healthy</span>
      </div>
    );
  }

  if (status === 'not-started') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-500/20 border border-gray-500/30">
        <Clock className="w-3 h-3 text-gray-400" />
        <span className="text-xs font-semibold text-gray-400">Not started</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/30">
      <XCircle className="w-3 h-3 text-red-400" />
      <span className="text-xs font-semibold text-red-400">Error</span>
    </div>
  );
}

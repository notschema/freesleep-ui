import { Play } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { ServiceStatus } from './types';

interface ServiceCardProps {
  title: string;
  description?: string;
  status: ServiceStatus;
  timestamp?: string;
  onRun?: () => void;
}

export default function ServiceCard({ title, description, status, timestamp, onRun }: ServiceCardProps) {
  return (
    <div className="relative bg-neutral-800/50 backdrop-blur-xl border border-neutral-700/50 rounded-xl p-4 transition-all duration-300 hover:border-neutral-600/50 hover:shadow-lg hover:shadow-black/20 hover:transform hover:scale-[1.02] overflow-hidden group">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: status === 'healthy'
            ? 'linear-gradient(to bottom right, rgb(16 185 129 / 0.05) 0%, transparent 50%)'
            : 'linear-gradient(to bottom right, rgb(107 114 128 / 0.05) 0%, transparent 50%)'
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="text-sm font-semibold text-white leading-tight flex-1">{title}</h3>
          <StatusBadge status={status} />
        </div>

        {description && (
          <p className="text-xs text-gray-400 leading-relaxed mb-3">{description}</p>
        )}

        {timestamp && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-1 h-1 rounded-full bg-gray-500" />
            <p className="text-xs text-gray-500 font-mono">{timestamp}</p>
          </div>
        )}

        {onRun && (
          <button
            onClick={onRun}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/40 text-blue-400 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/10"
          >
            RUN
            <Play className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

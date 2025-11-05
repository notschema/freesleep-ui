import { ChevronDown, ChevronUp } from 'lucide-react';
import { ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  icon: ReactNode;
  iconColor: string;
  gradientColor: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function CollapsibleSection({
  title,
  icon,
  iconColor,
  gradientColor,
  isOpen,
  onToggle,
  children
}: CollapsibleSectionProps) {
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, ${gradientColor} 100%)`
        }}
      />
      <button
        onClick={onToggle}
        className="relative w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={iconColor}>{icon}</div>
          <span className="font-semibold text-white">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="relative p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}

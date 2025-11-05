import React from 'react';
import { cn } from '@/lib/utils';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(!checked);
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center h-8 w-16 rounded-full transition-all duration-300 ease-in-out",
        "backdrop-blur-xl border shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900",
        checked
          ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30 focus:ring-blue-500/50"
          : "bg-gradient-to-r from-white/5 to-white/10 border-white/10 focus:ring-white/20"
      )}
    >
      {/* Indicator dot - left side */}
      <div
        className={cn(
          "absolute left-2 w-1.5 h-1.5 rounded-full transition-all duration-300",
          checked
            ? "bg-white/30 shadow-none"
            : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
        )}
      />

      {/* Indicator dot - right side */}
      <div
        className={cn(
          "absolute right-2 w-1.5 h-1.5 rounded-full transition-all duration-300",
          checked
            ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
            : "bg-white/30 shadow-none"
        )}
      />

      {/* Toggle knob */}
      <div
        className={cn(
          "absolute top-1 h-6 w-6 rounded-full transition-all duration-300 ease-in-out",
          "bg-gradient-to-br shadow-xl transform",
          checked
            ? "translate-x-9 from-blue-100 to-blue-50 shadow-blue-500/30"
            : "translate-x-1 from-white to-gray-100 shadow-black/30"
        )}
      >
        {/* Inner highlight */}
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/60 to-transparent" />
      </div>
    </button>
  );
};

export default ToggleSwitch;

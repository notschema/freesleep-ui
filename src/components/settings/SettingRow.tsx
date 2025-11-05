import { ReactNode } from 'react';

interface SettingRowProps {
  label: string;
  description?: string;
  children: ReactNode;
}

export default function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <div className="py-4 border-b border-neutral-700/30 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-white block mb-1">{label}</label>
          {description && (
            <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}

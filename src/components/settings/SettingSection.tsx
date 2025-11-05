import { ReactNode } from 'react';

interface SettingSectionProps {
  title: string;
  children: ReactNode;
}

export default function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 p-6 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, rgb(64 64 64 / 0.15) 100%)'
        }}
      />
      <div className="relative">
        <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
        {children}
      </div>
    </div>
  );
}

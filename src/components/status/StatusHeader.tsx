interface StatusHeaderProps {
  currentDate: string;
}

export default function StatusHeader({ currentDate }: StatusHeaderProps) {
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 p-6 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, rgb(16 185 129 / 0.15) 100%)'
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-1">Server Status</h2>
            <p className="text-xs text-gray-400">Updated at {currentDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

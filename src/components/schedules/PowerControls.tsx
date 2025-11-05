import { TEMP_MIN, TEMP_MAX } from './types';

interface PowerControlsProps {
  powerOnTime: string;
  powerOnTemp: number;
  powerOffTime: string;
  onUpdatePowerOn: (field: 'time' | 'temp', value: string | number) => void;
  onUpdatePowerOff: (time: string) => void;
}

export default function PowerControls({
  powerOnTime,
  powerOnTemp,
  powerOffTime,
  onUpdatePowerOn,
  onUpdatePowerOff
}: PowerControlsProps) {
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 p-4 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, rgb(59 130 246 / 0.05) 100%)'
        }}
      />
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Power On</h3>
          <input
            type="time"
            value={powerOnTime}
            onChange={(e) => onUpdatePowerOn('time', e.target.value)}
            className="w-full bg-neutral-900/50 border border-neutral-700/50 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
          />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Power On Temperature {powerOnTemp}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{TEMP_MIN}°C</span>
              <input
                type="range"
                min={TEMP_MIN}
                max={TEMP_MAX}
                step="0.5"
                value={powerOnTemp}
                onChange={(e) => onUpdatePowerOn('temp', Number(e.target.value))}
                className="flex-1 h-2 bg-neutral-700/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <span className="text-xs text-gray-500">43.5°C</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Power Off</h3>
          <input
            type="time"
            value={powerOffTime}
            onChange={(e) => onUpdatePowerOff(e.target.value)}
            className="w-full bg-neutral-900/50 border border-neutral-700/50 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50"
          />
        </div>
      </div>
    </div>
  );
}

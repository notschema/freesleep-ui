import { TEMP_MIN, TEMP_MAX } from './types';
import { displayTemp, getTempMin, getTempMax, getTemperatureUnit, fahrenheitToCelsius } from '@/lib/temperature';

interface PowerControlsProps {
  powerOnTime: string;
  powerOnTemp: number;
  powerOffTime: string;
  useFahrenheit: boolean;
  onUpdatePowerOn: (field: 'time' | 'temp', value: string | number) => void;
  onUpdatePowerOff: (time: string) => void;
}

export default function PowerControls({
  powerOnTime,
  powerOnTemp,
  powerOffTime,
  useFahrenheit,
  onUpdatePowerOn,
  onUpdatePowerOff
}: PowerControlsProps) {
  const tempUnit = getTemperatureUnit(useFahrenheit);
  const tempMin = getTempMin(useFahrenheit);
  const tempMax = getTempMax(useFahrenheit);
  const displayedTemp = displayTemp(powerOnTemp, useFahrenheit);

  const handleTempChange = (value: number) => {
    const celsiusValue = useFahrenheit ? fahrenheitToCelsius(value) : value;
    onUpdatePowerOn('temp', celsiusValue);
  };
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 p-4 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0 bg-neutral-800/30"
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
              <span className="text-xs text-gray-400">Power On Temperature {displayedTemp.toFixed(1)}{tempUnit}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{tempMin.toFixed(1)}{tempUnit}</span>
              <input
                type="range"
                min={tempMin}
                max={tempMax}
                step={useFahrenheit ? "1" : "0.5"}
                value={displayedTemp}
                onChange={(e) => handleTempChange(Number(e.target.value))}
                className="flex-1 h-2 bg-neutral-700/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <span className="text-xs text-gray-500">{tempMax.toFixed(1)}{tempUnit}</span>
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

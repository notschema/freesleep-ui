import { Plus, X, Thermometer, ChevronDown, ChevronUp } from 'lucide-react';
import { TemperatureAdjustment, TEMP_MIN, TEMP_MAX } from './types';
import { displayTemp, getTempMin, getTempMax, getTemperatureUnit, fahrenheitToCelsius } from '@/lib/temperature';

interface TemperatureAdjustmentsProps {
  adjustments: TemperatureAdjustment[];
  isOpen: boolean;
  useFahrenheit: boolean;
  onToggle: () => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: 'time' | 'temperature', value: string | number) => void;
}

export default function TemperatureAdjustments({
  adjustments,
  isOpen,
  useFahrenheit,
  onToggle,
  onAdd,
  onRemove,
  onUpdate
}: TemperatureAdjustmentsProps) {
  const tempUnit = getTemperatureUnit(useFahrenheit);
  const tempMin = getTempMin(useFahrenheit);
  const tempMax = getTempMax(useFahrenheit);

  const handleTempChange = (id: string, value: number) => {
    const celsiusValue = useFahrenheit ? fahrenheitToCelsius(value) : value;
    onUpdate(id, 'temperature', celsiusValue);
  };
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, rgb(59 130 246 / 0.1) 100%)'
        }}
      />
      <button
        onClick={onToggle}
        className="relative w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-white">Temperature Adjustments</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="relative p-4 pt-0 space-y-3">
          {adjustments.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-400 mb-4">No Temperature Adjustments</p>
              <button
                onClick={onAdd}
                className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold hover:bg-blue-500/30 transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                ADD SCHEDULE
              </button>
            </div>
          ) : (
            <>
              {adjustments.map((adjustment) => (
                <div
                  key={adjustment.id}
                  className="flex items-center gap-3 bg-neutral-900/50 border border-neutral-700/50 rounded-lg p-3"
                >
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">Time</label>
                    <input
                      type="time"
                      value={adjustment.time}
                      onChange={(e) => onUpdate(adjustment.id, 'time', e.target.value)}
                      className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs text-gray-400 mb-1">Temp</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={displayTemp(adjustment.temperature, useFahrenheit).toFixed(1)}
                        onChange={(e) => handleTempChange(adjustment.id, Number(e.target.value))}
                        className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-3 py-2 pr-9 text-sm text-white text-center focus:outline-none focus:border-blue-500/50"
                        min={tempMin}
                        max={tempMax}
                        step={useFahrenheit ? "1" : "0.5"}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">{tempUnit}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(adjustment.id)}
                    className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={onAdd}
                className="w-full py-3 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                ADD SCHEDULE
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

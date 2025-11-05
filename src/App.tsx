import { useState } from 'react';
import { Minus, Plus, Thermometer, Calendar, BarChart3, Activity, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import ToggleSwitch from '@/components/ui/toggle-switch';
import StatusPage from '@/components/StatusPage';
import DataPage from '@/components/DataPage';
import SchedulesPage from '@/components/SchedulesPage';
import SettingsPage from '@/components/SettingsPage';
import { SettingsProvider, useSettingsContext } from '@/contexts/SettingsContext';
import { displayTemp, celsiusToFahrenheit, fahrenheitToCelsius } from '@/lib/temperature';

function AppContent() {
  const { settings } = useSettingsContext();
  const [activeZone, setActiveZone] = useState<'left' | 'right'>('left');
  const [leftTemp, setLeftTemp] = useState(22);
  const [rightTemp, setRightTemp] = useState(21);
  const [leftActive, setLeftActive] = useState(true);
  const [rightActive, setRightActive] = useState(false);
  const [currentPage, setCurrentPage] = useState<'temperature' | 'schedules' | 'data' | 'status' | 'settings'>('temperature');

  const useFahrenheit = settings.device.useFahrenheit;
  const tempUnit = useFahrenheit ? '°F' : '°C';
  const tempMin = useFahrenheit ? celsiusToFahrenheit(13) : 13;
  const tempMax = useFahrenheit ? celsiusToFahrenheit(43) : 43;
  const tempStep = useFahrenheit ? 1 : 0.5;

  const presets = useFahrenheit ? [
    { name: 'Cool', temp: fahrenheitToCelsius(65) },
    { name: 'Eco', temp: fahrenheitToCelsius(68) },
    { name: 'Comfort', temp: fahrenheitToCelsius(72) },
    { name: 'Warm', temp: fahrenheitToCelsius(76) },
  ] : [
    { name: 'Cool', temp: 18 },
    { name: 'Eco', temp: 20 },
    { name: 'Comfort', temp: 22 },
    { name: 'Warm', temp: 24 },
  ];

  const applyPreset = (temp: number) => {
    if (activeZone === 'left') {
      setLeftTemp(temp);
    } else {
      setRightTemp(temp);
    }
  };

  const currentTemp = activeZone === 'left' ? leftTemp : rightTemp;
  const setCurrentTemp = activeZone === 'left' ? setLeftTemp : setRightTemp;
  const isCurrentActive = activeZone === 'left' ? leftActive : rightActive;
  const bothActive = leftActive && rightActive;

  const displayedCurrentTemp = Math.round(displayTemp(currentTemp, useFahrenheit));
  const displayedLeftTemp = Math.round(displayTemp(leftTemp, useFahrenheit));
  const displayedRightTemp = Math.round(displayTemp(rightTemp, useFahrenheit));

  const getGradientColors = (tempCelsius: number) => {
    const tempF = celsiusToFahrenheit(tempCelsius);
    const percentage = (tempF - 55) / (110 - 55);

    if (percentage < 0.25) {
      return { from: 'rgb(29 78 216 / 0.35)', to: 'rgb(56 189 248 / 0.25)' };
    } else if (percentage < 0.45) {
      return { from: 'rgb(56 189 248 / 0.35)', to: 'rgb(34 211 238 / 0.25)' };
    } else if (percentage < 0.55) {
      return { from: 'rgb(34 211 238 / 0.35)', to: 'rgb(20 184 166 / 0.25)' };
    } else if (percentage < 0.7) {
      return { from: 'rgb(20 184 166 / 0.35)', to: 'rgb(251 191 36 / 0.25)' };
    } else if (percentage < 0.85) {
      return { from: 'rgb(251 191 36 / 0.35)', to: 'rgb(249 115 22 / 0.25)' };
    } else {
      return { from: 'rgb(249 115 22 / 0.35)', to: 'rgb(239 68 68 / 0.25)' };
    }
  };

  const currentGradient = getGradientColors(currentTemp);
  const leftGradient = getGradientColors(leftTemp);
  const rightGradient = getGradientColors(rightTemp);

  const handleBothToggle = () => {
    const newState = !bothActive;
    setLeftActive(newState);
    setRightActive(newState);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white pb-24">
      <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
        {currentPage === 'status' ? (
          <StatusPage />
        ) : currentPage === 'data' ? (
          <DataPage />
        ) : currentPage === 'schedules' ? (
          <SchedulesPage />
        ) : currentPage === 'settings' ? (
          <SettingsPage />
        ) : currentPage === 'temperature' ? (
          <>
        <div className="pt-6 pb-4">
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-1">Temperature Control</h2>
          <p className="text-xs text-gray-400">Dual-zone temperature management</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={() => setActiveZone('left')}
            className={cn(
              "relative p-4 sm:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 text-left overflow-hidden border-2",
              leftActive ? "border-blue-500/50" : "border-neutral-700/50",
              activeZone === 'left' && "ring-2 ring-blue-500/50"
            )}
          >
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                background: leftActive
                  ? `linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, ${leftGradient.from} 60%, ${leftGradient.to} 100%)`
                  : 'rgb(38 38 38 / 0.5)'
              }}
            />
            <div className="relative space-y-3 sm:space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">{settings.leftSide.name}</div>
                </div>
                <ToggleSwitch
                  checked={leftActive}
                  onChange={setLeftActive}
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <div className="text-3xl sm:text-6xl font-extralight tracking-tight">
                  {displayedLeftTemp}<span className="text-xl sm:text-4xl text-gray-500">{tempUnit}</span>
                </div>
                <div className={cn("text-xs sm:text-sm", leftActive ? "text-blue-400" : "text-gray-500")}>
                  {leftActive ? `→ ${(displayedLeftTemp - (useFahrenheit ? 4 : 2))}${tempUnit}` : 'Inactive'}
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveZone('right')}
            className={cn(
              "relative p-4 sm:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 text-left overflow-hidden border-2",
              rightActive ? "border-blue-500/50" : "border-neutral-700/50",
              activeZone === 'right' && "ring-2 ring-blue-500/50"
            )}
          >
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                background: rightActive
                  ? `linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, ${rightGradient.from} 60%, ${rightGradient.to} 100%)`
                  : 'rgb(38 38 38 / 0.5)'
              }}
            />
            <div className="relative space-y-3 sm:space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Thermometer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">{settings.rightSide.name}</div>
                </div>
                <ToggleSwitch
                  checked={rightActive}
                  onChange={setRightActive}
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <div className="text-3xl sm:text-6xl font-extralight tracking-tight">
                  {displayedRightTemp}<span className="text-xl sm:text-4xl text-gray-500">{tempUnit}</span>
                </div>
                <div className={cn("text-xs sm:text-sm", rightActive ? "text-blue-400" : "text-gray-500")}>
                  {rightActive ? `→ ${(displayedRightTemp - (useFahrenheit ? 4 : 2))}${tempUnit}` : 'Inactive'}
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="relative rounded-3xl border-2 border-neutral-700/50 p-6 sm:p-12 overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: `linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, rgb(38 38 38 / 0.6) 40%, ${currentGradient.from} 70%, ${currentGradient.to} 100%)`
            }}
          />

          <div className="relative flex flex-col items-center space-y-16">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold">
                  {activeZone.toUpperCase()} ZONE
                </div>
                <div
                  className={cn(
                    "text-xs sm:text-sm text-gray-500 transition-opacity duration-300 hidden sm:block",
                    isCurrentActive ? "opacity-0" : "opacity-100"
                  )}
                >
                  Turn on {activeZone} zone to adjust
                </div>
              </div>
              <button
                onClick={handleBothToggle}
                className={cn(
                  "relative text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 font-semibold backdrop-blur-xl border shadow-lg uppercase tracking-wider overflow-hidden group",
                  bothActive
                    ? "bg-gradient-to-br from-blue-500/20 to-blue-600/30 text-blue-300 hover:from-blue-500/30 hover:to-blue-600/40 border-blue-400/30 shadow-blue-500/20"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300 border-white/10"
                )}
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full",
                  bothActive && "via-blue-400/20"
                )} />
                <span className="relative flex items-center gap-2">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    bothActive
                      ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                      : "bg-white/30"
                  )} />
                  Both Zones
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    bothActive
                      ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                      : "bg-white/30"
                  )} />
                </span>
              </button>
            </div>

            <div className="w-full max-w-md space-y-6 sm:space-y-8">
              <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
                <button
                  onClick={() => isCurrentActive && currentTemp > tempMin && setCurrentTemp(currentTemp - tempStep)}
                  disabled={!isCurrentActive || currentTemp <= tempMin}
                  className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border border-white/10 shadow-xl",
                    isCurrentActive && currentTemp > tempMin
                      ? "bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 text-white hover:scale-105 active:scale-95 shadow-black/20"
                      : "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed"
                  )}
                >
                  <Minus className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>

                <div className="text-center">
                  <div className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tighter leading-none">
                    {displayedCurrentTemp}<span className="text-4xl sm:text-5xl md:text-6xl text-gray-400 ml-1 sm:ml-2">{tempUnit}</span>
                  </div>
                  <div
                    className={cn(
                      "text-sm sm:text-base mt-4 sm:mt-5 font-semibold tracking-wide",
                      isCurrentActive ? "text-blue-400" : "text-gray-600"
                    )}
                  >
                    {isCurrentActive ? `Target ${displayedCurrentTemp - (useFahrenheit ? 4 : 2)}${tempUnit}` : 'Zone Inactive'}
                  </div>
                </div>

                <button
                  onClick={() => isCurrentActive && currentTemp < tempMax && setCurrentTemp(currentTemp + tempStep)}
                  disabled={!isCurrentActive || currentTemp >= tempMax}
                  className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border border-white/10 shadow-xl",
                    isCurrentActive && currentTemp < tempMax
                      ? "bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 text-white hover:scale-105 active:scale-95 shadow-black/20"
                      : "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed"
                  )}
                >
                  <Plus className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>

              <div className="px-4">
                <input
                  type="range"
                  min={tempMin}
                  max={tempMax}
                  step={tempStep}
                  value={currentTemp}
                  onChange={(e) => isCurrentActive && setCurrentTemp(parseFloat(e.target.value))}
                  disabled={!isCurrentActive}
                  className={cn(
                    "w-full h-3 rounded-full appearance-none cursor-pointer transition-all duration-300 focus:outline-none",
                    isCurrentActive ? "opacity-100" : "opacity-30 cursor-not-allowed",
                    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full",
                    "[&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-white [&::-webkit-slider-thumb]:to-gray-100",
                    "[&::-webkit-slider-thumb]:shadow-xl [&::-webkit-slider-thumb]:shadow-black/30 [&::-webkit-slider-thumb]:cursor-pointer",
                    "[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white/20 [&::-webkit-slider-thumb]:transition-transform",
                    "[&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-95",
                    "[&::-webkit-slider-track]:h-3 [&::-webkit-slider-track]:rounded-full",
                    "[&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full",
                    "[&::-moz-range-thumb]:bg-gradient-to-br [&::-moz-range-thumb]:from-white [&::-moz-range-thumb]:to-gray-100",
                    "[&::-moz-range-thumb]:shadow-xl [&::-moz-range-thumb]:shadow-black/30 [&::-moz-range-thumb]:cursor-pointer",
                    "[&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-white/20 [&::-moz-range-thumb]:border-none",
                    "[&::-moz-range-track]:h-3 [&::-moz-range-track]:rounded-full"
                  )}
                  style={{
                    background: isCurrentActive
                      ? `linear-gradient(to right, ${currentGradient.from.replace('0.35', '0.5')} 0%, ${currentGradient.to.replace('0.25', '0.4')} ${((currentTemp - tempMin) / (tempMax - tempMin)) * 100}%, rgba(255, 255, 255, 0.08) ${((currentTemp - tempMin) / (tempMax - tempMin)) * 100}%, rgba(255, 255, 255, 0.08) 100%)`
                      : 'rgba(255, 255, 255, 0.05)'
                  }}
                />

                <div className="flex justify-between mt-4 px-1">
                  <span className="text-sm sm:text-base text-gray-500 font-medium">{Math.round(tempMin)}°</span>
                  <span className="text-sm sm:text-base text-gray-500 font-medium">{Math.round(tempMax)}°</span>
                </div>
              </div>

              <div className="px-4 pt-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Quick Presets</div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset.temp)}
                      disabled={!isCurrentActive}
                      className={cn(
                        "px-4 py-3 rounded-xl transition-all duration-200 backdrop-blur-xl border",
                        isCurrentActive
                          ? "bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border-white/10 hover:border-white/20 text-white active:scale-95"
                          : "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed"
                      )}
                    >
                      <div className="text-xs font-semibold mb-1">{preset.name}</div>
                      <div className="text-xl font-light">{Math.round(displayTemp(preset.temp, useFahrenheit))}°</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400">Coming soon</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800/50 shadow-2xl">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-around py-3 px-4">
          <button
            onClick={() => setCurrentPage('temperature')}
            className={cn(
              "flex flex-col items-center gap-1.5 px-3 sm:px-6 py-2 transition-all duration-200",
              currentPage === 'temperature' ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <Thermometer className="w-6 h-6 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-semibold">Temp</span>
          </button>

          <button
            onClick={() => setCurrentPage('schedules')}
            className={cn(
              "flex flex-col items-center gap-1.5 px-3 sm:px-6 py-2 transition-all duration-200",
              currentPage === 'schedules' ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <Calendar className="w-6 h-6 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-semibold">Schedule</span>
          </button>

          <button
            onClick={() => setCurrentPage('data')}
            className={cn(
              "flex flex-col items-center gap-1.5 px-3 sm:px-6 py-2 transition-all duration-200",
              currentPage === 'data' ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <BarChart3 className="w-6 h-6 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-semibold">Data</span>
          </button>

          <button
            onClick={() => setCurrentPage('status')}
            className={cn(
              "flex flex-col items-center gap-1.5 px-3 sm:px-6 py-2 transition-all duration-200",
              currentPage === 'status' ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <Activity className="w-6 h-6 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-semibold">Status</span>
          </button>

          <button
            onClick={() => setCurrentPage('settings')}
            className={cn(
              "flex flex-col items-center gap-1.5 px-3 sm:px-6 py-2 transition-all duration-200",
              currentPage === 'settings' ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <Settings className="w-6 h-6 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-semibold">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;

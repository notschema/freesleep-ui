import { useState } from 'react';
import { Bell } from 'lucide-react';
import ToggleSwitch from '@/components/ui/toggle-switch';
import DayPicker from './schedules/DayPicker';
import TemperatureGraph from './schedules/TemperatureGraph';
import PowerControls from './schedules/PowerControls';
import TemperatureAdjustments from './schedules/TemperatureAdjustments';
import ApplyToOtherDays from './schedules/ApplyToOtherDays';
import CollapsibleSection from './schedules/CollapsibleSection';
import { useSchedules } from './schedules/useSchedules';
import { getGraphData, getGraphYAxisLabels } from './schedules/utils';

export default function SchedulesPage() {
  const {
    selectedDayIndex,
    setSelectedDayIndex,
    weekSchedules,
    currentDay,
    toggleDayEnabled,
    updatePowerOn,
    updatePowerOff,
    addAdjustment,
    removeAdjustment,
    updateAdjustment,
    applyToSelectedDays,
  } = useSchedules();

  const [adjustmentsOpen, setAdjustmentsOpen] = useState(true);
  const [vibrationOpen, setVibrationOpen] = useState(false);
  const [applyDaysOpen, setApplyDaysOpen] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [selectedDaysForCopy, setSelectedDaysForCopy] = useState<number[]>([]);

  const schedulesWithAdjustments = weekSchedules.map(day => day.adjustments.length > 0);
  const graphPoints = getGraphData(currentDay);
  const yAxisLabels = getGraphYAxisLabels(currentDay);

  const handleToggleCopyDay = (dayIndex: number) => {
    setSelectedDaysForCopy(prev =>
      prev.includes(dayIndex)
        ? prev.filter(idx => idx !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const handleApplyToSelectedDays = () => {
    applyToSelectedDays(selectedDaysForCopy);
    setSelectedDaysForCopy([]);
    setApplyDaysOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-1">Schedules</h2>
        <p className="text-xs text-gray-400">Automated temperature control</p>
      </div>

      <DayPicker
        selectedDayIndex={selectedDayIndex}
        schedulesWithAdjustments={schedulesWithAdjustments}
        onSelectDay={setSelectedDayIndex}
      />

      <div className="relative rounded-2xl border-2 border-neutral-700/50 p-4 overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, rgb(${currentDay.enabled ? '16 185 129' : '107 114 128'} / 0.1) 100%)`
          }}
        />
        <div className="relative flex items-center justify-between">
          <span className="text-sm font-semibold text-white">Enabled</span>
          <ToggleSwitch checked={currentDay.enabled} onChange={toggleDayEnabled} />
        </div>
      </div>

      <TemperatureGraph graphPoints={graphPoints} yAxisLabels={yAxisLabels} />

      <PowerControls
        powerOnTime={currentDay.powerOnTime}
        powerOnTemp={currentDay.powerOnTemp}
        powerOffTime={currentDay.powerOffTime}
        onUpdatePowerOn={updatePowerOn}
        onUpdatePowerOff={updatePowerOff}
      />

      <TemperatureAdjustments
        adjustments={currentDay.adjustments}
        isOpen={adjustmentsOpen}
        onToggle={() => setAdjustmentsOpen(!adjustmentsOpen)}
        onAdd={addAdjustment}
        onRemove={removeAdjustment}
        onUpdate={updateAdjustment}
      />

      <CollapsibleSection
        title="Vibration Alarm"
        icon={<Bell className="w-5 h-5" />}
        iconColor="text-purple-400"
        gradientColor="rgb(168 85 247 / 0.1)"
        isOpen={vibrationOpen}
        onToggle={() => setVibrationOpen(!vibrationOpen)}
      >
        <div className="flex items-center justify-between bg-neutral-900/50 rounded-lg p-3">
          <span className="text-sm text-gray-300">Enable Vibration</span>
          <ToggleSwitch checked={vibrationEnabled} onChange={setVibrationEnabled} />
        </div>
      </CollapsibleSection>

      <ApplyToOtherDays
        isOpen={applyDaysOpen}
        onToggle={() => setApplyDaysOpen(!applyDaysOpen)}
        selectedDayIndex={selectedDayIndex}
        selectedDaysForCopy={selectedDaysForCopy}
        onToggleDay={handleToggleCopyDay}
        onApply={handleApplyToSelectedDays}
      />

      <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/20">
        SAVE
      </button>
    </div>
  );
}

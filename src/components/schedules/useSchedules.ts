import { useState } from 'react';
import { DaySchedule, TemperatureAdjustment, DAYS } from './types';

export function useSchedules() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(3);
  const [weekSchedules, setWeekSchedules] = useState<DaySchedule[]>(
    DAYS.map((day, index) => ({
      day,
      enabled: true,
      powerOnTime: '21:00',
      powerOnTemp: 28,
      powerOffTime: '09:00',
      adjustments: index === 3 ? [
        { id: '1', time: '22:00', temperature: 25 },
        { id: '2', time: '00:00', temperature: 21 },
      ] : []
    }))
  );

  const currentDay = weekSchedules[selectedDayIndex];

  const toggleDayEnabled = () => {
    setWeekSchedules(weekSchedules.map((day, idx) =>
      idx === selectedDayIndex ? { ...day, enabled: !day.enabled } : day
    ));
  };

  const updatePowerOn = (field: 'time' | 'temp', value: string | number) => {
    setWeekSchedules(weekSchedules.map((day, idx) =>
      idx === selectedDayIndex
        ? { ...day, [field === 'time' ? 'powerOnTime' : 'powerOnTemp']: value }
        : day
    ));
  };

  const updatePowerOff = (time: string) => {
    setWeekSchedules(weekSchedules.map((day, idx) =>
      idx === selectedDayIndex ? { ...day, powerOffTime: time } : day
    ));
  };

  const addAdjustment = () => {
    const newAdjustment: TemperatureAdjustment = {
      id: Date.now().toString(),
      time: '12:00',
      temperature: 22,
    };
    setWeekSchedules(weekSchedules.map((day, idx) =>
      idx === selectedDayIndex
        ? { ...day, adjustments: [...day.adjustments, newAdjustment] }
        : day
    ));
  };

  const removeAdjustment = (adjustmentId: string) => {
    setWeekSchedules(weekSchedules.map((day, idx) =>
      idx === selectedDayIndex
        ? { ...day, adjustments: day.adjustments.filter(a => a.id !== adjustmentId) }
        : day
    ));
  };

  const updateAdjustment = (adjustmentId: string, field: 'time' | 'temperature', value: string | number) => {
    setWeekSchedules(weekSchedules.map((day, idx) =>
      idx === selectedDayIndex
        ? {
            ...day,
            adjustments: day.adjustments.map(a =>
              a.id === adjustmentId ? { ...a, [field]: value } : a
            )
          }
        : day
    ));
  };

  const applyToSelectedDays = (selectedDaysForCopy: number[]) => {
    setWeekSchedules(weekSchedules.map((day, idx) =>
      selectedDaysForCopy.includes(idx)
        ? {
            ...day,
            powerOnTime: currentDay.powerOnTime,
            powerOnTemp: currentDay.powerOnTemp,
            powerOffTime: currentDay.powerOffTime,
            adjustments: [...currentDay.adjustments]
          }
        : day
    ));
  };

  return {
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
  };
}

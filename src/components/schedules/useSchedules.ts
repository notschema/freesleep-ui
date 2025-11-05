import { useState } from 'react';
import { DaySchedule, TemperatureAdjustment, SideSchedules, DAYS } from './types';

const createDefaultSchedules = (side: 'left' | 'right'): DaySchedule[] =>
  DAYS.map((day, index) => ({
    day,
    enabled: true,
    powerOnTime: side === 'left' ? '21:00' : '22:00',
    powerOnTemp: side === 'left' ? 28 : 26,
    powerOffTime: side === 'left' ? '09:00' : '08:00',
    adjustments: index === 3 ? [
      { id: `${side}-1`, time: side === 'left' ? '22:00' : '23:00', temperature: side === 'left' ? 25 : 24 },
      { id: `${side}-2`, time: '00:00', temperature: side === 'left' ? 21 : 22 },
    ] : []
  }));

export function useSchedules() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(3);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right'>('left');
  const [sideSchedules, setSideSchedules] = useState<SideSchedules>({
    left: createDefaultSchedules('left'),
    right: createDefaultSchedules('right'),
  });

  const weekSchedules = sideSchedules[selectedSide];
  const currentDay = weekSchedules[selectedDayIndex];

  const toggleDayEnabled = () => {
    setSideSchedules(prev => ({
      ...prev,
      [selectedSide]: prev[selectedSide].map((day, idx) =>
        idx === selectedDayIndex ? { ...day, enabled: !day.enabled } : day
      )
    }));
  };

  const updatePowerOn = (field: 'time' | 'temp', value: string | number) => {
    setSideSchedules(prev => ({
      ...prev,
      [selectedSide]: prev[selectedSide].map((day, idx) =>
        idx === selectedDayIndex
          ? { ...day, [field === 'time' ? 'powerOnTime' : 'powerOnTemp']: value }
          : day
      )
    }));
  };

  const updatePowerOff = (time: string) => {
    setSideSchedules(prev => ({
      ...prev,
      [selectedSide]: prev[selectedSide].map((day, idx) =>
        idx === selectedDayIndex ? { ...day, powerOffTime: time } : day
      )
    }));
  };

  const addAdjustment = () => {
    const newAdjustment: TemperatureAdjustment = {
      id: Date.now().toString(),
      time: '12:00',
      temperature: 22,
    };
    setSideSchedules(prev => ({
      ...prev,
      [selectedSide]: prev[selectedSide].map((day, idx) =>
        idx === selectedDayIndex
          ? { ...day, adjustments: [...day.adjustments, newAdjustment] }
          : day
      )
    }));
  };

  const removeAdjustment = (adjustmentId: string) => {
    setSideSchedules(prev => ({
      ...prev,
      [selectedSide]: prev[selectedSide].map((day, idx) =>
        idx === selectedDayIndex
          ? { ...day, adjustments: day.adjustments.filter(a => a.id !== adjustmentId) }
          : day
      )
    }));
  };

  const updateAdjustment = (adjustmentId: string, field: 'time' | 'temperature', value: string | number) => {
    setSideSchedules(prev => ({
      ...prev,
      [selectedSide]: prev[selectedSide].map((day, idx) =>
        idx === selectedDayIndex
          ? {
              ...day,
              adjustments: day.adjustments.map(a =>
                a.id === adjustmentId ? { ...a, [field]: value } : a
              )
            }
          : day
      )
    }));
  };

  const applyToSelectedDays = (selectedDaysForCopy: number[]) => {
    setSideSchedules(prev => ({
      ...prev,
      [selectedSide]: prev[selectedSide].map((day, idx) =>
        selectedDaysForCopy.includes(idx)
          ? {
              ...day,
              powerOnTime: currentDay.powerOnTime,
              powerOnTemp: currentDay.powerOnTemp,
              powerOffTime: currentDay.powerOffTime,
              adjustments: [...currentDay.adjustments]
            }
          : day
      )
    }));
  };

  return {
    selectedDayIndex,
    setSelectedDayIndex,
    selectedSide,
    setSelectedSide,
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

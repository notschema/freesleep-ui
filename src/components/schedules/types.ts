export interface TemperatureAdjustment {
  id: string;
  time: string;
  temperature: number;
}

export interface DaySchedule {
  day: string;
  enabled: boolean;
  powerOnTime: string;
  powerOnTemp: number;
  powerOffTime: string;
  adjustments: TemperatureAdjustment[];
}

export interface GraphPoint {
  x: number;
  y: number;
  time: string;
  temp: number;
  type: 'on' | 'off' | 'adjust';
}

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const TEMP_MIN = 13;
export const TEMP_MAX = 43;
export const TEMP_RANGE = 30 - 16;

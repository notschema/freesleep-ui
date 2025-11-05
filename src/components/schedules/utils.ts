import { DaySchedule, GraphPoint } from './types';

export function getGraphData(currentDay: DaySchedule): GraphPoint[] {
  const allPoints: { time: string; temp: number; type: 'on' | 'off' | 'adjust' }[] = [];

  allPoints.push({ time: currentDay.powerOnTime, temp: currentDay.powerOnTemp, type: 'on' });

  currentDay.adjustments.forEach(adj => {
    allPoints.push({ time: adj.time, temp: adj.temperature, type: 'adjust' });
  });

  allPoints.push({ time: currentDay.powerOffTime, temp: 0, type: 'off' });

  allPoints.sort((a, b) => a.time.localeCompare(b.time));

  // Calculate dynamic temperature range
  const temps = allPoints.filter(p => p.type !== 'off').map(p => p.temp);
  const maxTemp = Math.max(...temps, 30); // At least 30°C
  const minTemp = 16; // Fixed minimum
  const tempRange = maxTemp - minTemp;

  return allPoints.map(point => {
    const [hours, minutes] = point.time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const x = (timeInMinutes / 1440) * 100;
    const y = point.type === 'off' ? 100 : 100 - ((point.temp - minTemp) / tempRange) * 100;
    return { x, y, time: point.time, temp: point.temp, type: point.type };
  });
}

export function getGraphYAxisLabels(currentDay: DaySchedule): number[] {
  const temps = [currentDay.powerOnTemp, ...currentDay.adjustments.map(a => a.temperature)];
  const maxTemp = Math.max(...temps, 30);
  const minTemp = 16;
  const midTemp = Math.round((maxTemp + minTemp) / 2);

  return [maxTemp, midTemp, minTemp];
}

export function getPointColor(type: 'on' | 'off' | 'adjust'): string {
  switch (type) {
    case 'on':
      return 'rgb(16, 185, 129)';
    case 'off':
      return 'rgb(239, 68, 68)';
    case 'adjust':
      return 'rgb(59, 130, 246)';
  }
}

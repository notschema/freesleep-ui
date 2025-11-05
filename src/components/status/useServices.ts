import { Service } from './types';
import { useSettingsContext } from '@/contexts/SettingsContext';

export function useServices(): Service[] {
  const { settings } = useSettingsContext();

  return [
    {
      title: 'Alarm Schedule',
      status: 'healthy',
    },
    {
      title: 'Database',
      description: 'Connection to SQLite DB',
      status: 'healthy',
    },
    {
      title: 'Express',
      description: 'Back-end server',
      status: 'healthy',
    },
    {
      title: 'Franken Sock',
      description: 'Socket service for controlling the hardware',
      status: 'healthy',
    },
    {
      title: 'Job Scheduler',
      description: 'Scheduling service for temperature changes, alarms, and maintenance',
      status: 'healthy',
    },
    {
      title: 'Logger',
      description: 'Logging service',
      status: 'healthy',
    },
    {
      title: 'Power Schedule',
      description: 'Power on/off schedule',
      status: 'healthy',
    },
    {
      title: 'Prime Schedule',
      description: 'Daily prime job',
      status: 'healthy',
    },
    {
      title: 'Reboot Schedule',
      description: 'Daily system reboots',
      status: 'healthy',
    },
    {
      title: 'System Date',
      description: 'Verifies system date accuracy for scheduling jobs.',
      status: 'healthy',
    },
    {
      title: 'Temperature Schedule',
      description: 'Temperature adjustment schedule',
      status: 'healthy',
    },
    {
      title: 'Biometrics Installation',
      description: 'Biometrics installation status',
      status: 'healthy',
    },
    {
      title: `Analyze Sleep - ${settings.leftSide.name}`,
      description: 'Analyzes sleep period',
      status: 'not-started',
      hasRun: true,
    },
    {
      title: `Analyze Sleep - ${settings.rightSide.name}`,
      description: 'Analyzes sleep period',
      status: 'not-started',
      hasRun: true,
    },
    {
      title: `Calibration Job - ${settings.leftSide.name}`,
      description: 'Calculates presence thresholds for cap sensor data',
      status: 'healthy',
      timestamp: '2025-11-05 14:03:48 AEDT',
      hasRun: true,
    },
    {
      title: `Calibration Job - ${settings.rightSide.name}`,
      description: 'Calculates presence thresholds for cap sensor data',
      status: 'healthy',
      timestamp: '2025-11-05 14:33:29 AEDT',
      hasRun: true,
    },
    {
      title: 'Biometrics Stream',
      description: 'Consumes the sensor data as a stream and calculates biometrics',
      status: 'healthy',
      timestamp: '2025-11-05 23:11:24 AEDT',
      hasRun: true,
    },
  ];
}

import { Wifi, Download } from 'lucide-react';
import SettingSection from './SettingSection';
import SettingRow from './SettingRow';
import ToggleSwitch from '../ui/toggle-switch';

interface DeviceSettingsSectionProps {
  timeZone: string;
  rebootDaily: boolean;
  ledBrightness: number;
  wifiStrength: number;
  currentVersion: string;
  latestVersion: string;
  onTimeZoneChange: (value: string) => void;
  onRebootDailyChange: (value: boolean) => void;
  onLedBrightnessChange: (value: number) => void;
}

export default function DeviceSettingsSection({
  timeZone,
  rebootDaily,
  ledBrightness,
  wifiStrength,
  currentVersion,
  latestVersion,
  onTimeZoneChange,
  onRebootDailyChange,
  onLedBrightnessChange
}: DeviceSettingsSectionProps) {
  const updateAvailable = currentVersion !== latestVersion;

  return (
    <SettingSection title="Device Settings">
      <SettingRow label="Time Zone">
        <select
          value={timeZone}
          onChange={(e) => onTimeZoneChange(e.target.value)}
          className="px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="Australia/Sydney">Australia/Sydney</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Tokyo">Asia/Tokyo</option>
        </select>
      </SettingRow>

      <SettingRow
        label="Daily automatic reboot"
        description="Automatically restart the device once per day to maintain optimal performance. Reboot occurs 1 hour before the scheduled prime time."
      >
        <ToggleSwitch checked={rebootDaily} onChange={onRebootDailyChange} />
      </SettingRow>

      <SettingRow label="LED Brightness">
        <div className="flex items-center gap-3 min-w-[200px]">
          <span className="text-xs text-gray-400">Off</span>
          <input
            type="range"
            min="0"
            max="100"
            value={ledBrightness}
            onChange={(e) => onLedBrightnessChange(Number(e.target.value))}
            className="flex-1 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-gray-400 w-8 text-right">{ledBrightness}%</span>
        </div>
      </SettingRow>

      <div className="pt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/30">
            <p className="text-xs text-gray-400 mb-1">Device</p>
            <p className="text-sm font-medium text-white">Pod 4 Cover</p>
          </div>
          <div className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/30">
            <p className="text-xs text-gray-400 mb-1">Hub</p>
            <p className="text-sm font-medium text-white">Pod 4 Hub</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/30">
            <p className="text-xs text-gray-400 mb-1">Build</p>
            <p className="text-sm font-medium text-white">Free Sleep Build</p>
          </div>
          <div className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/30">
            <p className="text-xs text-gray-400 mb-1">Version</p>
            <p className="text-sm font-medium text-white">v{currentVersion}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/30">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-300">WiFi Strength</span>
          </div>
          <span className="text-sm font-medium text-white">{wifiStrength}%</span>
        </div>

        {updateAvailable && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Download className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-400 mb-1">Free-Sleep Update Available</p>
                <p className="text-xs text-gray-400">Latest Version: {latestVersion}</p>
                <p className="text-xs text-gray-400">Current Version: {currentVersion}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </SettingSection>
  );
}

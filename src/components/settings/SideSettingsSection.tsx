import SettingSection from './SettingSection';
import SettingRow from './SettingRow';
import ToggleSwitch from '../ui/toggle-switch';
import InfoBox from './InfoBox';

interface SideSettingsSectionProps {
  leftSideName: string;
  leftAwayMode: boolean;
  rightSideName: string;
  rightAwayMode: boolean;
  onLeftSideNameChange: (value: string) => void;
  onLeftAwayModeChange: (value: boolean) => void;
  onRightSideNameChange: (value: string) => void;
  onRightAwayModeChange: (value: boolean) => void;
}

export default function SideSettingsSection({
  leftSideName,
  leftAwayMode,
  rightSideName,
  rightAwayMode,
  onLeftSideNameChange,
  onLeftAwayModeChange,
  onRightSideNameChange,
  onRightAwayModeChange
}: SideSettingsSectionProps) {
  return (
    <SettingSection title="Side Settings">
      <div className="space-y-6">
        <div className="p-4 bg-neutral-800/30 rounded-lg border border-neutral-700/30">
          <h4 className="text-sm font-semibold text-white mb-4">Left Side</h4>
          <SettingRow label="Side Name">
            <input
              type="text"
              value={leftSideName}
              onChange={(e) => onLeftSideNameChange(e.target.value)}
              className="px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-w-[150px]"
              placeholder="Enter name"
            />
          </SettingRow>
          <SettingRow label="Away mode">
            <ToggleSwitch checked={leftAwayMode} onChange={onLeftAwayModeChange} />
          </SettingRow>
        </div>

        <div className="p-4 bg-neutral-800/30 rounded-lg border border-neutral-700/30">
          <h4 className="text-sm font-semibold text-white mb-4">Right Side</h4>
          <SettingRow label="Side Name">
            <input
              type="text"
              value={rightSideName}
              onChange={(e) => onRightSideNameChange(e.target.value)}
              className="px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-w-[150px]"
              placeholder="Enter name"
            />
          </SettingRow>
          <SettingRow label="Away mode">
            <ToggleSwitch checked={rightAwayMode} onChange={onRightAwayModeChange} />
          </SettingRow>
        </div>
      </div>

      <InfoBox message="Away mode temporarily disables independent temperature control and schedules for a side. The inactive side will mirror settings from the active side. When both sides are set to away mode, all schedules are paused." />
    </SettingSection>
  );
}

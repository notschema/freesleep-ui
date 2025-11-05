import SettingSection from './SettingSection';
import SettingRow from './SettingRow';
import ToggleSwitch from '../ui/toggle-switch';
import InfoBox from './InfoBox';

interface PrimingSectionProps {
  primeDaily: boolean;
  primeTime: string;
  onPrimeDailyChange: (value: boolean) => void;
  onPrimeTimeChange: (value: string) => void;
}

export default function PrimingSection({
  primeDaily,
  primeTime,
  onPrimeDailyChange,
  onPrimeTimeChange
}: PrimingSectionProps) {
  return (
    <SettingSection title="Priming">
      <SettingRow label="Daily priming">
        <ToggleSwitch checked={primeDaily} onChange={onPrimeDailyChange} />
      </SettingRow>

      <SettingRow label="Priming time">
        <input
          type="time"
          value={primeTime}
          onChange={(e) => onPrimeTimeChange(e.target.value)}
          className="px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </SettingRow>

      <InfoBox message="Regular priming prevents air bubbles and ensures consistent temperature control. Schedule priming for times when the bed is not in use." />
    </SettingSection>
  );
}

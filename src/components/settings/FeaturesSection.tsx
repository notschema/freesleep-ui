import { AlertCircle } from 'lucide-react';
import SettingSection from './SettingSection';
import SettingRow from './SettingRow';
import ToggleSwitch from '../ui/toggle-switch';

interface FeaturesSectionProps {
  biometricsEnabled: boolean;
  sentryEnabled: boolean;
  onBiometricsChange: (value: boolean) => void;
  onSentryChange: (value: boolean) => void;
}

export default function FeaturesSection({
  biometricsEnabled,
  sentryEnabled,
  onBiometricsChange,
  onSentryChange
}: FeaturesSectionProps) {
  return (
    <SettingSection title="Features">
      <div className="space-y-6">
        <div>
          <SettingRow
            label="Biometric tracking"
            description="Enable biometric data collection. Run the installation command below on your device, then toggle this setting after successful installation."
          >
            <ToggleSwitch checked={biometricsEnabled} onChange={onBiometricsChange} />
          </SettingRow>

          <div className="mt-3 p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/30">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-medium text-yellow-400">Installation Command</span>
            </div>
            <code className="block text-xs text-gray-300 bg-black/30 px-3 py-2 rounded border border-neutral-700/50 font-mono overflow-x-auto">
              sh /home/dac/free-sleep/scripts/enable_biometrics.sh
            </code>
          </div>
        </div>

        <SettingRow
          label="Error reporting"
          description="Help improve system stability by automatically sending anonymous crash reports and error logs."
        >
          <ToggleSwitch checked={sentryEnabled} onChange={onSentryChange} />
        </SettingRow>
      </div>
    </SettingSection>
  );
}

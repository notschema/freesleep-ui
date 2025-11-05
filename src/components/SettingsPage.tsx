import DeviceSettingsSection from './settings/DeviceSettingsSection';
import PrimingSection from './settings/PrimingSection';
import FeaturesSection from './settings/FeaturesSection';
import SideSettingsSection from './settings/SideSettingsSection';
import SupportSection from './settings/SupportSection';
import { useSettings } from './settings/useSettings';

export default function SettingsPage() {
  const {
    settings,
    updateDeviceSetting,
    updatePrimingSetting,
    updateFeatureSetting,
    updateLeftSideSetting,
    updateRightSideSetting,
  } = useSettings();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight mb-1">Settings</h2>
        <p className="text-xs text-gray-400">Configure your climate control system</p>
      </div>

      <DeviceSettingsSection
        timeZone={settings.device.timeZone}
        rebootDaily={settings.device.rebootDaily}
        ledBrightness={settings.device.ledBrightness}
        wifiStrength={settings.device.wifiStrength}
        currentVersion={settings.device.currentVersion}
        latestVersion={settings.device.latestVersion}
        onTimeZoneChange={(value) => updateDeviceSetting('timeZone', value)}
        onRebootDailyChange={(value) => updateDeviceSetting('rebootDaily', value)}
        onLedBrightnessChange={(value) => updateDeviceSetting('ledBrightness', value)}
      />

      <PrimingSection
        primeDaily={settings.priming.primeDaily}
        primeTime={settings.priming.primeTime}
        onPrimeDailyChange={(value) => updatePrimingSetting('primeDaily', value)}
        onPrimeTimeChange={(value) => updatePrimingSetting('primeTime', value)}
      />

      <FeaturesSection
        biometricsEnabled={settings.features.biometricsEnabled}
        sentryEnabled={settings.features.sentryEnabled}
        onBiometricsChange={(value) => updateFeatureSetting('biometricsEnabled', value)}
        onSentryChange={(value) => updateFeatureSetting('sentryEnabled', value)}
      />

      <SideSettingsSection
        leftSideName={settings.leftSide.name}
        leftAwayMode={settings.leftSide.awayMode}
        rightSideName={settings.rightSide.name}
        rightAwayMode={settings.rightSide.awayMode}
        onLeftSideNameChange={(value) => updateLeftSideSetting('name', value)}
        onLeftAwayModeChange={(value) => updateLeftSideSetting('awayMode', value)}
        onRightSideNameChange={(value) => updateRightSideSetting('name', value)}
        onRightAwayModeChange={(value) => updateRightSideSetting('awayMode', value)}
      />

      <SupportSection />

      <div className="flex justify-center mt-12 mb-4">
        <p className="text-[10px] text-gray-500/40 tracking-wide">ui by schema</p>
      </div>
    </div>
  );
}

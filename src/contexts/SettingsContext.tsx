import { createContext, useContext, useState, ReactNode } from 'react';

interface SideSettings {
  name: string;
  awayMode: boolean;
}

interface DeviceSettings {
  timeZone: string;
  rebootDaily: boolean;
  ledBrightness: number;
  podVersion: string;
  hubVersion: string;
  buildVersion: string;
  wifiStrength: number;
  currentVersion: string;
  latestVersion: string;
}

interface PrimingSettings {
  primeDaily: boolean;
  primeTime: string;
}

interface FeaturesSettings {
  biometricsEnabled: boolean;
  sentryEnabled: boolean;
}

interface AllSettings {
  device: DeviceSettings;
  priming: PrimingSettings;
  features: FeaturesSettings;
  leftSide: SideSettings;
  rightSide: SideSettings;
}

interface SettingsContextType {
  settings: AllSettings;
  updateDeviceSetting: <K extends keyof DeviceSettings>(key: K, value: DeviceSettings[K]) => void;
  updatePrimingSetting: <K extends keyof PrimingSettings>(key: K, value: PrimingSettings[K]) => void;
  updateFeatureSetting: <K extends keyof FeaturesSettings>(key: K, value: FeaturesSettings[K]) => void;
  updateLeftSideSetting: <K extends keyof SideSettings>(key: K, value: SideSettings[K]) => void;
  updateRightSideSetting: <K extends keyof SideSettings>(key: K, value: SideSettings[K]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AllSettings>({
    device: {
      timeZone: 'Australia/Sydney',
      rebootDaily: true,
      ledBrightness: 75,
      podVersion: 'Pod 4 Cover',
      hubVersion: 'Pod 4 Hub',
      buildVersion: 'Free Sleep Build',
      wifiStrength: 100,
      currentVersion: '1.1.8',
      latestVersion: '1.1.9',
    },
    priming: {
      primeDaily: true,
      primeTime: '14:00',
    },
    features: {
      biometricsEnabled: false,
      sentryEnabled: true,
    },
    leftSide: {
      name: 'Left',
      awayMode: false,
    },
    rightSide: {
      name: 'Right',
      awayMode: false,
    },
  });

  const updateDeviceSetting = <K extends keyof DeviceSettings>(
    key: K,
    value: DeviceSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      device: { ...prev.device, [key]: value },
    }));
  };

  const updatePrimingSetting = <K extends keyof PrimingSettings>(
    key: K,
    value: PrimingSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      priming: { ...prev.priming, [key]: value },
    }));
  };

  const updateFeatureSetting = <K extends keyof FeaturesSettings>(
    key: K,
    value: FeaturesSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      features: { ...prev.features, [key]: value },
    }));
  };

  const updateLeftSideSetting = <K extends keyof SideSettings>(
    key: K,
    value: SideSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      leftSide: { ...prev.leftSide, [key]: value },
    }));
  };

  const updateRightSideSetting = <K extends keyof SideSettings>(
    key: K,
    value: SideSettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      rightSide: { ...prev.rightSide, [key]: value },
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateDeviceSetting,
        updatePrimingSetting,
        updateFeatureSetting,
        updateLeftSideSetting,
        updateRightSideSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
}

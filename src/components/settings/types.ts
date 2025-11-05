export interface DeviceSettings {
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

export interface PrimingSettings {
  primeDaily: boolean;
  primeTime: string;
}

export interface FeatureSettings {
  biometricsEnabled: boolean;
  sentryEnabled: boolean;
}

export interface SideSettings {
  name: string;
  awayMode: boolean;
}

export interface AllSettings {
  device: DeviceSettings;
  priming: PrimingSettings;
  features: FeatureSettings;
  leftSide: SideSettings;
  rightSide: SideSettings;
}

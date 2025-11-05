export type ServiceStatus = 'healthy' | 'not-started' | 'error';

export interface Service {
  title: string;
  description?: string;
  status: ServiceStatus;
  timestamp?: string;
  hasRun?: boolean;
}

import { LucideIcon } from 'lucide-react';

export interface DataCard {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  borderColor: string;
  bgColor: string;
  gradientColor: string;
  emptyMessage: string;
}

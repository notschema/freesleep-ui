import { LucideIcon } from 'lucide-react';

interface DataCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  borderColor: string;
  bgColor: string;
  gradientColor: string;
  emptyMessage: string;
}

export default function DataCard({
  title,
  description,
  icon: Icon,
  iconColor,
  borderColor,
  bgColor,
  gradientColor,
  emptyMessage
}: DataCardProps) {
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 p-6 overflow-hidden shadow-2xl min-h-[300px] group hover:border-neutral-600/50 transition-all duration-300">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, ${gradientColor} 100%)`
        }}
      />
      <div className="relative h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl ${bgColor} ${borderColor} border flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 rounded-2xl ${bgColor.replace('/20', '/10')} ${borderColor.replace('/30', '/20')} border flex items-center justify-center mx-auto`}>
              <Icon className={`w-8 h-8 ${iconColor.replace('400', '400/50')}`} />
            </div>
            <p className="text-sm text-gray-500">{emptyMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

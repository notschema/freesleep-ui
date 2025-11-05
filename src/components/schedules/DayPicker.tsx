import { cn } from '@/lib/utils';
import { DAYS } from './types';

interface DayPickerProps {
  selectedDayIndex: number;
  schedulesWithAdjustments: boolean[];
  onSelectDay: (index: number) => void;
}

export default function DayPicker({ selectedDayIndex, schedulesWithAdjustments, onSelectDay }: DayPickerProps) {
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 p-4 overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgb(38 38 38 / 0.5) 0%, rgb(59 130 246 / 0.1) 100%)'
        }}
      />
      <div className="relative">
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day, index) => {
            const hasSchedules = schedulesWithAdjustments[index];
            return (
              <button
                key={day}
                onClick={() => onSelectDay(index)}
                className={cn(
                  "relative py-3 px-1 rounded-xl text-xs font-semibold transition-all duration-200",
                  selectedDayIndex === index
                    ? "bg-blue-500/30 text-blue-300 border-2 border-blue-500/50"
                    : "bg-neutral-800/50 text-gray-400 border border-neutral-700/30 hover:text-gray-300"
                )}
              >
                {day.substring(0, 3).toUpperCase()}
                {hasSchedules && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

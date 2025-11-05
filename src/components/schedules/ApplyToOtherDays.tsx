import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DAYS } from './types';
import CollapsibleSection from './CollapsibleSection';

interface ApplyToOtherDaysProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedDayIndex: number;
  selectedDaysForCopy: number[];
  onToggleDay: (index: number) => void;
  onApply: () => void;
}

export default function ApplyToOtherDays({
  isOpen,
  onToggle,
  selectedDayIndex,
  selectedDaysForCopy,
  onToggleDay,
  onApply
}: ApplyToOtherDaysProps) {
  return (
    <CollapsibleSection
      title="Apply Settings to Other Days"
      icon={<CalendarIcon className="w-5 h-5" />}
      iconColor="text-blue-400"
      gradientColor="rgb(59 130 246 / 0.1)"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-3">
        {DAYS.map((day, index) => (
          index !== selectedDayIndex && (
            <button
              key={day}
              onClick={() => onToggleDay(index)}
              className="w-full flex items-center gap-3 bg-neutral-900/50 rounded-lg p-3 hover:bg-neutral-800/70 transition-colors"
            >
              <div
                className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                  selectedDaysForCopy.includes(index)
                    ? "bg-blue-500 border-blue-500"
                    : "border-neutral-600"
                )}
              >
                {selectedDaysForCopy.includes(index) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-300">{day}</span>
            </button>
          )
        ))}
        {selectedDaysForCopy.length > 0 && (
          <button
            onClick={onApply}
            className="w-full py-3 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold hover:bg-blue-500/30 transition-all"
          >
            Apply to {selectedDaysForCopy.length} {selectedDaysForCopy.length === 1 ? 'day' : 'days'}
          </button>
        )}
      </div>
    </CollapsibleSection>
  );
}

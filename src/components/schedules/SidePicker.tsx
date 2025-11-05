import { cn } from '@/lib/utils';

interface SidePickerProps {
  selectedSide: 'left' | 'right';
  onSelectSide: (side: 'left' | 'right') => void;
}

export default function SidePicker({ selectedSide, onSelectSide }: SidePickerProps) {
  return (
    <div className="relative rounded-2xl border-2 border-neutral-700/50 p-1 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-neutral-800/30" />
      <div className="relative grid grid-cols-2 gap-1">
        <button
          onClick={() => onSelectSide('left')}
          className={cn(
            "py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200",
            selectedSide === 'left'
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20"
              : "text-gray-400 hover:text-gray-300 hover:bg-neutral-800/50"
          )}
        >
          Left Side
        </button>
        <button
          onClick={() => onSelectSide('right')}
          className={cn(
            "py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200",
            selectedSide === 'right'
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20"
              : "text-gray-400 hover:text-gray-300 hover:bg-neutral-800/50"
          )}
        >
          Right Side
        </button>
      </div>
    </div>
  );
}

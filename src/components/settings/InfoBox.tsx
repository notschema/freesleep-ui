import { Info } from 'lucide-react';

interface InfoBoxProps {
  message: string;
}

export default function InfoBox({ message }: InfoBoxProps) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 mt-4">
      <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-gray-300 leading-relaxed">{message}</p>
    </div>
  );
}

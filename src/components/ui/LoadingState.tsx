import { Loader2 } from "lucide-react";

interface LoadingProps {
  progress: number;
}

export function LoadingState({ progress }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center h-80 bg-gray-900/50 rounded-3xl border border-gray-800 p-8 animate-in fade-in zoom-in-95">
      <div className="relative mb-8">
        <Loader2 className="animate-spin text-pink-500 w-16 h-16 opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-pink-500 font-bold text-sm">
          {progress}%
        </div>
      </div>
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden max-w-xs">
        <div
          className="h-full bg-pink-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

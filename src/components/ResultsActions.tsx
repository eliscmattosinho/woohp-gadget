import { Download, RefreshCw } from "lucide-react";

interface ResultsActionsProps {
  onDownload: () => void;
  onReset: () => void;
}

export function ResultsActions({ onDownload, onReset }: ResultsActionsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <button
        onClick={onDownload}
        className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-5 rounded-2xl font-black text-xl hover:bg-pink-500 hover:text-white transition-all active:scale-[0.98] cursor-pointer"
      >
        <Download size={24} /> BAIXAR
      </button>
      <button
        onClick={onReset}
        className="px-8 flex items-center justify-center gap-2 bg-gray-800 text-gray-400 py-5 rounded-2xl font-bold hover:bg-gray-700 hover:text-white transition-all cursor-pointer"
      >
        <RefreshCw size={20} />
      </button>
    </div>
  );
}

import { Loader2 } from "lucide-react";

interface LoadingProps {
  progress: number;
}

export function LoadingState({ progress }: LoadingProps) {
  return (
    // @TODO: Desvincular "carregamento" do JS para não notar o emperro? Pré-processar para garantir um fluxo mais fluido?

    <div className="flex flex-col items-center justify-center h-80 bg-gray-900/40 rounded-3xl border border-gray-800/50 p-8 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="relative mb-8">
        <Loader2 className="animate-spin text-pink-500 w-16 h-16 opacity-40 will-change-transform" />
        <div className="absolute inset-0 flex items-center justify-center text-pink-500 font-black text-sm font-mono tabular-nums">
          {progress}%
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-800">
          <div
            className="h-full bg-pink-600 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(219,39,119,0.4)]"
            style={{ width: `${progress}%`, willChange: "width" }}
          />
        </div>
        <p className="text-center text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] animate-pulse">
          Gadget em Processamento...
        </p>
      </div>
    </div>
  );
}

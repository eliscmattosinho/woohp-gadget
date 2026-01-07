import { useMemo } from "react";
import { useImageCompressor } from "./hooks/useImageCompressor";
import { formatSize, calculateEconomy } from "./utils/imageUtils";
import { UploadArea } from "./components/UploadArea";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { Header } from "./components/layout/Header";
import { LoadingState } from "./components/ui/LoadingState";
import { StatCard } from "./components/ui/StatCard";
import { ResultsActions } from "./components/ResultsActions";
import { CheckCircle2 } from "lucide-react";

export default function App() {
  const {
    loading,
    progress,
    originalImage,
    compressedImage,
    previews,
    compress,
    download,
    reset,
  } = useImageCompressor();

  const economy = useMemo(() => {
    if (!originalImage || !compressedImage) return 0;
    return calculateEconomy(originalImage.size, compressedImage.size);
  }, [originalImage, compressedImage]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 text-gray-100 font-sans">
      <Header />

      <main className="max-w-4xl mx-auto space-y-10">
        {!originalImage && !loading && <UploadArea onFileSelect={compress} />}

        {loading && <LoadingState progress={progress} />}

        {originalImage && compressedImage && !loading && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest">
              <CheckCircle2 size={14} />
              {economy > 0 ? "Otimização concluída" : "Imagem já otimizada"}
            </div>

            <BeforeAfterSlider
              before={previews.before}
              after={previews.after}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                label="Original"
                value={formatSize(originalImage.size)}
              />
              <StatCard
                label="Otimizada"
                value={formatSize(compressedImage.size)}
                variant="pink"
              />
              <StatCard
                label="Economia"
                value={economy > 0 ? `${economy}%` : "Ideal"}
                variant={economy > 0 ? "highlight" : "gray"}
              />
            </div>

            <ResultsActions onDownload={download} onReset={reset} />
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto text-center mt-20 text-gray-700 text-[10px] font-bold tracking-[0.3em] uppercase">
        WebAssembly & Worker Powered • 2026
      </footer>
    </div>
  );
}

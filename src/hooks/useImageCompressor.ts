import { useState, useRef, useCallback, useEffect } from "react";
import imageCompression from "browser-image-compression";
import {
  validateImage,
  sanitizeFileName,
  getCompressionOptions,
} from "../utils/imageUtils";

export function useImageCompressor() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [previews, setPreviews] = useState({ before: "", after: "" });

  const lastProgressValue = useRef<number>(0);

  // limpar URLs da memória do navegador
  const purgePreviews = useCallback(() => {
    setPreviews((prev) => {
      if (prev.before) URL.revokeObjectURL(prev.before);
      if (prev.after) URL.revokeObjectURL(prev.after);
      return { before: "", after: "" };
    });
  }, []);

  // Limpeza automática ao desmontar o componente
  useEffect(() => {
    return () => {
      setPreviews((current) => {
        if (current.before) URL.revokeObjectURL(current.before);
        if (current.after) URL.revokeObjectURL(current.after);
        return current;
      });
    };
  }, []);

  const compress = async (file: File) => {
    const error = validateImage(file);
    if (error) return alert(error);

    purgePreviews();

    setLoading(true);
    setProgress(0);
    lastProgressValue.current = 0;
    setOriginalImage(file);
    setCompressedImage(null);

    const beforeUrl = URL.createObjectURL(file);
    setPreviews({ before: beforeUrl, after: "" });

    // TRATATIVA DE NITIDEZ (PRÉ-PROCESSAMENTO)
    // Se a imagem for menor que 500KB e não for PNG, bye
    // evitar efeito "pixelado/soft" em imagens já otimizadas
    if (file.size < 500 * 1024 && file.type !== "image/png") {
      setCompressedImage(file);
      setPreviews({ before: beforeUrl, after: beforeUrl });
      setLoading(false);
      return;
    }

    const options = getCompressionOptions(file, (p) => {
      const currentP = Math.round(p);
      // SÓ atualiza o estado se +5% ou chegar em 100%
      if (currentP - lastProgressValue.current >= 5 || currentP === 100) {
        setProgress(currentP);
        lastProgressValue.current = currentP;
      }
    });

    try {
      const compressedBlob = await imageCompression(file, options);

      // Inteligência de tamanho: se o blob comprimido for maior, aborta compressão
      const isActuallySmaller = compressedBlob.size < file.size;
      const finalBlob = isActuallySmaller ? compressedBlob : file;

      const compressedFile = new File(
        [finalBlob],
        sanitizeFileName(file.name),
        { type: file.type, lastModified: Date.now() }
      );

      const afterUrl = URL.createObjectURL(compressedFile);

      setPreviews({ before: beforeUrl, after: afterUrl });
      setCompressedImage(compressedFile);

      // Delay para garantir que o browser montou as imagens antes de tirar o loader
      setTimeout(() => setLoading(false), 400);
    } catch (err) {
      console.error("Erro na compressão:", err);
      setLoading(false);
      setCompressedImage(file);
      setPreviews({ before: beforeUrl, after: beforeUrl });
    }
  };

  const download = useCallback(() => {
    if (!compressedImage || !previews.after) return;

    const link = document.createElement("a");
    link.href = previews.after;

    // Evitar name repeat
    const finalName = compressedImage.name.startsWith("optimized_")
      ? compressedImage.name
      : `optimized_${compressedImage.name}`;

    link.download = finalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [compressedImage, previews.after]);

  const reset = useCallback(() => {
    purgePreviews();
    setOriginalImage(null);
    setCompressedImage(null);
    setLoading(false);
    setProgress(0);
  }, [purgePreviews]);

  return {
    loading,
    progress,
    originalImage,
    compressedImage,
    previews,
    compress,
    download,
    reset,
  };
}

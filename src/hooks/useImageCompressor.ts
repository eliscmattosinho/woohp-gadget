import { useState, useRef, useEffect, useCallback } from "react";
import imageCompression from "browser-image-compression";

export function useImageCompressor() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [previews, setPreviews] = useState({ before: "", after: "" });

  const lastProgressUpdate = useRef<number>(0);

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  // Limpeza de memória: Revoga URLs de Blob para evitar vazamento (Memory Leak)
  useEffect(() => {
    return () => {
      if (previews.before) URL.revokeObjectURL(previews.before);
      if (previews.after) URL.revokeObjectURL(previews.after);
    };
  }, [previews]);

  const compress = async (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Formato inválido. Use JPG, PNG, WebP ou GIF.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      alert("Arquivo muito grande (máximo 15MB).");
      return;
    }

    setOriginalImage(file);
    setCompressedImage(null);
    setLoading(true);
    setProgress(0);
    lastProgressUpdate.current = 0;

    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1980,
      useWebWorker: true,
      fileType: file.type,
      initialQuality: 0.75,
      preserveExif: true,
      onProgress: (p: number) => {
        const now = Date.now();
        if (now - lastProgressUpdate.current > 100 || p === 100) {
          setProgress(Math.round(p));
          lastProgressUpdate.current = now;
        }
      },
    };

    try {
      const compressedBlob = await imageCompression(file, options);

      // Inteligência de tamanho
      const finalBlob = compressedBlob.size > file.size ? file : compressedBlob;

      // Sanitização de nome
      const sanitizedName = file.name
        .replace(/[^a-z0-9.]/gi, "_")
        .replace(/_{2,}/g, "_");

      const compressedFile = new File([finalBlob], sanitizedName, {
        type: file.type,
        lastModified: Date.now(),
      });

      // Cria URLs únicas para os previews
      const beforeUrl = URL.createObjectURL(file);
      const afterUrl = URL.createObjectURL(compressedFile);

      setPreviews({ before: beforeUrl, after: afterUrl });
      setCompressedImage(compressedFile);
    } catch (error) {
      console.error("Erro na compressão:", error);
      alert("Erro ao processar imagem.");
    } finally {
      setLoading(false);
    }
  };

  const download = useCallback(() => {
    if (!compressedImage || !previews.after) return;

    const link = document.createElement("a");
    link.href = previews.after;
    link.download = `optimized_${compressedImage.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [compressedImage, previews.after]);

  const reset = useCallback(() => {
    setOriginalImage(null);
    setCompressedImage(null);
    setPreviews({ before: "", after: "" });
    setLoading(false);
    setProgress(0);
  }, []);

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

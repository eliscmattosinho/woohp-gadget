import { useState, useRef, useCallback } from "react";
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

  const revokeUrls = useCallback(() => {
    if (previews.before) URL.revokeObjectURL(previews.before);
    if (previews.after) URL.revokeObjectURL(previews.after);
  }, [previews]);

  const compress = async (file: File) => {
    const error = validateImage(file);
    if (error) return alert(error);

    revokeUrls();
    setOriginalImage(file);
    setCompressedImage(null);
    setPreviews({ before: "", after: "" });
    setLoading(true);
    setProgress(0);
    lastProgressValue.current = 0;

    const options = getCompressionOptions(file, (p) => {
      const currentP = Math.round(p);
      // SÓ atualiza o estado se mudar 5% ou chegar em 100%
      if (currentP - lastProgressValue.current >= 5 || currentP === 100) {
        setProgress(currentP);
        lastProgressValue.current = currentP;
      }
    });

    try {
      const compressedBlob = await imageCompression(file, options);

      // Inteligência de tamanho
      const finalBlob = compressedBlob.size > file.size ? file : compressedBlob;

      const compressedFile = new File(
        [finalBlob],
        sanitizeFileName(file.name),
        { type: file.type, lastModified: Date.now() }
      );

      const beforeUrl = URL.createObjectURL(file);
      const afterUrl = URL.createObjectURL(compressedFile);

      setPreviews({ before: beforeUrl, after: afterUrl });
      setCompressedImage(compressedFile);

      // Delay para garantir que o browser montou as imagens antes de tirar o loader
      setTimeout(() => setLoading(false), 400);
    } catch (err) {
      console.error("Erro na compressão:", err);
      setLoading(false);
    }
  };

  const download = useCallback(() => {
    if (!compressedImage || !previews.after) return;

    const link = document.createElement("a");
    link.href = previews.after;
    link.download = `optimized_${compressedImage.name}`;
    link.click();
  }, [compressedImage, previews.after]);

  const reset = useCallback(() => {
    revokeUrls();
    setOriginalImage(null);
    setCompressedImage(null);
    setPreviews({ before: "", after: "" });
    setLoading(false);
    setProgress(0);
  }, [revokeUrls]);

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

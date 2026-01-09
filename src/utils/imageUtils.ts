import type { Options } from "browser-image-compression";

export const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
];
export const MAX_SIZE_MB = 15;

export const validateImage = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type))
        return "Formato inválido. Use JPG, PNG, WebP ou GIF.";
    if (file.size > MAX_SIZE_MB * 1024 * 1024)
        return `Arquivo muito grande (máximo ${MAX_SIZE_MB}MB).`;
    return null;
};

export const sanitizeFileName = (name: string): string => {
    return name.replace(/[^a-z0-9.]/gi, "_").replace(/_{2,}/g, "_");
};

export const formatSize = (bytes: number): string => {
    if (bytes <= 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${(bytes / 1024).toFixed(2)} KB` : `${mb.toFixed(2)} MB`;
};

export const calculateEconomy = (
    original: number,
    compressed: number
): number => {
    if (original <= 0) return 0;
    const raw = Math.round(((original - compressed) / original) * 100);
    return Math.max(0, raw);
};

export const getCompressionOptions = (
    file: File,
    onProgress: (p: number) => void
): Options => {
    // Se for PNG, maior o limite de tamanho, PNGs sofrem mais com compressão agressiva
    const isPng = file.type === "image/png";

    return {
        maxSizeMB: isPng ? 2 : 1.2,
        maxWidthOrHeight: 2560,
        useWebWorker: true,
        fileType: file.type,
        initialQuality: 0.85, // Sweet spot de compressão
        preserveExif: true,
        alwaysKeepResolution: true,
        onProgress,
    };
};

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { ALLOWED_TYPES } from "../utils/imageUtils";

interface Props {
  onFileSelect: (file: File) => void;
}

export function UploadArea({ onFileSelect }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    handleDrag(e);
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    handleDrag(e);
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    handleDrag(e);
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && ALLOWED_TYPES.includes(file.type)) {
      onFileSelect(file);
    } else if (file) {
      alert("Formato não suportado.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center justify-center w-full animate-in fade-in duration-700">
      <label
        onDragEnter={handleDragIn}
        onDragOver={handleDrag}
        onDragLeave={handleDragOut}
        onDrop={handleDrop}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && fileInputRef.current?.click()
        }
        tabIndex={0}
        className={`flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-3xl cursor-pointer transition-all group outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${isDragging
            ? "border-pink-500 bg-pink-500/10 scale-[1.01]"
            : "border-gray-700 bg-gray-800/50 hover:bg-gray-800/80 hover:border-pink-500/50 shadow-inner"
          }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4 pointer-events-none">
          <div
            className={`p-5 bg-gray-900 rounded-2xl mb-4 transition-all duration-300 border border-gray-800 ${isDragging
                ? "scale-110 text-white border-pink-500 shadow-[0_0_30px_rgba(219,39,119,0.3)]"
                : "group-hover:scale-110 text-pink-500"
              }`}
          >
            <Upload className="w-10 h-10" />
          </div>

          <p className="mb-2 text-xl text-white font-bold tracking-tight">
            {isDragging ? "Solte agora!" : "Arraste sua imagem aqui"}
          </p>

          <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-black">
            PNG, JPG, WEBP | ATÉ 15MB
          </p>

          <div
            className={`mt-6 px-5 py-2 bg-pink-600/10 rounded-full text-[10px] text-pink-500 font-black uppercase tracking-widest border border-pink-500/20 transition-all transform ${isDragging
                ? "opacity-0"
                : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
              }`}
          >
            Ou clique para explorar
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={ALLOWED_TYPES.join(",")}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

import { useState, useRef, useCallback } from "react";

interface Props {
  before: string;
  after: string;
}

export function BeforeAfterSlider({ before, after }: Props) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const frameRef = useRef<number>(0);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      setSliderPos(Math.min(Math.max(position, 0), 100));
    });
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) updatePos(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-75 md:h-112.5 overflow-hidden rounded-3xl select-none bg-black border border-gray-800 shadow-2xl touch-none ${isDragging ? "cursor-grabbing" : "cursor-pointer"
        }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <img
        src={after}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        alt="Depois"
        draggable={false}
      />

      <div
        className="absolute inset-0 w-full h-full border-r-2 border-white/20 pointer-events-none z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={before}
          className="absolute inset-0 w-full h-full object-contain bg-[#0a0a0a]"
          alt="Antes"
          draggable={false}
        />
      </div>

      <div
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center text-gray-900 font-bold border-4 border-black/5">
          ↔
        </div>
      </div>

      <div className="absolute top-6 left-6 pointer-events-none z-30 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-tighter border border-white/10">
        Original
      </div>
      <div className="absolute top-6 right-6 pointer-events-none z-30 bg-pink-600/80 backdrop-blur-md text-white px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-tighter border border-white/10">
        Otimizada
      </div>
    </div>
  );
}

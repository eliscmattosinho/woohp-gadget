import { Badge } from "../ui/Badge";

export function Header() {
  return (
    <header className="max-w-4xl mx-auto text-center mb-16">
      <h1 className="text-6xl font-black tracking-tighter mb-4 text-white">
        Byte<span className="text-pink-600">Beauty</span>
      </h1>
      <p className="text-gray-500 text-sm max-w-md mx-auto mt-5 leading-relaxed">
        Foco na fidelidade visual (nitidez).
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <Badge label="✨ Web Workers" />
        <Badge label="💎 Lossless Quality" />
        <Badge label="🔒 Client-Side Only" />
      </div>
    </header>
  );
}

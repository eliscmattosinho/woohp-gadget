interface StatCardProps {
  label: string;
  value: string;
  variant?: "gray" | "pink" | "highlight";
}

export function StatCard({ label, value, variant = "gray" }: StatCardProps) {
  // Lógica de estilos baseada na variante
  const containerStyles = {
    gray: "bg-gray-900 border-gray-800",
    pink: "bg-gray-900 border-gray-800",
    highlight: "bg-pink-600 border-transparent",
  };

  const labelStyles = {
    gray: "text-gray-500",
    pink: "text-pink-500",
    highlight: "text-white/80",
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${containerStyles[variant]}`}
    >
      <p
        className={`text-[10px] uppercase font-black mb-2 tracking-widest ${labelStyles[variant]}`}
      >
        {label}
      </p>
      <p className="text-2xl font-mono font-bold">{value}</p>
    </div>
  );
}

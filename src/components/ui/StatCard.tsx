interface StatCardProps {
  label: string;
  value: string;
  variant?: "gray" | "pink" | "highlight";
}

const variants = {
  gray: { container: "bg-gray-900 border-gray-800", label: "text-gray-500" },
  pink: { container: "bg-gray-900 border-gray-800", label: "text-pink-500" },
  highlight: {
    container: "bg-pink-600 border-transparent text-white",
    label: "text-white/80",
  },
};

export function StatCard({ label, value, variant = "gray" }: StatCardProps) {
  const style = variants[variant];
  return (
    <div className={`p-6 rounded-2xl border transition-all ${style.container}`}>
      <p
        className={`text-[10px] uppercase font-black mb-2 tracking-widest ${style.label}`}
      >
        {label}
      </p>
      <p className="text-2xl font-mono font-bold">{value}</p>
    </div>
  );
}

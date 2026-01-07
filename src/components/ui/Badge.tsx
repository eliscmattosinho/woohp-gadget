export function Badge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      {label}
    </span>
  );
}

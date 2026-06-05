export default function SplashScreen({ statusText, progress }: { statusText: string; progress: number }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center select-none">
      <div className="size-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(52,211,153,0.3)] animate-pulse">
        <span className="text-black font-bold text-3xl">G</span>
      </div>
      <h1 className="text-4xl font-bold text-white tracking-tight mb-2 drop-shadow-[0_0_20px_rgba(52,211,153,0.15)]">
        GeoOrbit AI
      </h1>
      <p className="text-sm text-slate-500 mb-10 tracking-wide">
        Inteligência Orbital para Mineração Sustentável
      </p>
      <div className="w-80 h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
        <p className="text-xs text-slate-400 font-mono tracking-wide">{statusText}</p>
      </div>
    </div>
  );
}

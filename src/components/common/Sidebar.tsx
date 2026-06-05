import { useApp } from "../../context/AppContext";
import { navItems } from "../../context/data";

export default function Sidebar() {
  const { currentView, setCurrentView } = useApp();

  return (
    <aside className="w-56 shrink-0 border-r border-slate-800/80 bg-slate-900/60 flex flex-col">
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-slate-800/60">
        <div className="size-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
          <span className="text-black font-bold text-xs">G</span>
        </div>
        <div>
          <div className="text-xs font-semibold text-white leading-tight">GeoOrbit AI</div>
          <div className="text-[9px] text-slate-500 leading-tight">Inteligência Orbital</div>
        </div>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const active = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                active
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[inset_0_0_12px_rgba(52,211,153,0.06)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
              }`}
            >
              <svg className="size-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-slate-800/60">
        <div className="flex items-center gap-2 text-[10px] text-slate-600">
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" /> Sistema Operacional
        </div>
      </div>
    </aside>
  );
}

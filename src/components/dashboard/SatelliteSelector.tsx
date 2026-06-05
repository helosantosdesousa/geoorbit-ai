import { useApp } from "../../context/AppContext";
import { satelites } from "../../context/data";

const colorMap = {
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", bar: "bg-emerald-400" },
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", bar: "bg-cyan-400" },
  red: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", bar: "bg-red-400" },
};

function KpiCard({ label, value, color, suffix, detail, flashing, bar }: {
  label: string; value: string; color: "emerald" | "cyan" | "red"; suffix?: string; detail?: string; flashing?: boolean; bar?: boolean;
}) {
  const c = colorMap[color];
  return (
    <div className={`${c.bg} ${c.border} border rounded-xl px-4 py-3.5 space-y-1`}>
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`text-2xl font-bold tabular-nums ${c.text} ${flashing ? "animate-flash-danger" : ""}`}>
        {value}{suffix && <span className="text-sm opacity-60 ml-0.5">{suffix}</span>}
      </div>
      {bar && <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden"><div className={`h-full w-[94.2%] ${c.bar} rounded-full`} /></div>}
      {detail && <div className="text-[10px] text-slate-500">{detail}</div>}
    </div>
  );
}

export default function SatelliteSelector() {
  const { sateliteId, setSateliteId } = useApp();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white tracking-tight">Painel Geral</h2>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Satélite:</span>
        <select
          value={sateliteId}
          onChange={(e) => setSateliteId(e.target.value as typeof sateliteId)}
          className="bg-slate-800 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer"
        >
          <option value="sentinel-2a">Satélite Sentinel-2A</option>
          <option value="landsat-9">Satélite Landsat 9</option>
          <option value="cbers-4a">Satélite CBERS-4A</option>
        </select>
      </div>
    </div>
  );
}

export function KpiGrid() {
  const { sateliteId } = useApp();
  const sat = satelites[sateliteId];

  return (
    <div className="grid grid-cols-4 gap-4">
      <KpiCard label="Satélites Ativos" value={String(sat.ativos)} color="emerald" detail={sat.ativosTexto} />
      <KpiCard label="Alertas Críticos" value={String(sat.alertas)} color="red" detail={sat.alertaTexto} flashing={sat.alertas > 0} />
      <KpiCard label="Área Ambiental Poupada" value={String(sat.areaPreservada)} color="cyan" suffix="Hectares" />
      <KpiCard label="Assertividade da IA" value={String(sat.assertividade)} color="emerald" suffix="%" detail="Últimos 30 dias" bar />
    </div>
  );
}

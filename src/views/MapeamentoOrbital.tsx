import { useState } from "react";
import { useApp } from "../context/AppContext";
import InteractiveMap from "../components/dashboard/InteractiveMap";
import type { DamData } from "../types";

export default function MapeamentoOrbital() {
  const { regiao, modo, setRegiao, setModo } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [damData, setDamData] = useState<DamData | null>(null);
  const isProspeccao = modo === "prospeccao";
  const isSeguranca = modo === "seguranca";

  function handleDamClick(d: DamData) {
    setDamData(d);
    setSidebarOpen(true);
  }

  return (
    <div className="h-full flex">
      <div className="flex-1 relative">
        <InteractiveMap onDamClick={handleDamClick} />

        {/* Overlay controls */}
        <div className="absolute top-3 left-3 right-3 z-[1000] flex items-center gap-3 pointer-events-none">
          <div className="pointer-events-auto bg-slate-900/90 backdrop-blur border border-slate-700/60 rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Região</span>
            <select value={regiao} onChange={(e) => setRegiao(e.target.value as typeof regiao)}
              className="bg-transparent text-xs text-slate-200 border border-slate-700/60 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 cursor-pointer">
              <option value="carajas">Carajás — PA</option>
              <option value="quadrilatero">Quadrilátero Ferrífero — MG</option>
            </select>
          </div>

          <div className="pointer-events-auto bg-slate-900/90 backdrop-blur border border-slate-700/60 rounded-lg p-1 flex gap-1">
            <button onClick={() => setModo("prospeccao")}
              className={`px-3 py-1.5 rounded text-[10px] font-medium transition-all ${isProspeccao ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30" : "text-slate-500 hover:text-slate-300"}`}>
              Prospecção Mineral
            </button>
            <button onClick={() => setModo("seguranca")}
              className={`px-3 py-1.5 rounded text-[10px] font-medium transition-all ${isSeguranca ? "bg-red-500/15 text-red-400 border border-red-500/30" : "text-slate-500 hover:text-slate-300"}`}>
              Segurança de Barragens
            </button>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/80 backdrop-blur border border-slate-700/60 rounded-lg px-3 py-2 text-[10px] space-y-1">
          {isProspeccao ? (
            <><div className="flex items-center gap-2 text-slate-400"><span className="size-2 rounded-sm bg-cyan-400" /> Depósito Mineral</div><div className="flex items-center gap-2 text-slate-400"><span className="size-2 rounded-sm bg-emerald-400" /> Alvo em Análise</div></>
          ) : (
            <><div className="flex items-center gap-2 text-red-400"><span className="size-2 rounded-sm bg-red-500 animate-flash-danger" /> Barragem — Crítico</div><div className="flex items-center gap-2 text-slate-400"><span className="size-2 rounded-sm border border-red-500 border-dashed" /> Perímetro de Risco</div></>
          )}
        </div>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && damData && (
        <div className="w-80 shrink-0 border-l border-slate-800/80 bg-slate-900/95 backdrop-blur p-4 overflow-y-auto animate-slide-in-right">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-white">{damData.nome}</h3>
            <button onClick={() => setSidebarOpen(false)} className="size-5 flex items-center justify-center rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
            <div className="text-[10px] text-red-400 font-medium flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-red-500 animate-flash-danger" />
              Risco de Subsidência — {damData.deslocamento} mm acumulados
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
            <div className="text-[10px] text-slate-500 mb-2">Deslocamento Acumulado (mm)</div>
            <svg viewBox="0 0 280 100" className="w-full h-24">
              <defs><linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(239,68,68,0.3)" /><stop offset="100%" stopColor="rgba(239,68,68,0)" /></linearGradient></defs>
              {[0, 25, 50, 75].map(y => <line key={y} x1="30" y1={10 + y * 0.8} x2="270" y2={10 + y * 0.8} stroke="rgba(71,85,105,0.3)" strokeWidth="0.5" />)}
              <text x="26" y="13" textAnchor="end" fill="rgb(100,116,139)" fontSize="6">16</text>
              <text x="26" y="33" textAnchor="end" fill="rgb(100,116,139)" fontSize="6">12</text>
              <text x="26" y="53" textAnchor="end" fill="rgb(100,116,139)" fontSize="6">8</text>
              <text x="26" y="73" textAnchor="end" fill="rgb(100,116,139)" fontSize="6">4</text>
              <text x="26" y="90" textAnchor="end" fill="rgb(100,116,139)" fontSize="6">0</text>
              {["Jan","Fev","Mar","Abr","Mai","Jun"].map((m,i) => <text key={m} x={30 + i * 48} y="94" textAnchor="middle" fill="rgb(100,116,139)" fontSize="6">{m}</text>)}
              <polyline points="30,86 78,76 126,62 174,42 222,20 270,6" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="30,86 78,76 126,62 174,42 222,20 270,6" fill="none" stroke="#ef4444" strokeWidth="4" opacity="0.15" strokeLinecap="round" strokeLinejoin="round" />
              <polygon points="30,86 78,76 126,62 174,42 222,20 270,6 270,90 30,90" fill="url(#chart-grad)" />
              {[86,76,62,42,20,6].map((y,i) => <circle key={i} cx={30 + i * 48} cy={y} r="2.5" fill="#ef4444" stroke="#0f172a" strokeWidth="1" />)}
            </svg>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 space-y-2 mb-4">
            {[
              { l: "Barragem", v: damData.nome },
              { l: "Deslocamento atual", v: `${damData.deslocamento} mm` },
              { l: "Nível de Alerta", v: "Vermelho (Crítico)" },
              { l: "Tensão no solo", v: "2.4 MPa" },
              { l: "Prob. de ruptura", v: "73% (simulação Monte Carlo)" },
              { l: "Última leitura", v: "05/06/2026 — 14:32" },
              { l: "Sensor mais próximo", v: "S-INSAR-07" },
            ].map((p) => (
              <div key={p.l} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{p.l}</span>
                <span className="text-slate-300 font-medium">{p.v}</span>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-xs font-medium hover:bg-red-500/25 transition-colors">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54-2.164 1.54-5.836 0-8S7.116 4 5.162 6.076M12 4.5c-4.386 2.027-6.386 6.473-4.086 10.527" />
            </svg>
            Disparar Alerta de Evacuação para Autoridades
          </button>
        </div>
      )}
    </div>
  );
}

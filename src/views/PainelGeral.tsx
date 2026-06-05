import { useState, useCallback } from "react";
import { useApp } from "../context/AppContext";
import { satelites, logs } from "../context/data";
import { KpiGrid } from "../components/dashboard/SatelliteSelector";

export default function PainelGeral() {
  const { sateliteId } = useApp();
  const [sincronizando, setSincronizando] = useState(false);
  const sat = satelites[sateliteId];

  const baixarRelatorio = useCallback(() => {
    const conteudo = [
      "=== RELATÓRIO MENSAL GEOORBIT AI ===",
      `Satélite: ${sat.nome}`,
      `Região monitorada: Carajás — PA / Quadrilátero Ferrífero — MG`,
      `Área preservada: ${sat.areaPreservada} hectares`,
      `Assertividade da IA: ${sat.assertividade}%`,
      `Alertas registrados: ${sat.alertas}`,
      `Período: Maio de 2026`,
      "=== FIM DO RELATÓRIO ===",
    ].join("\n");
    const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-geoorbit-${sateliteId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [sateliteId, sat]);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white tracking-tight">Painel Geral</h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Satélite:</span>
          <SatelliteDropdown />
        </div>
      </div>

      <KpiGrid />

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 bg-slate-900/60 border border-slate-800/60 rounded-xl p-4">
          <h3 className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-3">Atividade Recente</h3>
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-400 py-1.5 border-b border-slate-800/40 last:border-0">
                <span className={`size-1.5 rounded-full shrink-0 ${log.ok ? "bg-emerald-500" : "bg-red-500 animate-flash-danger"}`} />
                <span className="font-mono text-[10px] text-slate-600 w-16 shrink-0">
                  {`${14 + Math.floor(i * 1.2)}:${(32 + i * 11) % 60}`.padStart(5, "0")}
                </span>
                <span>{log.msg}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-slate-900/60 border border-slate-800/60 rounded-xl p-4 flex flex-col gap-3">
          <h3 className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">Ações Rápidas</h3>
          <button onClick={baixarRelatorio}
            className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg px-4 py-3 text-xs font-medium hover:bg-emerald-500/20 transition-colors">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Baixar Relatório Mensal PDF
          </button>
          <button onClick={() => { setSincronizando(true); setTimeout(() => setSincronizando(false), 2000); }} disabled={sincronizando}
            className="flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg px-4 py-3 text-xs font-medium hover:bg-cyan-500/20 transition-colors disabled:opacity-50">
            <svg className={`size-4 ${sincronizando ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {sincronizando ? "Sincronizando..." : "Sincronizar Sensores Orbitais"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SatelliteDropdown() {
  const { sateliteId, setSateliteId } = useApp();
  return (
    <select value={sateliteId} onChange={(e) => setSateliteId(e.target.value as typeof sateliteId)}
      className="bg-slate-800 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer">
      <option value="sentinel-2a">Satélite Sentinel-2A</option>
      <option value="landsat-9">Satélite Landsat 9</option>
      <option value="cbers-4a">Satélite CBERS-4A</option>
    </select>
  );
}

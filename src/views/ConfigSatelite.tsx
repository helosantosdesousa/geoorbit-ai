import { useState } from "react";

export default function ConfigSatelite() {
  const [sensores, setSensores] = useState([
    { id: "S1", nome: "SAR-C (Sentinel-1)", ativo: true, resolucao: "10 m", angulo: 29, ultimaCalibracao: "04/06/2026" },
    { id: "S2", nome: "MSI (Sentinel-2)", ativo: true, resolucao: "10 m", angulo: 0, ultimaCalibracao: "03/06/2026" },
    { id: "S3", nome: "MUX (CBERS-4A)", ativo: false, resolucao: "16 m", angulo: 5, ultimaCalibracao: "28/05/2026" },
    { id: "S4", nome: "AWFI (Amazonia-1)", ativo: true, resolucao: "60 m", angulo: 3, ultimaCalibracao: "05/06/2026" },
  ]);

  return (
    <div className="p-6 overflow-y-auto h-full space-y-6">
      <h2 className="text-lg font-semibold text-white tracking-tight">Configurações de Satélite</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4 space-y-4">
          <h3 className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">Parâmetros Orbítais Globais</h3>
          <div className="space-y-3">
            {[
              { l: "Altitude Média", v: "637 km" },
              { l: "Inclinação", v: "98.2° (SSO)" },
              { l: "Período de Revista", v: "10 dias" },
              { l: "Faixa de Imageamento", v: "290 km" },
              { l: "Modo de Polarização", v: "HH + HV + VV" },
            ].map((d) => (
              <div key={d.l} className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{d.l}</span>
                <span className="text-slate-300 font-mono">{d.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4 space-y-4">
          <h3 className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">Processamento de Imagens</h3>
          <div className="space-y-3">
            {[
              { l: "Correção Atmosférica", v: "6S (Segunda Simulação)" },
              { l: "Orto-retificação", v: "SRTM 30 m" },
              { l: "Fusão PAN", v: "Gram-Schmidt" },
              { l: "Classificação", v: "Random Forest (IA)" },
              { l: "Compressão", v: "JPEG 2000 — 8:1" },
            ].map((d) => (
              <div key={d.l} className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{d.l}</span>
                <span className="text-slate-300 font-mono">{d.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-4">
        <h3 className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-3">Sensores Ativos</h3>
        <div className="space-y-2">
          {sensores.map((s) => (
            <div key={s.id} className="flex items-center justify-between bg-slate-800/40 border border-slate-700/40 rounded-lg px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSensores((prev) => prev.map((x) => (x.id === s.id ? { ...x, ativo: !x.ativo } : x)))}
                  className={`relative w-9 h-5 rounded-full transition-colors ${s.ativo ? "bg-emerald-500/40" : "bg-slate-700"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform ${s.ativo ? "translate-x-4" : "translate-x-0"}`} />
                </button>
                <div>
                  <div className="text-xs text-slate-200 font-medium">{s.nome}</div>
                  <div className="text-[10px] text-slate-500">{s.resolucao} · {s.angulo}° · Calib. {s.ultimaCalibracao}</div>
                </div>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${s.ativo ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-800 text-slate-500 border-slate-700"}`}>
                {s.ativo ? "Ativo" : "Inativo"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

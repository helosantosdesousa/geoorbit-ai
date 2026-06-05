import { useState } from "react";
import { dadosAuditoria } from "../context/data";
import Modal from "../components/common/Modal";
import ChemicalModalContent from "../components/dashboard/ChemicalModalContent";
import type { Auditoria } from "../types";

function statusClass(status: string) {
  switch (status) {
    case "Estável": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Atenção": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    default: return "bg-red-500/10 text-red-400 border-red-500/20 animate-flash-danger";
  }
}

export default function RelatoriosAuditoria() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Auditoria | null>(null);

  return (
    <div className="p-6 overflow-y-auto h-full">
      <h2 className="text-lg font-semibold text-white tracking-tight mb-4">Relatórios & Auditoria</h2>

      <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80">
                {["ID", "Data", "Região", "Tipo", "Status de Risco", "Ações"].map((h) => (
                  <th key={h} className={`${h === "Ações" ? "text-right" : "text-left"} px-4 py-3 text-slate-500 font-medium uppercase tracking-wider`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dadosAuditoria.map((item, i) => (
                <tr
                  key={item.id}
                  className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${i % 2 === 0 ? "bg-slate-900/30" : ""}`}
                >
                  <td className="px-4 py-3 text-slate-400 font-mono">#{String(item.id).padStart(3, "0")}</td>
                  <td className="px-4 py-3 text-slate-300">{item.data}</td>
                  <td className="px-4 py-3 text-slate-300">{item.regiao}</td>
                  <td className="px-4 py-3 text-slate-300">{item.tipoMineracao}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium border ${statusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => { setSelected(item); setModalOpen(true); }}
                      className="text-cyan-400 hover:text-cyan-300 text-[10px] font-medium underline underline-offset-2 decoration-cyan-500/30"
                    >
                      Inspecionar Dados
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Análise de Composição Química">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Auditoria", v: `#${String(selected.id).padStart(3, "0")}` },
                { l: "Região", v: selected.regiao },
                { l: "Data", v: selected.data },
                { l: "Minério", v: selected.tipoMineracao },
              ].map((d) => (
                <div key={d.l} className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{d.l}</div>
                  <div className="text-slate-200 font-medium">{d.v}</div>
                </div>
              ))}
            </div>
            <ChemicalModalContent regiaoLabel={selected.regiao} />
          </div>
        )}
      </Modal>
    </div>
  );
}

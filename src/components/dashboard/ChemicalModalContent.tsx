import { mockComposicao } from "../../context/data";

export default function ChemicalModalContent({ regiaoLabel }: { regiaoLabel: string }) {
  const composicao = regiaoLabel.includes("Carajás") ? mockComposicao.carajas : mockComposicao.quadrilatero;

  return (
    <div className="space-y-4 text-sm">
      <div className="bg-slate-800/50 rounded-lg p-3">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-3">Compostos Químicos Detectados</div>
        <div className="space-y-2">
          {composicao.elementos.map((el, i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-900/50 rounded-lg px-3 py-2 border border-slate-700/40">
              <span className="size-2 rounded-full bg-cyan-400 shrink-0" />
              <span className="text-slate-200 text-xs">{el}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-slate-400">
          <span className="text-slate-500">Teor Químico Estimado:</span>{" "}
          <span className="text-cyan-300">{composicao.teor}</span>
        </div>
      </div>
      <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5">
        <span className="text-xs text-slate-400">Confiança da Análise</span>
        <span className="text-sm font-bold text-emerald-400">{composicao.confianca}%</span>
      </div>
    </div>
  );
}

import { AppProvider, useApp } from "./context/AppContext";
import SplashScreen from "./components/common/SplashScreen";
import Sidebar from "./components/common/Sidebar";
import PainelGeral from "./views/PainelGeral";
import MapeamentoOrbital from "./views/MapeamentoOrbital";
import RelatoriosAuditoria from "./views/RelatoriosAuditoria";
import ConfigSatelite from "./views/ConfigSatelite";

function Dashboard() {
  const { currentView, isLoading, bootMsg, bootProgress, sateliteStatus, setSateliteStatus } = useApp();

  return (
    <>
      {isLoading && <SplashScreen statusText={bootMsg} progress={bootProgress} />}

      <div
        className={`h-screen w-screen flex flex-col bg-slate-950 text-slate-200 overflow-hidden select-none transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <header className="h-12 shrink-0 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <span className="text-black font-bold text-[10px]">G</span>
            </div>
            <h1 className="text-sm font-semibold text-white">
              GeoOrbit AI <span className="text-slate-500 font-normal">— Inteligência Orbital</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div
                className={`size-1.5 rounded-full ${
                  sateliteStatus === "conectado"
                    ? "bg-emerald-400 shadow-[0_0_4px_#34d399]"
                    : sateliteStatus === "reconectando"
                    ? "bg-amber-400 animate-blink"
                    : "bg-red-500 animate-flash-danger"
                }`}
              />
              <span className="text-slate-500">Sentinel-1:</span>
              <span
                className={
                  sateliteStatus === "conectado"
                    ? "text-emerald-400"
                    : sateliteStatus === "reconectando"
                    ? "text-amber-400"
                    : "text-red-400"
                }
              >
                {sateliteStatus === "conectado"
                  ? "Conectado"
                  : sateliteStatus === "reconectando"
                  ? "Reconectando..."
                  : "Falha na Conexão"}
              </span>
            </div>
            <button
              onClick={() =>
                setSateliteStatus(
                  sateliteStatus === "conectado" ? "reconectando" : sateliteStatus === "reconectando" ? "falha" : "conectado"
                )
              }
              className="px-2 py-0.5 rounded border border-slate-700 text-slate-600 hover:text-slate-300 hover:border-slate-500 transition-colors text-[10px]"
            >
              simular
            </button>
          </div>
        </header>

        <div className="flex-1 flex min-h-0">
          <Sidebar />
          <main className="flex-1 min-w-0">
            {currentView === "painel" && <PainelGeral />}
            {currentView === "mapeamento" && <MapeamentoOrbital />}
            {currentView === "relatorios" && <RelatoriosAuditoria />}
            {currentView === "config" && <ConfigSatelite />}
          </main>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

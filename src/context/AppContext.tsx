import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { View, Regiao, Modo, SateliteId, SateliteStatus } from "../types";
import { bootMessages } from "./data";

interface AppState {
  isLoading: boolean;
  bootMsg: string;
  bootProgress: number;
  currentView: View;
  regiao: Regiao;
  modo: Modo;
  sateliteId: SateliteId;
  sateliteStatus: SateliteStatus;
  setCurrentView: (v: View) => void;
  setRegiao: (r: Regiao) => void;
  setModo: (m: Modo) => void;
  setSateliteId: (s: SateliteId) => void;
  setSateliteStatus: (s: SateliteStatus) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [bootMsg, setBootMsg] = useState(bootMessages[0]);
  const [bootProgress, setBootProgress] = useState(0);
  const [currentView, setCurrentView] = useState<View>("painel");
  const [regiao, setRegiao] = useState<Regiao>("carajas");
  const [modo, setModo] = useState<Modo>("prospeccao");
  const [sateliteId, setSateliteId] = useState<SateliteId>("sentinel-2a");
  const [sateliteStatus, setSateliteStatus] = useState<SateliteStatus>("conectado");

  useEffect(() => {
    const t1 = setTimeout(() => { setBootMsg(bootMessages[1]); setBootProgress(33); }, 1000);
    const t2 = setTimeout(() => { setBootMsg(bootMessages[2]); setBootProgress(66); }, 2000);
    const t3 = setTimeout(() => { setBootProgress(100); setIsLoading(false); }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AppContext.Provider value={{
      isLoading, bootMsg, bootProgress,
      currentView, regiao, modo, sateliteId, sateliteStatus,
      setCurrentView, setRegiao, setModo, setSateliteId, setSateliteStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

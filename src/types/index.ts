export type View = "painel" | "mapeamento" | "relatorios" | "config";
export type Regiao = "carajas" | "quadrilatero";
export type Modo = "prospeccao" | "seguranca";
export type SateliteId = "sentinel-2a" | "landsat-9" | "cbers-4a";
export type RiscoStatus = "Estável" | "Atenção" | "Crítico";
export type SateliteStatus = "conectado" | "reconectando" | "falha";

export interface Auditoria {
  id: number;
  data: string;
  regiao: string;
  tipoMineracao: string;
  status: RiscoStatus;
}

export interface SateliteInfo {
  nome: string;
  ativos: number;
  alertas: number;
  areaPreservada: number;
  assertividade: number;
  alertaTexto: string;
  ativosTexto: string;
}

export interface LogAtividade {
  msg: string;
  ok: boolean;
}

export interface ComposicaoQuimica {
  elementos: string[];
  teor: string;
  confianca: number;
}

export interface PoligonoProspeccao {
  coords: [number, number][];
  label: string;
  minerio: string;
  teor: string;
  profundidade: string;
}

export interface PoligonoSeguranca {
  coords: [number, number][];
  nome: string;
  risco: string;
  deslocamento: number;
}

export interface DamData {
  nome: string;
  deslocamento: number;
}

export interface NavItem {
  id: View;
  label: string;
  icon: string;
}

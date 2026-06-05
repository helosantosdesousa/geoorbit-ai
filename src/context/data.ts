import { type SateliteInfo, type Auditoria, type LogAtividade, type ComposicaoQuimica, type PoligonoProspeccao, type PoligonoSeguranca } from "../types";

export const satelites: Record<string, SateliteInfo> = {
  "sentinel-2a": {
    nome: "Satélite Sentinel-2A",
    ativos: 4, alertas: 1, areaPreservada: 140, assertividade: 94.2,
    alertaTexto: "Risco de subsidência — Barragem Sul",
    ativosTexto: "Sentinel-1, -2, CBERS-4A, Amazonia-1",
  },
  "landsat-9": {
    nome: "Satélite Landsat 9",
    ativos: 3, alertas: 2, areaPreservada: 112, assertividade: 91.8,
    alertaTexto: "Anomalia térmica — Setor Leste",
    ativosTexto: "Landsat 9, Sentinel-2, CBERS-4A",
  },
  "cbers-4a": {
    nome: "Satélite CBERS-4A",
    ativos: 3, alertas: 0, areaPreservada: 78, assertividade: 88.5,
    alertaTexto: "Nenhum alerta ativo",
    ativosTexto: "CBERS-4A, Amazonia-1, Sentinel-1",
  },
};

export const logs: LogAtividade[] = [
  { msg: "Satélite Sentinel-2 sincronizado há 5 minutos", ok: true },
  { msg: "Varredura orbital concluída — 98.7% de cobertura", ok: true },
  { msg: "Anomalia térmica detectada no setor NW", ok: false },
  { msg: "Atualização do modelo digital de elevação recebida", ok: true },
  { msg: "Correção atmosférica da banda L aplicada", ok: true },
  { msg: "Requisição de nova passagem orbital enviada", ok: true },
];

export const dadosAuditoria: Auditoria[] = [
  { id: 1, data: "12/05/2026", regiao: "Carajás — PA", tipoMineracao: "Ferro", status: "Estável" },
  { id: 2, data: "28/04/2026", regiao: "Quadrilátero Ferrífero — MG", tipoMineracao: "Ferro", status: "Atenção" },
  { id: 3, data: "15/04/2026", regiao: "Carajás — PA", tipoMineracao: "Cobre", status: "Estável" },
  { id: 4, data: "02/04/2026", regiao: "Carajás — PA", tipoMineracao: "Níquel", status: "Crítico" },
  { id: 5, data: "20/03/2026", regiao: "Quadrilátero Ferrífero — MG", tipoMineracao: "Ferro", status: "Estável" },
  { id: 6, data: "08/03/2026", regiao: "Carajás — PA", tipoMineracao: "Manganês", status: "Atenção" },
  { id: 7, data: "22/02/2026", regiao: "Quadrilátero Ferrífero — MG", tipoMineracao: "Ferro", status: "Estável" },
  { id: 8, data: "10/02/2026", regiao: "Carajás — PA", tipoMineracao: "Ferro", status: "Estável" },
];

export const mockComposicao: Record<string, ComposicaoQuimica> = {
  carajas: {
    elementos: ["Ferro (Fe) — 72,4%", "Manganês (Mn) — 8,1%", "Silício (Si) — 5,3%", "Alumínio (Al) — 3,8%"],
    teor: "Minério de alto teor — hematita especular",
    confianca: 87.4,
  },
  quadrilatero: {
    elementos: ["Ferro (Fe) — 65,2%", "Silício (Si) — 12,7%", "Alumínio (Al) — 4,5%", "Magnésio (Mg) — 2,1%"],
    teor: "Itabirito compacto com dolomita",
    confianca: 91.2,
  },
};

export const regioesCoords: Record<string, [number, number]> = {
  carajas: [-6.0, -50.0],
  quadrilatero: [-20.0, -43.5],
};

export const poligonosProspeccao: Record<string, PoligonoProspeccao[]> = {
  carajas: [
    { coords: [[-5.88, -50.12], [-5.82, -50.0], [-5.86, -49.88], [-5.96, -49.86], [-6.02, -49.96], [-5.98, -50.08]], label: "Depósito de Lítio", minerio: "Espodumênio", teor: "6.2% Li₂O", profundidade: "120 m" },
    { coords: [[-6.12, -50.14], [-6.04, -50.08], [-6.06, -49.94], [-6.16, -49.92], [-6.18, -50.04]], label: "Cobre Detectado", minerio: "Calcopirita", teor: "4.8% Cu", profundidade: "85 m" },
  ],
  quadrilatero: [
    { coords: [[-19.88, -43.62], [-19.82, -43.5], [-19.86, -43.38], [-19.96, -43.36], [-20.02, -43.46], [-19.98, -43.58]], label: "Depósito de Lítio", minerio: "Espodumênio", teor: "5.9% Li₂O", profundidade: "95 m" },
    { coords: [[-20.12, -43.64], [-20.04, -43.58], [-20.06, -43.44], [-20.16, -43.42], [-20.18, -43.54]], label: "Cobre Detectado", minerio: "Calcopirita", teor: "3.7% Cu", profundidade: "110 m" },
  ],
};

export const poligonosSeguranca: Record<string, PoligonoSeguranca[]> = {
  carajas: [
    { coords: [[-5.95, -50.05], [-5.88, -49.98], [-5.92, -49.88], [-6.0, -49.9], [-6.02, -49.98]], nome: "Barragem Sul", risco: "Crítico", deslocamento: 12.4 },
  ],
  quadrilatero: [
    { coords: [[-19.95, -43.55], [-19.88, -43.48], [-19.92, -43.38], [-20.0, -43.4], [-20.02, -43.48]], nome: "Barragem Norte", risco: "Atenção", deslocamento: 7.8 },
  ],
};

export const bootMessages = [
  "Estabelecendo conexão orbital...",
  "Sincronizando dados dos satélites Sentinel...",
  "Carregando Gêmeo Digital...",
];

export const navItems = [
  { id: "painel" as const, label: "Painel Geral", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "mapeamento" as const, label: "Mapeamento Orbital", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "relatorios" as const, label: "Relatórios & Auditoria", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { id: "config" as const, label: "Configurações", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

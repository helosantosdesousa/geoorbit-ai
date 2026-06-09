# 🌍 GeoOrbit AI — Inteligência Orbital para Mineração Sustentável

**GeoOrbit AI** é um protótipo de console de administração desktop desenvolvido como trabalho de conclusão para a **FIAP Global Solution**, tema **Space Connect**. A plataforma simula um centro de comando orbital para mineração sustentável, combinando geotecnologias, inteligência artificial e visualização de dados em tempo real em uma interface cyberpunk de alto nível.

---

## 📋 Visão Geral

A indústria mineral enfrenta desafios críticos de sustentabilidade: degradação ambiental, rompimento de barragens e uso ineficiente dos recursos naturais. O **GeoOrbit AI** propõe um **gêmeo digital** (_Digital Twin_) de zonas de mineração, alimentado por dados orbitais simulados de satélites como Sentinel-2A, Landsat 9 e CBERS-4A.

A plataforma permite:

- 🛰️ **Monitorar** áreas de preservação e métricas ambientais em tempo real com KPIs dinâmicos.
- ⛏️ **Detectar** depósitos minerais por meio de assinaturas espectrais simuladas.
- 🚨 **Prever** riscos de subsidência em barragens de rejeitos com alertas visuais, gráficos de deslocamento do solo e botão de evacuação.
- 📊 **Auditar** processos com relatórios históricos de risco e análises químicas detalhadas.

Tudo isso em uma interface escura no estilo **centro de comando cibernético**, com acentos neon verde, ciano e vermelho, projetada para telas grandes e tomada de decisão rápida.

---

## 🏗️ Arquitetura do Projeto

O código segue uma **arquitetura modular** com responsabilidades bem definidas, separando tipos, estado global, componentes reutilizáveis, componentes de domínio e páginas. Isso garante **manutenibilidade**, **testabilidade** e **reuso** — princípios fundamentais de _Clean Architecture_.

```
src/
├── types/
│   └── index.ts                    # Interfaces e tipos globais (View, Regiao, Auditoria, etc.)
│
├── context/
│   ├── AppContext.tsx              # Estado global via React Context + Provider
│   └── data.ts                     # Dados mock (satélites, auditorias, polígonos, coordenadas)
│
├── components/
│   ├── common/
│   │   ├── SplashScreen.tsx        # Tela de inicialização animada (3s de boot)
│   │   ├── Sidebar.tsx             # Menu de navegação lateral persistente
│   │   └── Modal.tsx               # Container modal reutilizável (ESC fecha)
│   │
│   └── dashboard/
│       ├── SatelliteSelector.tsx    # Dropdown de satélite + grid de KPIs
│       ├── InteractiveMap.tsx       # Mapa Leaflet com polígonos dinâmicos
│       └── ChemicalModalContent.tsx # Conteúdo do modal de composição química
│
├── views/
│   ├── PainelGeral.tsx            # Dashboard Hub com KPIs, timeline e ações
│   ├── MapeamentoOrbital.tsx       # Mapa + controles + sidebar de barragem
│   ├── RelatoriosAuditoria.tsx     # Tabela de auditorias + modal de inspeção
│   └── ConfigSatelite.tsx          # Parâmetros orbitais e sensores
│
├── App.tsx                        # Bootstrap mínimo (Provider → Dashboard)
├── index.css                      # Tailwind + Leaflet CSS + animações @keyframes
└── main.tsx                       # Entry point React
```


## 🚀 Funcionalidades Principais

- Tela de Inicialização 
- Painel Geral
- Mapeamento Orbital
- Relatórios & Auditoria
- Configurações de Satélite

## 🛠️ Tecnologias Utilizadas

| Tecnologia         |
| ------------------- |
| **React**           |
| **TypeScript**      |
| **Vite**            |
| **Tailwind CSS**    |
| **Leaflet**          |
| **React-Leaflet**   |
| **React Context**   |

---

## 📦 Instalação e Execução

### Pré-requisitos

- **Node.js** 18 ou superior
- **npm** (gerenciador de pacotes)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/geoorbit-ai.git
cd geoorbit-ai

# 2. Instale todas as dependências
# (inclui automaticamente leaflet, react-leaflet e @types/leaflet)
npm install

# 3. Inicie o servidor de desenvolvimento Vite
npm run dev
```

Acesse no navegador: **[http://localhost:5173](http://localhost:5173)**

### Build de produção

```bash
npm run build
npm run preview
```

## 👥 Desenvolvido por

| Nome                               | RM     | 
| ---------------------------------- | ------ |
| Heloísa Santos de Sousa                    | 550256 |       
| Lucas Henrique Carrascoa                   | 99883 |       
| Pedro Reginato                 | 550896 |
| Francisco Henrique Lima                   | 99545 |       
| Diogo Makoto Mano                   | 98446 |    

**FIAP — Faculdade de Informática e Administração Paulista**  
**Global Solution — Space Connect**  
**2026**


Este projeto é de caráter educacional e acadêmico, desenvolvido para fins de apresentação na FIAP Global Solution.
#

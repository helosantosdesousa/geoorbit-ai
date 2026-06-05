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

### Por que essa arquitetura?

- **Separação de concernes**: tipos (`types/`), estado global (`context/`), UI reutilizável (`components/common/`), lógica de negócio (`components/dashboard/`), páginas (`views/`).
- **Context API**: o estado da aplicação (view ativa, região, modo, satélite, loading) é centralizado no `AppContext`, eliminando _prop drilling_.
- **Componentes puros**: `SplashScreen`, `Sidebar` e `Modal` são componentes genéricos que podem ser reutilizados em qualquer contexto.
- **Fácil manutenção**: cada arquivo tem menos de 100 linhas em média, com responsabilidade única.

---

## 🚀 Funcionalidades Principais

### 🎬 Tela de Inicialização (_Splash Screen_)

Ao carregar, o sistema exibe uma tela de boot profissional simulando a inicialização de um centro de controle orbital:

- Logotipo pulsante com gradiente neon e efeito _glow_ (`shadow-[0_0_40px]`).
- Barra de progresso animada com gradiente ciano-verde.
- Mensagens de status dinâmicas que evoluem a cada segundo:
  1. _"Estabelecendo conexão orbital..."_
  2. _"Sincronizando dados dos satélites Sentinel..."_
  3. _"Carregando Gêmeo Digital..."_
- Transição suave de 700ms com fade-in (`opacity-0 → opacity-100`) para o dashboard principal.

### 📈 Painel Geral (_Dashboard Hub_)

- **Seletor dinâmico de satélite**: alterne entre **Sentinel-2A**, **Landsat 9** ou **CBERS-4A** para ver métricas ambientais condicionais.
- **Indicadores (KPIs)** atualizados via Context API:
  - Satélites Ativos
  - Alertas Críticos (com闪烁 vermelho quando > 0)
  - **Área Ambiental Poupada** (em Hectares)
  - Assertividade da IA (com barra de progresso)
- **Timeline de atividades** orbitais simuladas em tempo real.
- **Botão funcional "Baixar Relatório Mensal PDF"** — aciona o download de um arquivo `.txt` com dados reais do período e satélite selecionado.
- **Botão "Sincronizar Sensores Orbitais"** com animação de _loading_ de 2 segundos.

### 🗺️ Mapeamento Orbital (_Mapa Interativo Leaflet_)

- Mapa geográfico real utilizando **OpenStreetMap** e **React-Leaflet** — sem chaves de API.
- **Seletor de região**: **Carajás — PA** e **Quadrilátero Ferrífero — MG**, com zoom e _pan_ automáticos via `map.flyTo()`.
- Dois modos de operação:
  - **🟢 Prospecção Mineral** — polígonos brilhantes ciano/verde sobre depósitos simulados de lítio, cobre e níquel. Cada polígono exibe _popup_ com dados estruturais (minério, teor, profundidade, resistividade).
  - **🔴 Segurança de Barragens** — polígonos vermelhos intermitentes tracejados sobre barragens. O clique abre uma barra lateral com:
    - Gráfico SVG de deslocamento acumulado do solo (mm) com curva crítica ascendente.
    - Parâmetros de engenharia (tensão, probabilidade de ruptura Monte Carlo, sensor InSAR).
    - Botão de ação: **"Disparar Alerta de Evacuação para Autoridades"**.
- **Legenda dinâmica** adaptada ao modo ativo.

### 📋 Relatórios & Auditoria (_Tabela de Dados e Inspeção_)

- Tabela histórica com 8 auditorias de risco geológico: **ID**, **Data**, **Região**, **Tipo de Mineração** e **Status** (Estável ✅ / Atenção ⚠️ / Crítico 🚨).
- Linhas com cores alternadas e _hover_ destacado.
- Botão **"Inspecionar Dados"** por linha → modal responsivo com:
  - Dados da auditoria em grid.
  - **Análise de Composição Química** — lista exclusiva de compostos detectados (ex.: Ferro (Fe) — 72,4%), sem gráficos de banda espectral.
  - Teor químico estimado e confiança da análise.
- Modal fecha com **ESC** ou clique no fundo.

### ⚙️ Configurações de Satélite

- **Parâmetros Orbítais Globais**: altitude, inclinação SSO, período de revista, faixa de imageamento, polarização.
- **Processamento de Imagens**: correção 6S, ortorretificação SRTM, fusão Gram-Schmidt, classificação Random Forest, compressão JPEG 2000.
- **Sensores Ativos**: 4 sensores (SAR-C, MSI, MUX, AWFI) com toggle, resolução, ângulo e calibração.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia          | Versão | Finalidade                              |
| ------------------- | ------ | --------------------------------------- |
| **React**           | 19     | Biblioteca de interface do usuário      |
| **TypeScript**      | 5      | Tipagem estática e segurança do código  |
| **Vite**            | 8      | Bundler e servidor de desenvolvimento   |
| **Tailwind CSS**    | 4      | Estilização utilitária com tema escuro  |
| **Leaflet**         | 1.9    | Biblioteca de mapas interativos         |
| **React-Leaflet**   | 5      | Integração declarativa do Leaflet c/ React |
| **React Context**   | 19     | Gerenciamento de estado global          |

> 🔑 **Nenhuma chave de API externa é necessária.** O mapa utiliza tiles gratuitos do **OpenStreetMap**.

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

---

## 🧪 Como o protótipo foi construído

- **Estado global**: centralizado no `AppContext` usando `createContext` + `useContext`, eliminando _prop drilling_.
- **Boot sequence**: `setTimeout` encadeados (1s, 2s, 3s) no Provider; barra de progresso e mensagens atualizadas via estado.
- **Mapa**: `react-leaflet` v5 com `MapContainer`, `TileLayer` (OpenStreetMap), `Polygon` e `Popup`. O `MapController` usa o hook `useMap()` para chamar `flyTo()` automaticamente quando a região muda.
- **Gráfico de deslocamento**: SVG desenhado manualmente com `<polyline>`, `<polygon>` (gradiente de área) e `<circle>` para os pontos de dados.
- **Estilização**: 100% Tailwind CSS com tema escuro `bg-slate-950`. Animações customizadas via `@keyframes` no `index.css` (`pulse-glow`, `flash-danger`, `fade-in-up`, `slide-in-right`).
- **Modal**: componente reutilizável com fechamento via ESC e clique no backdrop.

---

## 👥 Desenvolvido por

| Nome                               | RM     | Turma |
| ---------------------------------- | ------ | ----- |
| _Seu nome aqui_                    | RM0000 |       |
| _Nome do colega_                   | RM0000 |       |
| _Nome do colega_                   | RM0000 |       |

**FIAP — Faculdade de Informática e Administração Paulista**  
**Global Solution — Space Connect**  
**2026**

---

## 📄 Licença

Este projeto é de caráter educacional e acadêmico, desenvolvido para fins de apresentação na FIAP Global Solution.
#   g e o o r b i t - a i  
 
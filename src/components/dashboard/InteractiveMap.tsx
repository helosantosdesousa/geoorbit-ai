import { MapContainer, TileLayer, Polygon, Popup, useMap } from "react-leaflet";
import { useApp } from "../../context/AppContext";
import { regioesCoords, poligonosProspeccao, poligonosSeguranca } from "../../context/data";

function MapController() {
  const { regiao } = useApp();
  const map = useMap();
  map.flyTo(regioesCoords[regiao], 10, { duration: 1.2 });
  return null;
}

export default function InteractiveMap({ onDamClick }: { onDamClick: (d: { nome: string; deslocamento: number }) => void }) {
  const { regiao, modo } = useApp();
  const isProspeccao = modo === "prospeccao";
  const isSeguranca = modo === "seguranca";

  return (
    <div className="flex-1 relative">
      <MapContainer center={regioesCoords[regiao]} zoom={10} className="h-full w-full" zoomControl={true} style={{ background: "#0f172a" }}>
        <MapController />
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {isProspeccao && poligonosProspeccao[regiao]?.map((p, i) => (
          <Polygon key={`pros-${i}`} positions={p.coords} pathOptions={{ color: "#22d3ee", fillColor: "#22d3ee", fillOpacity: 0.08, weight: 1.5 }}>
            <Popup>
              <div className="text-xs space-y-1" style={{ minWidth: 160 }}>
                <div className="text-cyan-400 font-bold text-sm">{p.label}</div>
                <div className="text-slate-400 pt-1">
                  <div>Minério: <span className="text-slate-200">{p.minerio}</span></div>
                  <div>Teor: <span className="text-slate-200">{p.teor}</span></div>
                  <div>Prof.: <span className="text-slate-200">{p.profundidade}</span></div>
                </div>
                <div className="flex gap-1 pt-2">
                  <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">Resistividade: 2.4 kΩ·m</span>
                  <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">Mag.: 4.7 nT</span>
                </div>
              </div>
            </Popup>
          </Polygon>
        ))}

        {isSeguranca && poligonosSeguranca[regiao]?.map((d, i) => (
          <Polygon
            key={`seg-${i}`}
            positions={d.coords}
            eventHandlers={{ click: () => onDamClick(d) }}
            pathOptions={{ color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.06, weight: 1.5, dashArray: "8 4" }}
          >
            <Popup>
              <div className="text-xs" style={{ minWidth: 160 }}>
                <div className="text-red-400 font-bold text-sm mb-1">{d.nome}</div>
                <div className="text-slate-400">Status: <span className="text-red-400 animate-flash-danger">{d.risco}</span></div>
                <div className="text-slate-400">Deslocamento: <span className="text-red-400">{d.deslocamento} mm</span></div>
                <div className="text-[9px] text-slate-500 mt-1">Clique para detalhes</div>
              </div>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapClickHandler({ onMapClick }) {
  useMapEvents({ click: e => onMapClick(e.latlng) });
  return null;
}

function MapController({ flyToPosition }) {
  const map = useMap();
  useEffect(() => {
    if (flyToPosition) {
      map.flyTo(flyToPosition, 16, { animate: true, duration: 1.5 });
    }
  }, [flyToPosition, map]);
  return null;
}

function DarkModeEffect({ darkMode }) {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    if (darkMode) container.classList.add('dark-mode');
    else container.classList.remove('dark-mode');
  }, [darkMode, map]);
  return null;
}

function ThemeControl({ darkMode, setDarkMode }) {
  const map = useMap();
  useEffect(() => {
    const control = L.control({ position: 'topright' });
    control.onAdd = () => {
      const btn = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      Object.assign(btn.style, {
        background: '#BD5E55',
        color: '#FFF',
        padding: '10px 16px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        borderRadius: '4px'
      });
      btn.innerHTML = darkMode ? 'Mapa Claro' : 'Mapa Escuro';
      btn.title = darkMode
        ? 'Clique para tema claro'
        : 'Clique para tema escuro';
      btn.onclick = () => setDarkMode(d => !d);
      return btn;
    };
    control.addTo(map);
    return () => control.remove();
  }, [map, darkMode, setDarkMode]);
  return null;
}
export default function MapDisplay({
  areas,
  onMapClick,
  selectedPosition,
  flyToPosition
}) {
  const initialPosition = [-23.4253, -51.9386];
  const [darkMode, setDarkMode] = useState(true);

  const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      className="h-full w-full"
    >
      <DarkModeEffect darkMode={darkMode} />
      <ThemeControl darkMode={darkMode} setDarkMode={setDarkMode} />

      <TileLayer
        url={osmUrl}
        attribution="&copy; OpenStreetMap contributors"
      />

      <MapClickHandler onMapClick={onMapClick} />

      {areas.map(area => (
        <Marker key={area.id} position={[area.latitude, area.longitude]}>
          <Popup>
            <strong>{area.nome}</strong><br />
            {area.descricao}
          </Popup>
        </Marker>
      ))}

      {selectedPosition && (
        <Marker position={selectedPosition}>
          <Popup>Nova Área de Risco</Popup>
        </Marker>
      )}

      <MapController flyToPosition={flyToPosition} />
    </MapContainer>
  );
}

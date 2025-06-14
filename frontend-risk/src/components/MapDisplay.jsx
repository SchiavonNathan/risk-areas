import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null; 
}

function MapDisplay({ areas, onMapClick, selectedPosition }) {
  const initialPosition = [-23.4253, -51.9386];

  return (
    <MapContainer center={initialPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <MapClickHandler onMapClick={onMapClick} />

      {areas.map(area => (
        <Marker key={area.id} position={[area.latitude, area.longitude]}>
          <Popup>
            <b>{area.nome}</b><br />
            {area.descricao}
          </Popup>
        </Marker>
      ))}

      {selectedPosition && (
        <Marker position={selectedPosition}>
          <Popup>Nova Área de Risco</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapDisplay;
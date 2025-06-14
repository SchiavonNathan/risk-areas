import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapDisplay from './components/MapDisplay';
import AddAreaForm from './components/AddAreaForm';
import './App.css';
import PainelClima from './components/PainelClima';
import ListaAreasRisco from './components/ListaAreasRisco';

function App() {
  const [areas, setAreas] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedArea, setFocusedArea] = useState(null);

  const fetchAreas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/areas-risco');
      setAreas(response.data);
    } catch (error) {
      console.error("Erro ao buscar áreas de risco:", error);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleAreaAdded = (novaArea) => {
    setAreas(prevAreas => [...prevAreas, novaArea]);
    setSelectedPosition(null);
  };

  const handleMapClick = (latlng) => {
    setSelectedPosition(latlng);
    setFocusedArea(null); 
  };

  const filteredAreas = areas.filter(area =>
    area.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (area.descricao && area.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="App">
      <div className="sidebar">
        <h1>Monitor de Áreas de Risco</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <PainelClima />

        <ListaAreasRisco 
          areas={filteredAreas} 
          onAreaSelect={setFocusedArea} 
        />

        <AddAreaForm 
          onAreaAdded={handleAreaAdded} 
          selectedPosition={selectedPosition} 
        />
      </div>
      <div className="map-container">
        <MapDisplay 
          areas={filteredAreas} 
          onMapClick={handleMapClick}
          selectedPosition={selectedPosition}
          flyToPosition={focusedArea ? [focusedArea.latitude, focusedArea.longitude] : null}
        />
      </div>
    </div>
  );
}

export default App;
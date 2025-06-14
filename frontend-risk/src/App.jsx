// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapDisplay from './components/MapDisplay';
import AddAreaForm from './components/AddAreaForm';
import './App.css';
import PainelClima from './components/PainelClima';

function App() {
  const [areas, setAreas] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  // NOVO: Estado para armazenar o termo da busca
  const [searchTerm, setSearchTerm] = useState('');

  // A função fetchAreas continua a mesma
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
  };

  // ATUALIZADO: Lógica de filtragem
  // Filtra as áreas com base no searchTerm antes de passar para o componente do mapa.
  // A filtragem é case-insensitive (não diferencia maiúsculas de minúsculas).
  const filteredAreas = areas.filter(area =>
    area.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (area.descricao && area.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="App">
      <div className="sidebar">
        <h1>Monitor de Áreas de Risco</h1>

        {/* NOVO: Campo de input para a busca */}
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

        <AddAreaForm 
          onAreaAdded={handleAreaAdded} 
          selectedPosition={selectedPosition} 
        />
      </div>
      <div className="map-container">
        {/* ATUALIZADO: Passa a lista JÁ FILTRADA para o MapDisplay */}
        <MapDisplay 
          areas={filteredAreas} 
          onMapClick={handleMapClick}
          selectedPosition={selectedPosition}
        />
      </div>
    </div>
  );
}

export default App;
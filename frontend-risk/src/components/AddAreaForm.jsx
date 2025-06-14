import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

function AddAreaForm({ onAreaAdded, selectedPosition }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    if (selectedPosition) {
      setLatitude(selectedPosition.lat.toFixed(6));
      setLongitude(selectedPosition.lng.toFixed(6));
    }
  }, [selectedPosition]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !latitude || !longitude) {
        alert("Nome, Latitude e Longitude são obrigatórios!");
        return;
    }
    const novaArea = {
      nome,
      descricao,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
    try {
      const response = await axios.post('http://localhost:8080/api/areas-risco', novaArea);
      onAreaAdded(response.data);
      setNome('');
      setDescricao('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.error("Erro ao adicionar área de risco:", error);
      alert("Falha ao adicionar área. Verifique o console para mais detalhes.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Adicionar Nova Área de Risco</h3>
      <p style={{fontSize: '0.8rem', color: '#666'}}>Clique no mapa para preencher a Latitude e Longitude.</p>
      <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da Área" required />
      <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />
      <input type="number" step="any" value={latitude} onChange={e => setLatitude(e.target.value)} placeholder="Latitude" required />
      <input type="number" step="any" value={longitude} onChange={e => setLongitude(e.target.value)} placeholder="Longitude" required />
      <button type="submit">Adicionar Área</button>
    </form>
  );
}

export default AddAreaForm;
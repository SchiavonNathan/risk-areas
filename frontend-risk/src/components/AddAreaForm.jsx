import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="text-2xl font-semibold text-coral flex items-center gap-2">
        <FontAwesomeIcon icon="plus" /> Nova Área de Risco
      </h3>
      <input
        type="text"
        placeholder="Nome da Área"
        className="w-full px-4 py-2 bg-slate text-light rounded-lg focus:ring-2 focus:ring-coral"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <textarea
        placeholder="Descrição (opcional)"
        className="w-full px-4 py-2 bg-slate text-light rounded-lg focus:ring-2 focus:ring-coral"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number" step="any"
          placeholder="Latitude"
          className="px-4 py-2 bg-slate text-light rounded-lg focus:ring-2 focus:ring-coral"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
        />
        <input
          type="number" step="any"
          placeholder="Longitude"
          className="px-4 py-2 bg-slate text-light rounded-lg focus:ring-2 focus:ring-coral"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-coral font-bold rounded-lg hover:bg-dusty transition"
      >
        Adicionar
      </button>
    </form>
  )
}

export default AddAreaForm;
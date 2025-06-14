import React from 'react';
import './ListaAreasRisco.css';

function ListaAreasRisco({ areas, onAreaSelect }) {
  if (areas.length === 0) {
    return <p className="lista-vazia">Nenhuma área de risco encontrada.</p>;
  }

  return (
    <div className="lista-areas-container">
      <h4>Áreas Cadastradas ({areas.length})</h4>
      <ul className="lista-areas-scroll">
        {areas.map(area => (
          <li 
            key={area.id} 
            className="area-item"
            onClick={() => onAreaSelect(area)}
          >
            <strong>{area.nome}</strong>
            <p>{area.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaAreasRisco;
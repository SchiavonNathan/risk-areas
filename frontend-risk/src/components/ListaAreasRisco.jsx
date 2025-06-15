import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ListaAreasRisco({ areas, onAreaSelect }) {
  if (!areas.length) {
    return <p className="text-center text-light/70 py-6">Nenhuma área de risco.</p>
  }
  return (
    <div className="mt-8">
      <h4 className="text-xl text-coral mb-3 flex items-center gap-2">
        <FontAwesomeIcon icon="map-marker-alt" /> Áreas Cadastradas ({areas.length})
      </h4>
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {areas.map(area => (
          <li
            key={area.id}
            onClick={() => onAreaSelect(area)}
            className="p-4 bg-slate rounded-lg hover:bg-slate/90 cursor-pointer transition"
          >
            <strong className="block text-light">{area.nome}</strong>
            {area.descricao && (
              <p className="text-light/80 text-sm">{area.descricao}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

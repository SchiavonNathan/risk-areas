import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapDisplay from './components/MapDisplay'
import AddAreaForm from './components/AddAreaForm'
import ListaAreasRisco from './components/ListaAreasRisco'
import PainelClima from './components/PainelClima'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function App() {
  const [areas, setAreas] = useState([])
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [focusedArea, setFocusedArea] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8080/api/areas-risco')
      .then(r => setAreas(r.data))
      .catch(console.error)
  }, [])

  const filtered = areas.filter(a =>
    a.nome.toLowerCase().includes(searchTerm) ||
    (a.descricao && a.descricao.toLowerCase().includes(searchTerm))
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-80 h-screen p-6 bg-dark/90 backdrop-blur-lg shadow-xl flex flex-col overflow-y-auto">
        <h1 className="text-3xl font-bold text-coral mb-6 flex items-center gap-2 flex-shrink-0">
          <FontAwesomeIcon icon="map-marker-alt" />Areas de Risco
        </h1>

        <div className="relative mb-6 flex-shrink-0">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-2 rounded-lg bg-slate text-light focus:ring-2 focus:ring-coral"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon
            icon="search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-light/70"
          />
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <PainelClima />
          <ListaAreasRisco areas={filtered} onAreaSelect={setFocusedArea} />
          <AddAreaForm
            onAreaAdded={a => setAreas([...areas, a])}
            selectedPosition={selectedPosition}
          />
        </div>
      </aside>

      <main className="flex-1">
        <MapDisplay
          areas={filtered}
          onMapClick={setSelectedPosition}
          selectedPosition={selectedPosition}
          flyToPosition={
            focusedArea && [focusedArea.latitude, focusedArea.longitude]
          }
        />
      </main>
    </div>
  )
}

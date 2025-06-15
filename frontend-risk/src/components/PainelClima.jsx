import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CIDADES_IBGE = {
    'Belo Horizonte': '3106200',
    'Campinas': '3509502',
    'Rio de Janeiro': '3304557',
    'São Paulo': '3550308',
    'Vitória': '3205309',

    'Cascavel': '4104808',
    'Curitiba': '4106902',
    'Florianópolis': '4205407',
    'Londrina': '4113700',
    'Maringá': '4115200',
    'Porto Alegre': '4314902',

    'Brasília': '5300108',
    'Campo Grande': '5002704',
    'Cuiabá': '5103403',
    'Goiânia': '5208707',

    'Aracaju': '2800308',
    'Fortaleza': '2304400',
    'João Pessoa': '2507507',
    'Maceió': '2704302',
    'Natal': '2408102',
    'Recife': '2611606',
    'Salvador': '2927408',
    'São Luís': '2111300',
    'Teresina': '2211001',
    
    'Belém': '1501402',
    'Boa Vista': '1400100',
    'Macapá': '1600303',
    'Manaus': '1302603',
    'Palmas': '1721000',
    'Porto Velho': '1100205',
    'Rio Branco': '1200401'
};
export default function PainelClima() {
  const [cidade, setCidade] = useState('Maringá');
  const [alertas, setAlertas] = useState([]);
  const [previsao, setPrevisao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cod = CIDADES_IBGE[cidade];
    if (!cod) return;

    setLoading(true);
    Promise.all([
      axios.get(`http://localhost:8080/api/clima/alertas/${cod}`),
      axios.get(`http://localhost:8080/api/clima/previsao/${cidade}`)
    ])
      .then(([resA, resP]) => {
        setAlertas(resA.data);
        setPrevisao(resP.data);
      })
      .catch(err => console.error("Erro ao buscar clima:", err))
      .finally(() => setLoading(false));
  }, [cidade]);

  return (
    <div className="p-4 bg-slate rounded-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-2xl font-semibold text-light">
          <FontAwesomeIcon icon="cloud" />
          <select
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            className="bg-dark text-light px-3 py-1 rounded-lg focus:ring-2 focus:ring-coral"
          >
            {Object.keys(CIDADES_IBGE).map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-light/70 mb-4">Carregando dados...</p>
      ) : (
        previsao && (
          <div className="flex items-center gap-4 mb-6">
            <img
              src={`https://openweathermap.org/img/wn/${previsao.icone}@2x.png`}
              alt={previsao.condicao}
              className="w-16 h-16"
            />
            <div>
              <div className="text-4xl font-bold text-light">
                {Math.round(previsao.temperatura)}°C
              </div>
              <div className="capitalize text-blue-300">{previsao.condicao}</div>
              <div className="text-sm text-red-100 mt-1">
                Umidade: {previsao.umidade}% &nbsp;|&nbsp; Vento: {previsao.velocidadeVento} m/s
              </div>
            </div>
          </div>
        )
      )}

      <h4 className="flex items-center gap-2 text-xl text-blue-300 mb-3">
        <FontAwesomeIcon icon="exclamation-triangle" /> Alertas Ativos
      </h4>
      {loading ? (
        <p className="text-light/70">Carregando alertas...</p>
      ) : alertas.length > 0 ? (
        alertas.map((a, i) => (
          <div
            key={i}
            className={`
              p-3 mb-2 rounded-lg border-l-4
              ${a.severidade === 'Grande Perigo' ? 'bg-red-800/20 border-red-600' :
                a.severidade === 'Perigo' ? 'bg-orange-800/20 border-orange-600' :
                  'bg-yellow-800/20 border-yellow-600'}
            `}
          >
            <strong className="block text-light">{a.severidade}</strong>
            <p className="text-light/80 text-sm">{a.aviso}</p>
          </div>
        ))
      ) : (
        <p className="text-light/70">Sem alertas ativos.</p>
      )}
    </div>
  );
}
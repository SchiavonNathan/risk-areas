// src/components/AlertasClimaticos.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PainelClima.css';

// Mapeamento de algumas cidades para código IBGE. Em uma app real, isso viria de um DB ou outra API.
const CIDADES_IBGE = {
    // Sudeste
    'Belo Horizonte': '3106200',
    'Campinas': '3509502',
    'Rio de Janeiro': '3304557',
    'São Paulo': '3550308',
    'Vitória': '3205309',

    // Sul
    'Cascavel': '4104808',
    'Curitiba': '4106902',
    'Florianópolis': '4205407',
    'Londrina': '4113700',
    'Maringá': '4115200',
    'Porto Alegre': '4314902',

    // Centro-Oeste
    'Brasília': '5300108',
    'Campo Grande': '5002704',
    'Cuiabá': '5103403',
    'Goiânia': '5208707',

    // Nordeste
    'Aracaju': '2800308',
    'Fortaleza': '2304400',
    'João Pessoa': '2507507',
    'Maceió': '2704302',
    'Natal': '2408102',
    'Recife': '2611606',
    'Salvador': '2927408',
    'São Luís': '2111300',
    'Teresina': '2211001',
    
    // Norte
    'Belém': '1501402',
    'Boa Vista': '1400100',
    'Macapá': '1600303',
    'Manaus': '1302603',
    'Palmas': '1721000',
    'Porto Velho': '1100205',
    'Rio Branco': '1200401'
};

function PainelClima() {
  const [cidadeSelecionada, setCidadeSelecionada] = useState('Maringá');
  
  // Estados para os alertas
  const [alertas, setAlertas] = useState([]);
  const [loadingAlertas, setLoadingAlertas] = useState(true);

  // NOVO: Estados para a previsão do tempo
  const [previsao, setPrevisao] = useState(null);
  const [loadingPrevisao, setLoadingPrevisao] = useState(true);

  useEffect(() => {
    const codigoIbge = CIDADES_IBGE[cidadeSelecionada];
    if (!codigoIbge) return;

    // Reseta os estados ao trocar de cidade
    setLoadingAlertas(true);
    setLoadingPrevisao(true);
    
    // Busca os alertas (código anterior)
    const fetchAlertas = axios.get(`http://localhost:8080/api/clima/alertas/${codigoIbge}`);
    
    // NOVO: Busca a previsão do tempo
    const fetchPrevisao = axios.get(`http://localhost:8080/api/clima/previsao/${cidadeSelecionada}`);

    // Executa as duas chamadas em paralelo para mais eficiência
    Promise.all([fetchAlertas, fetchPrevisao])
      .then(responses => {
        setAlertas(responses[0].data);
        setPrevisao(responses[1].data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados climáticos:", error);
      })
      .finally(() => {
        setLoadingAlertas(false);
        setLoadingPrevisao(false);
      });

  }, [cidadeSelecionada]);

  return (
    <div className="painel-clima-container">
      <h3>Condições em {cidadeSelecionada}</h3>
      <select value={cidadeSelecionada} onChange={e => setCidadeSelecionada(e.target.value)}>
        {Object.keys(CIDADES_IBGE).map(cidade => (
          <option key={cidade} value={cidade}>{cidade}</option>
        ))}
      </select>
      
      {/* NOVO: Seção para Previsão Atual */}
      <div className="previsao-atual-container">
        {loadingPrevisao ? <p>Carregando previsão...</p> : previsao  && (
          <div className="previsao-grid">
            <img 
              src={`https://openweathermap.org/img/wn/${previsao.icone}@2x.png`} 
              alt={previsao.condicao} 
              className="weather-icon"
            />
            <div className="temperatura">{Math.round(previsao.temperatura)}°C</div>
            <div className="condicao">{previsao.condicao}</div>
            <div className="detalhes">
              <span>Umidade: {previsao.umidade}%</span>
              <span>Vento: {previsao.velocidadeVento} m/s</span>
            </div>
          </div>
        )}
      </div>

      {/* Seção para Alertas Climáticos (código anterior adaptado) */}
      <div className="alertas-container">
        <h4>Alertas Ativos</h4>
        {loadingAlertas ? <p>Carregando alertas...</p> : alertas.length > 0 ? (
          <ul className="alertas-list">
            {alertas.map((alerta, index) => (
              <li key={index} className={`alerta-item severidade-${alerta.severidade.toLowerCase().replace(/ /g, '-')}`}>
                <strong>{alerta.severidade}</strong>
                <p>{alerta.aviso}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Sem alertas ativos.</p>
        )}
      </div>
    </div>
  );
}

export default PainelClima;
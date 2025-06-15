🛡️ Monitor de Áreas de Risco
<img alt="Versão" src="https://img.shields.io/badge/versão-1.0.0-blue">
<img alt="Status" src="https://img.shields.io/badge/status-em desenvolvimento-yellow">
Uma aplicação web moderna para monitoramento, identificação e gerenciamento de áreas de risco geográfico, com mapeamento interativo e acompanhamento de condições climáticas em tempo real.

<img alt="Captura de tela do projeto" src="https://via.placeholder.com/800x400?text=Monitor+de+Areas+de+Risco">
📋 Índice
Visão Geral
Funcionalidades
Tecnologias
Instalação
Como Usar
Estrutura do Projeto
API
Contribuição
Licença
🔍 Visão Geral
O Monitor de Áreas de Risco é uma solução completa para identificação, registro e acompanhamento de regiões com potencial de riscos ambientais, estruturais, de inundação e outros. A plataforma permite o gerenciamento geográfico dessas áreas com visualização em mapa interativo, além de fornecer dados climáticos relevantes para análise de riscos.

✨ Funcionalidades
Mapeamento Interativo: Visualização de áreas de risco em mapa geográfico
Cadastro de Áreas: Adição de novas áreas com localização precisa
Categorização de Riscos: Classificação por tipo (inundação, deslizamento, incêndio, etc.)
Níveis de Severidade: Classificação por gravidade (baixo, médio, alto)
Monitoramento Climático: Painel integrado com dados meteorológicos atualizados
Sistema de Busca: Filtro avançado por nome, descrição ou tipo de risco
Interface Responsiva: Adaptação para diferentes dispositivos e tamanhos de tela
🚀 Tecnologias
Frontend:
React.js
Leaflet (para mapas interativos)
Axios
Tailwind
Backend:
Spring Boot
JPA / Hibernate
RESTful API
Serviços Externos:
API de Clima (integração para dados meteorológicos)
💻 Instalação
Pré-requisitos
Node.js (v14+)
npm ou yarn
Java 11+
Maven

Passos para instalação

Clone o repositório:
git clone https://github.com/schiavonnathan/risk-areas.git
cd risk-areas

Instale as dependências do frontend:
cd frontend
npm install

Configure o backend:
cd ../backend-riks
mvn install

Inicie o backend:
mvn spring-boot:run

Inicie o frontend:
cd ../frontend-risk
npm start

Acesse no navegador:
http://localhost:3000

📝 Como Usar
Visualizando áreas de risco
O mapa interativo exibe todas as áreas cadastradas com marcadores coloridos de acordo com o nível de risco. Clique em qualquer marcador para ver detalhes completos.

Adicionando nova área
Clique no mapa no local desejado
Preencha o formulário com:
Nome da área
Tipo de risco
Nível de severidade
Descrição detalhada
Clique em "Cadastrar" para salvar
Buscando áreas
Utilize o campo de busca no topo da barra lateral para filtrar áreas por nome, descrição ou tipo de risco.

Consultando dados climáticos
O painel climático na barra lateral fornece informações atualizadas sobre condições meteorológicas na região visualizada.

📁 Estrutura do Projeto
🔌 API
Endpoints
Método	Endpoint	Descrição
GET	/api/areas-risco	Lista todas as áreas de risco
GET	/api/areas-risco/{id}	Recupera uma área específica
POST	/api/areas-risco	Adiciona nova área de risco
PUT	/api/areas-risco/{id}	Atualiza informações de área
DELETE	/api/areas-risco/{id}	Remove área de risco


# 🛡️ Monitor de Áreas de Risco

![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Uma aplicação web moderna para monitoramento, identificação e gerenciamento de áreas de risco geográfico, com mapeamento interativo e acompanhamento de condições climáticas em tempo real.

---

## 📋 Índice

- [🔍 Visão Geral](#-visão-geral)
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Tecnologias](#-tecnologias)
- [💻 Instalação](#-instalação)
- [📝 Como Usar](#-como-usar)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔌 API](#-api)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## 🔍 Visão Geral

O **Monitor de Áreas de Risco** é uma solução completa para identificação, registro e acompanhamento de regiões com potencial de riscos ambientais, estruturais, de inundação e outros. A plataforma permite o gerenciamento geográfico dessas áreas com visualização em mapa interativo, além de fornecer dados climáticos relevantes para análise de riscos.

---

## ✨ Funcionalidades

- **Mapeamento Interativo**: Visualização de áreas de risco em mapa geográfico.
- **Cadastro de Áreas**: Adição de novas áreas com localização precisa.
- **Categorização de Riscos**: Classificação por tipo (inundação, deslizamento, incêndio, etc.).
- **Níveis de Severidade**: Classificação por gravidade (baixo, médio, alto).
- **Monitoramento Climático**: Painel integrado com dados meteorológicos atualizados.
- **Sistema de Busca**: Filtro avançado por nome, descrição ou tipo de risco.
- **Interface Responsiva**: Adaptação para diferentes dispositivos e tamanhos de tela.

---

## 🚀 Tecnologias

### Frontend

- React.js  
- Leaflet (para mapas interativos)  
- Axios  
- TailwindCSS  

### Backend

- Spring Boot  
- JPA / Hibernate  
- RESTful API  

### Serviços Externos

- API de Clima (integração para dados meteorológicos)

---

## 💻 Instalação

### Pré-requisitos

- Node.js (v14+)
- npm ou yarn
- Java 11+
- Maven

### Passos para instalação

```bash
# Clone o repositório
git clone https://github.com/schiavonnathan/risk-areas.git
cd risk-areas

# Instale as dependências do frontend
cd frontend
npm install

# Configure o backend
cd ../backend-risk
mvn install

# Inicie o backend
mvn spring-boot:run

# Inicie o frontend
cd ../frontend-risk
npm start
```

Acesse a aplicação em:  
[http://localhost:3000](http://localhost:3000)

---

## 📝 Como Usar

### Visualizando áreas de risco

- O mapa interativo exibe todas as áreas cadastradas com marcadores coloridos de acordo com o nível de risco.
- Clique em qualquer marcador para ver detalhes completos.

### Adicionando nova área

1. Clique no mapa no local desejado.
2. Preencha o formulário com:
   - Nome da área
   - Tipo de risco
   - Nível de severidade
   - Descrição detalhada
3. Clique em **"Cadastrar"** para salvar.

### Buscando áreas

- Utilize o campo de busca no topo da barra lateral para filtrar áreas por nome, descrição ou tipo de risco.

### Consultando dados climáticos

- O painel climático na barra lateral fornece informações atualizadas sobre condições meteorológicas na região visualizada.

---

## 📁 Estrutura do Projeto

```text
risk-areas/
├── backend-risk/
│   └── ... (código Spring Boot)
├── frontend-risk/
│   └── ... (código React)
└── README.md
```

---

## 🔌 API

### Endpoints

| Método | Endpoint                | Descrição                        |
|--------|-------------------------|----------------------------------|
| GET    | `/api/areas-risco`      | Lista todas as áreas de risco    |
| GET    | `/api/areas-risco/{id}` | Recupera uma área específica     |
| POST   | `/api/areas-risco`      | Adiciona nova área de risco      |
| PUT    | `/api/areas-risco/{id}` | Atualiza informações de área     |
| DELETE | `/api/areas-risco/{id}` | Remove área de risco             |

---

## 🤝 Contribuição

Contribuições são bem-vindas!  
Sinta-se livre para abrir uma *issue* ou enviar um *pull request*.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

package com.riskareas.risk.service;

import com.riskareas.risk.dto.inmet.PrevisaoTempoDTO;
import com.riskareas.risk.dto.inmet.AlertaInmetDTO;
import com.riskareas.risk.dto.inmet.OpenWeatherMapResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value; // Importe @Value
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ClimaService {

    // NOVO: Adiciona um logger para diagnóstico. É a forma padrão de registrar eventos no Spring.
    private static final Logger logger = LoggerFactory.getLogger(ClimaService.class);

    private final String INMET_API_URL = "https://apiprevmet.inmet.gov.br/avisos/ativos";

    private final String OWM_API_URL = "https://api.openweathermap.org/data/2.5/weather";
    @Value("${openweathermap.api.key}")
    private String openWeatherMapApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<AlertaInmetDTO> buscarAlertasPorCodigoCidade(String codigoCidade) {

        AlertaInmetDTO[] todosAlertas;

        try {
            // Envolve a chamada de rede em um bloco try-catch
            todosAlertas = restTemplate.getForObject(INMET_API_URL, AlertaInmetDTO[].class);
            logger.info("Sucesso ao buscar {} alertas da API do INMET.", todosAlertas != null ? todosAlertas.length : 0);

        } catch (RestClientException e) {
            // Se a API falhar (fora do ar, erro 4xx/5xx, etc.), captura o erro
            logger.error("Erro ao chamar a API do INMET: {}", e.getMessage());
            // Retorna uma lista vazia em vez de deixar a aplicação quebrar
            return Collections.emptyList();
        }

        if (todosAlertas == null || todosAlertas.length == 0) {
            return Collections.emptyList();
        }

        // Filtro mais seguro para evitar NullPointerException
        return Arrays.stream(todosAlertas)
                .filter(Objects::nonNull) // Garante que o objeto 'alerta' não é nulo
                .filter(alerta -> alerta.getCidades() != null) // Garante que a lista de cidades não é nula
                .filter(alerta -> alerta.getCidades().stream()
                        .filter(Objects::nonNull) // Garante que o objeto 'cidade' na lista não é nulo
                        // Garante que o código IBGE não é nulo antes de comparar
                        .anyMatch(cidade -> codigoCidade.equals(cidade.getCodigoIbge())))
                .collect(Collectors.toList());
    }

    public PrevisaoTempoDTO buscarPrevisaoAtual(String cidade) {
        // Monta a URL com os parâmetros necessários
        String url = String.format("%s?q=%s&appid=%s&units=metric&lang=pt_br",
                OWM_API_URL, cidade, openWeatherMapApiKey);

        try {
            OpenWeatherMapResponseDTO response = restTemplate.getForObject(url, OpenWeatherMapResponseDTO.class);
            logger.info("Previsão do tempo para {} buscada com sucesso.", cidade);

            // Converte a resposta complexa da API em nosso DTO simples
            return converterParaPrevisaoDTO(response);

        } catch (RestClientException e) {
            logger.error("Erro ao chamar a API do OpenWeatherMap para a cidade {}: {}", cidade, e.getMessage());
            return null; // Retorna nulo em caso de erro
        }
    }

    // NOVO: Método auxiliar para conversão
    private PrevisaoTempoDTO converterParaPrevisaoDTO(OpenWeatherMapResponseDTO response) {
        if (response == null || response.getMain() == null || response.getWeather() == null || response.getWeather().isEmpty()) {
            return null;
        }

        return PrevisaoTempoDTO.builder()
                .temperatura(response.getMain().getTemp())
                .umidade(response.getMain().getHumidity())
                .condicao(response.getWeather().get(0).getDescription())
                .icone(response.getWeather().get(0).getIcon())
                .velocidadeVento(response.getWind().getSpeed())
                .build();
    }
}
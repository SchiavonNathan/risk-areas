package com.riskareas.risk.dto.inmet;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true) // Ignora campos que não mapeamos
public class AlertaInmetDTO {
    @JsonProperty("aviso")
    private String aviso;

    @JsonProperty("severidade")
    private String severidade;

    @JsonProperty("cidades")
    private List<CidadeInmetDTO> cidades;
}


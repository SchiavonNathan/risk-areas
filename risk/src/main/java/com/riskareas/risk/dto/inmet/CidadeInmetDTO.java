// CidadeInmetDTO.java
package com.riskareas.risk.dto.inmet;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CidadeInmetDTO {
    @JsonProperty("nome")
    private String nome;

    @JsonProperty("cod_ibge")
    private String codigoIbge;
}
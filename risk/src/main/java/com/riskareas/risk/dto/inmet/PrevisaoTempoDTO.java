// Crie este DTO em um pacote mais geral, ex: dto
package com.riskareas.risk.dto.inmet;

import lombok.Builder;
import lombok.Data;

@Data
@Builder // Usaremos o Builder para facilitar a construção do objeto
public class PrevisaoTempoDTO {
    private Double temperatura;
    private String condicao; // ex: "céu limpo"
    private String icone; // ex: "01d"
    private Integer umidade;
    private Double velocidadeVento; // em m/s
}
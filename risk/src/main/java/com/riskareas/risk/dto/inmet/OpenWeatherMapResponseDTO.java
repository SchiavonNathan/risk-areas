// Crie este DTO em um subpacote, ex: dto/openweathermap
package com.riskareas.risk.dto.inmet;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenWeatherMapResponseDTO {
    private Main main;
    private List<Weather> weather;
    private Wind wind;

    @Data @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Main {
        private Double temp;
        private Integer humidity;
    }

    @Data @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Weather {
        private String description;
        private String icon;
    }

    @Data @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Wind {
        private Double speed;
    }
}
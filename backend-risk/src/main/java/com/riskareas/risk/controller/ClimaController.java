package com.riskareas.risk.controller;

import com.riskareas.risk.dto.inmet.AlertaInmetDTO;
import com.riskareas.risk.dto.inmet.PrevisaoTempoDTO;
import com.riskareas.risk.service.ClimaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clima")
@CrossOrigin(origins = "http://localhost:3000") // Lembre-se do CORS
public class ClimaController {

    @Autowired
    private ClimaService climaService;

    @GetMapping("/alertas/{codigoCidade}")
    public ResponseEntity<List<AlertaInmetDTO>> getAlertasPorCidade(@PathVariable String codigoCidade) {
        try {
            List<AlertaInmetDTO> alertas = climaService.buscarAlertasPorCodigoCidade(codigoCidade);
            return ResponseEntity.ok(alertas);
        } catch (Exception e) {
            // Log do erro aqui
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/previsao/{cidade}")
    public ResponseEntity<PrevisaoTempoDTO> getPrevisaoPorCidade(@PathVariable String cidade) {
        PrevisaoTempoDTO previsao = climaService.buscarPrevisaoAtual(cidade);
        if (previsao != null) {
            return ResponseEntity.ok(previsao);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
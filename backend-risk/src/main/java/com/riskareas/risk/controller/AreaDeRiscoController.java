package com.riskareas.risk.controller;

import com.riskareas.risk.entity.AreaDeRisco;
import com.riskareas.risk.service.AreaDeRiscoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;

@RestController
@RequestMapping("/api/areas-risco")
@CrossOrigin(origins = "http://localhost:3000")
public class AreaDeRiscoController {

    @Autowired
    private AreaDeRiscoService areaDeRiscoService;

    // Create - POST /api/areas-risco
    @PostMapping
    public AreaDeRisco criarArea(@RequestBody AreaDeRisco areaDeRisco) {
        return areaDeRiscoService.criarArea(areaDeRisco);
    }

    // Read - GET /api/areas-risco
    @GetMapping
    public List<AreaDeRisco> listarTodas() {
        return areaDeRiscoService.listarTodas();
    }

    // Read - GET /api/areas-risco/{id}
    @GetMapping("/{id}")
    public ResponseEntity<AreaDeRisco> buscarPorId(@PathVariable Long id) {
        return areaDeRiscoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update - PUT /api/areas-risco/{id}
    @PutMapping("/{id}")
    public ResponseEntity<AreaDeRisco> atualizarArea(@PathVariable Long id, @RequestBody AreaDeRisco areaDetails) {
        try {
            AreaDeRisco areaAtualizada = areaDeRiscoService.atualizarArea(id, areaDetails);
            return ResponseEntity.ok(areaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete - DELETE /api/areas-risco/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarArea(@PathVariable Long id) {
        try {
            areaDeRiscoService.deletarArea(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
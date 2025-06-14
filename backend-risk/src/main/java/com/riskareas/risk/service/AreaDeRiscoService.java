package com.riskareas.risk.service;

import com.riskareas.risk.entity.AreaDeRisco;
import com.riskareas.risk.repository.AreaDeRiscoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AreaDeRiscoService {

    @Autowired
    private AreaDeRiscoRepository areaDeRiscoRepository;

    // Create
    public AreaDeRisco criarArea(AreaDeRisco areaDeRisco) {
        return areaDeRiscoRepository.save(areaDeRisco);
    }

    // Read
    public List<AreaDeRisco> listarTodas() {
        return areaDeRiscoRepository.findAll();
    }

    public Optional<AreaDeRisco> buscarPorId(Long id) {
        return areaDeRiscoRepository.findById(id);
    }

    // Update
    public AreaDeRisco atualizarArea(Long id, AreaDeRisco areaDetails) {
        return areaDeRiscoRepository.findById(id).map(area -> {
            area.setLatitude(areaDetails.getLatitude());
            area.setLongitude(areaDetails.getLongitude());
            area.setNome(areaDetails.getNome());
            area.setDescricao(areaDetails.getDescricao());
            return areaDeRiscoRepository.save(area);
        }).orElseThrow(() -> new RuntimeException("Área de risco não encontrada com o id " + id));
    }

    // Delete
    public void deletarArea(Long id) {
        if (!areaDeRiscoRepository.existsById(id)) {
            throw new RuntimeException("Área de risco não encontrada com o id " + id);
        }
        areaDeRiscoRepository.deleteById(id);
    }
}
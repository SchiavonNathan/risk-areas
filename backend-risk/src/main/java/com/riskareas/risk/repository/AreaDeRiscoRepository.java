package com.riskareas.risk.repository;


import com.riskareas.risk.entity.AreaDeRisco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaDeRiscoRepository extends JpaRepository<AreaDeRisco, Long> {
}

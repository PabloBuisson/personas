package fr.pablobuisson.personas_backend.repository;

import fr.pablobuisson.personas_backend.model.Persona;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface PersonaRepository extends ListCrudRepository<Persona, UUID> {
    Set<Persona> findByProjectId(Long projectId);

    List<Persona> findTop5ByOrderByCreatedAtDesc();
}

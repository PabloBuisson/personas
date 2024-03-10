package fr.pablobuisson.personas.repository;

import fr.pablobuisson.personas.model.Persona;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PersonaRepository extends ListCrudRepository<Persona, UUID> {
}
package fr.pablobuisson.personas.personas.repository;

import fr.pablobuisson.personas.personas.model.Persona;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends ListCrudRepository<Persona, String> {
}

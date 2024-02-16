package fr.pablobuisson.personas.personas.repository;

import fr.pablobuisson.personas.personas.model.Persona;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends CrudRepository<Persona, String> {
}

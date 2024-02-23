package fr.pablobuisson.personas.personas.repository;

import fr.pablobuisson.personas.personas.model.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
}

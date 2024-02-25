package fr.pablobuisson.personas.personas.repository;

import fr.pablobuisson.personas.personas.model.Tag;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends ListCrudRepository<Tag, Long> {
}

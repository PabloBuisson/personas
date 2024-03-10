package fr.pablobuisson.personas.repository;

import fr.pablobuisson.personas.model.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends ListCrudRepository<Tag, Long> {
    @Query(value = "SELECT t.* FROM tag t JOIN tag_project tp ON t.id = tp.tag_id WHERE tp.project_id = :projectId", nativeQuery = true)
    List<Tag> findTagsByProjectsId(Long projectId);
}

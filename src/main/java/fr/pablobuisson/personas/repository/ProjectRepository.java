package fr.pablobuisson.personas.repository;

import fr.pablobuisson.personas.model.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends ListCrudRepository<Project, Long> {
    @Query("SELECT p FROM ProjectEntity p JOIN p.tags t WHERE t.id = :tagId")
    List<Project> findByTagsIdCustomQuery(Long tagId);

    List<Project> findByTagsId(Long tagId);
}

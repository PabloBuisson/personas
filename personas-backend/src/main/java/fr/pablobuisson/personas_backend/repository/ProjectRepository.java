package fr.pablobuisson.personas_backend.repository;

import fr.pablobuisson.personas_backend.model.Project;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends ListCrudRepository<Project, Long> {
    @Query("SELECT p FROM ProjectEntity p JOIN p.tags t WHERE t.id = :tagId")
    List<Project> findByTagsIdCustomQuery(Long tagId);

    List<Project> findByTagsId(Long tagId);

    Project findByPersonasId(UUID personaId);

    List<Project> findTop5ByOrderByIdDesc();
}

package fr.pablobuisson.personas.personas.service;

import fr.pablobuisson.personas.personas.model.Project;
import fr.pablobuisson.personas.personas.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Data
public class ProjectService {
    private final ProjectRepository projectRepository;

    public Iterable<Project> getAll() {
        return this.projectRepository.findAll();
    }

    public Project getById(Long id) {
        return this.projectRepository.findById(id).orElse(null);
    }

    public Project create(Project project) {
        return this.projectRepository.save(project);
    }

    public void delete(Long id) {
        this.projectRepository.deleteById(id);
    }
}

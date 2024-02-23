package fr.pablobuisson.personas.personas.service;

import fr.pablobuisson.personas.personas.dto.ProjectDto;
import fr.pablobuisson.personas.personas.mapper.ProjectMapper;
import fr.pablobuisson.personas.personas.model.Project;
import fr.pablobuisson.personas.personas.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Data
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public List<ProjectDto> getAll() {
        return this.projectRepository.findAll().stream().map(this.projectMapper::toDto).toList();
    }

    public ProjectDto getById(Long id) {
        return this.projectMapper.toDto(this.projectRepository.findById(id).orElse(null));
    }

    public ProjectDto create(ProjectDto projectDto) {
        Project projectToCreate = this.projectMapper.toEntity(projectDto);
        Project projectSaved = this.projectRepository.save(projectToCreate);
        return this.projectMapper.toDto(projectSaved);
    }

    public void delete(Long id) {
        this.projectRepository.deleteById(id);
    }
}

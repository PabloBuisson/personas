package fr.pablobuisson.personas_backend.service;

import fr.pablobuisson.personas_backend.repository.ProjectRepository;
import fr.pablobuisson.personas_backend.dto.ProjectDto;
import fr.pablobuisson.personas_backend.mapper.ProjectMapper;
import fr.pablobuisson.personas_backend.model.Project;
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

    public List<ProjectDto> getByTagId(Long id) {
        return this.projectRepository.findByTagsId(id).stream().map(this.projectMapper::toDto).toList();
    }

    public ProjectDto getById(Long id) {
        return this.projectMapper.toDto(this.projectRepository.findById(id).orElse(null));
    }

    public ProjectDto create(ProjectDto projectDto) {
        Project projectToCreate = this.projectMapper.toEntity(projectDto);

        if (projectToCreate.getPersonas() != null && !projectToCreate.getPersonas().isEmpty()) {
            projectToCreate.getPersonas().forEach(persona -> persona.setProject(projectToCreate));
        }

        Project projectSaved = this.projectRepository.save(projectToCreate);
        return this.projectMapper.toDto(projectSaved);
    }

    public void delete(Long id) {
        this.projectRepository.deleteById(id);
    }

    public ProjectDto partialUpdate(ProjectDto projectDto, Long id) throws Exception {
        if (id == null) {
            throw new Exception("The id of the project is missing");
        }

        Project projectSaved = this.projectRepository.findById(id).orElseThrow(() -> new Exception("Not found Persona with id = " + id));;
        return this.projectMapper.toDto(this.projectMapper.partialUpdate(projectDto, projectSaved));
    }

    public ProjectDto fullUpdate(ProjectDto projectDto, Long id) {
        Project project = this.projectMapper.toEntity(projectDto);
        // Security to make sure that the id in the url
        // is the same as the entity that we are about to change
        // and to prevent undesired creation (entity without id leads to a creation of an entity)
        project.setId(id);
        Project savedProject = this.projectRepository.save(project);
        return this.projectMapper.toDto(savedProject);
    }

    public boolean existsInDB(Long id) {
        return this.projectRepository.existsById(id);
    }
}

package fr.pablobuisson.personas_backend.service;

import fr.pablobuisson.personas_backend.dto.PersonaDto;
import fr.pablobuisson.personas_backend.dto.ProjectDto;
import fr.pablobuisson.personas_backend.exception.ResourceNotFoundException;
import fr.pablobuisson.personas_backend.mapper.PersonaMapper;
import fr.pablobuisson.personas_backend.model.Persona;
import fr.pablobuisson.personas_backend.model.Project;
import fr.pablobuisson.personas_backend.repository.PersonaRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Getter
@Service
public class PersonaService {

    private final PersonaRepository personaRepository;
    private final PersonaMapper personaMapper;
    private ProjectService projectService;

    PersonaService(PersonaRepository personaRepository, PersonaMapper personaMapper) {
        this.personaRepository = personaRepository;
        this.personaMapper = personaMapper;
    }

    // Avoid circular dependency (PersonaService -> ProjectService -> PersonaService)
    @Autowired
    public void setProjectService(@Lazy ProjectService projectService) {
        this.projectService = projectService;
    }

    public Persona personaDtoToPersonaEntity(PersonaDto personaDto) {
        return personaMapper.toEntity(personaDto);
    }

    public PersonaDto personaEntityToPersonaDto(Persona persona) {
        return personaMapper.toDto(persona);
    }

    public List<PersonaDto> getAll() {
        return this.personaRepository.findAll().stream().map(personaMapper::toDto).toList();
    }

    @Transactional
    public PersonaDto getById(UUID id) throws ResourceNotFoundException {
        Persona persona = this.personaRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona with id " + id + " not found"));

        try {
            Project linkedProject = projectService.getByPersonaId(id);
            persona.setProject(linkedProject);
        } catch (Exception e) {
            // Some personas may not belong to a project
            persona.setProject(null);
        }

        return this.personaMapper.toDto(persona);
    }

    public Persona getEntityById(UUID id) {
        return personaRepository.findById(id).orElse(null);
    }

    public Set<Persona> getByProjectId(Long projectId) {
        return this.personaRepository.findByProjectId(projectId);
    }

    Project getLinkedProject(Long projectId) throws RuntimeException {
        try {
            ProjectDto projectSaved = projectService.getById(projectId);
            return projectService.projectDtoToProjectEntity(projectSaved);
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException("Project with id " + projectId + " not found");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public PersonaDto create(PersonaDto personaDto, Long projectId) {
        Persona persona = this.personaMapper.toEntity(personaDto);

        if (projectId != null) {
            Project projectLinked = getLinkedProject(projectId);
            persona.setProject(projectLinked);
        }

        Persona savedPersona = this.personaRepository.save(persona);
        return this.personaMapper.toDto(savedPersona);
    }

    public void delete(UUID id) {
        this.personaRepository.deleteById(id);
    }

    @Transactional
    public PersonaDto partialUpdate(PersonaDto personaDto, UUID id) throws Exception {
        if (id == null) {
            throw new Exception("The id of the persona is missing");
        }

        Persona personaSaved = personaMapper.toEntity(getById(id));

        if (personaSaved.getProject() != null && personaSaved.getProject().getId() != null) {
            Project project = projectService.projectDtoToProjectEntity(projectService.getById(personaSaved.getProject().getId()));
            // If the persona is not linked to a project anymore
            if (personaDto.project() == null) {
                project.getPersonas().remove(personaSaved);
                projectService.partialUpdate(projectService.projectEntityToProjectDto(project), project.getId());
                personaSaved.setProject(null);
                // If the persona is now linked to a different project ↓
            } else if (!Objects.equals(personaSaved.getProject().getId(), personaDto.project().id())) {
                Project projectLinked = getLinkedProject(personaDto.project().id());
                project.getPersonas().remove(personaSaved);
                projectService.partialUpdate(projectService.projectEntityToProjectDto(project), project.getId());
                personaSaved.setProject(projectLinked);
            }
        }

        return this.personaMapper.toDto(this.personaMapper.partialUpdate(personaDto, personaSaved));
    }

    public PersonaDto fullUpdate(PersonaDto personaDto, UUID id) {
        Persona persona = this.personaMapper.toEntity(personaDto);
        // Security to make sure that the id in the url
        // is the same as the entity that we are about to change
        // and to prevent undesired creation (entity without id leads to a creation of an entity)
        persona.setId(id);
        Persona savedPersona = this.personaRepository.save(persona);
        return this.personaMapper.toDto(savedPersona);
    }

    public boolean existInDB(UUID id) {
        return this.personaRepository.existsById(id);
    }
}

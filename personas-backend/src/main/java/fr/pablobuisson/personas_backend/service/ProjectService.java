package fr.pablobuisson.personas_backend.service;

import fr.pablobuisson.personas_backend.dto.PersonaDto;
import fr.pablobuisson.personas_backend.dto.TagDto;
import fr.pablobuisson.personas_backend.exception.ResourceNotFoundException;
import fr.pablobuisson.personas_backend.model.Persona;
import fr.pablobuisson.personas_backend.model.Tag;
import fr.pablobuisson.personas_backend.repository.ProjectRepository;
import fr.pablobuisson.personas_backend.dto.ProjectDto;
import fr.pablobuisson.personas_backend.mapper.ProjectMapper;
import fr.pablobuisson.personas_backend.model.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Data
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final TagService tagService;
    private final PersonaService personaService;

    public Project projectDtoToProjectEntity(ProjectDto projectDto) {
        return projectMapper.toEntity(projectDto);
    }

    public ProjectDto projectEntityToProjectDto(Project project) {
        return projectMapper.toDto(project);
    }

    public List<ProjectDto> getAll() {
        return this.projectRepository.findAll().stream().map(this.projectMapper::toDto).toList();
    }

    public List<ProjectDto> getLastProjects() {
        return this.projectRepository.findTop5ByOrderByCreatedAtDesc().stream().map(this.projectMapper::toDto).toList();
    }

    public List<ProjectDto> getByTagId(Long id) {
        return this.projectRepository.findByTagsId(id).stream().map(this.projectMapper::toDto).toList();
    }

    public Project getByPersonaId(UUID id) {
        return this.projectRepository.findByPersonasId(id);
    }

    public ProjectDto getById(Long id) throws ResourceNotFoundException {
        return this.projectMapper.toDto(this.projectRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project with id " + id + " not found")));
    }

    @Transactional
    public ProjectDto create(ProjectDto projectDto) throws Exception {
        Project projectToCreate = this.projectMapper.toEntity(projectDto);
        projectToCreate.setCreatedAt(new Date());

        if (projectToCreate.getPersonas() != null && !projectToCreate.getPersonas().isEmpty()) {
            projectToCreate.getPersonas().forEach(persona -> persona.setProject(projectToCreate));
        }

        if (projectToCreate.getTags() != null && !projectToCreate.getTags().isEmpty()) {
            Set<Tag> updatedTags = updateTags(projectToCreate.getTags());
            projectToCreate.setTags(updatedTags);
        }

        Project projectSaved = this.projectRepository.save(projectToCreate);
        return this.projectMapper.toDto(projectSaved);
    }

    // Prevent duplicates and save new tag before attaching it to a project
    Set<Tag> updateTags(Set<Tag> createdTags) {
        Set<Tag> updatedTags = new HashSet<Tag>();
        List<TagDto> savedTags = this.tagService.getAll();

        for (Tag createdTag : createdTags) {
            if (createdTag.getId() != null) {
                TagDto savedTag = savedTags
                        .stream()
                        .filter((tag) -> tag.id().equals(createdTag.getId()))
                        .findAny()
                        .orElseThrow(() -> new ResourceNotFoundException("Tag with id " + createdTag.getId() + " not found"));

                updatedTags.add(tagService.tagDtoToTagEntity(savedTag));
                continue;
            }

            TagDto savedTag = savedTags
                    .stream()
                    .filter((tag) -> tag.label().equals(createdTag.getLabel()))
                    .findAny()
                    .orElse(null);

            if (savedTag != null) {
                updatedTags.add(tagService.tagDtoToTagEntity(savedTag));
            } else {
                TagDto newTag = tagService.create(tagService.tagEntityToTagDto(createdTag));
                updatedTags.add(tagService.tagDtoToTagEntity(newTag));
            }
        }

        return updatedTags;
    }

    // Detach personas that are not in the updated project
    @Transactional
    Set<Persona> updatePersonas(ProjectDto projectUpdated, Project projectSaved) throws Exception {
        Set<Persona> updatedPersonas = new HashSet<>();
        Set<Persona> savedPersonas = personaService.getByProjectId(projectUpdated.id());
        if (savedPersonas != null && ! savedPersonas.isEmpty()) {
            for (Persona personaSaved :  savedPersonas) {
                if (projectUpdated.personas().stream().noneMatch(personaUpdated -> personaUpdated.id().equals(personaSaved.getId()))) {
                    personaSaved.setProject(null);
                    personaService.partialUpdate(personaService.personaEntityToPersonaDto(personaSaved), personaSaved.getId());
                } else {
                    updatedPersonas.add(personaSaved);
                }
            }
        }

        if (projectUpdated.personas() != null && !projectUpdated.personas().isEmpty()) {
            for (PersonaDto personaUpdated : projectUpdated.personas()) {
                // check if the updated persona is already linked to the project
                if (updatedPersonas.stream().anyMatch(persona -> persona.getId().equals(personaUpdated.id()))) {
                    continue;
                }

                Persona persona = personaService.getEntityById(personaUpdated.id());
                if (persona != null) {
                    persona.setProject(projectSaved);
                    updatedPersonas.add(persona);
                } else {
                    throw new ResourceNotFoundException("Persona with id " + personaUpdated.id() + " not found");
                }
            }
        }

        return updatedPersonas;
    }

    @Transactional
    public void delete(Long id) {
        Project project = projectRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id " + id));

        // Delete only orphan tags
        for (Tag tag : project.getTags()) {
            tag.getProjects().remove(project);

            if (tag.getProjects().isEmpty()) {
                tagService.delete(tag.getId());
            }
        }

        for (Persona persona : project.getPersonas()) {
            persona.setProject(null);
        }

        this.projectRepository.deleteById(id);
    }

    @Transactional
    public ProjectDto partialUpdate(ProjectDto projectDto, Long id) throws Exception {
        if (id == null) {
            throw new Exception("The id of the project is missing");
        }

        Project projectSaved = this.projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project with id " + id + " not found"));

        if (projectDto.name() != null) {
            projectSaved.setName(projectDto.name());
        }
        if (projectDto.description() != null) {
            projectSaved.setDescription(projectDto.description());
        }
        if (projectDto.icon() != null) {
            projectSaved.setIcon(projectDto.icon());
        }

        Set<Persona> updatedPersonas = updatePersonas(projectDto, projectSaved);
        projectSaved.getPersonas().clear();
        projectSaved.getPersonas().addAll(updatedPersonas);

        if (projectDto.tags() != null && !projectDto.tags().isEmpty()) {
            Set<Tag> updatedTags = updateTags(projectDto.tags().stream().map(tagService::tagDtoToTagEntity).collect(Collectors.toSet()));
            projectSaved.setTags(updatedTags);
        }

        projectSaved.setUpdatedAt(new Date());

        Project updatedProject = this.projectRepository.save(projectSaved);

        return projectMapper.toDto(updatedProject);
    }

    @Transactional
    public ProjectDto partialUpdateOnProgress(ProjectDto projectDto, Long id) throws Exception {
        if (id == null) {
            throw new Exception("The id of the project is missing");
        }

        Project projectSaved = this.projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project with id " + id + " not found"));
        Project projectUpdated = projectMapper.toEntity(projectDto);

        if (!projectUpdated.getPersonas().isEmpty()) {
            Set<Persona> existingPersonas = new HashSet<>();
            for (Persona persona : projectUpdated.getPersonas()) {
                try {
                    Persona existingPersonaEntity = personaService.personaDtoToPersonaEntity(personaService.getById(persona.getId()));
                    existingPersonaEntity.setProject(projectUpdated);
                    existingPersonas.add(existingPersonaEntity);
                } catch (ResourceNotFoundException e) {
                    throw new ResourceNotFoundException("Persona with id " + persona.getId() + " not found");
                }
            }
            projectSaved.getPersonas().clear();
            projectSaved.getPersonas().addAll(existingPersonas);
        }

        if (!projectUpdated.getTags().isEmpty()) {
            Set<Tag> updatedTags = updateTags(projectUpdated.getTags());
            projectUpdated.setTags(updatedTags);
        }

        return projectMapper.toDto(projectMapper.partialUpdate(projectMapper.toDto(projectUpdated), projectSaved));
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

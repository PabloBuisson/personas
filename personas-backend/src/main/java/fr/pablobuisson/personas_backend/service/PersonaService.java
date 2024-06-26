package fr.pablobuisson.personas_backend.service;

import fr.pablobuisson.personas_backend.dto.PersonaDto;
import fr.pablobuisson.personas_backend.dto.ProjectDto;
import fr.pablobuisson.personas_backend.exception.ResourceNotFoundException;
import fr.pablobuisson.personas_backend.mapper.PersonaMapper;
import fr.pablobuisson.personas_backend.model.Persona;
import fr.pablobuisson.personas_backend.model.Project;
import fr.pablobuisson.personas_backend.repository.PersonaRepository;
import fr.pablobuisson.personas_backend.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@AllArgsConstructor
@Data
@Service
public class PersonaService {

    private final PersonaRepository personaRepository;
    private final ProjectRepository projectRepository;
    private final PersonaMapper personaMapper;

    public Persona personaDtoToPersonaEntity(PersonaDto personaDto) {
        return personaMapper.toEntity(personaDto);
    }

    public PersonaDto personaEntityToPersonaDto(Persona persona) {
        return personaMapper.toDto(persona);
    }

    public List<PersonaDto> getAll() {
        return this.personaRepository.findAll().stream().map(personaMapper::toDto).toList();
    }

    public PersonaDto getById(UUID id) {
        return this.personaMapper.toDto(this.personaRepository.findById(id).orElse(null));
    }

    public Persona getEntityById(UUID id) {
        return personaRepository.findById(id).orElse(null);
    }

    public Set<Persona> getByProjectId(Long projectId) {
        return this.personaRepository.findByProjectId(projectId);
    }

    @Transactional
    public PersonaDto create(PersonaDto personaDto, Long projectId) {
        Persona persona = this.personaMapper.toEntity(personaDto);

        if (projectId != null) {
            Project projectLinked = projectRepository.findById(projectId)
                    .orElseThrow(() -> new ResourceNotFoundException("Project with id " + projectId + " not found"));
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

        Persona personaSaved = this.personaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Persona with id " + id + " not found"));
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

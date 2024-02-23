package fr.pablobuisson.personas.personas.service;

import fr.pablobuisson.personas.personas.dto.PersonaDto;
import fr.pablobuisson.personas.personas.mapper.PersonaMapper;
import fr.pablobuisson.personas.personas.model.Persona;
import fr.pablobuisson.personas.personas.repository.PersonaRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Data
@Service
public class PersonaService {

    private final PersonaRepository personaRepository;
    private final PersonaMapper personaMapper;

    public List<PersonaDto> getAll() {
        return this.personaRepository.findAll().stream().map(personaMapper::toDto).toList();
    }

    public PersonaDto getById(String id) {
        return this.personaMapper.toDto(this.personaRepository.findById(id).orElse(null));
    }

    public PersonaDto create(PersonaDto personaDto) {
        Persona persona = this.personaMapper.toEntity(personaDto);
        Persona savedPersona = this.personaRepository.save(persona);
        return this.personaMapper.toDto(savedPersona);
    }

    public void delete(String id) {
        this.personaRepository.deleteById(id);
    }
}

package fr.pablobuisson.personas.personas.service;

import fr.pablobuisson.personas.personas.model.Persona;
import fr.pablobuisson.personas.personas.repository.PersonaRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Data
@Service
public class PersonaService {

    private final PersonaRepository personaRepository;

    public Iterable<Persona> getAll() {
        return this.personaRepository.findAll();
    }

    public Persona getById(String id) {
        return this.personaRepository.findById(id).orElse(null);
    }

    public Persona create(Persona persona) {
        return this.personaRepository.save(persona);
    }

    public void delete(String id) {
        this.personaRepository.deleteById(id);
    }
}

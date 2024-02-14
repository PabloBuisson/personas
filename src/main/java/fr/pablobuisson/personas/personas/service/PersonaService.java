package fr.pablobuisson.personas.personas.service;

import fr.pablobuisson.personas.personas.model.Persona;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Data
@Service
public class PersonaService {

    private Map<String, Persona> personas = new HashMap<String, Persona>() {
        {
            put("1", new Persona("1", "Bilbo", "28", "A hobbit longing for a great adventure."));
        }
    };

    public Collection<Persona> getAll() {
        return this.personas.values();
    }

    public Persona getById(String id) {
        return this.personas.get(id);
    }

    public Persona create(Persona persona) {
        persona.setId(UUID.randomUUID().toString());
        this.personas.put(persona.getId(), persona);
        return persona;
    }

    public Persona delete(String id) {
        return this.personas.remove(id);
    }
}

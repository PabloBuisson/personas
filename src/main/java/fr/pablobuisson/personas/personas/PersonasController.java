package fr.pablobuisson.personas.personas;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
public class PersonasController {

    private final Map<String, Persona> personas = new HashMap<String, Persona>() {
        {
            put("1", new Persona("1", "Bilbo", "28", "A hobbit longing for a great adventure."));
        }
    };

    @GetMapping(path = "/hello")
    public String displayHelloWorld() {
        return "Hello World !";
    }

    @GetMapping(path = "/personas")
    public Collection<Persona> getAll() {
        return personas.values();
    }

    @GetMapping(path = "/personas/{id}")
    public Persona getById(@PathVariable String id) {
        Persona persona = personas.get(id);

        if (persona == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return persona;
    }

    @DeleteMapping(path = "/personas/{id}")
    public void deleteById(@PathVariable String id) {
        Persona persona = personas.remove(id);

        if (persona == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @PostMapping(path = "/personas")
    public Persona create(@RequestBody @Valid Persona persona) {
        persona.setId(UUID.randomUUID().toString());
        this.personas.put(persona.getId(), persona);
        return persona;
    }
}

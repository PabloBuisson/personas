package fr.pablobuisson.personas.personas.web;

import fr.pablobuisson.personas.personas.model.Persona;
import fr.pablobuisson.personas.personas.service.PersonaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@AllArgsConstructor
@RestController
public class PersonasController {

    private final PersonaService personaService;

    @GetMapping(path = "/hello")
    public String displayHelloWorld() {
        return "Hello World !";
    }

    @GetMapping(path = "/personas")
    public Collection<Persona> getAll() {
        return personaService.getAll();
    }

    @GetMapping(path = "/personas/{id}")
    public Persona getById(@PathVariable String id) {
        Persona persona = personaService.getById(id);

        if (persona == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return persona;
    }

    @DeleteMapping(path = "/personas/{id}")
    public void deleteById(@PathVariable String id) {
        Persona persona = personaService.delete(id);

        if (persona == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @PostMapping(path = "/personas")
    public Persona create(@RequestBody @Valid Persona persona) {
        return personaService.create(persona);
    }
}

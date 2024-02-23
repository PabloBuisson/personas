package fr.pablobuisson.personas.personas.web;

import fr.pablobuisson.personas.personas.model.Persona;
import fr.pablobuisson.personas.personas.service.PersonaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@AllArgsConstructor
@RestController
@RequestMapping(PersonaController.API_URL)
public class PersonaController {
    public final static String API_URL = "/api/personas";

    private final PersonaService personaService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Persona> getAll() {
        return personaService.getAll();
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Persona getById(@PathVariable String id) {
        Persona persona = personaService.getById(id);

        if (persona == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return persona;
    }

    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable String id) {
        personaService.delete(id);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Persona create(@RequestBody @Valid Persona persona) {
        return personaService.create(persona);
    }
}

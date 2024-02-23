package fr.pablobuisson.personas.personas.controller;

import fr.pablobuisson.personas.personas.dto.PersonaDto;
import fr.pablobuisson.personas.personas.service.PersonaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(PersonaController.API_URL)
public class PersonaController {
    public final static String API_URL = "/api/personas";

    private final PersonaService personaService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<PersonaDto> getAll() {
        return personaService.getAll();
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public PersonaDto getById(@PathVariable String id) {
        PersonaDto personaSavedDto = personaService.getById(id);

        if (personaSavedDto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return personaSavedDto;
    }

    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable String id) {
        personaService.delete(id);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PersonaDto create(@RequestBody @Valid PersonaDto personaDto) {
        return personaService.create(personaDto);
    }
}

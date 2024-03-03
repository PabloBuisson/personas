package fr.pablobuisson.personas.personas.controller;

import fr.pablobuisson.personas.personas.dto.PersonaDto;
import fr.pablobuisson.personas.personas.service.PersonaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(PersonaController.API_URL)
@AllArgsConstructor
public class PersonaController {
    public final static String API_URL = "/api/personas";

    private final PersonaService personaService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PersonaDto>> getAll() {
        return new ResponseEntity<>(personaService.getAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PersonaDto> getById(@PathVariable UUID id) {
        PersonaDto personaSavedDto = personaService.getById(id);

        if (personaSavedDto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(personaSavedDto, HttpStatus.OK);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PersonaDto> create(@RequestBody @Valid PersonaDto personaDto) {
        return new ResponseEntity<>(personaService.create(personaDto), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<PersonaDto> fullUpdate(
            @PathVariable("id") UUID id,
            @RequestBody PersonaDto personaDto) {

        if (!personaService.existInDB(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(personaService.update(personaDto, id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable UUID id) {
        personaService.delete(id);
    }
}

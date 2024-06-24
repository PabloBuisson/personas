package fr.pablobuisson.personas_backend.controller;

import fr.pablobuisson.personas_backend.dto.PersonaDto;
import fr.pablobuisson.personas_backend.service.PersonaService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Get all personas")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<PersonaDto>> getAll() {
        return new ResponseEntity<>(personaService.getAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get persona by its id")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<PersonaDto> getById(@PathVariable UUID id) {
        PersonaDto personaSavedDto = personaService.getById(id);

        if (personaSavedDto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(personaSavedDto, HttpStatus.OK);
    }


    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a persona")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PersonaDto> create(@RequestBody @Valid PersonaDto personaDto, @RequestParam(value = "projectId", required = false) Long projectId) {
        return new ResponseEntity<>(personaService.create(personaDto, projectId), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    @Operation(summary = "Update partially a persona")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<PersonaDto> fullUpdate(
            @PathVariable("id") UUID id,
            @RequestBody PersonaDto personaDto) throws Exception {

        if (!personaService.existInDB(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(personaService.partialUpdate(personaDto, id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    @Operation(summary = "Delete a persona")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<HttpStatus> deleteById(@PathVariable UUID id) {
        personaService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

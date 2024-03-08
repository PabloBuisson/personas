package fr.pablobuisson.personas.personas.controller;

import fr.pablobuisson.personas.personas.dto.TagDto;
import fr.pablobuisson.personas.personas.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(TagController.API_URL)
@AllArgsConstructor
public class TagController {
    public final static String API_URL = "/api/tags";

    private final TagService tagService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all tags")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<TagDto>> getAll() {
        return new ResponseEntity<>(tagService.getAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get a tag by its id")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TagDto> getById(@PathVariable Long id) {
        TagDto tagSavedDto = tagService.getById(id);

        if (tagSavedDto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(tagSavedDto, HttpStatus.OK);
    }

    @GetMapping(path = "/projects/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get tags by the id of one of their projects")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<TagDto>> getByProjectId(@PathVariable Long id) {
        return new ResponseEntity<>(tagService.getByProjectId(id), HttpStatus.OK);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a tag")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<TagDto> create(@RequestBody @Valid TagDto tagDto) {
        return new ResponseEntity<>(tagService.create(tagDto), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    @Operation(summary = "Update fully a tag")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TagDto> fullUpdate(
            @PathVariable("id") Long id,
            @RequestBody TagDto tagDto) throws Exception {

        if (!tagService.existsInDB(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(tagService.partialUpdate(tagDto, id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    @Operation(summary = "Delete a tag")
    public void deleteById(@PathVariable Long id) {
        tagService.delete(id);
    }
}

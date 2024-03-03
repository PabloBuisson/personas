package fr.pablobuisson.personas.personas.controller;

import fr.pablobuisson.personas.personas.dto.ProjectDto;
import fr.pablobuisson.personas.personas.dto.TagDto;
import fr.pablobuisson.personas.personas.model.Tag;
import fr.pablobuisson.personas.personas.service.TagService;
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
    public ResponseEntity<List<TagDto>> getAll() {
        return new ResponseEntity<>(tagService.getAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TagDto> getById(@PathVariable Long id) {
        TagDto tagSavedDto = tagService.getById(id);

        if (tagSavedDto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(tagSavedDto, HttpStatus.OK);
    }

    @GetMapping(path = "/projects/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TagDto>> getByProjectId(@PathVariable Long id) {
        return new ResponseEntity<>(tagService.getByProjectId(id), HttpStatus.OK);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TagDto> create(@RequestBody @Valid TagDto tagDto) {
        return new ResponseEntity<>(tagService.create(tagDto), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<TagDto> fullUpdate(
            @PathVariable("id") Long id,
            @RequestBody TagDto tagDto) {

        if (!tagService.existsInDB(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(tagService.update(tagDto, id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable Long id) {
        tagService.delete(id);
    }
}

package fr.pablobuisson.personas.personas.controller;

import fr.pablobuisson.personas.personas.dto.TagDto;
import fr.pablobuisson.personas.personas.service.TagService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    public List<TagDto> getAll() {
        return tagService.getAll();
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public TagDto getById(@PathVariable Long id) {
        TagDto tagSavedDto = tagService.getById(id);

        if (tagSavedDto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return tagSavedDto;
    }

    @GetMapping(path = "/projects/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TagDto> getTagsByProjectId(@PathVariable Long id) {
        return tagService.getByProjectId(id);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable Long id) {
        tagService.delete(id);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public TagDto create(@RequestBody @Valid TagDto tagDto) {
        return tagService.create(tagDto);
    }
}

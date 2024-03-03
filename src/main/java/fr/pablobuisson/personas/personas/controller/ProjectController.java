package fr.pablobuisson.personas.personas.controller;

import fr.pablobuisson.personas.personas.dto.ProjectDto;
import fr.pablobuisson.personas.personas.service.ProjectService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(ProjectController.API_URL)
@Data
@AllArgsConstructor
public class ProjectController {
    public final static String API_URL = "/api/projects";

    private final ProjectService projectService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProjectDto>> getAll() {
        return new ResponseEntity<>(projectService.getAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectDto> getById(@PathVariable Long id) {
        ProjectDto projectSavedDto = projectService.getById(id);

        if (projectSavedDto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(projectSavedDto, HttpStatus.OK);
    }

    @GetMapping(path = "/tags/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ProjectDto>> getByTagId(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.getByTagId(id), HttpStatus.OK);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProjectDto> create(@RequestBody @Valid ProjectDto project) {
        return new ResponseEntity<>(projectService.create(project), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable Long id) {
        projectService.delete(id);
    }
}

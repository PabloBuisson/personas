package fr.pablobuisson.personas.controller;

import fr.pablobuisson.personas.dto.ProjectDto;
import fr.pablobuisson.personas.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Get all projects")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ProjectDto>> getAll() {
        return new ResponseEntity<>(projectService.getAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get a project by its id")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ProjectDto> getById(@PathVariable Long id) {
        ProjectDto projectSavedDto = projectService.getById(id);

        if (projectSavedDto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(projectSavedDto, HttpStatus.OK);
    }

    @GetMapping(path = "/tags/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get projects by the id of one of their tags")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ProjectDto>> getByTagId(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.getByTagId(id), HttpStatus.OK);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a project")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ProjectDto> create(@RequestBody @Valid ProjectDto project) {
        return new ResponseEntity<>(projectService.create(project), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    @Operation(summary = "Update fully a project")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ProjectDto> fullUpdate(
            @PathVariable("id") Long id,
            @RequestBody ProjectDto projectDto) throws Exception {

        if (!projectService.existsInDB(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(projectService.partialUpdate(projectDto, id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    @Operation(summary = "Delete a project")
    public void deleteById(@PathVariable Long id) {
        projectService.delete(id);
    }
}

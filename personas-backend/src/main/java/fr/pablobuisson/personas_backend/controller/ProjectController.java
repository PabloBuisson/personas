package fr.pablobuisson.personas_backend.controller;

import fr.pablobuisson.personas_backend.dto.ProjectDto;
import fr.pablobuisson.personas_backend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ProjectController.API_URL)
@Data
@AllArgsConstructor
public class ProjectController {
    public final static String API_URL = "/api/projects";

    private final ProjectService projectService;

    // TODO check if still idempotent
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get all projects", operationId = "getProjects")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ProjectDto>> getAll(@RequestParam(value = "tagId", required = false) String tagId) {
        if (tagId != null) {
            return new ResponseEntity<>(projectService.getByTagId(Long.valueOf(tagId)), HttpStatus.OK);
        }

        return new ResponseEntity<>(projectService.getAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get a project by its id", operationId = "getProject")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ProjectDto> getById(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.getById(id), HttpStatus.OK);
    }

    @GetMapping(path = "/tags/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Get projects by the id of one of their tags", operationId = "getProjectsByTagId")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<ProjectDto>> getByTagId(@PathVariable Long id) {
        return new ResponseEntity<>(projectService.getByTagId(id), HttpStatus.OK);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Create a project", operationId = "createProject")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ProjectDto> create(@RequestBody @Valid ProjectDto project) throws Exception {
        return new ResponseEntity<>(projectService.create(project), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    @Operation(summary = "Update partially a project", operationId = "updateProject")
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
    @Operation(summary = "Delete a project", operationId = "deleteProject")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Long id) throws Exception {
        projectService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

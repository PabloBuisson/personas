package fr.pablobuisson.personas.personas.web;

import fr.pablobuisson.personas.personas.model.Project;
import fr.pablobuisson.personas.personas.service.ProjectService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(ProjectController.API_URL)
@Data
@AllArgsConstructor
public class ProjectController {
    public final static String API_URL = "/api/projects";

    private final ProjectService projectService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Project> getAll() {
        return projectService.getAll();
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Project getById(@PathVariable Long id) {
        Project project = projectService.getById(id);

        if (project == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return project;
    }

    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable Long id) {
        projectService.delete(id);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Project create(@RequestBody @Valid Project project) {
        return projectService.create(project);
    }
}

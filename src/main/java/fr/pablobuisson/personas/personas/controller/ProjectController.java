package fr.pablobuisson.personas.personas.controller;

import fr.pablobuisson.personas.personas.dto.ProjectDto;
import fr.pablobuisson.personas.personas.service.ProjectService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    public List<ProjectDto> getAll() {
        return projectService.getAll();
    }

    @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ProjectDto getById(@PathVariable Long id) {
        ProjectDto projectSavedDto = projectService.getById(id);

        if (projectSavedDto == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        return projectSavedDto;
    }

    @DeleteMapping(path = "/{id}")
    public void deleteById(@PathVariable Long id) {
        projectService.delete(id);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ProjectDto create(@RequestBody @Valid ProjectDto project) {
        return projectService.create(project);
    }
}

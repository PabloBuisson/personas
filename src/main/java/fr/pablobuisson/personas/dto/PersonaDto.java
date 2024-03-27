package fr.pablobuisson.personas.dto;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;
import java.util.UUID;

public record PersonaDto(UUID id, @NotBlank(message = "The name of the persona is required") String name, @NotBlank(message = "The age of the persona is required") String age, @NotBlank(message = "The story of the persona is required") String story, ProjectDto project, JobDetailsDto job) implements Serializable {
}

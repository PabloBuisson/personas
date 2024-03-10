package fr.pablobuisson.personas.dto;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;
import java.util.UUID;

public record PersonaDto(UUID id, @NotBlank String name, @NotBlank String age, @NotBlank String story, ProjectDto project, JobDetailsDto job) implements Serializable {
}

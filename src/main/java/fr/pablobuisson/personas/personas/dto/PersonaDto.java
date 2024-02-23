package fr.pablobuisson.personas.personas.dto;

import java.io.Serializable;
import java.util.UUID;

public record PersonaDto(UUID id, String name, String age, String story, ProjectDto project) implements Serializable {
}

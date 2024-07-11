package fr.pablobuisson.personas_backend.dto;

import java.io.Serializable;
import java.util.List;

public record SummaryDto(List<ProjectDto> projects, List<PersonaDto> personas) implements Serializable { }

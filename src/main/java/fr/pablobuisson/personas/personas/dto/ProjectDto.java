package fr.pablobuisson.personas.personas.dto;

import java.io.Serializable;
import java.util.List;

public record ProjectDto(Long id, String name, String description, String icon, List<PersonaDto> personas, List<TagDto> tags) implements Serializable {
}

package fr.pablobuisson.personas_backend.dto;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;
import java.util.List;

public record ProjectDto(Long id,
                         @NotBlank String name,
                         String description,
                         String icon,
                         List<PersonaDto> personas,
                         List<TagDto> tags) implements Serializable { }

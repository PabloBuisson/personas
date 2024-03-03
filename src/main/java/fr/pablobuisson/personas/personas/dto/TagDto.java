package fr.pablobuisson.personas.personas.dto;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record TagDto(Long id, @NotBlank String label, String color) implements Serializable {
}

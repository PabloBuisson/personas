package fr.pablobuisson.personas.personas.dto;

import java.io.Serializable;
import java.util.List;

public record TagDto(Long id, String label, String color) implements Serializable {
}

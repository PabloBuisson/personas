package fr.pablobuisson.personas.personas.dto;

import java.io.Serializable;

public record JobDetailsDto(Long id, String company, String industry, String salary, String title) implements Serializable {
}

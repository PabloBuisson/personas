package fr.pablobuisson.personas_backend.dto;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;
import java.util.UUID;

public record PersonaDto(UUID id,
                         @NotBlank String name,
                         @NotBlank String age,
                         @NotBlank String story,
                         String image,
                         String color,
                         String location,
                         String family,
                         String personalityTraits,
                         String education,
                         String idols,
                         String brands,
                         ProjectDto project,
                         JobDetailsDto job,
                         CultureFavoritesDto culture,
                         EmotionalMotivationsDto emotions) implements Serializable { }

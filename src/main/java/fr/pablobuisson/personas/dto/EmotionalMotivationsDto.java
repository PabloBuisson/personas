package fr.pablobuisson.personas.dto;

import java.io.Serializable;

public record EmotionalMotivationsDto(Long id,
                                      String passions,
                                      String goals,
                                      String joys,
                                      String fears,
                                      String frustrations,
                                      String habits) implements Serializable { }

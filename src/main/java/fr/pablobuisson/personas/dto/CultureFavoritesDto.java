package fr.pablobuisson.personas.dto;

import java.io.Serializable;

public record CultureFavoritesDto(Long id,
                                  String movies,
                                  String books,
                                  String comics,
                                  String tv,
                                  String music,
                                  String games) implements Serializable { }

package fr.pablobuisson.personas_backend.dto;

import java.io.Serializable;

public record CultureFavoritesDto(Long id,
                                  String movies,
                                  String books,
                                  String comics,
                                  String tv,
                                  String music,
                                  String games) implements Serializable { }

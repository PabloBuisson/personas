package fr.pablobuisson.personas.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "CultureFavoritesEntity")
@Table(name = "culture_favorites")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class CultureFavorites {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String movies;

    private String books;

    private String comics;

    private String tv;

    private String music;

    private String games;

    @OneToOne(mappedBy = "culture")
    private Persona persona;
}

package fr.pablobuisson.personas_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "EmotionalMotivationsEntity")
@Table(name = "emotional_motivations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class EmotionalMotivations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String passions;

    private String goals;

    private String joys;

    private String fears;

    private String frustrations;

    private String habits;

    @OneToOne(mappedBy = "emotions")
    private Persona persona;
}

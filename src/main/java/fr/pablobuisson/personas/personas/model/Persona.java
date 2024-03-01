package fr.pablobuisson.personas.personas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;


@Entity(name = "PersonaEntity")
@Table(name = "persona")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Persona {
    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    private UUID id;

    @NotNull(message = "The name of the persona is requested.")
    private String name;

    @NotNull(message = "The age of the persona is requested.")
    private String age;

    @NotNull(message = "The story of the persona is requested.")
    private String story;

    @EqualsAndHashCode.Exclude
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}

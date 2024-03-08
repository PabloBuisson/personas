package fr.pablobuisson.personas.personas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank(message = "The name of the persona is requested.")
    private String name;

    @NotBlank(message = "The age of the persona is requested.")
    private String age;

    @NotBlank(message = "The story of the persona is requested.")
    private String story;

    @EqualsAndHashCode.Exclude
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @EqualsAndHashCode.Exclude
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "persona_job",
            joinColumns =
                    { @JoinColumn(name = "persona_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "job_id", referencedColumnName = "id") })
    private JobDetails job;
}

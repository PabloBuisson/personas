package fr.pablobuisson.personas.model;

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
@Builder
public class Persona {
    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    private UUID id;

    @NotBlank
    private String name;

    @NotBlank
    private String age;

    @NotBlank
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

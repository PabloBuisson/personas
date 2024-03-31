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

    private String image;

    private String color;

    private String location;

    private String family;

    @Column(name="personality")
    private String personalityTraits;

    private String education;

    private String idols;

    private String brands;

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

    @EqualsAndHashCode.Exclude
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "persona_culture",
            joinColumns =
                    { @JoinColumn(name = "persona_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "culture_id", referencedColumnName = "id") })
    private CultureFavorites culture;

    @EqualsAndHashCode.Exclude
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "persona_emotions",
            joinColumns =
                    { @JoinColumn(name = "persona_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "emotions_id", referencedColumnName = "id") })
    private EmotionalMotivations emotions;
}

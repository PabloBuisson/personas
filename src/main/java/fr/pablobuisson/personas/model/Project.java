package fr.pablobuisson.personas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity(name = "ProjectEntity")
@Table(name = "project")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String description;

    private String icon;

    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private Set<Persona> personas = new LinkedHashSet<>();

    @EqualsAndHashCode.Exclude
    @ManyToMany
    @JoinTable(name = "tag_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new LinkedHashSet<>();
}

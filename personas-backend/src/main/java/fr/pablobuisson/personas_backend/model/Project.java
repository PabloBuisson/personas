package fr.pablobuisson.personas_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Date;
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

    private Date createdAt;

    private Date updatedAt;

    //TODO only use MERGE and update updatePersonas method in ProjectService
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "project", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Persona> personas = new LinkedHashSet<>();

    @EqualsAndHashCode.Exclude
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "tag_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new LinkedHashSet<>();
}

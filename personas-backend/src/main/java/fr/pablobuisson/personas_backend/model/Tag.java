package fr.pablobuisson.personas_backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Set;
import java.util.LinkedHashSet;

@Entity(name = "TagEntity")
@Table(name = "tag")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String label;

    private String color;

    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "tags")
    private Set<Project> projects = new LinkedHashSet<>();
}

package fr.pablobuisson.personas.personas.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "persona")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Persona {
    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    String id;

    @NotNull(message = "The name of the persona is requested.")
    String name;

    @NotNull(message = "The age of the persona is requested.")
    String age;

    @NotNull(message = "The story of the persona is requested.")
    String story;
}

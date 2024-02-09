package fr.pablobuisson.personas.personas;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Persona {
    String id;
    String name;
    String age;
    String story;
}

package fr.pablobuisson.personas.repository;

import fr.pablobuisson.personas.TestDataUtil;
import fr.pablobuisson.personas.model.Persona;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
public class PersonaRepositoryIntegrationTests {

    private PersonaRepository repository;

    @Autowired
    public PersonaRepositoryIntegrationTests(PersonaRepository repository) {
        this.repository = repository;
    }

    @Test
    public void testThatPersonaIsCreatedAndRetrieved() {
        Persona persona = TestDataUtil.createTestPersonaBase();
        persona.setId(null);
        Persona personaSaved = this.repository.save(persona);

        Optional<Persona> result = this.repository.findById(personaSaved.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(personaSaved);
    }
}

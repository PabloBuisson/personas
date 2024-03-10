package fr.pablobuisson.personas.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.pablobuisson.personas.TestDataUtil;
import fr.pablobuisson.personas.model.Persona;
import fr.pablobuisson.personas.service.PersonaService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
public class PersonaControllerIntegrationTests {

    private final PersonaService personaService;

    private final MockMvc mockMvc;

    private final ObjectMapper objectMapper;

    @Autowired
    public PersonaControllerIntegrationTests(PersonaService personaService, MockMvc mockMvc) {
        this.personaService = personaService;
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
    }

    @Test
    public void testThatPersonaIsCreatedAndRetrieved() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaA();
        persona.setId(null);
        String personaAsJSON = objectMapper.writeValueAsString(persona);

        mockMvc.perform(MockMvcRequestBuilders
                .post(PersonaController.API_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(personaAsJSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }
}

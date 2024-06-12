package fr.pablobuisson.personas_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.pablobuisson.personas_backend.TestDataUtil;
import fr.pablobuisson.personas_backend.model.Persona;
import fr.pablobuisson.personas_backend.repository.PersonaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@ExtendWith(SpringExtension.class)
// Empty the Test Database after each test ↓
// (useful for testing accuracy of list of data, for example "$[0].id")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class PersonaControllerIntegrationTests {

    private final PersonaRepository personaRepository;

    private final MockMvc mockMvc;

    private final ObjectMapper objectMapper;

    @Autowired
    public PersonaControllerIntegrationTests(PersonaRepository personaRepository, MockMvc mockMvc) {
        this.personaRepository = personaRepository;
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
    }

    // ***** [CREATE] TESTS ***** //

    @Test
    public void testThatCreatePersonaBaseReturnsStatus201() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaBase();
        persona.setId(null);
        String personaAsJSON = objectMapper.writeValueAsString(persona);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(PersonaController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(personaAsJSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void testThatCreatePersonaDetailedReturnsStatus201() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaDetailed();
        persona.setId(null);
        String personaAsJSON = objectMapper.writeValueAsString(persona);

        mockMvc.perform(MockMvcRequestBuilders
                .post(PersonaController.API_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(personaAsJSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void testThatCreatePersonaBaseReturnsSavedPersona() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaBase();
        persona.setId(null);
        String personaAsJSON = objectMapper.writeValueAsString(persona);

        mockMvc.perform(MockMvcRequestBuilders
                .post(PersonaController.API_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(personaAsJSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Frodo"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.age").value("18"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.project").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.job").isEmpty());
    }

    @Test
    public void testThatCreatePersonaDetailedReturnsSavedPersona() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaDetailed();
        persona.setId(null);
        String personaAsJSON = objectMapper.writeValueAsString(persona);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(PersonaController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(personaAsJSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Frodo"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.age").value("18"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.project").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.location").value("Middle Earth"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.personalityTraits").value("Dreamer, Smart, Anxious"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.job.title").value("Wanderer"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.culture.games").value("Hates losing at board games"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.emotions.passions").value("Cryptic books, Bonsais"));
    }

    // ***** [GET] TESTS ***** //

    @Test
    public void testThatGetListPersonasReturnsStatus200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get(PersonaController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatGetListPersonasReturnsListOfPersonas() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaDetailed();
        personaRepository.save(persona);

        mockMvc.perform(MockMvcRequestBuilders
                .get(PersonaController.API_URL)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Frodo"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].age").value("18"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].project").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].job.title").value("Wanderer"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].location").value("Middle Earth"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].personalityTraits").value("Dreamer, Smart, Anxious"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].culture.games").value("Hates losing at board games"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].emotions.passions").value("Cryptic books, Bonsais"));
    }

    @Test
    public void testThatGetPersonaReturnsStatus200WhenPersonaExist() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaDetailed();
        Persona personaSaved = personaRepository.save(persona);

        mockMvc.perform(MockMvcRequestBuilders
                .get(PersonaController.API_URL + "/" + personaSaved.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatGetPersonaReturnsPersonaWhenPersonaExist() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaDetailed();
        Persona personaSaved = personaRepository.save(persona);

        mockMvc.perform(MockMvcRequestBuilders
                .get(PersonaController.API_URL + "/" + personaSaved.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(personaSaved.getId().toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Frodo"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.age").value("18"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.project").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.location").value("Middle Earth"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.personalityTraits").value("Dreamer, Smart, Anxious"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.job.title").value("Wanderer"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.culture.games").value("Hates losing at board games"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.emotions.passions").value("Cryptic books, Bonsais"));
    }

    @Test
    public void testThatGetPersonaReturnsStatus400WhenIdIsNotUUID() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .get(PersonaController.API_URL + "/99")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    public void testThatGetPersonaReturnsStatus404WhenNoPersonaExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get(PersonaController.API_URL + "/3396def5-3b47-4c4b-bfd5-ffecafbeb9b7")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    // ***** [UPDATE] TESTS ***** //

    @Test
    public void testThatUpdatePersonaReturnsStatus404WhenNoPersonaExists() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaDetailed();
        String personaJson = objectMapper.writeValueAsString(persona);

        mockMvc.perform(MockMvcRequestBuilders
                .put(PersonaController.API_URL + "/3396def5-3b47-4c4b-bfd5-ffecafbeb9b7")
                .contentType(MediaType.APPLICATION_JSON)
                .content(personaJson))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void testThatUpdatePersonaReturnsStatus200WhenPersonaExists() throws Exception {
        Persona personaBase = TestDataUtil.createTestPersonaBase();
        Persona personaSaved = personaRepository.save(personaBase);

        Persona personaUpdated = TestDataUtil.createTestPersonaDetailed();
        personaUpdated.setId(personaSaved.getId());
        String personaUpdatedJson = objectMapper.writeValueAsString(personaUpdated);

        mockMvc.perform(MockMvcRequestBuilders
                .put(PersonaController.API_URL + "/" + personaSaved.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(personaUpdatedJson))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatUpdateUpdatesExistingPersona() throws Exception {
        Persona personaBase = TestDataUtil.createTestPersonaBase();
        Persona personaSaved = personaRepository.save(personaBase);

        Persona personaUpdated = TestDataUtil.createTestPersonaDetailed();
        personaUpdated.setId(personaSaved.getId());
        String personaUpdatedJson = objectMapper.writeValueAsString(personaUpdated);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(PersonaController.API_URL + "/" + personaSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(personaUpdatedJson))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(personaSaved.getId().toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(personaSaved.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.age").value(personaSaved.getAge()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.location").value(personaUpdated.getLocation()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.personalityTraits").value(personaUpdated.getPersonalityTraits()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.project").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.job").value(personaUpdated.getJob()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.culture").value(personaUpdated.getCulture()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.emotions").value(personaUpdated.getEmotions()));
    }

    // ***** [DELETE] TESTS ***** //

    @Test
    public void testThatDeletePersonaReturnsStatus204ForNonExistingPersona() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .delete(PersonaController.API_URL + "/3396def5-3b47-4c4b-bfd5-ffecafbeb9b7")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    public void testThatDeletePersonaReturnsStatus204ForExistingPersona() throws Exception {
        Persona persona = TestDataUtil.createTestPersonaDetailed();
        Persona personaSaved = personaRepository.save(persona);

        mockMvc.perform(MockMvcRequestBuilders
                .delete(PersonaController.API_URL + "/" + personaSaved.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }
}

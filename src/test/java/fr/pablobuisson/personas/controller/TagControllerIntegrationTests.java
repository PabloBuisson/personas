package fr.pablobuisson.personas.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.pablobuisson.personas.TestDataUtil;
import fr.pablobuisson.personas.model.Tag;
import fr.pablobuisson.personas.repository.TagRepository;
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
public class TagControllerIntegrationTests {

    private final TagRepository tagRepository;

    private final MockMvc mockMvc;

    private final ObjectMapper objectMapper;

    @Autowired
    public TagControllerIntegrationTests(TagRepository tagRepository, MockMvc mockMvc) {
        this.tagRepository = tagRepository;
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
    }

    // ***** [CREATE] TESTS ***** //

    @Test
    public void testThatCreateTagBaseReturnsStatus201() throws Exception {
        Tag tag = TestDataUtil.createTestTagA();
        tag.setId(null);
        String tagAsJSON = objectMapper.writeValueAsString(tag);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(TagController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tagAsJSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void testThatCreateTagBaseReturnsSavedTag() throws Exception {
        Tag tag = TestDataUtil.createTestTagA();
        tag.setId(null);
        String tagAsJSON = objectMapper.writeValueAsString(tag);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(TagController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tagAsJSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber())
                .andExpect(MockMvcResultMatchers.jsonPath("$.label").value("Tag one"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.color").value("#ff0000"));
    }

    // ***** [GET] TESTS ***** //

    @Test
    public void testThatGetListTagsReturnsStatus200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get(TagController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatGetListTagsReturnsListOfTags() throws Exception {
        Tag tag = TestDataUtil.createTestTagA();
        tagRepository.save(tag);

        mockMvc.perform(MockMvcRequestBuilders
                        .get(TagController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNumber())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].label").value("Tag one"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].color").value("#ff0000"));
    }

    @Test
    public void testThatGetTagReturnsStatus200WhenTagExist() throws Exception {
        Tag tag = TestDataUtil.createTestTagA();
        Tag tagSaved = tagRepository.save(tag);

        mockMvc.perform(MockMvcRequestBuilders
                        .get(TagController.API_URL + "/" + tagSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatGetTagReturnsTagWhenTagExist() throws Exception {
        Tag tag = TestDataUtil.createTestTagA();
        Tag tagSaved = tagRepository.save(tag);

        mockMvc.perform(MockMvcRequestBuilders
                        .get(TagController.API_URL + "/" + tagSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(tagSaved.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.label").value("Tag one"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.color").value("#ff0000"));
    }

    @Test
    public void testThatGetTagReturnsStatus404WhenNoTagExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get(TagController.API_URL + "/999999999999999999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    // ***** [UPDATE] TESTS ***** //

    @Test
    public void testThatUpdateTagReturnsStatus404WhenNoTagExists() throws Exception {
        Tag tag = TestDataUtil.createTestTagA();
        String tagJSON = objectMapper.writeValueAsString(tag);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(TagController.API_URL + "/999999999999999999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tagJSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void testThatUpdateTagReturnsStatus200WhenTagExists() throws Exception {
        Tag tagA = TestDataUtil.createTestTagA();
        Tag tagSaved = tagRepository.save(tagA);

        Tag tagUpdated = TestDataUtil.createTestTagB();
        tagUpdated.setId(tagSaved.getId());
        String tagUpdatedJSON = objectMapper.writeValueAsString(tagUpdated);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(TagController.API_URL + "/" + tagSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tagUpdatedJSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatUpdateUpdatesExistingTag() throws Exception {
        Tag tagA = TestDataUtil.createTestTagA();
        Tag tagSaved = tagRepository.save(tagA);

        Tag tagUpdated = TestDataUtil.createTestTagB();
        tagUpdated.setId(tagSaved.getId());
        String tagUpdatedJSON = objectMapper.writeValueAsString(tagUpdated);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(TagController.API_URL + "/" + tagSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(tagUpdatedJSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(tagSaved.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.label").value(tagUpdated.getLabel()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.color").value(tagUpdated.getColor()));
    }

    // ***** [DELETE] TESTS ***** //

    @Test
    public void testThatDeleteTagReturnsStatus204ForNonExistingTag() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete(TagController.API_URL + "/999999999999999999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    public void testThatDeleteTagReturnsStatus204ForExistingTag() throws Exception {
        Tag tag = TestDataUtil.createTestTagA();
        Tag tagSaved = tagRepository.save(tag);

        mockMvc.perform(MockMvcRequestBuilders
                        .delete(TagController.API_URL + "/" + tagSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }
}

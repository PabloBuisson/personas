package fr.pablobuisson.personas.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.pablobuisson.personas.TestDataUtil;
import fr.pablobuisson.personas.dto.ProjectDto;
import fr.pablobuisson.personas.mapper.ProjectMapper;
import fr.pablobuisson.personas.model.Project;
import fr.pablobuisson.personas.repository.ProjectRepository;
import fr.pablobuisson.personas.service.ProjectService;
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

import static org.hamcrest.Matchers.hasSize;

@SpringBootTest
@ExtendWith(SpringExtension.class)
// Empty the Test Database after each test ↓
// (useful for testing accuracy of list of data, for example "$[0].id")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class ProjectControllerIntegrationTests {

    private final ProjectRepository projectRepository;

    private final ProjectService projectService;

    private final ProjectMapper projectMapper;

    private final MockMvc mockMvc;

    private final ObjectMapper objectMapper;

    @Autowired
    public ProjectControllerIntegrationTests(ProjectRepository projectRepository, ProjectService projectService, ProjectMapper projectMapper, MockMvc mockMvc) {
        this.projectRepository = projectRepository;
        this.projectService = projectService;
        this.projectMapper = projectMapper;
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
    }

    // ***** [CREATE] TESTS ***** //

    @Test
    public void testThatCreateProjectBaseReturnsStatus201() throws Exception {
        Project project = TestDataUtil.createTestProjectBase();
        project.setId(null);
        String projectAsJSON = objectMapper.writeValueAsString(project);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(ProjectController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectAsJSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void testThatCreateProjectDetailedReturnsStatus201() throws Exception {
        Project project = TestDataUtil.createTestProjectDetailed();
        project.setId(null);
        String projectAsJSON = objectMapper.writeValueAsString(project);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(ProjectController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectAsJSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void testThatCreateProjectBaseReturnsSavedProject() throws Exception {
        Project project = TestDataUtil.createTestProjectBase();
        project.setId(null);
        String projectAsJSON = objectMapper.writeValueAsString(project);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(ProjectController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectAsJSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Project number one"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("A very interesting project"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.icon").value("rocket"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.personas").isEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.tags").isEmpty());
    }

    @Test
    public void testThatCreateProjectDetailedReturnsSavedProject() throws Exception {
        Project project = TestDataUtil.createTestProjectDetailed();
        project.setId(null);
        String projectAsJSON = objectMapper.writeValueAsString(project);

        mockMvc.perform(MockMvcRequestBuilders
                        .post(ProjectController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectAsJSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNumber())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Project number one"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("A very interesting project"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.icon").value("rocket"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.personas").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.tags").isNotEmpty());
    }

    // ***** [GET] TESTS ***** //

    @Test
    public void testThatGetListProjectsReturnsStatus200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get(ProjectController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatGetListProjectsReturnsListOfProjects() throws Exception {
        Project project = TestDataUtil.createTestProjectDetailed();
        project.getPersonas().forEach(persona -> persona.setProject(project));
        projectRepository.save(project);

        mockMvc.perform(MockMvcRequestBuilders
                        .get(ProjectController.API_URL)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNumber())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Project number one"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].description").value("A very interesting project"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].icon").value("rocket"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].personas").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].tags").isNotEmpty());
    }

    @Test
    public void testThatGetProjectReturnsStatus200WhenProjectExist() throws Exception {
        Project project = TestDataUtil.createTestProjectDetailed();
        Project projectSaved = projectRepository.save(project);

        mockMvc.perform(MockMvcRequestBuilders
                        .get(ProjectController.API_URL + "/" + projectSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatGetProjectReturnsProjectWhenProjectExist() throws Exception {
        Project project = TestDataUtil.createTestProjectDetailed();
        project.getPersonas().forEach(persona -> persona.setProject(project));
        Project projectSaved = projectRepository.save(project);

        mockMvc.perform(MockMvcRequestBuilders
                        .get(ProjectController.API_URL + "/" + projectSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(projectSaved.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Project number one"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("A very interesting project"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.icon").value("rocket"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.personas").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.tags").isNotEmpty());
    }

    @Test
    public void testThatGetProjectReturnsStatus404WhenNoProjectExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get(ProjectController.API_URL + "/999999999999999999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    // ***** [UPDATE] TESTS ***** //

    @Test
    public void testThatUpdateProjectReturnsStatus404WhenNoProjectExists() throws Exception {
        Project project = TestDataUtil.createTestProjectDetailed();
        String projectJson = objectMapper.writeValueAsString(project);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(ProjectController.API_URL + "/999999999999999999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectJson))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void testThatUpdateProjectReturnsStatus200WhenProjectExists() throws Exception {
        Project projectBase = TestDataUtil.createTestProjectBase();
        Project projectSaved = projectRepository.save(projectBase);

        Project projectUpdated = TestDataUtil.createTestProjectDetailed();
        projectUpdated.setId(projectSaved.getId());
        String projectUpdatedJson = objectMapper.writeValueAsString(projectUpdated);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(ProjectController.API_URL + "/" + projectSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectUpdatedJson))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testThatUpdateUpdatesExistingProject() throws Exception {
        Project projectBase = TestDataUtil.createTestProjectBase();
        Project projectSaved = projectRepository.save(projectBase);

        Project projectUpdated = TestDataUtil.createTestProjectDetailed();
        projectUpdated.setId(projectSaved.getId());
        String projectUpdatedJson = objectMapper.writeValueAsString(projectUpdated);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(ProjectController.API_URL + "/" + projectSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectUpdatedJson))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(projectSaved.getId().toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(projectSaved.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(projectSaved.getDescription()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.icon").value(projectSaved.getIcon()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.personas").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.tags").isNotEmpty());
    }

    @Test
    public void testThatUpdatePartialUpdatesExistingProject() throws Exception {
        ProjectDto projectBase = projectMapper.toDto(TestDataUtil.createTestProjectDetailed());
        Project projectSaved = projectMapper.toEntity(projectService.create(projectBase));

        Project projectUpdated = TestDataUtil.createTestProjectPartialWithNewTags();
        projectUpdated.setId(projectSaved.getId());
        String projectUpdatedJson = objectMapper.writeValueAsString(projectUpdated);

        mockMvc.perform(MockMvcRequestBuilders
                        .put(ProjectController.API_URL + "/" + projectSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectUpdatedJson))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(projectSaved.getId().toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(projectSaved.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value(projectSaved.getDescription()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.icon").value(projectSaved.getIcon()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.personas", hasSize(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.tags", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.tags[0]").value(projectUpdated.getTags().toArray()[0]));
    }

    // ***** [DELETE] TESTS ***** //

    @Test
    public void testThatDeleteProjectReturnsStatus204ForNonExistingProject() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete(ProjectController.API_URL + "/999999999999999999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    public void testThatDeleteProjectReturnsStatus204ForExistingProject() throws Exception {
        Project project = TestDataUtil.createTestProjectDetailed();
        Project projectSaved = projectRepository.save(project);

        mockMvc.perform(MockMvcRequestBuilders
                        .delete(ProjectController.API_URL + "/" + projectSaved.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }
}

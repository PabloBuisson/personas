package fr.pablobuisson.personas;

import fr.pablobuisson.personas.model.JobDetails;
import fr.pablobuisson.personas.model.Persona;
import fr.pablobuisson.personas.model.Project;
import fr.pablobuisson.personas.model.Tag;

import java.util.UUID;

public final class TestDataUtil {

    public static Persona createTestPersonaBase() {
        return Persona.builder()
                .id(UUID.randomUUID())
                .age("18")
                .name("Frodo")
                .story("Wants a big change in his life")
                .build();
    }

    public static Persona createTestPersonaWithJob() {
        return Persona.builder()
                .id(UUID.randomUUID())
                .age("18")
                .name("Frodo")
                .story("Wants a big change in his life")
                .job(TestDataUtil.createJobA())
                .build();
    }

    public static Project createTestProjectA() {
        return Project.builder()
                .id(1L)
                .description("A very interesting project")
                .name("Project number one")
                .build();
    }

    public static Tag createTestTagA() {
        return Tag.builder()
                .id(1L)
                .label("Tag one")
                .color("#ff0000")
                .build();
    }

    public static JobDetails createJobA() {
        return JobDetails.builder()
                .company("Himself")
                .industry("Hobbit&Co")
                .salary("00.00µ")
                .title("Wanderer")
                .build();
    }
}

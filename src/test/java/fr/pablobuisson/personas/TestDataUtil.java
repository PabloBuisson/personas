package fr.pablobuisson.personas;

import fr.pablobuisson.personas.model.JobDetails;
import fr.pablobuisson.personas.model.Persona;
import fr.pablobuisson.personas.model.Project;
import fr.pablobuisson.personas.model.Tag;

import java.util.HashSet;
import java.util.Set;
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

    public static Project createTestProjectBase() {
        return Project.builder()
                .id(1L)
                .description("A very interesting project")
                .name("Project number one")
                .icon("rocket")
                .build();
    }

    public static Project createTestProjectDetailed() {
        Set<Persona> personas = new HashSet<Persona>();
        Persona personaOne = TestDataUtil.createTestPersonaWithJob();
        personaOne.setId(null);
        personas.add(personaOne);
        Set<Tag> tags = new HashSet<Tag>();
        Tag tagOne = TestDataUtil.createTestTagA();
        tagOne.setId(null);
        tags.add(tagOne);
        return Project.builder()
                .id(1L)
                .description("A very interesting project")
                .name("Project number one")
                .icon("rocket")
                .personas(personas)
                .tags(tags)
                .build();
    }

    public static Project createTestProjectPartialWithNewTags() {
        Set<Tag> tags = new HashSet<Tag>();
        Tag tagB = TestDataUtil.createTestTagB();
        tagB.setId(null);
        tags.add(tagB);
        Tag tagC = TestDataUtil.createTestTagC();
        tagC.setId(null);
        tags.add(tagC);
        return Project.builder()
                .tags(tags)
                .build();
    }

    public static Tag createTestTagA() {
        return Tag.builder()
                .id(1L)
                .label("Tag one")
                .color("#ff0000")
                .build();
    }

    public static Tag createTestTagB() {
        return Tag.builder()
                .id(1L)
                .label("Tag two")
                .color("#ff0002")
                .build();
    }

    public static Tag createTestTagC() {
        return Tag.builder()
                .id(1L)
                .label("Tag three")
                .color("#ff0003")
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

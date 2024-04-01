package fr.pablobuisson.personas;

import fr.pablobuisson.personas.model.*;

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

    public static Persona createTestPersonaDetailed() {
        return Persona.builder()
                .id(UUID.randomUUID())
                .age("18")
                .name("Frodo")
                .story("Wants a big change in his life")
                .family("Has a very big family")
                .location("Middle Earth")
                .personalityTraits("Dreamer, Smart, Anxious")
                .job(TestDataUtil.createJobA())
                .culture(TestDataUtil.createCultureA())
                .emotions(TestDataUtil.createEmotionsA())
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
        Persona personaOne = TestDataUtil.createTestPersonaDetailed();
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

    public static CultureFavorites createCultureA() {
        return CultureFavorites.builder()
                .books("Good Omens, Martian Chronicles, Shutter Island, British literature")
                .tv("Lost, Breaking Bad (TV show) | Survivor, The Traitors (Reality TV)")
                .music("The Killers, Oasis, Indie rock")
                .comics("Walking Dead, Calvin and Hobbes, De cape et de crocs")
                .games("Hates losing at board games")
                .movies("Dead Poets Society, Kingsman: The Secret Service, To Be or Not to Be")
                .build();
    }

    public static EmotionalMotivations createEmotionsA() {
        return EmotionalMotivations.builder()
                .fears("Watching his life fly by without accomplish anything")
                .frustrations("The space where he lives is too crowded, He wants a place for himself")
                .goals("Going on a big adventure, Prove himself that he can do anything, Find a place where he belongs")
                .habits("Knocking on wood before any challenge")
                .joys("Seeing the sun rising")
                .passions("Cryptic books, Bonsais")
                .build();
    }
}

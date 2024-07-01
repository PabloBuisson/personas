"use client";

import { PersonaDto } from "@/app/api";
import ButtonLinkSecondary from "../../buttons/ButtonLinkSecondary";
import InputWithHiddenLabel from "../common/InputWithHiddenLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import { useState } from "react";
import { updatePersona } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";
import ProjectCard from "../../cards/ProjectCard";
import PersonalInformationsRow from "../common/PersonalInformationsRow";
import {
  getJobInfos,
  getPersonalLifeInfos,
} from "../common/PersonalInformationsSettings";
import PersonalInformationsJobHeader from "../common/PersonalInformationsJobHeader";
import PersonaSecondaryInfosBlock from "../common/PersonaSecondaryInfosBlock";
import PersonaSectionMultiInfos from "@/components/UI/PersonaSectionMultiInfos";

export default function EditProjectForm({ persona }: { persona: PersonaDto }) {
  const router = useRouter();
  const [updatedProject, setUpdatedProject] = useState(
    persona.project ?? undefined
  );
  const personalLifeInfos = getPersonalLifeInfos(persona);
  const jobInfos = getJobInfos(persona);

  async function onDeleteProject() {
    setUpdatedProject(undefined);
  }

  async function onSubmit(formData: FormData) {
    console.log("onSubmit formData = ", formData);
    const rawFormData = {
      icon: formData.get("icon"),
      name: formData.get("title"),
      story: formData.get("story"),
      age: formData.get("age"),
      location: formData.get("location"),
      family: formData.get("family"),
    };

    const updatedPersona: PersonaDto = {
      id: persona.id,
      image: rawFormData.icon as string,
      age: rawFormData.age as string,
      name: rawFormData.name as string,
      story: rawFormData.story as string,
      location: rawFormData.location,
      family: rawFormData.family,
      education: formData.get("education"),
      personalityTraits: formData.get("personality"),
      idols: formData.get("idols"),
      brands: formData.get("brands"),
      job: {
        id: persona.job?.id,
        title: formData.get("job-title") as string,
        salary: formData.get("salary") as string,
        company: formData.get("company") as string,
        industry: formData.get("industry") as string,
      },
      culture: {
        id: persona.culture?.id,
        movies: formData.get("movies") as string,
        music: formData.get("music") as string,
        books: formData.get("books") as string,
        games: formData.get("games") as string,
        comics: formData.get("comics") as string,
        tv: formData.get("tv") as string,
      },
      emotions: {
        id: persona.emotions?.id,
        passions: formData.get("passions") as string,
        fears: formData.get("fears") as string,
        goals: formData.get("goals") as string,
        joys: formData.get("joys") as string,
        frustrations: formData.get("frustrations") as string,
        habits: formData.get("habits") as string,
      },
      project: updatedProject,
    };

    const data = await updatePersona(updatedPersona);

    goToPageDetails(data.id as string);
  }

  function goToPageDetails(personaId: string) {
    router.replace("/personas/" + personaId);
    router.refresh();
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-8">
      <div className="flex justify-between items-start gap-16">
        <div className="bg-gray-300 rounded-full w-28 h-28 flex justify-center items-center">
          {persona.image && (
            <span className="text-6xl" role="image">
              {persona.image}
            </span>
          )}
        </div>

        <div className="flex justify-end gap-8">
          <ButtonLinkSecondary label="Cancel" href={"../"} />
          <ButtonPrimary type="submit" label="Save changes" />
        </div>
      </div>
      <InputWithHiddenLabel
        className="text-5xl font-extrabold bg-transparent"
        label="Project name"
        inputId="title"
        defaultValue={persona.name}
      />
      <InputWithHiddenLabel
        className="text-xl font-medium bg-transparent"
        label="Story"
        inputId="story"
        defaultValue={persona.story}
      />
      <PersonalInformationsRow mode="edit" cells={personalLifeInfos} />
      <PersonalInformationsJobHeader mode="edit" persona={persona} />
      <PersonalInformationsRow mode="edit" cells={jobInfos} />
      <PersonaSecondaryInfosBlock
        key="education"
        mode="edit"
        label="Education"
        icon="🎓"
        value={persona.education}
        name="education"
      />
      <PersonaSecondaryInfosBlock
        key="personality"
        mode="edit"
        label="Personality"
        icon="🧠"
        value={persona.personalityTraits}
        name="personality"
      />
      <PersonaSecondaryInfosBlock
        key="idols"
        mode="edit"
        label="Idols"
        icon="🎤"
        value={persona.idols}
        name="idols"
      />
      <PersonaSecondaryInfosBlock
        key="brands"
        mode="edit"
        label="Brands"
        icon="🏷️"
        value={persona.brands}
        name="brands"
      />
      <PersonaSectionMultiInfos mode="edit" title="Culture" entity={persona.culture} />
      <PersonaSectionMultiInfos
        mode="edit"
        title="Emotions"
        entity={persona.emotions}
      />
      {updatedProject && (
        <section>
          <ul className="flex flex-wrap gap-16">
            <ProjectCard
              key={persona.id}
              project={updatedProject}
              onDelete={() => onDeleteProject()}
            />
          </ul>
        </section>
      )}
    </form>
  );
}

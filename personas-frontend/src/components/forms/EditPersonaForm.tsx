"use client";

import { PersonaDto } from "@/app/api";
import ButtonLinkSecondary from "../buttons/ButtonLinkSecondary";
import InputWithHiddenLabel from "./InputWithHiddenLabel";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useState } from "react";
import { updatePersona } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";
import ProjectCard from "../cards/ProjectCard";

export default function EditProjectForm({ persona }: { persona: PersonaDto }) {
  const [updatedProject, setUpdatedProject] = useState(persona.project ?? null);
  const router = useRouter();

  async function onDeleteProject() {
    setUpdatedProject(null);
  }

  async function onSubmit(formData: FormData) {
    const rawFormData = {
      icon: formData.get("icon"),
      name: formData.get("title"),
      story: formData.get("story"),
      age: formData.get("age"),
    };

    const updatedPersona: PersonaDto = {
      id: persona.id,
      image: rawFormData.icon as string,
      age: rawFormData.age as string,
      name: rawFormData.name as string,
      story: rawFormData.story as string,
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
      <InputWithHiddenLabel
        className="text-xl font-medium bg-transparent"
        label="Age"
        inputId="age"
        defaultValue={persona.age}
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

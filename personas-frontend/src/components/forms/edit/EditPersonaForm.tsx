"use client";

import { PersonaDto } from "@/app/api";
import ButtonLinkSecondary from "../../buttons/ButtonLinkSecondary";
import InputWithHiddenLabel from "../common/InputWithHiddenLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import { useState } from "react";
import { updatePersona } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";
import ProjectCard from "../../cards/ProjectCard";
import PersonalInformationsRow, {
  PersonalInformationsCell,
} from "../common/PersonalInformationsRow";

export default function EditProjectForm({ persona }: { persona: PersonaDto }) {
  const router = useRouter();
  const [updatedProject, setUpdatedProject] = useState(
    persona.project ?? undefined
  );
  const personalLifeInfos: PersonalInformationsCell[] = [
    { order: 1, icon: "🎂", label: "Age", name: "age", value: persona.age },
    {
      order: 2,
      icon: "📍",
      label: "Location",
      name: "location",
      value: persona.location,
    },
    {
      order: 3,
      icon: "😎",
      label: "Family",
      name: "family",
      value: persona.family,
    },
  ];
  const jobInfos: PersonalInformationsCell[] = [
    {
      order: 1,
      icon: "💵",
      label: "Salary",
      name: "salary",
      value: persona.job?.salary,
    },
    {
      order: 2,
      icon: "🏢",
      label: "Company",
      name: "company",
      value: persona.job?.company,
    },
    {
      order: 3,
      icon: "🏭",
      label: "Industry",
      name: "industry",
      value: persona.job?.industry,
    },
  ];

  async function onDeleteProject() {
    setUpdatedProject(undefined);
  }

  async function onSubmit(formData: FormData) {
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
      job: {
        id: persona.job?.id,
        salary: formData.get("salary") as string,
        company: formData.get("company") as string,
        industry: formData.get("industry") as string,
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
      <PersonalInformationsRow cells={personalLifeInfos} />
      <PersonalInformationsRow cells={jobInfos} />
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

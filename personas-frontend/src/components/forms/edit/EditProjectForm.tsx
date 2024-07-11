"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { ProjectDto } from "@/app/api";
import { updateProject } from "@/app/api/endpoints";
import Tag from "../../tags/Tag";
import InputWithHiddenLabel from "./../common/InputWithHiddenLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import PersonaCard from "../../cards/PersonaCard";
import ButtonSecondary from "@/components/buttons/ButtonSecondary";
import InputEmoji from "../common/InputEmoji";

export default function EditProjectForm({ project }: { project: ProjectDto }) {
  const [updatedTags, setUpdatedTags] = useState(project.tags ?? []);
  const [updatedPersonas, setUpdatedPersonas] = useState(
    project.personas ?? []
  );
  const inputTagRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  function deleteTag(tagIndex: number) {
    setUpdatedTags(updatedTags?.filter((_tag, index) => index !== tagIndex));
  }

  function addTag() {
    const tagLabel = inputTagRef.current;

    if (tagLabel && tagLabel.value) {
      setUpdatedTags([...updatedTags, { label: tagLabel.value }]);
      tagLabel.value = "";
    }
  }

  async function onDeletePersona(personaId: string | undefined) {
    console.log("deletePersona", personaId);

    setUpdatedPersonas(
      updatedPersonas?.filter((persona) => persona.id != personaId)
    );
  }

  async function onSubmit(formData: FormData) {
    const rawFormData = {
      icon: formData.get("icon"),
      name: formData.get("title"),
      description: formData.get("description"),
    };

    const updatedProject: ProjectDto = {
      id: project.id,
      icon: rawFormData.icon as string,
      name: rawFormData.name as string,
      description: rawFormData.description as string,
      tags: updatedTags,
      personas: updatedPersonas,
    };

    const data = await updateProject(updatedProject);

    goToPageDetails(data.id as number);
  }

  function goToPageDetails(projectId: number) {
    router.replace("/projects/" + projectId);
    router.refresh();
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-8">
      <div className="flex justify-between items-start gap-16">
        <div className="bg-white relative rounded-full w-28 h-28 flex justify-center items-center">
          <InputEmoji name="icon" value={project.icon} />
        </div>

        <div className="flex justify-end gap-8">
          <ButtonSecondary
            element="link"
            label="Cancel"
            elementProps={{ href: "../" }}
          />
          <ButtonPrimary
            element="button"
            elementProps={{ type: "submit" }}
            label="Save changes"
          />
        </div>
      </div>
      <InputWithHiddenLabel
        className="text-5xl font-extrabold bg-transparent"
        label="Project name"
        inputId="title"
        defaultValue={project.name}
      />
      <InputWithHiddenLabel
        className="text-xl font-medium bg-transparent"
        label="Description"
        inputId="description"
        defaultValue={project.description}
      />
      <section className="mt-8 flex flex-col gap-4">
        {updatedTags && (
          <ul className="flex flex-wrap gap-2">
            {updatedTags.map((tag, index) => (
              <Tag
                onDelete={() => deleteTag(index)}
                index={index}
                key={tag.id ?? `${tag.label.trim().toLocaleLowerCase}${index}`}
                id={tag.id}
                name={tag.label}
                size="text-sm"
              />
            ))}
          </ul>
        )}
        <div className="flex gap-4 items-stretch">
          <input
            className="px-2 py-1 text-sm font-normal rounded-md"
            id="new-tag"
            ref={inputTagRef}
            name="new-tag"
          ></input>
          <ButtonPrimary
            additionalCSS="text-sm"
            element="button"
            label="Add a tag"
            elementProps={{
              type: "button",
              onClick: addTag,
              style: { padding: "0.25em 1em" },
            }}
          />
        </div>
      </section>
      {updatedPersonas && (
        <section className="mt-16">
          <ul className="flex flex-wrap gap-16">
            {updatedPersonas.map((persona) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                onDelete={() => onDeletePersona(persona.id)}
              />
            ))}
          </ul>
        </section>
      )}
    </form>
  );
}

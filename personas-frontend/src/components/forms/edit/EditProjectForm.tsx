"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { toast } from "sonner";

import { ProjectDto } from "@/app/api";
import InputWithHiddenLabel from "./../common/InputWithHiddenLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import PersonaCard from "../../cards/PersonaCard";
import ButtonSecondary from "@/components/buttons/ButtonSecondary";
import InputEmoji from "../common/InputEmoji";
import { handleUpdateProject } from "@/app/actions/project-actions";
import InputTag from "../common/InputTag";

export default function EditProjectForm({ project }: { project: ProjectDto }) {
  const [updatedTags, setUpdatedTags] = useState(project.tags ?? []);
  const [updatedPersonas, setUpdatedPersonas] = useState(
    project.personas ?? []
  );

  const updateProject = handleUpdateProject.bind(null, {
    ...project,
    tags: updatedTags,
    personas: updatedPersonas,
  });

  const [state, formAction] = useFormState(updateProject, null);

  async function onDeletePersona(personaId: string | undefined) {
    setUpdatedPersonas(
      updatedPersonas?.filter((persona) => persona.id != personaId)
    );
  }

  useEffect(() => {
    if (state?.errors.errorMessage) {
      toast.error(
        `Oops! Something went wrong. Error message: ${state.errors.errorMessage}. Please try again later.`,
        {
          duration: 5000,
        }
      );
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-16 md:gap-8">
      <div className="flex flex-wrap justify-between items-start gap-16">
        <div className="bg-white relative rounded-full w-28 h-28 flex justify-center items-center order-2 md:order-1 z-10">
          <InputEmoji name="icon" value={project.icon} />
        </div>

        <div className="flex flex-wrap justify-end gap-8 order-1 md:order-2 w-full md:w-auto">
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
        className="text-5xl font-extrabold bg-transparent rounded-md"
        label="Project name"
        inputId="title"
        defaultValue={project.name}
        errorMessage={state?.errors.name}
      />
      <InputWithHiddenLabel
        className="text-xl font-medium bg-transparent rounded-md"
        label="Description"
        inputId="description"
        defaultValue={project.description}
        errorMessage={state?.errors.description}
      />
      <section className="mt-8 flex flex-col gap-4">
        <InputTag
          label="Tags"
          isLabelHidden={true}
          tags={updatedTags}
          setTags={setUpdatedTags}
        />
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

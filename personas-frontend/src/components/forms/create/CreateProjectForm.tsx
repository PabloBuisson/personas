"use client";

import { handleCreateProject } from "@/app/actions/project-actions";

import InputWithLabel from "../common/InputWithLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import InputEmoji from "../common/InputEmoji";
import ButtonSecondary from "@/components/buttons/ButtonSecondary";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TagDto } from "@/app/api";
import InputTag from "../common/InputTag";

export default function CreateProjectForm() {
  const [updatedTags, setUpdatedTags] = useState([] as TagDto[]);
  const createProject = handleCreateProject.bind(null, updatedTags);
  const [state, formAction] = useFormState(createProject, null);

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
    <form action={formAction} className="flex flex-col gap-8">
      <section className="bg-white relative flex justify-center items-center rounded-full w-28 h-28 z-10">
        <InputEmoji name="icon" />
      </section>
      <section className="flex flex-col gap-8">
        <InputWithLabel
          label="Name of the project"
          errorMessage={state?.errors.name}
          inputId="title"
        />
        <InputWithLabel
          label="Describe the project"
          errorMessage={state?.errors.description}
          inputId="description"
          withLongText={true}
        />
        <InputTag label="Tags" tags={updatedTags} setTags={setUpdatedTags} />
      </section>
      <section className="flex flex-wrap items-center gap-8 mt-8">
        <ButtonSecondary
          element="link"
          elementProps={{ href: "../" }}
          label="Cancel"
        />
        <ButtonPrimary
          element="button"
          elementProps={{ type: "submit" }}
          label="Create project"
        />
      </section>
    </form>
  );
}

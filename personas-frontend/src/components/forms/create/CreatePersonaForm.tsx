"use client";

import InputWithLabel from "../common/InputWithLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import { handleCreatePersona } from "@/app/actions/persona-actions";
import PersonaSectionAvatar from "@/components/UI/PersonaSectionAvatar";
import { useFormState } from "react-dom";
import ButtonSecondary from "@/components/buttons/ButtonSecondary";

export default function CreatePersonaForm({
  projectId,
}: {
  projectId?: number;
}) {
  const createPersona = handleCreatePersona.bind(null, projectId);
  const [state, formAction] = useFormState(createPersona, null);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <section className="flex flex-col items-start gap-4 z-10">
        <PersonaSectionAvatar image={undefined} mode="edit" />
      </section>
      <section className="flex flex-col gap-8">
        <InputWithLabel
          label="Name of the persona"
          errorMessage={state?.errors.name}
          inputId="name"
        />
        <InputWithLabel
          label="What is the story of the persona ?"
          errorMessage={state?.errors.story}
          inputId="story"
          withLongText={true}
        />
        <InputWithLabel
          label="How old is the persona ?"
          errorMessage={state?.errors.age}
          inputId="age"
          informationMessage="You can give a ballpark (i.e 15-25 years)"
        />
      </section>
      <section className="flex items-center gap-8 mt-8">
        <ButtonSecondary
          element="link"
          elementProps={{ href: "../" }}
          label="Cancel"
        />
        <ButtonPrimary
          element="button"
          elementProps={{ type: "submit" }}
          label="Create persona"
        />
      </section>
    </form>
  );
}

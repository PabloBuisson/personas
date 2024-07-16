"use server";

import { redirect } from "next/navigation";
import { PersonaDto } from "../api";
import { createPersona } from "../api/endpoints";
import {
  FormDataForEntity,
  FormStateCreateUpdatePersona,
} from "@/components/forms/settings/form-actions-settings";
import { getPersonaFormErrors } from "@/components/forms/validation/persona-validation";

export async function handleCreatePersona(
  projectId: number | undefined,
  currentState: FormStateCreateUpdatePersona,
  formData: FormData
) {
  const rawFormData: FormDataForEntity<PersonaDto> = {
    image: formData.get("icon"),
    name: formData.get("name"),
    story: formData.get("story"),
    age: formData.get("age"),
  };

  let errors = getPersonaFormErrors(currentState, rawFormData);

  if (errors) {
    return errors;
  }

  const newProject: PersonaDto = {
    image: rawFormData.image as string,
    name: rawFormData.name as string,
    story: rawFormData.story as string,
    age: rawFormData.age as string,
    location: undefined,
    family: undefined,
    education: undefined,
    idols: undefined,
    brands: undefined,
  };

  try {
    const response: PersonaDto = await createPersona(newProject, projectId);
    redirect("/personas/" + response.id);
  } catch (error) {
    errors = { errors: { errorMessage: `${error}` } };
    return errors;
  }
}

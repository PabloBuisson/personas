"use server";

import { redirect } from "next/navigation";
import { PersonaDto } from "../api";
import { createPersona } from "../api/endpoints";
import {
  ErrorMessageCreateUpdate,
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

  const errors = getPersonaFormErrors(currentState, rawFormData);

  if (errors) {
    return errors;
  }

  // TODO validation
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

  const response: PersonaDto = await createPersona(newProject, projectId);

  // TODO validation
  redirect("/personas/" + response.id);
}

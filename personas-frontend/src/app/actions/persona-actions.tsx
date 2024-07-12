"use server";

import { redirect } from "next/navigation";
import { PersonaDto } from "../api";
import { createPersona } from "../api/endpoints";

type FormStateCreatePersona = {
  errors: ErrorMessageCreatePersona;
} | null;

type ErrorMessageCreatePersona = {
  [K in keyof PersonaDto]?: string;
};

export async function handleCreatePersona(
  projectId: number | undefined,
  currentState: FormStateCreatePersona,
  formData: FormData
) {
  const rawFormData = {
    icon: formData.get("icon"),
    name: formData.get("name"),
    story: formData.get("story"),
    age: formData.get("age"),
  };

  const errors: ErrorMessageCreatePersona = {};

  if (!rawFormData.name || rawFormData.name.toString().trim().length === 0) {
    errors.name = "Name is required";
  }

  if (!rawFormData.story || rawFormData.story.toString().trim().length === 0) {
    errors.story = "Story is required";
  }

  if (!rawFormData.age || rawFormData.age.toString().trim().length === 0) {
    errors.age = "Age is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // TODO validation
  const newProject: PersonaDto = {
    image: rawFormData.icon as string,
    name: rawFormData.name as string,
    story: rawFormData.story as string,
    age: rawFormData.age as string,
  };

  const response: PersonaDto = await createPersona(newProject, projectId);

  // TODO validation
  redirect("/personas/" + response.id);
}

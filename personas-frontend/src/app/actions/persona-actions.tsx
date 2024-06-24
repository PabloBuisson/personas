"use server";

import { redirect } from "next/navigation";
import { PersonaDto } from "../api";
import { createPersona } from "../api/endpoints";

export async function handleCreatePersona(projectId: number | undefined, formData: FormData) {
  const rawFormData = {
    icon: formData.get("icon"),
    name: formData.get("name"),
    story: formData.get("story"),
    age: formData.get("age"),
  };

  let errors = [];

  if (!rawFormData.name || rawFormData.name.toString().trim().length === 0) {
    errors.push("Name is required.");
  }

  if (!rawFormData.story || rawFormData.story.toString().trim().length === 0) {
    errors.push("Story is required.");
  }

  if (!rawFormData.age || rawFormData.age.toString().trim().length === 0) {
    errors.push("Age is required.");
  }

  if (errors.length > 0) {
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

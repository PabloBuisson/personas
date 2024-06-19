"use server";

import { redirect } from "next/navigation";
import { ProjectDto, TagDto } from "../api";
import { createProject } from "../api/endpoints";

export async function handleCreateProject(formData: FormData) {
  const rawFormData = {
    icon: formData.get("icon"),
    title: formData.get("title"),
    description: formData.get("description"),
    tags: formData.get("tags"),
  };

  let errors = [];

  if (!rawFormData.title || rawFormData.title.toString().trim().length === 0) {
    errors.push("Title is required.");
  }

  if (
    !rawFormData.description ||
    rawFormData.description.toString().trim().length === 0
  ) {
    errors.push("Description is required.");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let tagsDTO: TagDto[] = [];

  if (rawFormData.tags) {
    tagsDTO = rawFormData.tags
      .toString()
      .split(/[,\;.\\_\-\/|\s]+/)
      .map((tagValue) => ({ label: tagValue.trim() }));
  }

  // TODO validation
  const newProject: ProjectDto = {
    icon: rawFormData.icon as string,
    name: rawFormData.title as string,
    description: rawFormData.description as string,
    tags: tagsDTO,
  };

  const response: ProjectDto = await createProject(newProject);

  // TODO validation
  redirect("/projects/" + response.id);
}

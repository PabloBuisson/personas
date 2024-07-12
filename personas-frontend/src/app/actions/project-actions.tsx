"use server";

import { redirect } from "next/navigation";
import { ProjectDto, TagDto } from "../api";
import { createProject } from "../api/endpoints";

type FormStateCreateProject = {
  errors: ErrorMessageCreateProject;
} | null;

type ErrorMessageCreateProject = {
  [K in keyof ProjectDto]?: string;
};

export async function handleCreateProject(
  currentState: FormStateCreateProject,
  formData: FormData
) {
  const rawFormData = {
    icon: formData.get("icon"),
    title: formData.get("title"),
    description: formData.get("description"),
    tags: formData.get("tags"),
  };

  const errors: ErrorMessageCreateProject = {};

  if (!rawFormData.title || rawFormData.title.toString().trim().length === 0) {
    errors.name = "Name is required";
  }

  if (
    !rawFormData.description ||
    rawFormData.description.toString().trim().length === 0
  ) {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length > 0) {
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

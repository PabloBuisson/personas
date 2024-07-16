"use server";

import { redirect } from "next/navigation";
import { ProjectDto, TagDto } from "../api";
import { createProject } from "../api/endpoints";
import {
  FormDataForEntity,
  FormStateCreateUpdateProject,
} from "@/components/forms/settings/form-actions-settings";
import { getProjectFormErrors } from "@/components/forms/validation/project-validation";

export async function handleCreateProject(
  currentState: FormStateCreateUpdateProject,
  formData: FormData
) {
  const rawFormData: FormDataForEntity<ProjectDto> = {
    icon: formData.get("icon"),
    name: formData.get("title"),
    description: formData.get("description"),
    tags: formData.get("tags"),
  };

  let errors = getProjectFormErrors(currentState, rawFormData);

  if (errors) {
    return errors;
  }

  let tagsDTO: TagDto[] = [];

  if (rawFormData.tags) {
    tagsDTO = rawFormData.tags
      .toString()
      .split(/[,\;.\\_\-\/|\s]+/)
      .map((tagValue) => ({ label: tagValue.trim() }));
  }

  const newProject: ProjectDto = {
    icon: rawFormData.icon as string,
    name: rawFormData.name as string,
    description: rawFormData.description as string,
    tags: tagsDTO,
  };

  try {
    const response: ProjectDto = await createProject(newProject);
    redirect("/projects/" + response.id);
  } catch (error) {
    errors = { errors: { errorMessage: `${error}` } };
    return errors;
  }
}

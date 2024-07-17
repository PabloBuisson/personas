"use server";

import { redirect } from "next/navigation";
import { ProjectDto, TagDto } from "../api";
import { createProject, updateProject } from "../api/endpoints";
import {
  FormDataForEntity,
  FormStateCreateUpdateProject,
} from "@/components/forms/settings/form-actions-settings-type.type";
import { getProjectFormErrors } from "@/components/forms/validation/project-validation";

export async function handleCreateProject(
  currentState: FormStateCreateUpdateProject | undefined,
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

  let data: ProjectDto;

  try {
    data = await createProject(newProject);
  } catch (error) {
    errors = { errors: { errorMessage: (error as Error).message } };
    return errors;
  }

  if (data.id) {
    // redirect throw an Error, don't use it in a try/catch block
    redirect("/projects/" + data.id);
  }
}

export async function handleUpdateProject(
  project: ProjectDto,
  currentState: FormStateCreateUpdateProject | undefined,
  formData: FormData
) {
  const rawFormData: FormDataForEntity<ProjectDto> = {
    icon: formData.get("icon"),
    name: formData.get("title"),
    description: formData.get("description"),
  };

  let errors = getProjectFormErrors(currentState, rawFormData);

  if (errors) {
    return errors;
  }

  const updatedProject: ProjectDto = {
    id: project.id,
    icon: rawFormData.icon as string,
    name: rawFormData.name as string,
    description: rawFormData.description as string,
    tags: project.tags,
    personas: project.personas,
  };

  let data: ProjectDto;

  try {
    data = await updateProject(updatedProject);
  } catch (error) {
    errors = { errors: { errorMessage: (error as Error).message } };
    return errors;
  }

  if (data.id) {
    // redirect throw an Error, don't use it in a try/catch block
    redirect("/projects/" + data.id);
  }
}
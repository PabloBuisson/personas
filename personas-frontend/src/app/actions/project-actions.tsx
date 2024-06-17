"use server";

import { redirect } from "next/navigation";
import { ProjectDto } from "../api";
import { createProject } from "../api/endpoints";

export async function handleCreateProject(formData: FormData) {
  const rawFormData = {
    title: formData.get("title"),
    description: formData.get("description"),
    tag: formData.get("tag"),
  };

  // TODO validation
  const newProject: ProjectDto = {
    name: rawFormData.title as string,
    description: rawFormData.description as string,
    tags: [
      {
        label: rawFormData.tag as string,
      },
    ],
  };

  const response: ProjectDto = await createProject(newProject);

  // TODO validation
  redirect("/projects/" + response.id);
}

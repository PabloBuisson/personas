import { ProjectDto, TagDto } from "./api";

// ********** PROJECTS **********

export async function getProjectById(
  projectId: number | string
): Promise<ProjectDto> {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/projects/${projectId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function getProjects(): Promise<ProjectDto[]> {
  const response = await fetch(`${process.env.BACKEND_API_URL}/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

// ********** TAGS **********

export async function getTags(): Promise<TagDto[]> {
  const response = await fetch(`${process.env.BACKEND_API_URL}/tags`, {
    cache: "no-store",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

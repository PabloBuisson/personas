import { PersonaDto, ProjectDto, TagDto } from "./api";

// ********** PERSONAS **********

export async function getPersonaById(personaId: string): Promise<PersonaDto> {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/personas/${personaId}`,
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

export async function getPersonas(): Promise<PersonaDto[]> {
  const response = await fetch(`${process.env.BACKEND_API_URL}/personas`, {
    cache: "no-store",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function createPersona(
  createdPersona: PersonaDto
): Promise<PersonaDto> {
  const response = await fetch(`${process.env.BACKEND_API_URL}/personas`, {
    method: "POST",
    body: JSON.stringify(createdPersona),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

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

export async function getProjects(tagId?: number): Promise<ProjectDto[]> {
  let apiUrl = `${process.env.BACKEND_API_URL}/projects`;

  if (tagId) {
    apiUrl = `${apiUrl}?tagId=${tagId}`;
  }

  const response = await fetch(apiUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function createProject(
  createdProject: ProjectDto
): Promise<ProjectDto> {
  const response = await fetch(`${process.env.BACKEND_API_URL}/projects`, {
    method: "POST",
    body: JSON.stringify(createdProject),
    headers: {
      "Content-Type": "application/json",
    },
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

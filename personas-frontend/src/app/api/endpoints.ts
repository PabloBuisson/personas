import { PersonaDto, ProjectDto, TagDto } from "./api";

function getBackendApiUrl(): string | undefined {
  if (typeof window === "undefined") {
    // server side
    return process.env.BACKEND_API_URL;
  } else {
    // client side (browser)
    return process.env.NEXT_PUBLIC_BACKEND_API_URL;
  }
}

// Disable request caching (default behavior in v13 & v14)
const commonParams: Partial<RequestInit> = { cache: "no-store" };

// ********** PERSONAS **********

export async function getPersonaById(personaId: string): Promise<PersonaDto> {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/personas/${personaId}`,
    {
      ...commonParams,
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
    ...commonParams,
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function createPersona(
  createdPersona: PersonaDto,
  projectId?: number
): Promise<PersonaDto> {
  let url = `${process.env.BACKEND_API_URL}/personas`;

  if (typeof projectId === "number") {
    url = `${url}?projectId=${projectId}`;
  }

  const response = await fetch(url, {
    ...commonParams,
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

export async function updatePersona(
  updatedPersona: PersonaDto
): Promise<PersonaDto> {
  const response = await fetch(
    `${getBackendApiUrl()}/personas/${updatedPersona.id}`,
    {
      ...commonParams,
      method: "PUT",
      body: JSON.stringify(updatedPersona),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function deletePersona(personaId: string): Promise<void> {
  const response = await fetch(`${getBackendApiUrl()}/personas/${personaId}`, {
    ...commonParams,
    method: "DELETE",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
}

// ********** PROJECTS **********

export async function getProjectById(
  projectId: number | string
): Promise<ProjectDto> {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/projects/${projectId}`,
    {
      ...commonParams,
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
    ...commonParams,
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
    ...commonParams,
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

export async function updateProject(
  updatedProject: ProjectDto
): Promise<ProjectDto> {
  const response = await fetch(
    `${getBackendApiUrl()}/projects/${updatedProject.id}`,
    {
      ...commonParams,
      method: "PUT",
      body: JSON.stringify(updatedProject),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function deleteProject(projectId: number): Promise<void> {
  const response = await fetch(`${getBackendApiUrl()}/projects/${projectId}`, {
    ...commonParams,
    method: "DELETE",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
}

// ********** TAGS **********

export async function getTags(): Promise<TagDto[]> {
  const response = await fetch(`${process.env.BACKEND_API_URL}/tags`, {
    ...commonParams,
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

"use server";

import { redirect } from "next/navigation";
import {
  PersonaDto,
  JobDetailsDto,
  CultureFavoritesDto,
  EmotionalMotivationsDto,
} from "../api";
import { createPersona, updatePersona } from "../api/endpoints";
import {
  FormDataForEntity,
  FormStateCreateUpdatePersona,
} from "@/components/forms/settings/form-actions-settings-type.type";
import { getPersonaFormErrors } from "@/components/forms/validation/persona-validation";

// By default, the FormData API returns all values as strings, even the null ones ("").
function getFormDataEntryValue<
  K extends
    | keyof PersonaDto
    | keyof JobDetailsDto
    | keyof CultureFavoritesDto
    | keyof EmotionalMotivationsDto
>(
  formEntryKey: K | "personalityTraits" | "job-title",
  formData: FormData
): string | undefined {
  const formEntryValue = formData.get(formEntryKey);

  if (
    !formEntryValue ||
    (typeof formEntryValue === "string" && formEntryValue.length === 0)
  )
    return undefined;
  return formEntryValue as string;
}

export async function handleCreatePersona(
  projectId: number | undefined,
  currentState: FormStateCreateUpdatePersona | undefined,
  formData: FormData
) {
  const rawFormData: FormDataForEntity<PersonaDto> = {
    avatar: getFormDataEntryValue("avatar", formData),
    age: getFormDataEntryValue("age", formData),
    name: getFormDataEntryValue("name", formData),
    story: getFormDataEntryValue("story", formData),
  };

  let errors = getPersonaFormErrors(currentState, rawFormData);

  if (errors) {
    return errors;
  }

  const newProject: PersonaDto = rawFormData as PersonaDto;

  let data: PersonaDto;

  try {
    data = await createPersona(newProject, projectId);
  } catch (error) {
    errors = { errors: { errorMessage: (error as Error).message } };
    return errors;
  }

  if (data.id) {
    // redirect throw an Error, don't use it in a try/catch block
    redirect("/personas/" + data.id);
  }
}

export async function handleUpdatePersona(
  persona: PersonaDto,
  currentState: FormStateCreateUpdatePersona | undefined,
  formData: FormData
) {
  const rawFormData: FormDataForEntity<PersonaDto> = {
    avatar: getFormDataEntryValue("avatar", formData),
    age: getFormDataEntryValue("age", formData),
    name: getFormDataEntryValue("name", formData),
    story: getFormDataEntryValue("story", formData),
    location: getFormDataEntryValue("location", formData),
    family: getFormDataEntryValue("family", formData),
  };

  let errors = getPersonaFormErrors(currentState, rawFormData);

  if (errors) {
    return errors;
  }

  const updatedPersona: PersonaDto = {
    id: persona.id,
    avatar: getFormDataEntryValue("avatar", formData),
    age: getFormDataEntryValue("age", formData) as string,
    name: getFormDataEntryValue("name", formData) as string,
    story: getFormDataEntryValue("story", formData) as string,
    location: getFormDataEntryValue("location", formData),
    family: getFormDataEntryValue("family", formData),
    education: getFormDataEntryValue("education", formData),
    personalityTraits: getFormDataEntryValue("personalityTraits", formData),
    idols: getFormDataEntryValue("idols", formData),
    brands: getFormDataEntryValue("brands", formData),
    job: {
      id: persona.job?.id,
      title: getFormDataEntryValue("job-title", formData),
      salary: getFormDataEntryValue("salary", formData),
      company: getFormDataEntryValue("company", formData),
      industry: getFormDataEntryValue("industry", formData),
    },
    culture: {
      id: persona.culture?.id,
      movies: getFormDataEntryValue("movies", formData),
      music: getFormDataEntryValue("music", formData),
      books: getFormDataEntryValue("books", formData),
      games: getFormDataEntryValue("games", formData),
      comics: getFormDataEntryValue("comics", formData),
      tv: getFormDataEntryValue("tv", formData),
    },
    emotions: {
      id: persona.emotions?.id,
      passions: getFormDataEntryValue("passions", formData),
      fears: getFormDataEntryValue("fears", formData),
      goals: getFormDataEntryValue("goals", formData),
      joys: getFormDataEntryValue("joys", formData),
      frustrations: getFormDataEntryValue("frustrations", formData),
      habits: getFormDataEntryValue("habits", formData),
    },
    project: persona.project,
  };

  let data: PersonaDto;

  try {
    data = await updatePersona(updatedPersona);
  } catch (error) {
    errors = { errors: { errorMessage: (error as Error).message } };
    return errors;
  }

  if (data.id) {
    // redirect throw an Error, don't use it in a try/catch block
    redirect("/personas/" + data.id);
  }
}

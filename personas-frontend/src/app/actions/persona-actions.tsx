"use server";

import { redirect } from "next/navigation";
import { PersonaDto } from "../api";
import { createPersona, updatePersona } from "../api/endpoints";
import {
  FormDataForEntity,
  FormStateCreateUpdatePersona,
} from "@/components/forms/settings/form-actions-settings-type.type";
import { getPersonaFormErrors } from "@/components/forms/validation/persona-validation";

export async function handleCreatePersona(
  projectId: number | undefined,
  currentState: FormStateCreateUpdatePersona | undefined,
  formData: FormData
) {
  const rawFormData: FormDataForEntity<PersonaDto> = {
    image: formData.get("icon"),
    name: formData.get("name"),
    story: formData.get("story"),
    age: formData.get("age"),
  };

  let errors = getPersonaFormErrors(currentState, rawFormData);

  if (errors) {
    return errors;
  }

  const newProject: PersonaDto = {
    image: rawFormData.image as string,
    name: rawFormData.name as string,
    story: rawFormData.story as string,
    age: rawFormData.age as string,
    location: undefined,
    family: undefined,
    education: undefined,
    idols: undefined,
    brands: undefined,
  };

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
    image: formData.get("icon"),
    name: formData.get("title"),
    story: formData.get("story"),
    age: formData.get("age"),
    location: formData.get("location"),
    family: formData.get("family"),
  };

  let errors = getPersonaFormErrors(currentState, rawFormData);

  if (errors) {
    return errors;
  }

  const updatedPersona: PersonaDto = {
    id: persona.id,
    image: rawFormData.image as string,
    age: rawFormData.age as string,
    name: rawFormData.name as string,
    story: rawFormData.story as string,
    location: rawFormData.location,
    family: rawFormData.family,
    education: formData.get("education"),
    personalityTraits: formData.get("personality"),
    idols: formData.get("idols"),
    brands: formData.get("brands"),
    job: {
      id: persona.job?.id,
      title: formData.get("job-title") as string,
      salary: formData.get("salary") as string,
      company: formData.get("company") as string,
      industry: formData.get("industry") as string,
    },
    culture: {
      id: persona.culture?.id,
      movies: formData.get("movies") as string,
      music: formData.get("music") as string,
      books: formData.get("books") as string,
      games: formData.get("games") as string,
      comics: formData.get("comics") as string,
      tv: formData.get("tv") as string,
    },
    emotions: {
      id: persona.emotions?.id,
      passions: formData.get("passions") as string,
      fears: formData.get("fears") as string,
      goals: formData.get("goals") as string,
      joys: formData.get("joys") as string,
      frustrations: formData.get("frustrations") as string,
      habits: formData.get("habits") as string,
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

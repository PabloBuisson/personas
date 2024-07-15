"use client";

import { PersonaDto, ProjectDto } from "@/app/api";
import InputWithHiddenLabel from "../common/InputWithHiddenLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import { useState } from "react";
import { updatePersona } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";
import PersonalInformationsRow from "../common/PersonalInformationsRow";
import {
  getJobInfos,
  getPersonalLifeInfos,
} from "../settings/personal-informations-settings";
import PersonalInformationsJobHeader from "../common/PersonalInformationsJobHeader";
import PersonaSectionMultiInfos from "@/components/UI/PersonaSectionMultiInfos";
import ButtonSecondary from "@/components/buttons/ButtonSecondary";
import PersonaSectionLinkedProject from "@/components/UI/PersonaSectionLinkedProject";
import SecondaryTitle from "@/components/UI/SecondaryTitle";
import PersonaSectionAvatar from "@/components/UI/PersonaSectionAvatar";
import PersonaSectionCharacteristics from "@/components/UI/PersonaSectionCharacteristics";
import { useFormState } from "react-dom";
import {
  FormDataForEntity,
  FormStateCreateUpdatePersona,
} from "../settings/form-actions-settings";
import { getPersonaFormErrors } from "../validation/persona-validation";

export default function EditPersonaForm({ persona }: { persona: PersonaDto }) {
  const router = useRouter();
  const [updatedProject, setUpdatedProject] = useState(
    persona.project ?? undefined
  );
  const [state, formAction] = useFormState(onSubmit, null);

  const personalLifeInfos = getPersonalLifeInfos(persona, state);
  const jobInfos = getJobInfos(persona, state);

  async function onDeleteProject() {
    setUpdatedProject(undefined);
  }

  async function onAddProject(project: ProjectDto) {
    setUpdatedProject(project);
  }

  async function onSubmit(
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

    const errors = getPersonaFormErrors(currentState, rawFormData);

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
      project: updatedProject,
    };

    const data = await updatePersona(updatedPersona);

    goToPageDetails(data.id as string);
  }

  function goToPageDetails(personaId: string) {
    router.replace("/personas/" + personaId);
    router.refresh();
  }

  return (
    <form action={formAction} className="flex flex-col gap-8 text-purple-800">
      <div className="flex justify-start items-start gap-16">
        <div className="basis-1/4 flex flex-col justify-center items-center gap-4">
          <PersonaSectionAvatar mode="edit" image={persona.image} />
          <div className="flex flex-col gap-12 w-full">
            <PersonaSectionLinkedProject
              onAdd={onAddProject}
              onDelete={onDeleteProject}
              mode="edit"
              project={updatedProject}
            />
            <div className="flex flex-col gap-20 w-full">
              <SecondaryTitle title="Characteristics" />
              <PersonaSectionCharacteristics mode="edit" persona={persona} />
            </div>
          </div>
        </div>

        <div className="basis-3/4 flex flex-col gap-8">
          <div className="flex justify-between items-start gap-8 w-full">
            <InputWithHiddenLabel
              className="text-5xl font-extrabold text-orange-900 bg-transparent"
              label="Project name"
              inputId="title"
              errorMessage={state?.errors.name}
              defaultValue={persona.name}
            />
            <div className="flex justify-end items-start gap-8">
              <ButtonSecondary
                element="link"
                label="Cancel"
                elementProps={{ href: "../" }}
              />
              <ButtonPrimary
                element="button"
                elementProps={{ type: "submit" }}
                label="Save changes"
              />
            </div>
          </div>
          <InputWithHiddenLabel
            className="text-xl font-medium bg-white p-4 rounded"
            label="Story"
            inputId="story"
            errorMessage={state?.errors.story}
            defaultValue={persona.story}
          />
          <PersonalInformationsRow mode="edit" cells={personalLifeInfos} />
          <PersonalInformationsJobHeader mode="edit" persona={persona} />
          <PersonalInformationsRow mode="edit" cells={jobInfos} />
          <PersonaSectionMultiInfos
            mode="edit"
            title="Culture"
            entity={persona.culture}
          />
          <PersonaSectionMultiInfos
            mode="edit"
            title="Emotions"
            entity={persona.emotions}
          />
        </div>
      </div>
    </form>
  );
}

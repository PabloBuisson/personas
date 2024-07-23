"use client";

import { PersonaDto, ProjectDto } from "@/app/api";
import InputWithHiddenLabel from "../common/InputWithHiddenLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { handleUpdatePersona } from "@/app/actions/persona-actions";

export default function EditPersonaForm({ persona }: { persona: PersonaDto }) {
  const [updatedProject, setUpdatedProject] = useState(
    persona.project ?? undefined
  );

  const updatePersona = handleUpdatePersona.bind(null, {
    ...persona,
    project: updatedProject,
  });
  const [state, formAction] = useFormState(updatePersona, null);

  const personalLifeInfos = getPersonalLifeInfos(persona, state);
  const jobInfos = getJobInfos(persona, state);

  async function onDeleteProject() {
    setUpdatedProject(undefined);
  }

  async function onAddProject(project: ProjectDto) {
    setUpdatedProject(project);
  }

  useEffect(() => {
    if (state?.errors.errorMessage) {
      toast.error(
        `Oops! Something went wrong. Error message: ${state.errors.errorMessage}. Please try again later.`,
        {
          duration: 5000,
        }
      );
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-8 text-purple-800">
      <div className="flex justify-start items-start gap-16">
        <div className="basis-1/4 flex flex-col justify-center items-center gap-4">
          <PersonaSectionAvatar mode="edit" image={persona.avatar} />
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
              className="text-5xl font-extrabold text-orange-900 bg-transparent rounded"
              label="Name of the persona"
              inputId="name"
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

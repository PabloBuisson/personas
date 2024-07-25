import { Metadata } from "next";

import { PersonaDto } from "@/app/api";
import { getPersonaById } from "@/app/api/endpoints";
import PersonaSectionAvatar from "@/components/UI/PersonaSectionAvatar";
import PersonaSectionCharacteristics from "@/components/UI/PersonaSectionCharacteristics";
import PersonaSectionLinkedProject from "@/components/UI/PersonaSectionLinkedProject";
import PersonaSectionMultiInfos from "@/components/UI/PersonaSectionMultiInfos";
import SecondaryTitle from "@/components/UI/SecondaryTitle";
import PersonalInformationsBlockView from "@/components/UI/PersonalInformationsBlockView";
import ButtonDeleteItem from "@/components/buttons/ButtonDeleteItem";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

export const metadata: Metadata = {
  title: "Persona details",
};

export default async function Persona({
  params,
}: {
  params: { personaId: string };
}) {
  const personaId = params.personaId;

  let persona: PersonaDto = await getPersonaById(personaId);

  return (
    <main className="p-0 pt-8 md:p-16 md:pt-8 flex flex-col gap-8 w-full text-purple-800">
      <div className="w-full flex flex-wrap justify-center 2xl:justify-end gap-8 mb-8 2xl:mb-0">
        <ButtonPrimary
          element="link"
          label="Edit Persona"
          elementProps={{ href: "edit" }}
          className="grow md:grow 2xl:grow-0"
        />
        {persona.id && (
          <ButtonDeleteItem
            item="persona"
            itemId={persona.id}
            className="grow md:grow 2xl:grow-0"
          />
        )}
      </div>
      <div className="flex flex-col 2xl:flex-row justify-start items-start gap-16">
        <div className="basis-auto 2xl:basis-1/4 w-full 2xl:w-auto flex flex-col justify-center items-center gap-4">
          <PersonaSectionAvatar mode="view" image={persona.avatar} />
          <div className="flex flex-col gap-[8.4rem] w-full">
            <PersonaSectionLinkedProject
              mode="view"
              project={persona.project}
            />
          </div>
        </div>

        <div className="basis-auto 2xl:basis-3/4 w-full 2xl:w-auto flex flex-col gap-8">
          <div className="flex justify-between gap-8 w-full">
            <h1 className="text-5xl font-extrabold text-orange-900">
              {persona.name}
            </h1>
          </div>
          <p className="text-xl font-medium bg-white p-4 rounded">
            {persona.story}
          </p>
          <PersonalInformationsBlockView persona={persona} />
        </div>
      </div>

      <div className="flex flex-col 2xl:flex-row justify-start items-start gap-16">
        <div className="basis-auto 2xl:basis-1/4 flex flex-col gap-20 w-full">
          <SecondaryTitle title="Characteristics" />
          <PersonaSectionCharacteristics mode="view" persona={persona} />
        </div>

        <div className="basis-auto 2xl:basis-3/4 flex flex-col gap-8">
          <PersonaSectionMultiInfos
            mode="view"
            title="Culture"
            entity={persona.culture}
          />
          <PersonaSectionMultiInfos
            mode="view"
            title="Emotions"
            entity={persona.emotions}
          />
        </div>
      </div>
    </main>
  );
}

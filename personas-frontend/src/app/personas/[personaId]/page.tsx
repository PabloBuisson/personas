import { PersonaDto } from "@/app/api";
import { getPersonaById } from "@/app/api/endpoints";
import PersonaSectionAvatar from "@/components/UI/PersonaSectionAvatar";
import PersonaSectionCharacteristics from "@/components/UI/PersonaSectionCharacteristics";
import PersonaSectionLinkedProject from "@/components/UI/PersonaSectionLinkedProject";
import PersonaSectionMultiInfos from "@/components/UI/PersonaSectionMultiInfos";
import PersonaSectionMultiInfosTitle from "@/components/UI/PersonaSectionMultiInfosTitle";
import PersonalInformationsBlockView from "@/components/UI/PersonalInformationsBlockView";
import ButtonDeleteItem from "@/components/buttons/ButtonDeleteItem";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import PersonaSecondaryInfosBlock from "@/components/forms/common/PersonaSecondaryInfosBlock";
import CreatePersonaForm from "@/components/forms/create/CreatePersonaForm";

export default async function Persona({
  params,
  searchParams,
}: {
  params: { personaId: string };
  searchParams: { project?: string };
}) {
  const personaId = params.personaId;
  const projectId = isNaN(Number(searchParams.project))
    ? undefined
    : Number(searchParams.project);

  if (personaId === "new") {
    return (
      <main className="p-16">
        <CreatePersonaForm projectId={projectId} />
      </main>
    );
  }

  let persona: PersonaDto = await getPersonaById(personaId);

  return (
    <main className="p-16 flex flex-col gap-8 w-full text-purple-800">
      <div className="flex justify-start items-start gap-16">
        <div className="basis-1/4 flex flex-col justify-center items-center gap-4">
          <PersonaSectionAvatar mode="view" image={persona.image} />
          <div className="flex flex-col gap-[8.4rem] w-full">
            <PersonaSectionLinkedProject
              mode="view"
              project={persona.project}
            />
            <div className="flex flex-col gap-20 w-full">
              <PersonaSectionMultiInfosTitle title="Characteristics" />
              <PersonaSectionCharacteristics mode="view" persona={persona} />
            </div>
          </div>
        </div>

        <div className="basis-3/4 flex flex-col gap-8">
          <div className="flex justify-between gap-8 w-full">
            <h1 className="text-5xl font-extrabold text-orange-900">
              {persona.name}
            </h1>
            <div className="flex justify-end gap-8">
              <ButtonPrimary
                element="link"
                label="Edit Persona"
                elementProps={{ href: "edit" }}
              />
              {persona.id && (
                <ButtonDeleteItem item="persona" itemId={persona.id} />
              )}
            </div>
          </div>
          <p className="text-xl font-medium bg-white p-4 rounded">
            {persona.story}
          </p>
          <PersonalInformationsBlockView persona={persona} />
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

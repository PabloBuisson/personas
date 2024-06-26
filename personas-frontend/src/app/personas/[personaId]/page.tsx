import { PersonaDto } from "@/app/api";
import { getPersonaById } from "@/app/api/endpoints";
import ButtonLinkPrimary from "@/components/buttons/ButtonLinkPrimary";
import CreatePersonaForm from "@/components/forms/CreatePersonaForm";

export default async function Persona({
  params,
  searchParams,
}: {
  params: { personaId: string };
  searchParams: { project?: string };
}) {
  const personaId = params.personaId;
  const projectId = isNaN(Number(searchParams.project)) ? undefined : Number(searchParams.project);

  if (personaId === "new") {
    return (
      <main className="p-16">
        <CreatePersonaForm projectId={projectId} />
      </main>
    );
  }

  let persona: PersonaDto = await getPersonaById(personaId);

  console.log("Persona project id = ", persona.project?.id);

  return (
    <main className="p-16 flex flex-col gap-8">
      <div className="flex justify-between items-start gap-16">
        <div className="bg-gray-300 rounded-full w-28 h-28 flex justify-center items-center">
          {persona.image && (
            <span className="text-6xl" role="image">
              {persona.image}
            </span>
          )}
        </div>
        <div className="flex justify-end gap-8">
          <ButtonLinkPrimary label="Edit Persona" href={"edit"} />
        </div>
      </div>
      <h1 className="text-5xl font-extrabold">{persona.name}</h1>
      <p className="text-xl font-medium">{persona.story}</p>
      <p className="text-xl font-medium">Age : {persona.age}</p>
    </main>
  );
}

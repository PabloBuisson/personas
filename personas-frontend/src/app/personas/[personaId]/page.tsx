import { PersonaDto } from "@/app/api";
import { getPersonaById } from "@/app/api/endpoints";
import PersonalInformationsBlockView from "@/components/UI/PersonalInformationsBlockView";
import ButtonDeleteItem from "@/components/buttons/ButtonDeleteItem";
import ButtonLinkPrimary from "@/components/buttons/ButtonLinkPrimary";
import ProjectCard from "@/components/cards/ProjectCard";
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

  console.log("Persona project = ", persona.project);

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
          {persona.id && (
            <ButtonDeleteItem item="persona" itemId={persona.id} />
          )}
        </div>
      </div>
      <h1 className="text-5xl font-extrabold">{persona.name}</h1>
      <p className="text-xl font-medium">{persona.story}</p>
      <PersonalInformationsBlockView persona={persona} />
      {persona.project && (
        <section>
          <ul className="flex flex-wrap gap-16">
            <ProjectCard key={persona.id} project={persona.project} />
          </ul>
        </section>
      )}
    </main>
  );
}

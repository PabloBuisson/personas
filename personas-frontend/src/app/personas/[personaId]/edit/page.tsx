import { PersonaDto } from "@/app/api";
import { getPersonaById } from "@/app/api/endpoints";
import EditPersonaForm from "@/components/forms/edit/EditPersonaForm";

export default async function EditPersona({
  params,
}: {
  params: { personaId: string };
}) {
  const personaId = params.personaId;

  // TODO get cached Project ?
  let persona: PersonaDto = await getPersonaById(personaId);

    return (
      <main className="p-16 flex flex-col gap-8">
        <EditPersonaForm persona={persona} />
      </main>
    );
}

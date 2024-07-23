import { PersonaDto } from "@/app/api";
import { getPersonas } from "@/app/api/endpoints";
import PersonaCard from "../cards/PersonaCard";
import CreatePersonaCard from "../cards/CreatePersonaCard";

export default async function PersonaList() {
  let personas: PersonaDto[] = await getPersonas();

  if (personas && personas.length > 0) {
    return (
      <ul className="flex flex-wrap gap-16">
        <CreatePersonaCard id="new" />
        {personas.map((project: any) => (
          <PersonaCard key={project.id} persona={project} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <p className="text-lg">No persona to display (yet) !</p>
      <ul className="flex">
        <CreatePersonaCard id="new" />
      </ul>
    </>
  );
}

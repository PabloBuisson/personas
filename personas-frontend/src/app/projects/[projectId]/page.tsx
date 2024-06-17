import { ProjectDto } from "@/app/api";
import CreatePersonaCard from "@/components/CreatePersonaCard";
import PersonaCard from "@/components/PersonaCard";
import Tag from "@/components/Tag";

export default async function Project({
  params,
}: {
  params: { projectId: string };
}) {
  const projectId = params.projectId;

  let project: ProjectDto;
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/projects/${projectId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  project = await response.json();

  return (
    <main className="p-16 flex flex-col gap-8">
      <div className="bg-gray-300 rounded-full w-28 h-28"></div>
      <h1 className="text-5xl font-extrabold">{project.name}</h1>
      <p className="text-xl font-medium">{project.description}</p>
      <section className="mt-8 flex flex-col gap-12">
        {project?.tags && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag.id} id={tag.id} name={tag.label} size="text-sm" />
            ))}
          </ul>
        )}
        <ul className="flex flex-wrap gap-16">
          <CreatePersonaCard key={"new-persona"} />
          {project?.personas && (
            <>
              {project.personas.map((persona) => (
                <PersonaCard key={persona.id} persona={persona} />
              ))}
            </>
          )}
        </ul>
      </section>
    </main>
  );
}

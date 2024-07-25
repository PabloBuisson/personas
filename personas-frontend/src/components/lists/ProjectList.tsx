import { ProjectDto } from "@/app/api";
import { getProjects } from "@/app/api/endpoints";
import ProjectCard from "../cards/ProjectCard";
import CreateProjectCard from "../cards/CreateProjectCard";

export default async function ProjectList({ tagId }: { tagId?: number }) {
  let projects: ProjectDto[] = await getProjects(tagId);

  if (projects && projects.length > 0) {
    return (
      <ul className="flex flex-wrap items-stretch gap-16">
        <CreateProjectCard id="new" />
        {projects.map((project: any) => (
          <ProjectCard
            key={project.id}
            project={project}
            className="w-[30ch]"
          />
        ))}
      </ul>
    );
  }

  return (
    <>
      <p className="text-lg">No project to display (yet) !</p>
      <ul className="flex">
        <CreateProjectCard id="new" />
      </ul>
    </>
  );
}

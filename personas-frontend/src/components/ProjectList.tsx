import { ProjectDto } from "@/app/api";
import ProjectCard from "./ProjectCard";
import { getProjects } from "@/app/api/endpoints";

export default async function ProjectList({ tagId }: { tagId?: number }) {
  let projects: ProjectDto[] = await getProjects(tagId);

  return (
    projects &&
    projects.length > 0 && (
      <ul className="flex flex-wrap gap-8">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    )
  );
}

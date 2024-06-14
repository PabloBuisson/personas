import { ProjectDto } from "@/app/api";
import ProjectCard from "./ProjectCard";

export default async function ProjectList() {
  let projects: ProjectDto[];
  const response = await fetch(`${process.env.BACKEND_API_URL}/projects`, {
    cache: "no-store",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  projects = await response.json();

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

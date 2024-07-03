import Link from "next/link";
import { ProjectDto } from "@/app/api";
import Tag from "../tags/Tag";
import ButtonPrimary from "../buttons/ButtonPrimary";

export default function ProjectCard({
  project,
  onDelete,
}: {
  project: ProjectDto;
  onDelete?: (projectId: number | undefined) => void;
}) {
  const cardContent = (
    <>
      <div className="absolute flex justify-center items-center top-0 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-gray-50 w-16 h-16 rounded-full border-[0.1em] border-gray-300">
        {project.icon && (
          <span className="text-4xl" role="image">
            {project.icon}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4 px-4 py-3 border-[0.1em] border-white">
        <h2 className="text-xl font-bold mt-6">
          {project.name ?? "Untitled project"}
        </h2>
        <p>{project.description ?? "No description"}</p>
        {project?.tags && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag.id} id={tag.id} name={tag.label} size="text-sm" />
            ))}
          </ul>
        )}
      </div>
    </>
  );

  return (
    <li
      className="text-base font-medium flex flex-col justify-center gap-4"
      key={project.id}
    >
      <article className="flex justify-center items-center h-full w-full bg-gray-300 border-[0.2em] border-gray-300 rounded-lg">
        {!onDelete && (
          <Link className="relative p-1" href={`/projects/${project.id}`}>
            {cardContent}
          </Link>
        )}
        {onDelete && <div className="relative p-1">{cardContent}</div>}
      </article>
      {onDelete && (
        <ButtonPrimary
          element="button"
          label="Unlink persona from project"
          elementProps={{ type: "button", onClick: () => onDelete(project.id) }}
        />
      )}
    </li>
  );
}

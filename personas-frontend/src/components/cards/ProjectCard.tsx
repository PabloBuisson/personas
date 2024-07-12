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
      <div className="absolute flex justify-center items-center top-0 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-purple-25 w-16 h-16 rounded-full border-[0.125em] border-purple-200">
        {project.icon && (
          <span className="text-4xl" role="image">
            {project.icon}
          </span>
        )}
      </div>
      <div className="flex flex-col justify-between gap-8 h-full px-4 py-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold mt-7">
            {project.name ?? "Untitled project"}
          </h2>
          <p>{project.description ?? "No description"}</p>
        </div>
        {project?.tags && (
          <ul className="flex flex-wrap items-baseline gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              // TODO improve logic with ch width
              <Tag key={tag.id} id={tag.id} name={tag.label} size="text-sm" />
            ))}
            {project.tags.length > 2 && <li className="text-sm ml-2">...</li>}
          </ul>
        )}
      </div>
      <div className="-z-50 absolute top-[-0.5rem] left-[-0.5rem] w-[calc(100%+1rem)] h-[calc(100%+1rem)] bg-purple-200 [clip-path:polygon(2rem_0%,_calc(100%-2rem)_0%,_100%_2rem,_100%_calc(100%-2rem),_calc(100%-2rem)_100%,_2rem_100%,_0%_calc(100%-2rem),_0%_2rem)] noisy-background"></div>
    </>
  );

  return (
    <li
      className="text-base font-medium flex flex-col justify-center gap-4"
      key={project.id}
    >
      <article className="flex justify-center items-center h-full w-[30ch] text-purple-800 border-[0.15em] border-white relative">
        <div className="bg-transparent border-transparent border-r-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute top-[calc(-1rem-0.35em)] left-[calc(-1rem-0.2em)] rotate-45"></div>
        <div className="bg-transparent border-transparent border-l-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute top-[calc(-1rem-0.35em)] right-[calc(-1rem-0.2em)] rotate-[-45deg]"></div>
        <div className="bg-transparent border-transparent border-r-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute bottom-[calc(-1rem-0.35em)] left-[calc(-1rem-0.2em)] rotate-[-45deg]"></div>
        <div className="bg-transparent border-transparent border-l-white border-[0.15em] w-[calc(2rem+0.4em)] h-[calc(2rem+0.7em)] absolute bottom-[calc(-1rem-0.35em)] right-[calc(-1rem-0.2em)] rotate-45"></div>
        {!onDelete && (
          <Link
            className="relative p-1 w-full h-full"
            href={`/projects/${project.id}`}
          >
            {cardContent}
          </Link>
        )}
        {onDelete && (
          <div className="relative p-1 w-full h-full">{cardContent}</div>
        )}
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

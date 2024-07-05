import { ProjectDto } from "@/app/api";
import ProjectCard from "../cards/ProjectCard";

type PersonaSectionLinkedProjectProps =
  | PersonaEditSectionLinkedProject
  | PersonaViewSectionLinkedProject;

type PersonaEditSectionLinkedProject = {
  mode: "edit";
  project?: ProjectDto;
  onDelete: (projectId: number | undefined) => void;
};

type PersonaViewSectionLinkedProject = {
  mode: "view";
  project?: ProjectDto;
};

export default function PersonaSectionLinkedProject(
  props: PersonaSectionLinkedProjectProps
) {
  return (
    <section className="flex flex-col justify-start items-start gap-12">
      <div className="flex items-center justify-start gap-4">
        <span
          aria-hidden
          className="text-5xl font-semibold text-darkorange-500 flex items-center justify-center"
        >
          +
        </span>
        <h2 className="text-3xl text-orange-900 font-semibold">
          Linked project
        </h2>
      </div>
      {props.mode === "view" && props.project && (
        <ProjectCard project={props.project} />
      )}
      {props.mode === "view" && !props.project && <p>Not linked project !</p>}
      {props.mode === "edit" && props.project && (
        <ProjectCard onDelete={props.onDelete} project={props.project} />
      )}
      {props.mode === "edit" && !props.project && (
        <p>Not linked project ! Add one.</p>
      )}
    </section>
  );
}

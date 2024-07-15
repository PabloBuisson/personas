"use client";

import { ProjectDto } from "@/app/api";
import ProjectCard from "../cards/ProjectCard";
import SecondaryTitle from "./SecondaryTitle";
import ProjectSelector from "../selectors/project-selector";
import { useEffect, useState } from "react";
import { getProjects } from "@/app/api/endpoints";

type PersonaSectionLinkedProjectProps =
  | PersonaEditSectionLinkedProject
  | PersonaViewSectionLinkedProject;

type PersonaEditSectionLinkedProject = {
  mode: "edit";
  project?: ProjectDto;
  onDelete: (projectId: number | undefined) => void;
  onAdd: (project: ProjectDto) => void;
};

type PersonaViewSectionLinkedProject = {
  mode: "view";
  project?: ProjectDto;
};

export default function PersonaSectionLinkedProject(
  props: PersonaSectionLinkedProjectProps
) {
  const [projects, setProjects] = useState([] as ProjectDto[]);

  const missingProject = (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="py-4 px-5 bg-orange-25 text-orange-900 w-full">
        {`No linked project (yet) !`}
      </p>
      {props.mode === "edit" && (
        <ProjectSelector
          projects={projects}
          onProjectClick={(projectId) => {
            props.onAdd(projects.find((p) => p.id === projectId) as ProjectDto);
          }}
        />
      )}
    </div>
  );

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projects = await getProjects();
        setProjects(projects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section
      className={`flex flex-col justify-start items-start z-10 ${
        !props.project ? "gap-8" : "gap-12"
      }`}
    >
      <SecondaryTitle title="Linked project" />
      {!props.project && missingProject}
      {props.mode === "view" && props.project && (
        <ProjectCard project={props.project} />
      )}
      {props.mode === "edit" && props.project && (
        <ProjectCard onDelete={props.onDelete} project={props.project} />
      )}
    </section>
  );
}

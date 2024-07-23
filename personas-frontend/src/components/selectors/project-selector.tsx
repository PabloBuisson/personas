"use client";

import { useEffect, useState } from "react";

import { ProjectDto } from "@/app/api";
import ButtonPrimary from "../buttons/ButtonPrimary";

type ProjectSelectorProps = {
  onProjectClick: (projectId: number) => void;
  projects?: ProjectDto[];
};

export default function ProjectSelector(props: ProjectSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      const pickerContainer = document.getElementById(
        "project-picker-container"
      );

      if (!pickerContainer?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, []);

  function handleClick(projectId: number) {
    props.onProjectClick(projectId);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <ButtonPrimary
        element="button"
        label="Add a project"
        elementProps={{ onClick: () => setIsOpen(true), type: "button" }}
      />
      <dialog
        open={isOpen}
        id="project-picker-container"
        className="absolute top-14 right-0 text-base w-[31em] h-[20em] p-4 rounded-lg border border-orange-200 overflow-auto"
      >
        <ul className="flex flex-wrap gap-4">
          {props.projects &&
            props.projects.map(
              (project) =>
                project.id && (
                  <li key={project.id}>
                    <button
                      type="button"
                      className="h-[14ch] w-[14ch]"
                      onClick={() => handleClick(project.id as number)}
                    >
                      <div className="flex flex-col gap-2 items-center bg-purple-200 hover:bg-purple-600 h-full w-full p-3 rounded-md">
                        <div className="flex shrink-0 justify-center items-center bg-purple-25 w-[2em] h-[2em] rounded-full border-[0.125em] border-purple-200">
                          {project.icon && (
                            <span className="text-2xl" role="image">
                              {project.icon}
                            </span>
                          )}
                        </div>
                        <p className="break-all hyphens-auto min-w-0">
                          {project.name}
                        </p>
                      </div>
                    </button>
                  </li>
                )
            )}
        </ul>
      </dialog>
    </div>
  );
}

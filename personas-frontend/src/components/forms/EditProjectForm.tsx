"use client";

import { ProjectDto } from "@/app/api";
import ButtonLinkSecondary from "../buttons/ButtonLinkSecondary";
import Tag from "../Tag";
import InputWithHiddenLabel from "./InputWithHiddenLabel";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useRef, useState } from "react";
import { updateProject } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";

export default function EditProjectForm({ project }: { project: ProjectDto }) {
  const [updatedTags, setUpdatedTags] = useState(project.tags ?? []);
  const inputTagRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  function deleteTag(tagIndex: number) {
    setUpdatedTags(updatedTags?.filter((_tag, index) => index !== tagIndex));
  }

  function addTag() {
    const tagLabel = inputTagRef.current;

    if (tagLabel && tagLabel.value) {
      setUpdatedTags([...updatedTags, { label: tagLabel.value }]);
      tagLabel.value = "";
    }
  }

  async function onSubmit(formData: FormData) {
    console.log("Submitted", formData);

    const rawFormData = {
      icon: formData.get("icon"),
      name: formData.get("title"),
      description: formData.get("description"),
    };

    const updatedProject: ProjectDto = {
      id: project.id,
      icon: rawFormData.icon as string,
      name: rawFormData.name as string,
      description: rawFormData.description as string,
      tags: updatedTags,
    };

    const data = await updateProject(updatedProject);

    router.replace("../");
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-8">
      <div className="flex justify-between items-start gap-16">
        <div className="bg-gray-300 rounded-full w-28 h-28 flex justify-center items-center">
          {project.icon && (
            <span className="text-6xl" role="image">
              {project.icon}
            </span>
          )}
        </div>

        <div className="flex justify-end gap-8">
          <ButtonLinkSecondary label="Cancel" href={"../"} />
          <ButtonPrimary type="submit" label="Save changes" />
        </div>
      </div>
      <InputWithHiddenLabel
        className="text-5xl font-extrabold bg-transparent"
        label="Project name"
        inputId="title"
        defaultValue={project.name}
      />
      <InputWithHiddenLabel
        className="text-xl font-medium bg-transparent"
        label="Description"
        inputId="description"
        defaultValue={project.description}
      />
      <section className="mt-8 flex flex-col gap-12">
        {updatedTags && (
          <ul className="flex flex-wrap gap-2">
            {updatedTags.map((tag, index) => (
              <Tag
                onDelete={() => deleteTag(index)}
                index={index}
                key={tag.id ?? `${tag.label.trim().toLocaleLowerCase}${index}`}
                id={tag.id}
                name={tag.label}
                size="text-sm"
              />
            ))}
            <input id="new-tag" ref={inputTagRef} name="new-tag"></input>
            <button type="button" onClick={addTag}>
              Add a tag
            </button>
          </ul>
        )}
      </section>
    </form>
  );
}

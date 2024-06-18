import { handleCreateProject } from "@/app/actions/project-actions";

import InputWithLabel from "./InputWithLabel";
import ButtonPrimary from "../buttons/ButtonPrimary";

export default function CreateProjectForm() {
  return (
    <form action={handleCreateProject} className="flex flex-col gap-8">
      <section className="bg-gray-300 relative rounded-full w-28 h-28">
        <button type="button" aria-label="Change emoticon">
          <div className="bg-gray-50 absolute bottom-0 right-0 rounded-full w-12 h-12"></div>
        </button>
      </section>
      <section className="flex flex-col gap-8">
        <InputWithLabel label="Name of the project" inputId="title" />
        <InputWithLabel
          label="Describe the project"
          inputId="description"
          withLongText={true}
        />
        <InputWithLabel label="Tags" inputId="tags" />
      </section>
      <ButtonPrimary type="submit" label="Create project" />
    </form>
  );
}

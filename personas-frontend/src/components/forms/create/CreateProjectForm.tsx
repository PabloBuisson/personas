import { handleCreateProject } from "@/app/actions/project-actions";

import InputWithLabel from "../common/InputWithLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import AppEmojiPicker from "@/components/UI/AppEmojiPicker";
import InputEmoji from "../common/InputEmoji";

export default function CreateProjectForm() {
  return (
    <form action={handleCreateProject} className="flex flex-col gap-8">
      <section className="bg-gray-300 relative flex justify-center items-center rounded-full w-28 h-28">
        <InputEmoji name="icon" />
      </section>
      <section className="flex flex-col gap-8">
        <InputWithLabel label="Name of the project" inputId="title" />
        <InputWithLabel
          label="Describe the project"
          inputId="description"
          withLongText={true}
        />
        <InputWithLabel
          label="Tags"
          inputId="tags"
          informationMessage="💡 Separate your tags with blank space, commas, or any special character (, ; . - _ / \ |)"
        />
      </section>
      <ButtonPrimary
        element="button"
        elementProps={{ type: "submit" }}
        label="Create project"
      />
    </form>
  );
}

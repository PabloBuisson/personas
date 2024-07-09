import InputWithLabel from "../common/InputWithLabel";
import ButtonPrimary from "../../buttons/ButtonPrimary";
import { handleCreatePersona } from "@/app/actions/persona-actions";
import InputEmoji from "../common/InputEmoji";

export default function CreatePersonaForm({
  projectId,
}: {
  projectId?: number;
}) {
  const createPersona = handleCreatePersona.bind(null, projectId);

  return (
    <form action={createPersona} className="flex flex-col gap-8">
      <section className="bg-gray-300 relative flex justify-center items-center rounded-full w-28 h-28">
        <InputEmoji name="icon" value="😎" />
      </section>
      <section className="flex flex-col gap-8">
        <InputWithLabel label="Name of the persona" inputId="name" />
        <InputWithLabel
          label="What is the story of the persona ?"
          inputId="story"
          withLongText={true}
        />
        <InputWithLabel
          label="How old is the persona ?"
          inputId="age"
          informationMessage="💡 You can give a ballpark (i.e 15-25 years)"
        />
      </section>
      <ButtonPrimary
        element="button"
        elementProps={{ type: "submit" }}
        label="Create persona"
      />
    </form>
  );
}

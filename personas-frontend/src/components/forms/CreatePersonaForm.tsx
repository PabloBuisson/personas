import InputWithLabel from "./InputWithLabel";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { handleCreatePersona } from "@/app/actions/persona-actions";

export default function CreatePersonaForm({
  projectId,
}: {
  projectId?: number;
}) {
  const createPersona = handleCreatePersona.bind(null, projectId);

  return (
    <form action={createPersona} className="flex flex-col gap-8">
      <section className="bg-gray-300 relative flex justify-center items-center rounded-full w-28 h-28">
        <input
          name="icon"
          className="min-w-0 text-6xl bg-transparent p-0 text-center cursor-default focus-visible:outline-none"
          size={1}
          type="text"
          value="💡"
          readOnly
        />
        <button type="button" aria-label="Change emoticon">
          <div className="bg-gray-50 absolute bottom-0 right-0 translate-x-[50%] rounded-full w-12 h-12"></div>
        </button>
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
      <ButtonPrimary type="submit" label="Create persona" />
    </form>
  );
}

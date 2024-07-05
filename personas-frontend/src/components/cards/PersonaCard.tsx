import Link from "next/link";

import { PersonaDto } from "@/app/api";
import ButtonPrimary from "../buttons/ButtonPrimary";

export default function PersonaCard({
  persona,
  onDelete,
}: {
  persona: PersonaDto;
  onDelete?: (personaId: string | undefined) => void;
}) {
  const cardContent = (
    <>
      <div className="absolute flex justify-center items-center top-0 translate-y-[-25%] left-1/2 translate-x-[-50%] bg-pink-100 w-16 h-16 rounded-full border-[0.125em] border-pink-500">
        {persona.image && (
          <span className="text-4xl" role="image">
            {persona.image}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4 pl-8 pr-10 pt-6 pb-10 border-[0.2em] border-pink-100 border-dotted outline outline-[0.125em] outline-pink-100 outline-offset-[-0.75rem]">
        <h2 className="text-xl font-bold mt-6">
          {persona.name ?? "Untitled project"}
        </h2>
        <p className="flex items-center gap-2">
          <span className="text-pink-100">♦</span>
          {persona.age ?? "Age unknown"}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-pink-100">♦</span>
          {persona.job?.title ?? "Job unknown"}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-pink-100">♦</span>
          {persona.location ?? "Location unknown"}
        </p>
        <p className="flex items-center gap-2">
          <span className="text-pink-100">♦</span>
          {persona.family ?? "Family situation unknown"}
        </p>
      </div>
    </>
  );

  return (
    <li
      className="text-base font-medium flex flex-col justify-center gap-4"
      key={persona.id}
    >
      <article className="flex justify-center items-center h-full w-full bg-pink-500 text-pink-900 noisy-background">
        {!onDelete && (
          <Link className="relative p-2" href={`/personas/${persona.id}`}>
            {cardContent}
          </Link>
        )}
        {onDelete && <div className="relative p-1">{cardContent}</div>}
      </article>
      {onDelete && (
        <ButtonPrimary
          element="button"
          label="Delete from project"
          elementProps={{ type: "button", onClick: () => onDelete(persona.id) }}
        />
      )}
    </li>
  );
}

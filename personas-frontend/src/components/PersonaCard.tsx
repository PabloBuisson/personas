import Link from "next/link";

import { PersonaDto } from "@/app/api";

export default function PersonaCard({ persona }: { persona: PersonaDto }) {
  return (
    <li className="text-base font-medium" key={persona.id}>
      <article className="flex justify-center items-center h-full w-full bg-gray-300 border-[0.2em] border-gray-300 rounded-lg">
        <Link className="relative p-1" href={`/personas/${persona.id}`}>
          <div className="absolute flex justify-center items-center top-0 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-gray-50 w-16 h-16 rounded-full border-[0.1em] border-gray-300">
            {persona.image && (
              <span className="text-4xl" role="image">
                {persona.image}
              </span>
            )}
          </div>{" "}
          <div className="flex flex-col gap-4 px-4 py-3 border-[0.1em] border-white">
            <h2 className="text-xl font-bold mt-6">
              {persona.name ?? "Untitled project"}
            </h2>
            <p>{persona.age ?? "Age unknown"}</p>
            <p>{persona.job?.title ?? "Job unknown"}</p>
            <p>{persona.location ?? "Location unknown"}</p>
            <p>{persona.family ?? "Family situation unknown"}</p>
          </div>
        </Link>
      </article>
    </li>
  );
}

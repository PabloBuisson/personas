import Link from "next/link";
import AppIcon from "../UI/AppIcon";

export default function CreatePersonaCard({
  id,
  projectId,
}: {
  id: string;
  projectId?: number;
}) {
  return (
    <li className="text-base font-medium" key={id}>
      <article className="flex justify-center items-center h-full w-full bg-pink-200 text-pink-900 noisy-background">
        <Link
          className="relative p-2 h-full w-full min-h-[30ch] min-w-[30ch]"
          href={`/personas/new${projectId ? "?project=" + projectId : ""}`}
        >
          <div className="absolute flex justify-center items-center top-0 translate-y-[-25%] left-1/2 translate-x-[-50%] bg-pink-100 w-16 h-16 rounded-full border-[0.125em] border-pink-200 overflow-hidden">
            <div aria-hidden className="text-2xl text-pink-200">?</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 h-full pl-8 pr-10 pt-6 pb-10 border-[0.2em] border-pink-100 border-dotted outline outline-[0.125em] outline-pink-100 outline-offset-[-0.75rem]">
            <div className="flex flex-col items-center gap-2">
              <AppIcon
                icon="mdi:plus"
                className="text-4xl font-semibold text-white"
              />
              <h2 className="text-xl font-bold">Add a persona</h2>
            </div>
          </div>
        </Link>
      </article>
    </li>
  );
}

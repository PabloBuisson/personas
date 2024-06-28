import Link from "next/link";

export default function CreatePersonaCard({
  id,
  projectId,
}: {
  id: string;
  projectId?: number;
}) {
  return (
    <li className="text-base font-medium" key={id}>
      <article className="flex justify-center items-center h-full w-full bg-gray-300 border-[0.2em] border-gray-300 rounded-lg">
        <Link
          className="relative p-1 h-full"
          href={`/personas/new${projectId ? "?project=" + projectId : ""}`}
        >
          <div className="absolute top-0 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-gray-50 w-16 h-16 rounded-full border-[0.1em] border-gray-300"></div>
          <div className="h-full flex flex-col items-center justify-center gap-2 px-4 py-3 border-[0.1em] border-white">
            <div className="mx-auto text-5xl font-bold text-white">+</div>
            <h2 className="text-xl font-bold">Add a persona</h2>
          </div>
        </Link>
      </article>
    </li>
  );
}

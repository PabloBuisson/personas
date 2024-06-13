import Tag from "@/components/Tag";
import Link from "next/link";

export default function Projects() {
  return (
    <main className="p-16 flex flex-col gap-16">
      <h1 className="text-5xl font-extrabold">My projects</h1>
      <div className="flex flex-col gap-12">
        <ul className="flex flex-wrap gap-8">
          {["Dnd", "Marketing", "Sport", "Writing", "UX"].map((tag) => (
            <Tag key={tag} id={tag} name={tag} size="text-base" link={tag} />
          ))}
        </ul>
        <ul className="flex flex-wrap gap-8">
          {[
            {
              id: "1",
              icon: "X",
              title: "DnD campaign S03",
              description: "Characters of the new campaign (WIP)",
              tags: ["Dnd", "Marketing", "Sport", "Writing", "UX"],
            },
            {
              id: "1",
              icon: "X",
              title: "DnD campaign S03",
              description: "Characters of the new campaign (WIP)",
              tags: ["Dnd", "Marketing", "Sport", "Writing", "UX"],
            },
            {
              id: "1",
              icon: "X",
              title: "DnD campaign S03",
              description: "Characters of the new campaign (WIP)",
              tags: ["Dnd", "Marketing", "Sport", "Writing", "UX"],
            },
          ].map((project) => {
            return (
              <li className="text-base font-medium" key={project.id}>
                <article className="flex justify-center items-center h-full w-full bg-gray-300 border-[0.2em] border-gray-300 rounded-lg">
                  <Link className="relative p-1" href={`${project.id}`}>
                    <div className="absolute top-0 translate-y-[-50%] left-1/2 translate-x-[-50%] bg-gray-50 w-16 h-16 rounded-full border-[0.1em] border-gray-300"></div>
                    <div className="flex flex-col gap-4 px-4 py-3 border-[0.1em] border-white">
                      <h2 className="text-xl font-bold mt-6">
                        {project.title ?? "Untitled project"}
                      </h2>
                      <p>{project.description ?? "No description"}</p>
                      <ul className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Tag key={tag} id={tag} name={tag} size="text-sm" />
                        ))}
                      </ul>
                    </div>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

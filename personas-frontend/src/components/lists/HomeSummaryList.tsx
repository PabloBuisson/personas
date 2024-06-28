import Link from "next/link";

export default function HomeSummaryList({
  targetName,
}: {
  targetName: "projects" | "personas";
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-8">
        <h2 className="text-3xl font-semibold">
          Last created {targetName ?? "projects"}
        </h2>
        <Link
          className="text-lg font-bold underline underline-offset-4 decoration-2"
          href={`${"/" + targetName ?? "projects"}`}
        >
          See all
        </Link>
      </div>
      <div>
        <ul className="flex flex-wrap gap-8">
          {[1, 2, 3, 4].map((element) => {
            return (
              <li className="w-56 h-56 bg-gray-300" key={element}>
                <Link className="block w-full h-full" href={`/${targetName ?? "projects"}/${element}`}>
                  {"Project " + element}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

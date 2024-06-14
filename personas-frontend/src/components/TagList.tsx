import Tag from "./Tag";
import { TagDto } from "@/app/api";

export default async function TagList() {
  let tags: TagDto[];
  const response = await fetch(`${process.env.BACKEND_API_URL}/tags`, {
    cache: "no-store",
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  tags = await response.json();

  return (
    tags &&
    tags.length > 0 && (
      <ul className="flex flex-wrap gap-8">
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.label}
            size="text-base"
            link={`?tag=${tag.id}`}
          />
        ))}
      </ul>
    )
  );
}

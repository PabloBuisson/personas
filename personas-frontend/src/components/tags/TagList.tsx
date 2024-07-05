import { getTags } from "@/app/api/endpoints";
import Tag from "./Tag";
import { TagDto } from "@/app/api";

export default async function TagList() {
  let tags: TagDto[] = await getTags();

  return (
    tags &&
    tags.length > 0 && (
      <ul className="flex flex-wrap gap-4">
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

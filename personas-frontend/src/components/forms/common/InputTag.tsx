import { TagDto } from "@/app/api";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import Tag from "@/components/tags/Tag";
import { useRef } from "react";

type InputTagProps = {
  tags: TagDto[];
  setTags: React.Dispatch<React.SetStateAction<TagDto[]>>;
};

export default function InputTag({ tags, setTags }: InputTagProps) {
  const inputTagRef = useRef<HTMLInputElement | null>(null);

  function deleteTag(tagIndex: number) {
    setTags(tags?.filter((_tag, index) => index !== tagIndex));
  }

  function addTag() {
    const tagLabel = inputTagRef.current;

    if (tagLabel && tagLabel.value) {
      setTags([...tags, { label: tagLabel.value }]);
      tagLabel.value = "";
    }
  }

  return (
    <>
      {tags && (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag
              onDelete={() => deleteTag(index)}
              index={index}
              key={tag.id ?? `${tag.label.trim().toLocaleLowerCase}${index}`}
              id={tag.id}
              name={tag.label}
              size="text-sm"
            />
          ))}
        </ul>
      )}
      <div className="flex gap-4 items-stretch">
        <input
          className="px-2 py-1 text-sm font-normal rounded-md"
          id="new-tag"
          ref={inputTagRef}
          name="new-tag"
        ></input>
        <ButtonPrimary
          additionalCSS="text-sm"
          element="button"
          label="Add a tag"
          elementProps={{
            type: "button",
            onClick: addTag,
            style: { padding: "0.25em 1em" },
          }}
        />
      </div>
    </>
  );
}

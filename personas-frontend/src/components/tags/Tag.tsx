import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

import AppIcon from "../UI/AppIcon";
import { HTMLProps } from "react";
import { cn } from "@/app/utils/utils";

export default function Tag({
  id,
  name,
  size,
  className,
  index,
  link,
  onDelete,
}: {
  id: any;
  name: string;
  size: "text-sm" | "text-base" | "text-lg";
  className?: HTMLProps<HTMLElement>["className"];
  index?: number;
  link?: Url;
  onDelete?: (tagId: number) => void;
}) {
  const nameLower = name.toLowerCase();

  if (link) {
    return (
      <li
        className={cn(
          `bg-orange-25 border-[0.15em] border-orange-200 rounded-lg font-medium`,
          size,
          className
        )}
        key={id}
      >
        <Link className="block px-[1em] py-[0.3em]" href={link}>
          {nameLower}
        </Link>
      </li>
    );
  }

  if (!!onDelete && typeof index === "number") {
    return (
      <li
        className={cn(
          `bg-orange-25 border-[0.15em] border-orange-200 pl-[1em] pr-[0.5em] py-[0.3em] rounded-lg font-medium`,
          size,
          className
        )}
        key={id}
      >
        <button
          type="button"
          className="flex justify-between items-center gap-4"
          onClick={() => onDelete(index)}
        >
          {nameLower}
          <span className="sr-only">Delete tag named {name}</span>
          <AppIcon
            icon="mdi:close"
            className="text-xl font-semibold text-darkorange-500"
          />
        </button>
      </li>
    );
  }

  return (
    <li
      className={cn(
        `bg-orange-25 border-[0.15em] border-orange-200 px-[1em] py-[0.3em] rounded-lg font-medium`,
        size,
        className
      )}
      key={id}
    >
      {nameLower}
    </li>
  );
}

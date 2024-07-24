"use client";

import { useRouter } from "next/navigation";
import { HTMLProps } from "react";

import { deletePersona, deleteProject } from "@/app/api/endpoints";
import { cn } from "@/app/utils/utils";

type ButtonDeleteProps =
  | {
      item: "project";
      itemId: number;
      className?: HTMLProps<HTMLElement>["className"];
    }
  | {
      item: "persona";
      itemId: string;
      className?: HTMLProps<HTMLElement>["className"];
    };

export default function ButtonDeleteItem({
  item,
  itemId,
  className,
}: ButtonDeleteProps) {
  const router = useRouter();

  async function handleDeleteItem() {
    if (item === "project") {
      await deleteProject(itemId);

      router.replace("/projects");
      router.refresh();
    }

    if (item === "persona") {
      await deletePersona(itemId);

      router.replace("/personas");
      router.refresh();
    }
  }

  return (
    <button
      className={cn(
        "bg-red-800 hover:bg-red-900 text-red-100 border-[0.2em] border-red-600 px-[1.6em] py-[1.2em] rounded-lg grow md:grow-0 text-center",
        className
      )}
      type="button"
      onClick={handleDeleteItem}
    >
      Delete {item}
    </button>
  );
}

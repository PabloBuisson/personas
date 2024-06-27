"use client";

import { deletePersona, deleteProject } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";

type ButtonDeleteProps =
  | {
      item: "project";
      itemId: number;
    }
  | {
      item: "persona";
      itemId: string;
    };

export default function ButtonDeleteItem({ item, itemId }: ButtonDeleteProps) {
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
      className="bg-red-700 hover:bg-red-800 text-white border-[0.2em] border-red-700 px-[1.6em] py-[1.2em] rounded-lg"
      type="button"
      onClick={handleDeleteItem}
    >
      Delete {item}
    </button>
  );
}

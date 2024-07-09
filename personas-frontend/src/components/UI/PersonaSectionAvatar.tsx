"use client";

import { useState } from "react";
import AvatarSelector from "../selectors/avatar-selector";
import AppIcon from "./AppIcon";

export default function PersonaSectionAvatar({
  image,
  mode,
}: {
  image: string | undefined;
  mode: "edit" | "view";
}) {
  const [avatar, setAvatar] = useState<string | undefined>(image);

  if (mode === "edit") {
    return (
      <>
        <div className="bg-white relative rounded-full w-36 h-36 flex justify-center items-center z-10">
          <input
            name="icon"
            className="min-w-0 text-6xl bg-transparent p-0 text-center cursor-default focus-visible:outline-none"
            size={1}
            type="text"
            value={avatar}
            readOnly
          />
        </div>
        <div className="flex gap-4 justify-between items-start mb-8">
          <AvatarSelector onAvatarClick={(avatar) => setAvatar(avatar)} />
          <button
            type="button"
            className="text-4xl bg-purple-25 py-2 px-3 rounded text-purple-600 flex justify-center items-center"
            aria-label="Change theme color"
          >
            <AppIcon icon="mdi:palette-outline" />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white relative rounded-full w-36 h-36 flex justify-center items-center">
        {image && (
          <span className="text-6xl" role="image">
            {image}
          </span>
        )}
      </div>
      <div className="flex gap-4 justify-between mb-8">
        <button
          type="button"
          className="text-4xl bg-orange-25 py-2 px-3 rounded text-darkorange-600 flex justify-center"
          aria-label="Change avatar"
        >
          <AppIcon icon="mdi:face-man-outline" />
        </button>
        <button
          type="button"
          className="text-4xl bg-purple-25 py-2 px-3 rounded text-purple-600 flex justify-center items-center"
          aria-label="Change theme color"
        >
          <AppIcon icon="mdi:palette-outline" />
        </button>
      </div>
    </>
  );
}

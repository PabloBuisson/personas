"use client";

import { useState } from "react";
import AvatarSelector from "../selectors/avatar-selector";
import AppIcon from "./AppIcon";
import Image from "next/image";

export default function PersonaSectionAvatar({
  image,
  mode,
}: {
  image: string | undefined;
  mode: "edit" | "view";
}) {
  const [avatar, setAvatar] = useState<string | undefined>(image);

  if (mode === "edit") {
    //TODO become a separate client component
    return (
      <>
        <div className="bg-white relative rounded-full w-36 h-36 flex justify-center items-center z-10 overflow-hidden border-white border-8">
          <input
            name="avatar"
            className="hidden"
            size={1}
            type="text"
            onChange={(e) => setAvatar(e.target.value)}
            value={avatar}
          />
          {avatar && (
            <Image
              src={`/avatars/${avatar}.svg`}
              fill={true}
              alt="Picture of the avatar"
            />
          )}
        </div>
        <div className="flex gap-4 justify-between items-start mb-8 z-20">
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
      <div className="bg-white relative rounded-full w-36 h-36 flex justify-center items-center overflow-hidden border-white border-8 mb-[6.25rem]">
        {image && (
          <Image
            src={`/avatars/${image}.svg`}
            priority={true}
            fill={true}
            alt="Picture of the avatar"
          />
        )}
      </div>
    </>
  );
}

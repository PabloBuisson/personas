"use client";

import { useState } from "react";
import AppIcon from "../UI/AppIcon";

type AvatarSelectorProps = {
  onAvatarClick: (avatar: string) => void;
};

export default function AvatarSelector(props: AvatarSelectorProps) {
  const avatars = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊"];

  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(emoji: string) {
    console.log("handleClick", emoji);
    setSelectedEmoji(emoji);
    props.onAvatarClick(emoji);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="text-4xl bg-orange-25 py-2 px-3 rounded text-darkorange-600 flex justify-center"
        aria-label="Change avatar"
        onClick={() => setIsOpen(true)}
      >
        <AppIcon icon="mdi:face-man-outline" />
      </button>
      <dialog
        open={isOpen}
        className="absolute top-14 right-0 text-3xl w-[20ch] p-4 rounded-lg border border-orange-200"
      >
        <ul className="flex flex-wrap gap-4">
          {avatars.map((emoji) => (
            <li className="" key={emoji}>
              <button type="button" onClick={() => handleClick(emoji)}>
                {emoji}
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </div>
  );
}

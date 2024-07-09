"use client";

import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import AppIcon from "./AppIcon";

type AppEmojiPickerProps = {
  onEmojiClick: (emoji: string) => void;
};

export default function AppEmojiPicker(props: AppEmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleEmojiClick($event: any) {
    props.onEmojiClick($event.emoji);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      const emojiPickerContainer = document.getElementById(
        "emoji-picker-container"
      );

      if (!emojiPickerContainer?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center text-2xl w-full h-full text-darkorange-600 bg-orange-25 rounded-full"
        aria-label="Open picker"
        onClick={() => setIsOpen(true)}
      >
        <AppIcon icon="mdi:face-man-outline" />
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        <EmojiPicker
          previewConfig={{ showPreview: false }}
          onEmojiClick={handleEmojiClick}
        />
      </div>
    </>
  );
}

"use client";

import AppEmojiPicker from "@/components/UI/AppEmojiPicker";
import { useState } from "react";

export default function InputEmoji({
  name,
  value,
}: {
  name: string;
  value?: string;
}) {
  const [emojiValue, setEmojiValue] = useState(value ?? "💡");

  function handleEmojiClick(emoji: string) {
    setEmojiValue(emoji);
  }

  return (
    <>
      <input
        name={name}
        className="min-w-0 text-6xl bg-transparent p-0 text-center cursor-default focus-visible:outline-none"
        size={1}
        type="text"
        value={emojiValue}
        readOnly
      />
      <div
        id="emoji-picker-container"
        className="bg-gray-50 absolute bottom-0 right-0 translate-x-[50%] rounded-full w-12 h-12"
      >
        <AppEmojiPicker onEmojiClick={handleEmojiClick} />
      </div>
    </>
  );
}

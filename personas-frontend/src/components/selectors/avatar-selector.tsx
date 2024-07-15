"use client";

import { useEffect, useState } from "react";
import AppIcon from "../UI/AppIcon";
import { getAvatarsInfos } from "../forms/settings/personal-informations-settings";
import Image from "next/image";

type AvatarSelectorProps = {
  onAvatarClick: (avatar: string) => void;
};

export default function AvatarSelector(props: AvatarSelectorProps) {
  const avatars = getAvatarsInfos();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      const avatarPickerContainer = document.getElementById(
        "avatar-picker-container"
      );

      if (!avatarPickerContainer?.contains(event.target)) {
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

  function handleClick(avatar: string) {
    props.onAvatarClick(avatar);
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
        id="avatar-picker-container"
        className="absolute top-14 right-0 text-3xl w-[38rem] h-[19rem] p-4 rounded-lg border border-orange-200 overflow-auto"
      >
        <ul className="flex flex-wrap gap-4">
          {avatars.map(({ key, path, description, name }) => (
            <li className="" key={key}>
              <button
                type="button"
                className="h-32 w-32 relative"
                onClick={() => handleClick(name)}
              >
                <Image src={path} fill={true} alt={description} />
                {/* TODO add a description of each avatar */}
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </div>
  );
}

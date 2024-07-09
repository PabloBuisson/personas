"use client";

import { Icon, IconifyIcon, IconifyIconHTMLElement, IconifyIconProps } from "@iconify-icon/react/dist/iconify.mjs";
import { RefAttributes } from "react";

type AppIconProps = RefAttributes<IconifyIconHTMLElement> & Omit<IconifyIconProps, "ref">;

export default function AppIcon(props: AppIconProps) {
  return <Icon {...props} />;
}

export type AppIconNameProps = string | IconifyIcon;
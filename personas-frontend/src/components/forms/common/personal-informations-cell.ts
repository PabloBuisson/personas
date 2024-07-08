import { IconifyIcon } from "@iconify-icon/react/dist/iconify.mjs";

export type PersonalInformationsCell = {
  order: number;
  icon: string | IconifyIcon;
  label: string;
  name: string;
  value: string | number | undefined;
};
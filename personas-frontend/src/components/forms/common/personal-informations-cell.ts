import { AppIconNameProps } from "@/components/UI/AppIcon";

export type PersonalInformationsCell = {
  order: number;
  icon: AppIconNameProps;
  label: string;
  name: string;
  value: string | number | undefined;
};
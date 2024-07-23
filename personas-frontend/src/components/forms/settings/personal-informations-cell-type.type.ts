import { AppIconNameProps } from "@/components/UI/AppIcon";
import { ErrorMessageInput } from "./form-actions-settings-type.type";

export type PersonalInformationsCell = {
  order: number;
  icon: AppIconNameProps;
  label: string;
  name: string;
  value: string | number | undefined;
  errorMessage?: ErrorMessageInput;
};

import { PersonaDto } from "@/app/api";
import {
  FormDataForEntity,
  ErrorMessageCreateUpdate,
  FormStateCreateUpdatePersona,
} from "../settings/form-actions-settings";

export function getPersonaFormErrors(
  currentState: FormStateCreateUpdatePersona | undefined,
  formData: FormDataForEntity<PersonaDto>
): {
  errors: ErrorMessageCreateUpdate<PersonaDto>;
} | null {
  const errors: ErrorMessageCreateUpdate<PersonaDto> = {};

  if (!formData.name || formData.name.toString().trim().length === 0) {
    errors.name = "Name is required";
  }

  if (!formData.story || formData.story.toString().trim().length === 0) {
    errors.story = "Story is required";
  }

  if (!formData.age || formData.age.toString().trim().length === 0) {
    errors.age = "Age is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return null;
}

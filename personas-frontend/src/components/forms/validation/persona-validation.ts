import { PersonaDto } from "@/app/api";
import {
  FormDataForEntity,
  ErrorMessageCreateUpdate,
  FormStateCreateUpdatePersona,
} from "../settings/form-actions-settings-type.type";

export function getPersonaFormErrors(
  currentState: FormStateCreateUpdatePersona | undefined,
  formData: FormDataForEntity<PersonaDto>
): {
  errors: ErrorMessageCreateUpdate<PersonaDto>;
} | null {
  const errors: ErrorMessageCreateUpdate<PersonaDto> = {};
  const timestamp = Date.now();

  if (!formData.name || formData.name.toString().trim().length === 0) {
    errors.name = { message: "Name is required", timestamp };
  }

  if (!formData.story || formData.story.toString().trim().length === 0) {
    errors.story = { message: "Story is required", timestamp };
  }

  if (!formData.age || formData.age.toString().trim().length === 0) {
    errors.age = { message: "Age is required", timestamp };
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return null;
}

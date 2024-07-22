import { ProjectDto } from "@/app/api";
import {
  FormDataForEntity,
  ErrorMessageCreateUpdate,
  FormStateCreateUpdateProject,
} from "../settings/form-actions-settings-type.type";

export function getProjectFormErrors(
  currentState: FormStateCreateUpdateProject | undefined,
  formData: FormDataForEntity<ProjectDto>
): {
  errors: ErrorMessageCreateUpdate<ProjectDto>;
} | null {
  const errors: ErrorMessageCreateUpdate<ProjectDto> = {};
  const timestamp = Date.now();

  if (!formData.name || formData.name.toString().trim().length === 0) {
    errors.name = { message: "Name is required", timestamp };
  }

  if (
    !formData.description ||
    formData.description.toString().trim().length === 0
  ) {
    errors.description = { message: "Description is required", timestamp };
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return null;
}

import { ProjectDto } from "@/app/api";
import {
  FormDataForEntity,
  ErrorMessageCreateUpdate,
  FormStateCreateUpdateProject,
} from "../settings/form-actions-settings";

export function getProjectFormErrors(
  currentState: FormStateCreateUpdateProject | undefined,
  formData: FormDataForEntity<ProjectDto>
): {
  errors: ErrorMessageCreateUpdate<ProjectDto>;
} | null {
  const errors: ErrorMessageCreateUpdate<ProjectDto> = {};

  if (!formData.name || formData.name.toString().trim().length === 0) {
    errors.name = "Name is required";
  }

  if (
    !formData.description ||
    formData.description.toString().trim().length === 0
  ) {
    errors.description = "Description is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return null;
}

import { PersonaDto, ProjectDto } from "@/app/api";

export type FormStateCreateUpdatePersona = {
  errors: ErrorMessageCreateUpdate<PersonaDto>;
} | null;

export type FormStateCreateUpdateProject = {
  errors: ErrorMessageCreateUpdate<ProjectDto>;
} | null;

export type ErrorMessageCreateUpdate<T> = {
  [K in keyof T]?: { message: string, timestamp: number };
} & { errorMessage?: string; successMessage?: string };

export type FormDataForEntity<T> = {
  [K in keyof T]?: FormDataEntryValue | null;
};

export type ErrorMessageInput = {
  message: string;
  timestamp: number;
};

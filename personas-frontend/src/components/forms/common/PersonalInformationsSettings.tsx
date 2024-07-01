import { PersonaDto } from "@/app/api";
import { PersonalInformationsCell } from "./PersonalInformationsRow";

export function getPersonalLifeInfos(
  persona: PersonaDto
): PersonalInformationsCell[] {
  return [
    { order: 1, icon: "🎂", label: "Age", name: "age", value: persona.age },
    {
      order: 2,
      icon: "📍",
      label: "Location",
      name: "location",
      value: persona.location,
    },
    {
      order: 3,
      icon: "😎",
      label: "Family",
      name: "family",
      value: persona.family,
    },
  ];
}

export function getJobInfos(persona: PersonaDto): PersonalInformationsCell[] {
  return [
    {
      order: 1,
      icon: "💵",
      label: "Salary",
      name: "salary",
      value: persona.job?.salary,
    },
    {
      order: 2,
      icon: "🏢",
      label: "Company",
      name: "company",
      value: persona.job?.company,
    },
    {
      order: 3,
      icon: "🏭",
      label: "Industry",
      name: "industry",
      value: persona.job?.industry,
    },
  ];
}
import {
  CultureFavoritesDto,
  EmotionalMotivationsDto,
  PersonaDto,
} from "@/app/api";
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

export function getCultureInfos(
  data?: CultureFavoritesDto
): PersonalInformationsCell[] {
  if (!data) return [];

  return [
    {
      order: 1,
      icon: "🎬",
      label: "Movies",
      name: "movies",
      value: data.movies,
    },
    {
      order: 2,
      icon: "📚",
      label: "Books",
      name: "books",
      value: data.books,
    },
    {
      order: 3,
      icon: "🦸‍♂️",
      label: "Comics",
      name: "comics",
      value: data.comics,
    },
    {
      order: 4,
      icon: "📺",
      label: "Tv",
      name: "tv",
      value: data.tv,
    },
    {
      order: 4,
      icon: "🎵",
      label: "Music",
      name: "music",
      value: data.music,
    },
    {
      order: 4,
      icon: "🎮",
      label: "Games",
      name: "games",
      value: data.games,
    },
  ];
}

export function getEmotionsInfos(
  data?: EmotionalMotivationsDto
): PersonalInformationsCell[] {
  if (!data) return [];

  return [
    {
      order: 1,
      icon: "🔥",
      label: "Passions",
      name: "passions",
      value: data.passions,
    },
    {
      order: 2,
      icon: "🎯",
      label: "Goals",
      name: "goals",
      value: data.goals,
    },
    {
      order: 3,
      icon: "😄",
      label: "Joys",
      name: "joys",
      value: data.joys,
    },
    {
      order: 4,
      icon: "😱",
      label: "Fears",
      name: "fears",
      value: data.fears,
    },
    {
      order: 5,
      icon: "😡",
      label: "Frustrations",
      name: "frustrations",
      value: data.frustrations,
    },
    {
      order: 6,
      icon: "🔄",
      label: "Habits",
      name: "habits",
      value: data.habits,
    },
  ];
}

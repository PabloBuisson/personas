import {
  CultureFavoritesDto,
  EmotionalMotivationsDto,
  PersonaDto,
} from "@/app/api";
import { PersonalInformationsCell } from "./personal-informations-cell";

export function getCharacteristicsInfos(
  persona: PersonaDto
): PersonalInformationsCell[] {
  return [
    {
      order: 1,
      icon: "mdi:school",
      label: "Education",
      name: "education",
      value: persona.education,
    },
    {
      order: 2,
      icon: "mdi:brain",
      label: "Personality",
      name: "personality",
      value: persona.personalityTraits,
    },
    {
      order: 3,
      icon: "mdi:instagram",
      label: "Idols",
      name: "idols",
      value: persona.idols,
    },
    {
      order: 4,
      icon: "mdi:tag-heart",
      label: "Brands",
      name: "brands",
      value: persona.brands,
    },
  ];
}

export function getPersonalLifeInfos(
  persona: PersonaDto
): PersonalInformationsCell[] {
  return [
    {
      order: 1,
      icon: "mdi:cake-variant-outline",
      label: "Age",
      name: "age",
      value: persona.age,
    },
    {
      order: 2,
      icon: "mdi:location-radius-outline",
      label: "Location",
      name: "location",
      value: persona.location,
    },
    {
      order: 3,
      icon: "mdi:family-room-outline",
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
      icon: "mdi:piggy-bank-outline",
      label: "Salary",
      name: "salary",
      value: persona.job?.salary,
    },
    {
      order: 2,
      icon: "mdi:office-building-outline",
      label: "Company",
      name: "company",
      value: persona.job?.company,
    },
    {
      order: 3,
      icon: "mdi:storefront-outline",
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
      icon: "mdi:movie-open",
      label: "Movies",
      name: "movies",
      value: data.movies,
    },
    {
      order: 2,
      icon: "mdi:bookshelf",
      label: "Books",
      name: "books",
      value: data.books,
    },
    {
      order: 3,
      icon: "mdi:comic-bubble",
      label: "Comics",
      name: "comics",
      value: data.comics,
    },
    {
      order: 4,
      icon: "mdi:tv-classic",
      label: "Tv",
      name: "tv",
      value: data.tv,
    },
    {
      order: 4,
      icon: "mdi:music",
      label: "Music",
      name: "music",
      value: data.music,
    },
    {
      order: 4,
      icon: "mdi:google-gamepad",
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
      icon: "mdi:heart",
      label: "Passions",
      name: "passions",
      value: data.passions,
    },
    {
      order: 2,
      icon: "mdi:target-arrow",
      label: "Goals",
      name: "goals",
      value: data.goals,
    },
    {
      order: 3,
      icon: "mdi:smiley",
      label: "Joys",
      name: "joys",
      value: data.joys,
    },
    {
      order: 4,
      icon: "mdi:emoticon-frown",
      label: "Fears",
      name: "fears",
      value: data.fears,
    },
    {
      order: 5,
      icon: "mdi:emoticon-angry",
      label: "Frustrations",
      name: "frustrations",
      value: data.frustrations,
    },
    {
      order: 6,
      icon: "mdi:clock-time-three-outline",
      label: "Habits",
      name: "habits",
      value: data.habits,
    },
  ];
}
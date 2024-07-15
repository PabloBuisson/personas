import { CultureFavoritesDto, EmotionalMotivationsDto } from "@/app/api";
import {
  getCultureInfos,
  getEmotionsInfos,
} from "../forms/common/personal-informations-settings";
import PersonaSecondaryInfosBlock from "../forms/common/PersonaSecondaryInfosBlock";
import SecondaryTitle from "./SecondaryTitle";
import { PersonalInformationsCell } from "../forms/common/personal-informations-cell";

type PersonaSectionMultiInfosProps = {
  mode: "view" | "edit";
} & (CultureInfosProps | EmotionsInfosProps);

type CultureInfosProps = {
  title: "Culture";
  entity: CultureFavoritesDto | undefined;
};

type EmotionsInfosProps = {
  title: "Emotions";
  entity: EmotionalMotivationsDto | undefined;
};

export default function PersonaSectionMultiInfos(
  infos: PersonaSectionMultiInfosProps
) {
  let infosData: PersonalInformationsCell[] = [];

  if (infos.title === "Culture") {
    infosData = getCultureInfos(infos.entity);
  } else if (infos.title === "Emotions") {
    infosData = getEmotionsInfos(infos.entity);
  }

  return (
    <section className="flex flex-col gap-20">
      <div className="flex items-center justify-start gap-4">
        <SecondaryTitle title={infos.title} />
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-20">
        {infosData.map((info) => (
          <PersonaSecondaryInfosBlock
            mode={infos.mode}
            label={info.label}
            name={info.name}
            value={info.value}
            icon={info.icon}
            key={info.name}
            id={info.name}
          />
        ))}
      </div>
    </section>
  );
}

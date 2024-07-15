import { PersonaDto } from "@/app/api";
import { PersonalInformationsCell } from "../forms/settings/personal-informations-cell";
import { getCharacteristicsInfos } from "../forms/settings/personal-informations-settings";
import PersonaSecondaryInfosBlock from "../forms/common/PersonaSecondaryInfosBlock";

export type PersonaSectionCharacteristics = {
  persona: PersonaDto;
  mode: "edit" | "view";
};

export default function PersonaSectionCharacteristics(
  props: PersonaSectionCharacteristics
) {
  const infos: PersonalInformationsCell[] = getCharacteristicsInfos(
    props.persona
  );
  return (
    <>
      {infos.map((info) => (
        <PersonaSecondaryInfosBlock
          key={info.name}
          mode={props.mode}
          label={info.label}
          name={info.name}
          value={info.value}
          icon={info.icon}
          id={info.name}
          isStandalone={true}
        />
      ))}
    </>
  );
}

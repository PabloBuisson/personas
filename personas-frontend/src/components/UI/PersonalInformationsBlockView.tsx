import { PersonaDto } from "@/app/api";
import PersonalInformationsRow from "../forms/common/PersonalInformationsRow";
import {
  getJobInfos,
  getPersonalLifeInfos,
} from "../forms/settings/personal-informations-settings";
import PersonalInformationsJobHeader from "../forms/common/PersonalInformationsJobHeader";

export default function PersonalInformationsBlockView({
  persona: persona,
}: {
  persona: PersonaDto;
}) {
  const personalLifeInfos = getPersonalLifeInfos(persona);
  const jobInfos = getJobInfos(persona);
  const modeView = "view";
  return (
    <>
      <PersonalInformationsRow mode={modeView} cells={personalLifeInfos} />
      <PersonalInformationsJobHeader mode={modeView} persona={persona} />
      <PersonalInformationsRow mode={modeView} cells={jobInfos} />
    </>
  );
}

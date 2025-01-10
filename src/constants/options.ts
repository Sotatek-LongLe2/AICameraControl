import { AnnouncementType, PrimaryFundingRound } from "src/constants/enumBE";
import { ANNOUNCEMENT_INFO } from "./announcement";

export const FUNDING_ROUNDs = [
  {
    label: "Seed",
    value: PrimaryFundingRound.SEED,
  },
  {
    label: "Pre Series A",
    value: PrimaryFundingRound.PRE_SERIES_A,
  },
  {
    label: "Series A",
    value: PrimaryFundingRound.SERIES_A,
  },
  {
    label: "Series B",
    value: PrimaryFundingRound.SERIES_B,
  },
  {
    label: "Series C",
    value: PrimaryFundingRound.SERIES_C,
  },
  {
    label: "Series D+",
    value: PrimaryFundingRound.SERIES_D,
  },
];

export const ANNOUNCEMENT_TYPE = Object.keys(ANNOUNCEMENT_INFO).map((key) => ({
  icon: ANNOUNCEMENT_INFO[key as unknown as AnnouncementType].icon,
  value: key,
  label: ANNOUNCEMENT_INFO[key as unknown as AnnouncementType].title,
}));

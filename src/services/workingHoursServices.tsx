import { MeridiemType } from "../interfaces/workingHoursInterface";

export const getMeridiem = (
  value: string | undefined,
  fallback: MeridiemType
): MeridiemType => {
  return (value?.toUpperCase() as MeridiemType) || fallback;
};

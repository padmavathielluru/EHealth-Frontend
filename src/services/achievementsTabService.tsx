import { Achievement } from "../interfaces/achievementsTabInterface";
import { ACHIEVEMENTS_DATA } from "../utils/AchievementsTabConstants";

export const getAchievements = async (): Promise<Achievement[]> => {
  return ACHIEVEMENTS_DATA;
};

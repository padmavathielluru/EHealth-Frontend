import { RESEARCH_PROJECT_LIST } from "../utils/ResearchProjectTabConstants";
import { ResearchProjectItem } from "../interfaces/researchProjectTabInterface";

export const getResearchProjects = (): ResearchProjectItem[] => {
    return RESEARCH_PROJECT_LIST;
}
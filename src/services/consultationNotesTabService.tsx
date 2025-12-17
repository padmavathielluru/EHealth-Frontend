import { HistoryItem } from "../interfaces/consultationNotesTabInterface";
import { historyData } from "../utils/ConsultationNotesTabConstants";

export const getConsultationNotesHistory = (): HistoryItem[] => {
    return historyData;
};

export const getConsultationByCid = ( cid: string): HistoryItem | undefined => {
    return historyData.find((item) => item.cid === cid);
};
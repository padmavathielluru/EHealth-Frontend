import { recentRecordsData } from "../utils/recentRecordsConstants";
import { RecentRecord } from "../interfaces/recentRecordsInterface";

export const recentRecordsService = {
    getRecentRecords(): Promise<RecentRecord[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(recentRecordsData);
            }, 300);
        });
    },
};
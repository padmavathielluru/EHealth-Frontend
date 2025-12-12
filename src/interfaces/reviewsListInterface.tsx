
export interface ReviewItem {
    id: number;
    name: string;
    role: string;
    date: String;
    avatar: string;
    rating: number;
    review?: string;
    description?: string;
}
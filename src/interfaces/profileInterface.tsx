
export interface Profile {
    id: string;
    name: string;
    specialty: string;
    status: "ACTIVE" | "INACTIVE";
    email: string;
    phone: string;
    image: string;
}
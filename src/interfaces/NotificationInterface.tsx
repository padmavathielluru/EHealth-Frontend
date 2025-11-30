export type notificationType = "ALL" | "Appointments" | "Chat" |"App";

export interface notificationInterface {
  id: number;
  name: string;
  status: string;
  description: string;
  date: Date;
  type: string;
  img: string;
  iconBg:string;
}

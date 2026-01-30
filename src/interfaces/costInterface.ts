import { UseFormRegister } from "react-hook-form";
import { CostFormType } from "../schemas/schema";

export interface CurrencyInputProps {
  label: string;
 fieldName: 
    | `inClinic.${keyof CostFormType["inClinic"]}`
    | `video.${keyof CostFormType["video"]}`
    | `homeVisit.${keyof CostFormType["homeVisit"]}`;
  currencies: string[];
  register: UseFormRegister<CostFormType>;
  error?: string;
}

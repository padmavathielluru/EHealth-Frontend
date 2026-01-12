import { UseFormRegister } from "react-hook-form";
import { CostFormType } from "../components/commonComponents/schema";

export interface CurrencyInputProps {
  label: string;
  fieldName: keyof CostFormType;
  currencies: string[];
  register: UseFormRegister<CostFormType>;
  error?: string;
}

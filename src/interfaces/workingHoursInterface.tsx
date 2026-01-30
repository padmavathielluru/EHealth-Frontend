import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

export interface WorkingHoursProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  trigger: UseFormTrigger<T>;
  errors: FieldErrors<T>;
}
export type MeridiemType = "AM" | "PM";

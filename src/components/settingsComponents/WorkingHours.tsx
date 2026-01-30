import React from "react";
import TimeInputField from "../commonComponents/TimeInputField";
import { FormSchemaType } from "../commonComponents/schema";
import { WorkingHoursProps } from "../../interfaces/workingHoursInterface";
import {
  DEFAULT_FROM_MERIDIEM,
  DEFAULT_TO_MERIDIEM,
  ARROW_ICON,
} from "../../utils/WorkingHoursConstants";
import { getMeridiem } from "../../services/workingHoursServices";

const WorkingHours: React.FC<WorkingHoursProps<FormSchemaType>> = ({
  register,
  setValue,
  watch,
  errors,
  trigger,
}) => {
  return (
    <div className="mt-6">
      <p className="text-sm text-gray-400">Working Hours</p>

      <div className="flex items-center gap-4">
        <TimeInputField
          label="From Time"
          name="fromTime"
          meridiemName="fromMeridiem"
          register={register}
          setValue={setValue}
          value={watch("fromTime") || ""}
          meridiem={getMeridiem(
            watch("fromMeridiem"),
            DEFAULT_FROM_MERIDIEM
          )}
          trigger={trigger}
        />

        <img
          src={ARROW_ICON}
          alt="arrow"
          className="w-5 h-5 mt-8"
        />

        <TimeInputField
          label="To Time"
          name="toTime"
          meridiemName="toMeridiem"
          register={register}
          setValue={setValue}
          value={watch("toTime") || ""}
          meridiem={getMeridiem(
            watch("toMeridiem"),
            DEFAULT_TO_MERIDIEM
          )}
          trigger={trigger}
        />
      </div>
    </div>
  );
};

export default WorkingHours;

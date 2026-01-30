import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import TimeInputField from "../../commonComponents/TimeInputField";

interface Props {
  label: string;
  fieldName: "slots" | "breaks";
  startLabel: string;
  endLabel: string;
  error?: any;
}

const TimeRangeRow: React.FC<Props> = ({
  label,
  fieldName,
  startLabel,
  endLabel,
  error,
}) => {
  const { register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<any>();


  const { fields, append, remove } = useFieldArray({
    name: fieldName,
  });

  const fieldErrors = errors?.[fieldName] as
    | {
      startTime?: { message?: string };
      endTime?: { message?: string };
    }[]
    | undefined;

  const addRow = () => {
    append({
      startTime: "",
      startMeridiem: "AM",
      endTime: "",
      endMeridiem: "PM",
    });
  };

  const resetRow = (index: number) => {
    setValue(
      `${fieldName}.${index}`,
      {
        startTime: "",
        startMeridiem: "AM",
        endTime: "",
        endMeridiem: "PM",
      },
      { shouldDirty: true, shouldTouch: true, shouldValidate: true }
    );
  };
  const slotError =
    (errors?.[fieldName]?.root as any)?.message ||
    (errors?.[fieldName] as any)?.message;


  return (
    <div className=" ">
      <label className="text-sm font-medium text-gray-400 mb-1">
        {label?.replace("*", "")}
        {label?.includes("*") && <span className="text-red-500 ml-1">*</span>}
      </label>

      {slotError && (
        <p className="text-red-500 text-sm mt-1">
          {slotError}
        </p>
      )}

      <div className="border rounded-xl p-4 space-y-4 max-h-[160px] overflow-y-auto">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-4">
            <div className="">
              <TimeInputField
                label={startLabel}
                name={`${fieldName}.${index}.startTime`}
                meridiemName={`${fieldName}.${index}.startMeridiem`}
                value={watch(`${fieldName}.${index}.startTime`)}
                meridiem={watch(`${fieldName}.${index}.startMeridiem`) || "AM"}
                register={register}
                setValue={setValue} />
              {fieldErrors?.[index]?.startTime && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors[index].startTime?.message}
                </p>
              )}
            </div>
            <div className="">
              <TimeInputField
                label={endLabel}
                name={`${fieldName}.${index}.endTime`}
                meridiemName={`${fieldName}.${index}.endMeridiem`}
                value={watch(`${fieldName}.${index}.endTime`)}
                meridiem={watch(`${fieldName}.${index}.endMeridiem`) || "PM"}
                register={register}
                setValue={setValue} />
              {fieldErrors?.[index]?.endTime && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors[index].endTime?.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-6">

              <button
                type="button"
                onClick={() => resetRow(index)}
                className="w-10 h-10 border border-gray-400 rounded-lg
                flex items-center justify-center hover:bg-gray-100 cursor-pointer select-none focus:outline-none">
                <img
                  src="/images/ri_reset-left-line.svg"
                  alt="reset"
                  className="w-5 h-5 pointer-events-none" />
              </button>

              {index === 0 && (
                <button
                  type="button"
                  onClick={addRow}
                  className="w-10 h-10 border border-blue-400 rounded-lg
                  flex items-center justify-center hover:bg-blue-100 cursor-pointer select-none focus:outline-none">
                  <img src="/images/u_plus(1).svg" alt="add" className="w-5 h-5 pointer-events-none" />
                </button>
              )}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="w-10 h-10 border border-gray-400 rounded-lg
                  flex items-center justify-center hover:bg-gray-100 cursor-pointer select-none focus:outline-none">
                  <img src="/images/u_trash.svg" alt="delete" className="w-4 h-4 pointer-events-none" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeRow;


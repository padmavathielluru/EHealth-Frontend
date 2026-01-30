import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchemaType } from "../commonComponents/schema";
import Title from "../Title";
import InputField from "../InputField";
import WorkingHours from "./WorkingHours";
import {
  DAYS,
  DEFAULT_FORM_VALUES,
  DEFAULT_WORKING_DAYS,
} from "../../utils/AvailabilityConstants";

import { toggleWorkingDay } from "../../services/availabilityServices";

const Availability: React.FC = () => {
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState<boolean[]>(
    DEFAULT_WORKING_DAYS
  );

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  return (
    <div>
      <Title text="Availability" />

      <div className="rounded-xl border border-gray-100 mt-6 p-6 bg-white">
        <p className="text-sm text-gray-400 mb-2">Working Days</p>

        <div className="flex items-center border rounded-xl overflow-hidden w-fit">
          {DAYS.map((day, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                toggleWorkingDay(index, selectedDays, setSelectedDays)
              }
              className={`w-10 h-10 text-sm font-semibold flex items-center justify-center
                ${selectedDays[index] ? "bg-white" : "text-gray-400"}
                ${index !== DAYS.length - 1 ? "border-r" : ""}
                hover:bg-blue-100 transition`}
            >
              {day}
            </button>
          ))}
        </div>

        <WorkingHours
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          trigger={trigger}
        />

        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Consultation mode</p>
          <div className="flex gap-6 mt-2">
            <label className="flex gap-2 items-center text-sm cursor-pointer">
              <input
                type="radio"
                name="consultationMode"
                defaultChecked
                className="accent-blue-600 w-4 h-4"
              />
              In-person
            </label>

            <label className="flex gap-2 items-center text-sm cursor-pointer">
              <input
                type="radio"
                name="consultationMode"
                className="accent-blue-600 w-4 h-4"
              />
              Telehealth
            </label>
          </div>
        </div>

        <div className="mt-4">
          <InputField
            label="Default Clinic/Location"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Availability;

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Title from "../components/Title";
import DropdownInputFields from "../components/commonComponents/DropdownInputFields";
import TimeRangeRow from "../components/loginComponents/AvailabilitySetUp/TimeRangeRow";
import {
  LOCATION_OPTIONS,
  DAY_OPTIONS,
  CONSULTATION_MODE_OPTIONS,
} from "../utils/DropdownInputFieldsConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { availabilitySchema, AvailabilitySchemaType, } from "../schemas/AvailabilitySchema";
import { toMinutes } from "../utils/TimeConstants";

interface Props {
  onClose: () => void;
  onAdd: (data: any) => void;
  existingAvailabilities: AvailabilitySchemaType[];
  editData?: AvailabilitySchemaType | null;
  editIndex?: number | null;
}

const AddAvailabilityModal: React.FC<Props> = ({ onClose, onAdd,
  existingAvailabilities, editData, editIndex
}) => {

  const methods = useForm<AvailabilitySchemaType>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      location: "",
      day: "",
      consultationMode: "",
      slots: [
        {
          startTime: "",
          startMeridiem: "AM",
          endTime: "",
          endMeridiem: "PM",
        },
      ],
      breaks: [
        {
          startTime: "",
          startMeridiem: "AM",
          endTime: "",
          endMeridiem: "PM",
        },
      ],
    },
  });

  useEffect(() => {
    if (editData) {
      methods.reset(editData);
    }
  }, [editData, methods]);

  const hasDoctorConflict = (
    existing: AvailabilitySchemaType[],
    incoming: AvailabilitySchemaType,
    editIndex?: number | null
  ) => {
    return existing.some((avail, index) => {
      if (editIndex !== null && index === editIndex) return false;
      if (avail.day !== incoming.day) return false;

      // if (avail.location !== incoming.location) return false;
      // if (avail.consultationMode !== incoming.consultationMode) return false;

      return avail.slots.some(oldSlot =>
        incoming.slots.some(newSlot => {
          if (
            !oldSlot.startTime ||
            !oldSlot.endTime ||
            !newSlot.startTime ||
            !newSlot.endTime
          ) {
            return false;
          }

          const oldStart = toMinutes(
            oldSlot.startTime,
            oldSlot.startMeridiem as "AM" | "PM"
          );

          const oldEnd = toMinutes(
            oldSlot.endTime,
            oldSlot.endMeridiem as "AM" | "PM"
          );

          const newStart = toMinutes(
            newSlot.startTime,
            newSlot.startMeridiem as "AM" | "PM"
          );

          const newEnd = toMinutes(
            newSlot.endTime,
            newSlot.endMeridiem as "AM" | "PM"
          );


          if (
            oldStart === null ||
            oldEnd === null ||
            newStart === null ||
            newEnd === null
          ) {
            return false;
          }

          return newStart < oldEnd && oldStart < newEnd;
        })
      );
    });
  };

  const hasBreakConflict = (
    existing: AvailabilitySchemaType[],
    incoming: AvailabilitySchemaType,
    editIndex?: number | null
  ) => {
    return existing.some((avail, index) => {
      if (editIndex !== null && index === editIndex) return false;
      if (avail.day !== incoming.day) return false;

      return (avail.breaks || []).some(oldBreak =>
        (incoming.breaks || []).some(newBreak => {
          if (
            !oldBreak.startTime ||
            !oldBreak.endTime ||
            !newBreak.startTime ||
            !newBreak.endTime
          ) return false;

          const oldStart = toMinutes(oldBreak.startTime, oldBreak.startMeridiem as "AM" | "PM");
          const oldEnd = toMinutes(oldBreak.endTime, oldBreak.endMeridiem as "AM" | "PM");
          const newStart = toMinutes(newBreak.startTime, newBreak.startMeridiem as "AM" | "PM");
          const newEnd = toMinutes(newBreak.endTime, newBreak.endMeridiem as "AM" | "PM");

          if (
            oldStart === null ||
            oldEnd === null ||
            newStart === null ||
            newEnd === null
          ) return false;

          return newStart < oldEnd && oldStart < newEnd;
        })
      );
    });
  };

  const onSubmit = (data: AvailabilitySchemaType) => {


    if (hasDoctorConflict(existingAvailabilities, data, editIndex)) {
      setError("slots", {
        type: "manual",
        message:
          "Doctor already has availability at this time on the same day",
      });
      return;
    }

    if (hasBreakConflict(existingAvailabilities, data, editIndex)) {
      setError("breaks", {
        type: "manual",
        message:
          "Break time must be unique for each availability on the same day",
      });
      return;
    }

    onAdd(data);
    onClose();
  };

  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 select-none">
        <div className="bg-white w-[704px] h-[600px] rounded-2xl shadow-xl p-8 relative overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <Title text={editData ? "Edit Availability" : "Add Availability Note"} />
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
              <img src="/images/x-01.svg" alt="close" className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <DropdownInputFields
              label="Location*"
              name="location"
              setValue={setValue}
              watch={watch}
              options={LOCATION_OPTIONS}
              error={errors.location}
            />

            <DropdownInputFields
              label="Day*"
              name="day"
              setValue={setValue}
              watch={watch}
              options={DAY_OPTIONS}
              error={errors.day}
            />

            <DropdownInputFields
              label="Consultation Mode*"
              name="consultationMode"
              setValue={setValue}
              watch={watch}
              options={CONSULTATION_MODE_OPTIONS}
              error={errors.consultationMode}
            />

            <TimeRangeRow
              label="Time Slot*"
              fieldName="slots"
              startLabel="Start Time"
              endLabel="End Time"
              error={errors.slots}
            />

            <TimeRangeRow
              label="Break"
              fieldName="breaks"
              startLabel="Break Start Time"
              endLabel="Break End Time"
              error={errors.breaks}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="w-[96px] h-[40px] rounded-xl border text-gray-500 hover:bg-gray-100">
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="w-[76px] h-[40px] rounded-xl bg-blue-600 text-white hover:bg-blue-700">
              {editData ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddAvailabilityModal;

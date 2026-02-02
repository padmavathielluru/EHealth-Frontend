export interface AvailabilityPageData {
  availability: any[];
  consultationSlot: {
    slotDuration: number | null;
    buffer: number | null;
  } | null;
  consultationFee: number | null;
}

export interface AvailabilityErrors {
  availability?: string;
  consultationSlot?: string;
  consultationFee?: string;
}

export const validateAvailabilityPage = (
  data: AvailabilityPageData
): AvailabilityErrors => {
  const errors: AvailabilityErrors = {};

  if (!data.availability || data.availability.length === 0) {
    errors.availability = "At least one availability is required";
  }

  if (
    !data.consultationSlot ||
    !data.consultationSlot.slotDuration ||
    !data.consultationSlot.buffer
  ) {
    errors.consultationSlot = "Setup consultation time slot is required";
  }

  if (!data.consultationFee) {
    errors.consultationFee = "Consultation fee is required";
  }

  return errors;
};

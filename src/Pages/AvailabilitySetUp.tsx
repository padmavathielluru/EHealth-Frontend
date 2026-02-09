import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import AvailabilitySetUpForm from "../components/loginComponents/AvailabilitySetUp/AvailabilitySetUpForm";
import ProfileStepper from "../components/loginComponents/ProfileStepper";
import { validateAvailabilityPage, AvailabilityErrors, } from "../schemas/AvailabilityPageSchema";
import { AvailabilityRow } from "../components/loginComponents/AvailabilitySetUp/AvailabilityTable";
import { CostFormType } from "../schemas/schema";

const AvailabilitySetUp: React.FC = () => {
    const navigate = useNavigate();

    const [availability, setAvailability] = useState<AvailabilityRow[]>([]);
    const [consultationSlot, setConsultationSlot] = useState<{
        slotDuration?: number;
        buffer?: number;
    }>
        ({});
    const [consultationFee, setConsultationFee] = useState<CostFormType | null>(null);
    const [errors, setErrors] = useState<AvailabilityErrors>({});

    const availabilityRef = useRef<HTMLDivElement | null>(null);
    const availabilityErrorRef = useRef<HTMLParagraphElement>(null);
    const slotRef = useRef<HTMLDivElement>(null);
    const feeRef = useRef<HTMLDivElement>(null);
    const STORAGE_KEY = "availabilitySetupData";
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);

            setAvailability(parsed.availability ?? []);
            setConsultationSlot(parsed.consultationSlot ?? {});
            // setConsultationFee(parsed.consultationFee ?? null);
            if (
                parsed.consultationFee &&
                typeof parsed.consultationFee === "object"
            ) {
                setConsultationFee(parsed.consultationFee);
            } else {
                setConsultationFee(null);
            }
        }
    }, []);

    useEffect(() => {
        const dataToSave = {
            availability,
            consultationSlot,
            consultationFee,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }, [availability, consultationSlot, consultationFee]);

    const handleSubmitClick = () => {
        const validationErrors = validateAvailabilityPage({
            availability,
            consultationSlot: {
                slotDuration: consultationSlot.slotDuration ?? null,
                buffer: consultationSlot.buffer ?? null,
            },
            consultationFee,
        });

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("CHECKING SUCCESS")
            setIsDone(true);
           
        }

    };
     useEffect(() => {
    if (isDone) {
       navigate("/profile-submitted-success");
    }
  }, [isDone]);

    useEffect(() => {
        if (errors.availability && availabilityErrorRef.current) {
            availabilityErrorRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            return;
        }

        if (errors.consultationSlot && slotRef.current) {
            slotRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            return;
        }

        if (errors.consultationFee && feeRef.current) {
            feeRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [errors]);


    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10 select-none">
            <div className="w-full max-w-7xl p-6 md:p-10">
                <ProfileStepper currentStep={4} />
                <div className="text-center mb-8 select-none">
                    <Title text="Availability & Fees SetUp" />
                </div>
                <div className="">
                    <AvailabilitySetUpForm
                        availability={availability}
                        onAvailabilitychange={setAvailability}
                        consultationSlot={consultationSlot}
                        onConsultationSlotChange={setConsultationSlot}
                        consultationFee={consultationFee}
                        onConsultationFeeChange={setConsultationFee}
                        errors={errors}
                        availabilityRef={availabilityRef}
                        availabilityErrorRef={availabilityErrorRef}
                        slotRef={slotRef}
                        feeRef={feeRef}
                    />
                </div>
                <div className="flex justify-center gap-4 mt-12">
                    <button onClick={() => navigate("/document-verification")}
                        className="flex items-center justify-center gap-2 w-[124px] h-[49px]
                        border border-gray-300 rounded-xl text-gray-400 hover:bg-gray-100 transition">
                        <img src="/images/Arrow left.svg" alt="arrow" className="w-4 h-4" />
                        Back
                    </button>
                    <button type="button" onClick={handleSubmitClick}
                        className="w-[211px] h-[49px] bg-[#168BD9] text-white rounded-xl font-medium hover:bg-[#0f76bd] transition">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AvailabilitySetUp;
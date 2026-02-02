import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import DocumentVerificationForm from "../components/loginComponents/DocumentVerification/DocumentVerificationForm";
import ProfileStepper from "../components/loginComponents/ProfileStepper";

const DocumentVerification: React.FC = () => {
    const navigate = useNavigate();

    const [documents, setDocuments] = useState<Record<string, File>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const requiredFields = ["medicalLicense"];

    const validateDocuments = () => {
        const newErrors: Record<string, string> = {};

        requiredFields.forEach((field) => {
            if (!documents[field]) {
                newErrors[field] = "This document is required";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const saved = localStorage.getItem("documentVerification");
        if (saved) {
            const parsed = JSON.parse(saved);
            setDocuments(parsed);
        }
    }, []);

    const handleSave = () => {
        if (!validateDocuments()) return;

        const storedDocs: Record<string, any> = {};

        Object.keys(documents).forEach((key) => {
            storedDocs[key] = {
                name: documents[key].name,
                type: documents[key].type,
            };
        });

        localStorage.setItem("documentVerification", JSON.stringify(storedDocs));

        navigate("/availability-setup");
    };


    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10 select-none">
            <div className="w-full max-w-5xl p-6 md:p-10">
                <ProfileStepper currentStep={3} />
                <div className="text-center mb-8">
                    <Title text="Documents Verification" />
                </div>

                <DocumentVerificationForm
                    documents={documents}
                    setDocuments={setDocuments}
                    errors={errors} />

                <div className="flex justify-center gap-4 mt-12">
                    <button onClick={() => navigate("/professional-details")}
                        className="flex items-center justify-center gap-2 w-[124px] h-[49px]
                        border border-gray-300 rounded-xl text-gray-400 hover:bg-gray-100 transition">
                        <img src="/images/Arrow left.svg" alt="arrow" className="w-4 h-4" />
                        Back
                    </button>
                    <button onClick={handleSave}
                        className="w-[211px] h-[49px] bg-[#168BD9] text-white rounded-xl font-medium hover:bg-[#0f76bd] transition">
                        Save & Continue
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DocumentVerification;
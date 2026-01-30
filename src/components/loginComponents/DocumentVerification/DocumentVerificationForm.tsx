import React, { useState } from "react";
import DocumentUploadBox from "./DocumentUploadBox";


interface Props {
    documents: Record<string, File>;
    setDocuments: React.Dispatch<React.SetStateAction<Record<string, File>>>;
    errors: Record<string, string>;
}

const DocumentVerificationForm: React.FC<Props> = ({
    documents, setDocuments, errors,
}) => {

    const handleFile = (key: string, file: File) => {
        setDocuments((prev) => ({
            ...prev,[key]: file,
        }));
    };

    console.log(documents);

    return (
        <div className="p-6 space-y-6 select-none">
            <h3 className="text-sm font-medium mb-6">
                Upload Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DocumentUploadBox 
                        label="Medical License / Registration Certificate*"
                        onFileSelect={(file) => handleFile("medicalLicense", file)}
                        error={errors.medicalLicense}/>

                <DocumentUploadBox 
                        label="Government ID" 
                        onFileSelect={(file) => handleFile("governmentId", file)}/>

                <DocumentUploadBox 
                        label="Clinic proof"
                        onFileSelect={(file) => handleFile("clinicProof", file)}/>
            </div>
        </div>
    );
};

export default DocumentVerificationForm;
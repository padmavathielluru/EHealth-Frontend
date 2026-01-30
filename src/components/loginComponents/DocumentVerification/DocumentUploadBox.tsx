import React, { useRef, useState } from "react";
import { BsFiletypePdf } from "react-icons/bs";

interface Props {
    label: string;
    onFileSelect: (file: File) => void;
    error?: string;
}

const DocumentUploadBox: React.FC<Props> = ({ label, onFileSelect, error }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            onFileSelect(selectedFile);
        }
    };

    const isImage = file?.type.startsWith("image/");

    return (
        <div>
            <p className="text-sm text-gray-600 mb-2">
                {label.includes("*") ? (
                    <>
                    {label.replace("*", "")}
                    <span className="text-red-500 ml-1">*</span>
                    </>
                ) : (
                    label
                )}</p>
            <div onClick={handleClick}
                className="h-[160px] rounded-xl border border-dashed border-gray-300 bg-gray-100 flex items-center justify-center cursor-pointer
                            text-gray-400 text-sm hover:bg-gray-200 transition">
                {!file && (
                    <p className="text-gray-400 text-sm">Upload</p>
                )}
                {file && (
                    <div className="text-center px-3">
                        {isImage ? (
                            <img src={URL.createObjectURL(file)}
                                alt="preview"
                                className="h-24 mx-auto object-contain rounded-md mb-2" />
                        ) : (
                            <div className="text-gray-500 mb-2"><BsFiletypePdf className="w-8 h-8"/></div>
                        )}
                        <p className="text-xs text-gray-600 truncate max-w-[140px]">{file.name}</p>
                    </div>
                )}

            </div>
            <input type="file"
                ref={inputRef}
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileChange} />
                {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
        </div>
        
    );
};

export default DocumentUploadBox;
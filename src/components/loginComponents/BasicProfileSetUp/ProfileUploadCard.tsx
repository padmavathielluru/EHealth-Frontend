import React, { useRef, useState }from "react";

const ProfileUploadCard: React.FC = () => {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const savedImage = localStorage.getItem("profileImage");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
            setError("Only JPG or PNG files are allowed");
            return;
        }

        if (selectedFile.size > 2 * 1024 * 1024) {
            setError("File size should be less than 2MB");
            return;
        }

        setError("");
        setFile(selectedFile);
        localStorage.setItem("profileImage", URL.createObjectURL(selectedFile));
    };
    
    return (
        <div className=" ">
            <div className="h-[260px] w-[200px] mb-10 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center test-center bg-gray-50">
                <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden">
                  {file ? (
                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <img src={savedImage || "images/user-avatar-outline.svg"}
                        alt="User Avatar" className="w-7 h-7 opacity-70"/>
                  )}
                </div>

                <p className="text-xs text-gray-400">Drap your files here</p>
                <p className="text-xs text-gray-400">or{" "}

                         <button type="button" onClick={() => fileInputRef.current?.click()} 
                         className="mr-12 ml-1 text-xs text-blue-500 font-medium hover:underline">
                    Browser
                </button>
                    
                </p>
                <p className="text-xs text-gray-400 mt-3">JPG, PNG (max 2MB)</p>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"/>
            </div>
            {error && (
                <p className="text-red-500 text-xs text-center">{error}</p>
            )}
        </div>
    );
};

export default ProfileUploadCard;


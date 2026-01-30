import React from "react";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white h-[444px] w-[704px] rounded-2xl p-6 shadow-lg relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upload</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <img
              src="/images/x-01.svg"
              alt="close"
              className="w-5 h-5"
            />
          </button>
        </div>

        <div className="border border-dashed border-gray-300 rounded-xl py-14 
                        flex flex-col items-center gap-3 bg-gray-50">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <img src="/images/excel-svgrepo-com 1.svg" alt="excel" className="w-8 h-8" />
          </div>

          <p className="text-gray-600">
            Drag your files here or{" "}
            <span className="text-blue-600 font-medium cursor-pointer">Browse</span>
          </p>

          <p className="text-xs text-gray-400">File should be .xls & .xlsx</p>
        </div>

        {/* SAMPLE DOWNLOAD */}
        <div className="mt-6 text-center">
          <button className="text-gray-600 text-sm flex items-center justify-center mx-auto gap-2 hover:text-black">
            <img src="/images/download-02.svg" alt="download" className="w-4" />
            Download Sample file
          </button>
        </div>

      </div>
    </div>
  );
};

export default UploadModal;

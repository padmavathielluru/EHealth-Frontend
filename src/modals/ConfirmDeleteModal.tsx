import React from "react";

interface ConfirmDeleteModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  title,
  description,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[440px] px-10 py-11 text-center shadow-lg">

        <div className="flex justify-start gap-6 mb-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-200 flex items-center justify-center select-none">
            <div className="w-12 h-12 mx-auto  rounded-full bg-red-500 flex items-center justify-center pointer-events-none">
              <img src="/images/fi_x.svg" alt="delete" className="w-6 h-6" />
            </div>
          </div>

          <div className="text-left">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              {description}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="px-10 py-2.5 rounded-lg border border-gray-300
                       text-gray-700 hover:bg-gray-100 transition">
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="px-10 py-2.5 rounded-lg bg-[#168Bd9]
                       text-white hover:bg-blue-700 transition">
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

// src/components/NotificationModal.jsx
import { X } from "lucide-react";
import { useState } from "react";

function NotificationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    image: null
  });

  const [fileName, setFileName] = useState("No file chosen");

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notification data:", formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      type: "",
      title: "",
      description: "",
      image: null
    });
    setFileName("No file chosen");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] animate-fade-in"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2a2a2a] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto z-[1001] animate-slide-in border border-[#3a3a3a]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#3a3a3a] sticky top-0 bg-[#2a2a2a] rounded-t-xl z-10">
          <h2 className="text-base font-bold text-white m-0">Notification</h2>
          <button 
            className="bg-[#333] border border-[#3a3a3a] cursor-pointer p-2 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-[#3a3a3a] hover:border-amber-500 hover:text-amber-500 min-w-10 min-h-10"
            onClick={handleClose}
            aria-label="Close"
          >
            <X size={20} className="text-[#888] hover:text-amber-500 transition-colors" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Notification Type */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#888] mb-2">Notification Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-4 py-3 border border-[#3a3a3a] rounded-lg text-xs text-white bg-[#1a1a1a] cursor-pointer transition-all duration-200 focus:outline-none focus:border-amber-500 focus:shadow-[0_0_0_2px_rgba(245,158,11,0.1)] appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23888\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')] bg-no-repeat bg-[right_16px_center] pr-12"
              required
            >
              <option value="">Select Type</option>
              <option value="info">Info</option>
              <option value="alert">Alert</option>
              <option value="promotion">Promotion</option>
              <option value="update">Update</option>
            </select>
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#888] mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-[#3a3a3a] rounded-lg text-xs text-white bg-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-amber-500 focus:shadow-[0_0_0_2px_rgba(245,158,11,0.1)] placeholder:text-[#666]"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#888] mb-2">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-4 py-3 border border-[#3a3a3a] rounded-lg text-xs text-white bg-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-amber-500 focus:shadow-[0_0_0_2px_rgba(245,158,11,0.1)] placeholder:text-[#666]"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#888] mb-2">Image (Optional)</label>
            <div className="flex items-center gap-3 border border-[#3a3a3a] rounded-lg p-3 bg-[#1a1a1a] transition-all duration-200 focus-within:border-amber-500 focus-within:shadow-[0_0_0_2px_rgba(245,158,11,0.1)]">
              <label htmlFor="file-upload" className="bg-amber-500 text-[#1a1a1a] px-5 py-2 rounded-lg font-semibold text-xs cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 shadow-[0_2px_8px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_16px_rgba(245,158,11,0.4)] whitespace-nowrap border-none">
                Choose file
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <span className="flex-1 text-[#888] text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                {fileName}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-6 flex-wrap">
            <button
              type="submit"
              className="bg-amber-500 text-[#1a1a1a] border-none px-8 py-3 rounded-lg font-semibold text-xs cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 shadow-[0_2px_8px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_16px_rgba(245,158,11,0.4)] active:translate-y-0 min-w-[120px]"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="bg-[#333] text-[#ccc] border border-[#3a3a3a] px-8 py-3 rounded-lg font-semibold text-xs cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3a3a3a] hover:border-amber-500 hover:text-amber-500 hover:shadow-[0_2px_8px_rgba(245,158,11,0.2)] active:translate-y-0 min-w-[120px]"
            >
              Close
            </button>
          </div>
        </form>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translate(-50%, -48%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .modal-container {
            max-width: 90%;
            border-radius: 10px;
          }
          .header-container {
            padding: 20px;
          }
          .title-text {
            font-size: 0.9rem;
          }
          .form-container {
            padding: 20px;
          }
          .form-group {
            margin-bottom: 16px;
          }
          .close-btn {
            min-width: 36px;
            min-height: 36px;
            padding: 6px;
          }
          .close-btn svg {
            width: 18px;
            height: 18px;
          }
        }

        @media (max-width: 600px) {
          .modal-container {
            width: 95%;
            max-height: 85vh;
          }
          .header-container {
            padding: 18px 20px;
          }
          .title-text {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .modal-container {
            width: 95%;
            max-height: 90vh;
            border-radius: 8px;
          }
          .header-container {
            padding: 16px;
          }
          .title-text {
            font-size: 0.8rem;
          }
          .form-container {
            padding: 16px;
          }
          .label-text {
            font-size: 0.65rem;
          }
          .input-field, .select-field {
            padding: 10px 14px;
            font-size: 0.65rem;
            border-radius: 6px;
          }
          .file-input-wrapper {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 12px;
          }
          .file-label {
            text-align: center;
            width: 90%;
            padding: 10px 16px;
            font-size: 0.65rem;
          }
          .file-name {
            text-align: center;
            padding: 8px 0;
            font-size: 0.65rem;
          }
          .actions-container {
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
          }
          .submit-btn, .close-secondary-btn {
            width: 100%;
            padding: 10px 24px;
            font-size: 0.65rem;
            min-width: auto;
          }
          .close-btn {
            min-width: 32px;
            min-height: 32px;
          }
          .close-btn svg {
            width: 16px;
            height: 16px;
          }
        }

        @media (max-width: 360px) {
          .header-container {
            padding: 14px;
          }
          .title-text {
            font-size: 0.75rem;
          }
          .form-container {
            padding: 14px;
          }
          .input-field, .select-field {
            padding: 8px 12px;
            font-size: 0.65rem;
            border-radius: 6px;
          }
          .file-input-wrapper {
            padding: 10px;
          }
          .file-label {
            padding: 8px 14px;
            font-size: 0.65rem;
          }
          .submit-btn, .close-secondary-btn {
            padding: 8px 20px;
            font-size: 0.65rem;
          }
        }

        @media (max-width: 320px) {
          .modal-container {
            width: 98%;
            border-radius: 6px;
          }
          .header-container {
            padding: 12px;
          }
          .form-container {
            padding: 12px;
          }
          .actions-container {
            gap: 8px;
          }
        }

        /* Touch device improvements */
        @media (hover: none) and (pointer: coarse) {
          .submit-btn:hover, .close-secondary-btn:hover, .file-label:hover, .close-btn:hover {
            transform: none;
          }
          .submit-btn:active, .close-secondary-btn:active, .file-label:active {
            transform: scale(0.98);
          }
          .input-field, .select-field {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}

export default NotificationModal;
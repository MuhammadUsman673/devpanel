import React, { useState } from 'react';

const RegisterCoachModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    specialty: '',
    phone: '',
    experience: '',
    certifications: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-[1000] p-5 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#1a1a1a] rounded-xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.2)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#2d2d2d]">
          <h2 className="text-xl font-bold text-white m-0">Register New Coach</h2>
          <button 
            className="bg-transparent border-none text-[#9ca3af] cursor-pointer p-1 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-[#2d2d2d] hover:text-[#e5e5e5]"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Full Name */}
          <div className="mb-5">
            <label htmlFor="fullName" className="block text-xs font-medium text-[#d1d5db] mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              required
            />
          </div>

          {/* Email Address */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-xs font-medium text-[#d1d5db] mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john.doe@example.com"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              required
            />
          </div>

          {/* Temporary Password */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-xs font-medium text-[#d1d5db] mb-2">Temporary Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              required
            />
          </div>

          {/* Specialty */}
          <div className="mb-5">
            <label htmlFor="specialty" className="block text-xs font-medium text-[#d1d5db] mb-2">Specialty</label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="e.g. Body Building, CrossFit"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-5">
            <label htmlFor="phone" className="block text-xs font-medium text-[#d1d5db] mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 (555) 123-4567"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              required
            />
          </div>

          {/* Years of Experience */}
          <div className="mb-5">
            <label htmlFor="experience" className="block text-xs font-medium text-[#d1d5db] mb-2">Years of Experience</label>
          <select
  id="experience"
  name="experience"
  value={formData.experience}
  onChange={handleChange}
  className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none cursor-pointer appearance-none pr-10 hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111] bg-right bg-no-repeat"
  style={{
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%239ca3af' stroke-width='1.5'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"
  }}
  required
>
              <option value="">Select experience level</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          {/* Certifications */}
          <div className="mb-6">
            <label htmlFor="certifications" className="block text-xs font-medium text-[#d1d5db] mb-2">Certifications</label>
            <textarea
              id="certifications"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              placeholder="e.g. NASM-CPT, ACSM-CPT, etc."
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111] resize-vertical min-h-[80px] leading-relaxed"
              rows="3"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-7 pt-5 border-t border-[#2d2d2d]">
            <button 
              type="button" 
              className="flex-1 bg-[#2d2d2d] text-[#e5e5e5] border-none px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-[#3d3d3d] active:scale-98"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-amber-500 text-[#0a0a0a] border-none px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-amber-600 active:scale-98"
            >
              Register Coach
            </button>
          </div>
        </form>
      </div>

      {/* Custom Animations and Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .active\\:scale-98:active {
          transform: scale(0.98);
        }

        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-radius: 0 12px 12px 0;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }

        /* Focus visible for accessibility */
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible,
        button:focus-visible {
          outline: 2px solid #f59e0b;
          outline-offset: 2px;
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .modal-overlay {
            padding: 0;
            align-items: flex-end;
          }
          .modal-content {
            max-width: 100%;
            border-radius: 12px 12px 0 0;
            max-height: 95vh;
          }
          .modal-header {
            padding: 20px 20px 16px 20px;
          }
          .modal-title {
            font-size: 20px;
          }
          .form-container {
            padding: 20px;
          }
          .form-actions {
            flex-direction: column-reverse;
            gap: 10px;
          }
          .cancel-btn,
          .submit-btn {
            width: 100%;
          }
        }

        /* Disabled state */
        input:disabled,
        select:disabled,
        textarea:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        button:disabled:hover {
          transform: none;
        }
      `}</style>
    </div>
  );
};

export default RegisterCoachModal;
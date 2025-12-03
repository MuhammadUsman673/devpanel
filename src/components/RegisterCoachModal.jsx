// src/components/RegisterCoachModal.jsx → FULLY FUNCTIONAL + REAL API
import React, { useState } from 'react';
import { apiCall } from '../config/api'; // Make sure this path is correct

const RegisterCoachModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    phone: '',
    experience: '',
    certifications: '',
    tags: [] // we'll extract from specialty
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Extract tags from specialty (e.g. "CrossFit, Yoga" → ["CrossFit", "Yoga"])
    const tags = formData.specialty
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      tags,
      phone: formData.phone,
      experience: formData.experience,
      certifications: formData.certifications
    };

    const res = await apiCall('http://localhost:5000/api/admin/coaches/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (res.success) {
      alert('Coach registered successfully!');
      onSuccess?.(); // Refresh coach list
      onClose();
    } else {
      setError(res.error || 'Failed to register coach. Please try again.');
    }
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
            disabled={loading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#d1d5db] mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              required
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#d1d5db] mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john.doe@example.com"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#d1d5db] mb-2">Temporary Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              minLength="6"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              required
              disabled={loading}
            />
          </div>

          {/* Specialty (Tags) */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#d1d5db] mb-2">Specialty (comma separated)</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="e.g. CrossFit, Yoga, Body Building"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              required
              disabled={loading}
            />
            <p className="text-xs text-[#6b7280] mt-1">Separate multiple with commas</p>
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#d1d5db] mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              disabled={loading}
            />
          </div>

          {/* Experience */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#d1d5db] mb-2">Years of Experience</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none cursor-pointer appearance-none pr-10 hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%239ca3af' stroke-width='1.5'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat' }}
              required
              disabled={loading}
            >
              <option value="">Select experience</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>

          {/* Certifications */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-[#d1d5db] mb-2">Certifications</label>
            <textarea
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              placeholder="NASM-CPT, CrossFit Level 2, etc."
              className="w-full px-3.5 py-3 bg-[#0a0a0a] border border-[#2d2d2d] rounded-lg text-[#e5e5e5] text-sm transition-all duration-200 outline-none placeholder:text-[#6b7280] hover:border-[#3d3d3d] focus:border-amber-500 focus:bg-[#111111] resize-vertical min-h-[80px]"
              rows="3"
              disabled={loading}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-7 pt-5 border-t border-[#2d2d2d]">
            <button 
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-[#2d2d2d] text-[#e5e5e5] border-none px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-[#3d3d3d] disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 bg-amber-500 text-[#0a0a0a] border-none px-5 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Registering...</>
              ) : (
                'Register Coach'
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default RegisterCoachModal;
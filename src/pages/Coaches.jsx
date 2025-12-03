// src/pages/Coaches.jsx → UPDATED VERSION (Consistent Styling with CoachClients)
import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiCall } from '../config/api';
import RegisterCoachModal from '../components/RegisterCoachModal';
import { Loader2, Edit2, Trash2, X, ArrowLeft, Search, Mail, Calendar, Users as UsersIcon } from 'lucide-react';

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState(null);

  const fetchCoaches = async () => {
    setLoading(true);
    const url = API_ENDPOINTS.COACHES.GET_ALL_WITH_PARAMS(currentPage, 10, searchTerm);
    const res = await apiCall(url);
    if (res.success) {
      setCoaches(res.data.coaches || []);
      setCurrentPage(res.data.pagination.currentPage);
      setTotalPages(res.data.pagination.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoaches();
  }, [currentPage, searchTerm]);

  const handleCoachRegistered = () => {
    setCurrentPage(1);
    fetchCoaches();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this coach permanently?')) return;
    const res = await apiCall(API_ENDPOINTS.COACHES.DELETE(id), { method: 'DELETE' });
    if (res.success) fetchCoaches();
  };

  const openEdit = (coach) => {
    setEditingCoach(coach);
    setIsEditOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      experience: form.experience.value,
      status: form.status.value
    };

    const res = await apiCall(API_ENDPOINTS.COACHES.UPDATE(editingCoach._id), {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    if (res.success) {
      fetchCoaches();
      setIsEditOpen(false);
    } else {
      alert(res.error || 'Update failed');
    }
  };

  return (
    <div className="ml-5 lg:ml-5 mt-2 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 lg:mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-transparent border-none p-2 rounded-lg cursor-pointer transition-all duration-300 text-[#ccc] hover:bg-[#2a2a2a]">
              <ArrowLeft className="w-4 h-4 text-[#888]" />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-white m-0">Manage Coaches</h1>
              <p className="text-xs lg:text-sm text-[#888] m-0 mt-1">
                Register and manage all coaches
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="bg-[#f59e0b] text-[#1a1a1a] px-4 py-2 rounded-lg border-none font-semibold cursor-pointer transition-all duration-300 hover:bg-white text-xs lg:text-sm whitespace-nowrap shadow-lg shadow-amber-500/30 flex items-center gap-2"
          >
            Register Coach
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 lg:mb-6 w-full">
          <Search className="absolute top-1/2 left-3 lg:left-4 transform -translate-y-1/2 text-[#888] w-4 h-4 lg:w-5 lg:h-5 z-10" />
          <input
            type="text"
            placeholder="Search coaches..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-3 px-3 lg:px-4 pl-10 lg:pl-12 text-white outline-none text-xs lg:text-sm focus:border-[#f59e0b]"
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-10 h-10 animate-spin text-[#f59e0b]" />
          </div>
        ) : coaches.length === 0 ? (
          <div className="text-center py-32 text-[#888] text-base lg:text-lg">No coaches found</div>
        ) : (
          <>
            {/* Table - Horizontal scroll on mobile */}
            <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                  <thead>
                    <tr>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Coach</th>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Clients</th>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Joined</th>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Status</th>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coaches.map(coach => (
                      <tr key={coach._id} className="hover:bg-[#252525] transition-colors">
                        <td className="p-4 border-b border-[#3a3a3a] align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold text-xs lg:text-sm shadow-lg shadow-amber-500/30 bg-[#f59e0b] text-[#1a1a1a] flex-shrink-0">
                              {coach.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div>
                              <div className="text-white font-medium whitespace-nowrap text-xs lg:text-sm">{coach.name}</div>
                              <div className="text-[#888] text-xs lg:text-sm whitespace-nowrap">{coach.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-[#3a3a3a] align-middle">
                          <div className="text-white font-bold text-base lg:text-xl whitespace-nowrap">{coach.clientCount || 0}</div>
                        </td>
                        <td className="p-4 border-b border-[#3a3a3a] align-middle text-xs lg:text-sm whitespace-nowrap text-white">
                          {new Date(coach.joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="p-4 border-b border-[#3a3a3a] align-middle">
                          <span className={`inline-block px-3 py-1 rounded-lg text-xs lg:text-sm font-medium whitespace-nowrap ${
                            coach.status === 'active' 
                              ? 'bg-cyan-500/20 text-cyan-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {coach.status}
                          </span>
                        </td>
                        <td className="p-4 border-b border-[#3a3a3a] align-middle">
                          <div className="flex gap-2 flex-wrap">
                            <button 
                              onClick={() => openEdit(coach)} 
                              className="bg-transparent border-none p-1 cursor-pointer rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-[#333]"
                            >
                              <Edit2 className="w-4 h-4 text-[#888] hover:text-[#f59e0b]" />
                            </button>
                            <button 
                              onClick={() => handleDelete(coach._id)} 
                              className="bg-transparent border-none p-1 cursor-pointer rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-red-500/30"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center border-t border-[#3a3a3a] p-4 text-[#888] text-xs lg:text-sm flex-wrap gap-4">
                  <span>
                    Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, coaches.length + ((currentPage - 1) * 10))} of {totalPages * 10} coaches
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-3 py-1 whitespace-nowrap transition-all duration-200 hover:bg-[#333] hover:text-[#ccc] disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button className="bg-[#f59e0b] text-[#1a1a1a] font-semibold rounded-lg px-3 py-1 whitespace-nowrap text-xs lg:text-sm">
                      {currentPage}
                    </button>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-3 py-1 whitespace-nowrap transition-all duration-200 hover:bg-[#333] hover:text-[#ccc] disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Modals */}
        <RegisterCoachModal 
          isOpen={isRegisterOpen} 
          onClose={() => setIsRegisterOpen(false)}
          onSuccess={handleCoachRegistered}
        />

        {isEditOpen && editingCoach && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Edit Coach</h3>
                <button onClick={() => setIsEditOpen(false)} className="text-[#888] hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input 
                  name="name" 
                  defaultValue={editingCoach.name} 
                  required 
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg text-white focus:border-[#f59e0b] outline-none text-sm"
                  placeholder="Coach Name"
                />
                <input 
                  name="phone" 
                  defaultValue={editingCoach.phone || ''} 
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg text-white focus:border-[#f59e0b] outline-none text-sm"
                  placeholder="Phone Number"
                />
                <select 
                  name="experience" 
                  defaultValue={editingCoach.experience || ''} 
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg text-white focus:border-[#f59e0b] outline-none text-sm"
                >
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                <select 
                  name="status" 
                  defaultValue={editingCoach.status} 
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg text-white focus:border-[#f59e0b] outline-none text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsEditOpen(false)} 
                    className="flex-1 bg-[#333] text-white py-2 rounded-lg hover:bg-[#444] transition text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-[#f59e0b] text-[#1a1a1a] font-bold py-2 rounded-lg hover:bg-white transition text-sm"
                  >
                    Update Coach
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coaches;
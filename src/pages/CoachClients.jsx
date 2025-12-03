// src/pages/CoachClients.jsx → FINAL VERSION (Exact Design + Full Features + Smart Messages)
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Search, Users as UsersIcon, Mail, Calendar,
  RefreshCw, MessageSquare, UserPlus, Trash2, X, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { API_ENDPOINTS, apiCall } from '../config/api';

export default function CoachClients() {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [clients, setClients] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const fetchCoaches = async () => {
    const res = await apiCall(API_ENDPOINTS.COACHES.GET_ALL);
    if (res.success && res.data.coaches.length > 0) {
      setCoaches(res.data.coaches);
      setSelectedCoach(res.data.coaches[0]);
    }
  };

  const fetchAllUsers = async () => {
    const res = await apiCall(API_ENDPOINTS.USERS.GET_ALL + '?limit=200');
    if (res.success) setAllUsers(res.data.users);
  };

  const fetchClients = async (page = 1) => {
    if (!selectedCoach) return;
    setLoading(true);
    const url = API_ENDPOINTS.COACHES.GET_CLIENTS(selectedCoach._id, page, searchTerm);
    const res = await apiCall(url);
    if (res.success) {
      setClients(res.data.clients);
      setCurrentPage(res.data.pagination.currentPage);
      setTotalPages(res.data.pagination.totalPages || 1);
    }
    setLoading(false);
  };

  const assignClient = async () => {
    if (!selectedUserId) return;
    const res = await apiCall(API_ENDPOINTS.COACHES.ASSIGN_CLIENT(selectedCoach._id), {
      method: 'POST',
      body: JSON.stringify({ userId: selectedUserId })
    });
    if (res.success) {
      setShowAssignModal(false);
      setSelectedUserId('');
      fetchClients(currentPage);
    } else {
      alert(res.error || "This user is already assigned to a coach");
    }
  };

  const removeClient = async (userId) => {
    if (!confirm('Remove this client from coach?')) return;
    await apiCall(API_ENDPOINTS.COACHES.REMOVE_CLIENT(selectedCoach._id, userId), { method: 'DELETE' });
    setClients(prev => prev.filter(c => c.userId !== userId));
  };

  useEffect(() => {
    fetchCoaches();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (selectedCoach) fetchClients(1);
  }, [selectedCoach, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500/20 text-emerald-400';
      case 'Pending': return 'bg-amber-500/20 text-amber-400';
      case 'Overdue': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getSubscriptionColor = (subscription) => {
    return subscription === 'Premium'
      ? 'bg-amber-500/20 text-amber-400'
      : 'bg-blue-500/20 text-blue-400';
  };

  // Users who are NOT already assigned to any coach
  const availableUsers = allUsers.filter(u => !clients.find(c => c.userId === u._id));

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
              <h1 className="text-lg lg:text-xl font-bold text-white m-0">Coach Clients</h1>
              <p className="text-xs lg:text-sm text-[#888] m-0">
                View and manage all clients under selected coach.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAssignModal(true)}
              className="bg-[#f59e0b] text-[#1a1a1a] px-4 py-2 rounded-lg border-none font-semibold cursor-pointer transition-all duration-300 hover:bg-white text-xs lg:text-sm whitespace-nowrap shadow-lg shadow-amber-500/30 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Assign Client
            </button>
            <select
              value={selectedCoach?._id || ''}
              onChange={(e) => setSelectedCoach(coaches.find(c => c._id === e.target.value))}
              className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-4 py-2 text-white text-xs lg:text-sm"
            >
              {coaches.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Coach Info Card */}
        {selectedCoach && (
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 mb-4 lg:mb-6 shadow-lg">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div className="flex gap-4 items-center flex-wrap">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-bold text-sm lg:text-base shadow-lg shadow-amber-500/30 bg-[#f59e0b] text-[#1a1a1a] flex-shrink-0">
                  {selectedCoach.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h2 className="text-base lg:text-lg font-semibold text-white m-0">{selectedCoach.name}</h2>
                  <p className="text-xs lg:text-sm text-[#888] m-0 mt-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-[#888]" />
                    {selectedCoach.email}
                  </p>
                  <div className="flex gap-4 items-center mt-3 flex-wrap">
                    <span className="text-xs lg:text-sm text-[#888] flex items-center gap-1 whitespace-nowrap">
                      <UsersIcon className="w-3 h-3 lg:w-4 lg:h-4 text-[#f59e0b]" />
                      {clients.length} Active Clients
                    </span>
                    <span className="text-xs lg:text-sm text-[#888] flex items-center gap-1 whitespace-nowrap">
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-[#f59e0b]" />
                      Joined {new Date(selectedCoach.joinedDate || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {selectedCoach.tags?.map((tag, idx) => (
                        <span key={idx} className="text-[#ccc] bg-[#333] rounded-lg px-2 py-1 text-xs whitespace-nowrap">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#f59e0b] text-[#1a1a1a] px-4 py-2 rounded-lg font-bold text-xs lg:text-sm shadow-lg shadow-amber-500/30">
                Active Coach
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-4 lg:mb-6 w-full">
          <Search className="absolute top-1/2 left-3 lg:left-4 transform -translate-y-1/2 text-[#888] w-4 h-4 lg:w-5 lg:h-5 z-10" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-3 px-3 lg:px-4 pl-10 lg:pl-12 text-white outline-none text-xs lg:text-sm focus:border-[#f59e0b]"
          />
        </div>

        {/* Clients Table */}
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl overflow-hidden shadow-lg">
          {loading ? (
            <div className="p-12 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-[#f59e0b]" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Client</th>
                    <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Subscription</th>
                    <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Payment Status</th>
                    <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Join Date</th>
                    <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client._id} className="hover:bg-[#252525] transition-colors">
                      <td className="p-4 border-b border-[#3a3a3a] align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold text-xs lg:text-sm shadow-lg shadow-amber-500/30 bg-[#f59e0b] text-[#1a1a1a] flex-shrink-0">
                            {client.avatar}
                          </div>
                          <div>
                            <div className="text-white font-medium whitespace-nowrap text-xs lg:text-sm">{client.name}</div>
                            <div className="text-[#888] text-xs lg:text-sm whitespace-nowrap">{client.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-[#3a3a3a] align-middle">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs lg:text-sm font-medium whitespace-nowrap ${getSubscriptionColor(client.subscription)}`}>
                          {client.subscription}
                        </span>
                      </td>
                      <td className="p-4 border-b border-[#3a3a3a] align-middle">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs lg:text-sm font-medium whitespace-nowrap ${getStatusColor(client.paymentStatus)}`}>
                          {client.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4 border-b border-[#3a3a3a] align-middle text-xs lg:text-sm whitespace-nowrap text-white">{client.joinDate}</td>
                      <td className="p-4 border-b border-[#3a3a3a] align-middle">
                        <div className="flex gap-2 flex-wrap">
                          <button className="bg-transparent border-none p-1 cursor-pointer rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-[#333]">
                            <RefreshCw className="w-4 h-4 text-[#888] hover:text-[#f59e0b]" />
                          </button>
                          <button className="bg-transparent border-none p-1 cursor-pointer rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-[#333]">
                            <MessageSquare className="w-4 h-4 text-[#888] hover:text-[#f59e0b]" />
                          </button>
                          <button onClick={() => removeClient(client.userId)} className="bg-transparent border-none p-1 cursor-pointer rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-red-500/30">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center border-t border-[#3a3a3a] p-4 text-[#888] text-xs lg:text-sm flex-wrap gap-4">
              <span>Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, clients.length + ((currentPage - 1) * 10))} of {totalPages * 10} clients</span>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => fetchClients(currentPage - 1)} disabled={currentPage === 1}
                  className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-3 py-1 whitespace-nowrap transition-all duration-200 hover:bg-[#333] hover:text-[#ccc] disabled:opacity-50">
                  Previous
                </button>
                <button className="bg-[#f59e0b] text-[#1a1a1a] font-semibold rounded-lg px-3 py-1 whitespace-nowrap text-xs lg:text-sm">
                  {currentPage}
                </button>
                <button onClick={() => fetchClients(currentPage + 1)} disabled={currentPage === totalPages}
                  className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-3 py-1 whitespace-nowrap transition-all duration-200 hover:bg-[#333] hover:text-[#ccc] disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Assign Modal - WITH "Already Assigned" Message */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Assign Client</h3>
                <button onClick={() => setShowAssignModal(false)} className="text-[#888] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {availableUsers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#888] text-lg mb-3">No users available</p>
                  <p className="text-amber-400 font-medium">
                    All users are already assigned to a coach
                  </p>
                </div>
              ) : (
                <>
                  <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-4 py-3 text-white mb-4"
                  >
                    <option value="">Select a user to assign...</option>
                    {availableUsers.map(u => (
                      <option key={u._id} value={u._id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-3">
                    <button
                      onClick={assignClient}
                      disabled={!selectedUserId}
                      className="flex-1 bg-[#f59e0b] text-black font-bold py-2 rounded-lg hover:bg-white transition disabled:opacity-50"
                    >
                      Assign
                    </button>
                    <button onClick={() => setShowAssignModal(false)} className="flex-1 bg-[#333] text-white py-2 rounded-lg hover:bg-[#444]">
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
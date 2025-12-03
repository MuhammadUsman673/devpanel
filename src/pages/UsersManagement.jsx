import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Users as UsersIcon,
  Mail,
  Calendar,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Filter,
  Download,
  UserPlus,
  Eye,
  MoreVertical,
  Loader,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { API_BASE_URL, apiCall } from "../config/api";

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    status: 'active',
    isVerified: true
  });

  // Fetch user statistics
  const fetchUserStats = useCallback(async () => {
    setLoadingStats(true);
    const result = await apiCall(`${API_BASE_URL}/api/admin/users/stats`);
    
    if (result.success) {
      setStats(result.data.stats);
    } else {
      setError('Failed to fetch user statistics');
    }
    setLoadingStats(false);
  }, []);

  // Fetch users with pagination and filters
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    
    const params = new URLSearchParams({
      page: currentPage,
      limit: pagination.limit,
      ...(searchTerm && { search: searchTerm }),
      ...(filterStatus !== 'all' && { status: filterStatus })
    });

    const result = await apiCall(`${API_BASE_URL}/api/admin/users?${params}`);
    
    if (result.success) {
      setUsers(result.data.users);
      setPagination(result.data.pagination);
    } else {
      setError(result.error || 'Failed to fetch users');
    }
    setLoading(false);
  }, [currentPage, searchTerm, filterStatus, pagination.limit]);

  // Initial data fetch
  useEffect(() => {
    fetchUserStats();
    fetchUsers();
  }, [fetchUserStats, fetchUsers]);

  // Refresh data
  const refreshData = () => {
    fetchUserStats();
    fetchUsers();
  };

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '') {
        fetchUsers();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, fetchUsers]);

  // Handle filter change
  useEffect(() => {
    fetchUsers();
  }, [filterStatus, currentPage, fetchUsers]);

  // Format stats for display
  const formatStats = () => {
    if (!stats) return [];

    return [
      {
        title: 'Total Users',
        value: stats.totalUsers.count.toLocaleString(),
        change: stats.totalUsers.growth,
        icon: UsersIcon,
        color: '#667eea',
        bgColor: 'rgba(102, 126, 234, 0.1)'
      },
      {
        title: 'Active Users',
        value: stats.activeUsers.count.toLocaleString(),
        change: `${stats.activeUsers.percentage}% active`,
        icon: CheckCircle,
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.1)'
      },
      {
        title: 'Pending Verification',
        value: stats.pendingVerification.count.toLocaleString(),
        change: stats.pendingVerification.count > 0 ? 'Needs attention' : 'All verified',
        icon: Calendar,
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.1)'
      },
      {
        title: 'Suspended Users',
        value: stats.suspendedUsers.count.toLocaleString(),
        change: stats.suspendedUsers.count > 0 ? 'Needs review' : 'All active',
        icon: Ban,
        color: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.1)'
      }
    ];
  };

  // Handle edit user
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      status: user.status,
      isVerified: user.isVerified
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    const result = await apiCall(`${API_BASE_URL}/api/admin/users/${selectedUser._id}`, {
      method: 'PUT',
      body: JSON.stringify(editForm)
    });

    if (result.success) {
      setShowEditModal(false);
      refreshData();
    } else {
      setError(result.error || 'Failed to update user');
    }
  };

  // Handle suspend/activate user
  const handleSuspendClick = (user) => {
    setSelectedUser(user);
    setShowSuspendModal(true);
  };

  const handleSuspendSubmit = async () => {
    const newStatus = selectedUser.status === 'active' ? 'suspended' : 'active';
    
    const result = await apiCall(`${API_BASE_URL}/api/admin/users/${selectedUser._id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus })
    });

    if (result.success) {
      setShowSuspendModal(false);
      refreshData();
    } else {
      setError(result.error || 'Failed to update user status');
    }
  };

  // Handle delete user
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteSubmit = async () => {
    const result = await apiCall(`${API_BASE_URL}/api/admin/users/${selectedUser._id}`, {
      method: 'DELETE'
    });

    if (result.success) {
      setShowDeleteModal(false);
      refreshData();
    } else {
      setError(result.error || 'Failed to delete user');
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    setCurrentPage(page);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400';
      case 'suspended':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="ml-5 lg:ml-5 mt-2 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 lg:mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-white m-0">Users Management</h1>
            <p className="text-xs lg:text-sm text-[#888] m-0 mt-1">
              Manage all registered users and their accounts
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={refreshData}
              className="bg-transparent border border-[#3a3a3a] text-[#ccc] px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-[#2a2a2a] hover:border-[#4a4a4a] text-xs lg:text-sm whitespace-nowrap flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="bg-[#f59e0b] text-[#1a1a1a] px-4 py-2 rounded-lg border-none font-semibold cursor-pointer transition-all duration-300 hover:bg-white text-xs lg:text-sm whitespace-nowrap shadow-lg shadow-amber-500/30 flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-6 lg:mb-8">
          {loadingStats ? (
            Array(4).fill().map((_, index) => (
              <div key={index} className="bg-[#2a2a2a] p-4 lg:p-6 rounded-xl border border-[#3a3a3a]">
                <div className="animate-pulse">
                  <div className="h-4 bg-[#3a3a3a] rounded mb-2 w-1/2"></div>
                  <div className="h-6 bg-[#3a3a3a] rounded mb-2 w-3/4"></div>
                  <div className="h-3 bg-[#3a3a3a] rounded w-1/3"></div>
                </div>
              </div>
            ))
          ) : (
            formatStats().map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-[#2a2a2a] p-4 lg:p-6 rounded-xl shadow-lg flex items-start gap-3 lg:gap-4 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 border border-[#3a3a3a] hover:border-[#4a4a4a] min-w-0 group">
                  <div 
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <Icon size={20} className="lg:size-6 transition-colors duration-200" style={{ color: stat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-[#888] font-medium mb-1 lg:mb-2 truncate">{stat.title}</p>
                    <h3 className="text-base lg:text-lg font-bold text-white mb-1 lg:mb-2 truncate">{stat.value}</h3>
                    <span 
                      className="inline-flex items-center gap-1 text-xs lg:text-sm font-semibold whitespace-nowrap transition-colors duration-200"
                      style={{ color: stat.color }}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4 lg:mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 lg:left-4 transform -translate-y-1/2 text-[#888] w-4 h-4 lg:w-5 lg:h-5 z-10" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-3 px-3 lg:px-4 pl-10 lg:pl-12 text-white outline-none text-xs lg:text-sm focus:border-[#f59e0b]"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute top-1/2 left-3 lg:left-4 transform -translate-y-1/2 text-[#888] w-4 h-4 lg:w-5 lg:h-5 z-10 pointer-events-none" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-3 px-3 lg:px-4 pl-10 lg:pl-12 pr-8 text-white outline-none text-xs lg:text-sm focus:border-[#f59e0b] cursor-pointer appearance-none min-w-[150px] lg:min-w-[180px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl overflow-hidden shadow-lg">
          {loading ? (
            <div className="p-8 flex justify-center items-center">
              <Loader className="w-8 h-8 text-[#f59e0b] animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center">
              <UsersIcon className="w-12 h-12 text-[#888] mx-auto mb-4" />
              <h3 className="text-white text-lg mb-2">No users found</h3>
              <p className="text-[#888] text-sm">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try changing your search or filter criteria'
                  : 'No users registered yet'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[1000px]">
                  <thead>
                    <tr>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">User</th>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Status</th>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Verified</th>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Join Date</th>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Last Login</th>
                      <th className="text-left p-4 text-[#888] text-xs lg:text-sm border-b border-[#3a3a3a] font-semibold whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-[#252525] transition-colors">
                        <td className="p-4 border-b border-[#3a3a3a] align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold text-xs lg:text-sm shadow-lg shadow-amber-500/30 bg-[#f59e0b] text-[#1a1a1a] flex-shrink-0">
                              {getInitials(user.name)}
                            </div>
                            <div>
                              <div className="text-white font-medium whitespace-nowrap text-xs lg:text-sm">{user.name}</div>
                              <div className="text-[#888] text-xs lg:text-sm whitespace-nowrap flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-[#3a3a3a] align-middle">
                          <span className={`inline-block px-3 py-1 rounded-lg text-xs lg:text-sm font-medium whitespace-nowrap capitalize ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 border-b border-[#3a3a3a] align-middle">
                          {user.isVerified ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 text-xs lg:text-sm whitespace-nowrap">
                              <CheckCircle className="w-4 h-4" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-400 text-xs lg:text-sm whitespace-nowrap">
                              <Calendar className="w-4 h-4" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="p-4 border-b border-[#3a3a3a] align-middle text-xs lg:text-sm whitespace-nowrap text-white">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="p-4 border-b border-[#3a3a3a] align-middle text-xs lg:text-sm whitespace-nowrap text-[#888]">
                          {formatDate(user.lastLogin)}
                        </td>
                        <td className="p-4 border-b border-[#3a3a3a] align-middle">
                          <div className="flex gap-2 flex-wrap">
                            <button 
                              onClick={() => handleEditClick(user)}
                              className="bg-transparent border-none p-1 cursor-pointer rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-[#333]"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4 text-[#888] hover:text-[#f59e0b]" />
                            </button>
                            <button 
                              onClick={() => handleSuspendClick(user)}
                              className="bg-transparent border-none p-1 cursor-pointer rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-[#333]"
                              title={user.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                            >
                              <Ban className={`w-4 h-4 ${user.status === 'suspended' ? 'text-emerald-400 hover:text-emerald-300' : 'text-red-400 hover:text-red-300'}`} />
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(user)}
                              className="bg-transparent border-none p-1 cursor-pointer rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-[#333]"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4 text-[#888] hover:text-[#ef4444]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center border-t border-[#3a3a3a] p-4 text-[#888] text-xs lg:text-sm flex-wrap gap-4">
                <span>
                  Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalUsers)} of {pagination.totalUsers} users
                </span>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className={`bg-transparent border-none text-xs lg:text-sm cursor-pointer rounded-lg px-3 py-1 whitespace-nowrap transition-all duration-200 ${
                      pagination.hasPrevPage 
                        ? 'text-[#888] hover:bg-[#333] hover:text-[#ccc]' 
                        : 'text-[#444] cursor-not-allowed'
                    }`}
                  >
                    Previous
                  </button>
                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`rounded-lg px-3 py-1 whitespace-nowrap text-xs lg:text-sm ${
                          page === pagination.currentPage
                            ? 'bg-[#f59e0b] text-[#1a1a1a] font-semibold'
                            : 'bg-transparent border-none text-[#888] hover:bg-[#333] hover:text-[#ccc]'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className={`bg-transparent border-none text-xs lg:text-sm cursor-pointer rounded-lg px-3 py-1 whitespace-nowrap transition-all duration-200 ${
                      pagination.hasNextPage 
                        ? 'text-[#888] hover:bg-[#333] hover:text-[#ccc]' 
                        : 'text-[#444] cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2a2a2a] rounded-xl p-6 max-w-md w-full">
            <h3 className="text-white text-lg font-bold mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#888] mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-white outline-none focus:border-[#f59e0b]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-white outline-none focus:border-[#f59e0b]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                  className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-white outline-none focus:border-[#f59e0b]"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.isVerified}
                  onChange={(e) => setEditForm({...editForm, isVerified: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm text-white">Verified</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-transparent border border-[#3a3a3a] text-white py-2 rounded-lg hover:bg-[#3a3a3a]"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 bg-[#f59e0b] text-[#1a1a1a] py-2 rounded-lg font-semibold hover:bg-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend/Activate Modal */}
      {showSuspendModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2a2a2a] rounded-xl p-6 max-w-md w-full">
            <h3 className="text-white text-lg font-bold mb-4">
              {selectedUser.status === 'active' ? 'Suspend User' : 'Activate User'}
            </h3>
            <p className="text-[#888] mb-6">
              Are you sure you want to {selectedUser.status === 'active' ? 'suspend' : 'activate'} {selectedUser.name}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSuspendModal(false)}
                className="flex-1 bg-transparent border border-[#3a3a3a] text-white py-2 rounded-lg hover:bg-[#3a3a3a]"
              >
                Cancel
              </button>
              <button
                onClick={handleSuspendSubmit}
                className={`flex-1 py-2 rounded-lg font-semibold ${
                  selectedUser.status === 'active'
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
              >
                {selectedUser.status === 'active' ? 'Suspend User' : 'Activate User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2a2a2a] rounded-xl p-6 max-w-md w-full">
            <h3 className="text-white text-lg font-bold mb-4">Delete User</h3>
            <p className="text-[#888] mb-6">
              Are you sure you want to delete {selectedUser.name}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-transparent border border-[#3a3a3a] text-white py-2 rounded-lg hover:bg-[#3a3a3a]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSubmit}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
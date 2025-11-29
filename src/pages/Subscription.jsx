import React, { useState } from 'react';

const Subscription = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [userFilter, setUserFilter] = useState('All Users');

  const stats = [
    {
      id: 1,
      title: 'Open Tickets',
      value: '12',
      icon: '🎫',
      iconBg: '#ef4444',
      bgColor: '#1f2937'
    },
    {
      id: 2,
      title: 'In Progress',
      value: '8',
      icon: '🔄',
      iconBg: '#f59e0b',
      bgColor: '#1f2937'
    },
    {
      id: 3,
      title: 'Resolved Today',
      value: '15',
      icon: '✓',
      iconBg: '#10b981',
      bgColor: '#1f2937'
    },
    {
      id: 4,
      title: 'Avg Response',
      value: '2.3h',
      icon: '⏱',
      iconBg: '#06b6d4',
      bgColor: '#1f2937'
    }
  ];

  const tickets = [
    {
      id: 1,
      title: 'Payment Issue',
      user: 'John Smith',
      userRole: 'Coach',
      description: 'Unable to receive payment for last month\'s coaching sessions. Getting error message...',
      time: '2 hours ago',
      priority: 'High',
      status: 'Open',
      avatar: 'JS',
      priorityColor: '#ef4444',
      statusColor: '#ef4444'
    },
    {
      id: 2,
      title: 'App Crashes on Workout',
      user: 'Sarah Wilson',
      userRole: 'Client',
      description: 'App keeps crashing when I try to start my workout routine. This has been happening...',
      time: '5 hours ago',
      priority: 'Medium',
      status: 'In Progress',
      avatar: 'SW',
      priorityColor: '#f59e0b',
      statusColor: '#f59e0b'
    },
    {
      id: 3,
      title: 'Recipe Not Loading',
      user: 'Mike Peterson',
      userRole: 'Client',
      description: 'Cannot access the meal plan recipes section. It shows loading indefinitely...',
      time: '1 day ago',
      priority: 'Low',
      status: 'Resolved',
      avatar: 'MP',
      priorityColor: '#10b981',
      statusColor: '#10b981'
    },
    {
      id: 4,
      title: 'Client Communication',
      user: 'Emma Davis',
      userRole: 'Coach',
      description: 'Having trouble sending messages to my clients. Messages appear to send but...',
      time: '2 days ago',
      priority: 'Medium',
      status: 'Open',
      avatar: 'ED',
      priorityColor: '#f59e0b',
      statusColor: '#ef4444'
    }
  ];

  const priorityData = [
    { label: 'High', value: 35, color: '#ef4444' },
    { label: 'Medium', value: 45, color: '#f59e0b' },
    { label: 'Low', value: 20, color: '#10b981' }
  ];

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-5 lg:ml-5 mt-2  lg:mt-12 p-4 lg:p-6 min-h-screen bg-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 lg:mb-8 flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <h1 className="text-lg lg:text-xl font-bold text-white m-0 mb-2">Customer Support</h1>
            <p className="text-xs lg:text-sm text-[#888] m-0">Manage support tickets from coaches and clients.</p>
          </div>
          <div className="flex gap-3 lg:gap-4 flex-wrap">
            <select 
              className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] min-w-[140px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
            <select 
              className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] min-w-[140px]"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option>All Users</option>
              <option>Coaches</option>
              <option>Clients</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-6 lg:mb-8">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-4 lg:p-5 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4a4a4a]">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-xs lg:text-sm text-[#888] font-medium mb-2">{stat.title}</p>
                  <h2 className="text-base lg:text-lg font-bold text-white">{stat.value}</h2>
                </div>
                <div 
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center text-lg lg:text-xl flex-shrink-0"
                  style={{ backgroundColor: stat.iconBg }}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Support Tickets Section */}
          <div className="xl:col-span-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4 lg:mb-6 flex-wrap gap-4">
              <h2 className="text-base lg:text-lg font-semibold text-white m-0">Support Tickets</h2>
              <div className="relative w-48 lg:w-56 mr-4 lg:mr-12">
                <svg className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-[#888] w-4 h-4 lg:w-5 lg:h-5 pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 pl-10 lg:pl-12 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:gap-4 mb-4 lg:mb-6">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 lg:p-5 transition-all duration-200 hover:bg-[#2a2a2a] hover:border-[#4a4a4a]">
                  <div className="flex justify-between items-start mb-3 lg:mb-4 flex-col lg:flex-row gap-3 lg:gap-4">
                    <div className="flex items-start gap-3 lg:gap-4 flex-1">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#f59e0b] flex items-center justify-center text-white font-bold text-xs lg:text-sm flex-shrink-0">
                        {ticket.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm lg:text-base mb-1 line-clamp-1">{ticket.title}</h3>
                        <p className="text-[#888] text-xs lg:text-sm m-0">
                          {ticket.user} • <span className="text-[#666]">{ticket.userRole}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 lg:gap-2 flex-wrap">
                      <span 
                        className="px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-semibold capitalize"
                        style={{ 
                          backgroundColor: `${ticket.priorityColor}20`,
                          color: ticket.priorityColor 
                        }}
                      >
                        {ticket.priority}
                      </span>
                      <span 
                        className="px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-semibold capitalize"
                        style={{ 
                          backgroundColor: `${ticket.statusColor}20`,
                          color: ticket.statusColor 
                        }}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#ccc] text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4 line-clamp-2">
                    {ticket.description}
                  </p>
                  <div className="flex justify-between items-center flex-col lg:flex-row gap-2 lg:gap-4">
                    <span className="text-[#666] text-xs lg:text-sm">{ticket.time}</span>
                    <button className="bg-transparent border border-[#f59e0b] text-[#f59e0b] px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-[#f59e0b] hover:text-[#1a1a1a] w-full lg:w-auto text-center">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 lg:gap-2">
              <button className="bg-[#1a1a1a] border border-[#3a3a3a] text-[#888] p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-[#4a4a4a] hover:text-[#ccc] flex items-center justify-center min-w-9">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="bg-[#f59e0b] text-[#1a1a1a] p-2 rounded-lg text-sm font-semibold cursor-pointer min-w-9">
                1
              </button>
              <button className="bg-[#1a1a1a] border border-[#3a3a3a] text-[#888] p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-[#4a4a4a] hover:text-[#ccc] min-w-9">
                2
              </button>
              <button className="bg-[#1a1a1a] border border-[#3a3a3a] text-[#888] p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-[#4a4a4a] hover:text-[#ccc] min-w-9">
                3
              </button>
              <button className="bg-[#1a1a1a] border border-[#3a3a3a] text-[#888] p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-[#4a4a4a] hover:text-[#ccc] flex items-center justify-center min-w-9">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4 lg:gap-6">
            {/* Quick Actions */}
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-4 lg:p-5 shadow-lg">
              <h3 className="text-white font-semibold text-sm lg:text-base mb-3 lg:mb-4">Quick Actions</h3>
              <button className="w-full flex items-center gap-2 bg-[#f59e0b] text-[#1a1a1a] border-none px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-white shadow-lg shadow-amber-500/30 mb-2 lg:mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Export Reports
              </button>
              <button className="w-full flex items-center gap-2 bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-[#2a2a2a] hover:border-[#4a4a4a]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m5.3-13.7 4.2 4.2M7.5 16.5l-4.2 4.2M1 12h6m6 0h6m-13.7-5.3 4.2-4.2M16.5 16.5l4.2 4.2"></path>
                </svg>
                Settings
              </button>
            </div>

            {/* Priority Distribution */}
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-4 lg:p-5 shadow-lg">
              <h3 className="text-white font-semibold text-sm lg:text-base mb-3 lg:mb-4">Priority Distribution</h3>
              <div className="flex flex-col gap-3 lg:gap-4">
                {priorityData.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="w-full h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#ccc] text-xs lg:text-sm font-medium">{item.label}</span>
                      <span className="text-xs lg:text-sm font-semibold" style={{ color: item.color }}>
                        {item.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
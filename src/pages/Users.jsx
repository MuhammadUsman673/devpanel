import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Users as UsersIcon,
  Mail,
  Calendar,
  RefreshCw,
  MessageSquare,
  UserPlus
} from 'lucide-react';

export default function Users() {
  const [selectedCoach] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@coachcorp.com',
    activeClients: 25,
    joinedDate: 'March 2024',
    tags: ['Readability', 'CrossFit']
  });

  const clients = [
    {
      id: 1,
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      subscription: 'Premium',
      paymentStatus: 'Paid',
      joinDate: '2024-01-15',
      avatar: 'MB'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      subscription: 'Basic',
      paymentStatus: 'Pending',
      joinDate: '2024-02-28',
      avatar: 'SW'
    },
    {
      id: 3,
      name: 'James Davis',
      email: 'james.davis@email.com',
      subscription: 'Premium',
      paymentStatus: 'Paid',
      joinDate: '2023-12-10',
      avatar: 'JD'
    },
    {
      id: 4,
      name: 'Lisa Martinez',
      email: 'lisa.martinez@email.com',
      subscription: 'Basic',
      paymentStatus: 'Overdue',
      joinDate: '2024-03-05',
      avatar: 'LM'
    },
    {
      id: 5,
      name: 'Robert Taylor',
      email: 'robert.taylor@email.com',
      subscription: 'Premium',
      paymentStatus: 'Paid',
      joinDate: '2024-01-22',
      avatar: 'RT'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'Pending':
        return 'bg-amber-500/20 text-amber-400';
      case 'Overdue':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getSubscriptionColor = (subscription) => {
    return subscription === 'Premium'
      ? 'bg-amber-500/20 text-amber-400'
      : 'bg-blue-500/20 text-blue-400';
  };

  return (
    <div className="ml-5 lg:ml-5 mt-12 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
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
          <button className="bg-[#f59e0b] text-[#1a1a1a] px-4 py-2 rounded-lg border-none font-semibold cursor-pointer transition-all duration-300 hover:bg-white text-xs lg:text-sm whitespace-nowrap shadow-lg shadow-amber-500/30">
            Switch Coach
          </button>
        </div>

        {/* Coach Info Card */}
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 mb-4 lg:mb-6 shadow-lg">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex gap-4 items-center flex-wrap">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-bold text-sm lg:text-base shadow-lg shadow-amber-500/30 bg-[#f59e0b] text-[#1a1a1a] flex-shrink-0">
                AJ
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
                    {selectedCoach.activeClients} Active Clients
                  </span>
                  <span className="text-xs lg:text-sm text-[#888] flex items-center gap-1 whitespace-nowrap">
                    <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-[#f59e0b]" />
                    Joined {selectedCoach.joinedDate}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {selectedCoach.tags.map((tag, idx) => (
                      <span key={idx} className="text-[#ccc] bg-[#333] rounded-lg px-2 py-1 text-xs whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-[#f59e0b] text-[#1a1a1a] px-4 py-2 rounded-lg border-none font-semibold whitespace-nowrap text-xs lg:text-sm shadow-lg shadow-amber-500/30">
              Active Coach
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 lg:mb-6 w-full">
          <div className="relative w-full">
            <Search className="absolute top-1/2 left-3 lg:left-4 transform -translate-y-1/2 text-[#888] w-4 h-4 lg:w-5 lg:h-5 z-10" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-3 px-3 lg:px-4 pl-10 lg:pl-12 text-white outline-none text-xs lg:text-sm focus:border-[#f59e0b]"
            />
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl overflow-hidden shadow-lg">
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
                  <tr key={client.id} className="hover:bg-[#252525] transition-colors">
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
                        <button className="bg-transparent border-none p-1 cursor-pointer rounded-lg transition-all duration-300 flex-shrink-0 hover:bg-[#333]">
                          <UserPlus className="w-4 h-4 text-[#888] hover:text-[#f59e0b]" />
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
            <span>Showing 1 to 5 of 25 clients</span>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-2 py-1 whitespace-nowrap transition-all duration-200 hover:bg-[#333] hover:text-[#ccc]">
                Previous
              </button>
              <button className="bg-[#f59e0b] text-[#1a1a1a] font-semibold rounded-lg px-2 py-1 whitespace-nowrap text-xs lg:text-sm">
                1
              </button>
              <button className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-2 py-1 whitespace-nowrap transition-all duration-200 hover:bg-[#333] hover:text-[#ccc]">
                2
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import RegisterCoachModal from '../components/RegisterCoachModal';

const Coaches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const coaches = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@coachcorp.com',
      clients: 26,
      dateJoined: '2024-03-15',
      status: 'Active',
      avatar: 'AJ'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@coachcorp.com',
      clients: 18,
      dateJoined: '2024-01-20',
      status: 'Active',
      avatar: 'MG'
    },
    {
      id: 3,
      name: 'David Smith',
      email: 'david.smith@coachcorp.com',
      clients: 32,
      dateJoined: '2023-11-08',
      status: 'Suspended',
      avatar: 'DS'
    },
    {
      id: 4,
      name: 'Emily White',
      email: 'emily.white@coachcorp.com',
      clients: 22,
      dateJoined: '2023-09-10',
      status: 'Active',
      avatar: 'EW'
    }
  ];

  const filteredCoaches = coaches.filter(coach =>
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 lg:p-8 text-gray-300 ml-5 lg:ml-5 mt-12 lg:mt-12 mr-5 lg:mr-5">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 lg:mb-8 flex-wrap gap-4 lg:gap-5">
        <div className="flex-1 min-w-[250px]">
          <h1 className="text-lg lg:text-xl font-bold text-white m-0 mb-2">Manage Coaches</h1>
          <p className="text-xs lg:text-sm text-[#888] m-0">Register new coaches and manage existing ones.</p>
        </div>
        <div className="flex gap-3 lg:gap-4 items-center flex-wrap">
          <div className="relative w-48 lg:w-56 mr-4 lg:mr-12">
            <svg className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-[#888] w-4 h-4 lg:w-5 lg:h-5 pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search coaches..."
              className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 pl-10 lg:pl-12 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] focus:bg-[#252525]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-[#f59e0b] text-[#1a1a1a] border-none rounded-lg text-xs lg:text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-white whitespace-nowrap shadow-lg shadow-amber-500/30"
            onClick={handleOpenModal}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
            Register Coach
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl overflow-hidden mb-4 lg:mb-6 shadow-lg overflow-x-auto scrollbar-thin scrollbar-thumb-[#555] scrollbar-track-[#2a2a2a]">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#252525] border-b border-[#3a3a3a]">
              <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Coach</th>
              <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Clients</th>
              <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Date Joined</th>
              <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoaches.map((coach) => (
              <tr key={coach.id} className="border-b border-[#3a3a3a] transition-colors hover:bg-[#252525] last:border-b-0">
                <td className="p-4 lg:p-6 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-bold text-xs lg:text-sm shadow-lg shadow-amber-500/30 bg-[#f59e0b] text-[#1a1a1a] flex-shrink-0">
                      {coach.avatar}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-white font-semibold text-xs lg:text-sm">{coach.name}</div>
                      <div className="text-[#888] text-xs lg:text-sm">{coach.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 lg:p-6 align-middle">
                  <span className="text-white font-medium text-xs lg:text-sm">{coach.clients}</span>
                </td>
                <td className="p-4 lg:p-6 align-middle">
                  <span className="text-[#ccc] text-xs lg:text-sm">{coach.dateJoined}</span>
                </td>
                <td className="p-4 lg:p-6 align-middle">
                  <span className={`inline-block px-3 lg:px-3.5 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold capitalize whitespace-nowrap ${
                    coach.status === 'Active' 
                      ? 'bg-cyan-500/15 text-cyan-400' 
                      : coach.status === 'Suspended'
                      ? 'bg-red-500/15 text-red-400'
                      : 'bg-amber-500/15 text-amber-400'
                  }`}>
                    {coach.status}
                  </span>
                </td>
                <td className="p-4 lg:p-6 align-middle">
                  <div className="flex gap-2 lg:gap-2 items-center">
                    <button className="bg-transparent border-none p-2 rounded-lg cursor-pointer transition-all duration-200 text-[#888] hover:bg-[#333] hover:text-[#f59e0b]" title="Edit">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button className="bg-transparent border-none p-2 rounded-lg cursor-pointer transition-all duration-200 text-[#888] hover:bg-[#333] hover:text-[#f59e0b]" title="Message">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                    <button className="bg-transparent border-none p-2 rounded-lg cursor-pointer transition-all duration-200 text-[#888] hover:bg-[#333] hover:text-[#f59e0b]" title="More">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 flex justify-between items-center flex-wrap gap-4">
        <span className="text-[#888] text-xs lg:text-sm">Showing 1 to 4 of 16 entries</span>
        <div className="flex gap-2 lg:gap-2 items-center flex-wrap">
          <button className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-3 lg:px-3.5 py-1.5 lg:py-2 transition-all duration-200 hover:bg-[#333] hover:text-[#ccc] whitespace-nowrap">
            Previous
          </button>
          <button className="bg-[#f59e0b] text-[#1a1a1a] text-xs lg:text-sm font-semibold cursor-pointer rounded-lg px-3 lg:px-3.5 py-1.5 lg:py-2 whitespace-nowrap">
            1
          </button>
          <button className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-3 lg:px-3.5 py-1.5 lg:py-2 transition-all duration-200 hover:bg-[#333] hover:text-[#ccc] whitespace-nowrap">
            2
          </button>
          <button className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-3 lg:px-3.5 py-1.5 lg:py-2 transition-all duration-200 hover:bg-[#333] hover:text-[#ccc] whitespace-nowrap">
            3
          </button>
          <button className="bg-transparent border-none text-[#888] text-xs lg:text-sm cursor-pointer rounded-lg px-3 lg:px-3.5 py-1.5 lg:py-2 transition-all duration-200 hover:bg-[#333] hover:text-[#ccc] whitespace-nowrap">
            Next
          </button>
        </div>
      </div>

      {/* Register Coach Modal */}
      <RegisterCoachModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Coaches;
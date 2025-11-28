  // src/components/Topbar.jsx
  import { Bell, Settings, User, LogOut } from "lucide-react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import NotificationModal from "./NotificationPopup";

  function Topbar() {
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => navigate("/profile");
    const handleLogoutClick = () => setShowLogoutAlert(true);
    
    const confirmLogout = () => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");
      setShowLogoutAlert(false);
      navigate("/login");
    };

    const cancelLogout = () => setShowLogoutAlert(false);

    return (
      <>
        {/* Topbar with responsive margins */}
        <div className="h-[65px] bg-[#1a1a1a] flex items-center justify-between px-4 shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-700 lg:ml-[220px]">
          {/* Left Section */}
          <div className="flex items-center">
            <h3 className="text-base font-semibold text-white m-0 hidden sm:block">
              Welcome, Admin
            </h3>
            <h3 className="text-base font-semibold text-white m-0 block sm:hidden ml-12">
              Welcome, Admin
            </h3>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <button
              className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-800 border border-gray-700 rounded-lg cursor-pointer text-gray-400 transition-all duration-200 hover:bg-gray-700 hover:text-white hover:-translate-y-0.5 hover:shadow-lg"
              onClick={() => setIsNotificationModalOpen(true)}
            >
              <Bell size={18} className="sm:size-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-[10px] sm:text-xs font-semibold px-1 sm:px-1.5 py-0.5 rounded-full min-w-[16px] sm:min-w-[18px] text-center shadow-lg shadow-blue-500/40">
                3
              </span>
            </button>

            {/* Settings - Hidden on mobile */}
            <button className="w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex items-center justify-center bg-gray-800 border border-gray-700 rounded-lg cursor-pointer text-gray-400 transition-all duration-200 hover:bg-gray-700 hover:text-white hover:-translate-y-0.5 hover:shadow-lg">
              <Settings size={18} className="sm:size-5" />
            </button>

            {/* Profile */}
            <button
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-800 border border-gray-700 rounded-lg cursor-pointer text-gray-400 transition-all duration-200 hover:bg-gray-700 hover:text-white hover:-translate-y-0.5 hover:shadow-lg"
              onClick={handleProfileClick}
            >
              <User size={18} className="sm:size-5" />
            </button>

            {/* Logout */}
            <button 
              className="flex items-center gap-1 sm:gap-2 bg-amber-500 text-gray-900 border-none px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-lg cursor-pointer text-xs sm:text-sm font-semibold transition-all duration-200 hover:bg-amber-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/40 active:translate-y-0"
              onClick={handleLogoutClick}
            >
              <LogOut size={16} className="sm:size-[18px]" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Notification Modal */}
        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
        />

        {/* Logout Alert */}
        {showLogoutAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] animate-fadeIn">
            <div className="bg-white rounded-xl w-11/12 max-w-md shadow-xl animate-slideIn">
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
                <h3 className="m-0 text-base sm:text-lg font-semibold text-gray-900">Confirm Logout</h3>
              </div>
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <p className="m-0 text-sm text-gray-500 leading-relaxed">
                  Are you sure you want to logout?
                </p>
              </div>
              <div className="p-4 sm:p-6 flex gap-3 flex-col sm:flex-row justify-end">
                <button 
                  className="px-3 sm:px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 order-2 sm:order-1"
                  onClick={cancelLogout}
                >
                  Cancel
                </button>
                <button 
                  className="px-3 sm:px-4 py-2 border-none bg-red-600 text-white rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-red-700 order-1 sm:order-2"
                  onClick={confirmLogout}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  export default Topbar;
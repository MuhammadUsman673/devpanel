// src/components/Topbar.jsx
import { Bell, Settings, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Topbar.module.css";
import NotificationModal from "./NotificationPopup";

function Topbar() {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const navigate = useNavigate();

  // ✅ Navigate to profile page
  const handleProfileClick = () => {
    navigate("/profile");
  };

  // ✅ Show logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutAlert(true);
  };

  // ✅ Confirm logout
  const confirmLogout = () => {
    // Clear stored authentication data
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    
    // Close alert and redirect to login
    setShowLogoutAlert(false);
    navigate("/login");
  };

  // ✅ Cancel logout
  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  return (
    <>
      <div className={styles.topbar}>
        {/* Left Section - Welcome message hidden on mobile */}
        <div className={styles.leftSection}>
          <h3 className={styles.greeting}>Welcome, Admin</h3>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* Notifications */}
          <button
            className={styles.iconButton}
            aria-label="Notifications"
            onClick={() => setIsNotificationModalOpen(true)}
          >
            <Bell size={20} />
            <span className={styles.badge}>3</span>
          </button>

          {/* Settings - Hidden on mobile */}
          <button
            className={`${styles.iconButton} ${styles.settingsButton}`}
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>

          {/* Profile - Always visible */}
          <button
            className={`${styles.iconButton} ${styles.profileButton}`}
            aria-label="Profile"
            onClick={handleProfileClick}
          >
            <User size={20} />
          </button>

          {/* Logout */}
          <button 
            className={styles.logout} 
            onClick={handleLogoutClick}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />

      {/* Custom Logout Confirmation Alert */}
      {showLogoutAlert && (
        <div className={styles.alertOverlay}>
          <div className={styles.alertModal}>
            <div className={styles.alertHeader}>
              <h3>Confirm Logout</h3>
            </div>
            <div className={styles.alertBody}>
              <p>Are you sure you want to logout?</p>
            </div>
            <div className={styles.alertActions}>
              <button 
                className={styles.cancelButton} 
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton} 
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
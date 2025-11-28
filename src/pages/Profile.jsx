import { Camera, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Profile() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Admin",
    email: "123@gmail.com"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
    // Add your profile update logic here
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password update:", passwordData);
    // Add your password update logic here
  };

  const handlePasswordReset = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="ml-5 lg:ml-5 mt-12 lg:mt-12 p-4 lg:p-6 min-h-screen bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h2 className="text-lg lg:text-xl font-bold text-white mb-2">Profile Settings</h2>
          <p className="text-xs lg:text-sm text-[#888]">Manage your account information and security</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Profile Picture Section */}
          <div className="xl:col-span-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 flex flex-col items-center">
            <div className="flex flex-col items-center w-full">
              <div className="relative mb-4">
                <div className="w-32 h-32 lg:w-35 lg:h-35 rounded-full bg-[#f59e0b] flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <span className="text-white font-bold text-lg lg:text-xl">BB</span>
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 lg:w-9 lg:h-9 bg-[#2a2a2a] border-3 border-[#1a1a1a] rounded-full flex items-center justify-center cursor-pointer text-white transition-all duration-200 hover:bg-[#3a3a3a] hover:scale-110">
                  <Camera size={14} className="lg:size-4" />
                </button>
              </div>
              <p className="text-[#ccc] text-xs lg:text-sm mb-4 lg:mb-5 text-center">{profileData.email}</p>
              <button className="w-full flex items-center justify-center gap-2 bg-[#f59e0b] text-[#1a1a1a] border-none px-4 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-white shadow-lg shadow-amber-500/30">
                <Camera size={16} className="lg:size-4" />
                <span>UPLOAD IMAGE</span>
              </button>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="xl:col-span-2 flex flex-col gap-4 lg:gap-6">
            {/* Personal Information Section */}
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6 pb-3 lg:pb-4 border-b border-[#3a3a3a]">
                <User size={18} className="lg:size-5 text-white" />
                <h3 className="text-white font-semibold text-sm lg:text-base m-0">PERSONAL INFORMATION</h3>
              </div>
              
              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4 lg:gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[#ccc] text-xs lg:text-sm font-medium">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] focus:bg-[#2a2a2a]"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#ccc] text-xs lg:text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] focus:bg-[#2a2a2a]"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <button type="submit" className="bg-[#f59e0b] text-[#1a1a1a] border-none px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-white">
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password Section */}
            <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6">
              <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6 pb-3 lg:pb-4 border-b border-[#3a3a3a]">
                <Lock size={18} className="lg:size-5 text-white" />
                <h3 className="text-white font-semibold text-sm lg:text-base m-0">CHANGE PASSWORD</h3>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 lg:gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[#ccc] text-xs lg:text-sm font-medium">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 pr-10 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] focus:bg-[#2a2a2a]"
                      placeholder="Current Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-[#666] cursor-pointer p-1 transition-all duration-200 hover:text-[#ccc]"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={16} className="lg:size-4" /> : <Eye size={16} className="lg:size-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#ccc] text-xs lg:text-sm font-medium">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 pr-10 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] focus:bg-[#2a2a2a]"
                      placeholder="New Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-[#666] cursor-pointer p-1 transition-all duration-200 hover:text-[#ccc]"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={16} className="lg:size-4" /> : <Eye size={16} className="lg:size-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#ccc] text-xs lg:text-sm font-medium">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg py-2.5 lg:py-3 px-3 lg:px-4 pr-10 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] focus:bg-[#2a2a2a]"
                      placeholder="Confirm New Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-[#666] cursor-pointer p-1 transition-all duration-200 hover:text-[#ccc]"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} className="lg:size-4" /> : <Eye size={16} className="lg:size-4" />}
                    </button>
                  </div>
                </div>

                <p className="text-[#666] text-xs lg:text-sm mt-2">Password must be at least 6 characters</p>

                <div className="flex gap-3 lg:gap-4 justify-end mt-2 flex-col sm:flex-row">
                  <button type="submit" className="bg-[#f59e0b] text-[#1a1a1a] border-none px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-white order-2 sm:order-1">
                    Update Password
                  </button>
                  <button 
                    type="button" 
                    className="bg-[#f59e0b] text-[#1a1a1a] border-none px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-white order-1 sm:order-2 shadow-lg shadow-amber-500/30"
                    onClick={handlePasswordReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
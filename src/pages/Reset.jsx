import myPic from "../assets/gym.jpeg";
import { FaArrowLeft, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

function Reset() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { email, code } = location.state || {};
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email || !code) {
      navigate("/forgot");
    }
  }, [email, code, navigate]);

  const validatePassword = (pwd) => {
    const requirements = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
    };
    return requirements;
  };

  const requirements = validatePassword(password);
  const isPasswordValid = Object.values(requirements).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet all requirements");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          code, 
          newPassword: password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-[#0a0a0a]">
      {/* ===== LEFT SECTION - Hidden on mobile ===== */}
      <div className="hidden lg:flex flex-1 relative justify-center items-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)] -top-24 -right-24 animate-float"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,transparent_70%)] -bottom-20 -left-20 animate-float-reverse"></div>
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] top-1/2 left-[10%] animate-float-slow"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[500px] p-10 animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-start mb-10">
            <img 
              src={myPic} 
              alt="Logo" 
              className="w-20 h-20 rounded-full object-cover shadow-[0_8px_32px_rgba(245,158,11,0.3)] border-[3px] border-[rgba(245,158,11,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(245,158,11,0.4)]" 
            />
          </div>

          <div className="animate-fade-in">
            <h1 className="text-6xl font-bold text-white mb-6 tracking-[-2px] leading-none">
              New Password
            </h1>
            <p className="text-lg text-[#9ca3af] leading-relaxed max-w-[450px]">
              Your new password must be different from previously used passwords. Make it strong and secure.
            </p>
          </div>
        </div>
      </div>

      {/* ===== RIGHT SECTION - Always visible ===== */}
      <div className="flex-1 flex justify-center items-center min-h-screen lg:min-h-0 bg-[#0a0a0a] p-6 sm:p-8 lg:p-10">
        <div className="w-full max-w-[440px]">
          <div className="bg-[rgba(26,26,26,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-slide-in">
            
            {/* Mobile Logo - Only show on mobile */}
            <div className="flex justify-center mb-8 lg:hidden">
              <img 
                src={myPic} 
                alt="Logo" 
                className="w-16 h-16 rounded-full object-cover shadow-[0_8px_32px_rgba(245,158,11,0.3)] border-[3px] border-[rgba(245,158,11,0.2)]" 
              />
            </div>

            <div className="text-center mb-9">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[rgba(245,158,11,0.2)] to-[rgba(245,158,11,0.1)] rounded-full mb-6 animate-pulse-custom">
                <FaLock className="text-3xl text-amber-500" />
              </div>

              <h1 className="text-3xl font-bold text-white tracking-[-0.5px] mb-3">
                Reset Password
              </h1>
              <p className="text-[#9ca3af] leading-relaxed max-w-[350px] mx-auto">
                Please enter your new password below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              {message && (
                <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg">
                  {message}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* New Password Input */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#e5e7eb] mb-2 tracking-wide">
                  New Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password" 
                    className="w-full px-4 py-3.5 pr-12 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgba(255,255,255,0.3)] transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-[rgba(255,255,255,0.08)] focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-50 disabled:cursor-not-allowed"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button 
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-[#9ca3af] cursor-pointer p-2 transition-colors duration-200 hover:text-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#e5e7eb] mb-2 tracking-wide">
                  Confirm Password
                </label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password" 
                    className="w-full px-4 py-3.5 pr-12 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgba(255,255,255,0.3)] transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-[rgba(255,255,255,0.08)] focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-50 disabled:cursor-not-allowed"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button 
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-[#9ca3af] cursor-pointer p-2 transition-colors duration-200 hover:text-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] rounded-xl p-5">
                <p className="text-sm font-semibold text-amber-500 mb-3">
                  Password must contain:
                </p>
                <ul className="space-y-2">
                  <li className={`text-sm ${requirements.length ? 'text-green-500' : 'text-red-500'}`}>
                    {requirements.length ? '✓' : '○'} At least 8 characters
                  </li>
                  <li className={`text-sm ${requirements.uppercase ? 'text-green-500' : 'text-red-500'}`}>
                    {requirements.uppercase ? '✓' : '○'} One uppercase letter
                  </li>
                  <li className={`text-sm ${requirements.lowercase ? 'text-green-500' : 'text-red-500'}`}>
                    {requirements.lowercase ? '✓' : '○'} One lowercase letter
                  </li>
                  <li className={`text-sm ${requirements.number ? 'text-green-500' : 'text-red-500'}`}>
                    {requirements.number ? '✓' : '○'} One number
                  </li>
                </ul>
              </div>

              {/* Reset Button */}
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-br from-amber-500 to-amber-600 text-[#0a0a0a] font-bold rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,158,11,0.5)] hover:bg-gradient-to-br hover:from-amber-400 hover:to-amber-500 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide"
                disabled={loading || !isPasswordValid}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              {/* Back to Login */}
              <div className="text-center pt-5 border-t border-[rgba(255,255,255,0.1)]">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-sm text-[#9ca3af] font-medium transition-all duration-300 hover:text-amber-500 group"
                >
                  <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        @keyframes float-reverse {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(20px) scale(1.05);
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.03);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse-custom {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(245, 158, 11, 0);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.3s both;
        }
        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Reset;
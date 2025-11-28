import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import myPic from "../assets/gym.jpeg";
import { API_ENDPOINTS } from "../config/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      const timer = setTimeout(() => navigate("/"), 0);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminEmail", data.admin.email);
        localStorage.setItem("adminId", data.admin.id);
        navigate("/");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Network error. Please check your connection and try again.");
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

        {/* Logo top left */}
        <div className="absolute top-8 left-8 z-10">
          <img 
            src={myPic} 
            alt="Logo" 
            className="w-12 h-12 rounded-full object-cover shadow-[0_8px_32px_rgba(245,158,11,0.3)] border-[3px] border-[rgba(245,158,11,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(245,158,11,0.4)]" 
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[500px] p-10 animate-fade-in-up">
          <div className="animate-fade-in">
            <h1 className="text-6xl font-bold text-white mb-12 tracking-[-2px] leading-none">
              Sign In
            </h1>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#e5e7eb] text-lg transition-all duration-300 hover:translate-x-1 hover:text-white">
                <span className="flex items-center justify-center w-6 h-6 bg-[rgba(245,158,11,0.2)] rounded-full text-amber-500 text-xs">
                  <FaCheck />
                </span>
                <span>Fully auto-layout</span>
              </div>
              <div className="flex items-center gap-3 text-[#e5e7eb] text-lg transition-all duration-300 hover:translate-x-1 hover:text-white">
                <span className="flex items-center justify-center w-6 h-6 bg-[rgba(245,158,11,0.2)] rounded-full text-amber-500 text-xs">
                  <FaCheck />
                </span>
                <span>Responsive design</span>
              </div>
              <div className="flex items-center gap-3 text-[#e5e7eb] text-lg transition-all duration-300 hover:translate-x-1 hover:text-white">
                <span className="flex items-center justify-center w-6 h-6 bg-[rgba(245,158,11,0.2)] rounded-full text-amber-500 text-xs">
                  <FaCheck />
                </span>
                <span>Easy to use</span>
              </div>
            </div>
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
              <h2 className="text-xs uppercase tracking-[3px] text-amber-500 font-semibold mb-3">
                WELCOME BACK
              </h2>
              <h1 className="text-3xl font-bold text-white tracking-[-0.5px]">
                Log In
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#e5e7eb] mb-2 tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgba(255,255,255,0.3)] transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-[rgba(255,255,255,0.08)] focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-50 disabled:cursor-not-allowed"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#e5e7eb] mb-2 tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgba(255,255,255,0.3)] transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-[rgba(255,255,255,0.08)] focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-50 disabled:cursor-not-allowed"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm text-center font-medium">
                    {error}
                  </p>
                </div>
              )}

              {/* Forgot Password */}
              <div className="text-right">
                <Link 
                  to="/forgot" 
                  className="text-sm text-amber-500 font-medium transition-all duration-200 hover:text-amber-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-br from-amber-500 to-amber-600 text-[#0a0a0a] font-bold rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,158,11,0.5)] hover:bg-gradient-to-br hover:from-amber-400 hover:to-amber-500 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </span>
                ) : (
                  "Log In"
                )}
              </button>
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
      `}</style>
    </div>
  );
}

export default Login;
import { useState } from "react";
import myPic from "../assets/gym.jpeg";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

function Forgot() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setStep(2);
      } else {
        setError(data.message || "Failed to send reset code.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_RESET_CODE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/reset", { state: { email, code } });
      } else {
        setError(data.message || "Invalid or expired code.");
      }
    } catch (err) {
      console.error("Verify code error:", err);
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
              Reset Password
            </h1>
            <p className="text-lg text-[#9ca3af] leading-relaxed max-w-[450px]">
              {step === 1 && "Don't worry! It happens. Please enter the email address associated with your account."}
              {step === 2 && "Enter the 6-digit code we sent to your email address."}
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
                <FaEnvelope className="text-3xl text-amber-500" />
              </div>

              <h1 className="text-3xl font-bold text-white tracking-[-0.5px] mb-3">
                {step === 1 && "Forgot Password?"}
                {step === 2 && "Verify Code"}
              </h1>
              <p className="text-[#9ca3af] leading-relaxed max-w-[350px] mx-auto">
                {step === 1 && "Enter your email address and we'll send you a verification code."}
                {step === 2 && "Check your email for the 6-digit verification code."}
              </p>
            </div>

            {/* Success Message */}
            {message && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg mb-4">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* STEP 1: Enter Email */}
            {step === 1 && (
              <form onSubmit={handleSendCode} className="space-y-7">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#e5e7eb] mb-2 tracking-wide">
                    Email Address
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

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-br from-amber-500 to-amber-600 text-[#0a0a0a] font-bold rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,158,11,0.5)] hover:bg-gradient-to-br hover:from-amber-400 hover:to-amber-500 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </button>

                <div className="text-center pt-5 border-t border-[rgba(255,255,255,0.1)]">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center gap-2 text-sm text-[#9ca3af] font-medium transition-all duration-300 hover:text-amber-500"
                  >
                    <FaArrowLeft className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to Login
                  </Link>
                </div>
              </form>
            )}

            {/* STEP 2: Enter Verification Code */}
            {step === 2 && (
              <form onSubmit={handleVerifyCode} className="space-y-7">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#e5e7eb] mb-2 tracking-wide">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-3.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgba(255,255,255,0.3)] transition-all duration-300 focus:outline-none focus:border-amber-500 focus:bg-[rgba(255,255,255,0.08)] focus:shadow-[0_0_0_4px_rgba(245,158,11,0.1)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-50 disabled:cursor-not-allowed text-center text-2xl tracking-[10px]"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-br from-amber-500 to-amber-600 text-[#0a0a0a] font-bold rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(245,158,11,0.5)] hover:bg-gradient-to-br hover:from-amber-400 hover:to-amber-500 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </button>

                <div className="text-center pt-5 border-t border-[rgba(255,255,255,0.1)]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 text-sm text-[#9ca3af] font-medium transition-all duration-300 hover:text-amber-500 bg-transparent border-none cursor-pointer"
                  >
                    <FaArrowLeft className="text-xs" />
                    Back to Email
                  </button>
                </div>
              </form>
            )}
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

export default Forgot;
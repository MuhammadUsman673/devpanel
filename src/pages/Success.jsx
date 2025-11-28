import myPic from "../assets/gym.jpeg";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-[#0a0a0a]">
      {/* ===== LEFT SECTION - Hidden on mobile ===== */}
      <div className="hidden lg:flex flex-1 relative justify-center items-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.15)_0%,transparent_70%)] -top-24 -right-24 animate-float"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.1)_0%,transparent_70%)] -bottom-20 -left-20 animate-float-reverse"></div>
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] top-1/2 left-[10%] animate-float-slow"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[500px] p-10 animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-start mb-10">
            <img 
              src={myPic} 
              alt="Logo" 
              className="w-20 h-20 rounded-full object-cover shadow-[0_8px_32px_rgba(34,197,94,0.3)] border-[3px] border-[rgba(34,197,94,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(34,197,94,0.4)]" 
            />
          </div>

          <div className="animate-fade-in">
            <h1 className="text-6xl font-bold text-white mb-6 tracking-[-2px] leading-none">
              All Set!
            </h1>
            <p className="text-lg text-[#9ca3af] leading-relaxed max-w-[450px]">
              Your password has been successfully reset. You can now log in with your new password and continue your fitness journey.
            </p>
          </div>
        </div>
      </div>

      {/* ===== RIGHT SECTION - Always visible ===== */}
      <div className="flex-1 flex justify-center items-center min-h-screen lg:min-h-0 bg-[#0a0a0a] p-6 sm:p-8 lg:p-10">
        <div className="w-full max-w-[480px]">
          <div className="bg-[rgba(26,26,26,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-slide-in text-center">
            
            {/* Mobile Logo - Only show on mobile */}
            <div className="flex justify-center mb-8 lg:hidden">
              <img 
                src={myPic} 
                alt="Logo" 
                className="w-16 h-16 rounded-full object-cover shadow-[0_8px_32px_rgba(34,197,94,0.3)] border-[3px] border-[rgba(34,197,94,0.2)]" 
              />
            </div>

            {/* Success Animation */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-28 h-28 lg:w-30 lg:h-30 bg-gradient-to-br from-[rgba(34,197,94,0.2)] to-[rgba(34,197,94,0.1)] rounded-full animate-scale-in animate-pulse-custom">
                <FaCheckCircle className="text-4xl lg:text-5xl text-green-500 animate-check-pop" />
              </div>
            </div>

            {/* Content */}
            <div className="animate-fade-in-delayed">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-[-0.5px]">
                Password Reset Successful!
              </h1>
              <p className="text-[#9ca3af] leading-relaxed mb-7 lg:mb-8">
                Your password has been changed successfully. You can now use your new password to log in to your account.
              </p>

              {/* Info Box */}
              <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-xl p-5 mb-8 lg:mb-9">
                <p className="text-[#d1d5db] leading-relaxed text-sm lg:text-base">
                  <strong className="text-green-500 font-semibold">Security Tip:</strong> Make sure to keep your password secure and don't share it with anyone.
                </p>
              </div>

              {/* Button */}
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-br from-green-500 to-green-600 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(34,197,94,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,197,94,0.5)] hover:bg-gradient-to-br hover:from-green-400 hover:to-green-500 active:translate-y-0 uppercase tracking-wide group"
              >
                Back to Login
                <FaArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Help Section */}
              <div className="pt-5 border-t border-[rgba(255,255,255,0.1)] mt-6 lg:mt-7">
                <p className="text-[#9ca3af] text-sm lg:text-base">
                  Having trouble logging in?{" "}
                  <Link 
                    to="/reset" 
                    className="text-green-500 font-medium transition-colors duration-200 hover:text-green-400 hover:underline"
                  >
                    Reset password again
                  </Link>
                </p>
              </div>
            </div>
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
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes pulse-custom {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(34, 197, 94, 0);
          }
        }
        @keyframes check-pop {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
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
        .animate-scale-in {
          animation: scale-in 0.6s ease-out 0.3s both;
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out 1s infinite;
        }
        .animate-check-pop {
          animation: check-pop 0.4s ease-out 0.6s both;
        }
        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.8s both;
        }
      `}</style>
    </div>
  );
}

export default Success;
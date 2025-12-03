// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  UtensilsCrossed, 
  Dumbbell,        
  UserCircle,
  Menu,
  X,
  CreditCard,
  Package
} from "lucide-react";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/users", label: "CoachAssignments", icon: Users },
    { path: "/users-management", label: "UsersManagement", icon: Users },
    { path: "/coaches", label: "Coaches", icon: UserCog },
    { path: "/food-plans", label: "Food Plans", icon: UtensilsCrossed },
    { path: "/exercise", label: "Exercise", icon: Dumbbell },
    { path: "/payment", label: "Payment", icon: CreditCard }, 
    { path: "/subscription", label: "Subscription", icon: Package }, 
    { path: "/profile", label: "Profile", icon: UserCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Toggle Button - MOBILE & TABLET ONLY (hidden on desktop) */}
      <button 
        className="fixed top-3 left-2 z-[1001] bg-transparent border-none p-[6px] rounded-[6px] cursor-pointer text-[#a0a0a0] transition-all duration-300 ease-in-out w-[25px] h-[25px] hover:bg-[#3a3a3a] hover:text-white hover:shadow-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay - MOBILE & TABLET ONLY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-[998] lg:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar - Responsive behavior */}
      <div className={`w-[200px] sm:w-[220px] h-screen bg-[#1a1a1a] flex flex-col py-6 px-4 fixed left-0 top-0 z-[999] shadow-[4px_0_16px_rgba(0,0,0,0.3)] overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-in-out lg:transform-none lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo Container */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10 p-3 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a]">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] sm:rounded-[10px] flex items-center justify-center font-bold text-[0.6rem] sm:text-[0.7rem] shadow-[0_2px_8px_rgba(245,158,11,0.3)] bg-[#f59e0b] text-[#1a1a1a]">
            AP
          </div>
          <h2 className="text-[0.7rem] sm:text-[0.8rem] font-bold text-white tracking-[-0.5px]">Admin Panel</h2>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col gap-1 sm:gap-1.5 flex-1 mb-8 sm:mb-10">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 sm:gap-3 text-[#888] no-underline text-[0.65rem] sm:text-[0.7rem] font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-[8px] sm:rounded-[10px] transition-all duration-200 ease-in-out relative ${
                  isActive(item.path) 
                    ? 'bg-[#f59e0b] text-[#1a1a1a] shadow-[0_2px_8px_rgba(245,158,11,0.3)]' 
                    : 'hover:bg-[#2a2a2a] hover:text-[#ccc] hover:translate-x-[2px]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon 
                  size={18} 
                  className="sm:size-5 flex-shrink-0 transition-all duration-200"
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
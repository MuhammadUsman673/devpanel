// src/components/Dashboard.jsx
import { 
  Users, 
  DollarSign, 
  Activity, 
  CheckCircle, 
  TrendingUp,
  Clock,
  UserCheck,
  AlertCircle
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "#667eea",
      bgColor: "rgba(102, 126, 234, 0.1)",
      iconColor: "#667eea"
    },
    {
      title: "Revenue",
      value: "$56,789",
      change: "+23%",
      icon: DollarSign,
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
      iconColor: "#10b981"
    },
    {
      title: "Active Sessions",
      value: "456",
      change: "+8%",
      icon: Activity,
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
      iconColor: "#f59e0b"
    },
    {
      title: "Tasks Completed",
      value: "892",
      change: "+15%",
      icon: CheckCircle,
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
      iconColor: "#8b5cf6"
    }
  ];

  const recentActivity = [
    { 
      icon: UserCheck, 
      text: "45 new users registered", 
      time: "2 hours ago", 
      color: "#667eea",
      bgColor: "rgba(102, 126, 234, 0.1)",
      iconColor: "#667eea"
    },
    { 
      icon: Clock, 
      text: "12 pending tasks to review", 
      time: "4 hours ago", 
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
      iconColor: "#f59e0b"
    },
    { 
      icon: TrendingUp, 
      text: "Revenue increased by 23%", 
      time: "1 day ago", 
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
      iconColor: "#10b981"
    },
    { 
      icon: AlertCircle, 
      text: "3 system alerts", 
      time: "2 days ago", 
      color: "#ef4444",
      bgColor: "rgba(239, 68, 68, 0.1)",
      iconColor: "#ef4444"
    }
  ];

  const quickActions = [
    {
      icon: Users,
      text: "Add User",
      color: "#667eea",
      bgColor: "rgba(102, 126, 234, 0.1)",
      iconColor: "#667eea"
    },
    {
      icon: DollarSign,
      text: "View Reports",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
      iconColor: "#10b981"
    },
    {
      icon: CheckCircle,
      text: "Manage Tasks",
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
      iconColor: "#8b5cf6"
    },
    {
      icon: Activity,
      text: "Analytics",
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
      iconColor: "#f59e0b"
    }
  ];

  return (
    <div className="ml-5 lg:ml-5 mt-12 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h2 className="text-lg lg:text-xl font-bold text-white m-0 mb-2">Dashboard Overview</h2>
        <p className="text-xs lg:text-sm text-[#888] m-0">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-6 lg:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-[#2a2a2a] p-4 lg:p-6 rounded-xl shadow-lg flex items-start gap-3 lg:gap-4 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 border border-[#3a3a3a] hover:border-[#4a4a4a] min-w-0 group">
              <div 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                style={{ backgroundColor: stat.bgColor }}
              >
                <Icon size={20} className="lg:size-6 transition-colors duration-200" style={{ color: stat.iconColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs lg:text-sm text-[#888] font-medium mb-1 lg:mb-2 truncate">{stat.title}</p>
                <h3 className="text-base lg:text-lg font-bold text-white mb-1 lg:mb-2 truncate">{stat.value}</h3>
                <span 
                  className="inline-flex items-center gap-1 text-xs lg:text-sm font-semibold whitespace-nowrap transition-colors duration-200"
                  style={{ color: stat.color }}
                >
                  <TrendingUp size={12} className="lg:size-3.5" /> {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
        {/* Recent Activity */}
        <div className="bg-[#2a2a2a] rounded-xl shadow-lg p-4 lg:p-6 min-w-0 border border-[#3a3a3a]">
          <div className="flex justify-between items-center mb-4 lg:mb-5 flex-wrap gap-2">
            <h3 className="text-base lg:text-lg font-semibold text-white m-0">Recent Activity</h3>
            <button 
              className="bg-transparent border-none text-amber-500 text-xs lg:text-sm font-semibold cursor-pointer px-2 py-1 rounded transition-all duration-200 hover:bg-[#252525] whitespace-nowrap hover:text-amber-400"
            >
              View All
            </button>
          </div>
          <div className="flex flex-col gap-3 lg:gap-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3 group">
                  <div 
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                    style={{ backgroundColor: activity.bgColor }}
                  >
                    <Icon size={16} className="lg:size-5 transition-colors duration-200" style={{ color: activity.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm text-[#ccc] mb-1 truncate group-hover:text-white transition-colors duration-200">{activity.text}</p>
                    <span className="text-xs text-[#888] whitespace-nowrap group-hover:text-[#ccc] transition-colors duration-200">{activity.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#2a2a2a] rounded-xl shadow-lg p-4 lg:p-6 min-w-0 border border-[#3a3a3a]">
          <div className="flex justify-between items-center mb-4 lg:mb-5">
            <h3 className="text-base lg:text-lg font-semibold text-white m-0">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button 
                  key={index}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 p-3 lg:p-5 bg-[#252525] border border-[#3a3a3a] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] text-[#ccc] text-xs lg:text-sm font-medium text-center min-w-0 hover:shadow-lg hover:-translate-y-0.5 group"
                  style={{ 
                    borderColor: 'transparent',
                    backgroundColor: action.bgColor
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = action.color;
                    e.currentTarget.style.color = action.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.color = '#ccc';
                  }}
                >
                  <Icon 
                    size={16} 
                    className="lg:size-5 transition-colors duration-200" 
                    style={{ color: action.iconColor }} 
                  />
                  <span className="truncate transition-colors duration-200 group-hover:text-inherit">{action.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
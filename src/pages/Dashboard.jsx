// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import { 
  Users, 
  DollarSign, 
  Activity, 
  CheckCircle, 
  TrendingUp,
  Clock,
  UserCheck,
  AlertCircle,
  Loader2
} from "lucide-react";
import { API_ENDPOINTS, apiCall } from "../config/api";

function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch stats and activities in parallel
      const [statsResult, activityResult] = await Promise.all([
        apiCall(API_ENDPOINTS.DASHBOARD.STATS),
        apiCall(API_ENDPOINTS.DASHBOARD.RECENT_ACTIVITY)
      ]);

      if (statsResult.success) {
        setDashboardStats(statsResult.data.stats);
      } else {
        throw new Error(statsResult.error);
      }

      if (activityResult.success) {
        setRecentActivity(activityResult.data.activities);
      }

      setLoading(false);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(err.message || 'Failed to load dashboard data');
      setLoading(false);
    }
  };

  // Format timestamp to relative time
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Get activity icon and styling based on type
  const getActivityIcon = (type, status) => {
    if (type === 'user_registered') {
      return {
        icon: UserCheck,
        color: status === 'verified' ? '#10b981' : '#f59e0b',
        bgColor: status === 'verified' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
        iconColor: status === 'verified' ? '#10b981' : '#f59e0b'
      };
    } else if (type === 'coach_added') {
      return {
        icon: Users,
        color: '#667eea',
        bgColor: 'rgba(102, 126, 234, 0.1)',
        iconColor: '#667eea'
      };
    }
    return {
      icon: AlertCircle,
      color: '#888',
      bgColor: 'rgba(136, 136, 136, 0.1)',
      iconColor: '#888'
    };
  };

  // Stats configuration with API data
  const stats = dashboardStats ? [
    {
      title: "Total Users",
      value: dashboardStats.totalUsers.count.toLocaleString(),
      change: dashboardStats.totalUsers.growth,
      icon: Users,
      color: "#667eea",
      bgColor: "rgba(102, 126, 234, 0.1)",
      iconColor: "#667eea"
    },
    {
      title: "Active Users",
      value: dashboardStats.activeUsers.count.toLocaleString(),
      change: "+0%",
      icon: Activity,
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
      iconColor: "#10b981"
    },
    {
      title: "Total Coaches",
      value: dashboardStats.totalCoaches.count.toLocaleString(),
      change: "+0%",
      icon: DollarSign,
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
      iconColor: "#f59e0b"
    },
    {
      title: "Pending Users",
      value: dashboardStats.pendingUsers.count.toLocaleString(),
      change: "+0%",
      icon: CheckCircle,
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
      iconColor: "#8b5cf6"
    }
  ] : [];

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

  // Loading state
  if (loading) {
    return (
      <div className="ml-5 lg:ml-5 mt-2 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
          <p className="text-[#888] text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="ml-5 lg:ml-5 mt-2 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="bg-[#2a2a2a] border border-red-500/20 rounded-xl p-6 max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-white">Error Loading Dashboard</h3>
          </div>
          <p className="text-[#888] mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-5 lg:ml-5 mt-2 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
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
              onClick={fetchDashboardData}
              className="bg-transparent border-none text-amber-500 text-xs lg:text-sm font-semibold cursor-pointer px-2 py-1 rounded transition-all duration-200 hover:bg-[#252525] whitespace-nowrap hover:text-amber-400"
            >
              Refresh
            </button>
          </div>
          <div className="flex flex-col gap-3 lg:gap-4">
            {recentActivity.length > 0 ? (
              recentActivity.slice(0, 5).map((activity, index) => {
                const activityStyle = getActivityIcon(activity.type, activity.status);
                const Icon = activityStyle.icon;
                return (
                  <div key={index} className="flex items-start gap-3 group">
                    <div 
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{ backgroundColor: activityStyle.bgColor }}
                    >
                      <Icon size={16} className="lg:size-5 transition-colors duration-200" style={{ color: activityStyle.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs lg:text-sm text-[#ccc] mb-1 truncate group-hover:text-white transition-colors duration-200">
                        {activity.message}
                      </p>
                      <span className="text-xs text-[#888] whitespace-nowrap group-hover:text-[#ccc] transition-colors duration-200">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-[#444] mx-auto mb-2" />
                <p className="text-[#888] text-sm">No recent activity</p>
              </div>
            )}
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
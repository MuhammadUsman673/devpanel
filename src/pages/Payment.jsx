import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Clock, Eye, Filter, FileText } from 'lucide-react';

export default function Payment() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const stats = [
    {
      id: 1,
      icon: DollarSign,
      title: 'Total Revenue',
      value: '$45,890',
      change: '+12.5%',
      changePositive: true,
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-500'
    },
    {
      id: 2,
      icon: TrendingUp,
      title: 'Coach Payouts',
      value: '$32,123',
      change: '+8.3%',
      changePositive: true,
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-500'
    },
    {
      id: 3,
      icon: CreditCard,
      title: 'Platform Earnings',
      value: '$13,767',
      change: '+16.2%',
      changePositive: true,
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-500'
    },
    {
      id: 4,
      icon: Clock,
      title: 'Pending Payments',
      value: '$2,450',
      change: '5 Pending',
      changePositive: false,
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-500'
    }
  ];

  const coaches = [
    {
      id: 1,
      name: 'Alex Johnson',
      clients: '28 clients',
      earnings: '$8,450',
      period: 'This month',
      avatar: 'AJ',
      avatarColor: 'from-cyan-400 to-cyan-600'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      clients: '31 clients',
      earnings: '$9,230',
      period: 'This month',
      avatar: 'MG',
      avatarColor: 'from-blue-500 to-purple-600'
    },
    {
      id: 3,
      name: 'David Lee',
      clients: '22 clients',
      earnings: '$7,890',
      period: 'This month',
      avatar: 'DL',
      avatarColor: 'from-orange-500 to-red-500'
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'Client Payment',
      description: 'Emma Wilson - Premium Plan',
      amount: '+$149.99',
      date: '2025-03-15',
      status: 'Completed',
      statusColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      icon: DollarSign,
      iconBg: 'bg-cyan-500/10',
      iconColor: 'text-cyan-500',
      isPositive: true
    },
    {
      id: 2,
      type: 'Coach Payout',
      description: 'Alex Johnson - Monthly Earnings',
      amount: '-$2,340.00',
      date: '2025-03-14',
      status: 'Processing',
      statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      icon: TrendingUp,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-500',
      isPositive: false
    },
    {
      id: 3,
      type: 'Refund Issued',
      description: 'David Wilson - Basic Plan',
      amount: '-$79.99',
      date: '2025-03-13',
      status: 'Completed',
      statusColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      icon: CreditCard,
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-500',
      isPositive: false
    }
  ];

  // Chart data for Revenue Trend
  const chartData = [
    { value: 6.5, highlight: false },
    { value: 4.2, highlight: false },
    { value: 7.8, highlight: false },
    { value: 3.9, highlight: false },
    { value: 8.4, highlight: true },
    { value: 5.1, highlight: false },
    { value: 7.2, highlight: false },
    { value: 9.1, highlight: false },
    { value: 4.8, highlight: false },
    { value: 6.9, highlight: false }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="ml-5 lg:ml-5 mt-12 lg:mt-12 p-4 lg:p-8 min-h-screen bg-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 lg:mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-white m-0">Payment Monitoring</h1>
            <p className="text-xs lg:text-sm text-[#888] m-0 mt-2">
              Track revenue, coach payouts, and financial performance.
            </p>
          </div>
          <div className="flex gap-3 lg:gap-4 flex-wrap">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 lg:py-2.5 px-3 lg:px-4 text-white text-xs lg:text-sm outline-none transition-all duration-200 focus:border-[#f59e0b] min-w-[140px]"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
            <button className="flex items-center gap-2 bg-[#f59e0b] text-[#1a1a1a] border-none px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg cursor-pointer text-xs lg:text-sm font-semibold transition-all duration-200 hover:bg-white shadow-lg shadow-amber-500/30">
              <FileText size={16} className="lg:size-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-6 lg:mb-8">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 hover:border-[#4a4a4a]">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.iconColor}`} />
                </div>
                <span className={`text-xs lg:text-sm font-semibold px-2 py-1 rounded ${
                  stat.changePositive ? 'text-amber-500' : 'text-amber-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-base lg:text-lg font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-xs lg:text-sm text-[#888] m-0">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5 mb-6 lg:mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 shadow-lg">
            <h2 className="text-base lg:text-lg font-semibold text-white mb-4 lg:mb-5">Revenue Trend</h2>
            <div className="h-40 lg:h-48 flex items-end justify-between gap-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2 relative flex-1">
                  <div 
                    className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full border-2 border-[#1a1a1a] z-10`}
                  ></div>
                  <div 
                    className={`w-full rounded-t transition-all duration-200 ${
                      data.highlight ? 'bg-amber-500' : 'bg-[#3a3a3a]'
                    }`}
                    style={{ height: `${(data.value / maxValue) * 160}px` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[#888] text-xs lg:text-sm mt-2">
              <span>$ 0</span>
              <span>$ 5k</span>
              <span>$ 10k</span>
            </div>
          </div>

          {/* Coach Performance */}
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-4 lg:p-6 shadow-lg">
            <h2 className="text-base lg:text-lg font-semibold text-white mb-4 lg:mb-5">Coach Performance</h2>
            <div className="flex flex-col gap-3 lg:gap-4">
              {coaches.map((coach) => (
                <div key={coach.id} className="flex justify-between items-center p-3 lg:p-4 bg-[#252525] border border-[#3a3a3a] rounded-lg transition-all duration-200 hover:bg-[#2a2a2a] hover:border-amber-500 hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs lg:text-sm bg-gradient-to-br ${coach.avatarColor}`}>
                      {coach.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-xs lg:text-sm m-0">{coach.name}</h3>
                      <p className="text-[#888] text-xs lg:text-sm m-0 mt-1">{coach.clients}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-500 font-bold text-xs lg:text-sm m-0">{coach.earnings}</p>
                    <p className="text-[#888] text-xs lg:text-sm m-0 mt-1">{coach.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl overflow-hidden shadow-lg">
          <div className="flex justify-between items-center p-4 lg:p-6 border-b border-[#3a3a3a]">
            <h2 className="text-base lg:text-lg font-semibold text-white m-0">Recent Transactions</h2>
            <button className="bg-transparent border-none p-2 rounded-lg cursor-pointer transition-all duration-200 text-[#888] hover:bg-[#333] hover:text-cyan-400">
              <Filter size={16} className="lg:size-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#252525] border-b border-[#3a3a3a]">
                  <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold">Transaction</th>
                  <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold">Type</th>
                  <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold">Amount</th>
                  <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold">Date</th>
                  <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold">Status</th>
                  <th className="text-left p-4 lg:p-6 text-[#888] text-xs lg:text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-[#3a3a3a] transition-colors hover:bg-[#252525]">
                    <td className="p-4 lg:p-6 align-middle">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${transaction.iconBg}`}>
                          <transaction.icon className={`w-4 h-4 ${transaction.iconColor}`} />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-xs lg:text-sm">{transaction.type}</div>
                          <div className="text-[#888] text-xs lg:text-sm">{transaction.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 lg:p-6 align-middle">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs lg:text-sm font-semibold border ${
                        transaction.type.includes('Payment') 
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                          : transaction.type.includes('Payout')
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {transaction.type.split(' ')[0]}
                      </span>
                    </td>
                    <td className="p-4 lg:p-6 align-middle">
                      <span className={`text-xs lg:text-sm font-semibold ${
                        transaction.isPositive ? 'text-cyan-400' : 'text-red-400'
                      }`}>
                        {transaction.amount}
                      </span>
                    </td>
                    <td className="p-4 lg:p-6 align-middle">
                      <span className="text-[#ccc] text-xs lg:text-sm">{transaction.date}</span>
                    </td>
                    <td className="p-4 lg:p-6 align-middle">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs lg:text-sm font-semibold border ${transaction.statusColor}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="p-4 lg:p-6 align-middle">
                      <button className="bg-transparent border-none p-2 rounded-lg cursor-pointer transition-all duration-200 text-[#888] hover:bg-[#333] hover:text-cyan-400">
                        <Eye size={14} className="lg:size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 lg:p-6 border-t border-[#3a3a3a] flex-wrap gap-3">
            <span className="text-[#888] text-xs lg:text-sm">Showing 1 to 3 of 45 transactions</span>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-transparent border border-[#3a3a3a] text-[#888] text-xs lg:text-sm cursor-pointer px-3 py-1 rounded transition-all duration-200 hover:bg-[#333] hover:text-[#ccc]">
                Previous
              </button>
              <button className="bg-[#f59e0b] text-[#1a1a1a] text-xs lg:text-sm font-semibold cursor-pointer px-3 py-1 rounded">
                1
              </button>
              <button className="bg-transparent border border-[#3a3a3a] text-[#888] text-xs lg:text-sm cursor-pointer px-3 py-1 rounded transition-all duration-200 hover:bg-[#333] hover:text-[#ccc]">
                2
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
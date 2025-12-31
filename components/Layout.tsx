import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, LayoutDashboard, FileText, Settings, GitBranch } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: '风险监控大屏', path: '/', icon: <LayoutDashboard size={14} /> },
    { name: '监控对象详情', path: '/monitor', icon: <FileText size={14} /> },
    { name: '规则配置中心', path: '/rules', icon: <Settings size={14} /> },
    { name: '处理流程配置', path: '/process', icon: <GitBranch size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-bg font-sans text-text-main flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-[60px] bg-white border-b border-border fixed w-full top-0 z-50 px-6 flex items-center justify-between shadow-sm">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary to-[#31A3FF] flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-gray-900 leading-tight">权益风险运营平台</h1>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Equity Risk & Operations Monitoring</span>
          </div>
        </div>

        {/* Right: Navigation & User */}
        <div className="flex items-center gap-6">
          {/* Tabs */}
          <nav className="hidden md:flex bg-gray-100/50 p-1 rounded-full border border-gray-100">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path || (tab.path !== '/' && location.pathname.startsWith(tab.path));
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              );
            })}
          </nav>

          <div className="h-6 w-px bg-gray-200 mx-2"></div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 pl-2 bg-gray-50 pr-4 py-1 rounded-full border border-gray-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs text-white font-medium border-2 border-white shadow-sm">
                你
              </div>
              <span className="text-xs font-medium text-gray-700">平台负责人</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mt-[60px] p-6 w-full max-w-[1440px] mx-auto">
        {children}
      </main>
    </div>
  );
};
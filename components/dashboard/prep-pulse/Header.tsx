import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Clock, 
  ShieldCheck, 
  LogOut, 
  User as UserIcon, 
  Sparkles,
  X
} from 'lucide-react';
import { useTestStore } from '@/lib/store/useTestStore';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onOpenTest?: (testName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onOpenTest: _onOpenTest }) => {
  const storeUser = useTestStore((s) => s.user);
  const userName = storeUser?.name?.trim() ? storeUser.name : "CUET Aspirant";
  const roleSubtitle = storeUser?.targetCollege ? `Targeting ${storeUser.targetCollege}` : "Aspirant, CUET UG 2026";
  const avatarUrl = "/assets/images/avatar1.png";

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'CUET Mock Test 05 Ready',
      desc: 'The test window opens tomorrow at 10:00 AM. Review syllabus now.',
      time: '12m ago',
      unread: true,
      category: 'Exam',
    },
    {
      id: 'notif-2',
      title: 'Calculus Accuracy Alert',
      desc: 'Your accuracy in Definite Integration dipped to 48%. Practice drill recommended.',
      time: '2h ago',
      unread: true,
      category: 'Analytics',
    },
    {
      id: 'notif-3',
      title: 'Physics PYQ Streak Maintained',
      desc: '12 consecutive days of Modern Physics questions completed!',
      time: '1d ago',
      unread: false,
      category: 'Achievement',
    },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Search Input */}
        <div className="flex items-center gap-4 lg:gap-8 flex-1 max-w-2xl">
          {/* Logo Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-slate-900 tracking-tight text-lg">PrepPulse</span>
              <span className="text-[10px] font-semibold tracking-wider text-blue-600 uppercase ml-1.5 px-1.5 py-0.5 bg-blue-50 rounded-md">CUET &apos;25</span>
            </div>
          </div>

          {/* Search bar input with search icon */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for tests, subjects, or topics..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-150"
            />
            {searchQuery ? (
              <button 
                onClick={() => { setSearchQuery(''); onSearch?.(''); }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="hidden md:flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
                <kbd className="text-[10px] uppercase font-semibold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </div>
            )}
          </div>
        </div>

        {/* Right: Notifications & User profile */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* Quick Exam Countdown Pill (Hidden on mobile) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-slate-700">Target DU / SRCC</span>
            <span className="text-slate-400">|</span>
            <span className="font-semibold text-blue-600">38 Days Left</span>
          </div>

          {/* Bell Notification Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              aria-label="View notifications"
              className="relative p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 rounded-xl border border-transparent hover:border-slate-200/60 transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              )}
            </button>

            {/* Notifications Popover Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[11px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllRead}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                  {notifications.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                        item.unread ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="px-4 pt-2.5 border-t border-slate-100 text-center">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Close Notification Center
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200/80"></div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 p-1 sm:p-1.5 hover:bg-slate-100/80 rounded-xl transition-all border border-transparent hover:border-slate-200/60"
            >
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              
              <div className="text-left hidden md:block">
                <div className="text-sm font-bold text-slate-900 leading-tight">
                  {userName}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {roleSubtitle}
                </div>
              </div>

              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Menu Popover */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2.5 border-b border-slate-100">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Signed in as</p>
                  <p className="text-sm font-bold text-slate-900 truncate mt-0.5">{userName}</p>
                  <p className="text-xs text-slate-500">{roleSubtitle}</p>
                </div>

                <div className="py-1">
                  <div className="px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer">
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    <span>Academic Profile & Goals</span>
                  </div>
                  <div className="px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer">
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    <span>CUET Hall Ticket Verified</span>
                  </div>
                  <div className="px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Study Schedule & Reminders</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <div 
                    onClick={() => setShowProfileMenu(false)}
                    className="px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

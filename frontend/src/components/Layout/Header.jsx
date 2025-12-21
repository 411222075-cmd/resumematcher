import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, LogOut, History } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onToggleHistory }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Resume Matcher</h1>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleHistory}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
            >
              <History className="w-4 h-4" />
              History
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import Header from '../Layout/Header';
import ResumeInput from './ResumeInput';
import MatchResults from './MatchResults';
import History from './History';

const Dashboard = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  
  // Load history on component mount
  useEffect(() => {
    loadHistory();
  }, []);
  
  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const data = await API.getHistory(token);
      setHistory(data);
    } catch (err) {
      console.error('Failed to load history:', err);
      // Don't show error to user, just log it
    } finally {
      setHistoryLoading(false);
    }
  };
  
  const handleAnalyze = async (resumeText, jobRole) => {
    setLoading(true);
    setResult(null);
    
    try {
      const data = await API.matchResume(token, resumeText, jobRole);
      setResult(data);
      
      // Reload history to include new analysis
      await loadHistory();
      
      // Scroll to results on mobile
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      alert('Analysis failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectResult = (selectedResult) => {
    setResult(selectedResult);
    setShowHistory(false);
    
    // Scroll to top to show results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <Header 
        onToggleHistory={handleToggleHistory} 
        showHistory={showHistory}
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* History View */}
        {showHistory ? (
          <div className="animate-fadeIn">
            <History 
              history={history} 
              onSelectResult={handleSelectResult}
            />
          </div>
        ) : (
          /* Dashboard View */
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Input */}
            <div className="space-y-6">
              <ResumeInput 
                onAnalyze={handleAnalyze} 
                loading={loading} 
              />
            </div>
            
            {/* Right Column - Results */}
            <div className="space-y-6">
              <MatchResults 
                result={result} 
                loading={loading} 
              />
            </div>
          </div>
        )}
        
        {/* Quick Stats Bar (visible when not showing history) */}
        {!showHistory && history.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
              <p className="text-xs text-slate-400 mb-1">Total Analyses</p>
              <p className="text-2xl font-bold text-white">{history.length}</p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
              <p className="text-xs text-slate-400 mb-1">Average Match</p>
              <p className="text-2xl font-bold text-emerald-400">
                {Math.round(
                  history.reduce((sum, item) => sum + item.match_percentage, 0) / history.length
                )}%
              </p>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4">
              <p className="text-xs text-slate-400 mb-1">Best Match</p>
              <p className="text-2xl font-bold text-white">
                {Math.max(...history.map(item => item.match_percentage))}%
              </p>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            © 2025 Resume Matcher. Pemograman Fullstack. Bagas . Rety. Nisa
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
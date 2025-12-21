import React from 'react';

const History = ({ history, onSelectResult }) => {
  if (history.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-8 text-center">
        <p className="text-slate-400">No analysis history yet</p>
      </div>
    );
  }
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Analysis History</h2>
      <div className="space-y-3">
        {history.map(item => (
          <div
            key={item.id}
            className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer"
            onClick={() => onSelectResult(item)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-white">{item.job_role}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.match_percentage >= 70 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {item.match_percentage}%
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
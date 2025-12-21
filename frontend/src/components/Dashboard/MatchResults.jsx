import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const MatchResults = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-400">Analyzing your resume...</p>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-12 text-center">
        <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">Upload or paste your resume to get started</p>
      </div>
    );
  }
  
  const chartData = [
    { name: 'Matched', value: result.matched_skills.length, color: '#10b981' },
    { name: 'Missing', value: result.missing_skills.length, color: '#ef4444' }
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Match Score</h2>
        
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#334155"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#10b981"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - result.match_percentage / 100)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">{result.match_percentage}%</div>
                <div className="text-xs text-slate-400">Match</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
          <p className="text-sm text-slate-300">{result.summary}</p>
        </div>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Skills Breakdown</h2>
        
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Matched</span>
            </div>
            <div className="text-2xl font-bold text-white">{result.matched_skills.length}</div>
          </div>
          <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">Missing</span>
            </div>
            <div className="text-2xl font-bold text-white">{result.missing_skills.length}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Matched Skills</h2>
        <div className="flex flex-wrap gap-2">
          {result.matched_skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm rounded-full border border-emerald-500/20">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Skills to Develop</h2>
        <div className="flex flex-wrap gap-2">
          {result.missing_skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-red-500/10 text-red-400 text-sm rounded-full border border-red-500/20">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchResults;
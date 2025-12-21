import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { detectSkills } from '../../utils/validators';

const ResumeInput = ({ onAnalyze, loading }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobRole, setJobRole] = useState('Full Stack Developer');
  const [detectedSkills, setDetectedSkills] = useState([]);
  
  const jobRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'DevOps Engineer'
  ];
  
  useEffect(() => {
    const skills = detectSkills(resumeText);
    setDetectedSkills(skills);
  }, [resumeText]);
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => setResumeText(e.target.result);
      reader.readAsText(file);
    }
  };
  
  const handleAnalyze = () => {
    if (resumeText.trim()) {
      onAnalyze(resumeText, jobRole);
    }
  };
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Resume Input</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">Job Role</label>
        <select
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        >
          {jobRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">Upload Resume (.txt)</label>
        <div className="relative">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 cursor-pointer transition-all"
          >
            <Upload className="w-5 h-5" />
            Upload Resume
          </label>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">Or Paste Resume Text</label>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="w-full h-64 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
          placeholder="Paste your resume here..."
        />
      </div>
      
      {detectedSkills.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-slate-400 mb-2">Detected Skills:</p>
          <div className="flex flex-wrap gap-2">
            {detectedSkills.slice(0, 10).map(skill => (
              <span key={skill} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <button
        onClick={handleAnalyze}
        disabled={loading || !resumeText.trim()}
        className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing...' : 'Analyze Match'}
      </button>
    </div>
  );
};

export default ResumeInput;
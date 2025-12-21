const db = require('../config/database');
const SkillMatcher = require('../utils/skillMatcher');

// Analyze resume
exports.matchResume = async (req, res) => {
  try {
    const { resume_text, job_role } = req.body;
    const userId = req.userId;
    
    // Validation
    if (!resume_text || !job_role) {
      return res.status(400).json({ error: 'Resume text and job role are required' });
    }
    
    if (resume_text.trim().length < 50) {
      return res.status(400).json({ error: 'Resume text is too short' });
    }
    
    // Perform matching
    const result = SkillMatcher.analyzeResume(resume_text, job_role);
    
    // Save to database
    await db.query(
      `INSERT INTO resume_analysis 
       (user_id, job_role, match_percentage, matched_skills, missing_skills, summary) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        job_role,
        result.match_percentage,
        JSON.stringify(result.matched_skills),
        JSON.stringify(result.missing_skills),
        result.summary
      ]
    );
    
    res.json(result);
  } catch (error) {
    console.error('Match error:', error);
    res.status(500).json({ error: 'Server error during resume matching' });
  }
};

// Get user history
exports.getHistory = async (req, res) => {
  try {
    const userId = req.userId;
    
    const [results] = await db.query(
      `SELECT 
        id, 
        job_role, 
        match_percentage, 
        matched_skills, 
        missing_skills, 
        summary, 
        created_at 
       FROM resume_analysis 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT 20`,
      [userId]
    );
    
    // Parse JSON fields
    const parsedResults = results.map(result => ({
      ...result,
      matched_skills: JSON.parse(result.matched_skills),
      missing_skills: JSON.parse(result.missing_skills)
    }));
    
    res.json(parsedResults);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Server error while fetching history' });
  }
};

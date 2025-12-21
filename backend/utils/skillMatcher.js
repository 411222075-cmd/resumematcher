// Predefined skill database
const SKILL_DATABASE = {
  'Frontend Developer': [
    'React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 
    'Tailwind', 'Vue', 'Angular', 'Redux', 'Webpack', 
    'Git', 'REST API', 'GraphQL', 'Jest', 'Cypress'
  ],
  'Backend Developer': [
    'Node.js', 'Python', 'Java', 'Express', 'Django', 
    'Spring', 'SQL', 'MongoDB', 'PostgreSQL', 'Redis', 
    'Docker', 'Kubernetes', 'AWS', 'REST API', 'GraphQL', 
    'Microservices'
  ],
  'Full Stack Developer': [
    'React', 'Node.js', 'JavaScript', 'TypeScript', 'Express', 
    'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Git', 
    'REST API', 'GraphQL', 'CI/CD', 'Redis', 'Jest'
  ],
  'Data Scientist': [
    'Python', 'R', 'Machine Learning', 'Deep Learning', 
    'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'SQL', 
    'Tableau', 'Power BI', 'Statistics', 'NLP', 'Computer Vision'
  ],
  'DevOps Engineer': [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 
    'Terraform', 'Jenkins', 'CI/CD', 'Linux', 'Bash', 
    'Python', 'Ansible', 'Monitoring', 'Git'
  ]
};

class SkillMatcher {
  static analyzeResume(resumeText, jobRole) {
    const requiredSkills = SKILL_DATABASE[jobRole] || SKILL_DATABASE['Full Stack Developer'];
    const normalizedResume = resumeText.toLowerCase();
    
    // Extract matched skills
    const matchedSkills = requiredSkills.filter(skill => 
      normalizedResume.includes(skill.toLowerCase())
    );
    
    // Extract missing skills
    const missingSkills = requiredSkills.filter(skill => 
      !normalizedResume.includes(skill.toLowerCase())
    );
    
    // Calculate match percentage
    const matchPercentage = Math.round((matchedSkills.length / requiredSkills.length) * 100);
    
    // Generate summary
    let summary = '';
    if (matchPercentage >= 80) {
      summary = 'Excellent match! Your profile aligns very well with the role requirements. You have strong expertise in most critical areas.';
    } else if (matchPercentage >= 60) {
      summary = 'Good match with some skill gaps. You have a solid foundation but should consider developing the missing skills to become an ideal candidate.';
    } else if (matchPercentage >= 40) {
      summary = 'Moderate match. Several key skills need development for this role. Focus on upskilling in the missing areas to improve your candidacy.';
    } else {
      summary = 'Limited match. Significant skill development needed for this position. Consider taking courses or gaining hands-on experience in the required technologies.';
    }
    
    return {
      match_percentage: matchPercentage,
      matched_skills: matchedSkills,
      missing_skills: missingSkills,
      summary
    };
  }
}

module.exports = SkillMatcher;

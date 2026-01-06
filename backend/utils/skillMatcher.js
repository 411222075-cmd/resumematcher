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
      summary = 'Profil Anda sangat sesuai dengan kebutuhan posisi ini. Anda memiliki keahlian yang kuat di sebagian besar area penting.';
    } else if (matchPercentage >= 60) {
      summary = 'Kecocokan cukup baik dengan beberapa kekurangan keterampilan. Anda memiliki dasar yang solid, namun disarankan untuk mengembangkan keterampilan yang masih kurang agar menjadi kandidat yang ideal.';
    } else if (matchPercentage >= 40) {
      summary = 'Beberapa keterampilan utama masih perlu dikembangkan untuk posisi ini. Fokus pada peningkatan kemampuan di area yang belum terpenuhi agar peluang Anda meningkat.';
    } else {
      summary = 'Diperlukan pengembangan keterampilan yang signifikan untuk posisi ini. Pertimbangkan mengikuti pelatihan atau menambah pengalaman praktik pada teknologi yang dibutuhkan.';
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

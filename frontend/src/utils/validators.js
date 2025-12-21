export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const detectSkills = (text) => {
  const commonSkills = [
    'React', 'JavaScript', 'Python', 'Java', 'Node.js', 
    'TypeScript', 'Docker', 'AWS', 'SQL', 'MongoDB', 
    'Git', 'CSS', 'HTML', 'Machine Learning', 'Kubernetes',
    'Express', 'Django', 'Spring', 'PostgreSQL', 'Redis',
    'Vue', 'Angular', 'GraphQL', 'REST API', 'CI/CD'
  ];
  
  return commonSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );
};
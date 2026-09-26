export type Subject = {
  id: string;
  name: string;
  short: string;
  color: string;
  tint: string;
  icon: string;
  progress: number;
  next: string;
};

export const subjects: Subject[] = [
  { id: 'english-first', name: 'English First', short: 'EN', color: '#5A7F72', tint: '#E3F0E9', icon: 'Aa', progress: 72, next: 'Nouns & Pronouns' },
  { id: 'english-second', name: 'English Second', short: 'EN', color: '#CC7A53', tint: '#FBE9DF', icon: 'Ab', progress: 58, next: 'Reading a Story' },
  { id: 'hindi-first', name: 'Hindi First', short: 'हि', color: '#B26A55', tint: '#F7E4DE', icon: 'अ', progress: 64, next: 'मेरा परिवार' },
  { id: 'hindi-second', name: 'Hindi Second', short: 'हि', color: '#7A67A2', tint: '#ECE6F8', icon: 'आ', progress: 49, next: 'गिनती' },
  { id: 'math', name: 'Math', short: 'M', color: '#3E7891', tint: '#E0F0F4', icon: '÷', progress: 81, next: 'Fractions' },
  { id: 'math-second', name: 'Math Second', short: 'M', color: '#D39B45', tint: '#FFF2D9', icon: '×', progress: 67, next: 'Time & Money' },
  { id: 'evs', name: 'EVS', short: 'EV', color: '#4E8B69', tint: '#E2F2E4', icon: '✦', progress: 76, next: 'Our Food' },
  { id: 'gk', name: 'GK', short: 'GK', color: '#46799C', tint: '#E0ECF7', icon: '?', progress: 43, next: 'Our Country' },
  { id: 'computer', name: 'Computer', short: 'C', color: '#AB6579', tint: '#F7E4EC', icon: '⌘', progress: 35, next: 'Parts of a Computer' },
];

export const practiceItems = [
  { subject: 'Math', question: 'What is 3 × 8?', answer: '24', color: '#E0F0F4', accent: '#3E7891' },
  { subject: 'English First', question: 'Find the noun: “The little bird sings.”', answer: 'bird', color: '#E3F0E9', accent: '#5A7F72' },
  { subject: 'EVS', question: 'Name one source of clean water.', answer: 'A river', color: '#E2F2E4', accent: '#4E8B69' },
];

export const tests = [
  { name: 'Math · Fractions', date: 'Today, 9:30 AM', score: 18, total: 20, tone: 'good' },
  { name: 'English First · Grammar', date: 'Yesterday', score: 16, total: 20, tone: 'good' },
  { name: 'EVS · Plants Around Us', date: '12 May 2024', score: 14, total: 20, tone: 'steady' },
  { name: 'GK · Our Country', date: '10 May 2024', score: 11, total: 20, tone: 'practice' },
];
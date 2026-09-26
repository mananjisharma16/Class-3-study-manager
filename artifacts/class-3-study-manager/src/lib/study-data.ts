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

export type SubjectContent = {
  chapters: { title: string; detail: string }[];
  notes: { title: string; body: string }[];
  photos: { title: string; detail: string }[];
  questions: { title: string; detail: string }[];
  answers: { title: string; detail: string }[];
  tests: { title: string; detail: string }[];
  results: { title: string; detail: string }[];
  mistakes: { title: string; detail: string }[];
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

const subjectExamples: Record<string, SubjectContent> = {
  'english-first': {
    chapters: [
      { title: 'Nouns & Pronouns', detail: 'Naming words and words used in their place' },
      { title: 'Adjectives', detail: 'Words that describe people, places, and things' },
      { title: 'Action Words', detail: 'Spot verbs in simple sentences' },
      { title: 'Writing a Paragraph', detail: 'Make five connected sentences' },
    ],
    notes: [{ title: 'Noun reminder', body: 'A noun names a person, place, animal, or thing. Example: Riya, school, tiger, pencil.' }],
    photos: [{ title: 'Grammar notebook page', detail: 'A sample page about nouns and pronouns · Added today' }],
    questions: [{ title: 'Find the noun', detail: 'The little bird sings.' }, { title: 'Choose the pronoun', detail: 'Ravi is happy because ___ won the game.' }],
    answers: [{ title: 'The little bird sings.', detail: 'Answer: bird' }, { title: 'Ravi is happy because ___ won the game.', detail: 'Answer: he' }],
    tests: [{ title: 'Grammar warm-up', detail: '10 questions · Nouns, pronouns, and verbs' }],
    results: [{ title: 'Grammar warm-up', detail: '8 / 10 · Keep practising pronouns' }],
    mistakes: [{ title: 'Pronoun mix-up', detail: 'Remember: he is used for a boy and she is used for a girl.' }],
  },
  'english-second': {
    chapters: [
      { title: 'Reading a Story', detail: 'Read with clear pauses and expression' },
      { title: 'New Words', detail: 'Use context clues to understand a word' },
      { title: 'Sentences', detail: 'Build complete sentences with punctuation' },
      { title: 'Story Writing', detail: 'Give your story a beginning, middle, and end' },
    ],
    notes: [{ title: 'Story map', body: 'A good story has characters, a place, a problem, and a happy or thoughtful ending.' }],
    photos: [{ title: 'Reading practice page', detail: 'A sample story page with three new words · Added yesterday' }],
    questions: [{ title: 'Story question', detail: 'Where did the little seed grow?' }, { title: 'Word meaning', detail: 'What does tiny mean?' }],
    answers: [{ title: 'Where did the little seed grow?', detail: 'Answer: In a sunny garden' }, { title: 'What does tiny mean?', detail: 'Answer: Very small' }],
    tests: [{ title: 'Reading check', detail: '5 questions · Story reading and word meanings' }],
    results: [{ title: 'Reading check', detail: '4 / 5 · Read the last paragraph again' }],
    mistakes: [{ title: 'Punctuation pause', detail: 'Stop for a full stop and take a small pause at a comma.' }],
  },
  'hindi-first': {
    chapters: [
      { title: 'मेरा परिवार', detail: 'परिवार के सदस्यों के बारे में जानें' },
      { title: 'संज्ञा और सर्वनाम', detail: 'नाम और उनके स्थान पर आने वाले शब्द' },
      { title: 'वचन', detail: 'एक और अनेक शब्दों का अभ्यास' },
      { title: 'वाक्य लेखन', detail: 'सरल और साफ वाक्य लिखें' },
    ],
    notes: [{ title: 'संज्ञा याद रखें', body: 'किसी व्यक्ति, स्थान, वस्तु या पशु के नाम को संज्ञा कहते हैं। जैसे: सीमा, दिल्ली, किताब, गाय।' }],
    photos: [{ title: 'हिंदी व्याकरण पृष्ठ', detail: 'संज्ञा और सर्वनाम के उदाहरण · आज जोड़ा गया' }],
    questions: [{ title: 'संज्ञा पहचानिए', detail: '“राम बाजार जाता है।” इसमें संज्ञा शब्द कौन-सा है?' }, { title: 'रिक्त स्थान भरिए', detail: 'सीमा ___ लड़की है।' }],
    answers: [{ title: 'राम बाजार जाता है।', detail: 'उत्तर: राम और बाजार' }, { title: 'सीमा ___ लड़की है।', detail: 'उत्तर: एक' }],
    tests: [{ title: 'हिंदी अभ्यास', detail: '10 प्रश्न · संज्ञा, सर्वनाम और वचन' }],
    results: [{ title: 'हिंदी अभ्यास', detail: '7 / 10 · वचन का थोड़ा और अभ्यास करें' }],
    mistakes: [{ title: 'वचन की गलती', detail: 'एक वस्तु के लिए एकवचन और एक से अधिक के लिए बहुवचन लिखें।' }],
  },
  'hindi-second': {
    chapters: [
      { title: 'गिनती', detail: 'एक से पचास तक गिनती बोलें और लिखें' },
      { title: 'मात्राएँ', detail: 'आ, इ, ई और उ की मात्राओं का अभ्यास' },
      { title: 'चित्र वर्णन', detail: 'चित्र देखकर चार वाक्य बनाएं' },
      { title: 'कहानी सुनाना', detail: 'कहानी को क्रम से दोहराएं' },
    ],
    notes: [{ title: 'मात्रा संकेत', body: 'आ की मात्रा ा, इ की मात्रा ि और ई की मात्रा ी होती है। शब्द लिखते समय मात्रा की जगह ध्यान से देखें।' }],
    photos: [{ title: 'मात्राओं की कॉपी', detail: 'मात्रा अभ्यास की एक साफ कॉपी · कल जोड़ी गई' }],
    questions: [{ title: 'सही मात्रा चुनिए', detail: 'क__ताब में कौन-सी मात्रा आएगी?' }, { title: 'गिनती', detail: '२१ के बाद कौन-सी संख्या आती है?' }],
    answers: [{ title: 'क__ताब', detail: 'उत्तर: किताब' }, { title: '२१ के बाद', detail: 'उत्तर: २२' }],
    tests: [{ title: 'मात्रा और गिनती', detail: '10 प्रश्न · मात्राएँ और 1 से 30 तक गिनती' }],
    results: [{ title: 'मात्रा और गिनती', detail: '6 / 10 · इ और ई की मात्राओं को दोहराएं' }],
    mistakes: [{ title: 'मात्रा की जगह', detail: 'इ की मात्रा अक्षर के पहले लिखी जाती है, जैसे कि किताब।' }],
  },
  math: {
    chapters: [
      { title: 'Multiplication', detail: 'Use groups and tables to multiply' },
      { title: 'Division', detail: 'Share equally and find remainders' },
      { title: 'Fractions', detail: 'Find halves, thirds, and quarters' },
      { title: 'Shapes', detail: 'Name sides, corners, and faces' },
    ],
    notes: [{ title: 'Fraction reminder', body: 'A fraction shows equal parts of a whole. In 3/4, 3 is the numerator and 4 is the denominator.' }],
    photos: [{ title: 'Fractions practice', detail: 'A sample page with shaded shapes · Added today' }],
    questions: [{ title: 'Multiply', detail: 'What is 3 × 8?' }, { title: 'Fraction', detail: 'How many quarters make one whole?' }],
    answers: [{ title: 'What is 3 × 8?', detail: 'Answer: 24' }, { title: 'How many quarters make one whole?', detail: 'Answer: 4 quarters' }],
    tests: [{ title: 'Numbers and fractions', detail: '15 questions · Multiplication, division, and fractions' }],
    results: [{ title: 'Numbers and fractions', detail: '12 / 15 · Great work with multiplication' }],
    mistakes: [{ title: 'Fraction parts', detail: 'The denominator tells how many equal parts make the whole.' }],
  },
  'math-second': {
    chapters: [
      { title: 'Time', detail: 'Read an analogue clock to five minutes' },
      { title: 'Money', detail: 'Add rupees and paise in simple sums' },
      { title: 'Measurement', detail: 'Compare length, weight, and capacity' },
      { title: 'Patterns', detail: 'Find the rule and continue a pattern' },
    ],
    notes: [{ title: 'Time reminder', body: 'The short hand shows hours. The long hand shows minutes. When it points to 6, it means 30 minutes.' }],
    photos: [{ title: 'Time and money worksheet', detail: 'Clock faces and coin sums · Added Monday' }],
    questions: [{ title: 'Read the clock', detail: 'What time is half past 4?' }, { title: 'Money sum', detail: 'How many ₹5 coins make ₹25?' }],
    answers: [{ title: 'What time is half past 4?', detail: 'Answer: 4:30' }, { title: 'How many ₹5 coins make ₹25?', detail: 'Answer: 5 coins' }],
    tests: [{ title: 'Time and money', detail: '10 questions · Clocks, coins, and notes' }],
    results: [{ title: 'Time and money', detail: '8 / 10 · Review reading the minute hand' }],
    mistakes: [{ title: 'Clock hands', detail: 'The long hand is the minute hand, even when it moves faster.' }],
  },
  evs: {
    chapters: [
      { title: 'Our Food', detail: 'Learn where everyday food comes from' },
      { title: 'Water Around Us', detail: 'Find sources and uses of clean water' },
      { title: 'Plants Around Us', detail: 'Notice roots, stems, leaves, and flowers' },
      { title: 'Our Helpers', detail: 'Meet people who help our community' },
    ],
    notes: [{ title: 'Clean water note', body: 'We get water from rivers, lakes, wells, and rain. We should save water and keep its sources clean.' }],
    photos: [{ title: 'Parts of a plant', detail: 'A labelled plant drawing from class · Added today' }],
    questions: [{ title: 'Water source', detail: 'Name one source of clean water.' }, { title: 'Plant part', detail: 'Which part of a plant takes in water from the soil?' }],
    answers: [{ title: 'Name one source of clean water.', detail: 'Answer: A river' }, { title: 'Which part takes in water?', detail: 'Answer: Roots' }],
    tests: [{ title: 'Plants and water', detail: '10 questions · Sources of water and plant parts' }],
    results: [{ title: 'Plants and water', detail: '8 / 10 · Strong understanding of plant parts' }],
    mistakes: [{ title: 'Root and stem', detail: 'Roots hold the plant and take in water; the stem supports the plant.' }],
  },
  gk: {
    chapters: [
      { title: 'Our Country', detail: 'Know important places and symbols of India' },
      { title: 'Amazing Animals', detail: 'Discover animal homes and habits' },
      { title: 'Space and Sky', detail: 'Look at planets, stars, and the Moon' },
      { title: 'Good Habits', detail: 'Practise safe and helpful daily habits' },
    ],
    notes: [{ title: 'India note', body: 'India is our country. New Delhi is its capital. The national animal is the Bengal tiger.' }],
    photos: [{ title: 'India fact sheet', detail: 'A sample page of national symbols · Added last week' }],
    questions: [{ title: 'National animal', detail: 'What is the national animal of India?' }, { title: 'Capital city', detail: 'What is the capital of India?' }],
    answers: [{ title: 'What is the national animal?', detail: 'Answer: Bengal tiger' }, { title: 'What is the capital of India?', detail: 'Answer: New Delhi' }],
    tests: [{ title: 'Our country quiz', detail: '10 questions · India and its national symbols' }],
    results: [{ title: 'Our country quiz', detail: '7 / 10 · Revisit national symbols' }],
    mistakes: [{ title: 'Capital city', detail: 'New Delhi is the capital of India; Mumbai is a major city in Maharashtra.' }],
  },
  computer: {
    chapters: [
      { title: 'Parts of a Computer', detail: 'Name the monitor, keyboard, mouse, and CPU' },
      { title: 'Keyboard Keys', detail: 'Use letters, numbers, Space, and Enter' },
      { title: 'Drawing on a Computer', detail: 'Create shapes and fill them with colour' },
      { title: 'Safe Computer Use', detail: 'Sit well and take screen breaks' },
    ],
    notes: [{ title: 'Computer parts', body: 'The monitor shows information, the keyboard helps us type, the mouse helps us point, and the CPU does the main work.' }],
    photos: [{ title: 'Computer lab notes', detail: 'A labelled computer drawing · Added Friday' }],
    questions: [{ title: 'Input device', detail: 'Which device helps us type letters?' }, { title: 'Good habit', detail: 'Why should we take breaks from the screen?' }],
    answers: [{ title: 'Which device helps us type?', detail: 'Answer: Keyboard' }, { title: 'Why take screen breaks?', detail: 'Answer: To rest our eyes and body' }],
    tests: [{ title: 'Computer basics', detail: '10 questions · Parts, keys, and safe use' }],
    results: [{ title: 'Computer basics', detail: '6 / 10 · Practise the names of computer parts' }],
    mistakes: [{ title: 'Keyboard and mouse', detail: 'The keyboard is for typing; the mouse helps us point, click, and select.' }],
  },
};

export function getSubjectContent(subject: Subject): SubjectContent {
  return subjectExamples[subject.id] ?? subjectExamples.math;
}

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
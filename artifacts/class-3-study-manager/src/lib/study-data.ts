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

export type ChapterContent = {
  notes: { title: string; detail: string }[];
  photos: { title: string; detail: string }[];
  questions: { title: string; detail: string }[];
  answers: { title: string; detail: string }[];
  tests: { title: string; detail: string }[];
  results: { title: string; detail: string }[];
  mistakes: { title: string; detail: string }[];
};

export const subjects: Subject[] = [
  { id: 'english-first', name: 'English First', short: 'EN', color: '#5A7F72', tint: '#E3F0E9', icon: 'Aa', progress: 72, next: "Milo's New Friend" },
  { id: 'english-second', name: 'English Second', short: 'EN', color: '#CC7A53', tint: '#FBE9DF', icon: 'Ab', progress: 58, next: 'Common and Proper Nouns' },
  { id: 'hindi-first', name: 'Hindi First', short: 'हि', color: '#B26A55', tint: '#F7E4DE', icon: 'अ', progress: 64, next: 'मेरा परिवार' },
  { id: 'hindi-second', name: 'Hindi Second', short: 'हि', color: '#7A67A2', tint: '#ECE6F8', icon: 'आ', progress: 49, next: 'भाषा' },
  { id: 'math', name: 'Math', short: 'M', color: '#3E7891', tint: '#E0F0F4', icon: '÷', progress: 81, next: 'Numbers up to 1000' },
  { id: 'math-second', name: 'Math Second', short: 'M', color: '#D39B45', tint: '#FFF2D9', icon: '×', progress: 67, next: 'Time' },
  { id: 'evs', name: 'EVS', short: 'EV', color: '#4E8B69', tint: '#E2F2E4', icon: '✦', progress: 76, next: 'My Family' },
  { id: 'gk', name: 'GK', short: 'GK', color: '#46799C', tint: '#E0ECF7', icon: '?', progress: 43, next: 'Creative Behaviour' },
  { id: 'skill', name: 'Skill', short: 'SK', color: '#9A6B9E', tint: '#F2E8F4', icon: '★', progress: 35, next: 'Understanding Myself Better' },
];

const subjectExamples: Record<string, SubjectContent> = {
  'english-first': {
    chapters: [
      { title: "Milo's New Friend", detail: 'Unit 1 · Friendship' },
      { title: 'Daisy Meets Mr Grimwood', detail: 'Unit 1 · Friendship' },
      { title: 'A Night-Time Adventure (Poem)', detail: 'Unit 1 · Friendship' },
      { title: 'Rescue Of Mr Whiskers', detail: 'Unit 2 · Bright Ideas' },
      { title: "Rani's Beautiful Flowers", detail: 'Unit 2 · Bright Ideas' },
      { title: 'Animals (Poem)', detail: 'Unit 2 · Bright Ideas' },
      { title: 'Fun Of Staying Healthy', detail: 'Unit 3 · Health is Wealth' },
      { title: 'Fun Without Screens', detail: 'Unit 3 · Health is Wealth' },
      { title: 'Stay Healthy (Poem)', detail: 'Unit 3 · Health is Wealth' },
      { title: 'Story Of Echoes', detail: 'Unit 4 · Kindness' },
      { title: 'Enchanted Shoes', detail: 'Unit 4 · Kindness' },
      { title: 'Kindness (Poem)', detail: 'Unit 4 · Kindness' },
      { title: 'Secrets Of Mallakhamb', detail: 'Unit 5 · Sports' },
      { title: 'Great Race', detail: 'Unit 5 · Sports' },
      { title: 'Sports Day (Poem)', detail: 'Unit 5 · Sports' },
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
      { title: 'Common and Proper Nouns', detail: 'Chapter 1' },
      { title: 'Singular and Plural', detail: 'Chapter 2' },
      { title: 'Male and Female', detail: 'Chapter 3' },
      { title: 'Pronouns', detail: 'Chapter 4' },
      { title: 'Verbs', detail: 'Chapter 5' },
      { title: 'Adjectives', detail: 'Chapter 6' },
      { title: 'Comparison', detail: 'Chapter 7' },
      { title: 'Synonyms and Antonyms', detail: 'Chapter 8' },
      { title: 'The Little Bird in the Big Mountains', detail: 'Chapter 9 · Comprehension A' },
      { title: 'Present Tense', detail: 'Chapter 10' },
      { title: 'Past Tense', detail: 'Chapter 11' },
      { title: 'Future Tense', detail: 'Chapter 12' },
      { title: 'The Kathasaritsagara', detail: 'Chapter 13 · Comprehension B' },
      { title: 'Fun with Words', detail: 'Chapter 14' },
      { title: 'Adverbs', detail: 'Chapter 15' },
      { title: 'Articles', detail: 'Chapter 16' },
      { title: 'Punctuation', detail: 'Chapter 17' },
      { title: 'Sentences', detail: 'Chapter 18' },
      { title: 'Prepositions', detail: 'Chapter 19' },
      { title: 'Conjunctions', detail: 'Chapter 20' },
      { title: 'Homophones', detail: 'Chapter 21' },
      { title: 'Picture Books in Winter', detail: 'Chapter 22 · Comprehension C' },
      { title: 'Letter Writing', detail: 'Chapter 23' },
      { title: 'Creative Writing', detail: 'Chapter 24' },
      { title: 'The Secret Song', detail: 'Chapter 25 · Comprehension D' },
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
      { title: 'भाषा', detail: 'पाठ 1' },
      { title: 'वर्णमाला', detail: 'पाठ 2' },
      { title: 'मात्राएँ, शब्द तथा वाक्य', detail: 'पाठ 3' },
      { title: 'संज्ञा', detail: 'पाठ 4' },
      { title: 'लिंग', detail: 'पाठ 5' },
      { title: 'वचन', detail: 'पाठ 6' },
      { title: 'सर्वनाम', detail: 'पाठ 7' },
      { title: 'विशेषण', detail: 'पाठ 8' },
      { title: 'क्रिया', detail: 'पाठ 9' },
      { title: 'विराम-चिह्न', detail: 'पाठ 10' },
      { title: 'शब्द-भंडार', detail: 'पाठ 11' },
      { title: 'मुहावरे', detail: 'पाठ 12' },
      { title: 'अशुद्धि-शोधन', detail: 'पाठ 13' },
      { title: 'गिनती', detail: 'पाठ 14' },
      { title: 'अपठित गद्यांश', detail: 'पाठ 15' },
      { title: 'श्रवण अवबोधन', detail: 'पाठ 16' },
      { title: 'चित्र-वर्णन', detail: 'पाठ 17' },
      { title: 'अनुच्छेद-लेखन', detail: 'पाठ 18' },
      { title: 'कहानी-लेखन', detail: 'पाठ 19' },
      { title: 'संवाद-लेखन', detail: 'पाठ 20' },
      { title: 'पत्र-लेखन', detail: 'पाठ 21' },
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
      { title: 'Numbers up to 1000', detail: 'Chapter 1' },
      { title: 'Addition', detail: 'Chapter 2' },
      { title: 'Subtraction', detail: 'Chapter 3' },
      { title: 'Multiplication', detail: 'Chapter 4' },
      { title: 'Division', detail: 'Chapter 5' },
      { title: 'Fractions', detail: 'Chapter 6' },
      { title: 'Geometry', detail: 'Chapter 7' },
      { title: 'Symmetry and Patterns', detail: 'Chapter 8' },
      { title: 'Measurement', detail: 'Chapter 9' },
      { title: 'Money', detail: 'Chapter 10' },
      { title: 'Time', detail: 'Chapter 11' },
      { title: 'Data Handling', detail: 'Chapter 12' },
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
      { title: 'Time', detail: 'Chapter 1' },
      { title: 'Money', detail: 'Chapter 2' },
      { title: 'Measurement', detail: 'Chapter 3' },
      { title: 'Patterns', detail: 'Chapter 4' },
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
      { title: 'My Family', detail: 'Chapter 1' },
      { title: 'Family Similarities', detail: 'Chapter 2' },
      { title: 'Special People', detail: 'Chapter 3' },
      { title: 'Plants', detail: 'Chapter 4' },
      { title: 'Leaves', detail: 'Chapter 5' },
      { title: 'Animals', detail: 'Chapter 6' },
      { title: 'Insects', detail: 'Chapter 7' },
      { title: 'Birds', detail: 'Chapter 8' },
      { title: 'Work and Leisure', detail: 'Chapter 9' },
      { title: 'Play Time', detail: 'Chapter 10' },
      { title: 'Sources of Food', detail: 'Chapter 11' },
      { title: 'Cooking of Food', detail: 'Chapter 12' },
      { title: 'Eating in the Family', detail: 'Chapter 13' },
      { title: 'Food for Animals', detail: 'Chapter 14' },
      { title: 'Our Houses', detail: 'Chapter 15' },
      { title: 'Animals Around Us', detail: 'Chapter 16' },
      { title: 'Left - Right of My Neighbourhood', detail: 'Chapter 17' },
      { title: 'Sources of Water', detail: 'Chapter 18' },
      { title: 'Importance of Water', detail: 'Chapter 19' },
      { title: 'Conservation of Water', detail: 'Chapter 20' },
      { title: 'Reaching Places', detail: 'Chapter 21' },
      { title: 'The Journey of a Letter', detail: 'Chapter 22' },
      { title: 'Our Crafts', detail: 'Chapter 23' },
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
      { title: 'Creative Behaviour', detail: 'Chapter 1' },
      { title: 'Healthy Habits', detail: 'Chapter 2' },
      { title: 'Etiquettes for a Better Life', detail: 'Chapter 3' },
      { title: 'Amazing Plants', detail: 'Chapter 4' },
      { title: 'Gifts From Plants', detail: 'Chapter 5' },
      { title: 'Bugs and Insects', detail: 'Chapter 6' },
      { title: 'Beautiful Birds', detail: 'Chapter 7' },
      { title: 'Discover India', detail: 'Chapter 8' },
      { title: 'Festivals we celebrate', detail: 'Chapter 9' },
      { title: "Children's book authors", detail: 'Chapter 10' },
      { title: 'From pages to screen', detail: 'Chapter 11' },
      { title: 'Adventure Sports', detail: 'Chapter 12' },
      { title: 'Classical Dances', detail: 'Chapter 13' },
      { title: 'Countries and Flags', detail: 'Chapter 14' },
      { title: 'Famous Landmarks', detail: 'Chapter 15' },
      { title: 'Currencies', detail: 'Chapter 16' },
      { title: 'Artificial Intelligence', detail: 'Chapter 17' },
      { title: 'Solar System', detail: 'Chapter 18' },
      { title: 'Different Kinds of Houses', detail: 'Chapter 19' },
      { title: 'Getting from Here to There', detail: 'Chapter 20' },
      { title: 'Special Vehicles', detail: 'Chapter 21' },
      { title: 'Joy Rides', detail: 'Chapter 22' },
      { title: 'Brain Twister', detail: 'Chapter 23' },
      { title: 'Maths Mania', detail: 'Chapter 24' },
      { title: 'How Many?', detail: 'Chapter 25' },
      { title: 'Stop, Check and Go-1', detail: 'Chapter 26' },
      { title: 'Signs that speak', detail: 'Chapter 27' },
      { title: 'You need to...', detail: 'Chapter 28' },
      { title: 'Colourful flowers', detail: 'Chapter 29' },
      { title: 'Edible Parts of Plants', detail: 'Chapter 30' },
      { title: 'Stripes and Spots', detail: 'Chapter 31' },
      { title: 'Underwater World', detail: 'Chapter 32' },
      { title: 'Festivals of India', detail: 'Chapter 33' },
      { title: 'Dishes of India', detail: 'Chapter 34' },
      { title: "India's First Women", detail: 'Chapter 35' },
      { title: 'We are Proud of You', detail: 'Chapter 36' },
      { title: 'Fables and Fairy Tales', detail: 'Chapter 37' },
      { title: 'Where Do We Play?', detail: 'Chapter 38' },
      { title: 'Sports Stars...', detail: 'Chapter 39' },
      { title: 'Musical Instruments', detail: 'Chapter 40' },
      { title: 'Games Time!', detail: 'Chapter 41' },
      { title: 'Royal Residences', detail: 'Chapter 42' },
      { title: "World's Superlatives", detail: 'Chapter 43' },
      { title: 'Icons on Screen', detail: 'Chapter 44' },
      { title: 'Know Your Computer', detail: 'Chapter 45' },
      { title: 'Parts of the Body', detail: 'Chapter 46' },
      { title: 'Air...', detail: 'Chapter 47' },
      { title: 'Ramayan...', detail: 'Chapter 48' },
      { title: 'Water Transport', detail: 'Chapter 49' },
      { title: 'Logos', detail: 'Chapter 50' },
      { title: 'All About Tools', detail: 'Chapter 51' },
      { title: 'Taste Buds', detail: 'Chapter 52' },
      { title: 'Crime Scene', detail: 'Chapter 53' },
      { title: 'Can You Read Me?', detail: 'Chapter 54' },
      { title: 'Fun of Riddles', detail: 'Chapter 55' },
      { title: 'Stop, Check and Go-2', detail: 'Chapter 56' },
    ],
    notes: [{ title: 'India note', body: 'India is our country. New Delhi is its capital. The national animal is the Bengal tiger.' }],
    photos: [{ title: 'India fact sheet', detail: 'A sample page of national symbols · Added last week' }],
    questions: [{ title: 'National animal', detail: 'What is the national animal of India?' }, { title: 'Capital city', detail: 'What is the capital of India?' }],
    answers: [{ title: 'What is the national animal?', detail: 'Answer: Bengal tiger' }, { title: 'What is the capital of India?', detail: 'Answer: New Delhi' }],
    tests: [{ title: 'Our country quiz', detail: '10 questions · India and its national symbols' }],
    results: [{ title: 'Our country quiz', detail: '7 / 10 · Revisit national symbols' }],
    mistakes: [{ title: 'Capital city', detail: 'New Delhi is the capital of India; Mumbai is a major city in Maharashtra.' }],
  },
  skill: {
    chapters: [
      { title: 'Understanding Myself Better', detail: 'Chapter 1 · Social Emotional Learning' },
      { title: 'Expressing Myself Clearly', detail: 'Chapter 2 · Social Emotional Learning' },
      { title: 'Critical Thinking in Action', detail: 'Chapter 3 · Social Emotional Learning' },
      { title: 'My World of Emotions', detail: 'Chapter 4 · Social Emotional Learning' },
      { title: 'Responsible Me', detail: 'Chapter 5 · Social Emotional Learning' },
      { title: 'Growing with Good Manners', detail: 'Chapter 6 · Social Emotional Learning' },
      { title: 'The Leader in Me', detail: 'Chapter 7 · Social Emotional Learning' },
      { title: 'Smart Online Safety', detail: 'Chapter 8 · Social Emotional Learning' },
      { title: 'Being Ready for any Disaster', detail: 'Chapter 9 · Social Emotional Learning' },
      { title: 'How I Contribute to the Earth', detail: 'Chapter 10 · Social Emotional Learning' },
      { title: 'Skills Self Assessment', detail: 'Chapter 11 · Social Emotional Learning' },
    ],
    notes: [{ title: 'Skill book', body: 'Class 3 Social Emotional Learning and life skills practice.' }],
    photos: [{ title: 'Skill book page', detail: 'Study photo can be uploaded from the chapter page.' }],
    questions: [{ title: 'Self reflection', detail: 'What is one good habit you practise every day?' }],
    answers: [{ title: 'Self reflection', detail: 'Answer: Give an honest example from your daily life.' }],
    tests: [{ title: 'Skill check', detail: '10 questions · Class 3 life skills and social emotional learning' }],
    results: [{ title: 'Skill check', detail: 'Review your answers and practise one skill at a time.' }],
    mistakes: [{ title: 'Keep practising', detail: 'Read the chapter again and try the activity once more.' }],
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

const chapterExamples: Record<string, ChapterContent> = {
  multiplication: {
    notes: [{ title: 'Equal groups', detail: 'Multiplication means adding equal groups. 4 × 3 means four groups of three.' }],
    photos: [{ title: 'Times table practice page', detail: 'A sample page with 2, 3, 4, and 5 times tables · Added today' }],
    questions: [{ title: 'Warm-up', detail: 'What is 4 × 6?' }, { title: 'Think in groups', detail: 'How many legs do 5 cats have altogether?' }],
    answers: [{ title: 'What is 4 × 6?', detail: 'Answer: 24' }, { title: 'How many legs do 5 cats have?', detail: 'Answer: 20 legs' }],
    tests: [{ title: 'Multiplication check', detail: '10 questions · Equal groups and tables up to 10' }],
    results: [{ title: 'Multiplication check', detail: '8 / 10 · Review the 6 and 7 times tables' }],
    mistakes: [{ title: 'Counting groups', detail: 'Count the number of groups first, then count how many are in each group.' }],
  },
  division: {
    notes: [{ title: 'Sharing equally', detail: 'Division shares a number into equal groups. 12 ÷ 3 means 12 shared equally into 3 groups.' }],
    photos: [{ title: 'Sharing equally worksheet', detail: 'A sample page with counters and division sums · Added yesterday' }],
    questions: [{ title: 'Share the apples', detail: 'Share 12 apples equally between 3 children.' }, { title: 'Division fact', detail: 'What is 20 ÷ 5?' }],
    answers: [{ title: 'Share 12 apples equally', detail: 'Answer: 4 apples for each child' }, { title: 'What is 20 ÷ 5?', detail: 'Answer: 4' }],
    tests: [{ title: 'Division check', detail: '10 questions · Equal sharing and division facts' }],
    results: [{ title: 'Division check', detail: '7 / 10 · Draw groups to check each answer' }],
    mistakes: [{ title: 'Equal groups', detail: 'Every group must have the same number of objects.' }],
  },
  fractions: {
    notes: [{ title: 'Parts of a whole', detail: 'A fraction shows equal parts of one whole. In 3/4, the 3 counts the parts and 4 names the total equal parts.' }],
    photos: [{ title: 'Fraction shapes page', detail: 'A sample page with halves, thirds, and quarters · Added Monday' }],
    questions: [{ title: 'Name the fraction', detail: 'A pizza has 4 equal slices and 1 slice is eaten. What fraction was eaten?' }, { title: 'Make a whole', detail: 'How many halves make one whole?' }],
    answers: [{ title: 'What fraction was eaten?', detail: 'Answer: 1/4' }, { title: 'How many halves make one whole?', detail: 'Answer: 2 halves' }],
    tests: [{ title: 'Fractions check', detail: '10 questions · Halves, thirds, quarters, and equal parts' }],
    results: [{ title: 'Fractions check', detail: '9 / 10 · Excellent work with equal parts' }],
    mistakes: [{ title: 'Equal parts', detail: 'The parts must be the same size for a fraction to be fair.' }],
  },
  shapes: {
    notes: [{ title: 'Shape clues', detail: 'A triangle has 3 sides, a square has 4 equal sides, and a rectangle has 4 sides with opposite sides equal.' }],
    photos: [{ title: 'Shape hunt page', detail: 'A sample page matching shapes to things at home · Added Friday' }],
    questions: [{ title: 'Count the sides', detail: 'How many sides does a hexagon have?' }, { title: 'Find the shape', detail: 'Which shape has 4 equal sides?' }],
    answers: [{ title: 'How many sides does a hexagon have?', detail: 'Answer: 6 sides' }, { title: 'Which shape has 4 equal sides?', detail: 'Answer: Square' }],
    tests: [{ title: 'Shapes check', detail: '10 questions · Sides, corners, and common 2D shapes' }],
    results: [{ title: 'Shapes check', detail: '8 / 10 · Review rectangles and squares' }],
    mistakes: [{ title: 'Square and rectangle', detail: 'A square has four equal sides; a rectangle has two long and two short sides.' }],
  },
};

export function getChapterContent(chapterTitle: string): ChapterContent {
  const key = chapterTitle.toLowerCase();
  return chapterExamples[key] ?? {
    notes: [{ title: `${chapterTitle} notes`, detail: `A short Class 3 reminder for ${chapterTitle}. Read it once, then explain it in your own words.` }],
    photos: [{ title: `${chapterTitle} notebook page`, detail: `A sample study photo for ${chapterTitle} · Added today` }],
    questions: [{ title: 'Practice question', detail: `What is one important idea from ${chapterTitle}?` }],
    answers: [{ title: 'Practice question', detail: `Answer: Review the main idea from ${chapterTitle}.` }],
    tests: [{ title: `${chapterTitle} check`, detail: '5 questions · A quick chapter review' }],
    results: [{ title: `${chapterTitle} check`, detail: '4 / 5 · Keep revising this chapter' }],
    mistakes: [{ title: 'Review once more', detail: `Read the ${chapterTitle} notes again and try the practice question.` }],
  };
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

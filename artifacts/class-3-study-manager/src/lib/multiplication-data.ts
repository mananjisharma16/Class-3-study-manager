export type MultiplicationQuestion = {
  id: number;
  question: string;
  options: [string, string, string, string];
  answer: string;
  explanation: string;
};

export type MultiplicationWorksheet = {
  title: string;
  detail: string;
  preview: string;
};

export type MultiplicationTestItem = {
  id: number;
  kind: 'mcq' | 'fill' | 'word';
  question: string;
  options?: [string, string, string, string];
  answer: string;
  acceptedAnswers?: string[];
  explanation: string;
};

export const multiplicationContent = {
  notes: [
    { title: 'Meaning of multiplication', detail: 'Multiplication is a quick way to add equal groups. It tells us how many objects there are altogether.' },
    { title: 'Repeated addition', detail: '3 × 4 means 3 groups of 4: 4 + 4 + 4 = 12. We can also say 4 added 3 times.' },
    { title: 'Multiplication sign', detail: 'The sign × is read as “times”. In 5 × 2, we say “five times two”.' },
    { title: 'Factors and product', detail: 'The numbers we multiply are factors. The answer is the product. In 6 × 4 = 24, 6 and 4 are factors and 24 is the product.' },
    { title: 'Tables 2 to 10', detail: 'Practise skip-counting: 2s, 3s, 4s, 5s, 6s, 7s, 8s, 9s, and 10s. Say each table aloud, then write it.' },
    { title: 'Properties for Class 3', detail: 'Order property: 3 × 4 = 4 × 3. One property: 7 × 1 = 7. Zero property: 9 × 0 = 0.' },
    { title: 'Solve a word problem', detail: 'Read the story, find the equal groups, write a multiplication sentence, and check that the answer makes sense.' },
    { title: 'Step-by-step example', detail: '4 boxes have 3 pencils each. Step 1: There are 4 equal groups. Step 2: Each group has 3 pencils. Step 3: 4 × 3 = 12. Answer: 12 pencils.' },
  ],
  worksheets: [
    { title: 'Tables 2 to 10', detail: 'Complete one row for each table from 2 to 10.', preview: '2 × 1 = __   2 × 2 = __   2 × 3 = __' },
    { title: 'Fill in the blanks', detail: 'Find the missing factor or product.', preview: '6 × __ = 42   __ × 5 = 25   9 × 2 = __' },
    { title: 'Match the following', detail: 'Draw lines to match each multiplication sentence to its product.', preview: '3 × 4  →  20     5 × 4  →  12' },
    { title: 'Missing numbers', detail: 'Use skip-counting and the tables to find each missing number.', preview: '7, 14, __, 28, __, 42' },
    { title: 'Simple multiplication', detail: 'Solve the sums and show your working beside each one.', preview: '4 × 6 = __   8 × 3 = __   7 × 5 = __' },
  ],
  questions: [
    { id: 1, question: 'What is 3 × 4?', options: ['7', '12', '14', '16'], answer: '12', explanation: '3 groups of 4 make 4 + 4 + 4 = 12.' },
    { id: 2, question: 'Which multiplication sentence matches 5 + 5 + 5?', options: ['2 × 5', '3 × 5', '5 × 5', '3 + 5'], answer: '3 × 5', explanation: 'There are 3 equal groups of 5.' },
    { id: 3, question: 'Which sign means multiplication?', options: ['+', '−', '×', '÷'], answer: '×', explanation: 'The cross sign × is the multiplication sign.' },
    { id: 4, question: 'In 6 × 4 = 24, what are the factors?', options: ['6 and 4', '4 and 24', '6 and 24', '24 only'], answer: '6 and 4', explanation: 'The numbers being multiplied are the factors.' },
    { id: 5, question: 'What is 7 × 2?', options: ['9', '12', '14', '16'], answer: '14', explanation: '7 + 7 = 14.' },
    { id: 6, question: 'What is 9 × 3?', options: ['18', '21', '27', '29'], answer: '27', explanation: '9 + 9 + 9 = 27.' },
    { id: 7, question: 'What is 10 × 8?', options: ['18', '80', '88', '100'], answer: '80', explanation: 'Ten groups of eight make 80.' },
    { id: 8, question: 'What is 6 × 5?', options: ['11', '25', '30', '35'], answer: '30', explanation: 'Six groups of five make 30.' },
    { id: 9, question: 'What is 8 × 4?', options: ['24', '28', '32', '36'], answer: '32', explanation: '8 + 8 + 8 + 8 = 32.' },
    { id: 10, question: 'Which shows the order property?', options: ['3 × 5 = 15', '3 × 5 = 5 × 3', '3 + 5 = 5 + 3', '3 × 0 = 3'], answer: '3 × 5 = 5 × 3', explanation: 'Changing the order of factors gives the same product.' },
    { id: 11, question: 'What is 7 × 1?', options: ['1', '6', '7', '8'], answer: '7', explanation: 'Any number multiplied by 1 stays the same.' },
    { id: 12, question: 'What is 9 × 0?', options: ['0', '1', '9', '90'], answer: '0', explanation: 'Any number multiplied by zero gives zero.' },
    { id: 13, question: 'There are 4 baskets with 6 apples each. How many apples are there?', options: ['10', '18', '24', '30'], answer: '24', explanation: '4 × 6 = 24 apples.' },
    { id: 14, question: 'What is 2 × 9?', options: ['11', '16', '18', '20'], answer: '18', explanation: 'The 2 times table says 2 × 9 = 18.' },
    { id: 15, question: 'What is 10 × 7?', options: ['17', '70', '77', '107'], answer: '70', explanation: 'Seven groups of ten make 70.' },
    { id: 16, question: 'Which number makes 5 × __ = 35?', options: ['5', '6', '7', '8'], answer: '7', explanation: '5 × 7 = 35.' },
    { id: 17, question: 'There are 6 groups of 2 stars. How many stars are there?', options: ['8', '10', '12', '14'], answer: '12', explanation: '6 × 2 = 12 stars.' },
    { id: 18, question: 'What is 4 × 4?', options: ['8', '12', '16', '20'], answer: '16', explanation: 'Four groups of four make 16.' },
    { id: 19, question: 'What is 2 × 10?', options: ['12', '20', '22', '100'], answer: '20', explanation: '2 groups of 10 make 20.' },
    { id: 20, question: 'What is the product of 7 and 8?', options: ['15', '48', '54', '56'], answer: '56', explanation: '7 × 8 = 56.' },
  ] satisfies MultiplicationQuestion[],
  test: [
    { id: 1, kind: 'mcq', question: 'What is 6 × 4?', options: ['10', '20', '24', '28'], answer: '24', explanation: '6 groups of 4 make 24.' },
    { id: 2, kind: 'mcq', question: 'Which repeated addition equals 3 × 5?', options: ['3 + 3 + 3 + 3 + 3', '5 + 5 + 5', '3 + 5', '5 + 5'], answer: '5 + 5 + 5', explanation: 'There are 3 groups of 5.' },
    { id: 3, kind: 'fill', question: 'Complete: 2 × 8 = __', answer: '16', explanation: 'The 2 times table gives 2 × 8 = 16.' },
    { id: 4, kind: 'fill', question: 'Complete: 7 × 5 = __', answer: '35', explanation: 'Seven groups of five make 35.' },
    { id: 5, kind: 'word', question: 'There are 3 bags with 4 marbles in each. How many marbles are there?', answer: '12', acceptedAnswers: ['12', '12 marbles'], explanation: '3 × 4 = 12 marbles.' },
    { id: 6, kind: 'mcq', question: 'Which sign means times?', options: ['+', '×', '÷', '='], answer: '×', explanation: '× is the multiplication sign.' },
    { id: 7, kind: 'fill', question: 'Complete: 9 × 2 = __', answer: '18', explanation: '9 + 9 = 18.' },
    { id: 8, kind: 'word', question: 'There are 5 rows with 6 chairs in each row. How many chairs are there?', answer: '30', acceptedAnswers: ['30', '30 chairs'], explanation: '5 × 6 = 30 chairs.' },
    { id: 9, kind: 'mcq', question: 'Which are the factors in 8 × 3 = 24?', options: ['8 and 3', '3 and 24', '8 and 24', '24 only'], answer: '8 and 3', explanation: 'The factors are the numbers we multiply.' },
    { id: 10, kind: 'fill', question: 'Complete: 10 × 7 = __', answer: '70', explanation: 'Ten groups of seven make 70.' },
    { id: 11, kind: 'mcq', question: 'What is 8 × 0?', options: ['0', '1', '8', '80'], answer: '0', explanation: 'The zero property says any number times zero is zero.' },
    { id: 12, kind: 'word', question: 'There are 4 boxes with 8 crayons in each. How many crayons are there?', answer: '32', acceptedAnswers: ['32', '32 crayons'], explanation: '4 × 8 = 32 crayons.' },
    { id: 13, kind: 'fill', question: 'Complete: 6 × 6 = __', answer: '36', explanation: 'Six groups of six make 36.' },
    { id: 14, kind: 'mcq', question: 'Which sentence is also true when 3 × 7 = 21?', options: ['7 × 3 = 21', '3 × 7 = 10', '7 + 3 = 21', '3 × 0 = 21'], answer: '7 × 3 = 21', explanation: 'The order property lets us change the order of factors.' },
    { id: 15, kind: 'word', question: 'A week has 7 days. How many days are there in 2 weeks?', answer: '14', acceptedAnswers: ['14', '14 days'], explanation: '2 × 7 = 14 days.' },
    { id: 16, kind: 'fill', question: 'Complete: __ × 4 = 28', answer: '7', explanation: '7 × 4 = 28.' },
    { id: 17, kind: 'mcq', question: 'What is 5 × 9?', options: ['14', '35', '45', '50'], answer: '45', explanation: 'Five groups of nine make 45.' },
    { id: 18, kind: 'word', question: 'There are 6 plates with 3 biscuits on each. How many biscuits are there?', answer: '18', acceptedAnswers: ['18', '18 biscuits'], explanation: '6 × 3 = 18 biscuits.' },
    { id: 19, kind: 'fill', question: 'Complete: 3 × 10 = __', answer: '30', explanation: 'Three groups of ten make 30.' },
    { id: 20, kind: 'mcq', question: 'What is the product of 7 and 8?', options: ['15', '48', '54', '56'], answer: '56', explanation: '7 × 8 = 56.' },
  ] satisfies MultiplicationTestItem[],
  previousResult: { title: 'Earlier multiplication practice', detail: '8 / 10 · Review the 6 and 7 times tables' },
  mistakes: [
    { title: 'Counting equal groups', detail: 'Count the number of groups first, then count how many are in each group.' },
    { title: 'Factors and product', detail: 'The factors are multiplied; the product is the answer.' },
  ],
};
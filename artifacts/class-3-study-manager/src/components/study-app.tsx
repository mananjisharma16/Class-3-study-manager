function CreateTestPage() {
  function GenericTestPage() {
  const [, params] = useRoute('/take-test/:subjectId');
  const [, navigate] = useLocation();

  const subject =
    subjects.find((item) => item.id === params?.subjectId) || subjects[0];

  const content = getSubjectContent(subject);

  const questionItems = content.questions as {
    title: string;
    detail: string;
  }[];

  const answerItems = content.answers as {
    title: string;
    detail: string;
  }[];

  const availableQuestions = questionItems.map((question, index) => ({
    id: `${subject.id}-${index}`,
    question: question.title,
    answer:
      answerItems[index]?.detail ||
      answerItems[index]?.title ||
      '',
  }));

  const requestedCount = Number(
    new URLSearchParams(window.location.search).get('count') || '5',
  );

  const questions = availableQuestions.slice(
    0,
    Math.min(requestedCount, availableQuestions.length),
  );

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[current];

  if (!currentQuestion) {
    return (
      <Shell>
        <div className="mx-auto max-w-[800px]">
          <section className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-8 text-center">
            <h2 className="display-serif text-3xl font-bold text-[#244238]">
              No questions available
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#718077]">
              This subject does not have test questions yet.
            </p>

            <button
              type="button"
              onClick={() => navigate('/create-test')}
              className="mt-6 rounded-xl bg-[#244238] px-5 py-3 text-sm font-bold text-[#FFF9E9]"
            >
              Back to Create Test
            </button>
          </section>
        </div>
      </Shell>
    );
  }

  const calculateScore = () => {
    return questions.filter((item) => {
      return (
        normalizeAnswer(answers[item.id] || '') ===
        normalizeAnswer(item.answer)
      );
    }).length;
  };

  if (submitted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Shell>
        <div className="mx-auto max-w-[800px] animate-rise-in">
          <section className="rounded-[25px] border border-[#E9DFCF] bg-[#FFFDF7] p-6 text-center sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E3F0E9] text-[#5A7F72]">
              <Trophy size={30} />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[.18em] text-[#D28658]">
              Test complete
            </p>

            <h2 className="display-serif mt-2 text-[34px] font-bold text-[#244238]">
              {subject.name}
            </h2>

            <p className="mt-4 text-5xl font-bold text-[#244238]">
              {score}/{questions.length}
            </p>

            <p className="mt-2 text-sm font-bold text-[#718077]">
              {percentage}% score
            </p>

            <div className="mt-8 space-y-3 text-left">
              {questions.map((item, index) => {
                const correct =
                  normalizeAnswer(answers[item.id] || '') ===
                  normalizeAnswer(item.answer);

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border p-4 ${
                      correct
                        ? 'border-[#CFE1D5] bg-[#EAF5ED]'
                        : 'border-[#E9D0C7] bg-[#FBE9DF]'
                    }`}
                  >
                    <p className="text-sm font-bold text-[#244238]">
                      {index + 1}. {item.question}
                    </p>

                    <p className="mt-2 text-xs text-[#718077]">
                      Your answer: {answers[item.id] || 'No answer'}
                    </p>

                    <p className="mt-1 text-xs font-bold text-[#5A7F72]">
                      Correct answer: {item.answer}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setCurrent(0);
                  setSubmitted(false);
                }}
                className="rounded-xl border border-[#DCCFBD] px-5 py-3 text-sm font-bold text-[#718077]"
              >
                Retake Test
              </button>

              <button
                type="button"
                onClick={() => navigate(`/subject/${subject.id}`)}
                className="rounded-xl bg-[#244238] px-5 py-3 text-sm font-bold text-[#FFF9E9]"
              >
                Back to {subject.name}
              </button>
            </div>
          </section>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-[800px] animate-rise-in">
        <Link
          href="/create-test"
          className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-[#7C8980]"
        >
          <ArrowLeft size={15} />
          Back to Create Test
        </Link>

        <section className="overflow-hidden rounded-[25px] border border-[#E9DFCF] bg-[#FFFDF7]">
          <div
            className="p-6 sm:p-9"
            style={{ backgroundColor: subject.tint }}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em]">
                {subject.name}
              </span>

              <span className="text-xs font-bold text-[#65746C]">
                Question {current + 1} / {questions.length}
              </span>
            </div>

            <h2 className="display-serif mt-8 text-[30px] font-bold leading-tight text-[#244238] sm:text-[38px]">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="p-6 sm:p-9">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#244238]">
                Your answer
              </span>

              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) =>
                  setAnswers((old) => ({
                    ...old,
                    [currentQuestion.id]: e.target.value,
                  }))
                }
                rows={4}
                className="w-full rounded-xl border border-[#E3D8C8] bg-[#FFFDF7] p-4 text-sm text-[#244238] outline-none focus:border-[#5A7F72]"
                placeholder="Type your answer here..."
              />
            </label>

            <div className="mt-6 flex justify-end">
              {current < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrent((value) => value + 1)}
                  className="flex items-center gap-2 rounded-xl bg-[#244238] px-5 py-3 text-sm font-bold text-[#FFF9E9]"
                >
                  Next Question
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="flex items-center gap-2 rounded-xl bg-[#244238] px-5 py-3 text-sm font-bold text-[#FFF9E9]"
                >
                  <Check size={16} />
                  Submit Test
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </Shell>
  );
}
  const [, navigate] = useLocation();
  const [subject, setSubject] = useState(subjects[0]?.name || '');
  const [count, setCount] = useState('5');

  const startTest = () => {
    const selected = subjects.find((item) => item.name === subject);

    if (!selected) return;

    navigate(`/take-test/${selected.id}?count=${count}`);
  };

  return (
    <Shell>
      <div className="mx-auto max-w-[900px] animate-rise-in">
        <SectionHeading
          eyebrow="Make revision feel simple"
          title="Create a Test"
        />

        <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <section className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-6 sm:p-8">
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#244238]">
                  Choose a subject
                </span>

                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="min-h-12 w-full rounded-xl border border-[#E3D8C8] bg-[#FFFDF7] px-4 text-sm text-[#244238] outline-none focus:border-[#5A7F72]"
                  data-testid="select-test-subject"
                >
                  {subjects.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#244238]">
                  Number of questions
                </span>

                <div className="grid grid-cols-3 gap-2">
                  {['5', '10', '15'].map((value) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setCount(value)}
                      className={`min-h-12 rounded-xl border text-sm font-bold ${
                        count === value
                          ? 'border-[#5A7F72] bg-[#E3F0E9] text-[#244238]'
                          : 'border-[#E3D8C8] text-[#839089]'
                      }`}
                      data-testid={`button-question-count-${value}`}
                    >
                      {value} questions
                    </button>
                  ))}
                </div>
              </label>
            </div>

            <button
              type="button"
              onClick={startTest}
              className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#244238] text-sm font-bold text-[#FFF9E9] transition hover:bg-[#31584b]"
              data-testid="button-create-test"
            >
              <Plus size={17} />
              Start {subject} test
            </button>
          </section>

          <aside className="paper-grid h-fit rounded-2xl border border-[#E4D9C6] bg-[#F7F0E0] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5C95B] text-[#244238]">
              <FileText size={20} />
            </div>

            <h3 className="display-serif mt-5 text-[25px] font-bold text-[#244238]">
              Ready to practise?
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#6C766D]">
              Choose a subject and start your test.
            </p>
          </aside>
        </div>
      </div>
    </Shell>
  );
}

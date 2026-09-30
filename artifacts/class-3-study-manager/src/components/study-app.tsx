function CreateTestPage() {
  const [, navigate] = useLocation();
  const [subject, setSubject] = useState('Math');
  const [count, setCount] = useState('5');
  const [note, setNote] = useState('');

  const available = genericTestQuestions[subject]?.length ?? 0;

  const createTest = () => {
    if (!available) return;

    navigate(`/take-test/${encodeURIComponent(subject)}/${count}`);
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
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setCount('5');
                  }}
                  className="min-h-12 w-full rounded-xl border border-[#E3D8C8] bg-[#FFFDF7] px-4 text-sm text-[#244238] outline-none"
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
                      disabled={Number(value) > available}
                      className={`min-h-12 rounded-xl border text-sm font-bold ${
                        count === value
                          ? 'border-[#5A7F72] bg-[#E3F0E9] text-[#244238]'
                          : 'border-[#E3D8C8] text-[#839089]'
                      } ${
                        Number(value) > available
                          ? 'cursor-not-allowed opacity-40'
                          : ''
                      }`}
                    >
                      {value} questions
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-[11px] text-[#89938C]">
                  {available} questions available for {subject}.
                </p>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#244238]">
                  Test note{' '}
                  <span className="font-normal text-[#A1A9A1]">
                    (optional)
                  </span>
                </span>

                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Revision before Friday"
                  className="min-h-12 w-full rounded-xl border border-[#E3D8C8] bg-[#FFFDF7] px-4 text-sm outline-none"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={createTest}
              disabled={!available}
              className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#244238] text-sm font-bold text-[#FFF9E9] disabled:cursor-not-allowed disabled:opacity-40"
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
              A kind test is a helpful test.
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#6C766D]">
              Choose a subject, start the test, answer the questions, and
              submit to see your score.
            </p>
          </aside>
        </div>
      </div>
    </Shell>
  );
}

function GenericTestPage() {
  const [, params] = useRoute('/take-test/:subject/:count');

  const subject = decodeURIComponent(params?.subject ?? 'Math');
  const count = Math.min(Number(params?.count ?? 5), 5);

  const questions = genericTestQuestions[subject] ?? [];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const testQuestions = questions.slice(0, count);

  const score = testQuestions.filter(
    (question, index) => answers[index] === question.answer,
  ).length;

  if (!questions.length) {
    return (
      <Shell>
        <div className="mx-auto max-w-[800px]">
          <section className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-8 text-center">
            <h2 className="display-serif text-3xl font-bold text-[#244238]">
              No test questions found.
            </h2>

            <p className="mt-3 text-sm text-[#718077]">
              This subject does not have test questions yet.
            </p>

            <Link
              href="/create-test"
              className="mt-6 inline-flex rounded-xl bg-[#244238] px-5 py-3 text-sm font-bold text-[#FFF9E9]"
            >
              Back to Create Test
            </Link>
          </section>
        </div>
      </Shell>
    );
  }

  if (submitted) {
    const wrong = testQuestions.length - score;

    const percentage = Math.round(
      (score / testQuestions.length) * 100,
    );

    return (
      <Shell>
        <div className="mx-auto max-w-[900px] animate-rise-in">
          <SectionHeading
            eyebrow={subject}
            title="Test Result"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat
              label="Score"
              value={`${score}`}
              note="correct"
              color="#E3F0E9"
            />

            <Stat
              label="Total"
              value={`${testQuestions.length}`}
              note="questions"
              color="#E0F0F4"
            />

            <Stat
              label="Percentage"
              value={`${percentage}%`}
              note="result"
              color="#FFF2D9"
            />

            <Stat
              label="Wrong"
              value={`${wrong}`}
              note="answers"
              color="#FBE9DF"
            />
          </div>

          <div className="mt-5 rounded-xl border border-[#CFE1D5] bg-[#EAF5ED] p-5 text-sm font-bold text-[#42725A]">
            Test complete! You can review the answers below.
          </div>

          <div className="mt-5 space-y-3">
            {testQuestions.map((question, index) => {
              const correct = answers[index] === question.answer;

              return (
                <div
                  key={index}
                  className={`rounded-xl border p-4 ${
                    correct
                      ? 'border-[#CFE1D5] bg-[#EAF5ED]'
                      : 'border-[#E9D0C7] bg-[#FBE9DF]'
                  }`}
                >
                  <p className="text-sm font-bold text-[#244238]">
                    {index + 1}. {question.question}
                  </p>

                  <p className="mt-2 text-xs text-[#A4624D]">
                    Your answer:{' '}
                    {answers[index] || 'Not answered'}
                  </p>

                  <p className="mt-1 text-xs font-bold text-[#5A7F72]">
                    Correct answer: {question.answer}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
              className="rounded-xl border border-[#DCCFBD] px-5 py-3 text-sm font-bold text-[#718077]"
            >
              Retake Test
            </button>

            <Link
              href="/create-test"
              className="rounded-xl bg-[#244238] px-5 py-3 text-sm font-bold text-[#FFF9E9]"
            >
              Create Another Test
            </Link>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-[900px] animate-rise-in">
        <Link
          href="/create-test"
          className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-[#7C8980]"
        >
          <ArrowLeft size={15} />
          Back to Create Test
        </Link>

        <SectionHeading
          eyebrow={subject}
          title="Test"
        />

        <div className="mb-5 rounded-xl border border-[#E9DFCF] bg-[#FFFDF7] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#244238]">
              {subject}
            </span>

            <span className="text-xs font-bold text-[#7C8980]">
              {testQuestions.length} questions
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {testQuestions.map((question, index) => (
            <section
              key={index}
              className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-5 sm:p-7"
            >
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E3F0E9] text-sm font-bold text-[#244238]">
                  {index + 1}
                </span>

                <div className="flex-1">
                  <h3 className="text-base font-bold leading-6 text-[#244238]">
                    {question.question}
                  </h3>

                  <div className="mt-4 space-y-2">
                    {question.options.map((option: string) => (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                          answers[index] === option
                            ? 'border-[#5A7F72] bg-[#EAF5ED]'
                            : 'border-[#E3D8C8] bg-[#FFFDF7]'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() =>
                            setAnswers((old) => ({
                              ...old,
                              [index]: option,
                            }))
                          }
                          className="h-4 w-4"
                        />

                        <span className="text-sm text-[#244238]">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#244238] text-sm font-bold text-[#FFF9E9]"
        >
          <Check size={17} />
          Submit Test
        </button>
      </div>
    </Shell>
  );
}

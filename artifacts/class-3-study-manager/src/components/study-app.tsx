import { useEffect, useState } from 'react';
import { Link, Route, Switch, useLocation, useRoute } from 'wouter';
import NotFound from '@/pages/not-found';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  Home as HomeIcon,
  ImagePlus,
  Menu,
  Pencil,
  Plus,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  Upload,
  X,
} from 'lucide-react';
import { getChapterContent, getSubjectContent, practiceItems, subjects, tests, type Subject } from '@/lib/study-data';
import { multiplicationContent, type MultiplicationTestItem } from '@/lib/multiplication-data';
import { deleteChapterPhoto, listChapterPhotos, saveChapterPhoto, type StoredStudyPhoto } from '@/lib/photo-storage';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/practice', label: 'Daily Practice', icon: Pencil },
  { href: '/create-test', label: 'Create Test', icon: FileText },
  { href: '/upload-photo', label: 'Study Photos', icon: Camera },
  { href: '/test-results', label: 'Test Results', icon: BarChart3 },
  { href: '/progress', label: 'Progress Report', icon: Target },
];

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3 focus-ring" data-testid="link-brand">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5C95B] text-[#244238] shadow-sm">
        <BookOpen size={21} strokeWidth={2.4} />
      </span>
      <span className="leading-none">
        <span className="block display-serif text-[20px] font-bold tracking-[-.03em]">Little Ledger</span>
        <span className="mt-1 block text-[10px] font-bold uppercase tracking-[.2em] text-[#A6D7BE]">Class 3 study</span>
      </span>
    </Link>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [location] = useLocation();
  return (
    <>
      {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-[#19372f]/35 lg:hidden" onClick={onClose} data-testid="button-close-navigation" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[268px] flex-col bg-[#244238] px-5 py-6 text-[#FFF9E9] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 flex items-center justify-between"><Brand /><button onClick={onClose} className="rounded-lg p-2 text-[#B8DBC9] hover:bg-white/10 lg:hidden" aria-label="Close menu" data-testid="button-sidebar-close"><X size={20} /></button></div>
        <div className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[.19em] text-[#A6D7BE]">Your study desk</div>
        <nav className="space-y-1.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? location === '/' : location.startsWith(href);
            return <Link key={href} href={href} onClick={onClose} className={`group flex min-h-[47px] items-center gap-3 rounded-xl px-3.5 text-sm font-semibold transition-all duration-200 focus-ring ${active ? 'bg-[#F5C95B] text-[#244238] shadow-md' : 'text-[#D5EADF] hover:bg-white/10 hover:text-white'}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>
              <Icon size={18} strokeWidth={active ? 2.5 : 2} /><span>{label}</span>{active && <ChevronRight size={15} className="ml-auto" />}
            </Link>;
          })}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/[.07] p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8A35F] text-[#244238]"><Sparkles size={17} /></div>
          <p className="text-sm font-bold">Small steps, big smiles.</p>
          <p className="mt-1 text-xs leading-5 text-[#B8DBC9]">A little practice today makes tomorrow easier.</p>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenu }: { onMenu: () => void }) {
  const [location] = useLocation();
  const titles: Record<string, string> = {
    '/': 'Good morning, Aanya',
    '/practice': 'Daily Practice',
    '/create-test': 'Create a Test',
    '/upload-photo': 'Study Photos',
    '/test-results': 'Test Results',
    '/progress': 'Progress Report',
  };
  const title = titles[location] || (location.startsWith('/subject') ? 'Subject notebook' : 'Study desk');
  return <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#E8DDCB] bg-[#FFFDF7]/90 px-4 backdrop-blur-md sm:px-7 lg:px-10">
    <div className="flex items-center gap-3"><button onClick={onMenu} className="rounded-xl p-2 text-[#244238] hover:bg-[#F1E9DA] lg:hidden" aria-label="Open menu" data-testid="button-open-navigation"><Menu size={22} /></button><div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-[#8C9890]">Thursday, 16 May 2024</p><h1 className="display-serif mt-0.5 text-[22px] font-bold text-[#244238] sm:text-[25px]">{title}</h1></div></div>
    <div className="flex items-center gap-3"><span className="hidden items-center gap-2 rounded-full bg-[#F7E9CC] px-3 py-2 text-xs font-bold text-[#816C42] sm:flex"><Sparkles size={14} /> 7 day streak</span><button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8A35F] font-bold text-[#FFF9E9] ring-4 ring-[#FBEEDB] transition hover:scale-105" aria-label="Aanya profile" data-testid="button-child-profile">A</button></div>
  </header>;
}

function Shell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="min-h-[100dvh] bg-[#F9F5EC]"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} /><div className="min-h-[100dvh] lg:pl-[268px]"><Header onMenu={() => setMenuOpen(true)} /><main className="mx-auto max-w-[1320px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">{children}</main></div></div>;
}

function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return <div className="mb-5 flex items-end justify-between gap-4"><div>{eyebrow && <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#D28658]">{eyebrow}</p>}<h2 className="display-serif text-[24px] font-bold tracking-[-.03em] text-[#244238] sm:text-[28px]">{title}</h2></div>{action}</div>;
}

function ProgressBar({ value, color = '#5A7F72' }: { value: number; color?: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-[#EFE8DA]" aria-label={`${value}% complete`}><div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} /></div>;
}
function SubjectCard({ subject }: { subject: Subject }) {
  return <Link href={`/subject/${subject.id}`} className="group rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-4 shadow-[0_3px_12px_rgba(78,62,40,.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(78,62,40,.11)] focus-ring" data-testid={`card-subject-${subject.id}`}>
    <div className="mb-4 flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold" style={{ backgroundColor: subject.tint, color: subject.color }}>{subject.icon}</span><ChevronRight size={17} className="text-[#B3B7AF] transition group-hover:translate-x-1 group-hover:text-[#244238]" /></div>
    <h3 className="text-[14px] font-bold text-[#244238]">{subject.name}</h3><p className="mt-1 truncate text-[11px] text-[#8A958C]">Next: {subject.next}</p>
    <div className="mt-4 flex items-center gap-2"><ProgressBar value={subject.progress} color={subject.color} /><span className="text-[10px] font-bold text-[#839089]">{subject.progress}%</span></div>
  </Link>;
}

function Home() {
  const [checked, setChecked] = useState<string[]>([]);
  const practiceDone = checked.length;
  return <Shell>
    <div className="animate-rise-in">
      <section className="relative mb-8 overflow-hidden rounded-[25px] bg-[#E8A35F] px-6 py-7 text-[#FFF9E9] shadow-[0_12px_30px_rgba(181,111,68,.15)] sm:px-9 sm:py-8">
        <div className="relative z-10 max-w-[600px]"><div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#FFF1D2]"><span className="h-2 w-2 rounded-full bg-[#F5C95B]" /> Aanya's study desk</div><h2 className="display-serif max-w-[520px] text-[32px] font-bold leading-[1.05] tracking-[-.04em] sm:text-[43px]">Ready for a bright little study session?</h2><p className="mt-4 max-w-[440px] text-sm leading-6 text-[#FFF1D2]">You have a gentle plan for today. Start with a few questions, then celebrate the progress.</p><Link href="/practice" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FFF9E9] px-4 py-3 text-sm font-bold text-[#244238] shadow-sm transition hover:-translate-y-0.5 focus-ring" data-testid="link-start-practice">Start today's practice <ArrowRight size={16} /></Link></div>
        <div className="absolute -right-10 -top-12 h-52 w-52 rounded-full border-[22px] border-[#F5C95B]/60" /><div className="absolute -bottom-20 right-24 h-44 w-44 rounded-full border-[18px] border-[#D98255]/45" /><div className="absolute right-[10%] top-10 hidden h-24 w-24 rotate-12 items-center justify-center rounded-[30px] bg-[#FFF9E9]/15 sm:flex"><BookOpen size={42} className="text-[#FFF9E9]/80" /></div>
      </section>
      <div className="mb-10 grid gap-5 md:grid-cols-[1.45fr_.8fr]">
        <section className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-5 shadow-sm sm:p-6"><SectionHeading eyebrow="For today" title="Daily Practice" action={<Link href="/practice" className="text-xs font-bold text-[#D28658] hover:text-[#244238]" data-testid="link-see-practice">See all <ArrowRight size={13} className="ml-1 inline" /></Link>} />
          <div className="space-y-3">{practiceItems.map((item, index) => <div key={item.question} className="flex items-center gap-3 rounded-xl border border-[#EEE5D7] p-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold" style={{ backgroundColor: item.color, color: item.accent }}>0{index + 1}</div><div className="min-w-0 flex-1"><p className="text-xs font-bold text-[#244238]">{item.subject}</p><p className="mt-0.5 truncate text-[11px] text-[#89938C]">{item.question}</p></div><button onClick={() => setChecked((old) => old.includes(item.question) ? old.filter((q) => q !== item.question) : [...old, item.question])} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${checked.includes(item.question) ? 'border-[#5A7F72] bg-[#5A7F72] text-white' : 'border-[#DCCFBD] text-transparent hover:border-[#5A7F72]'}`} aria-label={`Mark ${item.subject} practice done`} data-testid={`button-complete-practice-${index}`}><Check size={15} /></button></div>)}</div>
          <div className="mt-5 flex items-center justify-between border-t border-[#EEE5D7] pt-4"><span className="text-xs text-[#8A958C]">{practiceDone} of {practiceItems.length} checked off</span><div className="w-28"><ProgressBar value={(practiceDone / practiceItems.length) * 100} color="#E8A35F" /></div></div>
        </section>
        <section className="paper-grid rounded-2xl border border-[#E4D9C6] bg-[#F7F0E0] p-5 sm:p-6"><div className="mb-5 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#B27745]">This week</p><h3 className="display-serif mt-1 text-[24px] font-bold text-[#244238]">Keep going!</h3></div><div className="animate-soft-pulse flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5C95B] text-[#244238]"><Trophy size={22} /></div></div><p className="text-sm leading-6 text-[#6C766D]">Aanya has practised for <strong className="text-[#244238]">4 days</strong> in a row. One more session unlocks a new star.</p><div className="mt-5 flex gap-2">{[1, 2, 3, 4, 5].map((day) => <span key={day} className={`h-8 w-8 rounded-full ${day < 5 ? 'bg-[#5A7F72] text-[#FFF9E9]' : 'border-2 border-dashed border-[#D6C29E] text-[#C7B28D]'} flex items-center justify-center text-[11px] font-bold`}>{day < 5 ? <Check size={13} /> : day}</span>)}</div></section>
      </div>
      <SectionHeading eyebrow="The whole notebook" title="Subjects" action={<span className="text-xs font-medium text-[#89938C]">9 subjects</span>} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{subjects.map((subject) => <SubjectCard key={subject.id} subject={subject} />)}</div>
      <div className="mt-10 grid gap-4 md:grid-cols-3"><QuickAction href="/create-test" icon={FileText} title="Create Test" copy="Make a quick revision paper" color="#E3F0E9" /><QuickAction href="/upload-photo" icon={ImagePlus} title="Upload Study Photo" copy="Keep notes in one place" color="#FBE9DF" /><QuickAction href="/progress" icon={BarChart3} title="Progress Report" copy="See the bigger picture" color="#E0ECF7" /></div>
    </div>
  </Shell>;
}

function QuickAction({ href, icon: Icon, title, copy, color }: { href: string; icon: typeof FileText; title: string; copy: string; color: string }) {
  return <Link href={href} className="flex items-center gap-4 rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-ring" data-testid={`link-quick-${title.toLowerCase().replaceAll(' ', '-')}`}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: color }}><Icon size={20} className="text-[#244238]" /></span><span><strong className="block text-sm text-[#244238]">{title}</strong><span className="mt-1 block text-xs text-[#8A958C]">{copy}</span></span><ChevronRight size={16} className="ml-auto text-[#B3B7AF]" /></Link>;
}

function SubjectPage() {
  const [, params] = useRoute('/subject/:subjectId');
  const subject = subjects.find((item) => item.id === params?.subjectId) || subjects[0];
  const [tab, setTab] = useState('Chapters');
  const tabs = ['Chapters', 'Study Notes', 'Study Photos', 'Questions', 'Answers', 'Tests', 'Results', 'Mistakes'];
  const content = getSubjectContent(subject);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const contentKey: Record<string, keyof typeof content> = {
    Chapters: 'chapters',
    'Study Notes': 'notes',
    'Study Photos': 'photos',
    Questions: 'questions',
    Answers: 'answers',
    Tests: 'tests',
    Results: 'results',
    Mistakes: 'mistakes',
  };

  const renderItemList = () => {
    const items = content[contentKey[tab]] as { title: string; detail: string }[];
    return <div className="space-y-3">
      {items.map((item, index) => (
        <button
          type="button"
          key={`${item.title}-${index}`}
          onClick={() => setSelectedItem(item.title)}
          className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-[#B9CFC3] hover:shadow-sm focus-ring ${selectedItem === item.title ? 'border-[#8EB59E] bg-[#F3F8F1]' : 'border-[#EEE5D7] bg-[#FFFDF7]'}`}
          data-testid={`button-subject-item-${tab.toLowerCase().replaceAll(' ', '-')}-${index}`}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold" style={{ backgroundColor: index === 0 ? subject.tint : '#F6F0E5', color: subject.color }}>{String(index + 1).padStart(2, '0')}</span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-[#244238]">{item.title}</span>
            <span className="mt-1 block text-xs leading-5 text-[#8A958C]">{item.detail}</span>
          </span>
          <ChevronRight size={16} className="shrink-0 text-[#B3B7AF]" />
        </button>
      ))}
    </div>;
  };

  return <Shell><div className="animate-rise-in">
    <Link href="/" className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-[#7C8980] hover:text-[#244238] focus-ring" data-testid="link-back-home"><ArrowLeft size={15} /> Back to subjects</Link>
    <div className="mb-7 flex flex-col justify-between gap-5 rounded-[24px] p-6 sm:flex-row sm:items-center sm:p-8" style={{ backgroundColor: subject.tint }}>
      <div className="flex items-center gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-2xl font-bold" style={{ color: subject.color }}>{subject.icon}</span><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em]" style={{ color: subject.color }}>Your notebook</p><h2 className="display-serif text-[32px] font-bold leading-none text-[#244238]">{subject.name}</h2><p className="mt-2 text-xs text-[#65746C]">Next up: {subject.next}</p></div></div>
      <div className="w-full max-w-[170px]"><div className="mb-2 flex justify-between text-xs font-bold text-[#65746C]"><span>Progress</span><span>{subject.progress}%</span></div><ProgressBar value={subject.progress} color={subject.color} /></div>
    </div>
    <div className="mb-6 flex gap-2 overflow-x-auto pb-1">{tabs.map((item) => <button type="button" key={item} onClick={() => { setTab(item); setSelectedItem(null); }} className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-bold transition ${tab === item ? 'bg-[#244238] text-[#FFF9E9]' : 'border border-[#E5DCCF] bg-[#FFFDF7] text-[#718077] hover:border-[#B9CFC3]'}`} data-testid={`button-subject-tab-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div>
    <div className="grid gap-4 lg:grid-cols-[1.5fr_.75fr]">
      <section className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-5 sm:p-7">
        <SectionHeading title={tab} action={<span className="text-xs text-[#8A958C]">{(content[contentKey[tab]] as unknown[]).length} sample items</span>} />
        {tab === 'Chapters' ? <div className="space-y-3">{content.chapters.map((chapter, index) => <Link key={chapter.title} href={`/subject/${subject.id}/chapter/${slugifyLabel(chapter.title)}`} className="flex w-full items-center gap-4 rounded-xl border border-[#EEE5D7] bg-[#FFFDF7] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#B9CFC3] hover:shadow-sm focus-ring" data-testid={`link-chapter-${slugifyLabel(chapter.title)}`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold" style={{ backgroundColor: index === 0 ? subject.tint : '#F6F0E5', color: subject.color }}>{String(index + 1).padStart(2, '0')}</span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-[#244238]">{chapter.title}</span><span className="mt-1 block text-xs leading-5 text-[#8A958C]">{chapter.detail}</span></span><ChevronRight size={16} className="shrink-0 text-[#B3B7AF]" /></Link>)}</div> : renderItemList()}
        {selectedItem && <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#CFE1D5] bg-[#EAF5ED] p-4 text-xs font-bold text-[#42725A]" data-testid="status-subject-item-selected"><Check size={16} /> Opened “{selectedItem}” in this sample notebook.</div>}
      </section>
      <aside className="h-fit rounded-2xl border border-[#E9DFCF] bg-[#F7F0E0] p-5 sm:p-6"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#B27745]">Little note</p><h3 className="display-serif mt-2 text-[23px] font-bold text-[#244238]">Progress is a practice.</h3><p className="mt-3 text-sm leading-6 text-[#6C766D]">Reviewing mistakes is not a setback. It is how Aanya's notebook gets stronger.</p><Link href="/practice" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#D28658]" data-testid="link-subject-practice">Practice this subject <ArrowRight size={14} /></Link></aside>
    </div>
  </div></Shell>;
}

type ChapterPhotoPreview = StoredStudyPhoto & { previewUrl: string };

function formatPhotoDate(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(timestamp);
}

function ChapterPhotoUploads({ chapterKey, openRequest }: { chapterKey: string; openRequest: number }) {
  const [photos, setPhotos] = useState<ChapterPhotoPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(openRequest > 0);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);
    listChapterPhotos(chapterKey)
      .then((records) => {
        const previews = records.map((photo) => ({ ...photo, previewUrl: URL.createObjectURL(photo.blob) }));
        if (active) {
          setPhotos(previews);
        } else {
          previews.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
        }
      })
      .catch(() => {
        if (active) setError('Photos could not be loaded from this device.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [chapterKey]);

  useEffect(() => {
    if (openRequest > 0) setIsOpen(true);
  }, [openRequest]);

  useEffect(() => () => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
  }, [photos]);

  const handleFiles = async (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []).filter((file) => file.type.startsWith('image/'));
    if (files.length === 0) {
      setError('Choose an image from the gallery or camera.');
      return;
    }

    setIsSaving(true);
    setError(null);
    setFeedback(null);
    try {
      for (const file of files) {
        await saveChapterPhoto(chapterKey, file);
      }
      const records = await listChapterPhotos(chapterKey);
      setPhotos(records.map((photo) => ({ ...photo, previewUrl: URL.createObjectURL(photo.blob) })));
      setFeedback(`${files.length} photo${files.length === 1 ? '' : 's'} added to this chapter.`);
      setIsOpen(false);
    } catch {
      setError('The photo could not be saved. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const removePhoto = async (photoId: string) => {
    try {
      await deleteChapterPhoto(photoId);
      setPhotos((current) => current.filter((photo) => photo.id !== photoId));
      setFeedback('Photo deleted from this chapter.');
    } catch {
      setError('The photo could not be deleted. Please try again.');
    }
  };

  return <section className="rounded-2xl border border-[#DCE8DE] bg-[#F3F8F1] p-4 sm:p-5" data-testid="chapter-photo-storage">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#5A7F72]">Your chapter photos</p><p className="mt-1 text-xs leading-5 text-[#718077]">Saved on this device for this subject and chapter only.</p></div>
      <button type="button" onClick={() => setIsOpen((current) => !current)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#244238] px-4 text-xs font-bold text-[#FFF9E9] transition hover:bg-[#31584b] focus-ring" data-testid="button-open-chapter-photo-upload"><ImagePlus size={16} /> {isOpen ? 'Close upload' : 'Add Study Photo'}</button>
    </div>
    {isOpen && <div className="mt-4 rounded-xl border border-dashed border-[#B9CFC3] bg-white/60 p-3"><div className="grid gap-2 sm:grid-cols-2">
      <label className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#DCCFBD] bg-[#FFFDF7] px-3 text-xs font-bold text-[#244238] transition hover:border-[#5A7F72] ${isSaving ? 'pointer-events-none opacity-60' : ''}`}><Camera size={16} className="text-[#D28658]" /> Take a photo<input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(event) => { void handleFiles(event.target.files); event.currentTarget.value = ''; }} disabled={isSaving} data-testid="input-chapter-photo-camera" /></label>
      <label className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#DCCFBD] bg-[#FFFDF7] px-3 text-xs font-bold text-[#244238] transition hover:border-[#5A7F72] ${isSaving ? 'pointer-events-none opacity-60' : ''}`}><ImagePlus size={16} className="text-[#5A7F72]" /> Choose from gallery<input type="file" accept="image/*" multiple className="sr-only" onChange={(event) => { void handleFiles(event.target.files); event.currentTarget.value = ''; }} disabled={isSaving} data-testid="input-chapter-photo-gallery" /></label>
    </div><p className="mt-3 text-center text-[11px] text-[#89938C]">{isSaving ? 'Saving your photo…' : 'You can add one or more clear photos.'}</p></div>}
    {error && <p className="mt-3 rounded-lg bg-[#FBE9DF] px-3 py-2 text-xs font-bold text-[#A4624D]" role="alert" data-testid="status-chapter-photo-error">{error}</p>}
    {feedback && !error && <p className="mt-3 rounded-lg bg-[#EAF5ED] px-3 py-2 text-xs font-bold text-[#42725A]" data-testid="status-chapter-photo">{feedback}</p>}
    {isLoading ? <p className="mt-4 text-xs text-[#89938C]">Loading saved photos…</p> : photos.length > 0 ? <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">{photos.map((photo) => <article key={photo.id} className="overflow-hidden rounded-xl border border-[#DCE8DE] bg-[#FFFDF7]" data-testid={`chapter-uploaded-photo-${photo.id}`}><img src={photo.previewUrl} alt={photo.fileName} className="aspect-square w-full object-cover" /><div className="p-3"><p className="truncate text-xs font-bold text-[#244238]">{photo.fileName}</p><p className="mt-1 text-[10px] text-[#89938C]">Uploaded {formatPhotoDate(photo.createdAt)}</p><button type="button" onClick={() => { void removePhoto(photo.id); }} className="mt-3 inline-flex min-h-9 w-full items-center justify-center gap-1 rounded-lg border border-[#E5CFC4] text-[11px] font-bold text-[#A4624D] transition hover:bg-[#FBE9DF] focus-ring" data-testid={`button-delete-chapter-photo-${photo.id}`}><Trash2 size={13} /> Delete</button></div></article>)}</div> : <p className="mt-4 rounded-lg border border-dashed border-[#C9D9CF] px-3 py-3 text-center text-xs text-[#89938C]">No photos uploaded for this chapter yet.</p>}
  </section>;
}

function ChapterPage() {
  const [, params] = useRoute('/subject/:subjectId/chapter/:chapterId');
  const subject = subjects.find((item) => item.id === params?.subjectId) || subjects[0];
  const subjectContent = getSubjectContent(subject);
  const chapter = subjectContent.chapters.find((item) => slugifyLabel(item.title) === params?.chapterId) || subjectContent.chapters[0];
  const chapterContent = getChapterContent(chapter.title);
  const isMultiplicationChapter = subject.id === 'math' && chapter.title === 'Multiplication';
  const chapterKey = `${subject.id}/${slugifyLabel(chapter.title)}`;
  const tabs = ['Study Notes', 'Study Photos', 'Questions', 'Answers', 'Test', 'Results', 'Mistakes'];
  const contentKey: Record<string, keyof typeof chapterContent> = {
    'Study Notes': 'notes',
    'Study Photos': 'photos',
    Questions: 'questions',
    Answers: 'answers',
    Test: 'tests',
    Results: 'results',
    Mistakes: 'mistakes',
  };
  const [tab, setTab] = useState('Study Notes');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [questionAnswers, setQuestionAnswers] = useState<Record<number, string>>({});
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [testResult, setTestResult] = useState<{ score: number; incorrect: MultiplicationTestItem[] } | null>(null);
  const [genericChapterResult, setGenericChapterResult] = useState<{ score: number; incorrect: GenericTestQuestion[] } | null>(null);
  const [photoUploadRequest, setPhotoUploadRequest] = useState(0);
  const items = chapterContent[contentKey[tab]];

  const requestPhotoUpload = () => {
    setTab('Study Photos');
    setSelectedItem(null);
    setPhotoUploadRequest((current) => current + 1);
  };

  const chooseQuestionAnswer = (id: number, answer: string) => {
    setQuestionAnswers((current) => ({ ...current, [id]: answer }));
    setSelectedItem(`Question ${id}`);
  };

  const chooseTestAnswer = (id: number, answer: string) => {
    setTestAnswers((current) => ({ ...current, [id]: answer }));
  };

  const submitMultiplicationTest = () => {
    const incorrect = multiplicationContent.test.filter((item) => {
      const response = normalizeAnswer(testAnswers[item.id] ?? '');
      const accepted = [item.answer, ...(item.acceptedAnswers ?? [])].map(normalizeAnswer);
      return !accepted.includes(response);
    });
    setTestResult({ score: multiplicationContent.test.length - incorrect.length, incorrect });
    setTab('Results');
    setSelectedItem(null);
  };

  const renderSelectableCard = (title: string, detail: string, index: number, testId: string) => (
    <button type="button" key={`${title}-${index}`} onClick={() => setSelectedItem(title)} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-[#B9CFC3] hover:shadow-sm focus-ring ${selectedItem === title ? 'border-[#8EB59E] bg-[#F3F8F1]' : 'border-[#EEE5D7] bg-[#FFFDF7]'}`} data-testid={testId}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E0F0F4] text-xs font-bold text-[#3E7891]">{String(index + 1).padStart(2, '0')}</span>
      <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-[#244238]">{title}</span><span className="mt-1 block text-xs leading-5 text-[#8A958C]">{detail}</span></span>
      <ChevronRight size={16} className="shrink-0 text-[#B3B7AF]" />
    </button>
  );

  const renderMultiplicationSection = () => {
    if (tab === 'Study Notes') {
      return <div className="space-y-3">{multiplicationContent.notes.map((item, index) => renderSelectableCard(item.title, item.detail, index, `button-multiplication-note-${index}`))}</div>;
    }

    if (tab === 'Study Photos') {
      return <div><ChapterPhotoUploads chapterKey={chapterKey} openRequest={photoUploadRequest} /><div className="mt-5 grid gap-3 sm:grid-cols-2">{multiplicationContent.worksheets.map((item, index) => <button type="button" key={item.title} onClick={() => setSelectedItem(item.title)} className={`rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-[#B9CFC3] hover:shadow-sm focus-ring ${selectedItem === item.title ? 'border-[#8EB59E] bg-[#F3F8F1]' : 'border-[#EEE5D7] bg-[#FFFDF7]'}`} data-testid={`button-multiplication-worksheet-${index}`}><span className="block text-sm font-bold text-[#244238]">{item.title}</span><span className="mt-1 block text-xs leading-5 text-[#8A958C]">{item.detail}</span><span className="mt-4 block rounded-lg bg-[#F7F0E0] p-3 font-mono text-[11px] leading-5 text-[#6C766D]">{item.preview}</span><span className="mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#D28658]">Open worksheet <ArrowRight size={12} /></span></button>)}</div></div>;
    }

    if (tab === 'Questions') {
      return <div className="space-y-4">{multiplicationContent.questions.map((item) => <article key={item.id} className="rounded-2xl border border-[#EEE5D7] bg-[#FFFDF7] p-4 sm:p-5" data-testid={`multiplication-question-${item.id}`}><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E0F0F4] text-xs font-bold text-[#3E7891]">{item.id}</span><h3 className="text-sm font-bold leading-5 text-[#244238]">{item.question}</h3></div><div className="mt-4 grid grid-cols-4 gap-2">{item.options.map((option, optionIndex) => { const letter = String.fromCharCode(65 + optionIndex); const selected = questionAnswers[item.id] === option; return <button type="button" key={option} onClick={() => chooseQuestionAnswer(item.id, option)} className={`min-h-11 min-w-0 rounded-lg border px-1 text-[11px] font-bold transition sm:px-2 sm:text-xs ${selected ? 'border-[#5A7F72] bg-[#E3F0E9] text-[#244238]' : 'border-[#E3D8C8] bg-[#FFFDF7] text-[#718077] hover:border-[#8EB59E]'}`} data-testid={`button-multiplication-question-${item.id}-${letter}`}>{letter}. {option}</button>; })}</div><div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-[#DCCFBD] bg-[#FAF6ED] px-3 py-2 text-xs"><span className="font-bold text-[#B27745]">Answer Box</span><span className="text-[#718077]">{questionAnswers[item.id] ? `${String.fromCharCode(65 + item.options.indexOf(questionAnswers[item.id] as never))}. ${questionAnswers[item.id]}` : 'Choose an option above'}</span></div></article>)}</div>;
    }

    if (tab === 'Answers') {
      return <div className="space-y-3">{multiplicationContent.questions.map((item, index) => <button type="button" key={item.id} onClick={() => setSelectedItem(`Answer ${item.id}`)} className={`w-full rounded-xl border p-4 text-left transition hover:border-[#B9CFC3] focus-ring ${selectedItem === `Answer ${item.id}` ? 'border-[#8EB59E] bg-[#F3F8F1]' : 'border-[#EEE5D7] bg-[#FFFDF7]'}`} data-testid={`button-multiplication-answer-${item.id}`}><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF5ED] text-xs font-bold text-[#42725A]">{item.id}</span><span><span className="block text-sm font-bold text-[#244238]">{item.question}</span><span className="mt-2 block text-sm font-bold text-[#5A7F72]">Correct answer: {item.answer}</span><span className="mt-1 block text-xs leading-5 text-[#8A958C]">{item.explanation}</span></span></div></button>)}</div>;
    }

    if (tab === 'Test') {
      return <div><div className="mb-5 rounded-xl bg-[#F7F0E0] p-4 text-xs leading-5 text-[#6C766D]">20 questions · 1 mark each · Includes MCQs, fill in the blanks, and word problems. Complete as many as you can, then submit to see your result.</div><div className="space-y-4">{multiplicationContent.test.map((item) => <article key={item.id} className="rounded-2xl border border-[#EEE5D7] bg-[#FFFDF7] p-4 sm:p-5" data-testid={`multiplication-test-question-${item.id}`}><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E0F0F4] text-xs font-bold text-[#3E7891]">{item.id}</span><div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#B27745]">{item.kind === 'mcq' ? 'MCQ' : item.kind === 'fill' ? 'Fill in the blank' : 'Word problem'}</p><h3 className="mt-1 text-sm font-bold leading-5 text-[#244238]">{item.question}</h3></div></div>{item.kind === 'mcq' && item.options ? <div className="mt-4 grid grid-cols-4 gap-2">{item.options.map((option, optionIndex) => { const letter = String.fromCharCode(65 + optionIndex); const selected = testAnswers[item.id] === option; return <button type="button" key={option} onClick={() => chooseTestAnswer(item.id, option)} className={`min-h-11 min-w-0 rounded-lg border px-1 text-[11px] font-bold transition sm:px-2 sm:text-xs ${selected ? 'border-[#5A7F72] bg-[#E3F0E9] text-[#244238]' : 'border-[#E3D8C8] text-[#718077] hover:border-[#8EB59E]'}`} data-testid={`button-multiplication-test-${item.id}-${letter}`}>{letter}. {option}</button>; })}</div> : <input value={testAnswers[item.id] ?? ''} onChange={(event) => chooseTestAnswer(item.id, event.target.value)} placeholder="Type your answer" className="mt-4 min-h-11 w-full rounded-lg border border-[#E3D8C8] bg-[#FFFDF7] px-3 text-sm text-[#244238] outline-none focus:border-[#5A7F72]" data-testid={`input-multiplication-test-${item.id}`} />}</article>)}</div><button type="button" onClick={submitMultiplicationTest} className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#244238] text-sm font-bold text-[#FFF9E9] transition hover:bg-[#31584b] focus-ring" data-testid="button-submit-multiplication-test"><Check size={17} /> Submit 20-question test</button></div>;
    }

    if (tab === 'Results') {
      const score = testResult?.score ?? 0;
      const incorrectCount = testResult?.incorrect.length ?? 0;
      const percentage = testResult ? Math.round((score / multiplicationContent.test.length) * 100) : 0;
      return <div className="space-y-4">{testResult ? <><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat label="Score" value={`${score}`} note="marks earned" color="#E3F0E9" /><Stat label="Total marks" value={`${multiplicationContent.test.length}`} note="one mark each" color="#E0F0F4" /><Stat label="Percentage" value={`${percentage}%`} note="chapter test" color="#FFF2D9" /><Stat label="Correct / wrong" value={`${score} / ${incorrectCount}`} note="answers" color="#FBE9DF" /></div><div className="rounded-xl border border-[#CFE1D5] bg-[#EAF5ED] p-4 text-sm font-bold text-[#42725A]">Your result is ready. Open Mistakes to review every incorrect answer with an explanation.</div><button type="button" onClick={() => { setTestAnswers({}); setTestResult(null); setTab('Test'); setSelectedItem(null); }} className="min-h-11 rounded-xl border border-[#DCCFBD] px-4 text-xs font-bold text-[#718077] transition hover:border-[#5A7F72] hover:text-[#244238]" data-testid="button-retake-multiplication-test">Retake test</button></> : <><div className="rounded-xl bg-[#F7F0E0] p-5"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#B27745]">Ready when you are</p><p className="mt-2 text-sm leading-6 text-[#6C766D]">Submit the 20-question test to see score, total marks, percentage, and correct/incorrect count here.</p></div>{renderSelectableCard(multiplicationContent.previousResult.title, multiplicationContent.previousResult.detail, 0, 'button-multiplication-previous-result')}</>}</div>;
    }

    return <div className="space-y-3">{testResult ? testResult.incorrect.length > 0 ? testResult.incorrect.map((item, index) => <button type="button" key={item.id} onClick={() => setSelectedItem(`Mistake ${item.id}`)} className={`w-full rounded-xl border p-4 text-left transition hover:border-[#B9CFC3] focus-ring ${selectedItem === `Mistake ${item.id}` ? 'border-[#8EB59E] bg-[#F3F8F1]' : 'border-[#EEE5D7] bg-[#FFFDF7]'}`} data-testid={`button-multiplication-mistake-${item.id}`}><div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FBE9DF] text-xs font-bold text-[#A4624D]">{index + 1}</span><span><span className="block text-sm font-bold text-[#244238]">{item.question}</span><span className="mt-2 block text-xs text-[#A4624D]">Your answer: {testAnswers[item.id] || 'No answer'}</span><span className="mt-1 block text-sm font-bold text-[#5A7F72]">Correct answer: {item.answer}</span><span className="mt-1 block text-xs leading-5 text-[#8A958C]">{item.explanation}</span></span></div></button>) : <div className="rounded-xl border border-[#CFE1D5] bg-[#EAF5ED] p-5 text-center text-sm font-bold text-[#42725A]">Wonderful work. There are no mistakes to review.</div> : multiplicationContent.mistakes.map((item, index) => renderSelectableCard(item.title, item.detail, index, `button-multiplication-common-mistake-${index}`))}</div>;
  };

  const renderGenericChapterTest = () => {
    const chapterQuestions = (genericTestQuestions[subject.name] ?? []).slice(0, 20);

    if (tab === 'Test') {
      return (
        <div>
          <div className="mb-5 rounded-xl bg-[#F7F0E0] p-4 text-xs leading-5 text-[#6C766D]">
            20 questions · 1 mark each · Choose the best answer for this subject test.
          </div>
          <div className="space-y-4">
            {chapterQuestions.map((item, index) => (
              <article key={index} className="rounded-2xl border border-[#EEE5D7] bg-[#FFFDF7] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E0F0F4] text-xs font-bold text-[#3E7891]">{index + 1}</span>
                  <h3 className="text-sm font-bold leading-5 text-[#244238]">{item.question}</h3>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {item.options.map((option, optionIndex) => {
                    const letter = String.fromCharCode(65 + optionIndex);
                    const selected = testAnswers[index] === option;
                    return (
                      <button
                        type="button"
                        key={option}
                        onClick={() => chooseTestAnswer(index, option)}
                        className={`min-h-11 rounded-lg border px-3 text-left text-xs font-bold transition ${selected ? 'border-[#5A7F72] bg-[#E3F0E9] text-[#244238]' : 'border-[#E3D8C8] bg-[#FFFDF7] text-[#718077] hover:border-[#8EB59E]'}`}
                      >
                        {letter}. {option}
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              const incorrect = chapterQuestions.filter((item, index) => testAnswers[index] !== item.answer);
              setGenericChapterResult({ score: chapterQuestions.length - incorrect.length, incorrect });
              setTab('Results');
              setSelectedItem(null);
            }}
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#244238] text-sm font-bold text-[#FFF9E9]"
          >
            <Check size={17} /> Submit 20-question test
          </button>
        </div>
      );
    }

    if (tab === 'Results') {
      const score = genericChapterResult?.score ?? 0;
      const wrong = genericChapterResult?.incorrect.length ?? 0;
      const percentage = genericChapterResult ? Math.round((score / chapterQuestions.length) * 100) : 0;
      return genericChapterResult ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Score" value={`${score}`} note="correct" color="#E3F0E9" />
            <Stat label="Total" value={`${chapterQuestions.length}`} note="questions" color="#E0F0F4" />
            <Stat label="Percentage" value={`${percentage}%`} note="result" color="#FFF2D9" />
            <Stat label="Wrong" value={`${wrong}`} note="answers" color="#FBE9DF" />
          </div>
          <div className="rounded-xl border border-[#CFE1D5] bg-[#EAF5ED] p-4 text-sm font-bold text-[#42725A]">
            Test complete! Open Mistakes to review the questions you missed.
          </div>
          <button
            type="button"
            onClick={() => { setTestAnswers({}); setGenericChapterResult(null); setTab('Test'); setSelectedItem(null); }}
            className="min-h-11 rounded-xl border border-[#DCCFBD] px-4 text-xs font-bold text-[#718077]"
          >
            Retake test
          </button>
        </div>
      ) : (
        <div className="rounded-xl bg-[#F7F0E0] p-5 text-sm leading-6 text-[#6C766D]">
          Complete the 20-question test to see your score here.
        </div>
      );
    }

    const mistakes = genericChapterResult?.incorrect ?? [];
    return mistakes.length > 0 ? (
      <div className="space-y-3">
        {mistakes.map((item, index) => (
          <div key={index} className="rounded-xl border border-[#E9D0C7] bg-[#FBE9DF] p-4">
            <p className="text-sm font-bold text-[#244238]">{index + 1}. {item.question}</p>
            <p className="mt-2 text-xs text-[#A4624D]">Your answer: {testAnswers[chapterQuestions.indexOf(item)] || 'Not answered'}</p>
            <p className="mt-1 text-xs font-bold text-[#5A7F72]">Correct answer: {item.answer}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="rounded-xl border border-[#CFE1D5] bg-[#EAF5ED] p-5 text-center text-sm font-bold text-[#42725A]">
        {genericChapterResult ? 'Wonderful work. There are no mistakes to review.' : 'Complete the test to see mistakes here.'}
      </div>
    );
  };

  const renderGenericItems = () => <div className="space-y-3">{items.map((item, index) => <button type="button" key={`${item.title}-${index}`} onClick={() => setSelectedItem(item.title)} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-[#B9CFC3] hover:shadow-sm focus-ring ${selectedItem === item.title ? 'border-[#8EB59E] bg-[#F3F8F1]' : 'border-[#EEE5D7] bg-[#FFFDF7]'}`} data-testid={`button-chapter-item-${tab.toLowerCase().replaceAll(' ', '-')}-${index}`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold" style={{ backgroundColor: index === 0 ? subject.tint : '#F6F0E5', color: subject.color }}>{String(index + 1).padStart(2, '0')}</span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-[#244238]">{item.title}</span><span className="mt-1 block text-xs leading-5 text-[#8A958C]">{item.detail}</span></span><ChevronRight size={16} className="shrink-0 text-[#B3B7AF]" /></button>)}</div>;

  return <Shell><div className="animate-rise-in">
    <Link href={`/subject/${subject.id}`} className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-[#7C8980] hover:text-[#244238] focus-ring" data-testid="link-back-subject"><ArrowLeft size={15} /> Back to {subject.name}</Link>
    <div className="mb-7 flex flex-col justify-between gap-5 rounded-[24px] p-6 sm:flex-row sm:items-center sm:p-8" style={{ backgroundColor: subject.tint }}>
      <div className="flex items-center gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-2xl font-bold" style={{ color: subject.color }}>{subject.icon}</span><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em]" style={{ color: subject.color }}>Chapter detail</p><h2 className="display-serif text-[32px] font-bold leading-none text-[#244238]">{chapter.title}</h2><p className="mt-2 text-xs text-[#65746C]">{subject.name} · Class 3</p></div></div>
      <Link href={`/subject/${subject.id}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-white/70 px-4 text-xs font-bold text-[#244238] transition hover:bg-white focus-ring" data-testid="link-all-subject-sections">All {subject.name} sections <ArrowRight size={14} /></Link>
    </div>
    <div className="mb-6 flex gap-2 overflow-x-auto pb-1">{tabs.map((item) => <button type="button" key={item} onClick={() => { setTab(item); setSelectedItem(null); }} className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-bold transition ${tab === item ? 'bg-[#244238] text-[#FFF9E9]' : 'border border-[#E5DCCF] bg-[#FFFDF7] text-[#718077] hover:border-[#B9CFC3]'}`} data-testid={`button-chapter-tab-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div>
    <section className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-5 sm:p-7">
      <SectionHeading title={tab} action={<div className="flex flex-wrap items-center justify-end gap-2"><span className="hidden text-xs text-[#8A958C] sm:inline">{isMultiplicationChapter ? tab === 'Questions' || tab === 'Test' ? 20 : tab === 'Study Notes' ? multiplicationContent.notes.length : tab === 'Study Photos' ? multiplicationContent.worksheets.length : tab === 'Answers' ? multiplicationContent.questions.length : tab === 'Mistakes' ? testResult ? testResult.incorrect.length : multiplicationContent.mistakes.length : 1 : tab === 'Test' ? 20 : tab === 'Results' ? genericChapterResult ? 1 : 0 : tab === 'Mistakes' ? genericChapterResult ? genericChapterResult.incorrect.length : 0 : items.length} {isMultiplicationChapter && tab === 'Mistakes' && testResult ? 'to review' : 'sample items'}</span><button type="button" onClick={requestPhotoUpload} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-[#E8A35F] px-3 text-[11px] font-bold text-[#FFF9E9] transition hover:bg-[#D98255] focus-ring" data-testid="button-upload-photo"><ImagePlus size={14} /> Upload Photo</button></div>} />
      {isMultiplicationChapter ? renderMultiplicationSection() : tab === 'Test' || tab === 'Results' || tab === 'Mistakes' ? renderGenericChapterTest() : tab === 'Study Photos' ? <div><ChapterPhotoUploads chapterKey={chapterKey} openRequest={photoUploadRequest} /><div className="mt-5">{renderGenericItems()}</div></div> : renderGenericItems()}
      {selectedItem && !isMultiplicationChapter && <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#CFE1D5] bg-[#EAF5ED] p-4 text-xs font-bold text-[#42725A]" data-testid="status-chapter-item-selected"><Check size={16} /> Opened “{selectedItem}” in this chapter.</div>}
    </section>
  </div></Shell>;
}
function slugifyLabel(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKC')
    .replace(/&/g, 'and')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/(^-|-$)/g, '');
}
function PracticePage() {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [done, setDone] = useState<number[]>([]);
  const item = practiceItems[current];
  const markDone = () => { if (!done.includes(current)) setDone([...done, current]); setShowAnswer(false); if (current < practiceItems.length - 1) setCurrent(current + 1); };
  return <Shell><div className="mx-auto max-w-[850px] animate-rise-in"><div className="mb-8 flex items-end justify-between"><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#D28658]">A little every day</p><h2 className="display-serif text-[34px] font-bold tracking-[-.04em] text-[#244238]">Daily Practice</h2><p className="mt-2 text-sm text-[#89938C]">Three friendly questions for a brighter brain.</p></div><span className="rounded-full bg-[#F7E9CC] px-3 py-2 text-xs font-bold text-[#816C42]">{done.length} / {practiceItems.length} done</span></div><div className="mb-7 flex gap-2">{practiceItems.map((_, index) => <div key={index} className={`h-1.5 flex-1 rounded-full ${done.includes(index) ? 'bg-[#5A7F72]' : index === current ? 'bg-[#E8A35F]' : 'bg-[#E6DDCE]'}`} />)}</div><section className="overflow-hidden rounded-[25px] border border-[#E9DFCF] bg-[#FFFDF7] shadow-sm"><div className="p-6 sm:p-10" style={{ backgroundColor: item.color }}><div className="mb-10 flex items-center justify-between"><span className="rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em]" style={{ color: item.accent }}>{item.subject}</span><span className="text-xs font-bold" style={{ color: item.accent }}>Question {current + 1}</span></div><h3 className="display-serif max-w-[650px] text-[31px] font-bold leading-tight text-[#244238] sm:text-[42px]">{item.question}</h3><div className="mt-10 rounded-2xl border border-white/70 bg-white/50 p-4 text-sm text-[#65746C]">Think quietly, then check your answer when you are ready.</div></div><div className="p-6 sm:p-8">{showAnswer ? <div className="rounded-2xl border border-[#CFE1D5] bg-[#EAF5ED] p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#5A7F72]">Answer</p><p className="mt-2 display-serif text-2xl font-bold text-[#244238]">{item.answer}</p></div> : <button onClick={() => setShowAnswer(true)} className="w-full rounded-xl border-2 border-dashed border-[#DCCFBD] p-5 text-sm font-bold text-[#7C8980] transition hover:border-[#5A7F72] hover:text-[#244238]" data-testid="button-show-answer">Show answer</button>}<div className="mt-6 flex justify-end">{showAnswer && <button onClick={markDone} className="flex min-h-11 items-center gap-2 rounded-xl bg-[#244238] px-5 text-sm font-bold text-[#FFF9E9] transition hover:bg-[#31584b]" data-testid="button-next-practice">{current === practiceItems.length - 1 ? 'Finish practice' : 'Next question'} <ArrowRight size={16} /></button>}</div></div></section></div></Shell>;
}

type GenericTestQuestion = {
  question: string;
  options: string[];
  answer: string;
};

const genericTestQuestions: Record<string, GenericTestQuestion[]> = {
  'English First': [
    { question: 'Find the noun: The little bird sings.', options: ['bird', 'sings', 'little', 'the'], answer: 'bird' },
    { question: 'Choose the pronoun: Ravi is happy because ___ won the game.', options: ['he', 'she', 'it', 'they'], answer: 'he' },
    { question: 'Which word is an action word?', options: ['run', 'school', 'blue', 'pencil'], answer: 'run' },
    { question: 'Which word names a person?', options: ['teacher', 'quickly', 'happy', 'jump'], answer: 'teacher' },
    { question: 'Which word describes a flower?', options: ['beautiful', 'flower', 'garden', 'grow'], answer: 'beautiful' },
    { question: 'Which is a naming word?', options: ['school', 'quickly', 'run', 'happy'], answer: 'school' },
    { question: 'Choose the pronoun: ___ are going to the park.', options: ['They', 'Book', 'Run', 'Blue'], answer: 'They' },
    { question: 'Which word is a verb?', options: ['jump', 'ball', 'green', 'teacher'], answer: 'jump' },
    { question: 'Which word tells us more about a noun?', options: ['small', 'run', 'school', 'and'], answer: 'small' },
    { question: 'Choose the noun: The cat drinks milk.', options: ['cat', 'drinks', 'quickly', 'and'], answer: 'cat' },
    { question: 'Which word is a pronoun?', options: ['she', 'table', 'sing', 'yellow'], answer: 'she' },
    { question: 'Which word shows an action?', options: ['write', 'pencil', 'book', 'red'], answer: 'write' },
    { question: 'Which is a describing word?', options: ['bright', 'jump', 'school', 'they'], answer: 'bright' },
    { question: 'Choose the noun: The dog runs fast.', options: ['dog', 'runs', 'fast', 'the'], answer: 'dog' },
    { question: 'Choose the pronoun: Meena is kind. ___ helps everyone.', options: ['She', 'He', 'It', 'They'], answer: 'She' },
    { question: 'Which word is an action?', options: ['dance', 'garden', 'pretty', 'pencil'], answer: 'dance' },
    { question: 'Which word describes a house?', options: ['big', 'house', 'live', 'door'], answer: 'big' },
    { question: 'Which is a naming word?', options: ['teacher', 'slowly', 'jump', 'happy'], answer: 'teacher' },
    { question: 'Which word can replace Rohan in a sentence?', options: ['he', 'it', 'they', 'we'], answer: 'he' },
    { question: 'Find the verb: Birds fly in the sky.', options: ['fly', 'birds', 'sky', 'the'], answer: 'fly' },
  ],
  'English Second': [
    { question: 'What does tiny mean?', options: ['Very small', 'Very big', 'Very loud', 'Very fast'], answer: 'Very small' },
    { question: 'A good story has a beginning, middle and ___?', options: ['end', 'number', 'colour', 'shape'], answer: 'end' },
    { question: 'Which mark ends a statement?', options: ['Full stop', 'Comma', 'Question mark', 'Colon'], answer: 'Full stop' },
    { question: 'Who is a character in a story?', options: ['A person or animal in the story', 'A punctuation mark', 'A number', 'A colour'], answer: 'A person or animal in the story' },
    { question: 'What helps us understand a new word in a story?', options: ['Context', 'Clock', 'Shape', 'Number'], answer: 'Context' },
    { question: 'Which mark is used to ask a question?', options: ['Question mark', 'Full stop', 'Comma', 'Hyphen'], answer: 'Question mark' },
    { question: 'Which word is the opposite of hot?', options: ['cold', 'warm', 'bright', 'fast'], answer: 'cold' },
    { question: 'Choose the correct plural of child.', options: ['children', 'childs', 'childes', 'child'], answer: 'children' },
    { question: 'Which word means the same as happy?', options: ['glad', 'sad', 'angry', 'slow'], answer: 'glad' },
    { question: 'Which word is a describing word?', options: ['soft', 'run', 'book', 'they'], answer: 'soft' },
    { question: 'What should a sentence begin with?', options: ['A capital letter', 'A comma', 'A small number', 'A full stop'], answer: 'A capital letter' },
    { question: 'Which mark separates items in a list?', options: ['Comma', 'Question mark', 'Full stop', 'Apostrophe'], answer: 'Comma' },
    { question: 'Choose the correct word: The boys ___ playing.', options: ['are', 'is', 'am', 'be'], answer: 'are' },
    { question: 'What is the opposite of early?', options: ['late', 'quick', 'near', 'small'], answer: 'late' },
    { question: 'Which word means very large?', options: ['huge', 'tiny', 'short', 'thin'], answer: 'huge' },
    { question: 'Choose the correct spelling.', options: ['because', 'becaus', 'becose', 'beacuse'], answer: 'because' },
    { question: 'Which sentence is a question?', options: ['Where are you?', 'I am here.', 'Please sit down.', 'The sun is bright.'], answer: 'Where are you?' },
    { question: 'Which word is a noun?', options: ['garden', 'quickly', 'jump', 'blue'], answer: 'garden' },
    { question: 'Choose the correct word: She ___ a book.', options: ['has', 'have', 'having', 'are'], answer: 'has' },
    { question: 'Which word is an action word?', options: ['read', 'story', 'green', 'teacher'], answer: 'read' },
  ],
  'Hindi First': [
    { question: '“राम बाजार जाता है।” इसमें संज्ञा शब्द कौन-सा है?', options: ['राम', 'जाता', 'है', 'और'], answer: 'राम' },
    { question: '“सीमा ___ लड़की है।” सही शब्द चुनिए।', options: ['एक', 'दो', 'हम', 'वे'], answer: 'एक' },
    { question: '“वह स्कूल जाता है।” में सर्वनाम कौन-सा है?', options: ['वह', 'स्कूल', 'जाता', 'है'], answer: 'वह' },
    { question: 'एक से अधिक वस्तुओं को क्या कहते हैं?', options: ['बहुवचन', 'एकवचन', 'संज्ञा', 'वाक्य'], answer: 'बहुवचन' },
    { question: '“किताब” किसका उदाहरण है?', options: ['संज्ञा', 'सर्वनाम', 'क्रिया', 'विशेषण'], answer: 'संज्ञा' },
    { question: '“सीता खेलती है।” में क्रिया कौन-सी है?', options: ['खेलती', 'सीता', 'है', 'में'], answer: 'खेलती' },
    { question: '“मैं स्कूल जाता हूँ।” में सर्वनाम कौन-सा है?', options: ['मैं', 'स्कूल', 'जाता', 'हूँ'], answer: 'मैं' },
    { question: 'एक वस्तु के लिए कौन-सा शब्द है?', options: ['एकवचन', 'बहुवचन', 'क्रिया', 'विशेषण'], answer: 'एकवचन' },
    { question: '“सुंदर फूल” में विशेषण कौन-सा है?', options: ['सुंदर', 'फूल', 'में', 'और'], answer: 'सुंदर' },
    { question: '“मोहन दौड़ता है।” में संज्ञा कौन-सी है?', options: ['मोहन', 'दौड़ता', 'है', 'और'], answer: 'मोहन' },
    { question: '“वे खेल रहे हैं।” में सर्वनाम कौन-सा है?', options: ['वे', 'खेल', 'रहे', 'हैं'], answer: 'वे' },
    { question: '“गाय घास खाती है।” में क्रिया कौन-सी है?', options: ['खाती', 'गाय', 'घास', 'है'], answer: 'खाती' },
    { question: '“लाल गेंद” में विशेषण कौन-सा है?', options: ['लाल', 'गेंद', 'में', 'और'], answer: 'लाल' },
    { question: '“बच्चे” किस वचन का उदाहरण है?', options: ['बहुवचन', 'एकवचन', 'क्रिया', 'विशेषण'], answer: 'बहुवचन' },
    { question: '“पेड़” किसका उदाहरण है?', options: ['संज्ञा', 'सर्वनाम', 'क्रिया', 'विशेषण'], answer: 'संज्ञा' },
    { question: '“तुम अच्छे हो।” में सर्वनाम कौन-सा है?', options: ['तुम', 'अच्छे', 'हो', 'और'], answer: 'तुम' },
    { question: '“मीठा आम” में विशेषण कौन-सा है?', options: ['मीठा', 'आम', 'में', 'वह'], answer: 'मीठा' },
    { question: '“राम पढ़ता है।” में क्रिया कौन-सी है?', options: ['पढ़ता', 'राम', 'है', 'और'], answer: 'पढ़ता' },
    { question: '“लड़का” किसका उदाहरण है?', options: ['संज्ञा', 'क्रिया', 'सर्वनाम', 'विशेषण'], answer: 'संज्ञा' },
    { question: '“हम घर जाते हैं।” में सर्वनाम कौन-सा है?', options: ['हम', 'घर', 'जाते', 'हैं'], answer: 'हम' },
  ],
  'Hindi Second': [
    { question: 'क__ताब में कौन-सी मात्रा आएगी?', options: ['ि', 'ा', 'ी', 'ु'], answer: 'ि' },
    { question: '२१ के बाद कौन-सी संख्या आती है?', options: ['२२', '२०', '२३', '१९'], answer: '२२' },
    { question: '“नीला” में कौन-सी मात्रा है?', options: ['ी', 'ा', 'ि', 'ु'], answer: 'ा' },
    { question: '१ से १० तक गिनती में ५ के बाद क्या आता है?', options: ['६', '७', '४', '८'], answer: '६' },
    { question: 'चित्र देखकर वाक्य बनाना क्या कहलाता है?', options: ['चित्र वर्णन', 'गिनती', 'मात्रा', 'संज्ञा'], answer: 'चित्र वर्णन' },
    { question: '“किताब” शब्द में कौन-सी मात्रा है?', options: ['ि', 'ा', 'ी', 'ु'], answer: 'ि' },
    { question: '३० के बाद कौन-सी संख्या आती है?', options: ['३१', '२९', '३२', '३०'], answer: '३१' },
    { question: '“फूल” में कौन-सी मात्रा है?', options: ['ू', 'ु', 'ी', 'ा'], answer: 'ू' },
    { question: '१० के पहले कौन-सी संख्या आती है?', options: ['९', '८', '११', '१२'], answer: '९' },
    { question: '“सीता” में कौन-सी मात्रा है?', options: ['ी', 'ि', 'ु', 'ू'], answer: 'ी' },
    { question: '१५ के बाद कौन-सी संख्या आती है?', options: ['१६', '१४', '१७', '१८'], answer: '१६' },
    { question: '“कुर्सी” में कौन-सी मात्रा है?', options: ['ु', 'ू', 'ी', 'ा'], answer: 'ु' },
    { question: '२५ से पहले कौन-सी संख्या आती है?', options: ['२४', '२३', '२६', '२७'], answer: '२४' },
    { question: '“दूध” में कौन-सी मात्रा है?', options: ['ू', 'ु', 'ी', 'ा'], answer: 'ू' },
    { question: '४० के बाद कौन-सी संख्या आती है?', options: ['४१', '३९', '४२', '४५'], answer: '४१' },
    { question: '“नीम” में कौन-सी मात्रा है?', options: ['ी', 'ि', 'ु', 'ू'], answer: 'ी' },
    { question: '७ के बाद कौन-सी संख्या आती है?', options: ['८', '६', '९', '१०'], answer: '८' },
    { question: '“गुलाब” में कौन-सी मात्रा है?', options: ['ु', 'ू', 'ि', 'ी'], answer: 'ु' },
    { question: '५० से पहले कौन-सी संख्या आती है?', options: ['४९', '४८', '५१', '५२'], answer: '४९' },
    { question: '“कुर्सी” शब्द में अंतिम मात्रा कौन-सी है?', options: ['ी', 'ु', 'ा', 'ि'], answer: 'ी' },
  ],
  'Math': [
    { question: 'What is 3 × 8?', options: ['24', '21', '18', '28'], answer: '24' },
    { question: 'How many quarters make one whole?', options: ['4', '2', '3', '5'], answer: '4' },
    { question: 'What is 20 ÷ 5?', options: ['4', '5', '10', '15'], answer: '4' },
    { question: 'How many sides does a hexagon have?', options: ['6', '5', '7', '8'], answer: '6' },
    { question: 'What is half of 10?', options: ['5', '2', '10', '8'], answer: '5' },
    { question: 'What is 6 × 4?', options: ['24', '20', '18', '28'], answer: '24' },
    { question: 'What is 30 ÷ 6?', options: ['5', '6', '4', '3'], answer: '5' },
    { question: 'What is 7 + 8?', options: ['15', '14', '16', '17'], answer: '15' },
    { question: 'What is 18 - 9?', options: ['9', '8', '10', '7'], answer: '9' },
    { question: 'How many sides does a square have?', options: ['4', '3', '5', '6'], answer: '4' },
    { question: 'What is one half of 20?', options: ['10', '5', '15', '20'], answer: '10' },
    { question: 'What is 5 × 5?', options: ['25', '20', '30', '15'], answer: '25' },
    { question: 'What is 36 ÷ 4?', options: ['9', '8', '10', '12'], answer: '9' },
    { question: 'Which number is greatest?', options: ['19', '12', '9', '15'], answer: '19' },
    { question: 'What is 10 + 25?', options: ['35', '30', '45', '25'], answer: '35' },
    { question: 'What is 40 - 17?', options: ['23', '27', '33', '21'], answer: '23' },
    { question: 'How many corners does a triangle have?', options: ['3', '4', '2', '5'], answer: '3' },
    { question: 'What is 9 × 2?', options: ['18', '16', '20', '12'], answer: '18' },
    { question: 'What is 24 ÷ 3?', options: ['8', '6', '9', '7'], answer: '8' },
    { question: 'Which fraction means one whole?', options: ['4/4', '1/4', '2/4', '3/4'], answer: '4/4' },
  ],
  'Math Second': [
    { question: 'What time is half past 4?', options: ['4:30', '4:15', '5:00', '3:30'], answer: '4:30' },
    { question: 'How many ₹5 coins make ₹25?', options: ['5', '4', '6', '10'], answer: '5' },
    { question: 'Which hand shows minutes on a clock?', options: ['Long hand', 'Short hand', 'Both', 'Neither'], answer: 'Long hand' },
    { question: 'How many ₹10 coins make ₹50?', options: ['5', '4', '6', '10'], answer: '5' },
    { question: 'Which is longer?', options: ['1 metre', '1 centimetre', '1 millimetre', 'None'], answer: '1 metre' },
    { question: 'How many minutes are in one hour?', options: ['60', '30', '100', '24'], answer: '60' },
    { question: 'What time is quarter past 3?', options: ['3:15', '3:30', '4:15', '2:45'], answer: '3:15' },
    { question: 'How many ₹2 coins make ₹10?', options: ['5', '4', '6', '2'], answer: '5' },
    { question: 'Which is shorter?', options: ['1 centimetre', '1 metre', '1 kilometre', '10 metres'], answer: '1 centimetre' },
    { question: 'How many days are in one week?', options: ['7', '5', '6', '8'], answer: '7' },
    { question: 'How many paise make one rupee?', options: ['100', '10', '50', '20'], answer: '100' },
    { question: 'What time is 6 o’clock?', options: ['6:00', '6:30', '5:30', '7:00'], answer: '6:00' },
    { question: 'Which unit is used to measure a pencil?', options: ['centimetre', 'kilometre', 'litre', 'kilogram'], answer: 'centimetre' },
    { question: 'How many months are in one year?', options: ['12', '10', '11', '13'], answer: '12' },
    { question: 'How many ₹20 notes make ₹100?', options: ['5', '4', '6', '10'], answer: '5' },
    { question: 'What comes after Monday?', options: ['Tuesday', 'Sunday', 'Friday', 'Saturday'], answer: 'Tuesday' },
    { question: 'Which is heavier?', options: ['1 kilogram', '1 gram', '1 milligram', 'None'], answer: '1 kilogram' },
    { question: 'How many hours are in a day?', options: ['24', '12', '10', '60'], answer: '24' },
    { question: 'What time is quarter to 5?', options: ['4:45', '5:15', '4:15', '5:45'], answer: '4:45' },
    { question: 'How many ₹5 coins make ₹50?', options: ['10', '5', '8', '20'], answer: '10' },
  ],
  'EVS': [
    { question: 'Name one source of clean water.', options: ['River', 'Chair', 'Book', 'Pencil'], answer: 'River' },
    { question: 'Which part of a plant takes in water from soil?', options: ['Roots', 'Flower', 'Fruit', 'Leaf'], answer: 'Roots' },
    { question: 'Which part supports a plant?', options: ['Stem', 'Root', 'Seed', 'Flower'], answer: 'Stem' },
    { question: 'Which is a source of water?', options: ['Lake', 'Table', 'Bag', 'Door'], answer: 'Lake' },
    { question: 'Why should we save water?', options: ['Water is important for life', 'Water is a toy', 'Water is a book', 'Water is a colour'], answer: 'Water is important for life' },
    { question: 'Which part of a plant makes food?', options: ['Leaves', 'Roots', 'Stem', 'Flower'], answer: 'Leaves' },
    { question: 'Which animal gives us milk?', options: ['Cow', 'Tiger', 'Lion', 'Crow'], answer: 'Cow' },
    { question: 'Which sense organ helps us see?', options: ['Eyes', 'Ears', 'Nose', 'Tongue'], answer: 'Eyes' },
    { question: 'Which sense organ helps us hear?', options: ['Ears', 'Eyes', 'Nose', 'Skin'], answer: 'Ears' },
    { question: 'What do plants need to grow?', options: ['Water and sunlight', 'Only stones', 'Only toys', 'Only paper'], answer: 'Water and sunlight' },
    { question: 'Which is a healthy food?', options: ['Fruit', 'Candy', 'Chips', 'Soda'], answer: 'Fruit' },
    { question: 'Why do we wash our hands?', options: ['To remove germs', 'To make them heavy', 'To change their colour', 'To make noise'], answer: 'To remove germs' },
    { question: 'Which animal is a pet?', options: ['Dog', 'Tiger', 'Lion', 'Elephant'], answer: 'Dog' },
    { question: 'Where do fish live?', options: ['Water', 'Trees', 'Desert', 'Sky'], answer: 'Water' },
    { question: 'Which body part helps us smell?', options: ['Nose', 'Eyes', 'Ears', 'Hands'], answer: 'Nose' },
    { question: 'Which season is usually very hot?', options: ['Summer', 'Winter', 'Rainy', 'Autumn'], answer: 'Summer' },
    { question: 'What do we breathe in?', options: ['Air', 'Water', 'Sand', 'Milk'], answer: 'Air' },
    { question: 'Which is a means of transport?', options: ['Bus', 'Table', 'Chair', 'Book'], answer: 'Bus' },
    { question: 'Which animal can fly?', options: ['Bird', 'Cow', 'Dog', 'Fish'], answer: 'Bird' },
    { question: 'What should we do with waste paper?', options: ['Put it in a bin', 'Throw it in a river', 'Leave it on the road', 'Burn it indoors'], answer: 'Put it in a bin' },
  ],
  'GK': [
    { question: 'What is the national animal of India?', options: ['Bengal tiger', 'Lion', 'Elephant', 'Horse'], answer: 'Bengal tiger' },
    { question: 'What is the capital of India?', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Jaipur'], answer: 'New Delhi' },
    { question: 'Which planet do we live on?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 'Earth' },
    { question: 'Which animal is known for having a long trunk?', options: ['Elephant', 'Tiger', 'Rabbit', 'Horse'], answer: 'Elephant' },
    { question: 'What shines in the sky at night?', options: ['Moon', 'Tree', 'River', 'Road'], answer: 'Moon' },
    { question: 'How many days are in a week?', options: ['7', '5', '6', '8'], answer: '7' },
    { question: 'Which is the largest land animal?', options: ['Elephant', 'Cat', 'Dog', 'Rabbit'], answer: 'Elephant' },
    { question: 'Which colour is at the top of the Indian flag?', options: ['Saffron', 'Green', 'Blue', 'White'], answer: 'Saffron' },
    { question: 'How many legs does a spider have?', options: ['8', '6', '4', '10'], answer: '8' },
    { question: 'Which is a bird?', options: ['Parrot', 'Tiger', 'Cow', 'Dog'], answer: 'Parrot' },
    { question: 'Which shape has three sides?', options: ['Triangle', 'Square', 'Circle', 'Rectangle'], answer: 'Triangle' },
    { question: 'How many months are in a year?', options: ['12', '10', '11', '13'], answer: '12' },
    { question: 'Which star is closest to Earth?', options: ['Sun', 'Moon', 'Mars', 'Jupiter'], answer: 'Sun' },
    { question: 'Which animal is called the king of the jungle?', options: ['Lion', 'Horse', 'Goat', 'Rabbit'], answer: 'Lion' },
    { question: 'Which festival is known as the festival of lights?', options: ['Diwali', 'Holi', 'Eid', 'Onam'], answer: 'Diwali' },
    { question: 'Which is a fruit?', options: ['Mango', 'Carrot', 'Potato', 'Spinach'], answer: 'Mango' },
    { question: 'Which day comes after Friday?', options: ['Saturday', 'Thursday', 'Monday', 'Sunday'], answer: 'Saturday' },
    { question: 'How many fingers are on one hand?', options: ['5', '4', '6', '10'], answer: '5' },
    { question: 'Which is the largest ocean?', options: ['Pacific Ocean', 'Indian Ocean', 'Arctic Ocean', 'Atlantic Ocean'], answer: 'Pacific Ocean' },
    { question: 'Which instrument tells time?', options: ['Clock', 'Spoon', 'Pencil', 'Bag'], answer: 'Clock' },
  ],
  'Skill': [
    { question: 'What helps us understand our own strengths and interests?', options: ['Knowing myself', 'Ignoring feelings', 'Avoiding work', 'Skipping practice'], answer: 'Knowing myself' },
    { question: 'Which is a clear way to express an idea?', options: ['Speaking clearly', 'Shouting', 'Staying silent', 'Interrupting'], answer: 'Speaking clearly' },
    { question: 'What should we do before making a decision?', options: ['Think about the choices', 'Guess quickly', 'Copy others', 'Ignore the problem'], answer: 'Think about the choices' },
    { question: 'Which feeling can make us want to smile?', options: ['Happiness', 'Anger', 'Fear', 'Sadness'], answer: 'Happiness' },
    { question: 'What does being responsible mean?', options: ['Doing our duties', 'Blaming others', 'Leaving work unfinished', 'Ignoring rules'], answer: 'Doing our duties' },
    { question: 'Which is a good manner?', options: ['Saying please', 'Pushing others', 'Interrupting', 'Shouting'], answer: 'Saying please' },
    { question: 'What does a good leader do?', options: ['Helps and guides others', 'Orders everyone around', 'Ignores the team', 'Never listens'], answer: 'Helps and guides others' },
    { question: 'Which is a smart online safety habit?', options: ['Keep passwords private', 'Share passwords with strangers', 'Meet online strangers alone', 'Click every link'], answer: 'Keep passwords private' },
    { question: 'What should we do during an emergency?', options: ['Stay calm and follow safety instructions', 'Run without thinking', 'Hide important information', 'Push others'], answer: 'Stay calm and follow safety instructions' },
    { question: 'How can we help protect the Earth?', options: ['Save water and reduce waste', 'Waste water', 'Throw rubbish anywhere', 'Leave lights on'], answer: 'Save water and reduce waste' },
    { question: 'Which action shows self-awareness?', options: ['Knowing what we are good at', 'Copying everyone', 'Ignoring our feelings', 'Avoiding reflection'], answer: 'Knowing what we are good at' },
    { question: 'What should we do when someone is speaking to us?', options: ['Listen carefully', 'Interrupt them', 'Walk away', 'Shout louder'], answer: 'Listen carefully' },
    { question: 'Which is an example of critical thinking?', options: ['Checking facts before believing something', 'Believing every rumour', 'Guessing without thinking', 'Copying an answer'], answer: 'Checking facts before believing something' },
    { question: 'What can help us manage a strong emotion?', options: ['Take a breath and think', 'Hit someone', 'Shout at others', 'Break things'], answer: 'Take a breath and think' },
    { question: 'Which action shows responsibility at home?', options: ['Putting things back after use', 'Leaving a mess', 'Ignoring chores', 'Wasting food'], answer: 'Putting things back after use' },
    { question: 'Why are good manners important?', options: ['They show respect for others', 'They make us louder', 'They help us avoid everyone', 'They make rules disappear'], answer: 'They show respect for others' },
    { question: 'What should a team leader do when a teammate has an idea?', options: ['Listen to the idea', 'Ignore the teammate', 'Laugh at the idea', 'Stop the teammate'], answer: 'Listen to the idea' },
    { question: 'Should we share our home address with an unknown person online?', options: ['No', 'Yes', 'Always', 'Only in a public chat'], answer: 'No' },
    { question: 'What is a useful first step in an emergency?', options: ['Tell a trusted adult', 'Hide and say nothing', 'Touch dangerous objects', 'Panic'], answer: 'Tell a trusted adult' },
    { question: 'Which habit is good for the environment?', options: ['Reuse useful items', 'Throw everything away', 'Waste electricity', 'Leave taps running'], answer: 'Reuse useful items' },
  ],
  'Computer': [
    { question: 'Which device helps us type letters?', options: ['Keyboard', 'Mouse', 'Monitor', 'Speaker'], answer: 'Keyboard' },
    { question: 'Which device helps us point and click?', options: ['Mouse', 'Keyboard', 'Monitor', 'CPU'], answer: 'Mouse' },
    { question: 'Which part shows information?', options: ['Monitor', 'Keyboard', 'Mouse', 'CPU'], answer: 'Monitor' },
    { question: 'Which part does the main computer work?', options: ['CPU', 'Mouse', 'Keyboard', 'Monitor'], answer: 'CPU' },
    { question: 'Why should we take screen breaks?', options: ['To rest our eyes and body', 'To play more', 'To make the screen bigger', 'To turn the keyboard off'], answer: 'To rest our eyes and body' },
    { question: 'Which device prints words on paper?', options: ['Printer', 'Mouse', 'Keyboard', 'Monitor'], answer: 'Printer' },
    { question: 'Which device lets us hear sound?', options: ['Speaker', 'Keyboard', 'Mouse', 'Printer'], answer: 'Speaker' },
    { question: 'Which key creates a space between words?', options: ['Spacebar', 'Enter', 'Shift', 'Backspace'], answer: 'Spacebar' },
    { question: 'Which key removes a letter before the cursor?', options: ['Backspace', 'Spacebar', 'Enter', 'Shift'], answer: 'Backspace' },
    { question: 'What do we use to move the pointer?', options: ['Mouse', 'Printer', 'Speaker', 'Monitor'], answer: 'Mouse' },
    { question: 'Which device shows pictures and text?', options: ['Monitor', 'Keyboard', 'Mouse', 'CPU'], answer: 'Monitor' },
    { question: 'Which part is often called the brain of the computer?', options: ['CPU', 'Mouse', 'Speaker', 'Printer'], answer: 'CPU' },
    { question: 'Which device can store files?', options: ['Hard drive', 'Speaker', 'Mouse', 'Monitor'], answer: 'Hard drive' },
    { question: 'Which key moves the cursor to a new line?', options: ['Enter', 'Spacebar', 'Shift', 'Caps Lock'], answer: 'Enter' },
    { question: 'Which key can make letters capital?', options: ['Caps Lock', 'Spacebar', 'Enter', 'Backspace'], answer: 'Caps Lock' },
    { question: 'Which device is used for video calls?', options: ['Webcam', 'Printer', 'Speaker', 'Keyboard'], answer: 'Webcam' },
    { question: 'What should we do before touching a computer?', options: ['Keep hands clean', 'Use wet hands', 'Eat over it', 'Pull the wires'], answer: 'Keep hands clean' },
    { question: 'Which is an example of computer software?', options: ['Paint', 'Keyboard', 'Mouse', 'Monitor'], answer: 'Paint' },
    { question: 'Which device is used to record sound?', options: ['Microphone', 'Monitor', 'Printer', 'Mouse'], answer: 'Microphone' },
    { question: 'What should we do after using a computer?', options: ['Shut it down properly', 'Pull every cable', 'Hit the monitor', 'Leave food on it'], answer: 'Shut it down properly' },
  ],
};

function CreateTestPage() {
  const [, navigate] = useLocation();
  const [subject, setSubject] = useState('Math');
  const [count, setCount] = useState('5');
  const [note, setNote] = useState('');

  const createTest = () => {
    navigate(`/take-test/${encodeURIComponent(subject)}/${count}`);
  };

  const available = genericTestQuestions[subject]?.length ?? 0;

  return (
    <Shell>
      <div className="mx-auto max-w-[900px] animate-rise-in">
        <SectionHeading eyebrow="Make revision feel simple" title="Create a Test" />

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
                  className="min-h-12 w-full rounded-xl border border-[#E3D8C8] bg-[#FFFDF7] px-4 text-sm text-[#244238]"
                  data-testid="select-test-subject"
                >
                  {subjects.map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#244238]">
                  Number of questions
                </span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {['5', '10', '15', '20'].map((value) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setCount(value)}
                      disabled={Number(value) > available}
                      className={`min-h-12 rounded-xl border text-sm font-bold ${
                        count === value
                          ? 'border-[#5A7F72] bg-[#E3F0E9] text-[#244238]'
                          : 'border-[#E3D8C8] text-[#839089]'
                      } ${Number(value) > available ? 'cursor-not-allowed opacity-40' : ''}`}
                    >
                      {value} questions
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-[#89938C]">
                  This version has {available} questions available for {subject}.
                </p>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#244238]">
                  Test note <span className="font-normal text-[#A1A9A1]">(optional)</span>
                </span>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Revision before Friday"
                  className="min-h-12 w-full rounded-xl border border-[#E3D8C8] bg-[#FFFDF7] px-4 text-sm outline-none"
                  data-testid="input-test-note"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={createTest}
              disabled={!available}
              className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#244238] text-sm font-bold text-[#FFF9E9]"
              data-testid="button-create-test"
            >
              <Plus size={17} /> Start {subject} test
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
              Choose a subject, start the test, answer the questions, and submit to see your score.
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
  const count = Math.min(Math.max(Number(params?.count ?? 5), 1), 20);
  const questions = genericTestQuestions[subject] ?? [];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [retryIndexes, setRetryIndexes] = useState<number[] | null>(null);

  const allTestQuestions = questions.slice(0, count);
  const testQuestions = retryIndexes
    ? retryIndexes.map((index) => allTestQuestions[index]).filter(Boolean)
    : allTestQuestions;

  const score = testQuestions
    .filter((question, index) => answers[index] === question.answer)
    .length;

  if (!questions.length) {
    return (
      <Shell>
        <p className="text-sm font-bold text-[#244238]">No test questions found.</p>
      </Shell>
    );
  }

  if (submitted) {
    const wrong = testQuestions.length - score;
    const percentage = testQuestions.length
      ? Math.round((score / testQuestions.length) * 100)
      : 0;

    return (
      <Shell>
        <div className="mx-auto max-w-[900px] animate-rise-in">
          <SectionHeading eyebrow={subject} title="Test Result" />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Score" value={`${score}`} note="correct" color="#E3F0E9" />
            <Stat label="Total" value={`${testQuestions.length}`} note="questions" color="#E0F0F4" />
            <Stat label="Percentage" value={`${percentage}%`} note="result" color="#FFF2D9" />
            <Stat label="Wrong" value={`${wrong}`} note="answers" color="#FBE9DF" />
          </div>

          <div className="mt-5 rounded-xl border border-[#CFE1D5] bg-[#EAF5ED] p-5 text-sm font-bold text-[#42725A]">
            Test complete! You can review the answers below.
          </div>

          <div className="mt-5 space-y-3">
            {testQuestions.map((question, index) => (
              <div key={index} className="rounded-xl border border-[#EEE5D7] bg-[#FFFDF7] p-4">
                <p className="text-sm font-bold text-[#244238]">
                  {index + 1}. {question.question}
                </p>
                <p className="mt-2 text-xs text-[#A4624D]">
                  Your answer: {answers[index] || 'Not answered'}
                </p>
                <p className="mt-1 text-xs font-bold text-[#5A7F72]">
                  Correct answer: {question.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {wrong > 0 && !retryIndexes && (
              <button
                type="button"
                onClick={() => {
                  const wrongIndexes = allTestQuestions.reduce<number[]>(
                    (indexes, question, index) => {
                      if (answers[index] !== question.answer) indexes.push(index);
                      return indexes;
                    },
                  );
                  setRetryIndexes(wrongIndexes);
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="min-h-11 rounded-xl bg-[#244238] px-5 text-xs font-bold text-[#FFF9E9]"
              >
                Retest wrong questions ({wrong})
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setRetryIndexes(null);
                setAnswers({});
                setSubmitted(false);
              }}
              className="min-h-11 rounded-xl border border-[#DCCFBD] px-5 text-xs font-bold text-[#718077]"
            >
              Retake full test
            </button>
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
          <ArrowLeft size={15} /> Back to Create Test
        </Link>

        <SectionHeading
          eyebrow={retryIndexes ? `${subject} • Wrong Questions` : subject}
          title={`${testQuestions.length}-Question Test`}
        />

        <div className="space-y-4">
          {testQuestions.map((question, index) => (
            <article
              key={index}
              className="rounded-2xl border border-[#EEE5D7] bg-[#FFFDF7] p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E0F0F4] text-xs font-bold text-[#3E7891]">
                  {index + 1}
                </span>
                <h3 className="text-sm font-bold leading-5 text-[#244238]">
                  {question.question}
                </h3>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [index]: option,
                      }))
                    }
                    className={`min-h-11 rounded-lg border px-3 text-left text-xs font-bold ${
                      answers[index] === option
                        ? 'border-[#5A7F72] bg-[#E3F0E9] text-[#244238]'
                        : 'border-[#E3D8C8] text-[#718077]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#244238] text-sm font-bold text-[#FFF9E9]"
        >
          <Check size={17} /> Submit Test
        </button>
      </div>
    </Shell>
  );
}

function UploadPage() {
  const [uploaded, setUploaded] = useState(false);
  return <Shell><div className="mx-auto max-w-[850px] animate-rise-in"><SectionHeading eyebrow="Keep the good bits close" title="Study Photos" /><section className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-6 sm:p-10"><div className="rounded-[22px] border-2 border-dashed border-[#C9D9CF] bg-[#F3F8F1] px-5 py-14 text-center sm:py-20"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E3F0E9] text-[#5A7F72]"><Upload size={26} /></div><h3 className="display-serif mt-5 text-[27px] font-bold text-[#244238]">Bring a page into the notebook</h3><p className="mx-auto mt-2 max-w-[390px] text-sm leading-6 text-[#89938C]">Upload a clear photo of homework, class notes, or a page worth remembering.</p><label className="mt-6 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-[#244238] px-5 text-sm font-bold text-[#FFF9E9] transition hover:bg-[#31584b]"><ImagePlus size={17} /> Choose a photo<input type="file" accept="image/*" className="sr-only" onChange={() => setUploaded(true)} data-testid="input-study-photo" /></label>{uploaded && <p className="mt-4 text-xs font-bold text-[#5A7F72]" data-testid="status-photo-uploaded">Photo added to the study shelf.</p>}</div></section><div className="mt-5 flex items-start gap-3 rounded-xl bg-[#F7F0E0] p-4 text-xs leading-5 text-[#81755F]"><CircleHelp size={16} className="mt-0.5 shrink-0 text-[#D28658]" /> Photos stay on this device in this first version. You can add more whenever you like.</div></div></Shell>;
}

function ResultsPage() {
  return <Shell><div className="animate-rise-in"><SectionHeading eyebrow="A page of wins" title="Test Results" action={<Link href="/create-test" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#244238] px-4 text-xs font-bold text-[#FFF9E9]" data-testid="link-new-test"><Plus size={15} /> New test</Link>} /><div className="mb-6 grid gap-4 sm:grid-cols-3"><Stat label="Tests taken" value="12" note="this term" color="#E3F0E9" /><Stat label="Average score" value="79%" note="a steady climb" color="#FBE9DF" /><Stat label="Best subject" value="Math" note="86% average" color="#E0F0F4" /></div><section className="overflow-hidden rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7]"><div className="hidden grid-cols-[1.5fr_1fr_100px_100px] gap-4 border-b border-[#EEE5D7] px-6 py-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#9AA29A] sm:grid"><span>Test</span><span>Date</span><span>Score</span><span>Feeling</span></div>{tests.map((test) => <div key={test.name} className="grid gap-3 border-b border-[#EEE5D7] px-5 py-4 last:border-0 sm:grid-cols-[1.5fr_1fr_100px_100px] sm:items-center sm:gap-4 sm:px-6"><div><p className="text-sm font-bold text-[#244238]">{test.name}</p><p className="mt-1 text-xs text-[#9AA29A] sm:hidden">{test.date}</p></div><span className="hidden text-xs text-[#89938C] sm:block">{test.date}</span><span className="text-sm font-bold text-[#244238]">{test.score} <span className="font-normal text-[#9AA29A]">/ {test.total}</span></span><span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-bold ${test.tone === 'good' ? 'bg-[#EAF5ED] text-[#4A7C5D]' : test.tone === 'steady' ? 'bg-[#FFF2D9] text-[#9A7541]' : 'bg-[#F7E4DE] text-[#A4624D]'}`}>{test.tone === 'good' ? 'Great work' : test.tone === 'steady' ? 'Keep going' : 'Practise more'}</span></div>)}</section></div></Shell>;
}

function Stat({ label, value, note, color }: { label: string; value: string; note: string; color: string }) { return <div className="rounded-2xl border border-[#E9DFCF] p-5" style={{ backgroundColor: color }}><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#718077]">{label}</p><p className="display-serif mt-3 text-[31px] font-bold text-[#244238]">{value}</p><p className="mt-1 text-xs text-[#718077]">{note}</p></div>; }

function ProgressPage() {
  return <Shell><div className="animate-rise-in"><SectionHeading eyebrow="The bigger picture" title="Progress Report" action={<span className="rounded-full bg-[#E3F0E9] px-3 py-2 text-xs font-bold text-[#4A7C5D]">May 2024</span>} /><div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><section className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-6 sm:p-8"><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8C9890]">Overall notebook</p><p className="display-serif mt-2 text-[48px] font-bold leading-none text-[#244238]">64<span className="text-2xl text-[#8A958C]">%</span></p><p className="mt-2 text-sm text-[#718077]">12% more than last month</p></div><div className="flex h-16 w-16 items-center justify-center rounded-full border-[7px] border-[#E3F0E9] border-t-[#5A7F72] border-r-[#5A7F72] text-xs font-bold text-[#5A7F72]">64%</div></div><div className="mt-8 space-y-5">{subjects.map((subject) => <div key={subject.id}><div className="mb-2 flex justify-between text-xs"><span className="font-bold text-[#244238]">{subject.name}</span><span className="text-[#89938C]">{subject.progress}%</span></div><ProgressBar value={subject.progress} color={subject.color} /></div>)}</div></section><div className="space-y-5"><section className="paper-grid rounded-2xl border border-[#E4D9C6] bg-[#F7F0E0] p-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5C95B] text-[#244238]"><Trophy size={20} /></div><h3 className="display-serif mt-5 text-[25px] font-bold text-[#244238]">A lovely month of learning</h3><p className="mt-3 text-sm leading-6 text-[#6C766D]">Aanya's strongest habit is showing up. That is a brilliant foundation for every subject.</p></section><section className="rounded-2xl border border-[#E9DFCF] bg-[#FFFDF7] p-6"><div className="mb-4 flex items-center gap-3"><Clock3 size={18} className="text-[#D28658]" /><h3 className="text-sm font-bold text-[#244238]">Study rhythm</h3></div><div className="flex items-end gap-2">{[35, 54, 42, 72, 66, 82, 48].map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className={`w-full rounded-t-lg ${index === 5 ? 'bg-[#E8A35F]' : 'bg-[#B9D7C6]'}`} style={{ height: `${height}px` }} /><span className="text-[10px] text-[#9AA29A]">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span></div>)}</div></section></div></div></div></Shell>;
}

export function StudyApp() {
  return <SwitchRoutes />;
}

function SwitchRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route
        path="/subject/:subjectId/chapter/:chapterId"
        component={ChapterPage}
      />
      <Route path="/subject/:subjectId" component={SubjectPage} />
      <Route path="/practice" component={PracticePage} />
      <Route path="/create-test" component={CreateTestPage} />
      <Route
        path="/take-test/:subject/:count"
        component={GenericTestPage}
      />
      <Route path="/upload-photo" component={UploadPage} />
      <Route path="/test-results" component={ResultsPage} />
      <Route path="/progress" component={ProgressPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

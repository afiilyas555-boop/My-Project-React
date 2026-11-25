import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowDownToLine, ArrowUpFromLine, CalendarDays, Check, CheckCheck,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Flame, LayoutDashboard,
  ListChecks, Menu, Moon, Plus, Search, Settings2, Sun, Target, Trash2, Trophy,
  X, Pencil, MoreHorizontal
} from "lucide-react";
import { categories, dateKey, initialHabits, todayKey } from "./data";
import { completionRate, formatDate, getStreak, getWeekDates, isScheduled, monthStats } from "./utils";

const STORE_KEY = "habitflow-data-v1";
const THEME_KEY = "habitflow-theme-v1";
const emptyForm = { name: "", description: "", icon: "✨", category: "Productivity", color: "#8b5cf6", frequency: "Daily", target: 1, unit: "times" };

function loadHabits() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    return Array.isArray(saved) ? saved : initialHabits;
  } catch {
    return initialHabits;
  }
}

function App() {
  const [habits, setHabits] = useState(loadHabits);
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [month, setMonth] = useState(() => new Date());
  const [activePage, setActivePage] = useState("Overview");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All habits");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [dark, setDark] = useState(() => localStorage.getItem(THEME_KEY) === "dark");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => localStorage.setItem(STORE_KEY, JSON.stringify(habits)), [habits]);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  const date = useMemo(() => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [selectedDate]);
  const weekDates = useMemo(() => getWeekDates(date), [date]);
  const todaysHabits = habits.filter(h => isScheduled(h, date));
  const completedCount = todaysHabits.filter(h => h.completions.includes(selectedDate)).length;
  const progress = todaysHabits.length ? Math.round(completedCount / todaysHabits.length * 100) : 0;
  const weeklyProgress = useMemo(() => {
    const scheduled = weekDates.reduce((sum, day) => sum + habits.filter(h => isScheduled(h, day)).length, 0);
    const done = weekDates.reduce((sum, day) => sum + habits.filter(h => isScheduled(h, day) && h.completions.includes(dateKey(day))).length, 0);
    return scheduled ? Math.round(done / scheduled * 100) : 0;
  }, [habits, weekDates]);
  const monthlyProgress = monthStats(habits, month.getFullYear(), month.getMonth());
  const totalCompletions = habits.reduce((sum, h) => sum + h.completions.length, 0);
  const bestStreak = habits.reduce((best, h) => Math.max(best, getStreak(h)), 0);

  const filteredHabits = habits.filter(h => {
    const matchesQuery = `${h.name} ${h.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All habits" || h.category === filter;
    return matchesQuery && matchesFilter;
  });

  function toggleHabit(id, key = selectedDate) {
    setHabits(prev => prev.map(h => h.id !== id ? h : {
      ...h,
      completions: h.completions.includes(key)
        ? h.completions.filter(day => day !== key)
        : [...h.completions, key].sort()
    }));
  }

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(habit) {
    setEditingId(habit.id);
    setForm({ ...habit });
    setModalOpen(true);
  }

  function saveHabit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editingId) {
      setHabits(prev => prev.map(h => h.id === editingId ? { ...h, ...form, target: Number(form.target) || 1 } : h));
      setNotice("Habit updated successfully");
    } else {
      setHabits(prev => [...prev, { ...form, id: crypto.randomUUID(), target: Number(form.target) || 1, completions: [] }]);
      setNotice("New habit added");
    }
    setModalOpen(false);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function deleteHabit(id) {
    if (window.confirm("Delete this habit and its history?")) {
      setHabits(prev => prev.filter(h => h.id !== id));
    }
  }

  function exportData() {
    const blob = new Blob([JSON.stringify({ habits, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "habitflow-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const incoming = Array.isArray(parsed) ? parsed : parsed.habits;
        if (!Array.isArray(incoming)) throw new Error("Invalid file");
        setHabits(incoming);
        setNotice("Backup imported successfully");
      } catch {
        setNotice("Could not import this file");
      }
      window.setTimeout(() => setNotice(""), 2400);
      e.target.value = "";
    };
    reader.readAsText(file);
  }

  const monthLabel = month.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const navItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "My habits", icon: ListChecks },
    { name: "Calendar", icon: CalendarDays }
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
        <div className="brand"><div className="brand-mark"><Activity size={20}/></div><span>habit<span className="brand-light">flow</span></span></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>
          {navItems.map(item => {
            const Icon = item.icon;
            return <button key={item.name} className={`nav-item ${activePage === item.name ? "active" : ""}`} onClick={() => { setActivePage(item.name); setMobileMenu(false); }}>
              <Icon size={18}/><span>{item.name}</span>{item.name === "My habits" && <span className="nav-count">{habits.length}</span>}
            </button>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="tip-card"><div className="tip-icon"><Target size={17}/></div><strong>Small steps, big change.</strong><p>Consistency is more important than perfection.</p></div>
          <button className="nav-item" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}<span>{dark ? "Light mode" : "Dark mode"}</span></button>
          <div className="profile"><div className="avatar">IA</div><div><strong>Your workspace</strong><small>Personal account</small></div><MoreHorizontal size={18} className="muted-icon"/></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-only" onClick={() => setMobileMenu(!mobileMenu)}><Menu size={20}/></button>
          <div className="breadcrumb">Workspace <span>/</span> <strong>{activePage}</strong></div>
          <div className="top-actions">
            <span className="today-label"><span className="online-dot"></span> Your progress is saved</span>
            <button className="icon-button" title="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
            <div className="avatar small">IA</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div><div className="eyebrow">{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</div><h1>{activePage === "Overview" ? "Good things take time." : activePage}</h1><p className="subheading">{activePage === "Overview" ? "Build a better you, one habit at a time." : "Your personal space to build consistency."}</p></div>
            <button className="primary-button" onClick={openAdd}><Plus size={18}/> Add new habit</button>
          </section>

          {activePage === "Calendar" ? (
            <CalendarPage habits={habits} month={month} setMonth={setMonth} toggleHabit={toggleHabit} />
          ) : activePage === "My habits" ? (
            <HabitsPage habits={filteredHabits} allHabits={habits} query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} selectedDate={selectedDate} setSelectedDate={setSelectedDate} toggleHabit={toggleHabit} openEdit={openEdit} deleteHabit={deleteHabit} openAdd={openAdd}/>
          ) : (
            <>
              <section className="stat-grid">
                <StatCard label="Today's progress" value={`${progress}%`} note={`${completedCount} of ${todaysHabits.length} habits completed`} icon={<Target size={19}/>} color="purple" progress={progress}/>
                <StatCard label="This week" value={`${weeklyProgress}%`} note="Weekly completion rate" icon={<CalendarDays size={19}/>} color="blue" progress={weeklyProgress}/>
                <StatCard label="Best current streak" value={`${bestStreak} days`} note="Keep your momentum going" icon={<Flame size={19}/>} color="orange"/>
                <StatCard label="Total check-ins" value={totalCompletions} note="All-time completed habits" icon={<Trophy size={19}/>} color="green"/>
              </section>

              <section className="content-grid">
                <div className="panel habits-panel">
                  <div className="panel-heading"><div><h2>Your daily habits</h2><p>Small actions create remarkable results.</p></div><button className="text-button" onClick={() => setActivePage("My habits")}>View all <ChevronRight size={15}/></button></div>
                  <div className="date-strip">
                    <div className="date-caption"><strong>{date.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</strong><span>Choose a day to track</span></div>
                    <div className="week-days">
                      {weekDates.map(day => {
                        const key = dateKey(day);
                        return <button key={key} className={`day-chip ${selectedDate === key ? "selected" : ""} ${key === todayKey() ? "is-today" : ""}`} onClick={() => setSelectedDate(key)}>
                          <span>{day.toLocaleDateString(undefined, { weekday: "short" })}</span><strong>{day.getDate()}</strong>
                        </button>;
                      })}
                    </div>
                  </div>
                  <div className="habit-list">
                    {todaysHabits.length ? todaysHabits.map(h => <HabitRow key={h.id} habit={h} selectedDate={selectedDate} toggleHabit={toggleHabit} openEdit={openEdit}/>) : <EmptyState title="No habits yet" text="Add your first habit and start building a routine." onClick={openAdd}/>}
                  </div>
                  <div className="panel-footer"><span>{completedCount} completed <span className="dot-separator">·</span> {todaysHabits.length - completedCount} remaining</span><button className="text-button" onClick={() => setActivePage("My habits")}>Manage habits <ChevronRight size={15}/></button></div>
                </div>

                <div className="right-column">
                  <div className="panel progress-panel">
                    <div className="panel-heading"><div><h2>Daily overview</h2><p>Your consistency at a glance</p></div><div className="mini-icon"><Activity size={17}/></div></div>
                    <div className="ring-wrap"><ProgressRing value={progress}/><div className="ring-caption"><strong>{progress}%</strong><span>completed</span></div></div>
                    <div className="progress-legend"><span><i className="legend-dot purple-dot"></i>Completed</span><strong>{completedCount}</strong><span><i className="legend-dot gray-dot"></i>Remaining</span><strong>{todaysHabits.length - completedCount}</strong></div>
                  </div>
                  <div className="panel weekly-panel">
                    <div className="panel-heading"><div><h2>Weekly activity</h2><p>Check-ins over the last 7 days</p></div><span className="badge">This week</span></div>
                    <div className="bar-chart">
                      {weekDates.map(day => {
                        const count = habits.filter(h => isScheduled(h, day) && h.completions.includes(dateKey(day))).length;
                        const max = Math.max(1, habits.filter(h => isScheduled(h, day)).length);
                        return <div className="bar-column" key={dateKey(day)}><div className="bar-track"><div className={`bar-fill ${dateKey(day) === selectedDate ? "bar-current" : ""}`} style={{ height: `${count / max * 100}%` }}></div></div><span>{day.toLocaleDateString(undefined, { weekday: "narrow" })}</span></div>;
                      })}
                    </div>
                  </div>
                </div>
              </section>

              <section className="bottom-grid">
                <div className="panel month-panel"><div className="panel-heading"><div><h2>Monthly consistency</h2><p>{monthLabel}</p></div><div className="month-nav"><button className="icon-button tiny" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft size={16}/></button><button className="icon-button tiny" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight size={16}/></button></div></div><div className="month-summary"><strong>{monthlyProgress}%</strong><span>average completion</span><div className="line-progress"><div style={{ width: `${monthlyProgress}%` }}></div></div></div></div>
                <div className="quote-card"><div className="quote-mark">“</div><p>Success is the sum of small efforts, repeated day in and day out.</p><span>— Robert Collier</span></div>
              </section>
            </>
          )}

          <footer className="app-footer"><span>© 2026 HabitFlow</span><span><span className="online-dot"></span> Your habits are stored on this device</span><div className="footer-actions"><button onClick={exportData}><ArrowDownToLine size={14}/> Export</button><label><ArrowUpFromLine size={14}/> Import<input type="file" accept="application/json,.json" onChange={importData}/></label></div></footer>
        </div>
      </main>

      {modalOpen && <HabitModal form={form} setForm={setForm} onClose={() => setModalOpen(false)} onSave={saveHabit} editing={Boolean(editingId)}/>}
      {notice && <div className="toast"><Check size={16}/>{notice}</div>}
    </div>
  );
}

function StatCard({ label, value, note, icon, color, progress }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon ${color}`}>{icon}</div></div><div className="stat-value">{value}</div><div className="stat-note">{note}</div>{progress !== undefined && <div className="stat-progress"><div style={{ width: `${progress}%` }}></div></div>}</div>;
}

function ProgressRing({ value }) {
  return <svg className="progress-ring" viewBox="0 0 140 140"><circle className="ring-bg" cx="70" cy="70" r="58"/><circle className="ring-value" cx="70" cy="70" r="58" style={{ strokeDasharray: `${value * 3.644} 364.4` }}/></svg>;
}

function HabitRow({ habit, selectedDate, toggleHabit, openEdit }) {
  const done = habit.completions.includes(selectedDate);
  return <div className={`habit-row ${done ? "is-complete" : ""}`}><div className="habit-emoji" style={{ background: `${habit.color}20` }}>{habit.icon}</div><div className="habit-info"><strong>{habit.name}</strong><span>{habit.description || `${habit.category} · ${habit.frequency}`}</span></div><div className="habit-meta"><span className="category-pill">{habit.category}</span><small>{habit.target} {habit.unit}</small></div><button className={`check-button ${done ? "checked" : ""}`} onClick={() => toggleHabit(habit.id)} aria-label={done ? "Mark incomplete" : "Mark complete"}>{done && <Check size={17}/>}</button><button className="row-edit" onClick={() => openEdit(habit)} aria-label="Edit habit"><Pencil size={15}/></button></div>;
}

function HabitsPage({ habits, allHabits, query, setQuery, filter, setFilter, selectedDate, setSelectedDate, toggleHabit, openEdit, deleteHabit, openAdd }) {
  return <div className="panel page-panel"><div className="toolbar"><div className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your habits..."/></div><select value={filter} onChange={e => setFilter(e.target.value)}><option>All habits</option>{categories.map(c => <option key={c}>{c}</option>)}</select><input className="date-input" type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}/></div><div className="habits-table-head"><span>HABIT</span><span>CATEGORY</span><span>FREQUENCY</span><span>STREAK</span><span>STATUS</span><span>ACTIONS</span></div>
    {habits.map(h => { const done = h.completions.includes(selectedDate); return <div className="table-habit-row" key={h.id}><div className="table-habit-name"><span className="table-emoji" style={{ background: `${h.color}20` }}>{h.icon}</span><div><strong>{h.name}</strong><small>{h.description}</small></div></div><span><span className="category-pill">{h.category}</span></span><span className="muted-text">{h.frequency}</span><span className="streak-cell"><Flame size={14}/>{getStreak(h)} days</span><span><button className={`status-pill ${done ? "done" : ""}`} onClick={() => toggleHabit(h.id)}>{done ? "Completed" : "Mark done"}</button></span><span className="action-buttons"><button onClick={() => openEdit(h)} title="Edit"><Pencil size={15}/></button><button onClick={() => deleteHabit(h.id)} title="Delete"><Trash2 size={15}/></button></span></div>; })}
    {!habits.length && <EmptyState title="No matching habits" text={allHabits.length ? "Try another search or category." : "Create your first habit to get started."} onClick={openAdd}/>}
    <div className="panel-footer"><span>Showing {habits.length} of {allHabits.length} habits</span><button className="text-button" onClick={openAdd}><Plus size={15}/> Add habit</button></div>
  </div>;
}

function CalendarPage({ habits, month, setMonth, toggleHabit }) {
  const year = month.getFullYear(), m = month.getMonth();
  const days = new Date(year, m + 1, 0).getDate();
  return <div className="panel calendar-panel"><div className="panel-heading"><div><h2>Habit calendar</h2><p>Review and update your monthly check-ins.</p></div><div className="calendar-month-nav"><button className="icon-button tiny" onClick={() => setMonth(new Date(year, m - 1, 1))}><ChevronLeft size={16}/></button><strong>{month.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</strong><button className="icon-button tiny" onClick={() => setMonth(new Date(year, m + 1, 1))}><ChevronRight size={16}/></button></div></div>
    {!habits.length ? <EmptyState title="No habits to display" text="Add a habit to see it in your calendar."/> : <div className="calendar-scroll"><div className="calendar-grid" style={{ gridTemplateColumns: `170px repeat(${days}, minmax(27px, 1fr))` }}><div className="calendar-head habit-head">HABIT</div>{Array.from({ length: days }, (_, i) => <div className="calendar-head" key={i + 1}>{i + 1}</div>)}{habits.map(h => <React.Fragment key={h.id}><div className="calendar-habit"><span>{h.icon}</span><strong>{h.name}</strong></div>{Array.from({ length: days }, (_, i) => { const day = i + 1; const key = dateKey(new Date(year, m, day)); const done = h.completions.includes(key); return <button key={`${h.id}-${day}`} className={`calendar-cell ${done ? "marked" : ""}`} style={done ? { background: `${h.color}30`, borderColor: `${h.color}80` } : {}} onClick={() => toggleHabit(h.id, key)} title={`${h.name} — ${key}`}>{done ? <Check size={13}/> : ""}</button>; })}</React.Fragment>)}</div></div>}
    <div className="calendar-legend"><span><i className="legend-dot purple-dot"/> Completed</span><span><i className="legend-dot gray-dot"/> Not completed</span><span>Click a cell to update a check-in.</span></div>
  </div>;
}

function EmptyState({ title, text, onClick }) {
  return <div className="empty-state"><div className="empty-icon"><ListChecks size={22}/></div><strong>{title}</strong><p>{text}</p>{onClick && <button className="secondary-button" onClick={onClick}><Plus size={15}/> Add a habit</button>}</div>;
}

function HabitModal({ form, setForm, onClose, onSave, editing }) {
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><form className="habit-modal" onSubmit={onSave}><div className="modal-heading"><div><span className="eyebrow">HABIT SETTINGS</span><h2>{editing ? "Edit habit" : "Create a new habit"}</h2><p>Make it clear, measurable, and achievable.</p></div><button type="button" className="icon-button" onClick={onClose}><X size={19}/></button></div>
    <label className="form-label">Habit name<input autoFocus value={form.name} onChange={e => update("name", e.target.value)} placeholder="e.g. Read for 20 minutes" required maxLength={45}/></label>
    <label className="form-label">Description <span className="optional">Optional</span><input value={form.description} onChange={e => update("description", e.target.value)} placeholder="What do you want to achieve?"/></label>
    <div className="form-two"><label className="form-label">Category<select value={form.category} onChange={e => update("category", e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label className="form-label">Frequency<select value={form.frequency} onChange={e => update("frequency", e.target.value)}>{["Daily","Weekly","Weekdays","Weekends"].map(f => <option key={f}>{f}</option>)}</select></label></div>
    <div className="form-two"><label className="form-label">Target<input type="number" min="1" max="999" value={form.target} onChange={e => update("target", e.target.value)}/></label><label className="form-label">Unit<input value={form.unit} onChange={e => update("unit", e.target.value)} placeholder="minutes, pages..."/></label></div>
    <div className="form-two"><label className="form-label">Emoji<input value={form.icon} onChange={e => update("icon", e.target.value)} maxLength={4}/></label><label className="form-label">Accent color<input className="color-input" type="color" value={form.color} onChange={e => update("color", e.target.value)}/></label></div>
    <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit"><Check size={16}/>{editing ? "Save changes" : "Create habit"}</button></div>
  </form></div>;
}

export default App;

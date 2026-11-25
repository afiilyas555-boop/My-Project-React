import { dateKey, parseKey } from "./data";

export function getWeekDates(anchor = new Date()) {
  const date = new Date(anchor);
  const day = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const current = new Date(date);
    current.setDate(date.getDate() + i);
    return current;
  });
}

export function isScheduled(habit, date) {
  if (habit.frequency === "Daily") return true;
  if (habit.frequency === "Weekly") return true;
  if (habit.frequency === "Weekdays") return ![0, 6].includes(date.getDay());
  if (habit.frequency === "Weekends") return [0, 6].includes(date.getDay());
  return true;
}

export function completionRate(habits, date = new Date()) {
  const eligible = habits.filter(h => isScheduled(h, date));
  if (!eligible.length) return 0;
  const key = dateKey(date);
  return Math.round(eligible.filter(h => h.completions.includes(key)).length / eligible.length * 100);
}

export function getStreak(habit) {
  const done = new Set(habit.completions);
  let cursor = new Date();
  const today = dateKey(cursor);
  if (!done.has(today)) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (done.has(dateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function monthStats(habits, year, month) {
  const days = new Date(year, month + 1, 0).getDate();
  let scheduled = 0;
  let completed = 0;
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d);
    const key = dateKey(date);
    habits.forEach(h => {
      if (isScheduled(h, date)) {
        scheduled++;
        if (h.completions.includes(key)) completed++;
      }
    });
  }
  return scheduled ? Math.round(completed / scheduled * 100) : 0;
}

export function formatDate(key) {
  return parseKey(key).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

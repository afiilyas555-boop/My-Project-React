export const initialHabits = [
  { id: "water", name: "Drink water", description: "Stay hydrated throughout the day", icon: "💧", category: "Health", color: "#60a5fa", frequency: "Daily", target: 8, unit: "glasses", completions: [] },
  { id: "reading", name: "Read a book", description: "Read at least a few pages", icon: "📚", category: "Learning", color: "#a78bfa", frequency: "Daily", target: 20, unit: "minutes", completions: [] },
  { id: "exercise", name: "Exercise", description: "Move your body and build strength", icon: "🏃", category: "Fitness", color: "#34d399", frequency: "Weekly", target: 4, unit: "times / week", completions: [] },
  { id: "meditate", name: "Meditate", description: "Take a mindful pause", icon: "🧘", category: "Mindfulness", color: "#f59e0b", frequency: "Daily", target: 10, unit: "minutes", completions: [] },
  { id: "journal", name: "Write a journal", description: "Reflect on your day", icon: "✍️", category: "Mindfulness", color: "#fb7185", frequency: "Daily", target: 1, unit: "entry", completions: [] }
];

export const categories = ["Health", "Fitness", "Learning", "Mindfulness", "Productivity", "Finance", "Other"];
export const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
export const parseKey = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

# HabitFlow — Advanced Habit Tracker

A responsive habit-tracking dashboard built with React, Vite and LocalStorage.

## Features
- Create, edit and delete habits
- Categories, emoji, accent colors, targets and frequencies
- Daily check-ins and historical calendar check-ins
- Daily, weekly and monthly progress
- Current streaks and all-time check-ins
- Search and category filtering
- Dark mode
- Export and import JSON backups
- LocalStorage persistence
- Responsive desktop and mobile layout

## Requirements
- Node.js (LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
advanced-habit-tracker/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── data.js
    ├── main.jsx
    ├── styles.css
    └── utils.js
```

## Data storage
Habits are saved in the browser's LocalStorage under `habitflow-data-v1`.
The app does not send your habit data to a server. Clearing browser site data can remove it, so use Export to create a backup.

## Notes
- Weekly means the habit can be checked in on any day, with the weekly completion rate counting each scheduled day. It is not a fixed weekly target counter.
- Weekdays excludes Saturday and Sunday; Weekends includes Saturday and Sunday.
- The target and unit are descriptive fields in this version. Check-ins currently count one completion per habit per day.

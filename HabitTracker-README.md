# HabitTracker

A clean, single-page habit tracker built with React — check off daily habits, see your weekly completion breakdown as a bar chart and doughnut chart, track your current streak, and view a full month calendar showing which days you hit 100% of your habits. Fully client-side, persisted with `localStorage` — no backend required.

<!-- Add a screenshot here, e.g. -->
<!-- ![HabitTracker dashboard](./docs/screenshot.png) -->

**[Live demo](#)**

---

## Features

- **Add, edit, and delete habits** inline, with an editable title field per habit
- **Daily check-off** — toggle a habit as done for today; state is tracked both by weekday (`Mon`–`Sun`) and by full calendar date, so history persists correctly across weeks
- **Filtering** — view all habits, only completed, or only incomplete for the current day
- **Weekly progress bars** — a per-day completion percentage across all habits, visualized as animated bar fills
- **Overall progress doughnut chart** (Chart.js) — how many of the last 7 days were "fully completed" (every habit checked)
- **Streak counter** — counts consecutive days (including today) where every habit was completed, walking backward from today until it finds a day that wasn't
- **Month calendar view** — highlights any date where all habits were completed that day
- **Persistent storage** — habits and their full completion history are saved to `localStorage`, so data survives page refreshes with no account or server needed

## How it's built

### Dual date tracking (weekday + full date)

Each habit stores completion in two parallel structures:

```js
{
  id: 173...,
  title: "Drink water",
  history: { Mon: false, Tue: true, ... },   // current week, by weekday label
  dates: { "2026-09-14": true, ... }          // full history, by calendar date
}
```

`history` drives the "This Week" bar chart (simple, label-based lookups), while `dates` is the source of truth for the calendar view and streak calculation, since those need to distinguish, say, *this* Monday from *last* Monday. Toggling a habit updates both in the same action, keyed off `toLocaleDateString("en-CA")` (which reliably produces `YYYY-MM-DD`, avoiding locale-format ambiguity).

### Streak calculation

The streak counter walks backward day by day from today, checking whether *every* habit was marked complete on that date, and stops at the first day that breaks the chain:

```js
function getStreak() {
  let streak = 0;
  while (true) {
    const dateStr = /* today - streak days */;
    const isComplete = habits.length > 0 && habits.every(h => h.dates?.[dateStr]);
    if (!isComplete) break;
    streak++;
  }
  return streak;
}
```

This is a small but real algorithm — it has to correctly handle the "no habits yet" edge case (an empty habit list shouldn't count as a completed day) and stop at the exact right boundary.

### Calendar heatmap

The calendar renders a standard month grid (padding empty cells for the correct starting weekday via `new Date(year, month, 1).getDay()`), then cross-references each date against every habit's `dates` map to decide whether to highlight it as a "fully completed" day.

### Derived, not stored, statistics

Weekly percentages, the doughnut chart's data, and completed-day counts are all computed on every render from the raw `habits` array rather than stored as separate state — keeping a single source of truth and avoiding sync bugs between habit data and its visualizations.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React (Vite) |
| UI components | react-bootstrap |
| Charts | Chart.js via react-chartjs-2 (Doughnut) |
| Persistence | Browser `localStorage` |
| Styling | Custom CSS |

## Project structure

```
src/
├── App.jsx                       # top-level state: habits, filters, edit mode, derived stats
├── App.css
├── main.jsx
├── CalendarSection/
│   └── Calendar.jsx               # month grid + streak display
└── components/
    ├── HabitSection/
    │   ├── Habits.jsx              # habit list container, add/filter controls
    │   └── HabitList.jsx           # individual habit row, checkbox, edit/delete
    └── ProgressSection/
        └── ProgressSection.jsx     # weekly bar chart + doughnut chart
```

## Getting started

```bash
git clone https://github.com/<your-username>/habittracker.git
cd habittracker
npm install
npm run dev
```

No environment variables or backend setup needed — everything runs and persists locally in the browser.

## Roadmap

- [ ] Cloud sync / accounts so habits persist across devices
- [ ] Custom habit frequency (not just daily)
- [ ] Habit categories/tags
- [ ] Export history as CSV

## License

MIT

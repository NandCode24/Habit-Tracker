Perfect timing.
Below is a clean, honest, portfolio-ready README that matches the discipline and maturity of your app.
No fake hype, no buzzwords — this reads like a real developer project, not a tutorial clone.

You can copy-paste this directly into README.md.

⸻


# HabitSync 🧠🔥

A calm, distraction-free habit tracker built for **discipline, consistency, and daily execution**.

HabitSync is a personal productivity app designed to be **simple, fast, and mentally quiet** — no accounts, no cloud, no noise. Just habits, streaks, and progress.

---

## ✨ Why I Built This

Most habit trackers are:
- overloaded with features
- visually noisy
- focused on motivation instead of discipline

I wanted something I could **actually use every day**.

HabitSync focuses on:
- doing the work
- tracking consistency
- staying calm and intentional

This project also helped me deeply understand:
- React state lifecycles
- persistence with `localStorage`
- real-world bugs caused by navigation & re-mounting
- building a clean dark UI that’s easy on the eyes

---

## 🚀 Features

- ✅ Add and manage daily habits
- 🔥 Streak system with **strict reset logic**
  - Miss a day → streak resets
  - No fake streak inflation
- 📊 Stats page with:
  - Daily completion progress
  - Best streak (all-time)
  - Weekly history based on real data
- 📅 Automatic daily reset handling
- 💾 Persistent storage using `localStorage`
- ⌨️ Keyboard shortcuts (power-user friendly)
- 🌙 Calm black theme (eye-friendly, distraction-free)

---

## 🧠 Streak Logic (Important)

HabitSync follows **real discipline rules**:

- First completion → 🔥 1
- Continuous daily completion → streak increases
- Miss even one day → streak resets
- Completing again after a miss starts a **fresh streak**

No cheating. No soft resets.

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **React + TypeScript**
- **Tailwind CSS**
- **LocalStorage** (no backend, no auth)
- **Lucide Icons**

---

## 📂 Project Structure (Simplified)

app/
├─ page.tsx        → Main dashboard
├─ stats/          → Stats & progress
├─ motivation/     → Calm discipline messages

hooks/
├─ useHabits.ts    → Core habit logic & persistence

components/
├─ HabitList
├─ HabitRow
├─ StatsCards
├─ ProgressRing
├─ WeeklyBars
├─ AddHabitModal

---

## 🧩 Key Engineering Lessons

- ❗ Multiple instances of a stateful hook can **silently overwrite persistent data**
- ❗ Navigation ≠ page refresh (important in App Router)
- ✅ Defensive persistence guards are sometimes necessary
- ✅ Calm UI improves long-term usability more than animations

---

## 🧪 How to Run Locally

```bash
npm install
npm run dev

Open http://localhost:3000

⸻

📌 Notes
	•	This is a personal-use app by design
	•	No login, no sync, no analytics
	•	Built to be fast, private, and reliable

⸻

📜 License

MIT — use it, modify it, learn from it.

⸻

Discipline beats motivation.
Small actions, done daily, decide everything.

---

## ✅ Final Advice (Don’t Skip This)

Before pushing:
- ✔️ Run the app once
- ✔️ Confirm habits persist after navigation
- ✔️ Commit with a clean message like:

```bash
git commit -m "Build HabitSync: disciplined habit tracker with streaks & stats"

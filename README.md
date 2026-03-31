# LifeLog

A desktop app for tracking daily health habits using a **plan vs actual** system.

## What it does

LifeLog lets you plan your day — meals, workouts, sleep, and other habits — then log what actually happened. Each entry has a **Plan**, an **Actual**, and a **Followed** checkbox. Over time, the dashboard shows your consistency and streak so you can see how well you're sticking to your intentions.

There are no restrictions on when you fill things in. You can plan ahead, log in real-time, or fill in actuals days later.

## Tech Stack

- **Vite** — fast dev server and build tool
- **React** — UI framework
- **Tailwind CSS** — utility-first styling
- **Electron** — desktop shell

## How to Run

```bash
npm install
npm run dev
```

This starts the Vite dev server and opens the Electron window automatically.

## Storage

Data is saved as JSON at:

```
%APPDATA%\lifelog\data.json   (Windows)
~/Library/Application Support/lifelog/data.json   (macOS)
~/.config/lifelog/data.json   (Linux)
```

No account or internet connection required — everything stays local.

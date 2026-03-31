# LifeLog — General App Plan

## 1. Overview

**LifeLog** is a desktop app for tracking daily health habits using a **plan vs actual system**.

It focuses on:

* Simplicity
* Daily usability
* Consistency tracking

---

## 2. Tech Stack

* Vite
* React
* Tailwind CSS
* Electron

Storage:

* Local JSON in:

```bash
%APPDATA%/lifelog/
```

---

## 3. Core User Flow

### Daily Loop

1. User opens app → sees **Home**
2. User selects a date (calendar)
3. User creates **plan for that day** (can be today or future)
4. On that day (or later if missed):

   * User fills **actual (realization)**
   * User marks **followed**
5. App shows:

   * Summary
   * Consistency
   * Progress

---

## 4. Flexibility Rule (Important)

* User can:

  * Create plan for **any day**
  * Fill actual **later (no restriction)**
* No strict enforcement of real-time logging

---

## 5. Main Screen (Home)

## Layout Structure

### Top Area (Control Panel)

* Calendar (date navigation)
* Simple Dashboard:

  * Calories (planned vs actual)
  * Protein / carbs (optional display)
  * Consistency %
  * Streak

---

### Main Area

**Today's Plan (Timeline)**

* Vertical list of cards:

  * Wake up
  * Meals
  * Exercise
  * Other events

Each card contains:

* Plan
* Actual
* Follow checkbox

---

## 6. Navigation

* Default: Home (today)
* Change date via calendar
* Clicking a day updates timeline

---

## 7. Design Direction

### Style

* Organic biophilic
* Modern minimal

### Characteristics

* Soft green + white palette
* Rounded cards
* Spacious layout
* Low visual noise
* Calm and readable

### Claude Skill

* ui-ux-pro-max

Claude will handle:

* layout composition
* spacing system
* typography hierarchy

---

## 8. Core Features

### Required

* Timeline-based day view
* Plan input
* Actual input
* Follow checkbox
* Basic dashboard (summary + streak)

---

### Not Included (for now)

* Complex analytics
* AI automation
* Cloud sync
* Advanced charts

---

# 9. Execution Plan (Max 5 Phases)

Each phase:

* Implement
* Run app
* Manual testing
* Confirm before next
* Commit with meaningful message (no co-author)

---

## Phase 1 — App Boot

Goal:

* Electron app runs with Vite + React + Tailwind

Requirements:

* Window opens successfully
* React UI visible

Includes:

* Base setup
* Tailwind configured
* Electron connected to dev server

Commit:

```
setup: initialize Electron + Vite + React + Tailwind app
```

---

## Phase 2 — App Shell (Home Layout)

Goal:

* Basic Home screen layout exists

Includes:

* Top control area:

  * Calendar (UI placeholder ok)
  * Dashboard (static placeholder)
* Main area:

  * Timeline container (empty or mock)

Commit:

```
feat: create home layout with calendar and dashboard
```

---

## Phase 3 — Timeline System

Goal:

* Render timeline cards

Includes:

* Timeline list
* Card component
* Static mock data
* Visual structure of:

  * Plan
  * Actual
  * Checkbox

Commit:

```
feat: implement timeline and card components
```

---

## Phase 4 — Input & Interaction

Goal:

* User can input data

Includes:

* Add/edit plan
* Add/edit actual
* Toggle follow checkbox
* Basic local state

Commit:

```
feat: enable plan and actual input with interactions
```

---

## Phase 5 — Persistence & Dashboard

Goal:

* Data persists and summary works

Includes:

* Save/load from %APPDATA%
* Calculate:

  * calories
  * protein
  * carbs
  * consistency
  * streak
* Display dashboard values

Also:

* Add README

Commit:

```
feat: add persistence, summary dashboard, and documentation
```

---

# 10. README Requirements

README must include:

## App Info

* What LifeLog is
* Core concept (plan vs actual)

## Tech Stack

* Vite, React, Tailwind, Electron

## How to Run

```bash
npm install
npm run dev
```

## Storage Info

```bash
%APPDATA%/lifelog/
```

---

# 11. Development Rules

* Keep phases small
* Confirm each phase before continuing
* Do not overengineer
* Prioritize usability over completeness

---

# 12. Final Notes

* Claude handles implementation details
* You focus on building + testing
* I guide scope and flow

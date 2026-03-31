import { useState, useEffect, useCallback } from 'react'
import Calendar from './components/Calendar'
import Dashboard from './components/Dashboard'
import Timeline from './components/Timeline'
import { loadData, saveData } from './storage'
import { computeStats } from './stats'

function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Migrate old format (dateKey → Entry[]) to new format (dateKey → { entries, targets }) */
function migrateData(raw) {
  const out = {}
  for (const [key, val] of Object.entries(raw)) {
    if (Array.isArray(val)) {
      out[key] = { entries: val, targets: null }
    } else {
      out[key] = val
    }
  }
  return out
}

function getDayEntries(dayVal) {
  if (!dayVal) return []
  if (Array.isArray(dayVal)) return dayVal
  return dayVal.entries ?? []
}

function getDayTargets(dayVal) {
  if (!dayVal || Array.isArray(dayVal)) return null
  return dayVal.targets ?? null
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [data, setData] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    loadData().then((saved) => {
      setData(migrateData(saved ?? {}))
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    saveData(data)
  }, [data, loaded])

  const dateKey = toDateKey(selectedDate)
  const todayKey = toDateKey(new Date())

  const entries = getDayEntries(data[dateKey])
  const targets = getDayTargets(data[dateKey])

  // Yesterday's targets for the "copy from yesterday" feature
  const yesterdayMs = selectedDate.getTime() - 86400000
  const yesterdayKey = toDateKey(new Date(yesterdayMs))
  const yesterdayTargets = getDayTargets(data[yesterdayKey])

  const updateDay = useCallback((patch) => {
    setData((d) => ({
      ...d,
      [dateKey]: { ...(d[dateKey] ?? {}), ...patch },
    }))
  }, [dateKey])

  const handleUpdate = (updated) =>
    updateDay({ entries: entries.map((e) => (e.id === updated.id ? updated : e)) })

  const handleAdd = (entry) =>
    updateDay({ entries: [...entries, entry] })

  const handleDelete = (id) =>
    updateDay({ entries: entries.filter((e) => e.id !== id) })

  const handleImport = ({ entries: newEntries, targets: newTargets }) => {
    const patch = { entries: newEntries }
    if (newTargets) patch.targets = newTargets
    updateDay(patch)
  }

  const handleSaveTargets = (newTargets) =>
    updateDay({ targets: newTargets })

  const stats = computeStats(data, todayKey)

  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-sage-50">
        <p className="text-sage-400 text-sm">Loading…</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-sage-50 overflow-hidden font-sans">
      <aside className="w-72 flex-shrink-0 flex flex-col gap-4 p-5 overflow-y-auto border-r border-sage-100 bg-white">
        <div className="py-1">
          <h1 className="text-xl font-bold text-sage-700 tracking-tight">LifeLog</h1>
          <p className="text-xs text-sage-400 mt-0.5">Daily habit tracker</p>
        </div>

        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        <Dashboard
          stats={stats}
          targets={targets}
          yesterdayTargets={yesterdayTargets}
          onSaveTargets={handleSaveTargets}
        />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          <Timeline
            date={selectedDate}
            entries={entries}
            onUpdate={handleUpdate}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onImport={handleImport}
          />
        </div>
      </main>
    </div>
  )
}

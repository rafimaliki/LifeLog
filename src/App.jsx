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

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [data, setData] = useState({})
  const [loaded, setLoaded] = useState(false)

  // Load persisted data on mount
  useEffect(() => {
    loadData().then((saved) => {
      setData(saved ?? {})
      setLoaded(true)
    })
  }, [])

  // Save whenever data changes (after initial load)
  useEffect(() => {
    if (!loaded) return
    saveData(data)
  }, [data, loaded])

  const dateKey = toDateKey(selectedDate)
  const todayKey = toDateKey(new Date())
  const entries = data[dateKey] ?? []

  const updateEntries = useCallback((newEntries) => {
    setData((d) => ({ ...d, [dateKey]: newEntries }))
  }, [dateKey])

  const handleUpdate = (updated) =>
    updateEntries(entries.map((e) => (e.id === updated.id ? updated : e)))

  const handleAdd = (entry) =>
    updateEntries([...entries, entry])

  const handleDelete = (id) =>
    updateEntries(entries.filter((e) => e.id !== id))

  const handleImport = (newEntries) =>
    updateEntries(newEntries)

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
      {/* Left sidebar */}
      <aside className="w-72 flex-shrink-0 flex flex-col gap-4 p-5 overflow-y-auto border-r border-sage-100 bg-white">
        {/* App title */}
        <div className="py-1">
          <h1 className="text-xl font-bold text-sage-700 tracking-tight">LifeLog</h1>
          <p className="text-xs text-sage-400 mt-0.5">Daily habit tracker</p>
        </div>

        {/* Calendar */}
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        {/* Dashboard */}
        <Dashboard stats={stats} />
      </aside>

      {/* Main content */}
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

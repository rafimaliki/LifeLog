import { useState } from 'react'
import Calendar from './components/Calendar'
import Dashboard from './components/Dashboard'
import Timeline from './components/Timeline'
import { MOCK_ENTRIES } from './data/mockData'

function toDateKey(date) {
  return date.toISOString().slice(0, 10)
}

const INITIAL_DATA = {
  [toDateKey(new Date())]: MOCK_ENTRIES,
}

const PLACEHOLDER_STATS = {
  calories: { planned: 2200, actual: 760 },
  protein: { planned: 150, actual: 35 },
  carbs: { planned: 250, actual: 118 },
  consistency: 68,
  streak: 4,
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [data, setData] = useState(INITIAL_DATA)

  const dateKey = toDateKey(selectedDate)
  const entries = data[dateKey] ?? []

  const updateEntries = (newEntries) =>
    setData((d) => ({ ...d, [dateKey]: newEntries }))

  const handleUpdate = (updated) =>
    updateEntries(entries.map((e) => (e.id === updated.id ? updated : e)))

  const handleAdd = (entry) =>
    updateEntries([...entries, entry])

  const handleDelete = (id) =>
    updateEntries(entries.filter((e) => e.id !== id))

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
        <Dashboard stats={PLACEHOLDER_STATS} />
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
          />
        </div>
      </main>
    </div>
  )
}

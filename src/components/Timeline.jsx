import { useState } from 'react'
import TimelineCard from './TimelineCard'
import AddEntryModal from './AddEntryModal'
import ImportJsonModal from './ImportJsonModal'

export default function Timeline({ date, entries, onUpdate, onAdd, onDelete, onImport }) {
  const [showAdd, setShowAdd] = useState(false)
  const [showImport, setShowImport] = useState(false)

  const label = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const followed = entries.filter((e) => e.followed).length
  const total = entries.length

  const sorted = [...entries].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* Date heading */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-sage-800">{label}</h2>
          <p className="text-sm text-sage-400 mt-0.5">Plan your day and track what actually happened</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {total > 0 && (
            <span className="text-sm text-sage-500 font-medium mr-1">
              {followed}/{total} followed
            </span>
          )}
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sage-200 text-xs font-medium text-sage-600 hover:bg-sage-100 transition-colors"
            title="Import a day plan from JSON"
          >
            <span>⬇</span> Import JSON
          </button>
        </div>
      </div>

      {/* Empty state */}
      {entries.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center text-2xl mb-4">
            🌿
          </div>
          <p className="text-sage-600 font-medium">No entries yet</p>
          <p className="text-sage-400 text-sm mt-1">Add manually or import a plan from ChatGPT</p>
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setShowImport(true)}
              className="px-4 py-2.5 border border-sage-300 text-sage-700 text-sm font-medium rounded-xl hover:bg-sage-100 transition-colors"
            >
              ⬇ Import JSON
            </button>
            <button
              onClick={() => setShowAdd(true)}
              className="px-4 py-2.5 bg-sage-500 hover:bg-sage-600 text-white text-sm font-medium rounded-xl transition-colors"
            >
              + Add Entry
            </button>
          </div>
        </div>
      )}

      {/* Entry list */}
      {entries.length > 0 && (
        <div className="flex flex-col gap-3 pb-6">
          {sorted.map((entry) => (
            <TimelineCard
              key={entry.id}
              entry={entry}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
          <button
            onClick={() => setShowAdd(true)}
            className="mt-1 px-5 py-2.5 bg-sage-100 hover:bg-sage-200 text-sage-700 text-sm font-medium rounded-xl transition-colors self-start"
          >
            + Add Entry
          </button>
        </div>
      )}

      {showAdd && (
        <AddEntryModal
          onAdd={onAdd}
          onClose={() => setShowAdd(false)}
        />
      )}

      {showImport && (
        <ImportJsonModal
          onImport={onImport}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  )
}

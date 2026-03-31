import { useState, useRef, useEffect } from 'react'
import { ENTRY_META } from '../data/mockData'

function InlineField({ label, value, placeholder, onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const ref = useRef(null)

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus()
      ref.current.setSelectionRange(draft.length, draft.length)
    }
  }, [editing])

  const commit = () => {
    setEditing(false)
    if (draft !== value) onSave(draft)
  }

  const handleKey = (e) => {
    if (e.key === 'Escape') { setDraft(value); setEditing(false) }
  }

  return (
    <div className="bg-white/70 rounded-xl p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-sage-400 mb-1.5">{label}</p>

      {editing ? (
        <textarea
          ref={ref}
          rows={3}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKey}
          className="w-full text-xs text-sage-700 leading-relaxed bg-transparent resize-none focus:outline-none"
          placeholder={placeholder}
        />
      ) : (
        <button
          onClick={() => { setDraft(value); setEditing(true) }}
          className="w-full text-left group"
        >
          {value ? (
            <p className="text-xs text-sage-700 leading-relaxed group-hover:text-sage-900 transition-colors">
              {value}
            </p>
          ) : (
            <p className="text-xs text-sage-300 italic group-hover:text-sage-400 transition-colors">
              {placeholder}
            </p>
          )}
        </button>
      )}
    </div>
  )
}

export default function TimelineCard({ entry, onUpdate, onDelete }) {
  const meta = ENTRY_META[entry.type] ?? ENTRY_META.other

  const update = (key, val) => onUpdate({ ...entry, [key]: val })

  return (
    <div className={`rounded-2xl border p-4 ${meta.color} transition-shadow hover:shadow-md group`}>
      {/* Card header */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-base leading-none">{meta.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-sage-800">{entry.label}</span>
          {entry.time && <span className="ml-2 text-xs text-sage-400">{entry.time}</span>}
        </div>

        {/* Delete button — visible on hover */}
        <button
          onClick={() => onDelete(entry.id)}
          className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-full text-sage-300 hover:text-red-400 hover:bg-red-50 transition-all text-xs mr-1"
          title="Delete entry"
        >
          ✕
        </button>

        {/* Followed checkbox */}
        <label className="flex items-center gap-1.5 cursor-pointer group/check">
          <button
            type="button"
            onClick={() => update('followed', !entry.followed)}
            className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-colors
              ${entry.followed
                ? 'bg-sage-500 border-sage-500'
                : 'bg-white border-sage-300 group-hover/check:border-sage-400'
              }`}
          >
            {entry.followed && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <span className="text-xs text-sage-500">Followed</span>
        </label>
      </div>

      {/* Plan / Actual columns */}
      <div className="grid grid-cols-2 gap-3">
        <InlineField
          label="Plan"
          value={entry.plan}
          placeholder="Tap to add plan…"
          onSave={(val) => update('plan', val)}
        />
        <InlineField
          label="Actual"
          value={entry.actual}
          placeholder="Tap to add actual…"
          onSave={(val) => update('actual', val)}
        />
      </div>
    </div>
  )
}

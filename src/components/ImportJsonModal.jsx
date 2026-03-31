import { useState } from 'react'

const VALID_TYPES = new Set(['wake-up', 'meal', 'exercise', 'other'])

function parseEntries(raw) {
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error('Invalid JSON — could not parse.')
  }

  // Accept either { entries: [...] } or a bare array
  const list = Array.isArray(parsed) ? parsed : parsed?.entries
  if (!Array.isArray(list)) throw new Error('Expected an "entries" array.')
  if (list.length === 0) throw new Error('The entries array is empty.')

  return list.map((item, i) => {
    if (!item.label?.trim()) throw new Error(`Entry ${i + 1} is missing a "label".`)
    if (!VALID_TYPES.has(item.type)) {
      throw new Error(
        `Entry ${i + 1} has invalid type "${item.type}". Use: wake-up, meal, exercise, or other.`
      )
    }
    return {
      id: crypto.randomUUID(),
      type: item.type,
      label: String(item.label).trim(),
      time: item.time ?? '',
      plan: item.plan ? String(item.plan).trim() : '',
      actual: '',
      followed: false,
    }
  })
}

export default function ImportJsonModal({ onImport, onClose }) {
  const [raw, setRaw] = useState('')
  const [error, setError] = useState('')

  const handleImport = () => {
    setError('')
    try {
      const entries = parseEntries(raw)
      onImport(entries)
      onClose()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-sage-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-sage-800">Import Day Plan</h2>
            <p className="text-xs text-sage-400 mt-0.5">Paste JSON from ChatGPT or any LLM</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-sage-400 hover:bg-sage-100 hover:text-sage-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Textarea */}
          <textarea
            rows={12}
            value={raw}
            onChange={(e) => { setRaw(e.target.value); setError('') }}
            placeholder={`{\n  "date": "2026-03-31",\n  "entries": [\n    {\n      "type": "meal",\n      "label": "Breakfast",\n      "time": "07:00",\n      "plan": "Oatmeal — 450 kcal, 20g protein, 60g carbs"\n    }\n  ]\n}`}
            className="w-full px-3 py-2.5 rounded-xl border border-sage-200 text-xs text-sage-800 placeholder-sage-300 focus:outline-none focus:border-sage-400 bg-sage-50 resize-none font-mono leading-relaxed"
            autoFocus
          />

          {/* Error */}
          {error && (
            <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          {/* Warning */}
          <p className="text-xs text-sage-400">
            This will <span className="font-medium text-sage-600">replace</span> all existing entries for the selected day.
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-sage-200 text-sm font-medium text-sage-600 hover:bg-sage-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!raw.trim()}
              className="flex-1 py-2.5 rounded-xl bg-sage-500 hover:bg-sage-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

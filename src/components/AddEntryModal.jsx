import { useState } from 'react'
import { ENTRY_META } from '../data/mockData'

const TYPES = [
  { value: 'wake-up', label: 'Wake Up' },
  { value: 'meal',    label: 'Meal' },
  { value: 'exercise', label: 'Exercise' },
  { value: 'other',  label: 'Other' },
]

export default function AddEntryModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    type: 'meal',
    label: '',
    time: '',
    plan: '',
  })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.label.trim()) return
    onAdd({
      id: crypto.randomUUID(),
      type: form.type,
      label: form.label.trim(),
      time: form.time,
      plan: form.plan.trim(),
      actual: '',
      followed: false,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-sage-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-sage-800">Add Entry</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-sage-400 hover:bg-sage-100 hover:text-sage-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {/* Type selector */}
          <div>
            <label className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-2 block">Type</label>
            <div className="grid grid-cols-4 gap-2">
              {TYPES.map(({ value, label }) => {
                const meta = ENTRY_META[value]
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set('type', value)}
                    className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border text-xs font-medium transition-colors
                      ${form.type === value
                        ? 'border-sage-400 bg-sage-50 text-sage-700'
                        : 'border-sage-100 bg-white text-sage-500 hover:border-sage-200'
                      }`}
                  >
                    <span className="text-base">{meta.icon}</span>
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Label + Time row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-1.5 block">Name</label>
              <input
                type="text"
                placeholder="e.g. Lunch"
                value={form.label}
                onChange={(e) => set('label', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-sage-200 text-sm text-sage-800 placeholder-sage-300 focus:outline-none focus:border-sage-400 bg-sage-50"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-1.5 block">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => set('time', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-sage-200 text-sm text-sage-800 focus:outline-none focus:border-sage-400 bg-sage-50"
              />
            </div>
          </div>

          {/* Plan */}
          <div>
            <label className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-1.5 block">Plan</label>
            <textarea
              rows={3}
              placeholder="What are you planning?"
              value={form.plan}
              onChange={(e) => set('plan', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sage-200 text-sm text-sage-800 placeholder-sage-300 focus:outline-none focus:border-sage-400 bg-sage-50 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-sage-200 text-sm font-medium text-sage-600 hover:bg-sage-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-sage-500 hover:bg-sage-600 text-white text-sm font-medium transition-colors"
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

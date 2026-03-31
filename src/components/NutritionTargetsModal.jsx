import { useState } from 'react'

const DEFAULT = { calories: 2200, protein: 150, carbs: 250 }

export default function NutritionTargetsModal({ current, yesterdayTargets, onSave, onClose }) {
  const initial = current ?? DEFAULT
  const [form, setForm] = useState({
    calories: String(initial.calories),
    protein:  String(initial.protein),
    carbs:    String(initial.carbs),
  })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const toNumbers = (f) => ({
    calories: Math.max(0, parseInt(f.calories, 10) || 0),
    protein:  Math.max(0, parseInt(f.protein,  10) || 0),
    carbs:    Math.max(0, parseInt(f.carbs,    10) || 0),
  })

  const handleSave = () => {
    onSave(toNumbers(form))
    onClose()
  }

  const handleCopyYesterday = () => {
    const t = yesterdayTargets ?? DEFAULT
    onSave(t)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-sage-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-sage-800">Daily Nutrition Targets</h2>
            <p className="text-xs text-sage-400 mt-0.5">Set goals for today</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-sage-400 hover:bg-sage-100 hover:text-sage-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Inputs */}
          {[
            { key: 'calories', label: 'Calories', unit: 'kcal', color: 'text-amber-500' },
            { key: 'protein',  label: 'Protein',  unit: 'g',    color: 'text-sage-500' },
            { key: 'carbs',    label: 'Carbs',    unit: 'g',    color: 'text-sky-500'  },
          ].map(({ key, label, unit, color }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5 block">
                <span className={color}>●</span> {label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-sage-200 text-sm text-sage-800 focus:outline-none focus:border-sage-400 bg-sage-50"
                />
                <span className="text-xs text-sage-400 w-8">{unit}</span>
              </div>
            </div>
          ))}

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-xl bg-sage-500 hover:bg-sage-600 text-white text-sm font-medium transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCopyYesterday}
              disabled={!yesterdayTargets}
              className="w-full py-2.5 rounded-xl border border-sage-200 text-sm font-medium text-sage-600 hover:bg-sage-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title={yesterdayTargets ? 'Copy targets from yesterday' : 'No targets set for yesterday'}
            >
              Copy from yesterday
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

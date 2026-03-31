import { useState } from 'react'
import NutritionTargetsModal from './NutritionTargetsModal'

function StatBar({ label, planned, actual, unit, color }) {
  const pct = planned > 0 ? Math.min((actual / planned) * 100, 100) : 0
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-xs text-sage-500">{label}</span>
        <span className="text-xs text-sage-600">
          <span className="font-semibold text-sage-800">{actual}</span>
          <span className="text-sage-400"> / {planned} {unit}</span>
        </span>
      </div>
      <div className="h-1.5 bg-sage-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, icon }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100 flex flex-col gap-1">
      <span className="text-lg">{icon}</span>
      <span className="text-2xl font-bold text-sage-800">{value}</span>
      <span className="text-xs font-medium text-sage-700">{label}</span>
      {sub && <span className="text-[11px] text-sage-400">{sub}</span>}
    </div>
  )
}

export default function Dashboard({ stats, targets, yesterdayTargets, onSaveTargets }) {
  const { calories, protein, carbs, consistency, streak } = stats
  const [showTargets, setShowTargets] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="🔥" label="Consistency" value={`${consistency}%`} sub="this month" />
        <StatCard icon="⚡" label="Streak"       value={`${streak}d`}      sub="keep it up!" />
      </div>

      {/* Nutrition bars */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-sage-600 uppercase tracking-wide">Today's Nutrition</span>
          <button
            onClick={() => setShowTargets(true)}
            className="w-6 h-6 flex items-center justify-center rounded-full text-sage-400 hover:bg-sage-100 hover:text-sage-600 transition-colors"
            title="Set nutrition targets"
          >
            ⚙
          </button>
        </div>
        <StatBar label="Calories" planned={calories.planned} actual={calories.actual} unit="kcal" color="bg-amber-400" />
        <StatBar label="Protein"  planned={protein.planned}  actual={protein.actual}  unit="g"    color="bg-sage-400" />
        <StatBar label="Carbs"    planned={carbs.planned}    actual={carbs.actual}    unit="g"    color="bg-sky-400" />
      </div>

      {showTargets && (
        <NutritionTargetsModal
          current={targets}
          yesterdayTargets={yesterdayTargets}
          onSave={onSaveTargets}
          onClose={() => setShowTargets(false)}
        />
      )}
    </div>
  )
}

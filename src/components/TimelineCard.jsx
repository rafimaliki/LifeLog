import { ENTRY_META } from '../data/mockData'

export default function TimelineCard({ entry }) {
  const meta = ENTRY_META[entry.type] ?? ENTRY_META.other
  const hasActual = entry.actual.trim().length > 0

  return (
    <div className={`rounded-2xl border p-4 ${meta.color} transition-shadow hover:shadow-md`}>
      {/* Card header */}
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-base leading-none">{meta.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-sage-800">{entry.label}</span>
          <span className="ml-2 text-xs text-sage-400">{entry.time}</span>
        </div>
        {/* Followed badge */}
        <label className="flex items-center gap-1.5 cursor-pointer group">
          <div className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-colors
            ${entry.followed
              ? 'bg-sage-500 border-sage-500'
              : 'bg-white border-sage-300 group-hover:border-sage-400'
            }`}
          >
            {entry.followed && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-xs text-sage-500">Followed</span>
        </label>
      </div>

      {/* Plan / Actual columns */}
      <div className="grid grid-cols-2 gap-3">
        {/* Plan */}
        <div className="bg-white/70 rounded-xl p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-sage-400 mb-1.5">Plan</p>
          {entry.plan ? (
            <p className="text-xs text-sage-700 leading-relaxed">{entry.plan}</p>
          ) : (
            <p className="text-xs text-sage-300 italic">No plan yet</p>
          )}
        </div>

        {/* Actual */}
        <div className={`rounded-xl p-3 ${hasActual ? 'bg-white/70' : 'bg-white/40'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-sage-400 mb-1.5">Actual</p>
          {hasActual ? (
            <p className="text-xs text-sage-700 leading-relaxed">{entry.actual}</p>
          ) : (
            <p className="text-xs text-sage-300 italic">Not filled yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

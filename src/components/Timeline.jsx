export default function Timeline({ date, entries }) {
  const label = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col h-full">
      {/* Date heading */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-sage-800">{label}</h2>
        <p className="text-sm text-sage-400 mt-0.5">Plan your day and track what actually happened</p>
      </div>

      {/* Empty state */}
      {entries.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <div className="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center text-2xl mb-4">
            🌿
          </div>
          <p className="text-sage-600 font-medium">No entries yet</p>
          <p className="text-sage-400 text-sm mt-1">Add your first plan for the day</p>
          <button className="mt-5 px-5 py-2.5 bg-sage-500 hover:bg-sage-600 text-white text-sm font-medium rounded-xl transition-colors">
            + Add Entry
          </button>
        </div>
      )}

      {/* Entry list */}
      {entries.length > 0 && (
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">
          {entries.map((entry, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100"
            >
              <p className="text-sm font-medium text-sage-700">{entry.label}</p>
            </div>
          ))}
          <button className="mt-1 px-5 py-2.5 bg-sage-100 hover:bg-sage-200 text-sage-700 text-sm font-medium rounded-xl transition-colors self-start">
            + Add Entry
          </button>
        </div>
      )}
    </div>
  )
}

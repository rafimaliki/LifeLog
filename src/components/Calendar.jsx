const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function Calendar({ selectedDate, onSelectDate }) {
  const today = new Date()
  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prevMonth = () => onSelectDate(new Date(year, month - 1, 1))
  const nextMonth = () => onSelectDate(new Date(year, month + 1, 1))

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isToday = (d) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const isSelected = (d) =>
    d === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-sage-100 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-sage-100 text-sage-500 transition-colors"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-sage-800">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-sage-100 text-sage-500 transition-colors"
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-sage-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((d, i) => (
          <div key={i} className="flex items-center justify-center">
            {d ? (
              <button
                onClick={() => onSelectDate(new Date(year, month, d))}
                className={`w-7 h-7 text-xs rounded-full transition-colors font-medium
                  ${isSelected(d)
                    ? 'bg-sage-500 text-white'
                    : isToday(d)
                    ? 'bg-sage-100 text-sage-700 font-semibold'
                    : 'text-sage-700 hover:bg-sage-100'
                  }`}
              >
                {d}
              </button>
            ) : null}
          </div>
        ))}
      </div>

      {/* Today button */}
      <div className="mt-3 text-center">
        <button
          onClick={() => onSelectDate(new Date())}
          className="text-xs text-sage-500 hover:text-sage-700 transition-colors"
        >
          Today
        </button>
      </div>
    </div>
  )
}

/**
 * Parse a number from a string containing digits (e.g. "450 kcal" → 450).
 * Returns 0 if no number found.
 */
function parseNum(str, keywords) {
  if (!str) return 0
  const lower = str.toLowerCase()
  for (const kw of keywords) {
    const re = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*${kw}`)
    const match = lower.match(re)
    if (match) return parseFloat(match[1])
  }
  return 0
}

function extractNutrition(text) {
  return {
    calories: parseNum(text, ['kcal', 'cal', 'calories']),
    protein:  parseNum(text, ['g protein', 'protein']),
    carbs:    parseNum(text, ['g carbs', 'g carb', 'carbs', 'carb']),
  }
}

/**
 * Compute dashboard stats from all stored data.
 * @param {Object} data  - { [dateKey]: Entry[] }
 * @param {string} today - 'YYYY-MM-DD'
 */
export function computeStats(data, today) {
  const todayEntries = data[today] ?? []

  // Today's nutrition from meal entries
  const plannedNutrition = { calories: 0, protein: 0, carbs: 0 }
  const actualNutrition  = { calories: 0, protein: 0, carbs: 0 }

  for (const e of todayEntries) {
    if (e.type !== 'meal') continue
    const p = extractNutrition(e.plan)
    const a = extractNutrition(e.actual)
    plannedNutrition.calories += p.calories
    plannedNutrition.protein  += p.protein
    plannedNutrition.carbs    += p.carbs
    actualNutrition.calories  += a.calories
    actualNutrition.protein   += a.protein
    actualNutrition.carbs     += a.carbs
  }

  // Consistency = % of days that have at least one entry where all entries are followed
  const allKeys = Object.keys(data).sort()
  const daysWithEntries = allKeys.filter((k) => (data[k] ?? []).length > 0)
  const daysFollowed = daysWithEntries.filter((k) => {
    const entries = data[k]
    return entries.length > 0 && entries.every((e) => e.followed)
  })
  const consistency = daysWithEntries.length > 0
    ? Math.round((daysFollowed.length / daysWithEntries.length) * 100)
    : 0

  // Streak = consecutive days up to and including today that have ≥1 followed entry
  let streak = 0
  const todayMs = new Date(today).getTime()
  for (let i = 0; ; i++) {
    const d = new Date(todayMs - i * 86400000)
    const y = d.getFullYear()
    const mo = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const key = `${y}-${mo}-${day}`
    const entries = data[key] ?? []
    if (entries.length === 0 || !entries.some((e) => e.followed)) break
    streak++
  }

  return {
    calories: { planned: plannedNutrition.calories || 2200, actual: actualNutrition.calories },
    protein:  { planned: plannedNutrition.protein  || 150,  actual: actualNutrition.protein  },
    carbs:    { planned: plannedNutrition.carbs    || 250,  actual: actualNutrition.carbs    },
    consistency,
    streak,
  }
}

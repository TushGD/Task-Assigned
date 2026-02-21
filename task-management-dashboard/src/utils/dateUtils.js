/**
 * Returns true if the given date string is strictly in the past (before today).
 * @param {string} dueDate — ISO date string e.g. "2025-03-01"
 */
export function isOverdue(dueDate) {
  if (!dueDate) return false
  return new Date(dueDate) < new Date(new Date().toDateString())
}

/**
 * Returns true if the task is due within the next `days` days (inclusive of today).
 * @param {string} dueDate
 * @param {number} days — default 3
 */
export function isDueSoon(dueDate, days = 3) {
  if (!dueDate) return false
  const target = new Date(dueDate)
  const now    = new Date()
  const diffMs = target - now
  const diffDays = diffMs / 86_400_000
  return diffDays >= 0 && diffDays <= days
}

/**
 * Format a date string to a human-readable short form.
 * @param {string} dueDate
 * @returns {string}
 */
export function formatDate(dueDate) {
  if (!dueDate) return ''
  const [year, month, day] = dueDate.split('-')
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`
}

import { STORAGE_KEY } from '../data/constants'
import { SEED_TASKS }  from '../data/seedData'

/**
 * Load tasks from localStorage.
 * Falls back to seed data if nothing is stored or data is corrupted.
 */
export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (err) {
    console.warn('[storage] Failed to load tasks:', err)
  }
  return SEED_TASKS
}

/**
 * Persist tasks array to localStorage.
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (err) {
    console.warn('[storage] Failed to save tasks:', err)
  }
}

/**
 * Clear all task data from localStorage.
 */
export function clearTasks() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.warn('[storage] Failed to clear tasks:', err)
  }
}

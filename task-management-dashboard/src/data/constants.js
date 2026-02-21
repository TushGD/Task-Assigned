// ── Column definitions ──────────────────────────────────
export const COLUMNS = [
  { id: 'todo',        label: 'To Do',       accent: '#4f8ef7' },
  { id: 'inprogress',  label: 'In Progress',  accent: '#f7c94f' },
  { id: 'done',        label: 'Done',         accent: '#4fcf7a' },
]

// ── Priority definitions ────────────────────────────────
export const PRIORITIES = ['high', 'medium', 'low']

export const PRIORITY_COLOR = {
  high:   '#ff4f4f',
  medium: '#f7c94f',
  low:    '#4fcf7a',
}

// ── LocalStorage key ────────────────────────────────────
export const STORAGE_KEY = 'taskboard_v1'

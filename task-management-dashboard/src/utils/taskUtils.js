/**
 * Move a task to a new column (status).
 * Returns a new tasks array with the task's status updated.
 * @param {Array}  tasks
 * @param {string} taskId
 * @param {string} newStatus
 * @returns {Array}
 */
export function moveTask(tasks, taskId, newStatus) {
  return tasks.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
}

/**
 * Filter tasks by search query and priority.
 * @param {Array}  tasks
 * @param {string} query
 * @param {string} priority — "all" | "high" | "medium" | "low"
 * @returns {Array}
 */
export function filterTasks(tasks, query = '', priority = 'all') {
  const q = query.toLowerCase().trim()
  return tasks.filter(task => {
    const matchSearch =
      !q ||
      task.title.toLowerCase().includes(q) ||
      (task.description || '').toLowerCase().includes(q)

    const matchPriority = priority === 'all' || task.priority === priority

    return matchSearch && matchPriority
  })
}

/**
 * Sort tasks by creation date descending (newest first).
 * @param {Array} tasks
 * @returns {Array}
 */
export function sortByCreated(tasks) {
  return [...tasks].sort((a, b) => b.createdAt - a.createdAt)
}

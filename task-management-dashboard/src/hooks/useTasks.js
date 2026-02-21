import { useState, useEffect, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { loadTasks, saveTasks }        from '../utils/storage'
import { moveTask, filterTasks }       from '../utils/taskUtils'

/**
 * Central hook for all task state and operations.
 */
export function useTasks() {
  const [tasks,          setTasks]          = useState(loadTasks)
  const [search,         setSearch]         = useState('')
  const [filterPriority, setFilterPriority] = useState('all')

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // ── CRUD ─────────────────────────────────────────────
  const addTask = useCallback((data) => {
    const task = {
      id:          uuid(),
      title:       data.title.trim(),
      description: data.description?.trim() || '',
      status:      data.status      || 'todo',
      priority:    data.priority    || 'medium',
      dueDate:     data.dueDate     || '',
      createdAt:   Date.now(),
    }
    setTasks(prev => [task, ...prev])
    return task
  }, [])

  const updateTask = useCallback((id, updates) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates, updatedAt: Date.now() } : t))
    )
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  const moveTaskToColumn = useCallback((taskId, newStatus) => {
    setTasks(prev => moveTask(prev, taskId, newStatus))
  }, [])

  const clearDone = useCallback(() => {
    setTasks(prev => prev.filter(t => t.status !== 'done'))
  }, [])

  // ── Derived filtered list ──────────────────────────
  const filteredTasks = filterTasks(tasks, search, filterPriority)

  const tasksFor = useCallback(
    (colId) => filteredTasks.filter(t => t.status === colId),
    [filteredTasks]
  )

  return {
    tasks,
    filteredTasks,
    tasksFor,
    search,
    setSearch,
    filterPriority,
    setFilterPriority,
    addTask,
    updateTask,
    deleteTask,
    moveTaskToColumn,
    clearDone,
  }
}

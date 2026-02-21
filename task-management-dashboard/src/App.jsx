import { useState, useCallback } from 'react'
import Header        from './components/Header'
import Dashboard     from './components/Dashboard'
import TaskForm      from './components/TaskForm'
import ConfirmDialog from './components/ConfirmDialog'
import Toast         from './components/Toast'
import { useTasks }    from './hooks/useTasks'
import { useToasts }   from './hooks/useToasts'
import { useDragDrop } from './hooks/useDragDrop'

/**
 * Root application component.
 * Owns all shared modal/dialog state and wires hooks together.
 */
export default function App() {
  const {
    tasks,
    tasksFor,
    search,      setSearch,
    filterPriority, setFilterPriority,
    addTask,
    updateTask,
    deleteTask,
    moveTaskToColumn,
    clearDone,
  } = useTasks()

  const { toasts, addToast, removeToast } = useToasts()

  // ── Modal state ───────────────────────────────────────
  // formState: null | { mode: 'new' } | { mode: 'edit', task: Task }
  const [formState,   setFormState]   = useState(null)
  // confirmState: null | { id: string }
  const [confirmState, setConfirmState] = useState(null)

  // ── Drag & Drop ───────────────────────────────────────
  const handleDropped = useCallback((taskId, _fromCol, toCol) => {
    moveTaskToColumn(taskId, toCol)
    const label = { todo: 'To Do', inprogress: 'In Progress', done: 'Done' }[toCol]
    addToast(`Moved to ${label}`, '#4f8ef7')
  }, [moveTaskToColumn, addToast])

  const { handleDragStart, handleDragOver, handleDrop, handleDragEnd, isOver } = useDragDrop(handleDropped)

  // ── CRUD handlers ────────────────────────────────────
  const handleSave = data => {
    if (formState?.mode === 'edit') {
      updateTask(formState.task.id, data)
      addToast('Task updated', '#4f8ef7')
    } else {
      addTask(data)
      addToast('Task created', '#4fcf7a')
    }
    setFormState(null)
  }

  const handleDeleteRequest = id => setConfirmState({ id })

  const handleDeleteConfirmed = () => {
    deleteTask(confirmState.id)
    addToast('Task deleted', '#ff4f4f')
    setConfirmState(null)
  }

  const handleClearDone = () => {
    if (!tasks.filter(t => t.status === 'done').length) {
      addToast('No completed tasks to clear', '#888')
      return
    }
    setConfirmState({ id: '__clearDone__' })
  }

  const handleConfirm = () => {
    if (confirmState?.id === '__clearDone__') {
      clearDone()
      addToast('Completed tasks cleared', '#f7c94f')
      setConfirmState(null)
    } else {
      handleDeleteConfirmed()
    }
  }

  return (
    <div onDragEnd={handleDragEnd}>
      <Header
        totalCount={tasks.length}
        search={search}
        onSearchChange={setSearch}
        filterPriority={filterPriority}
        onFilterChange={setFilterPriority}
        onNewTask={() => setFormState({ mode: 'new' })}
        onClearDone={handleClearDone}
      />

      <Dashboard
        tasksFor={tasksFor}
        onEdit={task => setFormState({ mode: 'edit', task })}
        onDelete={handleDeleteRequest}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        isOver={isOver}
      />

      {/* Task create / edit modal */}
      {formState && (
        <TaskForm
          initial={formState.mode === 'edit' ? formState.task : null}
          onSave={handleSave}
          onClose={() => setFormState(null)}
        />
      )}

      {/* Delete / clear-done confirmation */}
      {confirmState && (
        <ConfirmDialog
          message={
            confirmState.id === '__clearDone__'
              ? 'Remove all completed tasks? This cannot be undone.'
              : 'Delete this task? This cannot be undone.'
          }
          onConfirm={handleConfirm}
          onCancel={() => setConfirmState(null)}
        />
      )}

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

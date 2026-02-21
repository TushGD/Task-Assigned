import { useState } from 'react'
import { PRIORITIES, COLUMNS } from '../data/constants'
import styles from './TaskForm.module.css'

const EMPTY_FORM = {
  title:       '',
  description: '',
  priority:    'medium',
  status:      'todo',
  dueDate:     '',
}

/**
 * Modal form for creating or editing a task.
 * @prop {Object|null} initial — pre-populated task for edit mode; null for new
 * @prop {Function}    onSave  — called with form data object
 * @prop {Function}    onClose — called to dismiss modal
 */
export default function TaskForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(() => initial ? { ...initial } : { ...EMPTY_FORM })
  const [errors, setErrors] = useState({})

  const set = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave(form)
  }

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label="Task form">
      <div className={styles.modal}>
        {/* Modal header */}
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>
            {initial ? 'Edit Task' : 'New Task'}
          </span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Title */}
        <label className={styles.field}>
          <span className={styles.label}>Title *</span>
          <input
            value={form.title}
            onChange={set('title')}
            placeholder="What needs to be done?"
            autoFocus
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </label>

        {/* Description */}
        <label className={styles.field}>
          <span className={styles.label}>Description</span>
          <textarea
            value={form.description}
            onChange={set('description')}
            placeholder="Optional details…"
            rows={3}
          />
        </label>

        {/* Priority + Status row */}
        <div className={styles.fieldRow}>
          <label className={styles.field}>
            <span className={styles.label}>Priority</span>
            <select value={form.priority} onChange={set('priority')}>
              {PRIORITIES.map(p => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Column</span>
            <select value={form.status} onChange={set('status')}>
              {COLUMNS.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Due date */}
        <label className={styles.field}>
          <span className={styles.label}>Due Date</span>
          <input type="date" value={form.dueDate} onChange={set('dueDate')} />
        </label>

        {/* Actions */}
        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn}   onClick={handleSubmit}>
            {initial ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  )
}

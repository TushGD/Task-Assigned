import { PRIORITY_COLOR } from '../data/constants'
import { isOverdue, isDueSoon, formatDate } from '../utils/dateUtils'
import styles from './TaskCard.module.css'

/**
 * Individual task card displayed inside a Column.
 * Supports drag-and-drop via HTML5 draggable attribute.
 */
export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
  const pColor  = PRIORITY_COLOR[task.priority] || '#888'
  const overdue = isOverdue(task.dueDate)
  const soon    = isDueSoon(task.dueDate)

  const dateColor = overdue ? 'var(--accent-red)' : soon ? 'var(--accent-yellow)' : 'var(--text-dim)'

  return (
    <div
      className={styles.card}
      style={{ borderLeftColor: pColor }}
      draggable
      onDragStart={() => onDragStart(task.id)}
      title="Drag to move"
    >
      {/* Header row */}
      <div className={styles.cardHeader}>
        <span className={styles.dragHandle} aria-hidden="true">⠿</span>

        <span className={styles.taskTitle}>{task.title}</span>

        <div className={styles.cardActions}>
          <button
            className={styles.iconBtn}
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            ✎
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => onDelete(task.id)}
            title="Delete task"
            aria-label="Delete task"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className={styles.description}>
          {task.description.length > 90
            ? task.description.slice(0, 90) + '…'
            : task.description}
        </p>
      )}

      {/* Footer row */}
      <div className={styles.cardFooter}>
        <span
          className={styles.priorityBadge}
          style={{ background: pColor + '22', color: pColor }}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className={styles.dueDate} style={{ color: dateColor }}>
            {overdue && '⚠ '}
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  )
}

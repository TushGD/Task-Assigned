import styles from './Toast.module.css'

/**
 * Toast notification container.
 * Renders a stack of dismissible notification pills.
 */
export default function Toast({ toasts, onRemove }) {
  if (!toasts.length) return null

  return (
    <div className={styles.container} aria-live="polite">
      {toasts.map(t => (
        <div
          key={t.id}
          className={styles.toast}
          style={{ borderLeftColor: t.color }}
          onClick={() => onRemove(t.id)}
          role="status"
        >
          {t.msg}
        </div>
      ))}
    </div>
  )
}

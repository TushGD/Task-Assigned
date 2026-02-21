import TaskCard from './TaskCard'
import styles from './Column.module.css'

/**
 * A Kanban column — Droppable container for TaskCards.
 */
export default function Column({
  col,
  tasks,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  isOver,
}) {
  return (
    <div
      className={`${styles.column} ${isOver ? styles.columnOver : ''}`}
      style={{ '--col-accent': col.accent }}
      onDragOver={e => { e.preventDefault(); onDragOver(col.id) }}
      onDrop={() => onDrop(col.id)}
    >
      {/* Column header */}
      <div className={styles.columnHeader}>
        <div className={styles.columnLabel}>
          <span className={styles.dot} />
          <span className={styles.labelText}>{col.label}</span>
        </div>
        <span className={styles.count}>{tasks.length}</span>
      </div>

      {/* Task list */}
      <div className={styles.taskList}>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onDragStart={id => onDragStart(id, col.id)}
          />
        ))}

        {/* Drop zone hint */}
        {isOver && (
          <div className={styles.dropZone}>
            Drop here
          </div>
        )}

        {/* Empty state */}
        {tasks.length === 0 && !isOver && (
          <div className={styles.emptyState}>
            No tasks
          </div>
        )}
      </div>
    </div>
  )
}

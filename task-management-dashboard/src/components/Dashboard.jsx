import Column from './Column'
import { COLUMNS } from '../data/constants'
import styles from './Dashboard.module.css'

/**
 * Main board: renders all Kanban columns side by side.
 */
export default function Dashboard({
  tasksFor,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  isOver,
}) {
  return (
    <main className={`${styles.board} board-grid`}>
      {COLUMNS.map(col => (
        <Column
          key={col.id}
          col={col}
          tasks={tasksFor(col.id)}
          onEdit={onEdit}
          onDelete={onDelete}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          isOver={isOver(col.id)}
        />
      ))}
    </main>
  )
}

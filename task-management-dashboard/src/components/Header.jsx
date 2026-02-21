import styles from './Header.module.css'
import { PRIORITIES } from '../data/constants'

/**
 * Top navigation bar: title, search, priority filter, action buttons.
 */
export default function Header({
  totalCount,
  search,
  onSearchChange,
  filterPriority,
  onFilterChange,
  onNewTask,
  onClearDone,
}) {
  return (
    <header className={styles.header}>
      {/* Brand */}
      <div className={styles.brand}>
        <h1 className={styles.title}>TASKBOARD</h1>
        <span className={styles.subtitle}>{totalCount} tasks tracked</span>
      </div>

      {/* Controls */}
      <div className={`${styles.controls} header-actions`}>
        <input
          type="text"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search tasks…"
          className={styles.searchInput}
          aria-label="Search tasks"
        />

        <select
          value={filterPriority}
          onChange={e => onFilterChange(e.target.value)}
          className={styles.prioritySelect}
          aria-label="Filter by priority"
        >
          <option value="all">All priorities</option>
          {PRIORITIES.map(p => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={onClearDone}>
            Clear Done
          </button>
          <button className={styles.btnPrimary} onClick={onNewTask}>
            + New Task
          </button>
        </div>
      </div>
    </header>
  )
}

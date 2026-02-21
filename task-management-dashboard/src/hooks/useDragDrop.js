import { useState, useCallback } from 'react'

/**
 * Hook that manages HTML5 drag-and-drop state.
 * @param {Function} onDrop — called with (taskId, fromCol, toCol)
 */
export function useDragDrop(onDrop) {
  const [dragging, setDragging] = useState(null) // { taskId, fromCol }
  const [overCol,  setOverCol]  = useState(null)

  const handleDragStart = useCallback((taskId, fromCol) => {
    setDragging({ taskId, fromCol })
  }, [])

  const handleDragOver = useCallback((colId) => {
    setOverCol(colId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDragging(null)
    setOverCol(null)
  }, [])

  const handleDrop = useCallback((toCol) => {
    if (dragging && dragging.fromCol !== toCol) {
      onDrop(dragging.taskId, dragging.fromCol, toCol)
    }
    setDragging(null)
    setOverCol(null)
  }, [dragging, onDrop])

  const isOver = useCallback(
    (colId) => overCol === colId && dragging?.fromCol !== colId,
    [overCol, dragging]
  )

  return {
    dragging,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    isOver,
  }
}

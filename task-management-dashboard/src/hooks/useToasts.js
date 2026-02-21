import { useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'

const DEFAULT_DURATION = 3000

/**
 * Hook for managing a toast notification queue.
 * @returns {{ toasts, addToast, removeToast }}
 */
export function useToasts() {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback((msg, color = '#4f8ef7', duration = DEFAULT_DURATION) => {
    const id = uuid()
    setToasts(prev => [...prev, { id, msg, color }])
    setTimeout(() => removeToast(id), duration)
    return id
  }, [removeToast])

  return { toasts, addToast, removeToast }
}

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ToastContextType {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} })

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-2xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium shadow-xl whitespace-nowrap"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

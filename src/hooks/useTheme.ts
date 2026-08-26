import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import type { Theme } from '../types/portfolio'

const THEME_STORAGE_KEY = 'portfolio-theme'

interface ThemeToggleEvent {
  clientX?: number
  clientY?: number
  currentTarget?: EventTarget | null
}

interface ViewTransitionHandle {
  finished: Promise<void>
  ready: Promise<void>
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransitionHandle
}

function getInitialTheme(): Theme {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const isTransitioningRef = useRef(false)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback((event?: ThemeToggleEvent) => {
    if (isTransitioningRef.current) return

    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const viewTransitionDocument = document as ViewTransitionDocument
    const button = event?.currentTarget instanceof HTMLElement
      ? event.currentTarget
      : null
    const buttonBounds = button?.getBoundingClientRect()
    const hasPointerPosition = Boolean(event?.clientX || event?.clientY)
    const originX = hasPointerPosition
      ? event?.clientX ?? window.innerWidth / 2
      : buttonBounds?.left !== undefined
        ? buttonBounds.left + buttonBounds.width / 2
        : window.innerWidth / 2
    const originY = hasPointerPosition
      ? event?.clientY ?? 0
      : buttonBounds?.top !== undefined
        ? buttonBounds.top + buttonBounds.height / 2
        : 0
    const radius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY),
    )

    root.style.setProperty('--theme-transition-x', `${originX}px`)
    root.style.setProperty('--theme-transition-y', `${originY}px`)
    root.style.setProperty('--theme-transition-radius', `${radius}px`)

    if (!viewTransitionDocument.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    isTransitioningRef.current = true

    try {
      const transition = viewTransitionDocument.startViewTransition(() => {
        root.dataset.themeTransitioning = 'true'
        flushSync(() => setTheme(nextTheme))
      })
      const clearTransitionStyles = () => {
        delete root.dataset.themeTransitioning
      }
      const unlockThemeToggle = () => {
        isTransitioningRef.current = false
      }

      transition.ready.then(clearTransitionStyles, clearTransitionStyles)
      transition.finished.then(unlockThemeToggle, unlockThemeToggle)
    } catch {
      delete root.dataset.themeTransitioning
      isTransitioningRef.current = false
      setTheme(nextTheme)
    }
  }, [theme])

  return { theme, toggleTheme }
}

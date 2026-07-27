import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (options.once !== false) {
          observer.disconnect()
        }
      } else if (options.once === false) {
        setInView(false)
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
    })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

export function useCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const [started, setStarted] = useState(false)

  const startCounter = () => {
    if (started) return
    setStarted(true)
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(start + (end - start) * eased))
      if (progress >= 1) clearInterval(timer)
    }, 16)
  }

  return [count, startCounter]
}

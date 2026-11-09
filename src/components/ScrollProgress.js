import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (windowHeight > 0) {
        const scrollPct = (totalScroll / windowHeight) * 100
        setProgress(Math.min(100, Math.max(0, scrollPct)))
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="scroll-progress-bar"
      role="progressbar"
      aria-label="Progreso de lectura de la página"
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  )
}

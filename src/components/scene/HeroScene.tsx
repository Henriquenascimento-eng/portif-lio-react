import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { StaticCar } from './StaticCar'

// A cena 3D (three.js) fica num pacote separado, baixado só depois que a página já está pronta.
const Scene3D = lazy(() => import('./Scene3D'))

function canRunScene() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return !matchMedia('(prefers-reduced-motion: reduce)').matches && !connection?.saveData
}

export function HeroScene() {
  const box = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const element = box.current
    if (!element || !canRunScene()) return
    let timer: number | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      timer = window.setTimeout(() => setReady(true), 1500)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={box} className="h-72 w-full md:h-96" data-testid="hero-scene">
      {ready ? (
        <Suspense fallback={<StaticCar />}>
          <Scene3D />
        </Suspense>
      ) : (
        <StaticCar />
      )}
    </div>
  )
}

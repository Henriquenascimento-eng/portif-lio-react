import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { StaticCar } from './StaticCar'

// A cena 3D (three.js) fica num pacote separado, baixado só quando a pessoa interage com a página.
const Scene3D = lazy(() => import('./Scene3D'))

const INTERACTIONS = ['pointermove', 'pointerdown', 'scroll', 'keydown'] as const

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
    // Duas condições: a área do carro está na tela E a pessoa já mexeu na página.
    // Assim a primeira carga fica leve (o three.js é o maior pacote do site).
    let visible = false
    let interacted = false
    const tryStart = () => {
      if (visible && interacted) setReady(true)
    }
    const onInteract = () => {
      interacted = true
      INTERACTIONS.forEach((name) => window.removeEventListener(name, onInteract))
      tryStart()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      tryStart()
    })
    observer.observe(element)
    INTERACTIONS.forEach((name) => window.addEventListener(name, onInteract, { passive: true }))
    return () => {
      observer.disconnect()
      INTERACTIONS.forEach((name) => window.removeEventListener(name, onInteract))
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

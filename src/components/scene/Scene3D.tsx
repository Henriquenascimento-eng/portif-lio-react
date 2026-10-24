import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'

const TREES: Array<[number, number]> = [
  [-2.6, -1.4],
  [2.4, -2],
  [-1.8, 2.2],
  [2.9, 1.6],
]

function Car() {
  const root = useRef<Group>(null)
  const wheels = useRef<Array<Group | null>>([])
  const scroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state, delta) => {
    const car = root.current
    if (!car) return
    // O carro vira para onde o mouse está e dá uma volta extra conforme a página rola.
    const target = 0.5 + state.pointer.x * 0.9 + Math.min(scroll.current / 500, 1) * 1.4
    car.rotation.y += (target - car.rotation.y) * Math.min(1, delta * 4)
    car.position.y = 0.04 + Math.sin(state.clock.elapsedTime * 2.2) * 0.025
    const spin = delta * (3 + Math.abs(state.pointer.x) * 8)
    wheels.current.forEach((wheel) => {
      if (wheel) wheel.rotation.z -= spin
    })
  })

  const wheelSpots: Array<[number, number]> = [
    [0.85, 0.62],
    [0.85, -0.62],
    [-0.85, 0.62],
    [-0.85, -0.62],
  ]

  return (
    <group ref={root}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.4, 0.55, 1.2]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
      <mesh position={[-0.15, 1, 0]}>
        <boxGeometry args={[1.25, 0.5, 1]} />
        <meshStandardMaterial color="#e6eaf7" />
      </mesh>
      <mesh position={[0.2, 0.79, 0]}>
        <boxGeometry args={[0.35, 0.04, 1.22]} />
        <meshStandardMaterial color="#16f2b3" />
      </mesh>
      {wheelSpots.map(([x, z], i) => (
        <group
          key={i}
          position={[x, 0.32, z]}
          ref={(node) => {
            wheels.current[i] = node
          }}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.26, 16]} />
            <meshStandardMaterial color="#2b2540" />
          </mesh>
          <mesh position={[0, 0, z > 0 ? 0.14 : -0.14]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.05, 12]} />
            <meshStandardMaterial color="#16f2b3" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [5, 3.2, 5.6], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 3]} intensity={1.8} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[4.2, 48]} />
        <meshStandardMaterial color="#172042" />
      </mesh>
      {TREES.map(([x, z]) => (
        <group key={`${x}${z}`} position={[x, 0, z]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.1, 0.14, 0.6, 6]} />
            <meshStandardMaterial color="#243063" />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <coneGeometry args={[0.55, 1.4, 7]} />
            <meshStandardMaterial color="#0fbf8c" />
          </mesh>
        </group>
      ))}
      <Car />
    </Canvas>
  )
}

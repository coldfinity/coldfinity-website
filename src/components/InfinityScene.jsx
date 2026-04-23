import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// Lemniscate of Bernoulli — 3D infinity curve with a gentle Z-twist
class LemniscateCurve extends THREE.Curve {
  getPoint(t, out = new THREE.Vector3()) {
    const a = t * Math.PI * 2
    const denom = 1 + Math.sin(a) ** 2
    return out.set(
      2.6 * Math.cos(a) / denom,
      2.6 * Math.sin(a) * Math.cos(a) / denom,
      0.55 * Math.sin(a * 2),
    )
  }
}

// Camera positions — each anchored to a different orbit around the infinity
const ORBITS = [
  [0,    0.4,  9  ],   // 0 Hero     — front, full view
  [-6.5, 2.8,  5.5],   // 1 About    — left loop, elevated
  [0,    8.5,  2  ],   // 2 Projects — top-down
  [6.5,  2.8,  5.5],   // 3 Skills   — right loop, elevated
  [0,   -2.2,  9  ],   // 4 Contact  — front-low
]

function InfinityTube() {
  const groupRef = useRef()

  const geometry = useMemo(() => {
    const curve = new LemniscateCurve()
    const geom = new THREE.TubeGeometry(curve, 400, 0.055, 14, true)

    // Rose → iris gradient along the tube via vertex colours
    const count = geom.attributes.position.count
    const colours = new Float32Array(count * 3)
    const rose = new THREE.Color('#eb6f92')
    const iris = new THREE.Color('#c4a7e7')
    for (let i = 0; i < count; i++) {
      const t = i / count
      const blend = (Math.cos(t * Math.PI * 4) + 1) / 2
      const c = rose.clone().lerp(iris, blend)
      colours[i * 3] = c.r; colours[i * 3 + 1] = c.g; colours[i * 3 + 2] = c.b
    }
    geom.setAttribute('color', new THREE.BufferAttribute(colours, 3))
    return geom
  }, [])

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.1
  })

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshBasicMaterial vertexColors />
      </mesh>
    </group>
  )
}

function CameraRig({ section }) {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(...(ORBITS[section] ?? ORBITS[0])), [section])

  useFrame(() => {
    camera.position.lerp(target, 0.032)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function InfinityScene({ section }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 9], fov: 55 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#000000']} />
      <InfinityTube />
      <Stars radius={60} depth={50} count={700} factor={3} saturation={0} fade speed={0.6} />
      <CameraRig section={section} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} intensity={2.2} radius={0.85} />
      </EffectComposer>
    </Canvas>
  )
}

"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, ContactShadows } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Book } from "./book"
import { Suspense, useState, useRef, useEffect } from "react"
import * as THREE from "three"

interface SceneProps {
    color?: string
    image?: string
    backImage?: string
    spineImage?: string
    dimensions?: [number, number, number]
}

export function Scene({ color = "#e11d48", image, backImage, spineImage, dimensions }: SceneProps) {
    const [isInteracted, setIsInteracted] = useState(false)
    const [rotation, setRotation] = useState<[number, number, number]>([0.1, -0.4, 0])
    const [hintX, setHintX] = useState(-60)
    const requestRef = useRef<number>(null)
    const startTimeRef = useRef<number>(Date.now())

    const handleInteraction = () => {
        if (!isInteracted) {
            setIsInteracted(true)
        }
    }

    // Perfectly synchronized animation loop
    useEffect(() => {
        const animate = () => {
            if (isInteracted) {
                // Gently return to neutral rotation so lights hit the front cover correctly
                setRotation(prev => [
                    THREE.MathUtils.lerp(prev[0], 0, 0.1),
                    THREE.MathUtils.lerp(prev[1], 0, 0.1),
                    THREE.MathUtils.lerp(prev[2], 0, 0.1)
                ])
            } else {
                const time = (Date.now() - startTimeRef.current) / 1000
                const speed = 2.0
                const phase = Math.sin(time * speed)

                // Sync book rotation (Y) and hint position (X)
                const rotateY = -0.4 + phase * 0.4
                const tiltX = 0.1 + Math.cos(time * speed) * 0.02

                setRotation([tiltX, rotateY, 0])
                setHintX(phase * 80)
            }
            requestRef.current = requestAnimationFrame(animate)
        }

        requestRef.current = requestAnimationFrame(animate)
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
    }, [isInteracted])

    return (
        <div className="h-full w-full bg-transparent relative group select-none">
            <Canvas
                shadows
                gl={{ toneMapping: THREE.LinearToneMapping, toneMappingExposure: 1.0 }}
                onPointerDown={handleInteraction}
                onContextMenu={handleInteraction}
                onWheel={handleInteraction}
                onTouchStart={handleInteraction}
                className="cursor-grab active:cursor-grabbing"
            >
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 6.5]} fov={50} />

                    {/* Uniform, flat lighting to remove shading effects */}
                    <ambientLight intensity={1.0} />

                    <Book
                        position={[0, 0, 0]}
                        rotation={rotation}
                        color={color}
                        coverImage={image}
                        backImage={backImage}
                        spineImage={spineImage}
                        dimensions={dimensions}
                    />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        onChange={handleInteraction}
                    />
                </Suspense>
            </Canvas>

            {/* Drag Hint Overlay */}
            <AnimatePresence>
                {!isInteracted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center p-12"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Drag Instruction Line/Path */}
                            <div className="absolute w-44 h-px bg-stone-300 transform translate-y-16 opacity-30" />

                            {/* Hand Icon - Driven by React State for perfect sync */}
                            <div
                                style={{ transform: `translate(${hintX}px, 64px) rotate(${hintX * 0.1}deg)` }}
                                className="transition-transform duration-75 ease-linear"
                            >
                                <div className="bg-white/95 backdrop-blur-md p-4 rounded-full shadow-2xl border border-white">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-900">
                                        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                                        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                                        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                                        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

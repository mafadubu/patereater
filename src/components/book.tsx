"use client"

import { useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useCursor, useTexture } from "@react-three/drei"
import * as THREE from "three"

interface BookProps {
    position?: [number, number, number]
    rotation?: [number, number, number]
    color?: string
    coverImage?: string
    backImage?: string
    spineImage?: string
    dimensions?: [number, number, number] // width, height, depth
}

export function Book({ position = [0, 0, 0], rotation = [0, 0, 0], color = "#cc0000", coverImage, backImage, spineImage, dimensions = [170, 230, 20], ...props }: BookProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)

    useCursor(hovered)

    // Convert mm to 3D units (scale down by factor, e.g., 100mm = 2 units => factor ~0.02)
    const scaleFactor = 0.02
    const width = dimensions[0] * scaleFactor
    const height = dimensions[1] * scaleFactor
    const depth = dimensions[2] * scaleFactor


    // Animation state
    const targetScale = hovered ? 1.1 : 1.0

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Smooth lerp for scale
            meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 10)
            meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, delta * 10)
            meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, delta * 10)
        }
    })

    // Generate Page Texture (Memoized)
    const pageTexture = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 128
        canvas.height = 128
        const ctx = canvas.getContext("2d")
        if (ctx) {
            ctx.fillStyle = "#fdfdfd"
            ctx.fillRect(0, 0, 128, 128)

            // Draw lines to simulate stacked pages
            // We draw horizontal lines. 
            // For the side (Right face), we need Vertical lines, so we can rotate the texture mapping or draw vertical lines.
            // Since BoxGeometry maps differently, let's create a texture that looks like "grain".
            // Actually, simple striations work best.

            // Let's create a noise-like striation pattern (Strong Contrast)
            for (let i = 0; i < 128; i++) {
                if (Math.random() > 0.5) {
                    ctx.fillStyle = Math.random() > 0.5 ? "#a0a0a0" : "#d0d0d0" // Much darker for high visibility
                    ctx.fillRect(0, i, 128, 1) // Horizontal lines
                }
            }
        }
        const tex = new THREE.CanvasTexture(canvas)
        tex.wrapS = THREE.RepeatWrapping
        tex.wrapT = THREE.RepeatWrapping
        return tex
    }, [])

    // Materials
    // We need different orientations for Top/Bottom vs Right
    const pageMaterialSide = new THREE.MeshBasicMaterial({
        color: "#f0f0f0", // Slightly darker base
        map: pageTexture,
    })

    // Create specific material for Top to control lighting
    const pageMaterialTop = pageMaterialSide.clone()
    pageMaterialTop.color.set("#f8f8f8") // Subtle difference to show top/bottom

    // For Right Face: U=Z, V=Y. 
    // Stack is along Z (U). 
    // We want lines to appear "stacked" along U. i.e., vertical stripes.
    // Our texture has horizontal stripes. So we need to rotate 90 deg.
    const pageMaterialRight = pageMaterialSide.clone()
    pageMaterialRight.map = pageTexture.clone()
    pageMaterialRight.map.center.set(0.5, 0.5)
    pageMaterialRight.map.rotation = Math.PI / 2
    pageMaterialRight.map.needsUpdate = true


    // Textures
    const coverTex = useTexture(coverImage ? coverImage : "/images/uploaded_media_0_1769244450496.png")
    coverTex.colorSpace = THREE.SRGBColorSpace

    const backTex = useTexture(backImage ? backImage : (coverImage ? coverImage : "/images/uploaded_media_0_1769244450496.png"))
    backTex.colorSpace = THREE.SRGBColorSpace

    const spineTex = useTexture(spineImage ? spineImage : (coverImage ? coverImage : "/images/uploaded_media_0_1769244450496.png"))
    spineTex.colorSpace = THREE.SRGBColorSpace

    const coverMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        map: coverTex,
    })

    const backMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        map: backTex,
    })

    const spineMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        map: spineTex,
    })

    // Fallback spine if no image
    const simpleSpineMaterial = new THREE.MeshBasicMaterial({
        color: color,
    })

    const materials = [
        pageMaterialRight, // Right
        spineImage ? spineMaterial : simpleSpineMaterial, // Left (Spine)
        pageMaterialTop, // Top
        pageMaterialTop, // Bottom
        coverMaterial, // Front
        backImage ? backMaterial : coverMaterial  // Back
    ]

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            castShadow
            receiveShadow
            material={materials}
        >
            <boxGeometry args={[width, height, depth]} />
        </mesh>
    )
}

"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import {OrbitControls} from '@react-three/drei'

type Props = {}

export default function Models({}: Props) {
    const {scene} = useGLTF('/hamburger.glb')
  return (
    <div>
        <Canvas>
            <OrbitControls />
            <directionalLight intensity={0.5} />
            <primitive object={scene} scale={0.35} />
        </Canvas>
    </div>
  )
}
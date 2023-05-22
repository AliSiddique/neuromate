"use client"
import React, { memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

interface Props {
  scale?: number;
}

function Models({ scale = 0.35 }: Props) {
  const { scene } = useGLTF('/brain.glb');

  return (
    <div className="h-screen">
      <Canvas>
        <OrbitControls />
        <directionalLight intensity={1} />
        <primitive zoom={-5} object={scene} scale={scale} />
      </Canvas>
    </div>
  );
}

export default Models;

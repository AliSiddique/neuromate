import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

interface Props {
  scale?: number; // Make the 'scale' prop optional
}

export default function Models({ scale = 0.35 }: Props) {
  const { scene } = useGLTF('/hamburger.glb');

  return (
    <div className="h-screen">
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={1} />
        <primitive zoom={-5} object={scene} scale={scale} />
      </Canvas>
    </div>
  );
}

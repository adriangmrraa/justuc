"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const mesh = useRef<THREE.Points>(null!);
  const count = 200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      const color = Math.random() > 0.5 ? [0.357, 0.639, 0.902] : [1, 1, 1]; // #5BA3E6 or white
      cols[i * 3] = color[0];
      cols[i * 3 + 1] = color[1];
      cols[i * 3 + 2] = color[2];
    }
    return [pos, cols];
  }, []);

  const linePositions = useMemo(() => {
    const pos = new Float32Array(count * 6);
    let idx = 0;
    for (let i = 0; i < count && idx < count * 2; i++) {
      for (let j = i + 1; j < count && idx < count * 2; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 3) {
          pos[idx * 3] = positions[i * 3];
          pos[idx * 3 + 1] = positions[i * 3 + 1];
          pos[idx * 3 + 2] = positions[i * 3 + 2];
          pos[(idx + 1) * 3] = positions[j * 3];
          pos[(idx + 1) * 3 + 1] = positions[j * 3 + 1];
          pos[(idx + 1) * 3 + 2] = positions[j * 3 + 2];
          idx += 2;
        }
      }
    }
    return { positions: pos.slice(0, idx * 3), count: idx };
  }, [positions]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(time * 0.3 + i) * 0.002;
      // Wrap around
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
      if (pos[i * 3] > 10) pos[i * 3] = -10;
      if (pos[i * 3] < -10) pos[i * 3] = 10;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.6} sizeAttenuation />
      </points>
      {linePositions.count > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions.positions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#5BA3E6" transparent opacity={0.1} />
        </lineSegments>
      )}
    </>
  );
}

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}

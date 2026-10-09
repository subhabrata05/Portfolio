import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export const InteractiveParticles: React.FC<{ count?: number }> = ({ count = 850 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Neon blue, violet & cyan palette
    const colorPrimary = new THREE.Color('#3b82f6'); // Electric Blue
    const colorViolet = new THREE.Color('#8b5cf6');  // Neon Violet
    const colorCyan = new THREE.Color('#06b6d4');    // Cyan Glow

    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 2;

      const factor = Math.random();
      let c: THREE.Color;
      if (factor < 0.45) {
        c = colorPrimary.clone().lerp(colorCyan, factor / 0.45);
      } else {
        c = colorViolet.clone().lerp(colorPrimary, (factor - 0.45) / 0.55);
      }
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.035;
      const targetScrollY = scrollYRef.current * 0.001;
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, -targetScrollY, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const GlowingArtifactMesh: React.FC = () => {
  const outerWireRef = useRef<THREE.Mesh>(null);
  const ringPrimaryRef = useRef<THREE.Mesh>(null);
  const ringSecondaryRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group>(null);
  const targetPointer = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const { pointer, clock } = state;
    const time = clock.getElapsedTime();

    // Damped cursor tracking for silky responsiveness
    targetPointer.current.x = pointer.x * 0.45;
    targetPointer.current.y = pointer.y * 0.35;

    const scrollParallaxY = -scrollYRef.current * 0.0022;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetPointer.current.x, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetPointer.current.y, 0.06);
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y, 
        Math.sin(time * 0.7) * 0.12 + scrollParallaxY, 
        0.05
      );
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.x = time * 0.15;
      outerWireRef.current.rotation.y = time * 0.12;
    }

    if (ringPrimaryRef.current) {
      ringPrimaryRef.current.rotation.z = -time * 0.25;
      ringPrimaryRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.4) * 0.15;
    }

    if (ringSecondaryRef.current) {
      ringSecondaryRef.current.rotation.y = time * 0.3;
      ringSecondaryRef.current.rotation.z = Math.PI / 4 + Math.cos(time * 0.35) * 0.12;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x = -time * 0.35;
      coreRef.current.rotation.y = time * 0.4;
      // Gentle breathing pulse
      const pulse = 1 + Math.sin(time * 2.2) * 0.05;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    if (coreGlowRef.current) {
      const glowPulse = 1.15 + Math.sin(time * 2.2) * 0.08;
      coreGlowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }

    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = -time * 0.45;
      satellitesRef.current.rotation.x = Math.sin(time * 0.25) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[2.3, 0, 0]}>
      {/* Outer Faceted Geodesic Cage */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#3b82f6"
          emissiveIntensity={0.65}
          roughness={0.25}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Primary Kinetic Orbital Ring (Electric Blue) */}
      <mesh ref={ringPrimaryRef}>
        <torusGeometry args={[2.1, 0.035, 16, 90]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#2563eb"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* Secondary Orbital Ring (Neon Violet) */}
      <mesh ref={ringSecondaryRef}>
        <torusGeometry args={[1.8, 0.025, 16, 80]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#8b5cf6"
          emissiveIntensity={1.2}
          roughness={0.08}
          metalness={0.95}
        />
      </mesh>

      {/* Inner Glowing Crystal Core (Electric Cyan) */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0284c7"
          emissiveIntensity={1.4}
          roughness={0.06}
          metalness={0.85}
        />
      </mesh>

      {/* Soft Ethereal Core Glow Shell */}
      <mesh ref={coreGlowRef}>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbiting Satellite Light Beacons */}
      <group ref={satellitesRef}>
        <mesh position={[2.4, 0.4, 0]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#06b6d4"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-2.2, -0.6, 0.8]}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#8b5cf6"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0.5, 2.2, -0.6]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <>
      {/* Subtle Starfield Background */}
      <Stars 
        radius={75} 
        depth={50} 
        count={2400} 
        factor={3.5} 
        saturation={0.8} 
        fade 
        speed={1.0} 
      />

      {/* Realistic 3D Studio & Neon Blue/Violet Accent Lighting */}
      <ambientLight intensity={0.5} color="#0f172a" />
      <directionalLight 
        position={[6, 9, 6]} 
        intensity={1.9} 
        color="#f8fafc" 
      />
      
      {/* Electric Blue Right Light */}
      <pointLight 
        position={[4, 3, 3]} 
        intensity={3.2} 
        color="#3b82f6" 
        distance={16}
      />

      {/* Neon Violet Lower Light */}
      <pointLight 
        position={[1, -4, 2]} 
        intensity={3.0} 
        color="#8b5cf6" 
        distance={15}
      />

      {/* Electric Cyan Accent Light */}
      <pointLight 
        position={[-4, 2, 1]} 
        intensity={2.2} 
        color="#06b6d4" 
        distance={18}
      />

      {/* Interactive Particles Layer */}
      <InteractiveParticles count={850} />

      {/* Glowing 3D Object on the Right */}
      <GlowingArtifactMesh />
    </>
  );
};

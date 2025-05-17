"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Vector3, MathUtils } from "three";
import type { Question } from "../data/jeopardy";

type QuestionTileProps = {
  question: Question;
  position: [number, number, number];
  onSelect: (question: Question) => void;
};

export default function QuestionTile({
  question,
  position,
  onSelect,
}: QuestionTileProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const initialPosition = useRef(new Vector3(...position));
  const targetPosition = useRef(new Vector3(0, 0, 5));
  const animationProgress = useRef(0);
  const rotationSpeed = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;

    // Hover effect when not animating
    if (!isAnimating) {
      if (hovered) {
        mesh.scale.z = MathUtils.lerp(mesh.scale.z, 1.2, 0.1);
        mesh.position.z = MathUtils.lerp(
          mesh.position.z,
          position[2] + 0.2,
          0.1,
        );
      } else {
        mesh.scale.z = MathUtils.lerp(mesh.scale.z, 1, 0.1);
        mesh.position.z = MathUtils.lerp(mesh.position.z, position[2], 0.1);
      }
    }

    // Animation when selected
    if (isAnimating) {
      // Update progress
      animationProgress.current = Math.min(
        animationProgress.current + delta * 0.5,
        1,
      );
      const progress = animationProgress.current;

      // Smooth easing
      const eased = MathUtils.smoothstep(progress, 0, 1);

      // Position animation
      const targetPos = targetPosition.current;
      mesh.position.lerp(targetPos, eased);

      // Scale animation (larger as it comes closer)
      const scale = MathUtils.lerp(1, 4, eased);
      mesh.scale.set(scale, scale, scale);

      // Rotation animation (accelerate then decelerate)
      rotationSpeed.current = MathUtils.lerp(
        rotationSpeed.current,
        progress < 0.7 ? 5 : 0,
        0.1,
      );
      mesh.rotation.y += rotationSpeed.current * delta;

      // When animation completes
      if (progress >= 1) {
        onSelect(question);
        // Reset for next time
        animationProgress.current = 0;
        rotationSpeed.current = 0;
        setIsAnimating(false);
        mesh.position.copy(initialPosition.current);
        mesh.rotation.set(0, 0, 0);
        mesh.scale.set(1, 1, 1);
      }
    }
  });

  const handleClick = () => {
    if (question.isAnswered || isAnimating) return;
    setIsAnimating(true);
  };

  return (
    <group>
      {/* Main tile */}
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => !isAnimating && setHovered(true)}
        onPointerOut={() => !isAnimating && setHovered(false)}
        onClick={handleClick}
      >
        <boxGeometry args={[1.8, 1.2, 0.4]} />
        <meshStandardMaterial
          color={question.isAnswered ? "#4a4a4a" : "#cc0000"}
          metalness={0.7}
          roughness={0.2}
        />

        {/* Front face text */}
        <Text
          position={[0, 0, 0.21]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {question.isAnswered ? "" : `$${question.value}`}
        </Text>

        {/* Back face text (question text) */}
        <Text
          position={[0, 0, -0.21]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.6}
          rotation={[0, Math.PI, 0]}
          textAlign="center"
          overflowWrap="break-word"
          lineHeight={1.2}
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!()- "
          clipRect={[-0.8, -0.55, 1.6, 1.1]}
          outlineWidth={0.002}
          outlineColor="#000000"
          whiteSpace="normal"
        >
          {question.question}
        </Text>
      </mesh>

      {/* Edge highlight effect */}
      <mesh
        position={[position[0], position[1], position[2] - 0.21]}
        scale={[1.82, 1.22, 1]}
      >
        <planeGeometry />
        <meshStandardMaterial
          color="#ffffff"
          opacity={hovered ? 0.1 : 0}
          transparent
          side={2}
        />
      </mesh>
    </group>
  );
}

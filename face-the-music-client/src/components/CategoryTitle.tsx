"use client";

import { Text } from "@react-three/drei";

type CategoryTitleProps = {
  title: string;
  position: [number, number, number];
};

export default function CategoryTitle({ title, position }: CategoryTitleProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1.8, 0.8, 0.1]} />
      <meshStandardMaterial color="#000066" metalness={0.5} roughness={0.2} />
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
        textAlign="center"
      >
        {title}
      </Text>
    </mesh>
  );
}

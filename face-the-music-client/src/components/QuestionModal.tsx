"use client";

import { Text } from "@react-three/drei";
import { useState } from "react";
import type { Question } from "../data/jeopardy";

type QuestionModalProps = {
  question: Question;
  onClose: () => void;
};

export default function QuestionModal({
  question,
  onClose,
}: QuestionModalProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <group position={[0, 0, 2]}>
      {/* Background plane */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#000066" opacity={0.9} transparent />
      </mesh>

      {/* Question/Answer text */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        textAlign="center"
      >
        {showAnswer ? question.answer : question.question}
      </Text>

      {/* Buttons */}
      <group>
        <mesh
          position={[0, -2, 0]}
          onClick={() => (showAnswer ? onClose() : setShowAnswer(true))}
        >
          <boxGeometry args={[3, 0.8, 0.1]} />
          <meshStandardMaterial color="#cc0000" />
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {showAnswer ? "Back to Board" : "Show Answer"}
          </Text>
        </mesh>
      </group>
    </group>
  );
}

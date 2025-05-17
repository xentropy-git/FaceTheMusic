"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import QuestionTile from "../../components/QuestionTile";
import CategoryTitle from "../../components/CategoryTitle";

interface Question {
  value: number;
  question: string;
  answer: string;
  isAnswered?: boolean;
}

interface Category {
  name: string;
  questions: Question[];
}

interface SelectedQuestion {
  categoryIndex: number;
  questionIndex: number;
  question: string;
  answer: string;
  value: number;
  isAnswered?: boolean;
  showAnswer?: boolean;
  position: [number, number, number];
  originalPosition: [number, number, number];
  scale: [number, number, number];
  isSelected?: boolean;
  targetPosition?: [number, number, number];
  targetScale?: [number, number, number];
}

export default function JeopardyPage() {
  const [selectedQuestion, setSelectedQuestion] =
    useState<SelectedQuestion | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const categories: Category[] = [
    {
      name: "Pop Icons",
      questions: [
        {
          value: 200,
          question: 'This "Queen of Pop" released "Like a Virgin" in 1984',
          answer: "Who is Madonna?",
        },
        {
          value: 400,
          question:
            'This "King of Pop" released "Thriller", the best-selling album of all time',
          answer: "Who is Michael Jackson?",
        },
        {
          value: 600,
          question:
            'This Swedish group\'s "Dancing Queen" became their only #1 hit in the US',
          answer: "Who is ABBA?",
        },
        {
          value: 800,
          question:
            'This "Piano Man" has sold more than 150 million records worldwide',
          answer: "Who is Billy Joel?",
        },
        {
          value: 1000,
          question:
            'This "Material Girl" has the most top 10 hits in Billboard Hot 100 history',
          answer: "Who is Madonna?",
        },
      ],
    },
    {
      name: "Rock Legends",
      questions: [
        {
          value: 200,
          question: 'This band performed "Stairway to Heaven"',
          answer: "Who is Led Zeppelin?",
        },
        {
          value: 400,
          question: 'This "King" of Rock and Roll recorded at Sun Studio',
          answer: "Who is Elvis Presley?",
        },
        {
          value: 600,
          question: 'Known as "The Boss", this artist led the E Street Band',
          answer: "Who is Bruce Springsteen?",
        },
        {
          value: 800,
          question:
            "This band's \"Bohemian Rhapsody\" was featured in Wayne's World",
          answer: "Who is Queen?",
        },
        {
          value: 1000,
          question:
            'This Seattle band\'s album "Nevermind" knocked Michael Jackson off the #1 spot in 1992',
          answer: "Who is Nirvana?",
        },
      ],
    },
    {
      name: "Music Theory",
      questions: [
        {
          value: 200,
          question: "This Italian term means 'very loud' in music notation",
          answer: "What is Fortissimo?",
        },
        {
          value: 400,
          question: "This scale has no sharps or flats",
          answer: "What is C Major?",
        },
        {
          value: 600,
          question: "A perfect fifth consists of this many semitones",
          answer: "What is 7?",
        },
        {
          value: 800,
          question:
            "This chord progression I-V-vi-IV is known as the '4 Chords of Pop'",
          answer: "What is the Pop Punk Progression?",
        },
        {
          value: 1000,
          question:
            "This medieval church mode is equivalent to playing only the white keys on a piano from D to D",
          answer: "What is Dorian?",
        },
      ],
    },
    {
      name: "Instruments",
      questions: [
        {
          value: 200,
          question:
            "This woodwind instrument is known as the 'clown of the orchestra'",
          answer: "What is the Bassoon?",
        },
        {
          value: 400,
          question:
            "This percussion instrument's name comes from the Greek word for 'circle'",
          answer: "What is the Cymbal?",
        },
        {
          value: 600,
          question:
            "The modern form of this keyboard instrument was invented by Bartolomeo Cristofori around 1700",
          answer: "What is the Piano?",
        },
        {
          value: 800,
          question:
            "This electronic instrument invented by Leon Theremin is played without physical contact",
          answer: "What is the Theremin?",
        },
        {
          value: 1000,
          question:
            "This ancient Greek instrument shares its name with a geometric shape",
          answer: "What is the Lyre?",
        },
      ],
    },
    {
      name: "Album Facts",
      questions: [
        {
          value: 200,
          question: "This 1995 Beatles album title contains a crossing",
          answer: "What is Abbey Road?",
        },
        {
          value: 400,
          question:
            "Pink Floyd's 'Dark Side of the Moon' spent this many weeks on the Billboard 200",
          answer: "What is 937 weeks?",
        },
        {
          value: 600,
          question:
            "This best-selling album of the 1980s features a baby swimming underwater",
          answer: "What is Nevermind?",
        },
        {
          value: 800,
          question:
            "The cover of this Velvet Underground album was designed by Andy Warhol and features a banana",
          answer: "What is The Velvet Underground & Nico?",
        },
        {
          value: 1000,
          question:
            "This Beatles album was originally titled 'Everest' before they changed it",
          answer: "What is Abbey Road?",
        },
      ],
    },
  ];

  const handleQuestionClick = (
    categoryIndex: number,
    questionIndex: number,
  ) => {
    const category = categories[categoryIndex];
    const question = category.questions[questionIndex];

    // Calculate original position based on grid layout
    const xOffset = (categoryIndex - (categories.length - 1) / 2) * 2.5;
    const yOffset = 1.5 - questionIndex * 1.5;
    const originalPosition: [number, number, number] = [xOffset, yOffset, 0];

    // If clicking the same question that's already selected
    if (
      selectedQuestion?.categoryIndex === categoryIndex &&
      selectedQuestion?.questionIndex === questionIndex
    ) {
      if (showAnswer) {
        // If we're showing the answer and click again, return the tile to its original position
        // and mark it as answered
        const updatedQuestion = {
          ...selectedQuestion,
          isAnswered: true,
          isSelected: false,
          position: originalPosition,
          scale: [1, 1, 1],
        };
        setSelectedQuestion(updatedQuestion);
        setShowAnswer(false);
        
        // After a short delay, clear the selected question
        setTimeout(() => {
          setSelectedQuestion(null);
        }, 500);
      } else {
        // Show answer but keep the tile in the center
        setShowAnswer(true);
      }
      return;
    }

    // When a tile is clicked, it should fly to center screen
    // The target position is in front of the camera, slightly elevated
    const targetPosition: [number, number, number] = [0, 0, 2]; // Centered and closer to camera
    // Scale up the tile when selected
    const targetScale: [number, number, number] = [4, 4, 1]; // Larger for better readability

    // If there's already a selected question, close it first
    if (selectedQuestion) {
      handleCloseQuestion();
    }

    // Create the new selected question state
    const newSelectedQuestion: SelectedQuestion = {
      categoryIndex,
      questionIndex,
      question: question.question,
      answer: question.answer,
      value: question.value,
      position: originalPosition,
      originalPosition,
      scale: [1, 1, 1],
      targetPosition,
      targetScale,
      isSelected: true,
      showAnswer: false,
      isAnswered: false,
    };

    // Update the state
    setSelectedQuestion(newSelectedQuestion);
    setShowAnswer(false);
  };

  const handleCloseQuestion = () => {
    setSelectedQuestion(null);
    setShowAnswer(false);
  };

  return (
    <main className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ background: "#000033" }}
        shadows
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.8} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        {/* Background elements */}
        <mesh position={[0, 0, -5]} rotation={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#000022" />
        </mesh>

        {/* Game board container */}
        <group position={[0, -1, 0]}>
          {/* Category titles and question tiles */}
          {categories.map((category, categoryIndex) => {
            const xOffset = (categoryIndex - (categories.length - 1) / 2) * 2.5;
            const yOffset = 2;

            return (
              <group
                key={categoryIndex}
                position={[xOffset, yOffset, 0]}
                rotation={[0, Math.sin(categoryIndex * 0.1) * 0.05, 0]} // Slight wave effect
              >
                {/* Category title */}
                <CategoryTitle title={category.name} position={[0, 3, 0]} />

                {/* Question tiles */}
                {category.questions.map((question, questionIndex) => {
                  const yOffset = 1.5 - questionIndex * 1.5;
                  const isAnswered =
                    selectedQuestion?.categoryIndex === categoryIndex &&
                    selectedQuestion?.questionIndex === questionIndex;

                  return (
                    <QuestionTile
                      key={questionIndex}
                      question={{
                        ...question,
                        isAnswered,
                      }}
                      position={[0, yOffset, 0]}
                      onSelect={() =>
                        handleQuestionClick(categoryIndex, questionIndex)
                      }
                    />
                  );
                })}
              </group>
            );
          })}
        </group>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </main>
  );
}

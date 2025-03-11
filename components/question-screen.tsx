"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star } from "lucide-react";

interface QuestionScreenProps {
  question: string;
  labels: string[];
  questionNumber: number;
  totalQuestions: number;
  onBack: () => void;
  onAnswer: (rating: number) => void;
  onNext: () => void;
  selectedRating: number | null;
}

export default function QuestionScreen({
  question,
  labels,
  questionNumber,
  totalQuestions,
  onBack,
  onAnswer,
  onNext,
  selectedRating,
}: QuestionScreenProps) {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [localRating, setLocalRating] = useState<number | null>(null);
  const [showButton, setShowButton] = useState<boolean>(false); // NEW: Controls button visibility

  // Reset stars when a new question loads
  useEffect(() => {
    setLocalRating(selectedRating);
    setShowButton(selectedRating !== null); // Show button if a previous answer exists
  }, [selectedRating, questionNumber]);

  // Handle star selection (DOES NOT MOVE TO NEXT QUESTION)
  const handleRatingClick = (rating: number) => {
    setLocalRating(rating); // Update local state
    setShowButton(true); // Show the "Weiter" button
  };

  // Handle "Weiter" button click (Moves to the next question)
  const handleNextClick = () => {
    if (localRating !== null) {
      onAnswer(localRating); // Save answer
      setShowButton(false); // Hide button for next question
      onNext(); // Load next question
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen px-6 pt-16 pb-24 text-white">
      <div className="w-full flex items-center mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-transparent hover:text-gray-300"
        >
          <ChevronLeft className="h-10 w-10" />
          <span className="sr-only">Back</span>
        </Button>
      </div>

      <div className="w-32 h-32 mb-8 relative">
        <Image src="/QLogo.png" alt="Qentin Logo" fill className="object-contain" priority />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <h1 className="text-2xl font-bold text-center mb-32">{question}</h1>

        <div className="flex justify-between w-full mb-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className="flex flex-col items-center"
              onMouseEnter={() => setHoveredRating(rating)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => handleRatingClick(rating)} // Click does NOT change question
            >
              <Star
                className={`h-10 w-10 mb-2 ${
                  rating <= (hoveredRating || localRating) ? "fill-white text-white" : "text-gray-500"
                }`}
              />
              <span className="text-sm">{labels[rating - 1]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full mt-auto">
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-red-600" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
        </div>
        <div className="text-center mt-2">
          {questionNumber}/{totalQuestions}
        </div>
      </div>

      {/* "Weiter" Button - Always takes space, but hidden until user selects a rating */}
      <div className="w-full mt-8 flex justify-center">
        <Button
          onClick={handleNextClick}
          className={`w-full py-6 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-opacity duration-300 ${
            showButton ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          Weiter
        </Button>
      </div>
    </div>
  );
}

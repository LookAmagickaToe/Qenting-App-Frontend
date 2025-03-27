"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import { useState } from "react"

interface RecommendationsScreenProps {
  onBack: () => void
  onRegenerate: () => void
  recommendedMovies: string[]
}

export default function RecommendationsScreen({
  onBack,
  onRegenerate,
  recommendedMovies
}: RecommendationsScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goNext = () => {
    if (currentIndex < recommendedMovies.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const currentMovie = recommendedMovies[currentIndex]

  return (
    <div className="flex flex-col items-center w-full h-screen px-6 pt-6 pb-24 text-white relative">
      {/* Logo in top-right */}
      <div className="absolute top-4 right-4 w-10 h-10">
        <Image
          src="/QLogo.png"
          alt="Qentin Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Back button */}
      <div className="w-full flex items-center mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-transparent hover:text-gray-300"
        >
          <ArrowLeft className="h-8 w-8" />
          <span className="sr-only">Back</span>
        </Button>
      </div>

      {/* Movie Title */}
      <div className="text-3xl font-bold text-center mb-4">
        {currentMovie || "Keine Empfehlung"}
      </div>

      {/* Image placeholder */}
      <div className="w-full max-w-md h-[360px] bg-gray-800 rounded-xl mb-6 flex items-center justify-center">
        <p className="text-gray-400 italic">Film-Bild folgt...</p>
      </div>

      {/* Like/Dislike Buttons */}
      <div className="flex flex-col items-center w-full space-y-3 mb-6">
        <div className="flex gap-4 w-full justify-center">
          <Button
            variant="outline"
            className="bg-[#2a2a2a] text-white border-gray-600 hover:bg-[#444]"
          >
            I don't like it
          </Button>
          <Button
            variant="outline"
            className="bg-[#2a2a2a] text-white border-gray-600 hover:bg-[#444]"
          >
            I watched & liked it
          </Button>
          <Button
            variant="outline"
            className="bg-[#2a2a2a] text-white border-gray-600 hover:bg-[#444]"
          >
            I like it
          </Button>
        </div>
      </div>

      {/* Spacer to push arrows to the bottom */}
      <div className="flex-grow" />

      {/* Navigation buttons at the very bottom */}
      <div className="flex justify-between w-full max-w-md mt-auto mb-4">
        <Button
          onClick={goPrevious}
          disabled={currentIndex === 0}
          className="rounded-full px-4 py-2"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          onClick={goNext}
          disabled={currentIndex === recommendedMovies.length - 1}
          className="rounded-full px-4 py-2"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Regenerate button */}
      <Button
        onClick={onRegenerate}
        className="w-full py-6 text-lg bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white rounded-full"
      >
        Regenerieren
      </Button>
    </div>
  )
}

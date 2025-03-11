"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface QuizIntroScreenProps {
  onBack: () => void
  onStart: () => void
}

export default function QuizIntroScreen({ onBack, onStart }: QuizIntroScreenProps) {
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

      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-2xl font-bold mb-6">
          Studien zeigen: Deine Persönlichkeit beeinflusst Deine Filmvorlieben.
        </h1>

        <p className="text-xl mb-8">Beantworte dafür 5 schnelle Fragen...</p>

        <p className="text-2xl font-bold mb-16">Bereit?</p>

        <Button
          onClick={onStart}
          className="w-full py-6 text-xl bg-blue-500 hover:bg-blue-500 text-white rounded-full"
        >
          Oh, ja!
        </Button>
      </div>
    </div>
  )
}


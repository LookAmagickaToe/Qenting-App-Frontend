"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface RecommendationsScreenProps {
  onBack: () => void
  onRegenerate: () => void
  quality: number
  recommendedMovies: string[] // ✅ Accept recommended movies
}

export default function RecommendationsScreen({
  onBack,
  onRegenerate,
  quality,
  recommendedMovies
}: RecommendationsScreenProps) {
  
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

      <div className="w-full flex-grow">
        <div className="space-y-6 mb-12">
          {recommendedMovies.length > 0 ? (
            recommendedMovies.map((film, index) => (
              <div key={index} className="text-2xl font-bold">
                {film}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">Keine Empfehlungen verfügbar</p>
          )}
        </div>

        <Button
          onClick={onRegenerate}
          className="w-full py-6 text-lg bg-[#1e1e1e] hover:bg-[#2a2a2a] text-white rounded-full"
        >
          Regenerieren
        </Button>
      </div>

      <div className="absolute top-24 right-6 bg-black text-white p-2 rounded-lg opacity-70">
        <p className="text-xs font-bold text-center">
          Deine Algorithmus
          <br />
          Qualität
          <span className="block text-center font-bold">{quality}</span>
        </p>
      </div>
    </div>
  )
}

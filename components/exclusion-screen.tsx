"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

interface ExclusionScreenProps {
  onBack: () => void
  onSubmit: (exclusions: string[], actorName: string) => void
  initialExclusions: string[]
  initialActorName: string
}

export default function ExclusionScreen({
  onBack,
  onSubmit,
  initialExclusions,
  initialActorName,
}: ExclusionScreenProps) {
  const [exclusions, setExclusions] = useState<string[]>(initialExclusions)
  const [actorName, setActorName] = useState<string>(initialActorName)

  const genres = [
    "Horror",
    "Harte Gewalt",
    "Anime",
    "Schockeffekte",
    "Kriegsfilme",
    "Fantasy",
    "Animation",
    "Western",
    "Science Fiction",
    "Marvel Universe / Superhelden",
    "Sport Filme",
    "sexuelle Handlungen",
  ]

  const toggleGenre = (genre: string) => {
    if (exclusions.includes(genre)) {
      setExclusions(exclusions.filter((g) => g !== genre))
    } else {
      setExclusions([...exclusions, genre])
    }
  }

  const handleSubmit = () => {
    onSubmit(exclusions, actorName)
  }

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

      <h1 className="text-2xl font-bold text-center mb-8">
        Letzte Frage: Was willst Du auf <span className="text-red-500">KEINEN FALL</span> sehen?
      </h1>

      <div className="w-full overflow-auto flex-grow mb-6">
        <div className="space-y-3">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-3">
              <Checkbox
                id={genre}
                checked={exclusions.includes(genre)}
                onCheckedChange={() => toggleGenre(genre)}
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black h-6 w-6"
              />
              <label htmlFor={genre} className="text-xl cursor-pointer">
                {genre}
              </label>
            </div>
          ))}

          <div className="flex items-center space-x-3 mt-4">
            <Checkbox
              id="actor"
              checked={actorName.length > 0}
              onCheckedChange={() => setActorName(actorName ? "" : "Name Schauspieler/in")}
              className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black h-6 w-6"
            />
            <label htmlFor="actor" className="text-xl cursor-pointer">
              Filme mit...
            </label>
          </div>

          {(actorName.length > 0 || exclusions.includes("Filme mit...")) && (
            <div className="mt-2 pl-9">
              <div className="relative">
                <Input
                  value={actorName}
                  onChange={(e) => setActorName(e.target.value)}
                  placeholder="Name hier schreiben"
                  className="bg-[#333] border-none text-white rounded-full py-2 px-4"
                />
                {actorName && (
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setActorName("")}
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full py-6 text-lg bg-blue-500 hover:bg-blue-500 text-white rounded-full"
      >
        Fertig
      </Button>
    </div>
  )
}


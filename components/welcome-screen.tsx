"use client"

import Image from "next/image"

interface WelcomeScreenProps {
  onContinue: () => void
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-6 text-white" onClick={onContinue}>
      <div className="w-32 h-32 mb-16 relative">
        <Image src="/QLogo.png" alt="Qentin Logo" fill className="object-contain" priority />
      </div>

      <h1 className="text-3xl font-bold text-center mb-4">Willkommen bei Qentin!</h1>

      <p className="text-2xl text-center">Entdecke Filme, die wirklich zu Dir passen.</p>
    </div>
  )
}


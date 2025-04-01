"use client"

import Image from "next/image"
import { useEffect } from "react"

interface WelcomeScreenProps {
  onContinue: () => void
  onSessionCreated: (sessionId: string) => void
}

export default function WelcomeScreen({ onContinue, onSessionCreated }: WelcomeScreenProps) {
  useEffect(() => {
    // Fetch a new session ID from the backend when component mounts
    const getSessionId = async () => {
      try {
        const res = await fetch("https://qentin-app-production.up.railway.app/api/session")
        const data = await res.json()
        if (data.session_id) {
          onSessionCreated(data.session_id)
        }
      } catch (err) {
        console.error("Failed to fetch session ID:", err)
      }
    }

    getSessionId()
  }, [onSessionCreated])

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

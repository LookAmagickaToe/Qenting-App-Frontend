"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ChatScreenProps {
  onBack: () => void
}

interface ChatMessage {
  sender: "user" | "assistant"
  text: string
}

export default function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = { sender: "user", text: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")

    try {
      const response = await fetch("https://qentin-app-production.up.railway.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: "example-client-id", // Replace with actual UUID/session
          message: input
        })
      })

      const data = await response.json()
      const assistantMessage: ChatMessage = { sender: "assistant", text: data.reply }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="flex flex-col h-full w-full px-4 pt-4 pb-24 text-white relative">
      {/* Top bar */}
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-transparent hover:text-gray-300"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
      <div className="absolute top-4 right-4 w-10 h-10">
        <Image
          src="/QLogo.png"
          alt="Qentin Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mt-16 mb-4 space-y-2 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-2 max-w-[75%] rounded-xl text-sm whitespace-pre-line ${
              msg.sender === "user" ? "bg-blue-600 self-end" : "bg-gray-700 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black border-t border-gray-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 rounded-full bg-gray-800 text-white px-4 py-2 text-sm focus:outline-none"
          />
          <Button onClick={sendMessage} className="rounded-full px-4 py-2">
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface StreamingServicesScreenProps {
  onNext: (services: string[]) => void
}

export default function StreamingServicesScreen({ onNext }: StreamingServicesScreenProps) {
  const streamingServices = [
    "Netflix",
    "Amazon Prime Video",
    "ARD Mediathek",
    "ZDF Mediathek",
    "Disney+",
    "Apple TV+",
    "Paramount",
    "HBO Max",
    "ARTE / 3Sat Mediathek",
    "Mubi",
    "Sky",
  ]

  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-screen px-6 pt-16 pb-24 text-white overflow-auto">
      <div className="w-32 h-32 mb-8 relative">
        <Image src="/QLogo.png" alt="Qentin Logo" fill className="object-contain" priority />
      </div>

      <h1 className="text-2xl font-bold text-center mb-8">Welche Streaming Dienste nutzt Du?</h1>

      <div className="w-full space-y-4 mb-8">
        {streamingServices.map((service) => (
          <div key={service} className="flex items-center space-x-3">
            <Checkbox
              id={service}
              checked={selectedServices.includes(service)}
              onCheckedChange={() => toggleService(service)}
              className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black h-6 w-6"
            />
            <label htmlFor={service} className="text-xl cursor-pointer">
              {service}
            </label>
          </div>
        ))}
      </div>

      <Button
        onClick={() => onNext(selectedServices)}
        className="w-full py-6 text-lg bg-blue-500 hover:bg-blue-500 text-white rounded-full mt-auto"
      >
        Weiter
      </Button>
    </div>
  )
}


"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface GenderScreenProps {
  onBack: () => void;
  onSelect: (gender: string) => void;
}

export default function GenderScreen({ onBack, onSelect }: GenderScreenProps) {
  const genderOptions = [
    { id: "male", label: "männlich" },
    { id: "female", label: "weiblich" },
    { id: "diverse", label: "divers" },
  ];

  const [selectedGender, setSelectedGender] = useState<string | null>(null);

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

      <h1 className="text-2xl font-bold text-center mb-16">Was ist Dein Geschlecht?</h1>

      <div className="w-full space-y-6">
        {genderOptions.map((option) => (
          <Button
          key={option.id}
          onClick={() => setSelectedGender(option.id)}
          className={`w-full py-6 text-xl rounded-full transition border-2 ${
            selectedGender === option.id ? "text-black bg-white border-transparent" : "border-white text-soft-white bg-black "
          }`}
        >
          {option.label}
        </Button>
        ))}
      </div>

      {selectedGender && (
        <Button
          onClick={() => onSelect(selectedGender)}
          className="w-full py-6 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded-full mt-8"
        >
          Weiter
        </Button>
      )}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface AgeScreenProps {
  onBack: () => void;
  onSelect: (year: string) => void;
  selectedYear: string;
}

export default function AgeScreen({ onBack, onSelect, selectedYear }: AgeScreenProps) {
  const [years, setYears] = useState<string[]>([]);
  const [tempSelectedYear, setTempSelectedYear] = useState<string>(selectedYear);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate years from 1926 to current year
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let year = 1926; year <= currentYear; year++) {
      yearsList.push(year.toString());
    }
    setYears(yearsList);

    // Scroll to selected year
    setTimeout(() => {
      if (scrollRef.current) {
        const selectedElement = scrollRef.current.querySelector(`[data-year="${selectedYear}"]`);
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: "center", inline: "center" });
        }
      }
    }, 100);
  }, [selectedYear]);

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

      <h1 className="text-2xl font-bold text-center mb-6">Wie alt bist Du?</h1>

      <p className="text-xl text-center mb-16">
        Dein Alter beeinflusst, wie Du Filme erlebst - und warum Deine Oma so in den Bergdoktor verliebt ist.
      </p>

      <div
        ref={scrollRef}
        className="w-full max-w-md border border-[#333] rounded-lg bg-[#0a0a0a] overflow-hidden mb-8"
      >
        <div className="flex items-center justify-center overflow-x-auto py-4 px-2 scrollbar-hide">
          {years.map((year) => (
            <button
              key={year}
              data-year={year}
              className={`mx-2 px-4 py-2 rounded-md min-w-[80px] text-center transition ${
                year === tempSelectedYear
                  ? "bg-white text-black font-bold"
                  : "bg-black text-soft-white border-2 border-white "
              }`}
              onClick={() => setTempSelectedYear(year)} // Only update the selection, no navigation
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {tempSelectedYear && (
        <Button
          onClick={() => onSelect(tempSelectedYear)}
          className="w-full py-6 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded-full mt-8"
        >
          Weiter
        </Button>
      )}
    </div>
  );
}

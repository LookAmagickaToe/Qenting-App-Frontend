"use client"

import { useState } from "react"
import WelcomeScreen from "@/components/welcome-screen"
import StreamingServicesScreen from "@/components/streaming-services-screen"
import GenderScreen from "@/components/gender-screen"
import QuizIntroScreen from "@/components/quiz-intro-screen"
import AgeScreen from "@/components/age-screen"
import QuestionScreen from "@/components/question-screen"
import ExclusionScreen from "@/components/exclusion-screen"
import CalculatingScreen from "@/components/calculating-screen"
import RecommendationsScreen from "@/components/recommendations-screen"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<
    | "welcome"
    | "streaming"
    | "gender"
    | "quiz-intro"
    | "age"
    | "questions"
    | "exclusions"
    | "calculating"
    | "recommendations"
  >("welcome")

  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string>("")
  const [birthYear, setBirthYear] = useState<string>("2000")
  const [currentQuestion, setCurrentQuestion] = useState<number>(1)
  const [answers, setAnswers] = useState<Record<number, number>>({});  // Stores answers
  const [selectedRating, setSelectedRating] = useState<number | null>(null);  // Resets UI
  const [exclusions, setExclusions] = useState<string[]>([])
  const [excludedActor, setExcludedActor] = useState<string>("")
  const [algorithmQuality, setAlgorithmQuality] = useState<number>(35)
  const [recommendedMovies, setRecommendedMovies] = useState<{
    title: string;
    genre: string;
    poster: string | null;
    overview: string;
  }[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [dataReceived, setDataReceived] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null)


  const questions = [
    {
      text: "Wie gerne probierst Du neue Dinge aus, wie Reisen oder ein neues Restaurant?",
      labels: ["Gar nicht", "Selten", "Manchmal", "Oft", "Sehr gerne"],
    },
    {
      text: "Verbringst Du gerne Zeit in großen Gruppen?",
      labels: ["Gar nicht", "Selten", "Manchmal", "Oft", "Sehr gerne"],
    },
    {
      text: "Wie sehr genießt Du es, anderen zu helfen, auch wenn es bedeutet, Deine eigenen Bedürfnisse hintenzustellen?",
      labels: ["Gar nicht", "Selten", "Manchmal", "Oft", "Sehr gerne"],
    },
    {
      text: "Wie oft fühlst Du dich gestresst, ängstlich oder aufgeregt, selbst bei kleinen Dingen?",
      labels: ["Nie", "Selten", "Manchmal", "Häufig", "Sehr oft"],
    },
    {
      text: "Wie organisiert und detailverliebt bist Du in Deinem Alltag?",
      labels: ["Gar nicht", "Wenig", "Manchmal", "Stark", "Sehr stark"],
    },
  ]

  const handleWelcomeClick = () => {
    setCurrentScreen("streaming")
  }

  const handleServicesNext = (services: string[]) => {
    setSelectedServices(services)
    setCurrentScreen("gender")
  }

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender)
    setCurrentScreen("quiz-intro")
  }

  const handleQuizStart = () => {
    setCurrentScreen("age")
  }

  const handleAgeSelect = (year: string) => {
    setBirthYear(year)
    setCurrentScreen("questions")
    setCurrentQuestion(1)
  }

  const handleQuestionAnswer = (questionNumber: number, rating: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionNumber]: rating,  // Store the answer
    }));
  
    if (questionNumber < questions.length) {
      setSelectedRating(null);  // Reset stars for the next question
      setCurrentQuestion(questionNumber + 1);
    } else {
      setCurrentScreen("exclusions");
    }
  };
  
  
  

  const handleExclusionsSubmit = async (excludedGenres: string[], actorName: string) => {
    setExclusions(excludedGenres);
    setExcludedActor(actorName);
    
    // Show loading state while keeping the user on the current screen
    setLoading(true);
    setCurrentScreen("calculating");
  
    try {
      await sendDataToAPI(); // Wait for the API response before moving on
      setCurrentScreen("recommendations"); // Only transition if the API request succeeds
    } catch (error) {
      console.error("API request failed:", error);
      alert("Fehler beim Senden der Daten. Bitte versuche es erneut.");
      setCurrentScreen("exclusions"); // Go back to ExclusionScreen if there’s an error
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleRegenerateRecommendations = () => {
    setCurrentScreen("calculating")

    // Simulate calculation time
    setTimeout(() => {
      // Generate a slightly different quality score
      const newQuality = Math.floor(Math.random() * 20) + 25
      setAlgorithmQuality(newQuality)
      setCurrentScreen("recommendations")
    }, 2000)
  }

  const handleBack = () => {
    if (currentScreen === "recommendations") {
      setCurrentScreen("exclusions")
    } else if (currentScreen === "calculating") {
      setCurrentScreen("exclusions")
    } else if (currentScreen === "exclusions") {
      setCurrentScreen("questions")
      setCurrentQuestion(questions.length)
    } else if (currentScreen === "questions") {
      if (currentQuestion > 1) {
        setCurrentQuestion(currentQuestion - 1)
      } else {
        setCurrentScreen("age")
      }
    } else if (currentScreen === "age") {
      setCurrentScreen("quiz-intro")
    } else if (currentScreen === "quiz-intro") {
      setCurrentScreen("gender")
    } else if (currentScreen === "gender") {
      setCurrentScreen("streaming")
    } else if (currentScreen === "streaming") {
      setCurrentScreen("welcome")
    }
  }
  const sendDataToAPI = async () => {
    if (!sessionId) {
      console.error("No session ID available!");
      return;
    }
  
    const formattedAnswers = questions.map((q, index) => ({
      questionText: q.text,
      rating: answers[index + 1] ?? null,
    }));
  
    const payload = {
      streamingServices: selectedServices,
      gender: selectedGender,
      birthYear: birthYear,
      answers: formattedAnswers,
      exclusions: exclusions,
      excludedActor: excludedActor,
      algorithmQuality: algorithmQuality,
    };
  
    try {
      // Step 1: POST user data
      const postResponse = await fetch(`https://qentin-app-production.up.railway.app/api/data/${sessionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!postResponse.ok) throw new Error(`POST failed: ${postResponse.status}`);
  
      // Step 2: GET recommendations
      const getResponse = await fetch(`https://qentin-app-production.up.railway.app/api/data/${sessionId}/recommendations`);
      if (!getResponse.ok) throw new Error(`GET failed: ${getResponse.status}`);
  
      const result = await getResponse.json();
      console.log("🎬 Recommendations received:", result);
  
      setRecommendedMovies(result.movies);
      setDataReceived(true);
    } catch (error) {
      console.error("❌ Error during data + recommendations fetch:", error);
      alert("Fehler beim Senden oder Abrufen der Daten. Bitte versuche es erneut.");
    }
  };
  
  
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-[#001428]">
      {currentScreen === "welcome" && ( <WelcomeScreen
          onContinue={handleWelcomeClick}
          onSessionCreated={(id) => setSessionId(id)}
        />
      )}

      {currentScreen === "streaming" && <StreamingServicesScreen onNext={handleServicesNext} />}

      {currentScreen === "gender" && <GenderScreen onBack={handleBack} onSelect={handleGenderSelect} />}

      {currentScreen === "quiz-intro" && <QuizIntroScreen onBack={handleBack} onStart={handleQuizStart} />}

      {currentScreen === "age" && <AgeScreen onBack={handleBack} onSelect={handleAgeSelect} selectedYear={birthYear} />}

      {currentScreen === "questions" && (
        <QuestionScreen
          question={questions[currentQuestion - 1].text}
          labels={questions[currentQuestion - 1].labels}
          questionNumber={currentQuestion}
          totalQuestions={questions.length}
          onBack={handleBack}
          onAnswer={(rating) => {
            setSelectedRating(rating); // Store selected rating
            setAnswers(prevAnswers => ({
              ...prevAnswers,
              [currentQuestion]: rating, // Store the answer
            }));
          }}
          onNext={() => { // NEW: Function to load the next question
            if (currentQuestion < questions.length) {
              setSelectedRating(null); // Reset stars for next question
              setCurrentQuestion(currentQuestion + 1);
            } else {
              setCurrentScreen("exclusions");
            }
          }}
          selectedRating={selectedRating ?? answers[currentQuestion] ?? null} // Restore previous answers
        />
      )}
      {currentScreen === "exclusions" && (
        <ExclusionScreen
          onBack={handleBack}
          onSubmit={handleExclusionsSubmit}
          initialExclusions={exclusions}
          initialActorName={excludedActor}
        />
      )}
      {currentScreen === "calculating" && (
        <CalculatingScreen 
          quality={algorithmQuality} 
          loading={loading} 
          dataReceived={dataReceived}
          onResend={async () => {
            setLoading(true);
            try {
              await sendDataToAPI();
            } catch (error) {
              console.error("API request failed:", error);
              alert("Fehler beim Senden der Daten. Bitte versuche es erneut.");
            }
            setLoading(false);
          }} 
          onSeeRecommendations={() => setCurrentScreen("recommendations")}
        />
      )}
      {currentScreen === "recommendations" && (
        <RecommendationsScreen
          recommendedMovies={recommendedMovies}
          onBack={handleBack}
          quality={algorithmQuality}
          onRegenerate={handleRegenerateRecommendations}
        />
      )}


    </main>
  )
}


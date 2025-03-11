import Image from "next/image";

interface CalculatingScreenProps {
  quality: number;
  loading: boolean;
  dataReceived: boolean;
  onResend: () => void;
  onSeeRecommendations: () => void;
}

export default function CalculatingScreen({
  quality,
  loading,
  dataReceived,
  onResend,
  onSeeRecommendations,
}: CalculatingScreenProps) {
  return (
    <div className="flex flex-col items-center w-full h-screen px-6 pt-16 pb-24 text-white">
      <div className="w-32 h-32 mb-8 relative">
        <Image src="/QLogo.png" alt="Qentin Logo" fill className="object-contain" priority />
      </div>

      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 className="text-2xl font-bold mb-6">Das ist gut genug für den Anfang!</h1>

        <p className="text-xl mb-16">Qentin berechnet Dein Ergebnis...</p>

        <div className="relative">
          <div className="text-7xl font-bold text-gray-400 mb-4">{quality}</div>

          <div className="absolute -right-16 top-0 bg-red-500 text-white p-3 rounded-lg">
            <div className="absolute w-4 h-4 bg-red-500 transform rotate-45 -left-2 top-5"></div>
            <p className="text-sm font-bold text-center">
              Deine Algorithmus
              <br />
              Qualität
            </p>
          </div>

          <div className="w-64 h-48 relative">
            <Image src="/brain-network.svg" alt="Neural Network" fill className="object-contain" />
          </div>
        </div>

        {/* Button for Resending API or Moving to Recommendations */}
        <button
          onClick={dataReceived ? onSeeRecommendations : onResend}
          disabled={loading}
          className={`mt-6 px-6 py-3 rounded-lg font-bold text-white transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Erneut senden..." : dataReceived ? "Empfehlungen ansehen" : "API erneut senden"}
        </button>
      </div>
    </div>
  );
}

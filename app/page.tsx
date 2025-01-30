import { ConvAI } from "@/components/ConvAI";
import FAQSection from "@/components/FAQ";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-6 pb-6 gap-2 sm:p-6 font-[family-name:var(--font-geist-sans)]"
    >
      
      {/* Heading Section */}
      <header className="row-start-1 text-center space-y-2">
  <h1
    className="
      text-4xl 
      md:text-5xl 
      font-extrabold 
      tracking-tight 
      bg-gradient-to-r 
      from-purple-600 
      via-pink-500 
      to-red-400 
      text-transparent 
      bg-clip-text 
      opacity-0 
      animate-slideInDown
    "
    style={{
      animationDelay: "0.3s",
      animationFillMode: "forwards",
    }}
  >
    Conversation Agent
  </h1>
  <p
    className="
      text-lg 
      md:text-xl 
      text-gray-600 
      opacity-0 
      animate-fadeIn
    "
    style={{
      animationDelay: "0.5s",
      animationFillMode: "forwards",
    }}
  >
    Your personal Agent assistant for seamless conversations
  </p>
</header>



      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <ConvAI />
      </main>

      {/* Inline Styles for Animations */}
      <style>
        {`
          @keyframes slideInDown {
            0% {
              transform: translateY(-50%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          .animate-slideInDown {
            animation: slideInDown 1s ease-in-out;
          }

          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }
        `}
      </style>
      <FAQSection />
    </div>
  );
}

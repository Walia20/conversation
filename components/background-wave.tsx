"use client";
import { motion } from "framer-motion";

export const BackgroundWave = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none hidden md:block overflow-hidden">
      <motion.video
        src="/wave-loop.mp4"
        autoPlay
        muted
        loop
        controls={false}
        // Initial fade-in, plus a gentle scale-up to add depth
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 2, ease: "easeOut" }}
        // Tailwind classes for added color pop
        className="w-full h-full object-cover brightness-125 saturate-150"
      />

      {/* Radial gradient overlay to add a stylish color accent */}
      <div className="absolute inset-0 mix-blend-overlay bg-radial-gradient-at-b from-purple-600 via-transparent to-transparent opacity-80 pointer-events-none" />
    </div>
  );
};

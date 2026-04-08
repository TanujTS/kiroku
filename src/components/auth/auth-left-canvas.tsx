"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedWaves from "@/components/auth/animated-waves";
import BlurText from "@/components/BlurText";

export default function AuthLeftCanvas() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-[#181D2D]">
      {/* Background Animation - Fade In */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <AnimatedWaves />
      </motion.div>

      {/* Overlay Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10"
      >
        <Link
          href="/"
          className="text-[#F1EBE4] font-heading font-bold tracking-tight text-3xl hover:text-white transition-colors"
        >
          Kiroku
        </Link>
      </motion.div>

      <div className="relative z-10 max-w-lg mb-20 md:mb-32">
        <div className="text-[#F1EBE4] font-heading font-bold tracking-tight text-5xl md:text-6xl leading-[1.1] mb-6">
          <BlurText
            text="Your Editorial Platform."
            delay={50}
            animateBy="words"
            direction="top"
            className="justify-start text-[#F1EBE4]"
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/80 font-sans text-lg md:text-xl leading-relaxed"
        >
          A modern space for your writing. Organize your posts in an environment designed for
          clarity and calm.
        </motion.p>
      </div>
    </div>
  );
}

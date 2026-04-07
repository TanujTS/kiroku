"use client";

import { motion, type Variants } from "framer-motion";
import BlurText from "@/components/BlurText";
import StarBorder from "@/components/StarBorder";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Hero() {
  return (
    <div className="min-h-[calc(100dvh-80px)] bg-background text-foreground flex flex-col overflow-hidden">
      {/* Hero Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center px-4 text-center pb-24 md:pb-32"
      >
        <motion.h1
          variants={itemVariants}
          className="font-heading font-medium tracking-tight text-secondary text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] mb-8 max-w-5xl mx-auto"
        >
          <BlurText
            text="A sanctuary for your thoughts."
            delay={50}
            animateBy="words"
            direction="top"
            className="justify-center"
          />
        </motion.h1>

        <div className="font-sans text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-14 justify-center text-center">
          <BlurText
            text="Experience an editorial approach to personal writing. Where quietude meets modern craftsmanship."
            delay={50}
            animateBy="words"
            direction="top"
            className="justify-center"
          />
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <StarBorder
            as={motion.button}
            color="var(--secondary)"
            className="border-none"
            speed="3s"
            thickness={4}
          >
            Start Writing
          </StarBorder>
          <Button
            size="lg"
            className="font-sans rounded-full px-8 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/80 border border-transparent h-14"
          >
            Explore Chronicles
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}

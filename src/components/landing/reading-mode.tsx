"use client";

import {
  IconBooks as Library,
  IconMoon as Moon,
  IconSun as Sun,
  IconTypography as Type,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const MotionCard = motion.create(Card);

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function ReadingMode() {
  return (
    <section className="min-h-dvh py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariants}
          className="text-foreground font-heading font-bold tracking-tight text-4xl md:text-5xl lg:text-5xl mb-6"
        >
          Distraction-Free Reading
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.1 },
            },
          }}
          className="text-muted-foreground font-sans text-lg md:text-xl"
        >
          Focus on what matters most. No ads, no sidebars, no interruptions. Just the rhythm of your
          words.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Zen Canvas - Col Span 2 */}
        <MotionCard
          variants={fadeUpVariants}
          className="md:col-span-2 bg-card border-border/60 shadow-sm rounded-3xl p-8 lg:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between group min-h-[320px]"
        >
          <div className="md:w-1/2 relative z-10 flex flex-col justify-center">
            <h3 className="font-heading font-medium tracking-tight text-secondary text-3xl mb-4">
              Zen Canvas
            </h3>
            <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed">
              A clean slate for your mind. The UI fades away as you type, leaving only you and your
              thoughts in a pure typographic space.
            </p>
          </div>
          {/* Faux Window Graphic */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0 relative flex items-end justify-end md:absolute md:-bottom-6 md:-right-6">
            <div className="w-[110%] md:w-80 h-48 bg-background border border-border/60 rounded-t-2xl shadow-xl p-5 transition-transform duration-500 group-hover:-translate-y-3 flex flex-col gap-4">
              <div className="flex gap-2 mb-2">
                <div className="size-2.5 rounded-full bg-secondary/30 group-hover:bg-[#FF5F56] transition-colors duration-300"></div>
                <div className="size-2.5 rounded-full bg-secondary/30 group-hover:bg-[#FFBD2E] transition-colors duration-300 delay-[50ms]"></div>
                <div className="size-2.5 rounded-full bg-secondary/30 group-hover:bg-[#27C93F] transition-colors duration-300 delay-100"></div>
              </div>
              <div className="w-3/4 h-2.5 bg-border/40 rounded-full transition-all duration-1000 ease-out group-hover:w-[85%]"></div>
              <div className="w-full h-2.5 bg-border/20 rounded-full transition-all duration-1000 ease-out delay-100 group-hover:w-[95%]"></div>
              <div className="w-5/6 h-2.5 bg-border/20 rounded-full transition-all duration-1000 ease-out delay-200 group-hover:w-full"></div>
              <div className="w-4/5 h-2.5 flex items-center gap-1 transition-all duration-1000 ease-out delay-300 group-hover:w-[90%]">
                <div className="w-full h-full bg-border/20 rounded-full"></div>
                <div className="h-full w-1.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity delay-700"></div>
              </div>
            </div>
          </div>
        </MotionCard>

        {/* Adaptive Tones - Col Span 1 */}
        <MotionCard
          variants={fadeUpVariants}
          className="group md:col-span-1 bg-primary text-primary-foreground border-transparent hover:bg-card hover:border-border/60 hover:shadow-sm transition-all duration-700 shadow-lg shadow-primary/20 rounded-3xl p-8 lg:p-10 flex flex-col justify-end min-h-[320px]"
        >
          <div className="mb-auto mt-2 relative size-10">
            <Moon className="absolute inset-0 size-10 text-primary-foreground/90 transition-all duration-700 rotate-0 scale-100 opacity-100 group-hover:-rotate-90 group-hover:scale-50 group-hover:opacity-0" />
            <Sun className="absolute inset-0 size-10 text-amber-500 transition-all duration-700 rotate-90 scale-50 opacity-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100" />
          </div>
          <div className="relative z-10">
            <h3 className="font-heading font-medium tracking-tight text-primary-foreground group-hover:text-foreground transition-colors duration-700 text-2xl mb-3 mt-4">
              Adaptive Tones
            </h3>
            <p className="font-sans text-primary-foreground/80 group-hover:text-muted-foreground transition-colors duration-700 text-sm leading-relaxed">
              Automatic shifts between light and dark modes based on your environment and circadian
              rhythm.
            </p>
          </div>
        </MotionCard>

        {/* Editorial Serif - Col Span 1 */}
        <MotionCard
          variants={fadeUpVariants}
          className="group md:col-span-1 bg-card border-border/60 shadow-sm rounded-3xl p-8 lg:p-10 flex flex-col items-center justify-center text-center min-h-[320px]"
        >
          <div className="size-20 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-all duration-500 flex items-center justify-center text-secondary mb-8 shadow-sm border border-secondary/10 group-hover:scale-110 ease-out">
            <Type className="size-8 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h3 className="font-heading font-medium tracking-tight text-foreground text-2xl mb-3">
            Editorial Serif
          </h3>
          <p className="font-sans text-muted-foreground text-sm leading-relaxed">
            Premium typography designed for long-form comfort.
          </p>
        </MotionCard>

        {/* Curated Collections - Col Span 2 */}
        <MotionCard
          variants={fadeUpVariants}
          className="md:col-span-2 bg-card border-border/60 shadow-sm rounded-3xl p-8 lg:p-10 relative overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between gap-12 group min-h-[320px]"
        >
          <div className="md:w-1/2 relative z-10 flex flex-col justify-center">
            <h3 className="font-heading font-medium tracking-tight text-foreground text-3xl mb-4">
              Curated Collections
            </h3>
            <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed">
              Group your posts into distinct collections—like "Tutorials" or "Dev Log". Keep your
              workspace uncluttered, easily returning to specific topics.
            </p>
          </div>
          <div className="md:w-1/2 flex items-center justify-center w-full min-h-[160px]">
            <div className="relative size-36 md:size-40 flex items-center justify-center">
              <div className="absolute inset-0 bg-secondary/10 rounded-2xl rotate-[-8deg] transition-transform duration-500 group-hover:rotate-[-14deg] shadow-sm border border-secondary/10"></div>
              <div className="absolute inset-0 bg-secondary/20 rounded-2xl rotate-[4deg] transition-transform duration-500 group-hover:rotate-[8deg] shadow-sm border border-secondary/10"></div>
              <div className="absolute inset-0 bg-background rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 shadow-md border border-border/60 z-10">
                <Library className="size-12 text-secondary" />
              </div>
            </div>
          </div>
        </MotionCard>
      </motion.div>
    </section>
  );
}

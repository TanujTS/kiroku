"use client";

import { useState } from "react";
import { Globe, Lock, Link as LinkIcon, ShieldCheck, Share2, EyeOff } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const MotionCard = motion.create(Card);

export default function JournalMode() {
  const [activeCard, setActiveCard] = useState<string>("your-data");

  const toggleCard = (id: string) => {
    setActiveCard(id);
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      {/* Left Column */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl"
      >
        <h2 className="text-secondary font-heading font-bold tracking-tight text-4xl md:text-5xl lg:text-5xl mb-6">
          Journal Mode
        </h2>
        <p className="text-muted-foreground font-sans text-lg mb-12">
          Control who sees your world. Kiroku offers three distinct privacy layers designed for modern expression.
        </p>
        
        <div className="space-y-10">
          {/* Public */}
          <div className="flex gap-5">
            <div className="shrink-0 flex items-center justify-center size-14 rounded-2xl bg-card border border-border/60 shadow-sm text-secondary">
              <Globe className="size-6" />
            </div>
            <div>
              <h3 className="text-foreground font-heading font-bold tracking-tight text-xl mb-1">Public</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                Share your stories with the world. Search engine optimized and beautifully rendered for global readers.
              </p>
            </div>
          </div>
          
          {/* Private */}
          <div className="flex gap-5">
            <div className="shrink-0 flex items-center justify-center size-14 rounded-2xl bg-card border border-border/60 shadow-sm text-secondary">
              <Lock className="size-6" />
            </div>
            <div>
              <h3 className="text-foreground font-heading font-bold tracking-tight text-xl mb-1">Private</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                Your sanctuary. Encrypted and accessible only by you. No tracking, no noise, just your thoughts.
              </p>
            </div>
          </div>

          {/* Link-only */}
          <div className="flex gap-5">
            <div className="shrink-0 flex items-center justify-center size-14 rounded-2xl bg-card border border-border/60 shadow-sm text-secondary">
              <LinkIcon className="size-6" />
            </div>
            <div>
              <h3 className="text-foreground font-heading font-bold tracking-tight text-xl mb-1">Link-only</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                A secret shared. Only those with the unique, unguessable URL can view your entry.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Column (Bento Box) */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"
      >
        {/* Left column of Bento */}
        <div className="flex flex-col gap-6 lg:mt-12">
          {/* Encryption */}
          <MotionCard 
            layout
            onClick={() => toggleCard("encryption")}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer transition-all duration-300 rounded-3xl p-6 lg:p-8 flex flex-col justify-center ${activeCard === "encryption"
                ? "bg-secondary text-secondary-foreground border-secondary shadow-2xl shadow-secondary/30"
                : "bg-card border-border/80 shadow-none hover:border-secondary/40"
              }`}
          >
            <CardHeader className="p-0 mb-6 space-y-0">
              <ShieldCheck className={`size-7 transition-colors duration-300 ${activeCard === "encryption" ? "text-secondary-foreground" : "text-secondary"}`} />
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className={`font-heading font-bold tracking-tight text-xl mb-3 transition-colors duration-300 ${activeCard === "encryption" ? "text-secondary-foreground" : "text-foreground"}`}>
                Encryption
              </CardTitle>
              <CardDescription className={`font-sans text-sm leading-relaxed transition-colors duration-300 ${activeCard === "encryption" ? "text-secondary-foreground/80" : "text-muted-foreground"}`}>
                AES-256 military grade security for your private thoughts.
              </CardDescription>
            </CardContent>
          </MotionCard>

          {/* Hidden Metadata */}
          <MotionCard
            layout
            onClick={() => toggleCard("metadata")}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer transition-all duration-300 rounded-3xl p-6 lg:p-8 flex flex-col justify-center ${activeCard === "metadata"
                ? "bg-secondary text-secondary-foreground border-secondary shadow-2xl shadow-secondary/30"
                : "bg-card border-border/80 shadow-none hover:border-secondary/40"
              }`}
          >
            <CardHeader className="p-0 mb-6 space-y-0">
              <EyeOff className={`size-7 transition-colors duration-300 ${activeCard === "metadata" ? "text-secondary-foreground" : "text-secondary"}`} />
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className={`font-heading font-bold tracking-tight text-xl mb-3 transition-colors duration-300 ${activeCard === "metadata" ? "text-secondary-foreground" : "text-foreground"}`}>
                Hidden Metadata
              </CardTitle>
              <CardDescription className={`font-sans text-sm leading-relaxed transition-colors duration-300 ${activeCard === "metadata" ? "text-secondary-foreground/80" : "text-muted-foreground"}`}>
                Remove EXIF data from images automatically.
              </CardDescription>
            </CardContent>
          </MotionCard>
        </div>

        {/* Right column of Bento */}
        <div className="flex flex-col gap-6 lg:-mt-12">
          {/* Magic Links */}
          <MotionCard
            layout
            onClick={() => toggleCard("magic-links")}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer transition-all duration-300 rounded-3xl p-6 lg:p-8 flex flex-col justify-center ${activeCard === "magic-links"
                ? "bg-secondary text-secondary-foreground border-secondary shadow-2xl shadow-secondary/30"
                : "bg-card border-border/80 shadow-none hover:border-secondary/40"
              }`}
          >
            <CardHeader className="p-0 mb-6 space-y-0">
              <Share2 className={`size-7 transition-colors duration-300 ${activeCard === "magic-links" ? "text-secondary-foreground" : "text-secondary"}`} />
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className={`font-heading font-bold tracking-tight text-xl mb-3 transition-colors duration-300 ${activeCard === "magic-links" ? "text-secondary-foreground" : "text-foreground"}`}>
                Magic Links
              </CardTitle>
              <CardDescription className={`font-sans text-sm leading-relaxed transition-colors duration-300 ${activeCard === "magic-links" ? "text-secondary-foreground/80" : "text-muted-foreground"}`}>
                Expires after 24 hours or 100 views.
              </CardDescription>
            </CardContent>
          </MotionCard>

          {/* Blue Card */}
          <MotionCard 
            layout
            onClick={() => toggleCard("your-data")}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer transition-all duration-300 rounded-3xl p-6 lg:p-8 flex flex-col justify-end shadow-none min-h-[200px] lg:min-h-[220px] select-none ${activeCard === "your-data"
                ? "bg-secondary text-secondary-foreground border-secondary shadow-2xl shadow-secondary/30"
                : "bg-card border-border/80 shadow-none hover:border-secondary/40"
              }`}
          >
            <CardHeader className="p-0">
              <CardTitle className={`font-heading font-medium tracking-tight text-3xl leading-[1.15] mb-2 transition-colors duration-300 ${activeCard === "your-data" ? "text-secondary-foreground" : "text-foreground"}`}>
                Your data.<br />Your rules.
              </CardTitle>
            </CardHeader>
          </MotionCard>
        </div>
      </motion.div>
    </section>
  );
}

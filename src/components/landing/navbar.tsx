"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-4 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-heading font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Kiroku
        </Link>
        {/* Desktop & Mobile Call to Action */}
        <div>
          <Link href="/login">
            <Button className="rounded-full shadow-none font-sans font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-transform active:scale-[0.98]">
              Enter Sanctuary
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

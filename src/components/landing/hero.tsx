"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";
import { motion } from "framer-motion";
import StarBorder from "@/components/StarBorder";
import BlurText from "@/components/BlurText";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.1
        } 
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Hero() {
    return (
        <div className="min-h-dvh bg-background text-foreground flex flex-col overflow-hidden">
            {/* Navigation */}
            <motion.header 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8"
            >
                <div className="flex items-center">
                    <Link href="/" className="text-secondary font-heading font-bold tracking-tight text-2xl hover:text-secondary/90 transition-colors">
                        Kiroku
                    </Link>
                </div>

                {/* todo: add conditional rendering here when auth, if auth -> show navbar, else show login/signup */}
            </motion.header>

            {/* Hero Content */}
            <motion.main 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 flex flex-col items-center justify-center px-4 text-center pb-24 md:pb-32" 
            >
                <motion.h1 variants={itemVariants} className="font-heading font-medium tracking-tight text-secondary text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] mb-8 max-w-5xl mx-auto">
                    A sanctuary for <br className="hidden md:block" /> your thoughts.
                </motion.h1>

                <motion.div variants={itemVariants}>
                    <BlurText
                        text="Experience an editorial approach to personal journaling. Where quietude meets modern craftsmanship." 
                        delay={30}
                        animateBy="words"
                        direction="top"
                        className="font-sans text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-14 justify-center text-center"
                    />
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
                    <StarBorder 
                        as="button" 
                        color="var(--color-primary)" 
                        className="hover:scale-105 transition-transform duration-300"
                    >
                        Start Writing
                    </StarBorder>
                    <Button size="lg" className="font-sans rounded-full px-8 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/80 border border-transparent h-14">
                        Explore Chronicles
                    </Button>
                </motion.div>
            </motion.main>
        </div>
    );
}

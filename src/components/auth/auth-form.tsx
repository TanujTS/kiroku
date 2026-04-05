"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-[85vh] pt-12 md:pt-0">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        
        {/* Toggle - Zen Minimalist Tabs */}
        <motion.div variants={itemVariants} className="relative flex gap-8 mb-16 border-b border-border/40 pb-[10px]">
          <button 
            className={`relative pb-0 text-sm font-semibold transition-colors font-sans ${isSignIn ? "text-secondary" : "text-muted-foreground hover:text-secondary/80"}`}
            onClick={() => setIsSignIn(true)}
          >
            Log In
          </button>
          <button 
            className={`relative pb-0 text-sm font-semibold transition-colors font-sans ${!isSignIn ? "text-secondary" : "text-muted-foreground hover:text-secondary/80"}`}
            onClick={() => setIsSignIn(false)}
          >
            Create Account
          </button>
          {/* Bulletproof Animated Underline */}
          <motion.div 
            className="absolute bottom-[-1px] left-0 h-[2px] bg-secondary"
            initial={false}
            animate={{ 
              x: isSignIn ? 0 : 76, 
              width: isSignIn ? 45 : 112 
            }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-10">
            <h1 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-foreground mb-3">
              {isSignIn ? "Welcome back." : "Begin your journey."}
            </h1>
            <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed pr-6">
              {isSignIn ? "Please enter your details to access your sanctuary." : "Create an account to build your quiet space."}
            </p>
        </motion.div>

        <motion.form variants={itemVariants} layout className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <AnimatePresence mode="popLayout" initial={false}>
            {!isSignIn && (
              <motion.div 
                key="name" 
                layout 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-sm font-medium text-secondary/80 font-sans">Pen Name</label>
                <Input 
                  type="text" 
                  className="rounded-lg bg-transparent border-secondary/40 focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary h-12 px-4 shadow-none transition-all font-sans"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="space-y-2">
            <label className="text-sm font-medium text-secondary/80 font-sans">Email Address</label>
            <Input 
              type="email" 
              placeholder="hello@kiroku.app"
              className="rounded-lg bg-transparent border-secondary/40 focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary h-12 px-4 shadow-none transition-all font-sans"
            />
          </motion.div>

          <motion.div layout className="space-y-2">
            <div className="flex items-center justify-between">
               <label className="text-sm font-medium text-secondary/80 font-sans">Password</label>
               {isSignIn && <a href="#" className="text-xs font-semibold text-muted-foreground hover:text-secondary transition-colors font-sans">Forgot password?</a>}
            </div>
            <Input 
              type="password" 
              placeholder="••••••••" 
              className="rounded-lg bg-transparent border-secondary/40 focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary h-12 px-4 shadow-none transition-all font-mono tracking-widest text-lg py-0"
            />
          </motion.div>

          <motion.div layout className="pt-6">
            <Button type="submit" size="lg" className="w-full rounded-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-none cursor-pointer font-sans transition-transform active:scale-[0.98]">
              {isSignIn ? "Enter Sanctuary" : "Create Sanctuary"}
            </Button>
          </motion.div>
        </motion.form>

        <motion.div variants={itemVariants} className="relative my-10 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/40"></div>
          </div>
          <span className="relative text-xs tracking-[0.15em] text-muted-foreground font-medium uppercase bg-background px-4 font-sans">
            Or continue with
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="rounded-full h-12 border-border/40 bg-transparent hover:bg-muted/50 font-medium text-foreground transition-colors shadow-none cursor-pointer font-sans">
            <svg className="size-4 mr-2" viewBox="0 0 24 24">
               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
               <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
               <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
               <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="rounded-full h-12 border-border/40 bg-transparent hover:bg-muted/50 font-medium text-foreground transition-colors shadow-none cursor-pointer font-sans">
            <svg className="size-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </Button>
        </motion.div>

      </motion.div>
    </div>
  );
}

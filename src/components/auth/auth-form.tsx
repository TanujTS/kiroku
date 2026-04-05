"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons-react";
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
            <IconBrandGoogle className="size-4 mr-2" />
            Google
          </Button>
          <Button variant="outline" className="rounded-full h-12 border-border/40 bg-transparent hover:bg-muted/50 font-medium text-foreground transition-colors shadow-none cursor-pointer font-sans">
            <IconBrandGithub className="size-4 mr-2" />
            GitHub
          </Button>
        </motion.div>

      </motion.div>
    </div>
  );
}

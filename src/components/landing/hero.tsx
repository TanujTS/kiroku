import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";

export default function Hero() {
    return (
        <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
            {/* Navigation */}
            <header className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
                <div className="flex items-center">
                    <Link href="/" className="text-secondary font-heading font-bold tracking-tight text-2xl hover:text-secondary/90 transition-colors">
                        Kiroku
                    </Link>
                </div>

                {/* todo: add conditional rendering here when auth, if auth -> show navbar, else show login/signup */}
            </header >

            {/* Hero Content */}
            < main className="flex-1 flex flex-col items-center justify-center px-4 text-center pb-24 md:pb-32" >
                <h1 className="font-heading font-medium tracking-tight text-secondary text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] mb-8 max-w-5xl mx-auto">
                    A sanctuary for <br className="hidden md:block" /> your thoughts.
                </h1>

                <p className="font-sans text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-14">
                    Experience an editorial approach to personal journaling.<br className="hidden md:block" />
                    Where quietude meets modern craftsmanship.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Button size="lg" className="font-sans rounded-full px-8 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14">
                        Start Writing
                    </Button>
                    <Button size="lg" className="font-sans rounded-full px-8 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/80 border border-transparent h-14">
                        Explore Chronicles
                    </Button>
                </div>
            </main >
        </div >
    );
}

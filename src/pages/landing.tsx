import Hero from "@/components/landing/hero";
import JournalMode from "@/components/landing/journal-mode";

export default function Landing() {
    return (
        <main className="flex flex-col min-h-dvh bg-background">
            <Hero />
            <JournalMode />
        </main>
    );
}
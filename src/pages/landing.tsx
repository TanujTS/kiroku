import Hero from "@/components/landing/hero";
import JournalMode from "@/components/landing/journal-mode";
import Navbar from "@/components/landing/navbar";
import ReadingMode from "@/components/landing/reading-mode";

export default function Landing() {
  return (
    <main className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <Hero />
      <JournalMode />
      <ReadingMode />
    </main>
  );
}

import Hero from "@/components/landing/hero";
import JournalMode from "@/components/landing/journal-mode";
import ReadingMode from "@/components/landing/reading-mode";

export default function Landing() {
  return (
    <main className="flex flex-col min-h-dvh bg-background">
      <Hero />
      <JournalMode />
      <ReadingMode />
    </main>
  );
}

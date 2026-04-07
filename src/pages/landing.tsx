import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import ReadingMode from "@/components/landing/reading-mode";

export default function Landing() {
  return (
    <main className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <Hero />
      <ReadingMode />
    </main>
  );
}

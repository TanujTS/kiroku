'use client'
import Aurora from "@/components/aurora-bg";
import DecryptedText from "@/components/decrypted-text";
import GradientText from "@/components/gradient-text";

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={["#1e202c", "#60519b", "#bfc0d1"]}
                    blend={0.6}
                    amplitude={1.2}
                    speed={0.8}
                />
            </div>
            <div className="relative z-10 text-center flex flex-col gap-4 px-4">
                <h1 className="font-space text-7xl md:text-9xl font-bold tracking-tighter text-foreground cursor-default">
                    Kiroku
                </h1>
                <div className="font-nunito text-lg md:text-xl font-light tracking-wide text-muted-foreground/80 leading-none">

                    <GradientText
                        colors={["#60519b", "#bfc0d1", "#7c6db5", "#60519b"]}
                        animationSpeed={6}
                        showBorder={false}
                        className="hover:cursor-default"
                    >
                        <DecryptedText
                            text="where your story finds its breath"
                            speed={80}
                            maxIterations={10}
                            animateOn={"view"}
                            sequential={true}
                        />
                    </GradientText>
                </div>
            </div>
        </section>
    )
}
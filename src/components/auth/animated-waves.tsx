export default function AnimatedWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#181D2D]">
      {/* Abstract Gradient Orbs */}
      <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#243555] blur-[100px] opacity-70 mix-blend-screen animate-pulse duration-10000"></div>
      <div className="absolute bottom-[0%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-[#1A4F6B] blur-[120px] opacity-60 mix-blend-screen animate-pulse"></div>
      
      {/* Wavy SVG overlay */}
      <svg className="absolute w-[200%] h-full bottom-0 left-0" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
         <style>
             {`
                @keyframes shiftWave {
                   0% { transform: translateX(0); }
                   50% { transform: translateX(-25%); }
                   100% { transform: translateX(0); }
                }
                .wave-1 { animation: shiftWave 30s ease-in-out infinite; }
                .wave-2 { animation: shiftWave 40s ease-in-out infinite alternate-reverse; }
                .wave-3 { animation: shiftWave 45s ease-in-out infinite; }
             `}
         </style>
        {/* Deep background wave */}
        <path className="wave-1 origin-bottom" fill="rgba(36, 53, 85, 0.4)" d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        {/* Mid-layer wave */}
        <path className="wave-2 origin-bottom" fill="rgba(26, 79, 107, 0.5)" d="M0,96L60,101.3C120,107,240,117,360,138.7C480,160,600,192,720,197.3C840,203,960,181,1080,160C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        {/* Foreground dark wave */}
        <path className="wave-3 origin-bottom" fill="rgba(20, 29, 43, 0.8)" d="M0,256L80,240C160,224,320,192,480,192C640,192,800,224,960,234.7C1120,245,1280,235,1360,229.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#10141e] via-transparent to-transparent opacity-80 pointer-events-none"></div>
    </div>
  );
}

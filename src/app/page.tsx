import Image from "next/image";

const backgroundStyle = {
  background: `
    radial-gradient(circle at top right, rgba(173, 201, 130, 0.08), transparent 40%),
    radial-gradient(circle at bottom left, rgba(173, 201, 130, 0.05), transparent 40%),
    #0a090c
  `
};

export default function Home() {
  return (
    <div style={backgroundStyle} className="w-screen h-screen flex items-center justify-center">

    </div>
  );
}

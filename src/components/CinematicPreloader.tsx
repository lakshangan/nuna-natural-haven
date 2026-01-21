import { useState, useEffect } from "react";
import nunalogo from "@/assets/nunalogo.png";

export const CinematicPreloader = ({ onFinished }: { onFinished: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [isRevealing, setIsRevealing] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setFadeOut(true), 400);
                    setTimeout(() => setIsRevealing(true), 600);
                    setTimeout(() => onFinished(), 1200);
                    return 100;
                }
                const increment = Math.random() * 3 + 1.5;
                return Math.min(prev + increment, 100);
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onFinished]);

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-[#fbfaf7] flex flex-col items-center justify-center transition-all duration-[2000ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${fadeOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
                }`}
        >
            {/* Organic Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />

            {/* Ambient Warmth Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#e8f0eb] blur-[140px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#fcf5e8] blur-[140px] rounded-full" />
            </div>

            {/* Logo Composition */}
            <div className={`relative flex flex-col items-center transition-all duration-[1200ms] ease-out ${fadeOut ? "blur-2xl opacity-0 translate-y-4" : "blur-0 opacity-100 translate-y-0"
                }`}>
                <div className="relative group p-8">
                    {/* Soft Organic Shadow for depth */}
                    <div
                        className="absolute inset-0 bg-[#344d3e]/5 blur-[60px] rounded-full transition-opacity duration-1000"
                        style={{ opacity: progress / 100 }}
                    />

                    {/* Logo - Using Multiply to blend into the paper background */}
                    <div className="relative z-10">
                        <img
                            src={nunalogo}
                            alt="Nuna Origin"
                            className="h-28 md:h-36 w-auto object-contain transition-all duration-1000 ease-out mix-blend-multiply"
                            style={{
                                opacity: 0.1 + (progress / 100) * 0.9,
                                filter: `drop-shadow(0 4px 12px rgba(52,77,62,${progress / 600}))`
                            }}
                        />
                    </div>
                </div>

                {/* Minimalist Progress Indicator */}
                <div className="mt-12 flex flex-col items-center gap-8">
                    {/* Ultra-soft scanning line */}
                    <div className="w-48 h-[1px] bg-[#344d3e]/10 relative overflow-hidden rounded-full">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#344d3e]/40 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="overflow-hidden h-6 flex flex-col items-center">
                        <p className={`text-[#344d3e]/40 text-[9px] uppercase tracking-[0.6em] font-medium transition-all duration-1000 delay-300 ${isRevealing ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
                            }`}>
                            Harvesting Nature's Care
                        </p>
                    </div>
                </div>
            </div>

            {/* Corner Precision Accents (Warm Bronze) */}
            <div className="absolute inset-16 pointer-events-none opacity-[0.15]">
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#344d3e]" />
                <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#344d3e]" />
                <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#344d3e]" />
                <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#344d3e]" />
            </div>
        </div>
    );
};

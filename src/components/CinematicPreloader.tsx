import { useState, useEffect } from "react";
import nunalogo from "@/assets/nunalogo.png";

export const CinematicPreloader = ({ onFinished }: { onFinished: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setFadeOut(true), 500);
                    setTimeout(() => onFinished(), 1200);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onFinished]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a1a12] transition-all duration-1000 ease-in-out ${fadeOut ? "opacity-0 invisible scale-110" : "opacity-100 visible"
                }`}
        >
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/40 to-transparent pointer-events-none" />

            <div className="relative flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-1000">
                {/* Logo with pulsing glow */}
                <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
                    <img
                        src={nunalogo}
                        alt="Nuna Origin"
                        className="h-24 md:h-32 w-auto object-contain relative z-10 brightness-110"
                    />
                </div>

                {/* Typography */}
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-white text-2xl md:text-3xl font-heading font-light tracking-[0.3em] uppercase opacity-90">
                        Nuna Origin
                    </h1>
                    <p className="text-emerald-200/50 text-xs md:text-sm tracking-[0.5em] uppercase font-medium">
                        Purely Botanical Sanctuary
                    </p>
                </div>

                {/* Progress bar container */}
                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                    <div
                        className="absolute top-0 left-0 h-full bg-emerald-400/80 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                    <div className="absolute inset-0 animate-shimmer opacity-50" />
                </div>

                <span className="text-white/30 text-[10px] tabular-nums tracking-widest transition-opacity duration-300">
                    {progress}%
                </span>
            </div>

            {/* Cinematic Overlay Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                <div className="w-full h-px bg-white/5" />
                <div className="w-full h-px bg-white/5" />
            </div>
        </div>
    );
};

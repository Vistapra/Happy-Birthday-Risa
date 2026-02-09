import React, { useState } from 'react';
import { GiftBoxConfig } from '../types';

interface Props {
    data: GiftBoxConfig;
    recipientName: string;
    onOpen: () => void;
    onBack: () => void;
}

const GiftBoxScreen: React.FC<Props> = ({ data, recipientName, onOpen, onBack }) => {
    const [isOpening, setIsOpening] = useState(false);

    const handleOpen = () => {
        if (isOpening) return;
        setIsOpening(true);

        // Delay actual navigation to allow animation to play
        setTimeout(() => {
            onOpen();
        }, 800);
    };

    return (
        <div className="relative flex h-screen w-full flex-col bg-gradient-to-b from-cream-end to-primary overflow-hidden">
            {/* Decorative Sparkles */}
            <div className="absolute top-20 left-10 text-gold-accent opacity-60 animate-twinkle"><span className="material-symbols-outlined text-2xl">star_rate</span></div>
            <div className="absolute bottom-40 right-10 text-gold-accent opacity-40 animate-twinkle delay-700"><span className="material-symbols-outlined text-xl">temp_preferences_custom</span></div>
            <div className="absolute top-40 right-10 text-white opacity-40 animate-twinkle delay-1000"><span className="material-symbols-outlined text-sm">star</span></div>

            {/* Header */}
            <div className="z-10 flex items-center p-4 pt-6 justify-between w-full">
                <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-text-main hover:bg-white/50 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="flex flex-col items-center">
                    <p className="text-text-secondary text-xs font-semibold uppercase tracking-widest animate-fade-in">Birthday Tribute</p>
                    <h2 className="text-text-main text-base font-bold leading-tight animate-fade-in delay-100">For {recipientName}</h2>
                </div>
                <button onClick={onOpen} className="flex px-3 py-1.5 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors">
                    <p className="text-text-secondary text-sm font-bold">{data.skipText}</p>
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 w-full max-w-md mx-auto">
                {/* Confetti Background */}
                <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: "radial-gradient(#D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

                {/* Gift Box Interaction */}
                <div onClick={handleOpen} className={`relative w-full aspect-square max-w-[320px] flex items-center justify-center mb-8 group cursor-pointer ${isOpening ? 'animate-shake-hard' : 'animate-float hover:animate-wiggle'}`}>
                    <div className="absolute inset-0 bg-primary/40 rounded-full blur-3xl transform scale-75 group-hover:scale-90 transition-transform duration-700"></div>
                    <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-105 active:scale-95">
                        <img
                            src={data.boxImage}
                            alt="Gift Box"
                            className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </div>

                    {!isOpening && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2 animate-pulse group-hover:animate-none group-hover:bg-white transition-colors">
                                <span className="material-symbols-outlined text-primary-dark text-xl">touch_app</span>
                                <span className="text-text-main text-sm font-bold tracking-wide whitespace-nowrap">Tap to Open</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 text-center mt-6 max-w-[280px]">
                    <h1 className="text-text-main text-3xl font-sans font-bold leading-tight tracking-tight animate-slide-up">{data.boxText}</h1>
                    <p className="text-[#6b585a] text-base font-medium leading-relaxed animate-slide-up delay-200">{data.hintText}</p>
                </div>
            </div>

            <div className="w-full pb-10 pt-4 flex flex-col items-center justify-center gap-2 z-10">
                <div className="h-1 w-16 bg-black/10 rounded-full mb-4"></div>
                {/* Instruction might not be in the config anymore, using loop or hintText? Defaulting to fixed text or hintText reuse if needed */}
                <p className="text-text-secondary text-xs font-medium tracking-wider uppercase opacity-70 animate-pulse">Tap the box to reveal</p>
            </div>
        </div>
    );
};

export default GiftBoxScreen;
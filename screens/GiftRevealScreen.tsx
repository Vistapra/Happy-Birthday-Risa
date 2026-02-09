import React from 'react';
import { GiftRevealConfig } from '../types';

interface Props {
    data: GiftRevealConfig;
    onNext: () => void;
}

const GiftRevealScreen: React.FC<Props> = ({ data, onNext }) => {
    return (
        <div className="bg-white h-screen w-full overflow-hidden flex flex-col items-center relative animate-fade-in">
            {/* Confetti Background */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute w-2 h-2 bg-primary rounded-full animate-float" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        backgroundColor: ['#e8b5b9', '#D4AF37', '#FFD700'][i % 3],
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: '4s'
                    }}></div>
                ))}
            </div>

            <div className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto p-6 justify-between">
                <div className="h-8 w-full shrink-0"></div>

                <div className="flex-1 flex flex-col items-center justify-center relative -mt-10">
                    <div className="relative w-48 h-48 mb-4 z-20">
                        {/* Sunburst */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 opacity-60 bg-[repeating-conic-gradient(from_0deg,_rgba(232,181,185,0.15)_0deg,_rgba(232,181,185,0.15)_15deg,_transparent_15deg,_transparent_30deg)] mask-[radial-gradient(circle,black_30%,transparent_70%)] animate-spin-slow"></div>

                        {/* Floating Heart */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center drop-shadow-xl animate-float">
                            <span className="material-symbols-outlined text-[100px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#FAD961] to-[#D4AF37] animate-heartbeat" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>favorite</span>
                            <div className="absolute top-4 right-6 w-4 h-4 bg-white/40 rounded-full blur-[2px]"></div>
                        </div>

                        {/* Opened Box */}
                        <div className="w-full h-full bg-contain bg-center bg-no-repeat relative z-10 drop-shadow-2xl animate-pop" style={{ backgroundImage: `url('${data.giftImage}')` }}></div>
                    </div>

                    <div className="absolute top-1/3 left-10 text-gold-accent opacity-80 animate-twinkle"><span className="material-symbols-outlined text-2xl">star</span></div>
                    <div className="absolute top-1/4 right-12 text-primary opacity-80 animate-twinkle delay-500"><span className="material-symbols-outlined text-xl">auto_awesome</span></div>
                </div>

                <div className="flex flex-col items-center w-full pb-8 z-20 bg-gradient-to-t from-white via-white to-transparent pt-10">
                    <div className="text-center mb-8 space-y-2">
                        <h1 className="text-text-main tracking-tight text-4xl font-extrabold leading-tight px-4 animate-slide-up">
                            {data.revealTitle} <span className="text-primary-dark">Love</span>
                        </h1>
                        <div className="h-1 w-16 bg-primary rounded-full mx-auto my-3 animate-zoom-in" style={{ animationDelay: '0.2s' }}></div>
                        <p className="text-[#5c4a4a] text-lg font-medium tracking-wide uppercase px-4 opacity-90 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            {data.revealMessage}
                        </p>
                    </div>

                    <button onClick={onNext} className="group relative w-full max-w-[320px] h-14 flex items-center justify-center bg-primary hover:bg-primary-dark transition-all duration-300 rounded-2xl shadow-lg shadow-primary/30 overflow-hidden animate-slide-up" style={{ animationDelay: '0.5s' }}>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10 flex items-center gap-2 text-text-main text-lg font-bold tracking-wide">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
                            {data.buttonText}
                        </span>
                    </button>

                    <button onClick={onNext} className="mt-4 text-sm text-[#8a7575] font-medium hover:text-primary transition-colors animate-fade-in" style={{ animationDelay: '1s' }}>Skip Intro</button>
                </div>
                <div className="h-4 w-full shrink-0"></div>
            </div>
        </div>
    );
};

export default GiftRevealScreen;
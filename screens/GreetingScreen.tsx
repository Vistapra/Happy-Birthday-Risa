import React from 'react';
import { GreetingConfig } from '../types';

interface Props {
    data: GreetingConfig;
    onNext: () => void;
}

const GreetingScreen: React.FC<Props> = ({ data, onNext }) => {
    return (
        <div className="relative flex flex-col items-center justify-between min-h-screen w-full bg-gradient-to-b from-cream-start to-warm-peach p-6 py-10 overflow-hidden">
            {/* Decoration Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-3 h-3 bg-primary rounded-full opacity-60"></div>
                <div className="absolute top-24 left-6 w-2 h-6 bg-primary rotate-12 opacity-60"></div>
                <div className="absolute bottom-1/3 right-12 w-4 h-4 bg-gold-accent rotate-45 opacity-40"></div>
                {/* Gradient Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-white rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="flex flex-col items-center justify-center w-full mt-8 animate-slide-up">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/40 backdrop-blur-md shadow-sm text-gold-accent mb-4 animate-pop delay-100">
                    <span className="material-symbols-outlined text-[24px]">celebration</span>
                </div>
                <span className="text-gold-accent text-sm uppercase tracking-widest font-medium opacity-80 animate-fade-in delay-200">
                    {data.badgeText}
                </span>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 w-full max-w-md z-10">
                <h2 className="text-[#5D4037] font-serif italic text-3xl opacity-90 leading-tight animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                    {data.subTitle}
                </h2>
                <h1 className="text-5xl font-serif font-bold text-gradient-gold drop-shadow-sm py-2 leading-tight tracking-tight animate-zoom-in whitespace-pre-line" style={{ animationDelay: '0.5s' }}>
                    {data.heading}
                </h1>

                <div className="py-6 w-full flex items-center justify-center opacity-70 text-gold-accent animate-fade-in" style={{ animationDelay: '0.7s' }}>
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-accent"></div>
                    <span className="material-symbols-outlined mx-3 text-lg fill-current animate-heartbeat">favorite</span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-accent"></div>
                </div>

                <div className="relative w-56 h-72 my-4 rounded-[40px] p-2 bg-white/30 backdrop-blur-sm shadow-xl border border-white/40 transform -rotate-2 animate-float hover:rotate-0 transition-transform duration-500">
                    <div className="w-full h-full rounded-[32px] overflow-hidden relative bg-gray-200">
                        <img
                            src={data.avatarImage}
                            alt="Portrait"
                            className="w-full h-full object-cover opacity-90 mix-blend-multiply hover:scale-110 transition-transform duration-700"
                        />
                    </div>
                    <div className="absolute -bottom-4 -right-2 bg-white text-[#8B5E3C] text-xs font-bold py-1 px-3 rounded-full shadow-lg border border-primary transform rotate-3 flex items-center gap-1 animate-pop" style={{ animationDelay: '1.2s' }}>
                        <span className="material-symbols-outlined text-[14px] text-gold-accent">star</span>
                        Star of the Day
                    </div>
                </div>

                <p className="text-[#5D4037] text-lg font-medium leading-relaxed max-w-xs mt-6 animate-slide-up" style={{ animationDelay: '1s' }}>
                    {data.message}
                </p>
            </div>

            <div className="w-full max-w-sm pb-6 z-10 animate-slide-up" style={{ animationDelay: '1.2s' }}>
                <button onClick={onNext} className="group w-full relative bg-primary hover:bg-primary-dark text-[#3E2723] font-sans font-semibold text-lg py-4 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    <span className="group-hover:tracking-wide transition-all duration-300">{data.buttonText}</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default GreetingScreen;
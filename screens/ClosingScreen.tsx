import React from 'react';
import { ClosingConfig } from '../types';

interface Props {
    data: ClosingConfig;
    onReplay: () => void;
}

const ClosingScreen: React.FC<Props> = ({ data, onReplay }) => {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-[#fff5f6] via-[#fcecec] to-primary/40">
            {/* Bokeh Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-24 h-24 top-[10%] left-[20%] bg-primary/30 rounded-full blur-md animate-pulse-slow"></div>
                <div className="absolute w-16 h-16 top-[40%] right-[15%] bg-white/40 rounded-full blur-md delay-1000 animate-float"></div>
                <div className="absolute w-32 h-32 bottom-[20%] left-[10%] bg-primary/20 rounded-full blur-lg delay-2000"></div>

                {/* Confetti simulation */}
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute w-2 h-2 bg-primary/70 animate-float" style={{
                        left: `${Math.random() * 100}%`,
                        top: '-10px',
                        animationDuration: `${Math.random() * 5 + 5}s`,
                        animationDelay: `${Math.random() * 2}s`
                    }}></div>
                ))}
            </div>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 text-center">
                <div className="mb-8 relative group cursor-pointer animate-float">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl transform scale-110"></div>
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white animate-zoom-in-slow">
                        <img
                            src={data.backgroundImage}
                            alt="Rose Petals"
                            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>
                </div>

                <div className="space-y-4 max-w-md mx-auto animate-fade-in">
                    <h1 className="font-serif text-text-main text-[42px] font-bold leading-tight tracking-tight drop-shadow-sm animate-pop">
                        {data.closingMessage}
                    </h1>
                    <p className="text-[#5c4a4c] text-lg sm:text-xl font-medium leading-relaxed px-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        {data.subtitle}
                    </p>
                    <div className="flex justify-center py-4 opacity-50 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                        <div className="h-1 w-1 rounded-full bg-primary mx-1"></div>
                        <div className="h-1 w-1 rounded-full bg-primary mx-1"></div>
                        <div className="h-1 w-1 rounded-full bg-primary mx-1"></div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full pb-10 px-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex flex-col items-center gap-6">
                    <button onClick={onReplay} className="group flex items-center justify-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-white/50 rounded-xl shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 active:scale-95 animate-pulse-slow hover:animate-none hover:scale-105">
                        <span className="text-rose-gold-dark group-hover:rotate-[-180deg] transition-transform duration-700 material-symbols-outlined">replay</span>
                        <span className="text-text-main text-sm font-bold tracking-wide">{data.buttonText}</span>
                    </button>

                    <div className="text-center pt-2">
                        <p className="font-script text-text-secondary text-2xl sm:text-3xl font-normal leading-relaxed animate-fade-in" style={{ animationDelay: '1s' }}>
                            {data.signature}
                        </p>
                    </div>
                </div>
                <div className="h-4 w-full"></div>
            </div>
        </div>
    );
};

export default ClosingScreen;
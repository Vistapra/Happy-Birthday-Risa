import React from 'react';
import { OpeningConfig } from '../types';

interface Props {
    data: OpeningConfig;
    onNext: () => void;
}

const OpeningScreen: React.FC<Props> = ({ data, onNext }) => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[radial-gradient(circle_at_center,_var(--color-bg)_0%,_#FFF0F0_100%)] overflow-hidden">
            {/* Atmospheric Bokeh */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-lavender-mist/30 rounded-full blur-[80px] animate-float"></div>

            <div className="relative z-10 flex flex-col items-center justify-center gap-8 p-6 text-center w-full max-w-md">
                <div className="relative group cursor-pointer" onClick={onNext}>
                    <span className="material-symbols-outlined absolute -top-8 -left-6 text-gold-accent text-xl animate-twinkle">spark</span>
                    <span className="material-symbols-outlined absolute -bottom-4 -right-8 text-gold-accent text-lg animate-twinkle" style={{ animationDelay: '1s' }}>star</span>

                    <h1 className="font-serif font-bold text-[42px] leading-tight text-dusty-rose drop-shadow-sm tracking-wide animate-pop">
                        {data.titleText}
                    </h1>
                    <p className="text-sm text-gray-400 mt-2">{data.subtitleText}</p>
                </div>

                <div className="relative w-48 h-64 rounded-full overflow-hidden border-4 border-white/50 shadow-xl rotate-[-2deg] animate-zoom-in" style={{ animationDelay: '0.3s' }}>
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
                    <img
                        src={data.backgroundImage}
                        alt="Portrait"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                    />
                </div>

                <button
                    onClick={onNext}
                    className="group flex items-center gap-2 px-8 py-3 bg-white/60 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-white/40 mt-8 animate-slide-up hover:animate-wiggle"
                    style={{ animationDelay: '0.8s' }}
                >
                    <span className="text-text-secondary text-sm font-medium tracking-widest uppercase">{data.buttonText}</span>
                    <span className="material-symbols-outlined text-text-secondary text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default OpeningScreen;
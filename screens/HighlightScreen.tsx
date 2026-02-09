import React from 'react';
import { HighlightConfig } from '../types';

interface Props {
    data: HighlightConfig;
    onNext: () => void;
    onBack: () => void;
}

const HighlightScreen: React.FC<Props> = ({ data, onNext, onBack }) => {
    return (
        <div className="font-sans bg-[#f8f6f6] text-[#1e1414] antialiased overflow-hidden min-h-screen flex flex-col relative group/design-root">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fff0f1_0%,_#e8b5b9_60%,_#b08d90_100%)]"></div>
            <div className="absolute inset-0 pointer-events-none z-10 opacity-40 mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E')" }}></div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute bg-white rounded-full animate-float" style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: '100%',
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        animationDuration: `${Math.random() * 5 + 5}s`,
                        animationDelay: `${Math.random() * 2}s`
                    }}></div>
                ))}
            </div>

            <div className="relative z-20 flex items-center p-6 w-full justify-between">
                <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors text-white border border-white/30">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <button className="flex items-center justify-center size-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors text-white border border-white/30">
                    <span className="material-symbols-outlined text-2xl">more_vert</span>
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 w-full max-w-md mx-auto">
                {/* Main Hero Highlight */}
                <div className="relative w-full aspect-[340/440] max-h-[50vh] flex items-center justify-center mb-6">
                    {/* Halo Glow */}
                    <div className="absolute inset-0 -m-8 bg-white/40 blur-[50px] rounded-full z-0 animate-pulse-slow"></div>

                    {/* Photo Frame */}
                    <div className="relative w-full h-full bg-white p-[3px] shadow-2xl rounded-sm z-10 overflow-hidden transform transition-transform duration-700 hover:scale-[1.02] animate-zoom-in-slow">
                        <div className="relative w-full h-full bg-gray-100 overflow-hidden">
                            <div className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-[10s] hover:scale-110" style={{ backgroundImage: `url('${data.image}')` }}></div>
                        </div>
                        {/* Art Deco Corners */}
                        <svg className="absolute top-2 left-2 w-12 h-12 text-gold-accent pointer-events-none drop-shadow-sm animate-pop" style={{ animationDelay: '1s' }} fill="none" viewBox="0 0 50 50"><path d="M2 50V14C2 7.37258 7.37258 2 14 2H50" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path><circle cx="14" cy="14" r="3" fill="currentColor"></circle></svg>
                        <svg className="absolute top-2 right-2 w-12 h-12 text-gold-accent pointer-events-none drop-shadow-sm rotate-90 animate-pop" style={{ animationDelay: '1.1s' }} fill="none" viewBox="0 0 50 50"><path d="M2 50V14C2 7.37258 7.37258 2 14 2H50" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path><circle cx="14" cy="14" r="3" fill="currentColor"></circle></svg>
                        <svg className="absolute bottom-2 left-2 w-12 h-12 text-gold-accent pointer-events-none drop-shadow-sm -rotate-90 animate-pop" style={{ animationDelay: '1.2s' }} fill="none" viewBox="0 0 50 50"><path d="M2 50V14C2 7.37258 7.37258 2 14 2H50" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path><circle cx="14" cy="14" r="3" fill="currentColor"></circle></svg>
                        <svg className="absolute bottom-2 right-2 w-12 h-12 text-gold-accent pointer-events-none drop-shadow-sm rotate-180 animate-pop" style={{ animationDelay: '1.3s' }} fill="none" viewBox="0 0 50 50"><path d="M2 50V14C2 7.37258 7.37258 2 14 2H50" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path><circle cx="14" cy="14" r="3" fill="currentColor"></circle></svg>
                    </div>
                </div>

                <div className="text-center space-y-2 z-20 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                    <h2 className="text-[#1e1414] font-sans text-2xl font-light tracking-wide leading-tight drop-shadow-sm whitespace-pre-line">
                        {data.title}
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-[#4a3b3c] opacity-90">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        <p className="text-sm font-medium tracking-wide uppercase">{data.location}</p>
                    </div>
                    <p className="text-[#6d5456] font-sans text-sm italic tracking-wide mt-2">
                        {data.caption}
                    </p>
                </div>

                {/* Highlights List */}
                {data.highlights && data.highlights.length > 0 && (
                    <div className="w-full mt-6 space-y-3 z-20">
                        {data.highlights.map((item, idx) => (
                            <div key={item.id} className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-white/50 shadow-sm animate-slide-up" style={{ animationDelay: `${1 + (idx * 0.1)}s` }}>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md" style={{ backgroundColor: item.color || '#D4AF37' }}>
                                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-[#1e1414] text-sm">{item.title}</h4>
                                    <p className="text-xs text-[#6d5456]">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative z-20 w-full px-8 pb-8 pt-2">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <button onClick={onBack} className="text-[#1e1414]/60 hover:text-[#1e1414] transition-colors p-2 hover:bg-black/5 rounded-full">
                        <span className="material-symbols-outlined text-3xl">chevron_left</span>
                    </button>
                    <div className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#1e1414]/30"></div>
                        <div className="w-2 h-2 rounded-full bg-[#1e1414]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#1e1414]/30"></div>
                    </div>
                    <button onClick={onNext} className="text-[#1e1414]/60 hover:text-[#1e1414] transition-colors p-2 hover:bg-black/5 rounded-full">
                        <span className="material-symbols-outlined text-3xl">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HighlightScreen;
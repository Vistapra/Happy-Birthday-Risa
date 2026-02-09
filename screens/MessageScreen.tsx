import React from 'react';
import { MessageConfig } from '../types';

interface Props {
    data: MessageConfig;
    onNext: () => void;
    onBack: () => void;
}

const MessageScreen: React.FC<Props> = ({ data, onNext, onBack }) => {
    return (
        <div className="relative flex flex-col min-h-screen w-full bg-[#fdf7f7] overflow-hidden">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#fceced] to-[#f4e0e2]"></div>
            {data.topBackgroundImage && (
                <div className="fixed top-0 left-0 z-0 opacity-60 mix-blend-multiply">
                    <img src={data.topBackgroundImage} className="w-64 h-64 object-contain -translate-x-12 -translate-y-12 rotate-180" alt="floral" />
                </div>
            )}
            {data.bottomBackgroundImage && (
                <div className="fixed bottom-0 right-0 z-0 opacity-60 mix-blend-multiply">
                    <img src={data.bottomBackgroundImage} className="w-80 h-80 object-contain translate-x-16 translate-y-16" alt="floral" />
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto">
                <header className="flex items-center justify-between p-6">
                    <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 hover:bg-white backdrop-blur-sm transition-colors text-text-secondary shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                </header>

                <main className="flex-1 flex items-center justify-center p-6 pb-24">
                    <div className="relative w-full bg-white rounded-2xl shadow-[0_20px_40px_-12px_rgba(232,181,185,0.3)] overflow-hidden border border-white/50 flex flex-col animate-zoom-in">
                        <div className="h-2 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"></div>
                        <div className="absolute top-6 right-6 text-primary opacity-80 animate-wiggle">
                            <span className="material-symbols-outlined text-[40px] font-light">celebration</span>
                        </div>

                        <div className="p-8 pt-10 flex flex-col items-center text-center">
                            <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-xs font-bold tracking-wider uppercase mb-3">Tribute</span>
                                <h2 className="text-3xl font-bold text-text-main tracking-tight leading-tight">{data.title}</h2>
                            </div>

                            <div className="relative w-full">
                                <span className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif leading-none select-none animate-pop" style={{ animationDelay: '0.4s' }}>“</span>
                                <div className="text-[#4a4a4a] text-lg leading-relaxed font-light font-sans relative z-10 space-y-4 text-left">
                                    {data.paragraphs.map((p, index) => (
                                        <p key={p.id || index} className="animate-slide-up" style={{ animationDelay: `${0.5 + (index * 0.2)}s` }}>
                                            {p.text}
                                        </p>
                                    ))}
                                </div>
                                <span className="absolute -bottom-8 -right-2 text-6xl text-primary/20 font-serif leading-none select-none rotate-180 animate-pop" style={{ animationDelay: '1.1s' }}>“</span>
                            </div>

                            <div className="mt-10 w-full flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1.3s' }}>
                                <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                                <p className="text-sm font-medium text-text-secondary italic">{data.signature}</p>
                            </div>
                        </div>
                    </div>
                </main>

                <div className="fixed bottom-8 left-0 right-0 flex justify-center z-20 px-6 pointer-events-none">
                    <button onClick={onNext} className="pointer-events-auto group relative flex items-center gap-3 bg-white pr-6 pl-2 py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-primary/20 hover:scale-105 transition-transform duration-300 active:scale-95 animate-slide-up" style={{ animationDelay: '1.5s' }}>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-md group-hover:bg-primary-dark transition-colors">
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </div>
                        <span className="text-text-main font-semibold text-sm tracking-wide">{data.buttonText}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageScreen;
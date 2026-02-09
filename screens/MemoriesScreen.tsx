import React, { useState } from 'react';
import { MemoriesConfig } from '../types';

interface Props {
    data: MemoriesConfig;
    onNext: () => void;
    onBack: () => void;
}

const MemoriesScreen: React.FC<Props> = ({ data, onNext, onBack }) => {
    const [likedMemories, setLikedMemories] = useState<Record<string, boolean>>({});

    const toggleLike = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setLikedMemories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="bg-gradient-to-br from-cream-start to-[#FCEEEE] min-h-screen flex flex-col font-sans selection:bg-primary selection:text-text-main">
            <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md">
                <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full text-text-main hover:bg-black/5 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="font-serif text-xl font-bold text-text-main tracking-wide">Memories</h1>
                </div>
                <button className="flex items-center justify-center w-10 h-10 rounded-full text-text-main hover:bg-black/5 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col w-full max-w-md mx-auto relative overflow-hidden">
                <div className="px-6 pt-4 pb-2 text-center animate-fade-in">
                    <h2 className="font-serif text-3xl font-bold text-text-main mb-1">{data.title}</h2>
                    <p className="text-text-secondary text-sm font-medium uppercase tracking-widest">{data.subtitle}</p>
                </div>

                <div className="flex-1 flex flex-col justify-center py-6 overflow-hidden">
                    <div className="flex overflow-x-auto gap-6 px-8 pb-8 pt-4 snap-x-mandatory no-scrollbar items-center">

                        {data.memories.map((memory) => {
                            const isLiked = likedMemories[memory.id];
                            return (
                                <article key={memory.id} className="relative flex-shrink-0 w-[280px] sm:w-[300px] snap-center group">
                                    <div className="flex flex-col bg-white rounded-[2rem] p-4 shadow-xl border border-primary/20 transition-transform duration-300 hover:scale-[1.02]">
                                        <div className="w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gray-200 relative">
                                            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${memory.image}')` }}></div>
                                            <button
                                                onClick={(e) => toggleLike(memory.id, e)}
                                                className={`absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${isLiked ? 'bg-primary text-white scale-110' : 'bg-white/30 text-white hover:bg-white hover:text-primary'}`}
                                            >
                                                <span className={`material-symbols-outlined text-[20px] ${isLiked ? 'filled' : ''}`} style={isLiked ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
                                            </button>
                                        </div>
                                        <div className="pt-5 pb-2 text-center">
                                            <h3 className="text-xl font-bold text-text-main font-serif mb-1">{memory.title}</h3>
                                            <p className="text-xs text-text-secondary mb-2 line-clamp-2">{memory.description}</p>
                                            <div className="flex items-center justify-center gap-1 text-text-secondary text-sm">
                                                <span className="material-symbols-outlined text-[16px]">{memory.icon}</span>
                                                <span>{memory.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}

                    </div>

                    {/* Dynamic Indicators */}
                    <div className="flex w-full flex-row items-center justify-center gap-3 py-2">
                        {data.memories.map((_, i) => (
                            <div key={i} className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-colors ${i === 0 ? 'bg-text-main ring-2 ring-offset-2 ring-primary/30 ring-offset-transparent' : 'bg-primary/40 hover:bg-primary/60'}`}></div>
                        ))}
                    </div>
                </div>

                <div className="p-6 pb-8">
                    <button onClick={onNext} className="relative w-full overflow-hidden rounded-2xl h-14 bg-primary text-text-main font-bold text-lg tracking-wide shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-[0.98] group">
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                        <div className="relative flex items-center justify-center gap-3">
                            <span className="material-symbols-outlined filled">play_circle</span>
                            <span>{data.buttonText}</span>
                        </div>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default MemoriesScreen;
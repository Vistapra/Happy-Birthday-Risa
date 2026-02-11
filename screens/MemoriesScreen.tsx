import React, { useState } from 'react';
import { MemoriesConfig } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import CommonButton from '../components/CommonButton';

interface Props {
    data: MemoriesConfig;
    onNext: () => void;
    onBack: () => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const cardVariants = {
    hidden: { x: 50, opacity: 0, scale: 0.9 },
    visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
};

const MemoriesScreen: React.FC<Props> = ({ data, onNext, onBack }) => {
    const [likedMemories, setLikedMemories] = useState<Record<string, boolean>>({});
    const [isLocked, setIsLocked] = useState(true);
    const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);

    const toggleLike = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setLikedMemories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleNext = () => {
        if (!isLocked) onNext();
    };

    const openSlideshow = (index: number) => {
        setSelectedMemoryIndex(index);
    };

    const closeSlideshow = () => {
        setSelectedMemoryIndex(null);
    };

    const navigateSlideshow = (direction: 'next' | 'prev', e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedMemoryIndex === null) return;

        let newIndex;
        if (direction === 'next') {
            newIndex = (selectedMemoryIndex + 1) % data.memories.length;
        } else {
            newIndex = (selectedMemoryIndex - 1 + data.memories.length) % data.memories.length;
        }
        setSelectedMemoryIndex(newIndex);
    };

    return (
        <motion.div
            className="bg-gradient-to-br from-cream-start to-[#FCEEEE] min-h-screen flex flex-col font-sans overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setIsLocked(false)}
        >
            <main className="flex-1 flex flex-col w-full max-w-md mx-auto relative pt-8">
                <motion.div
                    variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                    className="px-6 pt-4 pb-2 text-center"
                >
                    <h2 className="font-serif text-3xl font-bold text-text-main mb-1">{data.title}</h2>
                    <p className="text-text-secondary text-xs font-bold uppercase tracking-[0.3em] opacity-60">{data.subtitle}</p>
                </motion.div>

                <div className="flex-1 flex flex-col justify-center py-6 overflow-hidden relative">
                    {/* Main Memories List - Improved for Swipeability */}
                    <motion.div
                        className="flex overflow-x-auto gap-6 px-10 pb-10 pt-4 snap-x-mandatory no-scrollbar items-center touch-pan-x"
                        style={{ scrollBehavior: 'smooth', cursor: 'grab' }}
                        whileTap={{ cursor: 'grabbing' }}
                    >
                        {data.memories.map((memory, index) => {
                            const isLiked = likedMemories[memory.id];
                            return (
                                <motion.article
                                    key={memory.id}
                                    variants={cardVariants}
                                    className="relative flex-shrink-0 w-[280px] snap-center"
                                    whileHover={{ y: -5 }}
                                    onClick={() => openSlideshow(index)}
                                >
                                    <div className="flex flex-col bg-white rounded-[2.5rem] p-4 shadow-[0_20px_40px_rgba(232,181,185,0.25)] border border-white transition-all duration-300">
                                        <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-50 relative">
                                            <motion.div
                                                className="w-full h-full bg-cover bg-center"
                                                style={{ backgroundImage: `url('${memory.image}')` }}
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            <CommonButton
                                                onClick={(e) => toggleLike(memory.id, e)}
                                                icon="favorite"
                                                variant={isLiked ? 'primary' : 'glass'}
                                                size="icon"
                                                className="absolute top-4 right-4"
                                                animateIcon={false}
                                            />
                                        </div>
                                        <div className="pt-6 pb-2 text-center px-2">
                                            <h3 className="text-xl font-bold text-text-main font-serif mb-2">{memory.title}</h3>
                                            <p className="text-sm text-text-secondary mb-3 italic leading-relaxed">"{memory.description}"</p>
                                            <div className="flex items-center justify-center gap-2 text-primary-dark font-semibold text-xs uppercase tracking-tighter">
                                                <span className="material-symbols-outlined text-[16px]">{memory.icon}</span>
                                                <span>{memory.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </motion.div>
                </div>

                <div className="p-8 pb-10">
                    <CommonButton
                        onClick={handleNext}
                        isLocked={isLocked}
                        label={data.buttonText}
                        secondaryLabel="Revisiting..."
                        icon="auto_awesome"
                        secondaryIcon="history"
                        variant="primary"
                        size="md"
                        fullWidth={true}
                    />
                </div>

                {/* Slideshow Overlay */}
                <AnimatePresence>
                    {selectedMemoryIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center font-sans"
                            onClick={closeSlideshow}
                        >
                            {/* Centered Container for Slideshow Content */}
                            <div className="w-full max-w-md h-full relative flex flex-col items-center justify-center px-6" onClick={(e) => e.stopPropagation()}>

                                {/* Header / Counter & Close */}
                                <div className="absolute top-10 left-0 right-0 px-8 flex justify-between items-center z-[70]">
                                    <div className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">
                                        {selectedMemoryIndex + 1} <span className="mx-2">/</span> {data.memories.length}
                                    </div>
                                    <CommonButton
                                        onClick={closeSlideshow}
                                        icon="close"
                                        variant="glass"
                                        size="icon"
                                        className="!bg-white/10 !text-white !border-white/10 hover:!bg-white/20 !rounded-xl"
                                    />
                                </div>

                                {/* Image with Swipe/Drag Support */}
                                <motion.div
                                    key={selectedMemoryIndex}
                                    className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] bg-white/5"
                                    initial={{ opacity: 0, scale: 0.9, x: 40 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -40 }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.3}
                                    onDragEnd={(_, info) => {
                                        const threshold = 50;
                                        if (info.offset.x > threshold) navigateSlideshow('prev', { stopPropagation: () => { } } as any);
                                        else if (info.offset.x < -threshold) navigateSlideshow('next', { stopPropagation: () => { } } as any);
                                    }}
                                >
                                    <img
                                        src={data.memories[selectedMemoryIndex].image}
                                        className="w-full h-full object-cover pointer-events-none select-none"
                                        alt={data.memories[selectedMemoryIndex].title}
                                    />

                                    {/* Info Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-10 pt-24">
                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-white text-2xl font-serif font-bold mb-2"
                                        >
                                            {data.memories[selectedMemoryIndex].title}
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-white/60 text-sm italic leading-relaxed"
                                        >
                                            "{data.memories[selectedMemoryIndex].description}"
                                        </motion.p>
                                    </div>
                                </motion.div>

                                {/* Navigation Buttons Layer - Constrained and Aligned */}
                                {data.memories.length > 1 && (
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 pointer-events-none z-[80]">
                                        <CommonButton
                                            onClick={(e) => navigateSlideshow('prev', e)}
                                            icon="chevron_left"
                                            variant="glass"
                                            size="icon"
                                            className="pointer-events-auto !bg-white/10 !text-white !border-white/10 !rounded-full shadow-2xl backdrop-blur-xl hover:!scale-110 active:!scale-95 transition-all"
                                        />
                                        <CommonButton
                                            onClick={(e) => navigateSlideshow('next', e)}
                                            icon="chevron_right"
                                            variant="glass"
                                            size="icon"
                                            className="pointer-events-auto !bg-white/10 !text-white !border-white/10 !rounded-full shadow-2xl backdrop-blur-xl hover:!scale-110 active:!scale-95 transition-all"
                                        />
                                    </div>
                                )}

                                {/* Progress Indicator */}
                                <div className="mt-12 flex flex-col items-center gap-4">
                                    <div className="flex gap-2">
                                        {data.memories.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`h-1 rounded-full transition-all duration-500 ${idx === selectedMemoryIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em] animate-pulse">Swipe to navigate</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </motion.div>
    );
};

export default MemoriesScreen;
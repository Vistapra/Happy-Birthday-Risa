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

                <div className="flex-1 flex flex-col justify-center py-6 overflow-hidden">
                    <motion.div
                        className="flex overflow-x-auto gap-6 px-10 pb-10 pt-4 snap-x-mandatory no-scrollbar items-center"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {data.memories.map((memory) => {
                            const isLiked = likedMemories[memory.id];
                            return (
                                <motion.article
                                    key={memory.id}
                                    variants={cardVariants}
                                    className="relative flex-shrink-0 w-[280px] snap-center"
                                    whileHover={{ y: -5 }}
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
            </main>
        </motion.div>
    );
};

export default MemoriesScreen;
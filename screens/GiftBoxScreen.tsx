import React, { useState } from 'react';
import { GiftBoxConfig } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import CommonButton from '../components/CommonButton';

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
        }, 1200);
    };

    return (
        <motion.div
            className="relative flex h-screen w-full flex-col bg-gradient-to-b from-cream-end to-primary overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Decorative Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-gold-accent"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 0.6, 0],
                            rotate: [0, 180, 0],
                        }}
                        transition={{
                            duration: Math.random() * 2 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    >
                        <span className="material-symbols-outlined text-sm">star_rate</span>
                    </motion.div>
                ))}
            </div>

            {/* Header */}
            <motion.div
                className="z-20 flex items-center p-6 w-full justify-between"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <CommonButton
                    onClick={onBack}
                    icon="arrow_back"
                    variant="glass"
                    size="icon"
                    animateIcon={false}
                />
                <div className="flex flex-col items-center">
                    <span className="text-text-secondary text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">Birthday Magic</span>
                    <h2 className="text-text-main text-sm font-bold tracking-wider leading-tight">For {recipientName}</h2>
                </div>
                <div className="size-10 opacity-0" />
            </motion.div>

            <main className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 w-full max-w-md mx-auto">
                {/* Gift Box Interaction */}
                <motion.div
                    layout
                    className="relative w-full aspect-square max-w-[320px] flex items-center justify-center mb-12"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-primary-dark/30 rounded-full blur-[80px]"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    <motion.div
                        className="relative w-full h-full cursor-pointer z-10"
                        onClick={handleOpen}
                        animate={isOpening ? {
                            scale: [1, 1.1, 0.9, 1.4],
                            rotate: [0, -10, 10, -10, 10, 0],
                            y: [0, -20, 0, -500],
                            opacity: [1, 1, 1, 0]
                        } : {
                            y: [0, -15, 0]
                        }}
                        transition={isOpening ? {
                            duration: 1.2,
                            times: [0, 0.2, 0.5, 1],
                            ease: "easeInOut"
                        } : {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        whileHover={!isOpening ? { scale: 1.05, rotate: 2 } : {}}
                    >
                        <img
                            src={data.boxImage}
                            alt="Gift Box"
                            className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                        />
                    </motion.div>

                    <AnimatePresence>
                        {!isOpening && (
                            <motion.div
                                className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <motion.div
                                    className="bg-white/90 backdrop-blur-md px-8 py-3 rounded-full shadow-2xl border border-white/50 flex items-center gap-3"
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="material-symbols-outlined text-primary-dark font-bold">celebration</span>
                                    <span className="text-text-main text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap">Klik Sayang</span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="flex flex-col gap-4 text-center mt-4 max-w-[280px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h1 className="text-text-main text-3xl font-serif font-bold leading-tight tracking-tight">{data.boxText}</h1>
                    <p className="text-[#6d5456] text-base italic leading-relaxed opacity-80">"{data.hintText}"</p>
                </motion.div>
            </main>

            <motion.div
                className="w-full pb-12 pt-4 flex flex-col items-center justify-center z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="h-1.5 w-20 bg-black/5 rounded-full mb-6"></div>
                <p className="text-text-secondary text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 animate-pulse">Your special gift awaits</p>
            </motion.div>
        </motion.div>
    );
};

export default GiftBoxScreen;
import React from 'react';
import { MessageConfig } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import CommonButton from '../components/CommonButton';

interface Props {
    data: MessageConfig;
    onNext: () => void;
    onBack: () => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const cardVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const MessageScreen: React.FC<Props> = ({ data, onNext, onBack }) => {
    const [isLocked, setIsLocked] = React.useState(true);

    const handleNext = () => {
        if (!isLocked) onNext();
    };

    return (
        <motion.div
            className="relative flex flex-col min-h-screen w-full bg-[#fdf7f7] overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setIsLocked(false)}
        >
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#fceced] to-[#f4e0e2]"></div>

            {data.topBackgroundImage && (
                <motion.div
                    className="fixed top-0 left-0 z-0 opacity-40 mix-blend-multiply"
                    animate={{ rotate: [180, 185, 180], scale: [1, 1.05, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img src={data.topBackgroundImage} className="w-64 h-64 object-contain -translate-x-12 -translate-y-12 rotate-180" alt="floral" />
                </motion.div>
            )}

            {data.bottomBackgroundImage && (
                <motion.div
                    className="fixed bottom-0 right-0 z-0 opacity-40 mix-blend-multiply"
                    animate={{ rotate: [0, -5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img src={data.bottomBackgroundImage} className="w-80 h-80 object-contain translate-x-16 translate-y-16" alt="floral" />
                </motion.div>
            )}

            <div className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto">
                <header className="flex items-center justify-between p-6">
                    <CommonButton
                        onClick={onBack}
                        icon="arrow_back"
                        variant="glass"
                        size="icon"
                        animateIcon={false}
                    />
                </header>

                <main className="flex-1 flex items-center justify-center p-6 pb-24">
                    <motion.div
                        variants={cardVariants}
                        className="relative w-full bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(232,181,185,0.4)] overflow-hidden border border-white/50 flex flex-col"
                    >
                        <div className="h-2 w-full bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>
                        <motion.div
                            className="absolute top-6 right-6 text-primary opacity-60"
                            animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <span className="material-symbols-outlined text-[40px] font-light">celebration</span>
                        </motion.div>

                        <div className="p-8 pt-10 flex flex-col items-center text-center">
                            <motion.div variants={textVariants} className="mb-6">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Pesan Untuk Calon Istriku</span>
                                <h2 className="text-3xl font-serif font-bold text-text-main tracking-tight leading-tight">{data.title}</h2>
                            </motion.div>

                            <div className="relative w-full py-4">
                                <motion.span
                                    className="absolute -top-4 -left-2 text-7xl text-primary/10 font-serif leading-none select-none"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1 }}
                                >“</motion.span>

                                <div className="text-[#555] text-lg leading-relaxed font-normal font-sans relative z-10 space-y-6 text-left italic">
                                    {data.paragraphs.map((p, index) => (
                                        <motion.p key={p.id || index} variants={textVariants}>
                                            {p.text}
                                        </motion.p>
                                    ))}
                                </div>

                                <motion.span
                                    className="absolute -bottom-8 -right-2 text-7xl text-primary/10 font-serif leading-none select-none rotate-180"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.5 }}
                                >“</motion.span>
                            </div>

                            <motion.div
                                variants={textVariants}
                                className="mt-12 w-full flex flex-col items-center gap-3"
                            >
                                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                                <p className="text-sm font-bold text-text-secondary tracking-widest uppercase">{data.signature}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </main>

                <div className="fixed bottom-10 left-0 right-0 flex justify-center z-20 px-6 pointer-events-none">
                    <CommonButton
                        onClick={handleNext}
                        isLocked={isLocked}
                        label={data.buttonText}
                        secondaryLabel="Reading Your Heart..."
                        icon="arrow_forward"
                        secondaryIcon="lock"
                        variant="white"
                        size="md"
                        className="pointer-events-auto"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default MessageScreen;
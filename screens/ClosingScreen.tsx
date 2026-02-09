import React, { useEffect, useState, useMemo } from 'react';
import { ClosingConfig } from '../types';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import CommonButton from '../components/CommonButton';

interface Props {
    data: ClosingConfig;
    onReplay: () => void;
}

// Sparkle/Particle Component
interface SparkleProps {
    color: string;
    style: React.CSSProperties;
    delay?: number;
}

const Sparkle: React.FC<SparkleProps> = ({ color, style, delay = 0 }) => (
    <motion.div
        className="absolute w-1.5 h-1.5 rounded-full pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{ ...style, backgroundColor: color }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            x: [(Math.random() - 0.5) * 60],
            y: [(Math.random() - 0.5) * 60],
        }}
        transition={{
            duration: 0.8 + Math.random() * 0.5,
            repeat: Infinity,
            delay: Math.random() * 5 + delay,
            ease: "easeOut"
        }}
    />
);

const Confetti = () => {
    const colors = ['#f472b6', '#fbbf24', '#60a5fa', '#34d399', '#a78bfa', '#f87171'];
    const confettiItems = useMemo(() => [...Array(50)].map((_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
        size: Math.random() * 8 + 4,
        rotate: Math.random() * 360,
    })), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confettiItems.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute rounded-sm"
                    style={{
                        backgroundColor: item.color,
                        left: item.left,
                        width: item.size,
                        height: item.size,
                        top: -20,
                    }}
                    animate={{
                        y: ['0vh', '110vh'],
                        x: [0, (Math.random() - 0.5) * 100],
                        rotate: [item.rotate, item.rotate + 720],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const Balloon = () => {
    const colors = ['rgba(232, 181, 185, 0.6)', 'rgba(212, 165, 165, 0.6)', 'rgba(255, 212, 184, 0.6)', 'rgba(232, 213, 242, 0.6)'];
    const balloonItems = useMemo(() => [...Array(12)].map((_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 90 + 5}%`,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 10,
        size: Math.random() * 40 + 60,
    })), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {balloonItems.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute rounded-full"
                    style={{
                        backgroundColor: item.color,
                        left: item.left,
                        width: item.size,
                        height: item.size * 1.2,
                        bottom: -150,
                        border: '1px solid rgba(255,255,255,0.3)',
                    }}
                    animate={{
                        y: ['0vh', '-120vh'],
                        x: [0, (Math.random() - 0.5) * 50],
                        rotate: [-5, 5, -5],
                    }}
                    transition={{
                        y: { duration: item.duration, repeat: Infinity, delay: item.delay, ease: "linear" },
                        x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                >
                    {/* Reflection highlight */}
                    <div className="absolute top-[15%] left-[15%] w-[25%] h-[20%] bg-white/40 rounded-full blur-[2px]" />
                    {/* Balloon string */}
                    <div className="absolute bottom-[-40px] left-1/2 w-[1px] h-10 bg-white/40" />
                </motion.div>
            ))}
        </div>
    );
};

const ClosingScreen: React.FC<Props> = ({ data, onReplay }) => {
    const [isLocked, setIsLocked] = useState(true);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Timeline:
        // 0s: Screen fades in, celebration starts (confetti, balloons)
        // 1s: Main text fades in and scales up
        // 3s: Continue button becomes active
        const timer1 = setTimeout(() => setShowContent(true), 1000);
        const timer2 = setTimeout(() => setIsLocked(false), 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const handleReplay = () => {
        if (!isLocked) onReplay();
    };

    return (
        <motion.div
            className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-[#fff5f6] via-[#fcecec] to-primary/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {/* Background Festive Elements */}
            <Confetti />
            <Balloon />

            {/* Bokeh Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-2xl"
                        style={{
                            width: Math.random() * 200 + 100,
                            height: Math.random() * 200 + 100,
                            backgroundColor: i % 3 === 0 ? 'rgba(232, 181, 185, 0.2)' : i % 3 === 1 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 212, 184, 0.2)',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 30, 0],
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8 text-center">
                <AnimatePresence>
                    {showContent && (
                        <motion.div
                            key="main-content"
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                className="mb-12 relative"
                            >
                                {/* Golden Glow Ring */}
                                <motion.div
                                    className="absolute inset-[-20px] bg-primary/30 rounded-full blur-3xl"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.4, 0.7, 0.4],
                                        rotate: [0, 180, 360]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[10px] border-white shadow-2xl overflow-hidden bg-white"
                                    whileHover={{ scale: 1.05, rotate: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <motion.img
                                        src={data.backgroundImage}
                                        alt="Closing"
                                        className="w-full h-full object-cover"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Shimmer Effect over Image */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                                        animate={{ x: ['100%', '-100%'] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    />
                                </motion.div>

                                {/* Sparkles around the photo */}
                                {[...Array(12)].map((_, i) => (
                                    <Sparkle
                                        key={i}
                                        color={i % 2 === 0 ? "#ffd700" : "#ffffff"}
                                        style={{
                                            left: `${50 + 45 * Math.cos(i * (Math.PI * 2) / 12)}%`,
                                            top: `${50 + 45 * Math.sin(i * (Math.PI * 2) / 12)}%`,
                                        }}
                                    />
                                ))}
                            </motion.div>

                            <div className="space-y-6 max-w-xl mx-auto">
                                <motion.h1
                                    className="font-serif text-6xl font-bold leading-tight tracking-tight drop-shadow-md relative"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <span className="relative z-10 bg-gradient-to-r from-[#171213] via-[#b88746] to-[#171213] bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite]">
                                        {data.closingMessage}
                                    </span>
                                    {/* Subtle Glow Text Behind */}
                                    <span className="absolute inset-0 blur-md opacity-30 select-none text-primary pointer-events-none" aria-hidden="true">
                                        {data.closingMessage}
                                    </span>
                                </motion.h1>

                                <motion.p
                                    className="text-text-secondary text-2xl font-medium leading-relaxed px-4 italic"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.9 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {data.subtitle}
                                </motion.p>

                                <motion.div
                                    className="flex justify-center py-4 gap-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="h-2 w-2 rounded-full bg-primary/60"
                                            animate={{
                                                scale: [1, 2, 1],
                                                opacity: [0.4, 1, 0.4],
                                                y: [0, -5, 0]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.div
                className="relative z-10 w-full pb-16 px-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <div className="flex flex-col items-center gap-12">
                    <CommonButton
                        onClick={handleReplay}
                        isLocked={isLocked}
                        label={data.buttonText}
                        secondaryLabel="Wait for the Magic..."
                        icon="replay"
                        secondaryIcon="lock"
                        variant="white"
                        size="lg"
                    />

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2 }}
                    >
                        <p className="font-script text-text-secondary text-5xl leading-relaxed drop-shadow-sm hover:scale-105 transition-transform duration-500 cursor-default">
                            {data.signature}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ClosingScreen;
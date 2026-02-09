import React, { useState } from 'react';
import { HighlightConfig, Memory } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import CommonButton from '../components/CommonButton';

interface Props {
    data: HighlightConfig;
    memories?: Memory[];
    onNext: () => void;
    onBack: () => void;
}

const HighlightScreen: React.FC<Props> = ({ data, memories = [], onNext, onBack }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLocked, setIsLocked] = useState(true);
    const [direction, setDirection] = useState(0);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLocked(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handlePrev = () => {
        setDirection(-1);
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            onBack();
        }
    };

    const handleNextSlide = () => {
        setDirection(1);
        if (currentIndex < (memories.length > 0 ? memories.length - 1 : 0)) {
            setCurrentIndex(currentIndex + 1);
        } else {
            if (!isLocked) onNext();
        }
    };

    const currentMemory = memories.length > 0 ? memories[currentIndex] : null;
    const displayTitle = currentMemory ? currentMemory.title : data.title;
    const displayImage = currentMemory ? currentMemory.image : data.image;
    const displayCaption = currentMemory ? currentMemory.description : data.caption;
    const displayDate = currentMemory ? currentMemory.date : data.location;
    const displayIcon = currentMemory ? currentMemory.icon : 'location_on';

    const isLastSlide = currentIndex === (memories.length > 0 ? memories.length - 1 : 0);

    return (
        <motion.div
            className="font-sans text-[#1e1414] antialiased overflow-hidden min-h-screen flex flex-col relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fff0f1_0%,_#e8b5b9_60%,_#b08d90_100%)]"></div>
            <div className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E')" }}></div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            opacity: [0.1, 0.4, 0.1],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="relative z-20 flex items-center p-6 w-full justify-between"
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
                    <span className="text-white text-xs font-bold uppercase tracking-[0.4em] drop-shadow-md">Slideshow</span>
                    <span className="text-white/80 text-[10px] font-bold mt-1 tracking-widest">{currentIndex + 1} / {memories.length || 1}</span>
                </div>
                <div className="size-10" /> {/* Spacer */}
            </motion.div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 w-full max-w-md mx-auto">
                <div className="relative w-full aspect-[340/440] max-h-[50vh] flex items-center justify-center mb-8">
                    {/* Halo Glow */}
                    <motion.div
                        className="absolute inset-0 -m-8 bg-white/30 blur-[60px] rounded-full z-0"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Photo Frame with AnimatePresence */}
                    <div className="relative w-full h-full bg-white p-[3px] shadow-2xl rounded-sm z-10 overflow-hidden transform">
                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={{
                                    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
                                    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
                                    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.9, transition: { duration: 0.4 } })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 bg-gray-100 overflow-hidden"
                            >
                                <motion.div
                                    className="w-full h-full bg-center bg-cover bg-no-repeat"
                                    style={{ backgroundImage: `url('${displayImage}')` }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 8 }}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Art Deco Corners */}
                        <svg className="absolute top-2 left-2 w-10 h-10 text-gold-accent z-20" fill="none" viewBox="0 0 50 50"><path d="M2 50V14C2 7.37258 7.37258 2 14 2H50" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path><circle cx="14" cy="14" r="3" fill="currentColor"></circle></svg>
                        <svg className="absolute top-2 right-2 w-10 h-10 text-gold-accent z-20 rotate-90" fill="none" viewBox="0 0 50 50"><path d="M2 50V14C2 7.37258 7.37258 2 14 2H50" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path><circle cx="14" cy="14" r="3" fill="currentColor"></circle></svg>
                        <svg className="absolute bottom-2 left-2 w-10 h-10 text-gold-accent z-20 -rotate-90" fill="none" viewBox="0 0 50 50"><path d="M2 50V14C2 7.37258 7.37258 2 14 2H50" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path><circle cx="14" cy="14" r="3" fill="currentColor"></circle></svg>
                        <svg className="absolute bottom-2 right-2 w-10 h-10 text-gold-accent z-20 rotate-180" fill="none" viewBox="0 0 50 50"><path d="M2 50V14C2 7.37258 7.37258 2 14 2H50" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path><circle cx="14" cy="14" r="3" fill="currentColor"></circle></svg>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`info-${currentIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-3 z-20 max-w-[90%]"
                    >
                        <h2 className="text-[#1e1414] font-serif text-3xl font-bold tracking-tight leading-tight drop-shadow-sm whitespace-pre-line">
                            {displayTitle}
                        </h2>
                        <div className="flex items-center justify-center gap-2 text-primary-dark font-bold text-xs uppercase tracking-[0.2em]">
                            <span className="material-symbols-outlined text-sm">{displayIcon}</span>
                            <span>{displayDate}</span>
                        </div>
                        {displayCaption && (
                            <p className="text-[#6d5456] font-sans text-base italic tracking-wide leading-relaxed mt-4 opacity-90">
                                "{displayCaption}"
                            </p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-20 w-full px-8 pb-10">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <CommonButton
                        onClick={handlePrev}
                        icon="chevron_left"
                        variant="glass"
                        size="icon"
                        animateIcon={true}
                    />

                    <div className="flex gap-2">
                        {memories.map((_, i) => (
                            <motion.div
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className="h-2 rounded-full cursor-pointer"
                                animate={{
                                    width: i === currentIndex ? 24 : 8,
                                    backgroundColor: i === currentIndex ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)"
                                }}
                            />
                        ))}
                    </div>

                    <CommonButton
                        onClick={handleNextSlide}
                        isLocked={isLastSlide && isLocked}
                        icon="arrow_forward"
                        secondaryIcon="lock"
                        variant="glass"
                        size="icon"
                    />
                </div>
                {isLastSlide && isLocked && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-center text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold mt-4"
                    >
                        Reliving All Beauty...
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
};

export default HighlightScreen;
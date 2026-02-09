import React from 'react';
import { GiftRevealConfig } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import CommonButton from '../components/CommonButton';

interface Props {
    data: GiftRevealConfig;
    onNext: () => void;
}

const GiftRevealScreen: React.FC<Props> = ({ data, onNext }) => {
    const [isLocked, setIsLocked] = React.useState(true);

    const handleNext = () => {
        if (!isLocked) onNext();
    };

    return (
        <motion.div
            className="bg-white h-screen w-full overflow-hidden flex flex-col items-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onAnimationComplete={() => setIsLocked(false)}
        >
            {/* Confetti Background */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2.5 h-2.5 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: ['#e8b5b9', '#D4AF37', '#FFD700'][i % 3],
                        }}
                        animate={{
                            y: [0, -100],
                            x: [0, (Math.random() - 0.5) * 50],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.2, 0],
                        }}
                        transition={{
                            duration: Math.random() * 2 + 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto p-6 justify-between">
                <div className="h-8 w-full shrink-0"></div>

                <div className="flex-1 flex flex-col items-center justify-center relative -mt-10">
                    <div className="relative w-56 h-56 mb-4 z-20">
                        {/* Sunburst */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] z-0 opacity-40 bg-[repeating-conic-gradient(from_0deg,_rgba(232,181,185,0.1)_0deg,_rgba(232,181,185,0.1)_15deg,_transparent_15deg,_transparent_30deg)] mask-[radial-gradient(circle,black_30%,transparent_70%)]"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Floating Heart */}
                        <motion.div
                            className="absolute -top-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center drop-shadow-2xl"
                            initial={{ scale: 0, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                        >
                            <motion.span
                                className="material-symbols-outlined text-[110px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#FAD961] to-[#D4AF37]"
                                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                            >favorite</motion.span>
                        </motion.div>

                        {/* Opened Box */}
                        <motion.div
                            className="w-full h-full bg-contain bg-center bg-no-repeat relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                            style={{ backgroundImage: `url('${data.giftImage}')` }}
                        />
                    </div>

                    <motion.div
                        className="absolute top-1/3 left-10 text-gold-accent opacity-80"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="material-symbols-outlined text-2xl">star</span>
                    </motion.div>
                </div>

                <div className="flex flex-col items-center w-full pb-8 z-20 bg-gradient-to-t from-white via-white/80 to-transparent pt-12">
                    <motion.div
                        className="text-center mb-8 space-y-3"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h1 className="text-text-main tracking-tight text-4xl font-serif font-black leading-tight px-4 whitespace-nowrap">
                            {data.revealTitle} <span className="text-primary-dark italic">Love</span>
                        </h1>
                        <motion.div
                            className="h-1.5 w-20 bg-primary/40 rounded-full mx-auto my-4"
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ delay: 1, duration: 1 }}
                        />
                        <p className="text-[#6d5456] text-lg font-bold tracking-[0.2em] uppercase px-4 opacity-80">
                            {data.revealMessage}
                        </p>
                    </motion.div>

                    <CommonButton
                        onClick={handleNext}
                        isLocked={isLocked}
                        label={data.buttonText}
                        secondaryLabel="Unveiling..."
                        icon="card_giftcard"
                        secondaryIcon="lock"
                        variant="primary"
                        size="md"
                        fullWidth={true}
                        className="max-w-[320px]"
                    />
                </div>
                <div className="h-4 w-full shrink-0"></div>
            </div>
        </motion.div>
    );
};

export default GiftRevealScreen;
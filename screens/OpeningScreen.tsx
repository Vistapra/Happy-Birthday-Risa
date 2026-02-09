import React from 'react';
import { OpeningConfig } from '../types';
import { motion } from 'framer-motion';
import CommonButton from '../components/CommonButton';

interface Props {
    data: OpeningConfig;
    onNext: () => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.5
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const OpeningScreen: React.FC<Props> = ({ data, onNext }) => {
    const [isLocked, setIsLocked] = React.useState(true);

    const handleNext = () => {
        if (!isLocked) onNext();
    };

    return (
        <motion.div
            className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[radial-gradient(circle_at_center,_var(--color-bg)_0%,_#FFF0F0_100%)] overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setIsLocked(false)}
        >
            {/* Atmospheric Bokeh */}
            <motion.div
                className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-10 -right-10 w-72 h-72 bg-lavender-mist/30 rounded-full blur-[80px]"
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center gap-8 p-6 text-center w-full max-w-md">
                <motion.div
                    variants={itemVariants}
                    className={`relative group transition-opacity duration-500 ${isLocked ? 'opacity-90' : 'cursor-pointer'}`}
                    onClick={handleNext}
                >
                    <motion.h1
                        className="font-serif font-bold text-[42px] leading-tight text-dusty-rose drop-shadow-sm tracking-wide"
                        whileHover={{ scale: 1.02 }}
                    >
                        {data.titleText}
                    </motion.h1>
                    <motion.p
                        className="text-sm text-gray-400 mt-2 font-medium tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        {data.subtitleText}
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="relative w-48 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl rotate-[-2deg]"
                    whileHover={{ rotate: 0, scale: 1.05, transition: { duration: 0.5 } }}
                >
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10"></div>
                    <img
                        src={data.backgroundImage}
                        alt="Portrait"
                        className="w-full h-full object-cover transition-transform duration-1000"
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <CommonButton
                        onClick={handleNext}
                        isLocked={isLocked}
                        label={data.buttonText}
                        secondaryLabel="Loading Magic..."
                        icon="arrow_forward"
                        variant="glass"
                        size="md"
                        className="mt-8"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default OpeningScreen;
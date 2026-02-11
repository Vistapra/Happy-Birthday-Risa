import React from 'react';
import { GreetingConfig } from '../types';
import { motion } from 'framer-motion';
import CommonButton from '../components/CommonButton';

interface Props {
    data: GreetingConfig;
    onNext: () => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

const GreetingScreen: React.FC<Props> = ({ data, onNext }) => {
    const [isLocked, setIsLocked] = React.useState(true);

    const handleNext = () => {
        if (!isLocked) onNext();
    };

    return (
        <motion.div
            className="relative flex flex-col items-center justify-between min-h-screen w-full bg-gradient-to-b from-cream-start to-warm-peach p-6 py-10 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setIsLocked(false)}
        >
            {/* Decoration Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-primary/20"
                        style={{
                            width: Math.random() * 20 + 10,
                            height: Math.random() * 20 + 10,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center w-full mt-8">
                <motion.div
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/50 backdrop-blur-md shadow-sm text-gold-accent mb-4"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                >
                    <span className="material-symbols-outlined text-[24px]">celebration</span>
                </motion.div>
                <span className="text-gold-accent text-sm uppercase tracking-[0.3em] font-bold opacity-80">
                    {data.badgeText}
                </span>
            </motion.div>

            <div className="flex flex-col items-center text-center space-y-4 w-full max-w-md z-10">
                <motion.h2 variants={itemVariants} className="text-[#5D4037] font-serif italic text-3xl opacity-90 leading-tight">
                    {data.subTitle}
                </motion.h2>
                <motion.h1 variants={itemVariants} className="text-5xl font-serif font-bold text-gradient-gold drop-shadow-sm py-2 leading-tight tracking-tight whitespace-pre-line">
                    {data.heading}
                </motion.h1>

                <motion.div variants={itemVariants} className="py-4 w-full flex items-center justify-center opacity-70 text-gold-accent">
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-accent"></div>
                    <motion.span
                        className="material-symbols-outlined mx-3 text-lg fill-current"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >favorite</motion.span>
                    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-accent"></div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="relative w-56 h-72 my-4 rounded-[40px] p-2 bg-white/40 backdrop-blur-md shadow-2xl border border-white/50 transform -rotate-2"
                    animate={{ rotate: [-2, 1, -2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ rotate: 0, scale: 1.05 }}
                >
                    <div className="w-full h-full rounded-[32px] overflow-hidden relative bg-gray-100">
                        <img
                            src={data.avatarImage}
                            alt="Portrait"
                            className="w-full h-full object-cover opacity-95 transition-transform duration-700"
                        />
                    </div>
                    <motion.div
                        className="absolute -bottom-4 -right-4 bg-white text-dusty-rose text-xs font-bold py-2 px-4 rounded-full shadow-lg border border-primary/20 flex items-center gap-1.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5, type: 'spring' }}
                    >
                        <span className="material-symbols-outlined text-[16px] text-gold-accent">auto_awesome</span>
                        CALON ISTRIKU
                    </motion.div>
                </motion.div>

                <motion.p variants={itemVariants} className="text-[#5D4037] text-lg font-medium leading-relaxed max-w-xs pt-4">
                    {data.message}
                </motion.p>
            </div>

            <motion.div variants={itemVariants} className="w-full max-w-sm pb-6 z-10">
                <CommonButton
                    onClick={handleNext}
                    isLocked={isLocked}
                    label={data.buttonText}
                    secondaryLabel="Absorbing Beauty..."
                    icon="arrow_forward"
                    variant="primary"
                    size="md"
                    fullWidth={true}
                />
            </motion.div>
        </motion.div>
    );
};

export default GreetingScreen;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommonButtonProps {
    onClick: () => void;
    label?: string;
    secondaryLabel?: string;
    icon?: string;
    secondaryIcon?: string;
    disabled?: boolean;
    isLocked?: boolean;
    variant?: 'primary' | 'secondary' | 'glass' | 'white';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    fullWidth?: boolean;
    className?: string;
    animateIcon?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
    onClick,
    label,
    secondaryLabel,
    icon,
    secondaryIcon,
    disabled = false,
    isLocked = false,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    animateIcon = true,
}) => {
    const baseStyles = "relative flex items-center justify-center gap-2 transition-all duration-300 font-bold uppercase tracking-widest overflow-hidden";

    const variants = {
        primary: "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark",
        secondary: "bg-rose-gold text-white shadow-md hover:bg-rose-gold-dark",
        glass: "bg-white/40 backdrop-blur-md text-text-main border border-white/50 shadow-xl",
        white: "bg-white text-text-main shadow-lg border border-primary/10 hover:bg-gray-50",
    };

    const sizes = {
        sm: "px-6 py-2.5 text-[10px] rounded-xl min-h-[40px]",
        md: "px-8 py-3 text-xs rounded-2xl min-h-[48px]",
        lg: "px-10 py-4 text-sm rounded-[20px] min-h-[56px]",
        icon: "p-2.5 rounded-full aspect-square min-w-[44px] min-h-[44px]",
    };

    const isDisabled = disabled || isLocked;

    const currentLabel = isLocked && secondaryLabel ? secondaryLabel : label;
    const currentIcon = isLocked && secondaryIcon ? secondaryIcon : icon;

    return (
        <motion.button
            onClick={!isDisabled ? onClick : undefined}
            disabled={isDisabled}
            whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : 'w-fit'}
                ${isDisabled ? 'opacity-60 grayscale cursor-not-allowed shadow-none' : 'cursor-pointer'}
                ${className}
            `}
        >
            {/* Shimmer Effect */}
            {!isDisabled && variant !== 'glass' && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${currentLabel}-${currentIcon}`}
                    className="flex items-center justify-center gap-2 z-10"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                >
                    {currentIcon && (
                        <motion.span
                            className="material-symbols-outlined text-[20px]"
                            animate={!isDisabled && animateIcon ? { x: [0, 3, 0] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            {currentIcon}
                        </motion.span>
                    )}
                    {currentLabel && <span>{currentLabel}</span>}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

export default CommonButton;

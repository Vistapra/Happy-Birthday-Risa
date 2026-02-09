import React from 'react';
import { PreloaderConfig } from '../types';
import { motion } from 'framer-motion';

interface Props {
  data?: PreloaderConfig;
}

const Preloader: React.FC<Props> = ({ data }) => {
  const bgStyle = { backgroundColor: data?.backgroundColor || '#FFFAF5' };
  const loaderColor = data?.loaderColor || '#e8b5b9';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full overflow-hidden relative" style={bgStyle}>
      {/* Elegant Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

      {/* Particles with Framer Motion */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-60"
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: 0
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: Math.random() * 5 + i * 0.2 + 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            backgroundColor: i % 2 === 0 ? loaderColor : '#D4AF37',
            filter: 'blur(1px)'
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0 blur-2xl rounded-full scale-150"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1.2, 1.6, 1.2],
              backgroundColor: loaderColor
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>

          {data?.logoImage ? (
            <motion.img
              src={data.logoImage}
              alt="Loading Logo"
              className="w-24 h-24 object-contain relative z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <motion.span
              className="material-symbols-outlined text-7xl drop-shadow-lg relative z-10"
              style={{ color: loaderColor }}
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {data?.icon || 'spa'}
            </motion.span>
          )}
        </motion.div>

        <div className="flex items-center gap-3 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: loaderColor }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.p
          className="font-sans text-sm font-semibold tracking-[0.2em] text-dusty-rose uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {data?.text || 'Preparing something special...'}
        </motion.p>
      </div>
    </div>
  );
};

export default Preloader;
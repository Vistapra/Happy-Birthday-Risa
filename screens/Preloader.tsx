import React from 'react';
import { PreloaderConfig } from '../types';

interface Props {
  data?: PreloaderConfig;
}

const Preloader: React.FC<Props> = ({ data }) => {
  const bgStyle = { backgroundColor: data?.backgroundColor || '#FFFAF5' };
  const loaderColor = data?.loaderColor || '#e8b5b9';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full overflow-hidden relative" style={bgStyle}>
      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-60 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            backgroundColor: i % 2 === 0 ? loaderColor : '#D4AF37',
            animationDuration: `${Math.random() * 5 + 3}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-white/30 blur-xl rounded-full scale-150"></div>
          <span className="material-symbols-outlined text-6xl text-white drop-shadow-md relative z-10" style={{ color: loaderColor }}>
            spa
          </span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: loaderColor, animationDelay: '0s' }}></div>
          <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: loaderColor, animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: loaderColor, animationDelay: '0.4s' }}></div>
        </div>

        <p className="font-sans text-sm font-medium tracking-wide text-dusty-rose">
          Preparing something special...
        </p>
      </div>
    </div>
  );
};

export default Preloader;
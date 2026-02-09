import React, { useState, useEffect, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  tx: string;
  ty: string;
}

const colors = ['#e8b5b9', '#D4AF37', '#FFD700', '#FFFAF5', '#E8D5F2'];

const ClickEffects: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    const count = 10;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const distance = 40 + Math.random() * 40;
      
      newParticles.push({
        id: Date.now() + Math.random(),
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        tx: `${Math.cos(angle) * distance}px`,
        ty: `${Math.sin(angle) * distance}px`
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Clean up particles after animation finishes
    setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id > Date.now() - 1000));
    }, 800);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      createParticles(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [createParticles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden top-0 left-0 w-full h-full">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-particle-out"
          style={{
            left: p.x,
            top: p.y,
            width: '8px',
            height: '8px',
            backgroundColor: p.color,
            '--tx': p.tx,
            '--ty': p.ty,
          } as React.CSSProperties} 
        />
      ))}
    </div>
  );
};

export default ClickEffects;
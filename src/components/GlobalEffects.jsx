import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CRTEffect = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04] mix-blend-overlay">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-100"></div>
  </div>
);

export const CustomCursor = () => {
  // Começamos o cursor fora da tela (ou no centro no mobile)
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta se é um dispositivo de toque
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true);
      // No mobile, centraliza a luz inicialmente
      setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    const updatePosition = (x, y) => {
      setPosition({ x, y });
    };

    const onMouseMove = (e) => updatePosition(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      // Impede o scroll de quebrar se o usuário estiver só iluminando, 
      // mas permite rolar a página. A lanterna segue o dedo.
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-white mix-blend-difference blur-[4px]"
      // Tamanho ajustado: 250px (lanterna grande). Pode aumentar para 300px se quiser mais luz.
      style={{ width: '250px', height: '250px' }}
      // Centraliza o circulo no eixo X e Y do mouse/dedo (-125 é metade de 250)
      animate={{ x: position.x - 125, y: position.y - 125 }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
    />
  );
};
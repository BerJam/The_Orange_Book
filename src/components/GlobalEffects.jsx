// src/components/GlobalEffects.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CRTEffect = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04] mix-blend-overlay">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-100"></div>
  </div>
);

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 rounded-full bg-white mix-blend-difference"
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    />
  );
};

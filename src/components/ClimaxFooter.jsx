// src/components/ClimaxFooter.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ClimaxFooter = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, ms: 0 });

  useEffect(() => {
    // Define o alvo para 7 dias no futuro (exemplo)
    const targetDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        ms: Math.floor((distance % 1000) / 10)
      });
    }, 50); // Atualização rápida para os milissegundos

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de captura de e-mail real entraria aqui
    alert('ACESSO REQUERIDO.');
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between bg-black px-6 py-20">
      
      {/* Contagem Regressiva Desconstruída */}
      <div className="relative flex h-[50vh] w-full items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute left-[10%] top-[20%] font-serif text-5xl text-[#333]"
          animate={{ opacity: [0.5, 1, 0.5], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {String(timeLeft.days).padStart(2, '0')} <span className="font-mono text-[10px] text-[#555]">D</span>
        </motion.div>

        <motion.div 
          className="absolute right-[20%] top-[10%] font-mono text-8xl text-white mix-blend-difference"
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 0.1, repeat: Infinity, repeatType: 'mirror' }}
        >
          {String(timeLeft.hours).padStart(2, '0')}
        </motion.div>

        <motion.div 
          className="absolute bottom-[30%] left-[30%] font-serif text-[12rem] font-black leading-none text-[#111]"
        >
          {String(timeLeft.minutes).padStart(2, '0')}
        </motion.div>

        <motion.div 
          className="absolute bottom-[10%] right-[10%] font-mono text-4xl text-white"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {String(timeLeft.seconds).padStart(2, '0')}
          <span className="ml-2 text-[10px] text-[#00ff00]">{String(timeLeft.ms).padStart(2, '0')}</span>
        </motion.div>
      </div>

      {/* Formulário de Captura */}
      <div className="w-full max-w-lg z-10">
        <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-[3px] text-[#888]">
          Notifique-me antes do público geral
        </p>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
          <input 
            type="email" 
            placeholder="ENTER_EMAIL@ADDRESS.COM" 
            required
            className="w-full border-b border-[#333] bg-transparent pb-4 text-center font-mono text-[12px] uppercase tracking-[2px] text-white transition-colors focus:border-white focus:outline-none placeholder:text-[#333]"
          />
          <button 
            type="submit"
            className="group relative w-full overflow-hidden border border-[#333] bg-black py-4 font-mono text-[10px] uppercase tracking-[3px] text-white transition-colors hover:border-white"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Criptografar & Enviar
            </span>
            <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
          </button>
        </form>
      </div>

      {/* Link Oculto para o E-commerce Original */}
      <a 
        href="/" 
        className="absolute bottom-6 right-6 font-mono text-[8px] uppercase tracking-[2px] text-[#333] opacity-30 transition-opacity hover:opacity-100 hover:text-white"
      >
        // Return to standard protocol
      </a>
    </section>
  );
};
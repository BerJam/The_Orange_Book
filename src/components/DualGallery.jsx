import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useShake } from '../hooks/useShake';

export const DualGallery = () => {
  const [isRawMode, setIsRawMode] = useState(false);
  const [glitching, setGlitching] = useState(false);

  const toggleMode = useCallback(() => {
    // Evita múltiplos disparos simultâneos
    if (glitching) return; 
    
    setGlitching(true);
    
    // Tenta vibrar o celular (Haptic Feedback) - 200ms
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    // Aplica o estado de "glitch" e troca a view no meio dele
    setTimeout(() => {
      setIsRawMode(prev => !prev);
    }, 150);

    setTimeout(() => {
      setGlitching(false);
    }, 500);
  }, [glitching]);

  // Ativa o ouvinte de "Shake"
  useShake(toggleMode);

  return (
    <motion.section 
      className={`relative min-h-screen w-full transition-colors duration-700 ${isRawMode ? 'bg-[#f4f4f4]' : 'bg-white'}`}
      // Animação de Glitch aplicada no container inteiro
      animate={glitching ? { x: [-10, 10, -5, 5, 0], filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'] } : { x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.4 }}
    >
      {/* Indicador Silencioso no topo */}
      <div className="fixed top-6 left-6 z-50">
        <span className="font-monospace text-[9px] uppercase tracking-[2px] text-[#888]">
          {isRawMode ? "MODO: CORROMPIDO" : "MODO: SERENO"}
        </span>
      </div>

      <div className="fixed top-6 right-6 z-50">
        <span className="font-monospace text-[8px] uppercase tracking-[1px] text-[#ccc]">
          {isRawMode ? "Shake to restore" : "Shake to corrupt"}
        </span>
      </div>

      {/* RENDERIZAÇÃO CONDICIONAL DAS VIEWS */}
      {!isRawMode ? (
        /* =========================================
           VIEW 1: SERENA (LIMPA, ESPAÇADA, APROVADOS)
           ========================================= */
        <div className="mx-auto max-w-4xl px-6 pt-32 pb-20">
          <div className="mb-24 text-center">
            <h2 className="font-monospace text-2xl font-light uppercase tracking-[6px] text-[#111] md:text-4xl">
              Arquivo Oficial
            </h2>
            <p className="mt-6 font-monospace text-[10px] uppercase tracking-[2px] text-[#888]">
              Drop 01. Peças aprovadas e finalizadas.
            </p>
          </div>

          {/* Grid Organizado */}
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={`clean-${item}`} className="flex flex-col items-center">
                <div className="aspect-[3/4] w-full bg-[#f9f9f9] overflow-hidden">
                   {/* Coloque a imagem real da peça aqui */}
                   <img src={`/approved-${item}.jpg`} alt={`Peça ${item}`} className="h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100" />
                </div>
                <p className="mt-4 font-monospace text-[10px] uppercase tracking-[2px] text-[#333]">
                  Produto Final 0{item}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* =========================================
           VIEW 2: RAW/BRUTAL (CAÓTICA, SOBREPOSTA)
           ========================================= */
        <div className="relative min-h-[150vh] w-full overflow-hidden pt-32 pb-20">
          <div className="mb-12 px-6 text-left">
             <h2 className="font-monospace text-4xl font-bold uppercase tracking-tighter text-[#111] mix-blend-multiply md:text-7xl">
              [ RAW_DATA ]
            </h2>
          </div>

          {/* Posicionamento Assimétrico e Caótico */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="absolute top-[20%] left-[5%] w-[60%] md:w-[30%]">
            <img src="/demo-1.jpg" alt="Demo" className="w-full grayscale filter contrast-125" />
            <p className="absolute bottom-2 left-2 bg-black px-2 py-1 font-monospace text-[8px] text-white">REJEITADO - LAVAGEM EXTREMA</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="absolute top-[40%] right-[5%] z-10 w-[50%] md:w-[25%]">
            <img src="/demo-2.jpg" alt="Demo" className="w-full rotate-3" />
            <p className="absolute -top-4 right-0 font-monospace text-[10px] text-red-600">TESTE_COR_04.jpg</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[65%] left-[20%] w-[70%] md:w-[40%]">
            <img src="/demo-3.jpg" alt="Demo" className="w-full opacity-80 mix-blend-multiply" />
          </motion.div>
        </div>
      )}

      {/* Botão Fallback para Desktop (Já que monitores não tremem) */}
      <button 
        onClick={toggleMode}
        className="fixed bottom-6 right-6 z-50 border-b border-[#111] pb-1 font-monospace text-[9px] uppercase tracking-[2px] text-[#111] transition-opacity hover:opacity-50 hidden md:block"
      >
        Forçar {isRawMode ? "001" : "XX-XX"}
      </button>
    </motion.section>
  );
};
// src/components/Manifesto.jsx
import React from 'react';
import { motion } from 'framer-motion';

export const Manifesto = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        className="flex flex-col items-center"
      >
        {/* Tipografia de Impacto */}
        <h2 className="text-center font-serif text-6xl font-black uppercase leading-[0.85] tracking-tighter text-white md:text-9xl lg:text-[11rem]">
          Desordem <br /> <span className="text-[#333]">Sintética</span>
        </h2>
        
        {/* Contraponto Monospace */}
        <p className="mt-12 max-w-md text-center font-mono text-[10px] uppercase leading-relaxed tracking-[3px] text-[#888]">
          O arquivo original foi corrompido. Esta é a reconstrução crua do Drop 01. 
          Sem polimento. Sem concessões. Apenas a fundação técnica do que está por vir.
        </p>
      </motion.div>
    </section>
  );
};
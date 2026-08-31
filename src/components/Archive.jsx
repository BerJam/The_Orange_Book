// src/components/Archive.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Mock de dados simulando o arquivo com velocidades de parallax e posições caóticas
const archiveItems = [
  { id: 1, src: '/sample-1.jpg', top: '10%', left: '5%', width: '30vw', speed: 150, note: 'TEC: NYLON RIPSTOP // CORTE A LASER' },
  { id: 2, src: '/sample-2.jpg', top: '25%', left: '55%', width: '35vw', speed: -100, note: 'REVISAR COSTURA FRONTAL' },
  { id: 3, src: '/sample-3.jpg', top: '60%', left: '15%', width: '25vw', speed: 200, note: 'MOCKUP V2 // APROVADO' },
  { id: 4, src: '/sample-4.jpg', top: '75%', left: '60%', width: '28vw', speed: -50, note: 'TESTE DE TINGIMENTO #04' },
];

const AsymmetricImage = ({ item, scrollYProgress }) => {
  // Mapeia o progresso do scroll da seção inteira para um movimento no eixo Y
  const y = useTransform(scrollYProgress, [0, 1], [0, item.speed]);

  return (
    <motion.div
      style={{ y, top: item.top, left: item.left, width: item.width }}
      className="absolute group cursor-crosshair"
    >
      <div className="relative overflow-hidden bg-[#111]">
        <img 
          src={item.src} 
          alt={`Arquivo ${item.id}`}
          className="h-auto w-full object-cover transition-all duration-300 group-hover:grayscale-0"
          style={{ filter: 'grayscale(15%)' }} 
        />
        
        {/* Hover Disruptivo: Anotações Técnicas Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between bg-black/60 p-4 opacity-0 mix-blend-difference transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-monospace text-[10px] uppercase tracking-[2px] text-[#00ff00]">
            [RAW_DATA_ACCESS]
          </span>
          <span className="font-monospace text-[12px] uppercase tracking-[1px] text-white">
            {item.note}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const Archive = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] w-full overflow-hidden bg-black py-20"
    >
      {/* Marcador de Seção */}
      <div className="sticky top-10 z-10 w-full px-6 mix-blend-difference">
        <span className="font-monospace text-[10px] uppercase tracking-[3px] text-white">
          /// THE_VAULT.DIR
        </span>
      </div>

      {archiveItems.map((item) => (
        <AsymmetricImage key={item.id} item={item} scrollYProgress={scrollYProgress} />
      ))}
    </section>
  );
};
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeroGate } from './components/HeroGate';
import { DualGallery } from './components/DualGallery';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    // Fundo global agora é branco
    <div className="min-h-screen bg-white text-[#111] selection:bg-[#111] selection:text-white">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <HeroGate key="gate" onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <main key="main-content" className="flex flex-col">
            <DualGallery />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
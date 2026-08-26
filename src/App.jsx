// src/App.jsx (Final)
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GlobalEffects, CustomCursor, CRTEffect } from './components/GlobalEffects';
import { HeroGate } from './components/HeroGate';
import { Manifesto } from './components/Manifesto';
import { Archive } from './components/Archive';
import { ClimaxFooter } from './components/ClimaxFooter';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white cursor-none selection:bg-white selection:text-black">
      <CustomCursor />
      <CRTEffect />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <HeroGate key="gate" onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <main key="main-content" className="flex flex-col">
            <Manifesto />
            <Archive />
            <ClimaxFooter />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
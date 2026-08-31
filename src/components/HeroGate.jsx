import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const HeroGate = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [showIntro, setShowIntro] = useState(false);

  const SECRET_PASSCODE = "DROP01"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim().toUpperCase() === SECRET_PASSCODE) {
      setStatus('success');
      setTimeout(() => setShowIntro(true), 1200);
    } else {
      setStatus('error');
      setPassword('');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const handleEnter = async () => {
    // Pede permissão para o acelerômetro no iOS
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const permissionState = await DeviceMotionEvent.requestPermission();
        if (permissionState === 'granted') {
          onUnlock();
        } else {
          alert('Precisamos do sensor de movimento para a experiência completa.');
          onUnlock(); // Desbloqueia mesmo assim, mas sem o shake
        }
      } catch (error) {
        console.error(error);
        onUnlock();
      }
    } else {
      // Dispositivos Android ou Desktops não precisam pedir permissão
      onUnlock();
    }
  };

  if (showIntro) {
    return (
      <motion.section 
        className="relative flex h-screen w-full flex-col items-center justify-center bg-white px-6 text-center text-[#111]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-md">
          <motion.p 
            className="mb-12 font-sans text-[11px] uppercase leading-loose tracking-[3px] text-[#777] md:text-[13px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            A partir de agora você vai entrar no centro da Orange B.A.M. 
            <br /><br />
            Tudo o que temos está disponível aqui.
            <br /><br />
            <span className="font-medium tracking-[4px] text-[#111]">
              Se lembre: Clareie sua Visão.
            </span>
          </motion.p>
          
          <motion.button
            onClick={handleEnter}
            className="border border-[#111] bg-transparent px-10 py-4 font-sans text-[10px] uppercase tracking-[4px] text-[#111] transition-all hover:bg-[#111] hover:text-white focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Entrar na Galeria
          </motion.button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="relative flex h-screen w-full flex-col items-center justify-center bg-white px-6"
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-xs text-center">
        <motion.p 
          className="mb-10 font-sans text-[10px] uppercase tracking-[3px]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: status === 'idle' ? 2 : 0.5, repeat: Infinity, ease: 'linear' }}
          style={{ color: status === 'error' ? '#ff0000' : status === 'success' ? '#000000' : '#888888' }}
        >
          {status === 'idle' && "Insira a Credencial"}
          {status === 'error' && "[ ACESSO NEGADO ]"}
          {status === 'success' && "[ ACESSO CONCEDIDO ]"}
        </motion.p>

        <form onSubmit={handleSubmit} className="relative w-full">
          <motion.input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === 'success'}
            autoFocus
            spellCheck="false"
            autoComplete="off"
            animate={status === 'error' ? { x: [-10, 10, -10, 10, -5, 5, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-full bg-transparent border-b pb-2 text-center font-sans text-[12px] uppercase tracking-[4px] text-[#111] focus:outline-none transition-colors
              ${status === 'error' ? 'border-red-500 text-red-500 placeholder:text-red-200' : 
                status === 'success' ? 'border-[#111] text-[#111]' : 
                'border-[#ccc] focus:border-[#111] placeholder:text-[#ccc]'}`}
            placeholder="_ _ _ _ _ _"
          />
          <button type="submit" className="hidden">Submit</button>
        </form>
      </div>
    </motion.section>
  );
};
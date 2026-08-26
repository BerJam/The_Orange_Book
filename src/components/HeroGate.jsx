import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroGate = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, error, success
  const [showIntro, setShowIntro] = useState(false); // NOVO ESTADO

  const SECRET_PASSCODE = "DROP01"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password.trim().toUpperCase() === SECRET_PASSCODE) {
      setStatus('success');
      // Em vez de desbloquear o site, mostra a introdução
      setTimeout(() => {
        setShowIntro(true);
      }, 1200);
    } else {
      setStatus('error');
      setPassword('');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  // TELA 2: A MENSAGEM DA ORANGE B.A.M
  if (showIntro) {
    return (
      <motion.section 
        className="relative flex h-screen w-full flex-col items-center justify-center bg-black px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-md">
          <motion.p 
            className="mb-10 font-mono text-[11px] uppercase leading-loose tracking-[3px] text-[#aaa] md:text-[13px]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            A partir de agora você vai entrar no centro da Orange B.A.M. 
            <br /><br />
            Tudo o que temos está disponível aqui.
            <br /><br />
            <span className="text-white font-bold tracking-[4px]">
              Se lembre: Clareie sua Visão.
            </span>
          </motion.p>
          
          <motion.button
            onClick={onUnlock}
            className="border border-[#333] bg-black px-10 py-4 font-mono text-[10px] uppercase tracking-[4px] text-white transition-all hover:border-white hover:bg-white hover:text-black focus:outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Entrar
          </motion.button>
        </div>
      </motion.section>
    );
  }

  // TELA 1: A SENHA (Mantida igual, apenas renderizada quando !showIntro)
  return (
    <motion.section 
      className="relative flex h-screen w-full flex-col items-center justify-center bg-black px-6"
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-xs text-center">
        <motion.p 
          className="mb-8 font-mono text-[10px] uppercase tracking-[3px]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: status === 'idle' ? 2 : 0.5, repeat: Infinity, ease: 'linear' }}
          style={{ color: status === 'error' ? '#ff0000' : status === 'success' ? '#00ff00' : '#ffffff' }}
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
            className={`w-full bg-transparent border-b pb-2 text-center font-mono text-[12px] uppercase tracking-[4px] text-white focus:outline-none transition-colors
              ${status === 'error' ? 'border-red-500 text-red-500 placeholder:text-red-900' : 
                status === 'success' ? 'border-green-500 text-green-500' : 
                'border-[#333] focus:border-white placeholder:text-[#333]'}`}
            placeholder="_ _ _ _ _ _"
          />
          <button type="submit" className="hidden">Submit</button>
        </form>
      </div>
    </motion.section>
  );
};
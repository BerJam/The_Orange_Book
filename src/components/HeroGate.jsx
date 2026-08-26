// src/components/HeroGate.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const HeroGate = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, error, success

  // 1. CONFIGURAÇÃO DA SENHA AQUI
  const SECRET_PASSCODE = "friendsnfamily"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação simples (ignorando case sensitive)
    if (password.trim().toUpperCase() === SECRET_PASSCODE) {
      setStatus('success');
      // Aguarda um momento para a animação de sucesso antes de desmontar
      setTimeout(() => {
        onUnlock();
      }, 1200);
    } else {
      setStatus('error');
      setPassword('');
      // Retorna ao estado neutro após o aviso de erro
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <motion.section 
      className="relative flex h-screen w-full flex-col items-center justify-center bg-black px-6"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-xs text-center">
        {/* Texto de Status Piscante */}
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

        {/* Formulário de Senha */}
        <form onSubmit={handleSubmit} className="relative w-full">
          <motion.input
            type="text" // Usando 'text' em vez de 'password' para manter a estética do terminal, ou troque se preferir ocultar
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === 'success'}
            autoFocus
            spellCheck="false"
            autoComplete="off"
            // Efeito de "tremer" (shake) em caso de erro
            animate={status === 'error' ? { x: [-10, 10, -10, 10, -5, 5, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-full bg-transparent border-b pb-2 text-center font-mono text-[12px] uppercase tracking-[4px] text-white focus:outline-none transition-colors
              ${status === 'error' ? 'border-red-500 text-red-500 placeholder:text-red-900' : 
                status === 'success' ? 'border-green-500 text-green-500' : 
                'border-[#333] focus:border-white placeholder:text-[#333]'}`}
            placeholder="_ _ _ _ _ _"
          />
          
          {/* Botão de Envio Oculto (funciona com o Enter) */}
          <button type="submit" className="hidden">Submit</button>
        </form>
      </div>
    </motion.section>
  );
};
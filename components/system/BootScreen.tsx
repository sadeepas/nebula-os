import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { SystemState } from '../../types';
import { INITIAL_BOOT_DURATION } from '../../constants';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;

export const BootScreen: React.FC = () => {
  const { setSystemState } = useOS();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSystemState(SystemState.LOCK);
    }, INITIAL_BOOT_DURATION);
    return () => clearTimeout(timer);
  }, [setSystemState]);

  return (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-[100] text-white">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        {/* Nebula Logo */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 animate-pulse blur-lg absolute inset-0 opacity-50" />
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 relative z-10 flex items-center justify-center shadow-2xl">
             <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-12 h-12">
                 <circle cx="12" cy="12" r="10" />
                 <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                 <path d="M2 12h20" />
             </svg>
        </div>
      </MotionDiv>

      <MotionH1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold tracking-[0.2em] mb-8"
      >
        NEBULA OS
      </MotionH1>

      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <MotionDiv 
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
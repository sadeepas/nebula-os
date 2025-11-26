import React from 'react';
import { OSProvider, useOS } from './context/OSContext';
import { BootScreen } from './components/system/BootScreen';
import { LockScreen } from './components/system/LockScreen';
import { PowerOffScreen } from './components/system/PowerOffScreen';
import { Desktop } from './components/system/Desktop';
import { VirtualKeyboard } from './components/system/VirtualKeyboard';
import { SystemState } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const OSManager: React.FC = () => {
  const { systemState } = useOS();

  return (
    <AnimatePresence mode="wait">
      {systemState === SystemState.OFF && (
          <MotionDiv key="off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PowerOffScreen />
          </MotionDiv>
      )}

      {systemState === SystemState.BOOT && (
        <MotionDiv key="boot" exit={{ opacity: 0 }} className="absolute inset-0">
            <BootScreen />
        </MotionDiv>
      )}
      
      {systemState === SystemState.LOCK && (
         <MotionDiv 
            key="lock" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
        >
            <LockScreen />
         </MotionDiv>
      )}

      {systemState === SystemState.DESKTOP && (
         <MotionDiv 
            key="desktop" 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
        >
            <Desktop />
            <VirtualKeyboard />
         </MotionDiv>
      )}
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <OSProvider>
      <OSManager />
    </OSProvider>
  );
};

export default App;
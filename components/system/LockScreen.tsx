import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../../context/OSContext';
import { SystemState } from '../../types';
import { Lock, Unlock, ChevronUp, Music, CloudRain, Calendar, Bell, ScanFace, X } from 'lucide-react';

const MotionDiv = motion.div as any;

export const LockScreen: React.FC = () => {
  const { setSystemState, currentWallpaper, systemHealth } = useOS();
  const [time, setTime] = useState(new Date());
  const [showAuth, setShowAuth] = useState(false);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState(false);
  const [scanningFace, setScanningFace] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlockAttempt = () => {
    if (pin === '1234' || pin === '0000') {
      setSystemState(SystemState.DESKTOP);
    } else {
      setAuthError(true);
      setPin('');
      setTimeout(() => setAuthError(false), 500);
    }
  };

  const startFaceScan = async () => {
    setScanningFace(true);
    try {
        // Mock camera access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if(videoRef.current) {
            videoRef.current.srcObject = stream;
        }
        setTimeout(() => {
            setSystemState(SystemState.DESKTOP);
            stream.getTracks().forEach(t => t.stop());
        }, 2000); // 2s simulated scan
    } catch(e) {
        console.error("Face ID failed", e);
        setScanningFace(false);
    }
  };

  // Auto-submit pin
  useEffect(() => {
      if(pin.length === 4) handleUnlockAttempt();
  }, [pin]);

  const widgets = (
      <div className="flex gap-4 mt-8">
          <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl w-32 flex flex-col items-center justify-center text-white border border-white/10 shadow-lg">
              <CloudRain size={24} className="mb-2 text-blue-300"/>
              <span className="text-xl font-bold">72°</span>
              <span className="text-xs opacity-70">San Francisco</span>
          </div>
          <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl w-32 flex flex-col items-center justify-center text-white border border-white/10 shadow-lg">
              <Calendar size={24} className="mb-2 text-red-300"/>
              <span className="text-sm font-bold text-center">Meeting</span>
              <span className="text-xs opacity-70">2:00 PM</span>
          </div>
          <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl w-32 flex flex-col items-center justify-center text-white border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20"/>
              <Music size={24} className="mb-2 text-purple-300 relative z-10"/>
              <div className="w-full h-1 bg-white/20 rounded-full mt-1 mb-1 relative z-10">
                  <div className="w-1/3 h-full bg-white rounded-full"/>
              </div>
              <span className="text-xs opacity-70 relative z-10">Lofi Beats</span>
          </div>
      </div>
  );

  const notifications = (
      <div className="mt-8 w-full max-w-sm space-y-2">
          {[1, 2].map(i => (
              <div key={i} className="bg-white/10 backdrop-blur-xl p-3 rounded-xl border border-white/5 flex items-start gap-3 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                      <Bell size={16} className="text-white"/>
                  </div>
                  <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-sm text-white">Messages</span>
                        <span className="text-[10px] text-white/50">2m ago</span>
                      </div>
                      <p className="text-xs text-white/80 truncate">Hey, are we still on for lunch today?</p>
                  </div>
              </div>
          ))}
      </div>
  );

  return (
    <div 
      className="absolute inset-0 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${currentWallpaper})` }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      
      <AnimatePresence mode="wait">
        {!showAuth ? (
            <MotionDiv 
                key="glance"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0, y: -50 }}
                className="absolute inset-0 flex flex-col items-center pt-20 pb-10 z-10"
                onClick={() => setShowAuth(true)}
            >
                 <div className="flex flex-col items-center">
                    <h1 className="text-8xl font-thin tracking-tighter text-white drop-shadow-lg">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </h1>
                    <p className="text-2xl font-medium tracking-wide text-white/90 drop-shadow-md mt-2">
                        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                 </div>

                 {widgets}
                 {notifications}

                 <div className="mt-auto flex flex-col items-center animate-bounce">
                     <ChevronUp className="text-white/70 mb-2"/>
                     <span className="text-white/50 text-xs tracking-widest uppercase">Swipe up to unlock</span>
                 </div>
            </MotionDiv>
        ) : (
            <MotionDiv 
                key="auth"
                initial={{ opacity: 0, y: 100 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/40 backdrop-blur-xl"
            >
                <div className="w-full max-w-xs flex flex-col items-center">
                    {/* User Profile */}
                    <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-xl mb-4 overflow-hidden relative">
                        {scanningFace ? (
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                        ) : (
                             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover" />
                        )}
                        {scanningFace && (
                            <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-pulse opacity-50"/>
                        )}
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-8">Welcome Back</h2>

                    {/* PIN Dots */}
                    <div className={`flex gap-4 mb-8 ${authError ? 'animate-shake' : ''}`}>
                        {[0, 1, 2, 3].map(i => (
                            <div key={i} className={`w-3 h-3 rounded-full border border-white transition-all ${pin.length > i ? 'bg-white' : 'bg-transparent'}`} />
                        ))}
                    </div>

                    {/* Numpad */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                            <button 
                                key={n}
                                onClick={() => setPin(p => p.length < 4 ? p + n : p)}
                                className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-2xl font-light text-white transition-colors border border-white/5"
                            >
                                {n}
                            </button>
                        ))}
                        <button onClick={() => setShowAuth(false)} className="w-16 h-16 flex items-center justify-center text-white/70 hover:text-white">Cancel</button>
                        <button 
                             onClick={() => setPin(p => p.length < 4 ? p + '0' : p)}
                             className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-2xl font-light text-white transition-colors border border-white/5"
                        >
                            0
                        </button>
                        <button onClick={() => setPin(p => p.slice(0, -1))} className="w-16 h-16 flex items-center justify-center text-white/70 hover:text-white">
                            <X size={24}/>
                        </button>
                    </div>

                    {/* Auth Methods */}
                    <div className="flex gap-8">
                         <button onClick={startFaceScan} className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors">
                             <ScanFace size={24}/>
                             <span className="text-xs">Face ID</span>
                         </button>
                    </div>
                </div>
            </MotionDiv>
        )}
      </AnimatePresence>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};
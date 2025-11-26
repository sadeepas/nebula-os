import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Bluetooth, Moon, Sun, Volume2, Monitor } from 'lucide-react';
import { useOS } from '../../context/OSContext';

const MotionDiv = motion.div as any;

export const ControlCenter: React.FC = () => {
  const { 
    isWifiOn, toggleWifi, 
    isBluetoothOn, toggleBluetooth, 
    isNightMode, toggleNightMode,
    brightness, setBrightness,
    volume, setVolume
  } = useOS();

  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-14 md:bottom-16 right-2 md:right-4 w-[calc(100vw-1rem)] md:w-80 bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-2xl p-4 border border-white/20 shadow-2xl z-[10000]"
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button 
          onClick={toggleWifi}
          className={`flex flex-col p-3 rounded-xl transition-all ${isWifiOn ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}
        >
          <Wifi size={20} className="mb-2" />
          <span className="text-xs font-medium">Wi-Fi</span>
          <span className="text-[10px] opacity-70">{isWifiOn ? 'Connected' : 'Off'}</span>
        </button>
        
        <button 
          onClick={toggleBluetooth}
          className={`flex flex-col p-3 rounded-xl transition-all ${isBluetoothOn ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}
        >
          <Bluetooth size={20} className="mb-2" />
          <span className="text-xs font-medium">Bluetooth</span>
          <span className="text-[10px] opacity-70">{isBluetoothOn ? 'On' : 'Off'}</span>
        </button>

        <button 
          onClick={toggleNightMode}
          className={`flex flex-col p-3 rounded-xl transition-all ${isNightMode ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}
        >
          {isNightMode ? <Moon size={20} className="mb-2" /> : <Sun size={20} className="mb-2" />}
          <span className="text-xs font-medium">Night Mode</span>
          <span className="text-[10px] opacity-70">{isNightMode ? 'On' : 'Off'}</span>
        </button>

        <button 
           className="flex flex-col p-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
        >
          <Monitor size={20} className="mb-2" />
          <span className="text-xs font-medium">Cast</span>
          <span className="text-[10px] opacity-70">Searching...</span>
        </button>
      </div>

      <div className="space-y-4 p-3 bg-white/50 dark:bg-black/20 rounded-xl">
        <div className="space-y-1">
           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
               <Sun size={14} />
               <span className="text-xs font-medium">Brightness</span>
           </div>
           <input 
              type="range" 
              min="0" 
              max="100" 
              value={brightness} 
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
        </div>
        
        <div className="space-y-1">
           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
               <Volume2 size={14} />
               <span className="text-xs font-medium">Sound</span>
           </div>
           <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume} 
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
        </div>
      </div>
    </MotionDiv>
  );
};
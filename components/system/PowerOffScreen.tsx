import React from 'react';
import { Power } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { SystemState } from '../../types';

export const PowerOffScreen: React.FC = () => {
    const { setSystemState } = useOS();
    
    return (
        <div className="absolute inset-0 bg-black z-[10000] flex flex-col items-center justify-center text-white">
            <button 
                onClick={() => setSystemState(SystemState.BOOT)}
                className="group flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity"
            >
                <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center group-hover:border-white group-hover:bg-white/10">
                    <Power size={32} />
                </div>
                <span className="text-sm font-light tracking-widest">TURN ON</span>
            </button>
        </div>
    );
};
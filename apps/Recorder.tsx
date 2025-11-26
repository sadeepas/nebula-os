import React from 'react';
import { Mic } from 'lucide-react';

export const RecorderApp: React.FC = () => {
    return (
        <div className="flex h-full bg-black text-white flex-col items-center justify-center relative overflow-hidden">
            {/* Visualizer Background */}
            <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-30">
                {Array.from({length: 40}).map((_, i) => (
                    <div key={i} className="w-2 bg-red-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s` }} />
                ))}
            </div>
            
            <div className="z-10 text-center">
                <div className="text-6xl font-thin font-mono mb-2">00:00:00</div>
                <div className="text-gray-400 mb-12">Ready to record</div>
                
                <button className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform group">
                    <div className="w-16 h-16 bg-red-500 rounded-full group-hover:bg-red-600 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                </button>
            </div>
        </div>
    );
}
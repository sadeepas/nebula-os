import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Mic, Scissors, Volume2 } from 'lucide-react';

export const SoundEditorApp: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-200">
        {/* Toolbar */}
        <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium"><Mic size={14}/> Record</button>
            <div className="w-[1px] h-6 bg-gray-700"/>
            <button className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white"><Scissors size={18}/></button>
            <button className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white"><Volume2 size={18}/></button>
        </div>

        {/* Waveform Area */}
        <div className="flex-1 bg-black relative overflow-hidden flex items-center">
            <div className="w-full h-32 flex items-center gap-[2px] px-4 opacity-80">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="flex-1 bg-green-500 rounded-full transition-all duration-300 hover:bg-green-400"
                        style={{ height: `${20 + Math.random() * 80}%` }}
                    />
                ))}
            </div>
            <div className="absolute left-1/3 top-0 bottom-0 w-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <div className="absolute top-2 right-2 text-xs font-mono text-green-500">00:01:24.05</div>
        </div>

        {/* Transport */}
        <div className="h-16 bg-gray-800 border-t border-gray-700 flex items-center justify-center gap-6">
             <button className="text-gray-400 hover:text-white"><SkipBack size={20}/></button>
             <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"><Play size={20} fill="currentColor" className="ml-1"/></button>
             <button className="text-gray-400 hover:text-white"><SkipForward size={20}/></button>
        </div>
    </div>
  );
};
import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Trash2 } from 'lucide-react';

export const ImageViewerApp: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000";

  return (
    <div className="flex flex-col h-full bg-black/90 text-white">
      <div className="h-12 flex items-center justify-center gap-4 bg-black/50 backdrop-blur border-b border-white/10 z-10">
         <button onClick={() => setScale(s => Math.max(0.5, s - 0.25))} className="p-2 hover:bg-white/10 rounded-full"><ZoomOut size={18}/></button>
         <span className="text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
         <button onClick={() => setScale(s => Math.min(3, s + 0.25))} className="p-2 hover:bg-white/10 rounded-full"><ZoomIn size={18}/></button>
         <div className="w-[1px] h-6 bg-white/20"/>
         <button onClick={() => setRotation(r => r + 90)} className="p-2 hover:bg-white/10 rounded-full"><RotateCw size={18}/></button>
      </div>
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
          <img 
            src={src} 
            alt="View" 
            style={{ transform: `scale(${scale}) rotate(${rotation}deg)`, transition: 'transform 0.2s' }}
            className="max-w-full max-h-full object-contain shadow-2xl"
          />
      </div>
    </div>
  );
};
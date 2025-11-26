import React, { useState } from 'react';
import { Sliders, Layers, Download, Move, Crop, Sun, Contrast } from 'lucide-react';

export const ImageEditorApp: React.FC = () => {
  const [filter, setFilter] = useState({ brightness: 100, contrast: 100, saturate: 100 });
  const [activeTab, setActiveTab] = useState<'adjust' | 'filters'>('adjust');

  const filterString = `brightness(${filter.brightness}%) contrast(${filter.contrast}%) saturate(${filter.saturate}%)`;

  return (
    <div className="flex h-full bg-gray-900 text-white">
      {/* Sidebar Controls */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
         <div className="p-4 border-b border-gray-700 font-semibold">Tools</div>
         <div className="flex-1 overflow-y-auto p-4 space-y-6">
             <div>
                 <div className="text-xs uppercase text-gray-500 font-bold mb-3 tracking-wider">Adjustments</div>
                 <div className="space-y-4">
                     <div className="space-y-1">
                         <div className="flex justify-between text-xs">
                             <span className="flex items-center gap-1"><Sun size={10}/> Brightness</span>
                             <span>{filter.brightness}%</span>
                         </div>
                         <input type="range" min="0" max="200" value={filter.brightness} onChange={e => setFilter({...filter, brightness: Number(e.target.value)})} className="w-full accent-blue-500" />
                     </div>
                     <div className="space-y-1">
                         <div className="flex justify-between text-xs">
                             <span className="flex items-center gap-1"><Contrast size={10}/> Contrast</span>
                             <span>{filter.contrast}%</span>
                         </div>
                         <input type="range" min="0" max="200" value={filter.contrast} onChange={e => setFilter({...filter, contrast: Number(e.target.value)})} className="w-full accent-blue-500" />
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center p-8 overflow-hidden relative">
          <div className="relative shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" 
                alt="Editing" 
                style={{ filter: filterString }}
                className="max-h-[500px] object-contain bg-black/50" 
              />
          </div>
      </div>
    </div>
  );
};
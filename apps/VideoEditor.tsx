import React from 'react';
import { Play, SkipBack, Scissors, Layers, Plus, Film } from 'lucide-react';

export const VideoEditorApp: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-300">
        <div className="flex-1 flex overflow-hidden">
             {/* Preview */}
             <div className="flex-1 bg-black flex items-center justify-center relative border-r border-gray-800">
                 <Film size={48} className="text-gray-700" />
                 <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                     <button className="text-white hover:text-blue-400"><SkipBack/></button>
                     <button className="text-white hover:text-blue-400"><Play fill="currentColor"/></button>
                 </div>
             </div>
             {/* Assets */}
             <div className="w-64 bg-gray-800 p-4 border-l border-gray-700">
                 <h3 className="text-xs font-bold uppercase text-gray-500 mb-4">Media Bin</h3>
                 <div className="grid grid-cols-2 gap-2">
                     {[1,2,3,4].map(i => (
                         <div key={i} className="aspect-video bg-gray-700 rounded text-xs flex items-center justify-center hover:bg-gray-600 cursor-grab">Clip {i}</div>
                     ))}
                     <div className="aspect-video border-2 border-dashed border-gray-600 rounded flex items-center justify-center hover:border-gray-500 cursor-pointer">
                         <Plus size={20}/>
                     </div>
                 </div>
             </div>
        </div>
        
        {/* Timeline */}
        <div className="h-48 bg-gray-800 border-t border-gray-700 flex flex-col">
            <div className="h-8 border-b border-gray-700 flex items-center px-2 gap-2 bg-gray-800">
                <Scissors size={14} className="cursor-pointer hover:text-white"/>
                <div className="w-[1px] h-4 bg-gray-600"/>
                <span className="text-xs font-mono">00:00:15:00</span>
            </div>
            <div className="flex-1 relative overflow-x-auto p-2 bg-gray-900">
                <div className="flex gap-1 h-8 mb-1">
                    <div className="w-24 bg-blue-900/50 rounded text-xs p-1 border border-blue-800">Video 1</div>
                    <div className="w-48 bg-blue-600 rounded text-xs p-1 text-white truncate">Clip_Beach_001.mp4</div>
                    <div className="w-32 bg-blue-600 rounded text-xs p-1 text-white truncate">Clip_City_002.mp4</div>
                </div>
                <div className="flex gap-1 h-8">
                    <div className="w-24 bg-green-900/50 rounded text-xs p-1 border border-green-800">Audio 1</div>
                    <div className="w-64 bg-green-600 rounded text-xs p-1 text-white truncate">Background_Music.mp3</div>
                </div>
                {/* Playhead */}
                <div className="absolute top-0 bottom-0 left-48 w-[1px] bg-red-500 z-10">
                    <div className="w-3 h-3 bg-red-500 transform -translate-x-1.5 rotate-45 -mt-1.5"/>
                </div>
            </div>
        </div>
    </div>
  );
};
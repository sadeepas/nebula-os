import React from 'react';
import { Play, SkipBack, SkipForward, Maximize2, Volume2 } from 'lucide-react';

export const MediaPlayerApp: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-black text-white">
        <div className="flex-1 bg-black flex items-center justify-center relative group">
            <video 
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                className="w-full h-full object-contain"
                controls={false}
                autoPlay
                muted
                loop
            />
            
            {/* Overlay Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full bg-gray-700 h-1 rounded-full mb-4 cursor-pointer overflow-hidden">
                    <div className="bg-red-600 w-1/3 h-full"/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button className="hover:text-red-500"><SkipBack size={24}/></button>
                        <button className="hover:text-red-500"><Play size={32} fill="currentColor"/></button>
                        <button className="hover:text-red-500"><SkipForward size={24}/></button>
                        <div className="flex items-center gap-2 ml-4 group/vol">
                            <Volume2 size={20}/>
                            <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                                <div className="w-20 h-1 bg-gray-500 rounded-full ml-2">
                                    <div className="bg-white w-2/3 h-full"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Big Buck Bunny</span>
                        <button><Maximize2 size={20}/></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
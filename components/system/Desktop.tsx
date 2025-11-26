import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Window } from './Window';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { ControlCenter } from './ControlCenter';
import { ContextMenu } from './ContextMenu';
import { APPS } from '../../config/apps';
import { AnimatePresence } from 'framer-motion';

export const Desktop: React.FC = () => {
  const { currentWallpaper, windows, launchApp, isNightMode, createFolder, createFile } = useOS();
  const [startOpen, setStartOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  
  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);

  const handleBackgroundClick = () => {
    setStartOpen(false);
    setControlCenterOpen(false);
    setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden bg-cover bg-center transition-all duration-700 ease-in-out ${isNightMode ? 'brightness-75' : 'brightness-100'}`}
      style={{ backgroundImage: `url(${currentWallpaper})` }}
      onClick={handleBackgroundClick}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Grid Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 w-24 z-10">
         {['assistant', 'explorer', 'browser', 'games', 'terminal'].map(id => {
             const app = APPS[id];
             if(!app) return null;
             return (
                 <div 
                    key={id} 
                    className="flex flex-col items-center gap-1 group cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors"
                    onDoubleClick={() => launchApp(id)}
                    onClick={(e) => e.stopPropagation()} // Prevent desktop click
                >
                     <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl shadow-lg group-hover:scale-105 transition-transform border border-white/10">
                        <app.icon size={28} className="text-white drop-shadow-md" />
                     </div>
                     <span className="text-white text-xs font-medium drop-shadow-md text-center bg-black/20 rounded px-2 py-0.5">{app.name}</span>
                 </div>
             )
         })}
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0">
        {windows.map(windowState => {
          const app = APPS[windowState.appId];
          return (
            <div key={windowState.id} className="pointer-events-auto">
              <Window windowState={windowState} app={app} />
            </div>
          );
        })}
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
        {controlCenterOpen && <ControlCenter />}
      </AnimatePresence>
      
      {contextMenu && (
          <ContextMenu 
            x={contextMenu.x} 
            y={contextMenu.y} 
            onClose={() => setContextMenu(null)}
            onRefresh={() => window.location.reload()}
            onNewFolder={() => { createFolder('desktop', 'New Folder'); setContextMenu(null); }}
            onNewFile={() => { createFile('desktop', 'New Text Document.txt'); setContextMenu(null); }}
            onPersonalize={() => { launchApp('settings'); setContextMenu(null); }}
            onOpenTerminal={() => { launchApp('terminal'); setContextMenu(null); }}
          />
      )}

      <Taskbar 
        onToggleStart={() => { setStartOpen(!startOpen); setControlCenterOpen(false); }} 
        startOpen={startOpen}
        onToggleControlCenter={() => { setControlCenterOpen(!controlCenterOpen); setStartOpen(false); }}
        controlCenterOpen={controlCenterOpen}
      />
    </div>
  );
};
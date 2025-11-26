import React from 'react';
import { useOS } from '../../context/OSContext';
import { APPS } from '../../config/apps';
import { Grid, Wifi, Volume2, Battery, Search, Keyboard, ChevronUp } from 'lucide-react';

interface TaskbarProps {
    onToggleStart: () => void;
    startOpen: boolean;
    onToggleControlCenter: () => void;
    controlCenterOpen: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({ onToggleStart, startOpen, onToggleControlCenter, controlCenterOpen }) => {
  const { launchApp, windows, activeWindowId, focusWindow, minimizeWindow, isWifiOn, volume, isNightMode, toggleKeyboard, pinnedAppIds } = useOS();

  // Combine pinned apps and currently open apps into a unique list
  const openAppIds = windows.map(w => w.appId);
  const taskbarAppIds = Array.from(new Set([...pinnedAppIds, ...openAppIds]));

  const handleAppClick = (appId: string) => {
    // Check if app is already open
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized || activeWindowId !== existingWindow.id) {
        focusWindow(existingWindow.id);
      } else {
        minimizeWindow(existingWindow.id);
      }
    } else {
      launchApp(appId);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 md:h-14 bg-white/50 dark:bg-black/50 backdrop-blur-3xl border-t border-white/10 flex justify-between items-center px-2 md:px-4 z-[9999] transition-all">
      
      {/* Left Widget Area (Hidden on Mobile) */}
      <div className="w-0 md:w-48 hidden md:flex items-center gap-2">
          {/* Could put weather widget here like Win11 */}
      </div>

      {/* Center App Dock */}
      <div className="flex-1 md:flex-none flex items-center justify-center gap-1 md:gap-2 h-full overflow-x-auto no-scrollbar mask-gradient">
        {/* Start Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleStart(); }}
          className={`p-2 rounded-lg transition-all hover:bg-white/10 active:scale-95 group ${startOpen ? 'bg-white/10' : ''} shrink-0`}
          title="Start"
        >
          <Grid size={24} className="text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400 transition-transform group-hover:scale-110" />
        </button>

        {/* Search Button (Hidden on very small screens if needed, but keeping for now) */}
        <button 
           className="p-2 rounded-lg transition-all hover:bg-white/10 active:scale-95 group shrink-0 hidden sm:block"
           onClick={(e) => { e.stopPropagation(); onToggleStart(); /* Usually opens start with search focus */ }}
           title="Search"
        >
             <Search size={22} className="text-gray-700 dark:text-gray-200" />
        </button>

        <div className="w-[1px] h-6 bg-gray-400/30 mx-1 hidden sm:block" />

        {/* Apps */}
        {taskbarAppIds.map((appId) => {
          const app = APPS[appId];
          if (!app) return null;
          
          const isOpen = windows.some(w => w.appId === app.id);
          const isActive = windows.find(w => w.appId === app.id)?.id === activeWindowId;

          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className={`group relative p-2 rounded-lg transition-all hover:bg-white/10 active:scale-95 flex flex-col items-center justify-center h-10 w-10 shrink-0 ${isActive ? 'bg-white/5' : ''}`}
              title={app.name}
            >
              <app.icon 
                  size={24} 
                  className={`${isActive ? 'text-blue-500' : 'text-gray-700 dark:text-gray-200'} drop-shadow-sm transition-transform group-hover:-translate-y-1`} 
              />
              
              {isOpen && (
                <div className={`absolute bottom-0.5 w-1 h-1 rounded-full ${isActive ? 'bg-blue-500 w-4' : 'bg-gray-400'} transition-all duration-300`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Right System Tray */}
      <div className="flex items-center gap-1 md:gap-2 h-full py-1.5 shrink-0">
          
          {/* Hidden Icons Toggle */}
          <button className="p-1 rounded hover:bg-white/10 text-gray-700 dark:text-gray-300 hidden sm:block">
              <ChevronUp size={16} />
          </button>

          {/* Keyboard Toggle */}
          <button 
             onClick={toggleKeyboard}
             className="p-1.5 rounded hover:bg-white/10 text-gray-700 dark:text-gray-300 hidden sm:block"
             title="Touch Keyboard"
          >
              <Keyboard size={20} />
          </button>

          {/* Combined Status Indicators */}
          <button 
              onClick={(e) => { e.stopPropagation(); onToggleControlCenter(); }}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all hover:bg-white/10 ${controlCenterOpen ? 'bg-white/10' : ''}`}
          >
              <div className="flex gap-2 text-gray-800 dark:text-gray-200">
                  {isWifiOn ? <Wifi size={16} /> : <Wifi size={16} className="opacity-50" />}
                  {volume === 0 ? <Volume2 size={16} className="opacity-50" /> : <Volume2 size={16} />}
                  <Battery size={16} />
              </div>
          </button>

          {/* Clock */}
          <div 
             className="flex flex-col items-end px-2 py-1 rounded-lg hover:bg-white/10 cursor-default text-right"
             onClick={(e) => { e.stopPropagation(); /* Could toggle calendar */ }}
          >
               <span className="text-xs font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                   {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
               </span>
               <span className="text-[10px] text-gray-600 dark:text-gray-400 hidden sm:block whitespace-nowrap">
                   {new Date().toLocaleDateString()}
               </span>
          </div>
          
          {/* Show Desktop Sliver */}
          <div 
            className="w-1.5 h-full border-l border-gray-300 dark:border-gray-600 ml-1 hover:bg-white/20 cursor-pointer hidden sm:block"
            title="Show Desktop"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', metaKey: true }))}
          />
      </div>
    </div>
  );
};
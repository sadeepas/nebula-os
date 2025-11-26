import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Power, Search, User, LogOut, RefreshCw, Moon, Disc } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { APPS } from '../../config/apps';

interface StartMenuProps {
  onClose: () => void;
}

const MotionDiv = motion.div as any;

export const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const { launchApp, shutdown, restart, sleep } = useOS();
  const [showPowerMenu, setShowPowerMenu] = useState(false);

  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
      animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
      exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-0 md:bottom-16 left-0 right-0 md:left-1/2 md:right-auto md:w-[640px] h-[90vh] md:h-[600px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-t-2xl md:rounded-2xl border-t md:border border-white/20 shadow-2xl z-[10000] flex flex-col overflow-hidden origin-bottom"
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
        {/* Search Bar */}
        <div className="p-6 pb-2 shrink-0">
            <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Search for apps, settings, and documents" 
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500/50 rounded-full py-3 pl-12 pr-4 text-gray-800 dark:text-gray-100 placeholder-gray-500 outline-none transition-all" 
                    autoFocus
                />
            </div>
        </div>

        {/* Pinned Section */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Pinned</h3>
                <button className="text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">All apps &gt;</button>
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-2">
                {Object.values(APPS).map(app => (
                    <button 
                        key={app.id} 
                        onClick={() => { launchApp(app.id); onClose(); }}
                        className="flex flex-col items-center gap-2 group p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200">
                            <app.icon size={24} className="text-gray-700 dark:text-gray-200" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full text-center">{app.name}</span>
                    </button>
                ))}
            </div>

            <div className="mt-8 mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recommended</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                     { name: 'Project Alpha.txt', sub: 'Yesterday at 4:20 PM' },
                     { name: 'Meeting Notes', sub: '2h ago' },
                     { name: 'Budget 2024', sub: 'Last week' },
                     { name: 'Vacation Photos', sub: 'Just now' }
                 ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer">
                         <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                             <span className="font-bold text-xs">DOC</span>
                         </div>
                         <div className="flex flex-col text-left">
                             <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                             <span className="text-xs text-gray-500">{item.sub}</span>
                         </div>
                     </div>
                 ))}
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 flex items-center justify-between relative shrink-0">
             <div className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 cursor-pointer transition-colors">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                     <User size={16} />
                 </div>
                 <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</span>
             </div>
             
             {/* Power Menu Button */}
             <div className="relative">
                 <button 
                    onClick={() => setShowPowerMenu(!showPowerMenu)}
                    className={`p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 ${showPowerMenu ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
                 >
                     <Power size={20} />
                 </button>

                 {/* Power Options Popover */}
                 {showPowerMenu && (
                     <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1 overflow-hidden">
                         <button onClick={sleep} className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                             <Moon size={16} /> Sleep
                         </button>
                         <button onClick={shutdown} className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                             <LogOut size={16} /> Shut down
                         </button>
                         <button onClick={restart} className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                             <RefreshCw size={16} /> Restart
                         </button>
                         <div className="h-[1px] bg-gray-200 dark:bg-gray-700 my-1"/>
                         <button onClick={sleep} className="w-full text-left px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
                             <Disc size={16} /> Hibernate
                         </button>
                     </div>
                 )}
             </div>
        </div>
    </MotionDiv>
  );
};
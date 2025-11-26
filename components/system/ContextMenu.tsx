import React from 'react';
import { RefreshCw, FolderPlus, FilePlus, Monitor, Terminal, Layout } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
  onNewFolder: () => void;
  onNewFile: () => void;
  onPersonalize: () => void;
  onOpenTerminal: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ 
  x, y, onClose, onRefresh, onNewFolder, onNewFile, onPersonalize, onOpenTerminal 
}) => {
  // Prevent menu from going off-screen
  const menuWidth = 200;
  const menuHeight = 250;
  
  const posX = x + menuWidth > window.innerWidth ? x - menuWidth : x;
  const posY = y + menuHeight > window.innerHeight ? y - menuHeight : y;

  React.useEffect(() => {
    const handleClick = () => onClose();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [onClose]);

  return (
    <div 
      className="fixed w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-1 z-[99999]"
      style={{ top: posY, left: posX }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="px-1">
        <button onClick={onRefresh} className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white rounded flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <RefreshCw size={14} /> Refresh
        </button>
      </div>
      <div className="h-[1px] bg-gray-200 dark:bg-gray-700 my-1" />
      <div className="px-1">
        <button onClick={onNewFolder} className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white rounded flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <FolderPlus size={14} /> New Folder
        </button>
        <button onClick={onNewFile} className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white rounded flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <FilePlus size={14} /> New Text Doc
        </button>
      </div>
      <div className="h-[1px] bg-gray-200 dark:bg-gray-700 my-1" />
      <div className="px-1">
        <button onClick={onOpenTerminal} className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white rounded flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <Terminal size={14} /> Open Terminal
        </button>
      </div>
      <div className="h-[1px] bg-gray-200 dark:bg-gray-700 my-1" />
      <div className="px-1">
        <button onClick={onPersonalize} className="w-full text-left px-3 py-1.5 hover:bg-blue-500 hover:text-white rounded flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <Layout size={14} /> Personalize
        </button>
      </div>
    </div>
  );
};
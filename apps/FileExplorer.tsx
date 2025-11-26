import React, { useState } from 'react';
import { useOS } from '../context/OSContext';
import { Folder, FileText, Image as ImageIcon, ChevronRight, ArrowLeft, Home, HardDrive, FolderPlus, FilePlus } from 'lucide-react';

export const FileExplorerApp: React.FC = () => {
  const { fs, createFolder, createFile } = useOS();
  const [currentPath, setCurrentPath] = useState<string[]>(['root']);

  const currentFolderId = currentPath[currentPath.length - 1];
  const currentFolder = fs[currentFolderId];

  const handleNavigate = (id: string) => {
    if (fs[id].type === 'folder') {
      setCurrentPath([...currentPath, id]);
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const getIcon = (type: string, name: string) => {
    if (type === 'folder') return <Folder size={48} className="text-yellow-400 mb-2" fill="currentColor" fillOpacity={0.8} />;
    if (name.endsWith('.jpg') || name.endsWith('.png')) return <ImageIcon size={48} className="text-purple-500 mb-2" />;
    return <FileText size={48} className="text-blue-400 mb-2" />;
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Ribbon Toolbar */}
      <div className="flex items-center gap-1 p-1 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => createFolder(currentFolderId, 'New Folder')}
            className="flex flex-col items-center px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs gap-1"
          >
              <FolderPlus size={20} className="text-gray-600 dark:text-gray-300"/>
              <span>New folder</span>
          </button>
          <button 
             onClick={() => createFile(currentFolderId, 'New Text Document.txt')}
             className="flex flex-col items-center px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs gap-1"
          >
              <FilePlus size={20} className="text-gray-600 dark:text-gray-300"/>
              <span>New Item</span>
          </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <button onClick={handleBack} disabled={currentPath.length <= 1} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1 flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm">
           <HardDrive size={14} className="text-gray-400" />
           <ChevronRight size={14} className="text-gray-400" />
           {currentPath.map((id, idx) => (
             <React.Fragment key={id}>
                {idx > 0 && <ChevronRight size={12} className="text-gray-400" />}
                <span className="hover:bg-gray-200 dark:hover:bg-gray-700 px-1 rounded cursor-pointer" onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))}>
                    {fs[id].name}
                </span>
             </React.Fragment>
           ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
         {/* Sidebar */}
         <div className="w-48 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-1">
            <button onClick={() => setCurrentPath(['root'])} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
                <Home size={16} /> Home
            </button>
            <button onClick={() => setCurrentPath(['root', 'desktop'])} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
                <Folder size={16} className="text-blue-400" /> Desktop
            </button>
            <button onClick={() => setCurrentPath(['root', 'docs'])} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
                <Folder size={16} className="text-yellow-400" /> Documents
            </button>
            <button onClick={() => setCurrentPath(['root', 'photos'])} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">
                <Folder size={16} className="text-purple-400" /> Photos
            </button>
         </div>

         {/* Grid View */}
         <div className="flex-1 p-4 overflow-y-auto" onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); /* Could add folder context menu here */ }}>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
               {currentFolder.children?.map(childId => {
                   const node = fs[childId];
                   if (!node) return null;
                   return (
                       <div 
                        key={childId} 
                        onDoubleClick={() => handleNavigate(childId)}
                        className="flex flex-col items-center p-4 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer border border-transparent hover:border-blue-100 dark:hover:border-blue-800/50 transition-colors"
                       >
                           {getIcon(node.type, node.name)}
                           <span className="text-xs text-center break-all select-none">{node.name}</span>
                       </div>
                   )
               })}
               {(!currentFolder.children || currentFolder.children.length === 0) && (
                   <div className="col-span-full flex flex-col items-center justify-center text-gray-400 mt-20">
                       <Folder size={48} className="opacity-20 mb-2" />
                       <span>Empty Folder</span>
                   </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};
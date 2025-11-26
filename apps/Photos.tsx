import React from 'react';
import { useOS } from '../context/OSContext';

export const PhotosApp: React.FC = () => {
  const { fs } = useOS();
  
  // Filter for images in the whole FS (simplified)
  const images = Object.values(fs).filter(node => 
      node.type === 'file' && (node.content?.startsWith('http') || node.name.includes('.jpg'))
  );

  return (
    <div className="h-full bg-black text-white flex flex-col">
       <div className="p-4 border-b border-gray-800">
           <h2 className="text-lg font-bold">Gallery</h2>
           <p className="text-xs text-gray-400">{images.length} Photos</p>
       </div>
       <div className="flex-1 p-4 overflow-y-auto">
           <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
               {images.map(img => (
                   <div key={img.id} className="aspect-square bg-gray-900 rounded-lg overflow-hidden group relative cursor-pointer">
                       {img.content && <img src={img.content} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                           <span className="text-xs font-medium truncate w-full">{img.name}</span>
                       </div>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};

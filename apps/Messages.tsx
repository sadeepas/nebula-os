import React from 'react';
import { Send, Image, Smile } from 'lucide-react';

export const MessagesApp: React.FC = () => {
    return (
        <div className="flex h-full bg-white dark:bg-gray-900">
             <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                 <div className="p-4 font-bold text-lg border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">Messages</div>
                 <div className="p-2">
                     <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                         <div className="flex justify-between mb-1">
                             <span className="font-bold text-sm dark:text-gray-100">Mom</span>
                             <span className="text-xs text-gray-500">9:41 AM</span>
                         </div>
                         <div className="text-xs text-gray-500 truncate">See you at dinner! ❤️</div>
                     </div>
                 </div>
             </div>
             <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
                 <div className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 font-bold dark:text-gray-100">Mom</div>
                 <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                     <div className="flex justify-end">
                         <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                             Hey, what time is dinner?
                         </div>
                     </div>
                     <div className="flex justify-start">
                         <div className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-2xl rounded-tl-sm max-w-xs">
                             Around 6pm! Don't be late!
                         </div>
                     </div>
                 </div>
                 <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
                     <button className="text-gray-400 hover:text-blue-500"><Image size={20}/></button>
                     <input type="text" placeholder="iMessage" className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 outline-none dark:text-gray-100" />
                     <button className="bg-blue-500 text-white p-2 rounded-full"><Send size={16}/></button>
                 </div>
             </div>
        </div>
    );
}
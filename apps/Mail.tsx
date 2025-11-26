import React from 'react';
import { Mail, Star, Trash2, Edit2, Search } from 'lucide-react';

export const MailApp: React.FC = () => {
  return (
    <div className="flex h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                    <Edit2 size={16}/> Compose
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                {['Inbox', 'Sent', 'Drafts', 'Trash'].map(folder => (
                    <div key={folder} className={`px-4 py-2 rounded-lg flex items-center gap-3 cursor-pointer ${folder === 'Inbox' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                        <Mail size={18}/> {folder}
                    </div>
                ))}
            </div>
        </div>
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-900">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                    <input type="text" placeholder="Search mail" className="w-full bg-gray-100 dark:bg-gray-800 pl-10 pr-4 py-2 rounded-lg text-sm outline-none"/>
                </div>
            </div>
            <div className="overflow-y-auto">
                {[1,2,3].map(i => (
                    <div key={i} className="p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold text-sm">John Doe</span>
                            <span className="text-xs text-gray-500">10:30 AM</span>
                        </div>
                        <div className="text-sm font-medium mb-1">Project Update</div>
                        <div className="text-xs text-gray-500 truncate">Hey, just checking in on the latest designs...</div>
                    </div>
                ))}
            </div>
        </div>
        <div className="flex-1 bg-white dark:bg-gray-900 p-8 flex flex-col items-center justify-center text-gray-400">
            <Mail size={64} className="mb-4 opacity-20"/>
            <p>Select an email to read</p>
        </div>
    </div>
  );
};
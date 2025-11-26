import React from 'react';
import { ChevronLeft, ChevronRight, Search, FileText } from 'lucide-react';

export const PDFReaderApp: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-200 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 p-2 border-b border-gray-300 dark:border-gray-700 flex items-center gap-4 shadow-sm z-10">
          <div className="flex items-center gap-2">
              <FileText className="text-red-500" size={20}/>
              <span className="font-semibold text-sm dark:text-gray-200">User Manual.pdf</span>
          </div>
          <div className="flex-1"/>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded p-1">
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><ChevronLeft size={18}/></button>
              <span className="text-xs px-2 dark:text-gray-300">1 / 12</span>
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"><ChevronRight size={18}/></button>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-600 dark:text-gray-400"><Search size={18}/></button>
      </div>
      <div className="flex-1 overflow-y-auto p-8 flex justify-center">
          <div className="bg-white w-[600px] min-h-[800px] shadow-lg p-12 text-gray-800 text-sm leading-relaxed">
              <h1 className="text-3xl font-bold mb-6 border-b pb-4">NebulaOS User Manual</h1>
              <h2 className="text-xl font-bold mb-2 text-blue-600">1. Getting Started</h2>
              <p className="mb-4">Welcome to NebulaOS, the next-generation web operating system. This guide will help you navigate the interface and utilize the powerful features included.</p>
              <h3 className="font-bold mb-1">1.1 The Desktop</h3>
              <p className="mb-4">The desktop is your primary workspace. You can arrange icons, change wallpapers, and access the main menu from the bottom taskbar.</p>
              <div className="bg-gray-100 p-4 border-l-4 border-blue-500 my-4 text-xs italic">
                  Note: Right-click functionality is simulated in this version.
              </div>
          </div>
      </div>
    </div>
  );
};
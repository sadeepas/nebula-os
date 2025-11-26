import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const CalendarApp: React.FC = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div className="flex h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/50">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 flex items-center justify-center gap-2 mb-6">
                <Plus size={18}/> New Event
            </button>
            <div className="mb-6">
                <div className="font-bold mb-2 text-lg">October 2024</div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {days.map(d => <div key={d} className="text-gray-400 py-1">{d.charAt(0)}</div>)}
                    {Array.from({length:31}).map((_,i) => (
                        <div key={i} className={`py-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer ${i===13 ? 'bg-blue-500 text-white rounded-full' : ''}`}>{i+1}</div>
                    ))}
                </div>
            </div>
        </div>
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h2 className="text-xl font-semibold">October 2024</h2>
                <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><ChevronLeft/></button>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><ChevronRight/></button>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-7 grid-rows-5 border-l border-t border-gray-200 dark:border-gray-800">
                {Array.from({length: 35}).map((_, i) => (
                    <div key={i} className="border-r border-b border-gray-200 dark:border-gray-800 p-2 min-h-[80px] hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <span className="text-sm text-gray-400">{i+1 <= 31 ? i+1 : ''}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
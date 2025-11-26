import React from 'react';
import { useOS } from '../context/OSContext';
import { Activity, XCircle, Cpu, HardDrive, Battery } from 'lucide-react';

export const TaskManagerApp: React.FC = () => {
  const { windows, closeWindow, systemHealth } = useOS();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
       <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
           <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-4">
               <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                   <Cpu size={24} />
               </div>
               <div>
                   <div className="text-2xl font-bold">{systemHealth.cpu.toFixed(0)}%</div>
                   <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">CPU Usage</div>
               </div>
           </div>
           <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30 flex items-center gap-4">
               <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                   <HardDrive size={24} />
               </div>
               <div>
                   <div className="text-2xl font-bold">{systemHealth.mem.toFixed(0)}%</div>
                   <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Memory</div>
               </div>
           </div>
           <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-green-100 dark:border-green-900/30 flex items-center gap-4">
               <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                   <Battery size={24} />
               </div>
               <div>
                   <div className="text-2xl font-bold">{systemHealth.battery.toFixed(0)}%</div>
                   <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Battery</div>
               </div>
           </div>
       </div>
       
       <div className="flex-1 overflow-auto">
           <table className="w-full text-left border-collapse">
               <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                   <tr>
                       <th className="p-3 text-xs font-semibold text-gray-500 uppercase">Task Name</th>
                       <th className="p-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                       <th className="p-3 text-xs font-semibold text-gray-500 uppercase">Memory</th>
                       <th className="p-3 text-xs font-semibold text-gray-500 uppercase text-right">Action</th>
                   </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                   {windows.map(win => (
                       <tr key={win.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                           <td className="p-3 font-medium">{win.title}</td>
                           <td className="p-3 text-green-500 text-sm">Running</td>
                           <td className="p-3 text-sm font-mono text-gray-500">{(Math.random() * 100 + 50).toFixed(1)} MB</td>
                           <td className="p-3 text-right">
                               <button 
                                onClick={() => closeWindow(win.id)}
                                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded transition-colors"
                               >
                                   <XCircle size={16} />
                               </button>
                           </td>
                       </tr>
                   ))}
                   {windows.length === 0 && (
                       <tr>
                           <td colSpan={4} className="p-8 text-center text-gray-400">No active applications</td>
                       </tr>
                   )}
               </tbody>
           </table>
       </div>
    </div>
  );
};
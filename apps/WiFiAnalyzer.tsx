import React, { useEffect, useState } from 'react';
import { Wifi, RefreshCw } from 'lucide-react';

export const WiFiAnalyzerApp: React.FC = () => {
  const [networks, setNetworks] = useState([
      { ssid: 'Home_Wifi_5G', ch: 36, dbm: -45, color: 'bg-green-500' },
      { ssid: 'Neighbor_Net', ch: 40, dbm: -70, color: 'bg-yellow-500' },
      { ssid: 'ISP_Setup_X', ch: 48, dbm: -85, color: 'bg-red-500' },
      { ssid: 'Guest_Access', ch: 11, dbm: -60, color: 'bg-blue-500' },
  ]);

  useEffect(() => {
      const i = setInterval(() => {
          setNetworks(prev => prev.map(n => ({ ...n, dbm: n.dbm + (Math.random() * 4 - 2) })));
      }, 1000);
      return () => clearInterval(i);
  }, []);

  return (
    <div className="flex flex-col h-full bg-black text-white p-4 font-mono">
       <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
           <h2 className="text-lg flex items-center gap-2"><Wifi className="text-green-400"/> Spectrum Analyzer</h2>
           <button className="p-2 hover:bg-gray-800 rounded"><RefreshCw size={16}/></button>
       </div>

       <div className="flex-1 relative border-l border-b border-gray-700 bg-gray-900/30">
           {/* Grid Lines */}
           {[...Array(5)].map((_, i) => (
               <div key={i} className="absolute left-0 w-full border-t border-gray-800 text-[10px] text-gray-600 pl-1" style={{ bottom: `${i * 20 + 20}%` }}>
                   -{100 - (i * 20)} dBm
               </div>
           ))}

           {/* Signals */}
           <div className="absolute inset-0 flex items-end justify-around px-8">
               {networks.map((net, i) => {
                   const height = Math.max(0, 100 + net.dbm); // -100dbm = 0 height
                   return (
                       <div key={i} className="flex flex-col items-center gap-2 group w-16">
                            <div 
                                className={`w-8 rounded-t-lg transition-all duration-500 opacity-80 group-hover:opacity-100 ${net.color}`} 
                                style={{ height: `${height}%` }}
                            />
                            <div className="text-center">
                                <div className="text-xs font-bold">{net.ssid}</div>
                                <div className="text-[10px] text-gray-400">Ch {net.ch}</div>
                                <div className="text-[10px] text-gray-500">{Math.round(net.dbm)} dBm</div>
                            </div>
                       </div>
                   );
               })}
           </div>
       </div>
    </div>
  );
};
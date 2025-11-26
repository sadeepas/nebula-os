import React, { useState } from 'react';
import { Shield, Globe, Lock, Power } from 'lucide-react';

export const VPNApp: React.FC = () => {
    const [connected, setConnected] = useState(false);
    
    return (
        <div className="flex h-full bg-slate-900 text-slate-100">
             <div className="w-64 bg-slate-800 p-4 border-r border-slate-700">
                 <div className="flex items-center gap-2 mb-8 text-blue-400">
                     <Shield size={24} fill="currentColor" />
                     <span className="font-bold text-lg">SecureNet VPN</span>
                 </div>
                 
                 <div className="space-y-2">
                     <div className="p-3 bg-slate-700 rounded-lg flex items-center justify-between cursor-pointer hover:bg-slate-600">
                         <div className="flex items-center gap-3">
                             <span className="text-xl">🇺🇸</span>
                             <div className="flex flex-col">
                                 <span className="text-sm font-medium">United States</span>
                                 <span className="text-[10px] text-green-400">Ping: 24ms</span>
                             </div>
                         </div>
                     </div>
                     <div className="p-3 bg-slate-900/50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-slate-700 border border-transparent hover:border-slate-600">
                         <div className="flex items-center gap-3">
                             <span className="text-xl">🇬🇧</span>
                             <div className="flex flex-col">
                                 <span className="text-sm font-medium">United Kingdom</span>
                                 <span className="text-[10px] text-gray-400">Ping: 89ms</span>
                             </div>
                         </div>
                     </div>
                     <div className="p-3 bg-slate-900/50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-slate-700 border border-transparent hover:border-slate-600">
                         <div className="flex items-center gap-3">
                             <span className="text-xl">🇯🇵</span>
                             <div className="flex flex-col">
                                 <span className="text-sm font-medium">Japan</span>
                                 <span className="text-[10px] text-gray-400">Ping: 140ms</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

             <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                 {/* Map Background Placeholder */}
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '20px 20px' }}/>
                 
                 <div className="relative z-10 flex flex-col items-center">
                     <button 
                        onClick={() => setConnected(!connected)}
                        className={`w-32 h-32 rounded-full border-8 flex items-center justify-center transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)] ${connected ? 'border-green-500 bg-green-900/20 shadow-green-500/20' : 'border-gray-600 bg-gray-800 hover:border-gray-500'}`}
                     >
                         <Power size={48} className={`transition-colors duration-500 ${connected ? 'text-green-500' : 'text-gray-400'}`} />
                     </button>
                     <h2 className="mt-8 text-2xl font-light tracking-wider">{connected ? 'PROTECTED' : 'DISCONNECTED'}</h2>
                     <p className="mt-2 text-sm text-gray-400">{connected ? 'Your IP: 104.22.45.11' : 'Your IP: Exposed'}</p>
                     
                     {connected && (
                         <div className="mt-8 flex gap-8">
                             <div className="text-center">
                                 <div className="text-xs text-gray-500 uppercase">Download</div>
                                 <div className="font-mono text-blue-400">45.2 MB/s</div>
                             </div>
                             <div className="w-[1px] bg-slate-700 h-8"/>
                             <div className="text-center">
                                 <div className="text-xs text-gray-500 uppercase">Upload</div>
                                 <div className="font-mono text-purple-400">12.8 MB/s</div>
                             </div>
                         </div>
                     )}
                 </div>
             </div>
        </div>
    );
};
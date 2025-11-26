import React, { useState } from 'react';
import { useOS } from '../context/OSContext';
import { 
  Monitor, Cpu, Wifi, Bluetooth, Moon, Battery, Shield, 
  Layout, MousePointer, Cloud, Layers, Smartphone, Search, 
  ChevronRight, ArrowLeft, RefreshCw, HardDrive, Info
} from 'lucide-react';

type Category = 'system' | 'hardware' | 'connectivity' | 'display' | 'notifications' | 'security' | 'power' | 'personalization' | 'apps' | 'about';

export const SettingsApp: React.FC = () => {
  const { 
      wallpapers, setWallpaper, currentWallpaper,
      isWifiOn, toggleWifi,
      isBluetoothOn, toggleBluetooth,
      isNightMode, toggleNightMode,
      brightness, setBrightness,
      systemHealth,
      taskbarSettings, toggleTaskbarSetting
  } = useOS();

  const [activeCategory, setActiveCategory] = useState<Category>('system');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: Category, label: string, icon: React.ElementType }[] = [
    { id: 'system', label: 'System Overview', icon: Info },
    { id: 'hardware', label: 'Hardware', icon: Cpu },
    { id: 'connectivity', label: 'Connectivity', icon: Wifi },
    { id: 'display', label: 'Display & UI', icon: Monitor },
    { id: 'personalization', label: 'Personalization', icon: Layers },
    { id: 'power', label: 'Power & Battery', icon: Battery },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const renderContent = () => {
      switch(activeCategory) {
          case 'system':
              return (
                  <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                          <h2 className="text-2xl font-bold mb-2">NebulaOS v2.4</h2>
                          <p className="opacity-90 mb-4">Your system is up to date and running smoothly.</p>
                          <div className="flex gap-3">
                              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md transition-colors">Check for Updates</button>
                              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md transition-colors">View Changelog</button>
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-2 mb-4 text-gray-500">
                                  <HardDrive size={20}/>
                                  <span className="text-sm font-bold uppercase">Storage</span>
                              </div>
                              <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                                  <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${systemHealth.storage}%` }}/>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <span>{systemHealth.storage}% Used</span>
                                  <span>1TB Total</span>
                              </div>
                          </div>
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                              <div className="flex items-center gap-2 mb-4 text-gray-500">
                                  <Cpu size={20}/>
                                  <span className="text-sm font-bold uppercase">Memory</span>
                              </div>
                              <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                                  <div className="absolute top-0 left-0 h-full bg-purple-500" style={{ width: `${systemHealth.mem}%` }}/>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                  <span>{systemHealth.mem.toFixed(1)}% Active</span>
                                  <span>32GB DDR5</span>
                              </div>
                          </div>
                      </div>
                  </div>
              );
          case 'display':
              return (
                  <div className="space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-6">Appearance</h3>
                          <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className={`p-2 rounded-lg ${isNightMode ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                          <Moon size={20}/>
                                      </div>
                                      <div>
                                          <div className="font-medium">Night Mode</div>
                                          <div className="text-xs text-gray-500">Reduces eye strain</div>
                                      </div>
                                  </div>
                                  <button onClick={toggleNightMode} className={`w-12 h-6 rounded-full p-1 transition-colors ${isNightMode ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isNightMode ? 'translate-x-6' : ''}`}/>
                                  </button>
                              </div>
                              
                              <div>
                                  <div className="flex justify-between mb-2">
                                      <span className="font-medium">Brightness</span>
                                      <span className="text-gray-500">{brightness}%</span>
                                  </div>
                                  <input type="range" min="0" max="100" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"/>
                              </div>
                          </div>
                      </div>
                  </div>
              );
          case 'connectivity':
              return (
                  <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                             <div className={`p-3 rounded-full ${isWifiOn ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                 <Wifi size={24}/>
                             </div>
                             <div>
                                 <h3 className="font-bold">Wi-Fi</h3>
                                 <p className="text-sm text-gray-500">{isWifiOn ? 'Connected to Home_5G' : 'Disconnected'}</p>
                             </div>
                         </div>
                         <button onClick={toggleWifi} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isWifiOn ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                             {isWifiOn ? 'Turn Off' : 'Turn On'}
                         </button>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                             <div className={`p-3 rounded-full ${isBluetoothOn ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                 <Bluetooth size={24}/>
                             </div>
                             <div>
                                 <h3 className="font-bold">Bluetooth</h3>
                                 <p className="text-sm text-gray-500">{isBluetoothOn ? 'Discoverable' : 'Off'}</p>
                             </div>
                         </div>
                         <button onClick={toggleBluetooth} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isBluetoothOn ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                             {isBluetoothOn ? 'Turn Off' : 'Turn On'}
                         </button>
                      </div>
                  </div>
              );
          case 'personalization':
              return (
                  <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                          {wallpapers.map((wp, i) => (
                              <div 
                                key={i} 
                                onClick={() => setWallpaper(wp)}
                                className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-4 transition-all ${currentWallpaper === wp ? 'border-blue-500 shadow-xl scale-[1.02]' : 'border-transparent hover:scale-[1.02]'}`}
                              >
                                  <img src={wp} className="w-full h-full object-cover"/>
                                  {currentWallpaper === wp && (
                                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Active</div>
                                      </div>
                                  )}
                              </div>
                          ))}
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                          <h3 className="text-lg font-semibold mb-4">Taskbar Items</h3>
                          <div className="space-y-3">
                              {Object.entries(taskbarSettings).map(([key, val]) => (
                                  <div key={key} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                                      <span className="capitalize text-sm font-medium">{key.replace('show', '')}</span>
                                      <button 
                                        onClick={() => toggleTaskbarSetting(key as any)}
                                        className={`w-10 h-6 rounded-full p-1 transition-colors ${val ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                                      >
                                          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${val ? 'translate-x-4' : ''}`}/>
                                      </button>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              );
          case 'hardware':
             return (
                 <div className="space-y-6">
                     <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                         <h3 className="font-bold mb-4 flex items-center gap-2"><Cpu size={20}/> Processor</h3>
                         <div className="h-40 flex items-end gap-1 pb-2 border-b border-gray-200 dark:border-gray-700">
                             {Array.from({length: 20}).map((_, i) => (
                                 <div 
                                    key={i} 
                                    className="flex-1 bg-blue-500/50 rounded-t" 
                                    style={{ height: `${20 + Math.random() * (systemHealth.cpu)}%`, transition: 'height 0.2s' }}
                                 />
                             ))}
                         </div>
                         <div className="mt-4 grid grid-cols-2 gap-4">
                             <div>
                                 <div className="text-xs text-gray-500 uppercase font-bold">Utilization</div>
                                 <div className="text-2xl font-mono">{systemHealth.cpu.toFixed(0)}%</div>
                             </div>
                             <div>
                                 <div className="text-xs text-gray-500 uppercase font-bold">Speed</div>
                                 <div className="text-2xl font-mono">3.20 GHz</div>
                             </div>
                         </div>
                     </div>
                 </div>
             );
          default:
              return (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Layers size={64} className="mb-4 opacity-20"/>
                      <p>Select a category to view settings</p>
                  </div>
              );
      }
  }

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
                <input 
                    type="text" 
                    placeholder="Find a setting" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-700 pl-10 pr-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {categories.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase())).map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'}`}
                >
                    <cat.icon size={18}/>
                    {cat.label}
                    {activeCategory === cat.id && <ChevronRight size={14} className="ml-auto opacity-50"/>}
                </button>
            ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                    OS
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">Nebula Account</div>
                    <div className="text-xs text-gray-500 truncate">admin@nebula.os</div>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">{categories.find(c => c.id === activeCategory)?.label}</h1>
                  <p className="text-gray-500">Manage your device preferences and system options.</p>
              </div>
              
              {/* AI Suggestion Banner */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-8 flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-300 shrink-0">
                      <RefreshCw size={20} className="animate-spin-slow" style={{ animationDuration: '3s' }}/>
                  </div>
                  <div>
                      <h4 className="font-bold text-sm text-blue-800 dark:text-blue-200 mb-1">AI Recommendation</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-300/80">Based on your usage, we recommend enabling <strong>Night Mode</strong> to reduce battery consumption by ~12%.</p>
                      <button onClick={toggleNightMode} className="mt-2 text-xs font-bold text-blue-700 hover:underline">Apply Change</button>
                  </div>
              </div>

              {renderContent()}
          </div>
      </div>
    </div>
  );
};
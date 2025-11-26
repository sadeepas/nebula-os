import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search, Home, Plus, X } from 'lucide-react';

interface Tab {
    id: number;
    title: string;
    url: string;
    displayUrl: string;
}

export const BrowserApp: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([{ id: 1, title: 'Google', url: 'https://www.google.com/search?igu=1', displayUrl: 'https://google.com' }]);
  const [activeTabId, setActiveTabId] = useState(1);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const updateTab = (id: number, updates: Partial<Tab>) => {
      setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const addTab = () => {
      const newId = Date.now();
      setTabs([...tabs, { id: newId, title: 'New Tab', url: 'https://www.google.com/search?igu=1', displayUrl: '' }]);
      setActiveTabId(newId);
  };

  const closeTab = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      if (tabs.length === 1) return; // Don't close last tab
      const newTabs = tabs.filter(t => t.id !== id);
      setTabs(newTabs);
      if (activeTabId === id) setActiveTabId(newTabs[newTabs.length - 1].id);
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = activeTab.displayUrl;
    if (!target.startsWith('http')) {
       // Check if it looks like a URL
       if(target.includes('.') && !target.includes(' ')) {
           target = `https://${target}`;
       } else {
           target = `https://www.google.com/search?igu=1&q=${encodeURIComponent(target)}`;
       }
    }
    // Note: Due to X-Frame-Options, most real sites won't load.
    // We update title based on domain
    const domain = new URL(target).hostname.replace('www.', '');
    updateTab(activeTabId, { url: target, displayUrl: target, title: domain });
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Tabs Bar */}
      <div className="flex items-center bg-gray-200 dark:bg-gray-800 pt-2 px-2 gap-1 overflow-x-auto">
          {tabs.map(tab => (
              <div 
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-t-lg min-w-[120px] max-w-[200px] text-xs cursor-pointer select-none transition-colors ${activeTabId === tab.id ? 'bg-white dark:bg-gray-900 shadow-sm' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
              >
                  <span className="truncate flex-1">{tab.title}</span>
                  <button onClick={(e) => closeTab(e, tab.id)} className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100">
                      <X size={12}/>
                  </button>
              </div>
          ))}
          <button onClick={addTab} className="p-1.5 hover:bg-gray-300 dark:hover:bg-gray-700 rounded mb-1">
              <Plus size={16}/>
          </button>
      </div>

      {/* Navbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><ArrowLeft size={16} /></button>
        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><ArrowRight size={16} /></button>
        <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><RotateCw size={16} /></button>
        
        <form onSubmit={handleNavigate} className="flex-1">
          <div className="relative group">
            <div className={`absolute inset-0 rounded-full transition-shadow ${activeTab.displayUrl ? 'group-focus-within:ring-2 ring-blue-500/20' : ''}`} />
            <input 
              type="text" 
              value={activeTab.displayUrl}
              onChange={(e) => updateTab(activeTabId, { displayUrl: e.target.value })}
              className="w-full pl-9 pr-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border-none text-sm focus:outline-none focus:bg-white dark:focus:bg-black transition-colors"
              placeholder="Search Google or type a URL"
            />
            <Search className="absolute left-3 top-2 text-gray-500" size={14} />
          </div>
        </form>
      </div>

      <div className="flex-1 relative bg-white">
         <iframe 
            src={activeTab.url} 
            className="w-full h-full border-none" 
            title={`Browser-${activeTab.id}`} 
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups" 
         />
      </div>
    </div>
  );
};
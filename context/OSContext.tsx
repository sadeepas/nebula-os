import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SystemState, WindowState, OSContextType, FileNode, TaskbarSettings, SystemHealth } from '../types';
import { WALLPAPERS, INITIAL_BOOT_DURATION } from '../constants';

// Initial File System Data
const INITIAL_FS: Record<string, FileNode> = {
  'root': { id: 'root', parentId: null, name: 'Root', type: 'folder', children: ['desktop', 'docs', 'photos', 'media'] },
  'desktop': { id: 'desktop', parentId: 'root', name: 'Desktop', type: 'folder', children: ['welcome-txt', 'todo-list'] },
  'docs': { id: 'docs', parentId: 'root', name: 'Documents', type: 'folder', children: ['project-plan', 'manual-pdf'] },
  'photos': { id: 'photos', parentId: 'root', name: 'Photos', type: 'folder', children: ['img1', 'img2', 'img3'] },
  'media': { id: 'media', parentId: 'root', name: 'Media', type: 'folder', children: ['video1', 'audio1'] },
  'welcome-txt': { id: 'welcome-txt', parentId: 'desktop', name: 'Welcome.txt', type: 'file', content: 'Welcome to NebulaOS! This is a web-based operating system simulation.' },
  'todo-list': { id: 'todo-list', parentId: 'desktop', name: 'Tasks.todo', type: 'file', content: '1. Explore Apps\n2. Try Paint\n3. Check WiFi' },
  'project-plan': { id: 'project-plan', parentId: 'docs', name: 'Project Alpha.txt', type: 'file', content: 'Phase 1: Design\nPhase 2: Develop\nPhase 3: Deploy' },
  'manual-pdf': { id: 'manual-pdf', parentId: 'docs', name: 'User Manual.pdf', type: 'file', content: 'NebulaOS User Manual\n\nChapter 1: Getting Started...' },
  'img1': { id: 'img1', parentId: 'photos', name: 'Mountain.jpg', type: 'file', content: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600' },
  'img2': { id: 'img2', parentId: 'photos', name: 'Ocean.jpg', type: 'file', content: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600' },
  'img3': { id: 'img3', parentId: 'photos', name: 'City.jpg', type: 'file', content: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600' },
  'video1': { id: 'video1', parentId: 'media', name: 'Demo.mp4', type: 'file', content: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  'audio1': { id: 'audio1', parentId: 'media', name: 'Music.mp3', type: 'file', content: 'dummy-audio-content' },
};

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systemState, setSystemState] = useState<SystemState>(SystemState.BOOT);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [currentWallpaper, setCurrentWallpaper] = useState(WALLPAPERS[0]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [previousWindowsState, setPreviousWindowsState] = useState<WindowState[] | null>(null);

  // System Toggles
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const [isNightMode, setIsNightMode] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(75);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // System Health Simulation
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu: 10,
    mem: 24,
    storage: 45,
    battery: 100,
    isCharging: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        cpu: Math.min(100, Math.max(2, prev.cpu + (Math.random() * 10 - 5))),
        mem: Math.min(100, Math.max(15, prev.mem + (Math.random() * 5 - 2.5))),
        battery: Math.max(0, prev.battery - (Math.random() * 0.05)) // Slow drain
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Settings
  const [taskbarSettings, setTaskbarSettings] = useState<TaskbarSettings>({
      showSearch: true,
      showWidgets: false,
      showChat: false
  });
  
  // Pinned Apps (Default: Explorer, Settings)
  const [pinnedAppIds] = useState<string[]>(['explorer', 'settings']);

  // File System
  const [fs, setFs] = useState<Record<string, FileNode>>(INITIAL_FS);

  // Global Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Win + D (Toggle Desktop)
        if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
            e.preventDefault();
            const allMinimized = windows.every(w => w.isMinimized);
            if (allMinimized) {
                restoreAll();
            } else {
                minimizeAll();
            }
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windows]);


  const launchApp = (appId: string) => {
    const id = `${appId}-${Date.now()}`;
    const isMobile = window.innerWidth < 768; // Simple mobile check
    
    // Calculate intelligent spawn position
    const offset = windows.length * 30;
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    
    const x = Math.min(50 + offset, maxX > 0 ? maxX : 0);
    const y = Math.min(50 + offset, maxY > 0 ? maxY : 0);

    const newWindow: WindowState = {
      id,
      appId,
      title: appId, 
      isMinimized: false,
      isMaximized: isMobile, // Default to maximized on mobile
      zIndex: nextZIndex,
      position: { x, y },
      size: { width: isMobile ? window.innerWidth : 900, height: isMobile ? window.innerHeight : 600 }
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(id);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => w.id === windowId ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const maximizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w));
    focusWindow(windowId);
  };

  const focusWindow = (windowId: string) => {
    setActiveWindowId(windowId);
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  };

  const resizeWindow = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, size: { width: Math.max(300, width), height: Math.max(200, height) } } : w));
  };

  const minimizeAll = () => {
    setPreviousWindowsState([...windows]);
    setWindows(prev => prev.map(w => ({ ...w, isMinimized: true })));
    setActiveWindowId(null);
  };

  const restoreAll = () => {
      // Restore from previous state logic or just unminimize all
      setWindows(prev => prev.map(w => ({ ...w, isMinimized: false })));
  };

  // File System Operations
  const createFolder = (parentId: string, name: string) => {
      const id = `folder-${Date.now()}`;
      const newNode: FileNode = { id, parentId, name, type: 'folder', children: [] };
      
      setFs(prev => {
          const parent = prev[parentId];
          return {
              ...prev,
              [id]: newNode,
              [parentId]: { ...parent, children: [...(parent.children || []), id] }
          };
      });
  };

  const createFile = (parentId: string, name: string, content: string = '') => {
      const id = `file-${Date.now()}`;
      const newNode: FileNode = { id, parentId, name, type: 'file', content };
      
      setFs(prev => {
          const parent = prev[parentId];
          return {
              ...prev,
              [id]: newNode,
              [parentId]: { ...parent, children: [...(parent.children || []), id] }
          };
      });
  };

  const deleteNode = (id: string) => {
      setFs(prev => {
          const node = prev[id];
          if (!node || !node.parentId) return prev; // Can't delete root
          
          const parent = prev[node.parentId];
          const newFs = { ...prev };
          delete newFs[id];
          newFs[node.parentId] = { ...parent, children: parent.children?.filter(c => c !== id) };
          return newFs;
      });
  };

  // Power Actions
  const shutdown = () => {
      setSystemState(SystemState.OFF);
      setWindows([]);
  };

  const restart = () => {
      setSystemState(SystemState.OFF);
      setWindows([]);
      setTimeout(() => setSystemState(SystemState.BOOT), 1000);
  };

  const sleep = () => {
      setSystemState(SystemState.LOCK);
  };

  const toggleTaskbarSetting = (key: keyof TaskbarSettings) => {
      setTaskbarSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <OSContext.Provider value={{
      systemState,
      setSystemState,
      windows,
      activeWindowId,
      launchApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updateWindowPosition,
      resizeWindow,
      minimizeAll,
      restoreAll,
      wallpapers: WALLPAPERS,
      currentWallpaper,
      setWallpaper: setCurrentWallpaper,
      isWifiOn, toggleWifi: () => setIsWifiOn(p => !p),
      isBluetoothOn, toggleBluetooth: () => setIsBluetoothOn(p => !p),
      isNightMode, toggleNightMode: () => setIsNightMode(p => !p),
      brightness, setBrightness,
      volume, setVolume,
      systemHealth,
      isKeyboardOpen, toggleKeyboard: () => setIsKeyboardOpen(p => !p),
      taskbarSettings, toggleTaskbarSetting,
      pinnedAppIds,
      fs, createFolder, createFile, deleteNode,
      shutdown, restart, sleep
    }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) throw new Error("useOS must be used within OSProvider");
  return context;
};
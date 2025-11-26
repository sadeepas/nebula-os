import { ReactNode } from 'react';

export enum SystemState {
  OFF = 'OFF',
  BOOT = 'BOOT',
  LOCK = 'LOCK',
  DESKTOP = 'DESKTOP'
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: React.ElementType;
  component: React.ComponentType<any>;
  defaultWidth?: number;
  defaultHeight?: number;
  canResize?: boolean;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface FileNode {
  id: string;
  parentId: string | null;
  name: string;
  type: 'file' | 'folder';
  content?: string; // For text files or image URLs
  children?: string[]; // IDs of children
}

export interface TaskbarSettings {
    showSearch: boolean;
    showWidgets: boolean;
    showChat: boolean;
}

export interface SystemHealth {
  cpu: number;
  mem: number;
  storage: number;
  battery: number;
  isCharging: boolean;
}

export interface OSContextType {
  systemState: SystemState;
  setSystemState: (state: SystemState) => void;
  windows: WindowState[];
  activeWindowId: string | null;
  launchApp: (appId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
  minimizeAll: () => void;
  restoreAll: () => void;
  
  wallpapers: string[];
  currentWallpaper: string;
  setWallpaper: (url: string) => void;
  
  // System Controls
  isWifiOn: boolean;
  toggleWifi: () => void;
  isBluetoothOn: boolean;
  toggleBluetooth: () => void;
  isNightMode: boolean;
  toggleNightMode: () => void;
  brightness: number;
  setBrightness: (val: number) => void;
  volume: number;
  setVolume: (val: number) => void;
  
  // System Health
  systemHealth: SystemHealth;

  // Keyboard
  isKeyboardOpen: boolean;
  toggleKeyboard: () => void;

  // Taskbar Settings
  taskbarSettings: TaskbarSettings;
  toggleTaskbarSetting: (key: keyof TaskbarSettings) => void;
  pinnedAppIds: string[];

  // File System
  fs: Record<string, FileNode>;
  createFolder: (parentId: string, name: string) => void;
  createFile: (parentId: string, name: string, content?: string) => void;
  deleteNode: (id: string) => void;
  
  // Power Actions
  shutdown: () => void;
  restart: () => void;
  sleep: () => void;
}
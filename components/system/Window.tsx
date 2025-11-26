import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import { WindowState, AppDefinition } from '../../types';

interface WindowProps {
  windowState: WindowState;
  app: AppDefinition;
}

const MotionDiv = motion.div as any;

export const Window: React.FC<WindowProps> = ({ windowState, app }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, resizeWindow } = useOS();
  const controls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  if (windowState.isMinimized) return null;

  const AppComp = app.component;

  const handleResize = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Capture pointer to track even if it leaves the window
    (e.target as Element).setPointerCapture(e.pointerId);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowState.size.width;
    const startHeight = windowState.size.height;

    const onPointerMove = (moveEvent: PointerEvent) => {
        const newWidth = startWidth + (moveEvent.clientX - startX);
        const newHeight = startHeight + (moveEvent.clientY - startY);
        resizeWindow(windowState.id, newWidth, newHeight);
    };

    const onPointerUp = (upEvent: PointerEvent) => {
        (e.target as Element).releasePointerCapture(upEvent.pointerId);
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  return (
    <MotionDiv
      drag={!windowState.isMaximized}
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0}
      dragListener={false} // Only drag from title bar
      onDragEnd={(_: any, info: any) => {
        updateWindowPosition(windowState.id, windowState.position.x + info.offset.x, windowState.position.y + info.offset.y);
      }}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: windowState.isMaximized ? 0 : windowState.position.y,
        x: windowState.isMaximized ? 0 : windowState.position.x,
        width: windowState.isMaximized ? '100vw' : windowState.size.width,
        height: windowState.isMaximized ? '100%' : windowState.size.height, // 100% height to account for mobile navbar
        borderRadius: windowState.isMaximized ? 0 : 12,
        top: windowState.isMaximized ? 0 : undefined,
        left: windowState.isMaximized ? 0 : undefined
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      style={{ 
        position: 'absolute', 
        zIndex: windowState.zIndex,
        // When NOT maximized, position is handled by 'x' and 'y' in animate props, 
        // but initial position helps avoid jump.
        // However, 'x' and 'y' in animate override this, so simple 'absolute' is fine.
      }}
      className="flex flex-col overflow-hidden shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-white/10"
      onMouseDown={() => focusWindow(windowState.id)}
      onTouchStart={() => focusWindow(windowState.id)}
      ref={windowRef}
    >
      {/* Title Bar */}
      <div 
        className="h-10 shrink-0 flex items-center justify-between px-3 bg-gray-100/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50 cursor-default select-none touch-none"
        onPointerDown={(e) => { 
            if(!windowState.isMaximized) controls.start(e); 
            focusWindow(windowState.id); 
        }}
        onDoubleClick={() => maximizeWindow(windowState.id)}
      >
        <div className="flex items-center gap-3 pl-1">
            <app.icon size={14} className="text-gray-600 dark:text-gray-300 opacity-80"/>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-200 tracking-wide">{windowState.title}</span>
        </div>
        
        <div className="flex items-center gap-1.5" onPointerDown={(e) => e.stopPropagation()}>
          <button 
            onClick={() => minimizeWindow(windowState.id)}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors group"
          >
            <Minus size={12} className="text-gray-500 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
          </button>
          <button 
            onClick={() => maximizeWindow(windowState.id)}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors group"
          >
            {windowState.isMaximized ? <Square size={10} className="text-gray-500 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" /> : <Maximize2 size={10} className="text-gray-500 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />}
          </button>
          <button 
            onClick={() => closeWindow(windowState.id)}
            className="p-1.5 hover:bg-red-500 rounded transition-colors group"
          >
            <X size={12} className="text-gray-500 group-hover:text-white dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative bg-white dark:bg-gray-900 pb-12 md:pb-0"> {/* padding bottom for taskbar overlap on mobile */}
        <AppComp windowId={windowState.id} />
      </div>

      {/* Resize Handle - Larger touch target */}
      {!windowState.isMaximized && (
          <div 
            className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize z-50 hover:bg-blue-500/20 flex items-end justify-end p-1 touch-none"
            onPointerDown={handleResize}
          >
              <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400"/>
          </div>
      )}
    </MotionDiv>
  );
};
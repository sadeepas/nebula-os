import React from 'react';
import { motion } from 'framer-motion';
import { X, Delete } from 'lucide-react';
import { useOS } from '../../context/OSContext';

const MotionDiv = motion.div as any;

export const VirtualKeyboard: React.FC = () => {
  const { isKeyboardOpen, toggleKeyboard } = useOS();

  if (!isKeyboardOpen) return null;

  const rows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ];

  return (
    <MotionDiv
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute bottom-0 left-0 right-0 h-72 bg-gray-200 dark:bg-gray-800 backdrop-blur-xl z-[99999] border-t border-gray-300 dark:border-gray-700 p-2 flex flex-col items-center shadow-2xl"
    >
      <div className="w-full flex justify-between items-center px-4 mb-2">
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Touch Keyboard</div>
          <button onClick={toggleKeyboard} className="p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full">
              <X size={18} className="text-gray-600 dark:text-gray-300"/>
          </button>
      </div>
      
      <div className="flex-1 w-full max-w-5xl flex flex-col gap-1 p-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 flex-1">
            {row.map(key => (
              <button 
                key={key}
                className="flex-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95 transition-all text-gray-800 dark:text-gray-100 font-medium text-lg capitalize"
              >
                {key}
              </button>
            ))}
             {rowIndex === 1 && <button className="w-20 bg-gray-300 dark:bg-gray-600 rounded-lg text-sm font-bold">Bksp</button>}
          </div>
        ))}
        <div className="flex justify-center gap-1 flex-1">
             <button className="w-24 bg-gray-300 dark:bg-gray-600 rounded-lg text-sm font-bold">Ctrl</button>
             <button className="w-24 bg-gray-300 dark:bg-gray-600 rounded-lg text-sm font-bold">Win</button>
             <button className="w-24 bg-gray-300 dark:bg-gray-600 rounded-lg text-sm font-bold">Alt</button>
             <button className="flex-[4] bg-white dark:bg-gray-700 rounded-lg shadow-sm"></button>
             <button className="w-24 bg-gray-300 dark:bg-gray-600 rounded-lg text-sm font-bold">Alt</button>
             <button className="w-24 bg-gray-300 dark:bg-gray-600 rounded-lg text-sm font-bold">Fn</button>
             <button className="w-24 bg-gray-300 dark:bg-gray-600 rounded-lg text-sm font-bold">Ctrl</button>
        </div>
      </div>
    </MotionDiv>
  );
};
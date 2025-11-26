import React, { useState } from 'react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  
  const buttons = [
    'C', '±', '%', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  const handlePress = (btn: string) => {
      if (btn === 'C') setDisplay('0');
      else if (btn === '=') setDisplay('Error'); // Mock logic
      else setDisplay(prev => prev === '0' ? btn : prev + btn);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4">
        <div className="flex-1 flex items-end justify-end text-6xl font-light mb-6 truncate">
            {display}
        </div>
        <div className="grid grid-cols-4 gap-3">
            {buttons.map(btn => (
                <button 
                    key={btn}
                    onClick={() => handlePress(btn)}
                    className={`h-16 rounded-full text-xl font-medium transition-colors ${
                        ['÷','×','-','+','='].includes(btn) ? 'bg-orange-500 hover:bg-orange-400' :
                        ['C','±','%'].includes(btn) ? 'bg-gray-600 hover:bg-gray-500' :
                        'bg-gray-800 hover:bg-gray-700'
                    } ${btn === '0' ? 'col-span-2' : ''}`}
                >
                    {btn}
                </button>
            ))}
        </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Phone, Delete } from 'lucide-react';

export const PhoneApp: React.FC = () => {
    const [number, setNumber] = useState('');
    const pads = ['1','2','3','4','5','6','7','8','9','*','0','#'];

    return (
        <div className="flex h-full bg-white dark:bg-gray-900 flex-col items-center justify-center pb-8">
            <div className="text-3xl font-light mb-8 h-10 text-gray-900 dark:text-gray-100">{number}</div>
            <div className="grid grid-cols-3 gap-6 mb-8">
                {pads.map(p => (
                    <button 
                        key={p} 
                        onClick={() => setNumber(n => n + p)}
                        className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-2xl font-medium flex items-center justify-center transition-colors text-gray-900 dark:text-gray-100"
                    >
                        {p}
                    </button>
                ))}
            </div>
            <div className="flex gap-8 items-center">
                 <div className="w-16" /> 
                 <button className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 shadow-lg shadow-green-500/30">
                     <Phone size={28} fill="currentColor"/>
                 </button>
                 <button onClick={() => setNumber(n => n.slice(0,-1))} className="w-16 flex justify-center text-gray-400 hover:text-gray-600">
                     <Delete size={24}/>
                 </button>
            </div>
        </div>
    );
}
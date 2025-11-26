import React from 'react';
import { User, Phone, Mail, Star } from 'lucide-react';

export const ContactsApp: React.FC = () => {
    return (
        <div className="flex h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 font-bold text-xl">Contacts</div>
                <div className="flex-1 overflow-y-auto">
                    {['Alex Smith', 'John Doe', 'Sarah Connor'].map((name, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                {name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-medium">{name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
                 <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-6">
                     <User size={64} className="text-gray-400"/>
                 </div>
                 <h2 className="text-2xl font-bold mb-2">Alex Smith</h2>
                 <p className="text-gray-500 mb-8">Software Engineer</p>
                 <div className="flex gap-4">
                     <button className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600"><Phone/></button>
                     <button className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600"><Mail/></button>
                     <button className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600"><Star/></button>
                 </div>
            </div>
        </div>
    );
}
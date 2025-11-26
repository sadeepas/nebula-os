import React from 'react';
import { Search, Download, Star } from 'lucide-react';

export const StoreApp: React.FC = () => {
    return (
        <div className="flex h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex-col">
            <div className="p-4 flex items-center gap-4 bg-white dark:bg-gray-800 shadow-sm z-10">
                <h1 className="text-xl font-bold">App Store</h1>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 flex items-center gap-2">
                    <Search size={18} className="text-gray-400"/>
                    <input type="text" placeholder="Search apps, games, themes..." className="bg-transparent outline-none w-full text-sm"/>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
                <div className="h-64 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 mb-8 flex items-center p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">Featured: Nebula Pro</h2>
                        <p className="mb-4 text-blue-100">Unlock your full potential with the pro suite.</p>
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold">Get Started</button>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white/10 skew-x-12 transform translate-x-20"/>
                </div>

                <h3 className="font-bold text-lg mb-4">Top Free Apps</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1,2,3,4,5,6,7,8].map(i => (
                        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-700 mb-4"/>
                            <div className="font-bold text-sm mb-1">App Name {i}</div>
                            <div className="text-xs text-gray-500 mb-3">Productivity</div>
                            <div className="flex justify-between items-center">
                                <button className="bg-gray-100 dark:bg-gray-700 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Get</button>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400">4.5 <Star size={8} fill="currentColor"/></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
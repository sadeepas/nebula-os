import React from 'react';
import { Navigation, MapPin, Layers } from 'lucide-react';

export const MapsApp: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-100 relative">
        <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=-122.42,37.77,-122.40,37.79&layer=mapnik"
            className="flex-1 opacity-90"
        />
        <div className="absolute top-4 left-4 right-4 h-12 bg-white rounded-lg shadow-lg flex items-center px-4 gap-4 z-10">
            <MapPin className="text-red-500"/>
            <input type="text" placeholder="Search Google Maps..." className="flex-1 outline-none text-gray-700"/>
            <div className="w-[1px] h-6 bg-gray-200"/>
            <Navigation className="text-blue-500 cursor-pointer"/>
        </div>
        <div className="absolute bottom-6 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50"><Layers size={20}/></button>
            <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 font-bold">+</button>
            <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 font-bold">-</button>
        </div>
    </div>
  );
};
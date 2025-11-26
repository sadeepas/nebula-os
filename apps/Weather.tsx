import React from 'react';
import { CloudRain, Sun, Wind, Droplets } from 'lucide-react';

export const WeatherApp: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-400 to-blue-600 text-white p-8">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-4xl font-bold">San Francisco</h1>
                <p className="text-blue-100">Monday, 14th Oct</p>
            </div>
            <Sun size={48} className="text-yellow-300 animate-spin-slow" />
        </div>
        
        <div className="mt-12">
            <div className="text-8xl font-thin tracking-tighter">72°</div>
            <div className="text-xl font-medium text-blue-100">Partly Cloudy</div>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-4 bg-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="text-center">
                <Wind className="mx-auto mb-2 opacity-80" size={20}/>
                <div className="font-bold">8 mph</div>
                <div className="text-xs opacity-60">Wind</div>
            </div>
            <div className="text-center border-l border-white/10 border-r">
                <Droplets className="mx-auto mb-2 opacity-80" size={20}/>
                <div className="font-bold">42%</div>
                <div className="text-xs opacity-60">Humidity</div>
            </div>
            <div className="text-center">
                <CloudRain className="mx-auto mb-2 opacity-80" size={20}/>
                <div className="font-bold">12%</div>
                <div className="text-xs opacity-60">Rain</div>
            </div>
        </div>
    </div>
  );
};
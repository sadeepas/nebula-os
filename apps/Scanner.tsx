import React, { useEffect, useRef, useState } from 'react';
import { Camera, ScanLine, FileCheck } from 'lucide-react';

export const ScannerApp: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            if (videoRef.current) videoRef.current.srcObject = stream;
        }).catch(e => console.error(e));
    }, []);

    return (
        <div className="flex flex-col h-full bg-black text-white relative">
            {!scanned ? (
                <>
                    <div className="flex-1 relative overflow-hidden">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-80" />
                        {/* Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-80 border-2 border-blue-400 rounded-lg relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] animate-[scan_2s_linear_infinite]" />
                                <div className="absolute top-0 left-0 border-t-4 border-l-4 border-blue-500 w-8 h-8 -mt-1 -ml-1"/>
                                <div className="absolute top-0 right-0 border-t-4 border-r-4 border-blue-500 w-8 h-8 -mt-1 -mr-1"/>
                                <div className="absolute bottom-0 left-0 border-b-4 border-l-4 border-blue-500 w-8 h-8 -mb-1 -ml-1"/>
                                <div className="absolute bottom-0 right-0 border-b-4 border-r-4 border-blue-500 w-8 h-8 -mb-1 -mr-1"/>
                            </div>
                        </div>
                        <div className="absolute bottom-10 w-full text-center">
                            <p className="text-sm font-medium bg-black/50 inline-block px-3 py-1 rounded">Position document in frame</p>
                        </div>
                    </div>
                    <div className="h-24 bg-black flex items-center justify-center">
                        <button onClick={() => setScanned(true)} className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center hover:scale-105 transition-transform">
                            <div className="w-12 h-12 bg-blue-600 rounded-full" />
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 p-8 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                        <FileCheck size={32} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Scan Complete</h2>
                    <p className="text-gray-400 mb-6">Document successfully captured and converted to PDF.</p>
                    <button onClick={() => setScanned(false)} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium">Scan Another</button>
                </div>
            )}
            <style>{`@keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }`}</style>
        </div>
    );
};
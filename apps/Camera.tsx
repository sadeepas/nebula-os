import React, { useRef, useEffect, useState } from 'react';
import { Camera as CameraIcon, Video, AlertCircle } from 'lucide-react';

export const CameraApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Could not access camera. Please allow permissions.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full bg-black relative">
      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center text-white p-4 text-center">
            <AlertCircle size={48} className="text-red-500 mb-2" />
            <p>{error}</p>
        </div>
      ) : (
        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
             <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="h-full w-full object-cover transform scale-x-[-1]"
            />
        </div>
      )}
      
      {/* Controls Overlay */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8">
        <button className="p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
            <Video className="text-white" size={24} />
        </button>
        <button className="p-1 rounded-full border-4 border-white bg-transparent hover:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-full bg-white"></div>
        </button>
         <button className="p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
            <CameraIcon className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};

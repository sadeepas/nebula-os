import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pencil, MousePointer, Download, Circle, Square, Type } from 'lucide-react';

export const PaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'rect' | 'circle'>('pencil');
  const [lineWidth, setLineWidth] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
        canvas.width = canvas.parentElement?.clientWidth || 800;
        canvas.height = canvas.parentElement?.clientHeight || 600;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
  }, []);

  const startDraw = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'pencil' || tool === 'eraser') {
        ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    }
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800">
      <div className="p-2 bg-gray-200 dark:bg-gray-700 flex items-center gap-4 border-b border-gray-300 dark:border-gray-600">
        <div className="flex gap-1">
            <button onClick={() => setTool('pencil')} className={`p-2 rounded ${tool === 'pencil' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}><Pencil size={18} /></button>
            <button onClick={() => setTool('eraser')} className={`p-2 rounded ${tool === 'eraser' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}><Eraser size={18} /></button>
        </div>
        <div className="w-[1px] h-6 bg-gray-400" />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-none" />
        <div className="flex items-center gap-2">
            <span className="text-xs">Size:</span>
            <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} className="w-24" />
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative bg-gray-500">
        <canvas 
            ref={canvasRef}
            className="cursor-crosshair bg-white shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
        />
      </div>
    </div>
  );
};
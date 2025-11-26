import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Play, Trophy, Users, Cloud, ArrowLeft } from 'lucide-react';

export const GamesApp: React.FC = () => {
  const [view, setView] = useState<'hub' | 'snake'>('hub');

  // Snake Game State
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState({ x: 0, y: 0 }); // Stopped initially
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const games = [
    { id: 'snake', title: 'Classic Snake', genre: 'Arcade', img: 'https://images.unsplash.com/photo-1628277613967-6ab581452565?auto=format&fit=crop&q=80&w=400' },
    { id: 1, title: 'Cyber Racer 2077', genre: 'Racing', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'Space Odyssey', genre: 'Adventure', img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&q=80&w=400' },
  ];

  // Snake Logic
  useEffect(() => {
    if (view !== 'snake' || gameOver) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const gameLoop = setInterval(() => {
        setSnake(prev => {
            if (dir.x === 0 && dir.y === 0) return prev;
            
            const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
            
            // Wall Collision
            if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 20) {
                setGameOver(true);
                return prev;
            }
            // Self Collision
            if (prev.some(s => s.x === head.x && s.y === head.y)) {
                setGameOver(true);
                return prev;
            }

            const newSnake = [head, ...prev];
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10);
                setFood({ x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 20) });
            } else {
                newSnake.pop();
            }
            return newSnake;
        });
    }, 100);

    const handleKey = (e: KeyboardEvent) => {
        switch(e.key) {
            case 'ArrowUp': if(dir.y !== 1) setDir({x: 0, y: -1}); break;
            case 'ArrowDown': if(dir.y !== -1) setDir({x: 0, y: 1}); break;
            case 'ArrowLeft': if(dir.x !== 1) setDir({x: -1, y: 0}); break;
            case 'ArrowRight': if(dir.x !== -1) setDir({x: 1, y: 0}); break;
        }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
        clearInterval(gameLoop);
        window.removeEventListener('keydown', handleKey);
    };
  }, [view, dir, food, gameOver]);

  // Render Snake
  useEffect(() => {
      if (view !== 'snake') return;
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      
      // Clear
      ctx.fillStyle = '#1f2937'; // gray-800
      ctx.fillRect(0, 0, 600, 400);

      // Snake
      ctx.fillStyle = '#4ade80'; // green-400
      snake.forEach(s => ctx.fillRect(s.x * 20, s.y * 20, 18, 18));

      // Food
      ctx.fillStyle = '#f87171'; // red-400
      ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
  }, [snake, food, view]);

  const startGame = () => {
      setSnake([{ x: 10, y: 10 }]);
      setDir({ x: 1, y: 0 });
      setScore(0);
      setGameOver(false);
      setView('snake');
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {view === 'hub' ? (
          <>
            <div className="p-6 bg-gradient-to-b from-purple-900 to-gray-900">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Gamepad2 className="text-purple-400" size={32} /> 
                    Games Hub
                </h1>
                <p className="text-purple-200 mt-2">Cloud Gaming & Library</p>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Cloud size={20}/> Play Instantly</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {games.map((game, i) => (
                        <div 
                            key={i} 
                            onClick={game.id === 'snake' ? startGame : undefined}
                            className="bg-gray-800 rounded-xl overflow-hidden group cursor-pointer border border-gray-700 hover:border-purple-500 transition-all"
                        >
                            <div className="h-32 bg-gray-700 relative">
                                <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Play className="fill-white" size={32} />
                                </div>
                            </div>
                            <div className="p-3">
                                <h3 className="font-bold text-sm">{game.title}</h3>
                                <p className="text-xs text-gray-400">{game.genre}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </>
      ) : (
          <div className="flex flex-col h-full items-center justify-center bg-gray-950">
              <div className="w-full max-w-[600px] mb-4 flex justify-between items-center">
                  <button onClick={() => setView('hub')} className="flex items-center gap-2 text-gray-400 hover:text-white">
                      <ArrowLeft /> Back to Hub
                  </button>
                  <div className="text-xl font-bold text-green-400">Score: {score}</div>
              </div>
              <div className="relative border-4 border-gray-700 rounded-lg overflow-hidden">
                  <canvas ref={canvasRef} width={600} height={400} />
                  {gameOver && (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
                          <h2 className="text-4xl font-bold text-red-500 mb-4">GAME OVER</h2>
                          <button onClick={startGame} className="px-6 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400">Try Again</button>
                      </div>
                  )}
              </div>
              <p className="mt-4 text-gray-500 text-sm">Use Arrow Keys to move</p>
          </div>
      )}
    </div>
  );
};
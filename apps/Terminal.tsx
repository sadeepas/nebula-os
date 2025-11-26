import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '../context/OSContext';

export const TerminalApp: React.FC = () => {
  const { fs, createFolder, createFile, deleteNode } = useOS();
  const [history, setHistory] = useState<string[]>(['Welcome to NebulaOS Terminal v2.0.0', 'Type "help" for commands.']);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>(['root']);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const getPathString = (path: string[]) => {
      if (path.length === 1) return '/';
      return '/' + path.slice(1).map(id => fs[id]?.name || id).join('/');
  };

  const resolvePath = (pathStr: string): string[] | null => {
      if (pathStr === '/') return ['root'];
      if (pathStr === '..') return currentPath.length > 1 ? currentPath.slice(0, -1) : ['root'];
      if (pathStr === '.') return currentPath;
      
      // Simple logic for single level child
      const currentDir = fs[currentPath[currentPath.length - 1]];
      const childId = currentDir.children?.find(cid => fs[cid].name === pathStr);
      if (childId) return [...currentPath, childId];
      
      return null;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdLine = input.trim();
    const [cmd, ...args] = cmdLine.split(' ');
    setHistory(prev => [...prev, `user@nebula:${getPathString(currentPath)}$ ${cmdLine}`]);
    setInput('');

    const currentDirId = currentPath[currentPath.length - 1];

    switch (cmd) {
        case 'clear':
            setHistory([]);
            break;
        case 'help':
            setHistory(prev => [...prev, 'Available commands: help, clear, ls, cd [dir], mkdir [name], touch [name], rm [name], pwd, cat [file], whoami, date']);
            break;
        case 'pwd':
            setHistory(prev => [...prev, getPathString(currentPath)]);
            break;
        case 'whoami':
            setHistory(prev => [...prev, 'root']);
            break;
        case 'date':
             setHistory(prev => [...prev, new Date().toString()]);
             break;
        case 'ls':
            const dir = fs[currentDirId];
            if (dir.children && dir.children.length > 0) {
                const items = dir.children.map(cid => {
                    const item = fs[cid];
                    return item.type === 'folder' ? `[${item.name}]` : item.name;
                }).join('  ');
                setHistory(prev => [...prev, items]);
            } else {
                setHistory(prev => [...prev, '(empty)']);
            }
            break;
        case 'cd':
            if (!args[0]) {
                setCurrentPath(['root']);
            } else {
                const newPath = resolvePath(args[0]);
                if (newPath) {
                    if (fs[newPath[newPath.length - 1]].type === 'folder') {
                        setCurrentPath(newPath);
                    } else {
                        setHistory(prev => [...prev, `bash: cd: ${args[0]}: Not a directory`]);
                    }
                } else {
                    setHistory(prev => [...prev, `bash: cd: ${args[0]}: No such file or directory`]);
                }
            }
            break;
        case 'mkdir':
            if (args[0]) {
                createFolder(currentDirId, args[0]);
                setHistory(prev => [...prev, `Created directory: ${args[0]}`]);
            } else {
                setHistory(prev => [...prev, 'usage: mkdir [directory name]']);
            }
            break;
        case 'touch':
            if (args[0]) {
                createFile(currentDirId, args[0]);
                setHistory(prev => [...prev, `Created file: ${args[0]}`]);
            } else {
                setHistory(prev => [...prev, 'usage: touch [filename]']);
            }
            break;
        case 'rm':
            if (args[0]) {
                const targetId = fs[currentDirId].children?.find(cid => fs[cid].name === args[0]);
                if (targetId) {
                    deleteNode(targetId);
                    setHistory(prev => [...prev, `Removed: ${args[0]}`]);
                } else {
                    setHistory(prev => [...prev, `rm: cannot remove '${args[0]}': No such file or directory`]);
                }
            } else {
                setHistory(prev => [...prev, 'usage: rm [filename]']);
            }
            break;
        case 'cat':
             if (args[0]) {
                const targetId = fs[currentDirId].children?.find(cid => fs[cid].name === args[0]);
                if (targetId && fs[targetId].type === 'file') {
                    setHistory(prev => [...prev, fs[targetId].content || '(empty)']);
                } else {
                    setHistory(prev => [...prev, `cat: ${args[0]}: No such file`]);
                }
             }
             break;
        default:
            setHistory(prev => [...prev, `bash: ${cmd}: command not found`]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/95 text-green-400 font-mono p-4 text-sm overflow-hidden backdrop-blur-md">
      <div className="flex-1 overflow-y-auto space-y-1">
        {history.map((line, i) => (
          <div key={i} className="break-words whitespace-pre-wrap">{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
        <span className="text-blue-400">user@nebula:{getPathString(currentPath)}$</span>
        <input 
          autoFocus
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0 p-0"
        />
      </form>
    </div>
  );
};
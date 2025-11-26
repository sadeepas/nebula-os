import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus } from 'lucide-react';

export const TodoApp: React.FC = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Review project specs', done: false },
        { id: 2, text: 'Email marketing team', done: true },
        { id: 3, text: 'Update system software', done: false },
    ]);
    const [input, setInput] = useState('');

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if(!input.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
        setInput('');
    }

    return (
        <div className="flex h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex-col">
            <div className="p-6 bg-blue-600 text-white">
                <h1 className="text-2xl font-bold mb-1">My Tasks</h1>
                <p className="opacity-80 text-sm">{tasks.filter(t => !t.done).length} remaining</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {tasks.map(task => (
                    <div 
                        key={task.id} 
                        onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${task.done ? 'bg-gray-50 dark:bg-gray-800/50 border-transparent opacity-50' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
                    >
                        {task.done ? <CheckCircle2 className="text-green-500"/> : <Circle className="text-gray-400"/>}
                        <span className={task.done ? 'line-through' : ''}>{task.text}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={addTask} className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a task..." 
                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 outline-none"
                />
                <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus size={20}/>
                </button>
            </form>
        </div>
    );
}
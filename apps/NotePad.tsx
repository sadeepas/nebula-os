import React, { useState } from 'react';
import { Save, Wand2 } from 'lucide-react';
import { generateText } from '../services/gemini';
import { Button } from '../components/ui/Button';

export const NotepadApp: React.FC = () => {
  const [content, setContent] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiRefine = async () => {
    if (!content.trim()) return;
    setIsAiLoading(true);
    try {
      const refined = await generateText(`Rewrite the following text to be more professional and clear, keeping the same meaning:\n\n${content}`);
      if (refined) setContent(refined);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-yellow-50 text-gray-800">
      <div className="flex items-center justify-between p-2 border-b border-yellow-200 bg-yellow-100">
        <div className="font-semibold text-sm text-yellow-800">Notes</div>
        <div className="flex gap-2">
          <button 
            onClick={handleAiRefine}
            disabled={isAiLoading}
            className="p-1.5 hover:bg-yellow-200 rounded text-yellow-800 flex items-center gap-1 text-xs font-medium transition-colors"
          >
            <Wand2 size={14} />
            {isAiLoading ? 'Improving...' : 'AI Refine'}
          </button>
          <button className="p-1.5 hover:bg-yellow-200 rounded text-yellow-800">
            <Save size={16} />
          </button>
        </div>
      </div>
      <textarea 
        className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none font-sans text-base leading-relaxed"
        placeholder="Type your notes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

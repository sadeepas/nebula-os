import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return ai;
};

export const generateText = async (prompt: string, modelName: string = 'gemini-2.5-flash') => {
  try {
    const client = getAI();
    const response = await client.models.generateContent({
      model: modelName,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I encountered an error processing your request. Please check your API key.";
  }
};

export const generateChatResponse = async (history: { role: string, parts: { text: string }[] }[], newMessage: string) => {
    try {
        const client = getAI();
        const chat = client.chats.create({
            model: 'gemini-2.5-flash',
            history: history.map(h => ({
                role: h.role,
                parts: h.parts
            }))
        });
        
        const response = await chat.sendMessage({ message: newMessage });
        return response.text;
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        throw error;
    }
}

import React, { useState, useRef, useEffect } from 'react';
import { chatWithBot } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hola, soy la IA de César Quevedo Marketing Agency. ¿En qué te ayudo con tu contenido?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Convert format for API
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const response = await chatWithBot(history, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response || 'Error...' }]);
    setLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 z-40 bg-black text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 origin-bottom-right transform flex flex-col ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8 pointer-events-none'}`} style={{ height: '500px', maxHeight: '80vh' }}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-4 rounded-t-2xl flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center font-bold text-xs">AI</div>
             <div>
                <h3 className="font-bold text-sm">Asistente Virtual</h3>
                <span className="text-[10px] text-gray-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                </span>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                 <div className="flex space-x-1">
                   <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                   <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 rounded-b-2xl">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe una pregunta rápida..."
              className="w-full pl-4 pr-10 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
            <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-2 p-1.5 bg-brand-primary text-white rounded-lg disabled:opacity-50 hover:bg-black transition-colors"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
               </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
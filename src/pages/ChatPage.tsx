import React, { useEffect, useState, useRef } from 'react';
import { Send } from 'lucide-react';
const ChatPage = () => {
  const [messages, setMessages] = useState([{
    id: 1,
    text: "Hi there! I'm your Onco X assistant. How can I help you today?",
    sender: 'ai',
    timestamp: new Date()
  }]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Mock responses
  const mockResponses = ["Based on the symptoms you've described, it's important to consult with a healthcare professional for a proper evaluation.", 'Regular screenings are an important part of early cancer detection. The type and frequency of screenings depend on various factors including age, gender, and family history.', 'While certain symptoms may be concerning, many can also be caused by less serious conditions. A proper medical evaluation is the best way to determine the cause.', 'Maintaining a healthy lifestyle with regular exercise, balanced diet, limited alcohol consumption, and avoiding tobacco products can help reduce cancer risk.'];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    // Simulate AI typing
    setIsTyping(true);
    // Simulate AI response after delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiResponse = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  return <div className="flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-120px)]">
      <div className="bg-white rounded-t-2xl shadow-sm border border-gray-100 p-4">
        <h1 className="text-xl font-bold">Ask Me Anything</h1>
        <p className="text-gray-600 text-sm">
          I can answer questions about your symptoms, cancer information, or
          health concerns
        </p>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map(message => <div key={message.id} className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-3 ${message.sender === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 rounded-tl-none'}`}>
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                </p>
              </div>
            </div>)}
          {isTyping && <div className="mb-4 flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                animationDelay: '0.2s'
              }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                animationDelay: '0.4s'
              }}></div>
                </div>
              </div>
            </div>}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type your message here..." className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <button type="submit" disabled={!newMessage.trim() || isTyping} className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition disabled:bg-purple-400">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>;
};
export default ChatPage;
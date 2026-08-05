import React, { useState, useRef, useEffect } from 'react';
import { Send, ShoppingBag, SendHorizontal, Bot, MessageSquare } from 'lucide-react';
import { getBotReply } from '../mockData';

function ChatSection({ chats, setChats, currentChatId, setCurrentChatId }) {
  const [activeChatId, setActiveChatId] = useState(currentChatId || (chats[0]?.id || null));
  const [typedMessage, setTypedMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Sync state if changed externally (e.g. buyer triggers "Написать сообщение" inside detail cards)
  useEffect(() => {
    if (currentChatId) {
      setActiveChatId(currentChatId);
    }
  }, [currentChatId]);

  const activeChat = chats.find(c => c.id === activeChatId);

  // Auto scroll down to newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeChat) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: typedMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...activeChat.messages, userMsg];

    // Update active chat's messages list
    const updatedChats = chats.map(c => {
      if (c.id === activeChat.id) {
        return { ...c, messages: updatedMessages };
      }
      return c;
    });
    setChats(updatedChats);
    const sentText = typedMessage;
    setTypedMessage('');

    // Trigger simulation bot auto-reply after 1.5 seconds delay
    setTimeout(() => {
      const replyText = getBotReply(activeChat.productTitle, sentText);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'seller',
        text: replyText,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };

      const finalChats = updatedChats.map(c => {
        if (c.id === activeChat.id) {
          return { ...c, messages: [...updatedMessages, botMsg] };
        }
        return c;
      });
      setChats(finalChats);
    }, 1500);
  };

  return (
    <div className="flex h-full bg-slate-50" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Left Chat Threads List Panel */}
      <div className="w-1/3 border-r border-slate-200 bg-white flex flex-col h-full">
        <div className="p-3 border-b border-slate-200">
          <h2 className="font-extrabold text-base text-slate-800 flex items-center gap-1.5">
            <MessageSquare className="w-5 h-5 text-[#00B2FF]" />
            Сообщения
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {chats.map(chat => {
            const lastMsg = chat.messages[chat.messages.length - 1];
            const isActive = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  if (setCurrentChatId) setCurrentChatId(chat.id);
                }}
                className={`p-3 border-b border-slate-100 flex gap-2.5 items-center cursor-pointer transition ${
                  isActive ? 'bg-[#00B2FF]/10' : 'hover:bg-slate-50'
                }`}
              >
                <img src={chat.avatar} alt={chat.sellerName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">{chat.sellerName}</h4>
                  <p className="text-[10px] text-slate-500 font-medium truncate mb-0.5">{chat.productTitle}</p>
                  <p className="text-xs text-slate-400 truncate">
                    {lastMsg?.sender === 'user' ? 'Вы: ' : ''}{lastMsg?.text}
                  </p>
                </div>
              </div>
            );
          })}
          {chats.length === 0 && (
            <p className="text-center text-slate-400 text-xs py-8">История чатов пуста</p>
          )}
        </div>
      </div>

      {/* Right Messages Thread Area */}
      <div className="flex-1 flex flex-col h-full bg-slate-100">
        {activeChat ? (
          <>
            {/* Header info bar */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-3 shrink-0">
              <img src={activeChat.avatar} alt={activeChat.sellerName} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-extrabold text-xs text-slate-950 flex items-center gap-1">
                  {activeChat.sellerName}
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                </h3>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                  <ShoppingBag className="w-3 h-3 text-[#00B2FF]" />
                  Тема: {activeChat.productTitle}
                </p>
              </div>
            </div>

            {/* Messages Log Scroller */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
              {activeChat.messages.map((m) => {
                const isUser = m.sender === 'user';
                return (
                  <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3.5 shadow-xs relative ${
                      isUser
                        ? 'bg-[#00B2FF] text-white rounded-tr-none'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                    }`}>
                      {/* Bot tag helper */}
                      {!isUser && (
                        <span className="absolute -top-4 left-1.5 text-[9px] font-semibold text-slate-400 flex items-center gap-0.5">
                          <Bot className="w-3 h-3 text-[#00B2FF]" /> Продавец
                        </span>
                      )}
                      <p className="text-xs leading-relaxed font-medium">{m.text}</p>
                      <span className={`text-[9px] block text-right mt-1.5 ${isUser ? 'text-sky-100' : 'text-slate-400'}`}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Text input form block */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder="Напишите продавцу..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#00B2FF] focus:bg-white font-medium"
              />
              <button
                type="submit"
                className="bg-[#00B2FF] hover:bg-[#0092d0] text-white p-2.5 rounded-xl transition active:scale-95 shadow-sm"
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <MessageSquare className="w-12 h-12 text-slate-300 mb-2" />
            <p className="font-semibold text-sm">Выберите чат для начала общения</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatSection;

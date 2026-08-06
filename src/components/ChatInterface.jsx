import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft, MessageSquare, ShieldCheck, CheckCheck } from 'lucide-react';

function ChatInterface({ chats, activeChatId, setActiveChatId, onSendMessage }) {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(activeChatId, inputText);
    setInputText('');
  };

  if (!activeChatId || !activeChat) {
    // Render inbox listing of dialogs
    return (
      <div className="bg-gray-50 h-full flex flex-col">
        {/* Subheader */}
        <div className="bg-white px-4 py-3 border-b border-gray-150 flex items-center justify-between shrink-0">
          <h2 className="font-extrabold text-sm text-gray-800">Мои сообщения</h2>
          <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
            {chats.length} диалогов
          </span>
        </div>

        {/* List of dialogs */}
        <div className="flex-1 overflow-y-auto px-2 py-2.5 space-y-2 pb-12">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 bg-gray-150 text-gray-400 rounded-full flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-gray-500 font-medium text-xs">Нет активных чатов</p>
              <p className="text-gray-400 text-[10px] mt-1">Здесь будут отображаться ваши переписки с продавцами</p>
            </div>
          ) : (
            chats.map(chat => {
              const lastMessage = chat.messages[chat.messages.length - 1];
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className="bg-white border border-gray-100 hover:border-indigo-100 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer active:scale-99 transition-all shadow-xs"
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1 mr-2">
                    <div className="relative shrink-0">
                      <img
                        src={chat.sellerAvatar}
                        alt={chat.sellerName}
                        className="w-11 h-11 rounded-full object-cover border border-gray-50"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-gray-800 truncate leading-none">
                        {chat.sellerName}
                      </h4>
                      <p className="text-[11px] text-gray-500 truncate mt-1.5 font-normal">
                        {lastMessage ? (
                          <>
                            <span className="font-semibold text-gray-400 mr-1">
                              {lastMessage.sender === 'user' ? 'Вы:' : ''}
                            </span>
                            {lastMessage.text}
                          </>
                        ) : (
                          'Начните диалог...'
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Date or dot */}
                  <div className="flex flex-col items-end shrink-0 text-[9px] text-gray-400 font-medium">
                    <span>{lastMessage ? lastMessage.time.split(' ')[0] : ''}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 mt-1 animate-pulse"></span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // Render individual Chat Window
  return (
    <div className="bg-gray-100 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-150 flex items-center space-x-3 shrink-0">
        <button
          onClick={() => setActiveChatId(null)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <img
          src={activeChat.sellerAvatar}
          alt={activeChat.sellerName}
          className="w-9 h-9 rounded-full object-cover border border-gray-100"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-xs text-gray-800 truncate leading-none">
            {activeChat.sellerName}
          </h3>
          <span className="text-[9px] text-emerald-600 font-bold flex items-center mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
            Онлайн
          </span>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2 flex items-center space-x-2 shrink-0">
        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
        <span className="text-[10px] text-indigo-800 font-medium leading-tight">
          Чат защищен системой <b>АвиТок Сделки</b>. Общайтесь и переводите оплату безопасно.
        </span>
      </div>

      {/* Messages Stream Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {activeChat.messages.map((message) => {
          const isUser = message.sender === 'user';
          return (
            <div
              key={message.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                    : 'bg-white text-gray-800 rounded-tl-none font-normal'
                }`}
              >
                {message.text}
              </div>
              <div className="flex items-center space-x-1 mt-1 text-[9px] text-gray-400 font-medium">
                <span>{message.time}</span>
                {isUser && <CheckCheck className="w-3.5 h-3.5 text-indigo-500" />}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Bottom Message Composition Input */}
      <form
        onSubmit={handleSend}
        className="px-4 py-3 bg-white border-t border-gray-150 flex items-center space-x-2 shrink-0 z-10"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Напишите продавцу..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-full py-2.5 px-4.5 text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;

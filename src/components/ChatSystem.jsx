import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCheck, Smile, Phone, Video, MoreVertical, Image as ImageIcon } from 'lucide-react';

export default function ChatSystem({
  chats,
  onSendMessage,
  activeChatId,
  setActiveChatId,
  products
}) {
  const [typedText, setTypedText] = useState("");
  const messagesEndRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!typedText.trim() || !activeChat) return;

    onSendMessage(activeChat.id, typedText);
    setTypedText("");
  };

  return (
    <div className="bg-white dark:bg-[#121216] rounded-3xl border border-gray-100 dark:border-white/5 shadow-md flex h-[calc(100vh-140px)] md:h-[680px] overflow-hidden">

      {/* Sidebar List of active chats */}
      <div className="w-1/3 border-r border-gray-100 dark:border-white/5 flex flex-col h-full bg-gray-50/50 dark:bg-black/10">
        <div className="p-4 border-b border-gray-100 dark:border-white/5">
          <h2 className="font-bold text-sm text-gray-800 dark:text-white">Сообщения</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 ? (
            <p className="text-xs text-center text-gray-400 mt-12 p-4">У вас пока нет активных диалогов.</p>
          ) : (
            chats.map((chat) => {
              const lastMessage = chat.messages[chat.messages.length - 1];
              const isSelected = chat.id === activeChatId;

              return (
                <button
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full p-3.5 text-left border-b border-gray-100 dark:border-white/5 transition-all flex items-center space-x-3 ${
                    isSelected
                      ? 'bg-white dark:bg-white/5 shadow-sm border-l-4 border-l-avito-blue'
                      : 'hover:bg-gray-100/50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full ${chat.avatarColor || 'bg-gray-400'} text-white font-bold flex items-center justify-center text-xs flex-shrink-0`}>
                    {chat.sellerName.substring(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white truncate">{chat.sellerName}</h4>
                      <span className="text-[9px] text-gray-400">{lastMessage ? lastMessage.time : ""}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 truncate mb-1">{chat.productTitle}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                      {lastMessage ? (lastMessage.sender === 'user' ? 'Вы: ' : '') + lastMessage.text : "Диалог начат"}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Message Chat Pane */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#0E0E10]">
        {activeChat ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#121216]">
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 rounded-full ${activeChat.avatarColor} text-white font-bold flex items-center justify-center text-xs`}>
                  {activeChat.sellerName.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white">{activeChat.sellerName}</h3>
                  <div className="flex items-center space-x-2 mt-0.5 text-[10px] text-gray-400">
                    <span className="text-avito-green font-semibold">● В сети</span>
                    <span>•</span>
                    <span className="truncate max-w-[150px]">{activeChat.productTitle}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-1">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg transition-colors" title="Позвонить">
                  <Phone size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg transition-colors" title="Смотреть АвиТок">
                  <Video size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Product context card banner */}
            <div className="bg-gray-50 dark:bg-white/5 p-3 px-4 border-b border-gray-100 dark:border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <img src={activeChat.productImage} alt={activeChat.productTitle} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{activeChat.productTitle}</p>
                  <p className="font-extrabold text-avito-blue mt-0.5">{activeChat.productPrice}</p>
                </div>
              </div>
              <span className="text-[10px] bg-white dark:bg-white/10 px-2.5 py-1 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 font-medium text-gray-500">
                Сделка в АвиТок
              </span>
            </div>

            {/* Message streams */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/30 dark:bg-[#0E0E10]">
              {activeChat.messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm relative ${
                      isUser
                        ? 'bg-avito-blue text-white rounded-tr-none'
                        : 'bg-white dark:bg-[#121216] text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-white/5'
                    }`}>
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <span className="text-[9px] opacity-60 text-right">{msg.time}</span>
                        {isUser && <CheckCheck size={10} className="text-white/80" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Typing input form */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#121216] flex items-center space-x-2">
              <button type="button" className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg transition-colors">
                <Smile size={18} />
              </button>
              <button type="button" className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg transition-colors">
                <ImageIcon size={18} />
              </button>

              <input
                type="text"
                placeholder="Напишите сообщение..."
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                className="flex-1 bg-gray-50 dark:bg-white/5 text-xs px-4 py-2.5 rounded-xl border border-gray-100 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-avito-blue"
              />

              <button
                type="submit"
                disabled={!typedText.trim()}
                className={`p-2.5 rounded-xl text-white transition-all ${
                  typedText.trim()
                    ? 'bg-avito-blue hover:bg-avito-blue/90 cursor-pointer active:scale-95'
                    : 'bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
            <Send size={48} className="mb-2 opacity-30 animate-pulse" />
            <p className="text-sm font-semibold text-gray-500">Диалог не выбран</p>
            <p className="text-xs mt-1">Выберите диалог из списка слева, чтобы начать переписку с продавцом.</p>
          </div>
        )}
      </div>
    </div>
  );
}

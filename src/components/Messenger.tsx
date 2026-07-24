import { useState, useEffect } from 'react';
import { Listing } from '../types';
import { MessageSquare, Send, CheckCheck, Circle } from 'lucide-react';

interface MessengerProps {
  listings: Listing[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'seller';
  text: string;
  time: string;
}

interface Chat {
  id: string;
  listing: Listing;
  messages: ChatMessage[];
  unread: boolean;
}

export default function Messenger({ listings }: MessengerProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [typedMessage, setTypedMessage] = useState('');

  // Auto initialize chats from available listings
  useEffect(() => {
    if (listings.length > 0 && chats.length === 0) {
      const initialChats: Chat[] = listings.slice(0, 3).map((item, idx) => ({
        id: `chat_${item.id}`,
        listing: item,
        unread: idx === 0, // make first chat look unread
        messages: [
          {
            id: 'm1',
            sender: 'seller',
            text: `Здравствуйте! Вы интересовались товаром "${item.title}". Подсказать по поводу характеристик или доставки?`,
            time: 'Вчера, 18:32'
          }
        ]
      }));
      setChats(initialChats);
    }
  }, [listings]);

  const activeChat = chats.find(c => c.id === selectedChatId);

  const handleSendMessage = () => {
    if (!typedMessage.trim() || !selectedChatId) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: typedMessage.trim(),
      time: 'Только что'
    };

    // Add user message
    setChats(prev => prev.map(c => {
      if (c.id === selectedChatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    const promptText = typedMessage.trim();
    setTypedMessage('');

    // Trigger auto reply from mock seller
    setTimeout(() => {
      let sellerResponse = 'Спасибо за ваше сообщение! Мы ответим вам в ближайшее время.';

      const lower = promptText.toLowerCase();
      if (lower.includes('доставк') || lower.includes('отправ')) {
        sellerResponse = `Да, отправляем Авито Доставкой в день заказа! Качественно упакуем, коробка будет целой. Хотите оформить заказ?`;
      } else if (lower.includes('скидк') || lower.includes('дешев') || lower.includes('торг')) {
        sellerResponse = `Небольшой торг уместен у капота / при личной встрече. Могу уступить пару сотен на доставку 😉`;
      } else if (lower.includes('наличи') || lower.includes('живой') || lower.includes('есть')) {
        sellerResponse = `Товар полностью в наличии, в отличном состоянии, как на фото и видео в АвиТоке! Приезжайте на осмотр.`;
      }

      const autoReply: ChatMessage = {
        id: Math.random().toString(),
        sender: 'seller',
        text: sellerResponse,
        time: 'Только что'
      };

      setChats(prev => prev.map(c => {
        if (c.id === selectedChatId) {
          return {
            ...c,
            messages: [...c.messages, autoReply]
          };
        }
        return c;
      }));
    }, 1200);
  };

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setChats(prev => prev.map(c => c.id === id ? { ...c, unread: false } : c));
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {selectedChatId && activeChat ? (
        // Chat Window View
        <div className="flex-1 flex flex-col h-full text-gray-900">

          {/* Chat Header */}
          <div className="p-3 border-b bg-white flex items-center gap-3 sticky top-0 z-10">
            <button
              onClick={() => setSelectedChatId(null)}
              className="text-blue-600 font-bold text-sm hover:underline"
            >
              Назад
            </button>

            <img
              src={activeChat.listing.seller.avatar}
              alt={activeChat.listing.seller.name}
              className="w-10 h-10 rounded-full object-cover border"
            />

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-gray-800 truncate">{activeChat.listing.seller.name}</h4>
              <p className="text-[10px] text-gray-400 truncate mt-0.5">{activeChat.listing.title}</p>
            </div>

            <span className="text-xs font-black text-gray-900">
              {activeChat.listing.price.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 no-scrollbar">
            {activeChat.messages.map(msg => {
              const isSelf = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[75%] ${isSelf ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    isSelf
                      ? 'bg-blue-600 text-white rounded-br-xs shadow-md'
                      : 'bg-white text-gray-800 rounded-bl-xs border border-gray-100 shadow-xs'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 flex items-center gap-1">
                    {msg.time}
                    {isSelf && <CheckCheck className="w-3 h-3 text-blue-500" />}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Typing Form Input */}
          <div className="p-3 border-t bg-white flex gap-2 items-center">
            <input
              type="text"
              placeholder="Спросите про торг, состояние, скидку..."
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-blue-500 transition"
            />
            <button
              onClick={handleSendMessage}
              className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        // Chats Directory Directory
        <div className="flex-1 flex flex-col h-full">
          <div className="p-4 bg-white border-b sticky top-0 z-10">
            <h1 className="text-xl font-bold text-gray-900">Чаты</h1>
          </div>

          {chats.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-24 text-center px-6">
              <MessageSquare className="w-14 h-14 text-gray-300 mb-4" />
              <h3 className="text-base font-bold text-gray-700">Сообщений нет</h3>
              <p className="text-xs text-gray-400 mt-1">Открывайте объявления в каталоге АвиТорг, чтобы задать вопросы продавцам.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {chats.map(chat => {
                const lastMsg = chat.messages[chat.messages.length - 1];
                return (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`p-4 flex gap-3.5 hover:bg-gray-50/50 cursor-pointer transition relative ${
                      chat.unread ? 'bg-blue-50/20' : ''
                    }`}
                  >
                    {/* Unread circle badge */}
                    {chat.unread && (
                      <Circle className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 text-blue-500 rounded-full border border-white" />
                    )}

                    <img
                      src={chat.listing.seller.avatar}
                      alt={chat.listing.seller.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-100 shadow-xs shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-xs font-black text-gray-800 truncate">{chat.listing.seller.name}</h3>
                        <span className="text-[9px] text-gray-400 font-medium shrink-0">{lastMsg?.time || 'Вчера'}</span>
                      </div>
                      <h4 className="text-[10px] text-gray-400 truncate mb-1">{chat.listing.title}</h4>
                      <p className={`text-xs truncate ${chat.unread ? 'text-gray-950 font-black' : 'text-gray-500 font-medium'}`}>
                        {lastMsg ? lastMsg.text : 'Нет сообщений'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

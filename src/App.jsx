import React, { useState } from 'react';
import {
  Tv,
  Search,
  PlusCircle,
  MessageSquare,
  User,
  Grid,
  X,
  Heart,
  MessageCircle,
  Send,
  MapPin,
  Calendar,
  Phone,
  MessageCircleOff,
  ShoppingBag,
  Sparkles,
  Award
} from 'lucide-react';

import VideoFeed from './components/VideoFeed';
import Catalog from './components/Catalog';
import { INITIAL_LISTINGS, MOCK_CATEGORIES, MOCK_CHATS, BOT_RESPONSES } from './mockData';

export default function App() {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' (TikTok mode) or 'catalog' (Avito mode)

  // Search & Categories state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Detail Modal state
  const [selectedListing, setSelectedListing] = useState(null);
  const [detailCommentText, setDetailCommentText] = useState('');

  // Listing creation form state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('electronics');
  const [newLocation, setNewLocation] = useState('Москва, м. Центр');
  const [newDescription, setNewDescription] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Messaging chat state
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatListing, setChatListing] = useState(null);
  const [chatHistory, setChatHistory] = useState(MOCK_CHATS);
  const [newMessageText, setNewMessageText] = useState('');

  // Handle Comment Adding (for both TikTok feed & detail views)
  const handleAddComment = (listingId, text) => {
    setListings(prevListings =>
      prevListings.map(item => {
        if (item.id === listingId) {
          return {
            ...item,
            comments: [
              ...item.comments,
              {
                id: Date.now(),
                author: 'Вы (покупатель)',
                text: text,
                date: 'Только что'
              }
            ]
          };
        }
        return item;
      })
    );

    // Sync state for detail modal
    if (selectedListing && selectedListing.id === listingId) {
      setSelectedListing(prev => ({
        ...prev,
        comments: [
          ...prev.comments,
          {
            id: Date.now(),
            author: 'Вы (покупатель)',
            text: text,
            date: 'Только что'
          }
        ]
      }));
    }
  };

  // Submit Listing Creation Form
  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newDescription) {
      alert('Пожалуйста заполните обязательные поля: название, цену и описание');
      return;
    }

    const defaultImg = newImageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
    const mockNewListing = {
      id: Date.now(),
      title: newTitle,
      price: Number(newPrice),
      category: newCategory,
      location: newLocation,
      date: 'Только что',
      description: newDescription,
      seller: {
        name: 'Ваш Профиль',
        rating: 5.0,
        reviewsCount: 1,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        isOnline: true
      },
      images: [defaultImg],
      videoUrl: newVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-modern-interior-design-of-a-living-room-41585-large.mp4',
      likes: 0,
      shares: 0,
      comments: []
    };

    setListings([mockNewListing, ...listings]);

    // Reset Form
    setNewTitle('');
    setNewPrice('');
    setNewCategory('electronics');
    setNewLocation('Москва, м. Центр');
    setNewDescription('');
    setNewVideoUrl('');
    setNewImageUrl('');
    setShowCreateModal(false);

    // Redirect to show the new listing
    if (mockNewListing.videoUrl) {
      setActiveTab('feed');
    } else {
      setActiveTab('catalog');
    }
  };

  // Chat/Messaging system actions
  const openChatWithSeller = (listing) => {
    setChatListing(listing);
    setShowChatModal(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const listId = chatListing.id;
    const currentMsgs = chatHistory[listId] || [];

    const updatedUserMsgs = [
      ...currentMsgs,
      {
        id: Date.now(),
        sender: 'user',
        text: newMessageText,
        date: 'Только что'
      }
    ];

    setChatHistory({
      ...chatHistory,
      [listId]: updatedUserMsgs
    });

    setNewMessageText('');

    // Simulate auto-bot reply from seller after 1.5 seconds
    setTimeout(() => {
      const botText = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
      setChatHistory(prev => {
        const prevMsgs = prev[listId] || [];
        return {
          ...prev,
          [listId]: [
            ...prevMsgs,
            {
              id: Date.now() + 1,
              sender: 'seller',
              text: botText,
              date: 'Только что'
            }
          ]
        };
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16 md:pb-0">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 bg-white border-b border-neutral-100 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            onClick={() => { setActiveTab('feed'); setSelectedCategory('all'); setSearchQuery(''); }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight">
              АвиТок
            </span>
            <span className="bg-red-500 text-[9px] text-white font-extrabold uppercase px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
              Live
            </span>
          </div>

          {/* Large Screen Mode Switch */}
          <div className="hidden md:flex bg-neutral-100 p-1 rounded-2xl items-center shadow-inner border border-neutral-200">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'feed'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Tv className="w-4 h-4 text-rose-500" />
              Лента Видео (TikTok)
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Grid className="w-4 h-4 text-emerald-500" />
              Каталог Авито
            </button>
          </div>

          {/* Quick Create Listing Button for Header */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold transition active:scale-95 shadow-md cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Разместить объявление</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'feed' ? (
          <div className="py-6 bg-neutral-900">
            <div className="text-center mb-4">
              <span className="text-white/60 text-xs uppercase tracking-wider font-semibold">Свайпайте вертикально</span>
              <h2 className="text-white text-base font-bold flex items-center justify-center gap-1.5 mt-0.5">
                <Tv className="w-4 h-4 text-rose-500" /> Рекомендованные обзоры
              </h2>
            </div>
            <VideoFeed
              listings={listings}
              onOpenDetails={(item) => setSelectedListing(item)}
              onAddComment={handleAddComment}
            />
          </div>
        ) : (
          <Catalog
            listings={listings}
            onOpenDetails={(item) => setSelectedListing(item)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </main>

      {/* Mobile Sticky Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-neutral-100 flex justify-around items-center py-2.5 z-40 shadow-xl">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'feed' ? 'text-rose-500' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Tv className="w-5 h-5" />
          <span className="text-[10px] font-bold">Видео</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center gap-0.5 ${
            activeTab === 'catalog' ? 'text-emerald-500' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-bold">Объявления</span>
        </button>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex flex-col items-center gap-0.5 text-neutral-400 hover:text-neutral-600"
        >
          <PlusCircle className="w-5 h-5 text-emerald-500" />
          <span className="text-[10px] font-bold">Создать</span>
        </button>

        <button
          onClick={() => {
            // Find a listing that has comments/chats to trigger visual mock dialog
            if (listings.length > 0) {
              openChatWithSeller(listings[0]);
            } else {
              alert('Добавьте хотя бы одно объявление, чтобы начать чат.');
            }
          }}
          className="flex flex-col items-center gap-0.5 text-neutral-400 hover:text-neutral-600"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-bold">Сообщения</span>
        </button>
      </div>

      {/* DETAILED VIEW MODAL */}
      {selectedListing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4 text-left">
          <div className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl md:rounded-3xl shadow-2xl overflow-y-auto flex flex-col animate-scale-up">
            {/* Close Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-4 py-3.5 flex items-center justify-between z-10 shrink-0">
              <span className="font-extrabold text-neutral-900 text-sm md:text-base truncate">
                Объявление #{selectedListing.id}
              </span>
              <button
                onClick={() => setSelectedListing(null)}
                className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Images & Video side */}
                <div className="space-y-4">
                  <div className="relative aspect-4/3 bg-neutral-100 rounded-2xl overflow-hidden shadow-inner">
                    <img
                      src={selectedListing.images[0]}
                      alt={selectedListing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Optional video watch toggle */}
                  {selectedListing.videoUrl && (
                    <button
                      onClick={() => {
                        setSelectedListing(null);
                        setActiveTab('feed');
                      }}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-rose-500/10 flex items-center justify-center gap-2.5 transition active:scale-[0.98] cursor-pointer"
                    >
                      <Tv className="w-5 h-5" />
                      Смотреть видео-обзор товара
                    </button>
                  )}

                  {/* Seller Bio Card */}
                  <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 text-left">
                    <h5 className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider mb-2.5">Продавец</h5>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={selectedListing.seller.avatar}
                          alt={selectedListing.seller.name}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                        {selectedListing.seller.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="text-left">
                        <h4 className="font-extrabold text-neutral-900 text-sm flex items-center gap-1.5">
                          {selectedListing.seller.name}
                          <Award className="w-4 h-4 text-emerald-500" />
                        </h4>
                        <p className="text-xs text-neutral-500 flex items-center gap-1">
                          <span className="text-amber-500 font-bold">★ {selectedListing.seller.rating}</span>
                          <span>• {selectedListing.seller.reviewsCount} отзывов</span>
                        </p>
                      </div>
                    </div>

                    {/* Action buttons with seller */}
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => {
                          setSelectedListing(null);
                          openChatWithSeller(selectedListing);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Написать
                      </button>
                      <button
                        onClick={() => alert(`Телефон продавца: +7 (999) 123-45-${selectedListing.id % 100}`)}
                        className="bg-white hover:bg-neutral-100 text-gray-800 border border-neutral-200 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Phone className="w-4 h-4 text-emerald-500" />
                        Показать телефон
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details description side */}
                <div className="space-y-5 text-left flex flex-col h-full">
                  <div>
                    <h3 className="text-lg md:text-xl font-extrabold text-neutral-900 leading-snug mb-1">
                      {selectedListing.title}
                    </h3>
                    <p className="text-xl md:text-2xl font-black text-emerald-600">
                      {selectedListing.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>

                  <div className="space-y-1.5 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-100">
                    <p className="text-xs text-neutral-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>{selectedListing.location}</span>
                    </p>
                    <p className="text-xs text-neutral-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>Опубликовано: {selectedListing.date}</span>
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-neutral-900 text-sm mb-2">Описание</h4>
                    <p className="text-xs md:text-sm text-neutral-600 leading-relaxed whitespace-pre-line font-light">
                      {selectedListing.description}
                    </p>
                  </div>

                  {/* Local Comments Panel inside Classified detailed View */}
                  <div className="border-t border-neutral-100 pt-5 mt-auto">
                    <h4 className="font-extrabold text-neutral-900 text-sm mb-3">
                      Вопросы и обсуждение ({selectedListing.comments.length})
                    </h4>

                    {/* Comment Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!detailCommentText.trim()) return;
                        handleAddComment(selectedListing.id, detailCommentText);
                        setDetailCommentText('');
                      }}
                      className="flex gap-2 mb-4"
                    >
                      <input
                        type="text"
                        placeholder="Задать вопрос по товару..."
                        value={detailCommentText}
                        onChange={(e) => setDetailCommentText(e.target.value)}
                        className="flex-1 bg-neutral-50 border border-neutral-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-neutral-400"
                      />
                      <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-4 py-2 rounded-xl font-bold transition active:scale-95 shrink-0"
                      >
                        Спросить
                      </button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {selectedListing.comments.length === 0 ? (
                        <p className="text-neutral-400 text-xs text-center py-4">Вопросов пока нет. Задайте первый вопрос продавцу!</p>
                      ) : (
                        selectedListing.comments.map(c => (
                          <div key={c.id} className="text-xs bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-neutral-700">{c.author}</span>
                              <span className="text-[10px] text-neutral-400">{c.date}</span>
                            </div>
                            <p className="text-neutral-600 font-light">{c.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW LISTING MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-left">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up">
            {/* Header */}
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-extrabold text-neutral-900 text-base flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-500" /> Разместить объявление на АвиТок
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateListing} className="overflow-y-auto p-5 space-y-4 max-h-[80vh]">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Название товара/услуги *
                </label>
                <input
                  type="text"
                  placeholder="Например: Сноуборд Burton Custom, 158 см"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Цена (₽) *
                  </label>
                  <input
                    type="number"
                    placeholder="Цена в рублях"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Категория *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {MOCK_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Местоположение
                </label>
                <input
                  type="text"
                  placeholder="Город, метро, район"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Описание *
                </label>
                <textarea
                  rows="4"
                  placeholder="Опишите состояние товара, характеристики и условия сделки..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  Ссылка на фото товара
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... (опционально)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <p className="text-[10px] text-neutral-400 mt-1">
                  Если оставить пустым, будет установлено красивое дефолтное фото.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Tv className="w-3.5 h-3.5 text-rose-500" /> Ссылка на видео-обзор (TikTok)
                </label>
                <input
                  type="url"
                  placeholder="https://assets.mixkit.co/... (опционально)"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <p className="text-[10px] text-neutral-400 mt-1">
                  Добавьте видео, чтобы объявление попало в виральную TikTok-ленту видео-обзоров!
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 transition active:scale-[0.98] cursor-pointer"
                >
                  Опубликовать объявление
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHAT/MESSAGING DIALOG MODAL */}
      {showChatModal && chatListing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-left">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-scale-up">
            {/* Header with Seller Info */}
            <div className="bg-neutral-900 px-4 py-3 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={chatListing.seller.avatar}
                    alt={chatListing.seller.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/20"
                  />
                  {chatListing.seller.isOnline && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-neutral-900 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">{chatListing.seller.name}</h4>
                  <p className="text-[9px] text-neutral-400">В сети (Печатает ответы)</p>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subheader with Product details */}
            <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-100 flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 bg-neutral-200 rounded-lg overflow-hidden shrink-0">
                <img
                  src={chatListing.images[0]}
                  alt={chatListing.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 text-left flex-1">
                <h5 className="text-[10px] font-semibold text-neutral-800 truncate">{chatListing.title}</h5>
                <p className="text-xs text-neutral-950 font-black">{chatListing.price.toLocaleString('ru-RU')} ₽</p>
              </div>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Сделка в чате
              </span>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-neutral-50 space-y-3.5">
              {(chatHistory[chatListing.id] || []).length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 p-6 space-y-2">
                  <MessageCircleOff className="w-10 h-10 text-neutral-300" />
                  <p className="text-xs">История диалога пуста.</p>
                  <p className="text-[10px] text-neutral-400">Напишите приветственное сообщение, чтобы начать общение с продавцом!</p>
                </div>
              ) : (
                (chatHistory[chatListing.id] || []).map((msg) => {
                  const isMe = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                        isMe
                          ? 'bg-emerald-500 text-white rounded-tr-none text-right'
                          : 'bg-white text-gray-800 border border-neutral-100 rounded-tl-none text-left'
                      }`}>
                        <p>{msg.text}</p>
                        <span className={`text-[8px] block mt-1.5 ${isMe ? 'text-white/70' : 'text-neutral-400'}`}>
                          {msg.date}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Chat Input form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-neutral-100 bg-white flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Задайте вопрос продавцу..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="flex-1 bg-neutral-50 border border-neutral-200 text-xs px-4 py-3 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-neutral-400"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-full transition active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

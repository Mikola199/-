import { useState, useEffect } from 'react';
import { MOCK_LISTINGS } from './data';
import { Listing } from './types';
import TikTokFeed from './components/TikTokFeed';
import AvitoGrid from './components/AvitoGrid';
import CreateListing from './components/CreateListing';
import Messenger from './components/Messenger';
import Profile from './components/Profile';
import ProductDetailModal from './components/ProductDetailModal';
import { Play, Grid, PlusSquare, MessageCircle, Heart, User } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'tok' | 'torg' | 'create' | 'chats' | 'favorites' | 'profile'>('tok');
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('avitok_listings');
    return saved ? JSON.parse(saved) : MOCK_LISTINGS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('avitok_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState<Listing | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('avitok_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('avitok_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleCreateListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
    setActiveTab('torg');
  };

  const handleOpenVideo = (listingId: string) => {
    const index = listings.findIndex(l => l.id === listingId);
    if (index !== -1) {
      setActiveVideoIndex(index);
      setActiveTab('tok');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white relative shadow-2xl overflow-hidden border-x border-gray-800">
      {/* Dynamic Main View Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'tok' && (
          <TikTokFeed
            listings={listings}
            setListings={setListings}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onOpenProduct={setSelectedProduct}
            initialIndex={activeVideoIndex}
          />
        )}

        {activeTab === 'torg' && (
          <div className="h-full bg-gray-50 text-gray-900 overflow-y-auto pb-16 no-scrollbar">
            <AvitoGrid
              listings={listings}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onOpenProduct={setSelectedProduct}
              onOpenVideo={handleOpenVideo}
            />
          </div>
        )}

        {activeTab === 'create' && (
          <div className="h-full bg-white text-gray-900 overflow-y-auto pb-16">
            <CreateListing onCreate={handleCreateListing} />
          </div>
        )}

        {activeTab === 'chats' && (
          <div className="h-full bg-white text-gray-900 overflow-y-auto pb-16">
            <Messenger listings={listings} />
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="h-full bg-gray-50 text-gray-900 overflow-y-auto pb-16 no-scrollbar">
            <div className="p-4 bg-white border-b sticky top-0 z-10 flex items-center justify-between">
              <h1 className="text-xl font-bold">Избранное</h1>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {favorites.length}
              </span>
            </div>
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <Heart className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700">В избранном пока ничего нет</h3>
                <p className="text-sm text-gray-500 mt-1">Добавляйте объявления из АвиТорга или АвиТока, чтобы не потерять</p>
                <button
                  onClick={() => setActiveTab('torg')}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
                >
                  Перейти к покупкам
                </button>
              </div>
            ) : (
              <div className="p-4">
                <AvitoGrid
                  listings={listings.filter(l => favorites.includes(l.id))}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  onOpenProduct={setSelectedProduct}
                  onOpenVideo={handleOpenVideo}
                  hideHeaderFilters
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="h-full bg-gray-50 text-gray-900 overflow-y-auto pb-16">
            <Profile listings={listings} />
          </div>
        )}
      </div>

      {/* Global Bottom Navigation Bar */}
      <nav className={`h-16 border-t flex items-center justify-around px-2 z-40 ${
        activeTab === 'tok' ? 'bg-black/90 border-gray-900 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
      }`}>
        <button
          onClick={() => { setActiveTab('tok'); setActiveVideoIndex(0); }}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition ${
            activeTab === 'tok' ? 'text-white font-semibold' : 'hover:text-gray-900'
          }`}
        >
          <Play className={`w-5 h-5 ${activeTab === 'tok' ? 'fill-white stroke-none' : ''}`} />
          <span className="text-[10px] tracking-tight">АвиТок (Лента)</span>
        </button>

        <button
          onClick={() => setActiveTab('torg')}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition ${
            activeTab === 'torg' ? 'text-blue-600 font-semibold' : 'hover:text-gray-900'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">АвиТорг (Поиск)</span>
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition ${
            activeTab === 'create' ? 'text-blue-600 font-semibold' : 'hover:text-gray-900'
          }`}
        >
          <PlusSquare className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Подать объявление</span>
        </button>

        <button
          onClick={() => setActiveTab('chats')}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition ${
            activeTab === 'chats' ? 'text-blue-600 font-semibold' : 'hover:text-gray-900'
          }`}
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <span className="text-[10px] tracking-tight">Сообщения</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition ${
            activeTab === 'favorites' ? 'text-blue-600 font-semibold' : 'hover:text-gray-900'
          }`}
        >
          <Heart className={`w-5 h-5 ${activeTab === 'favorites' ? 'fill-red-500 text-red-500' : ''}`} />
          <span className="text-[10px] tracking-tight">Избранное</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition ${
            activeTab === 'profile' ? 'text-blue-600 font-semibold' : 'hover:text-gray-900'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Профиль</span>
        </button>
      </nav>

      {/* Product Detail Modal Backdrop */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={() => toggleFavorite(selectedProduct.id)}
          onOpenVideo={() => {
            setSelectedProduct(null);
            handleOpenVideo(selectedProduct.id);
          }}
        />
      )}
    </div>
  );
}

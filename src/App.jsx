import React, { useState } from 'react';
import Navigation from './components/Navigation';
import VideoFeed from './components/VideoFeed';
import Catalog, { ProductDetailsDrawer } from './components/Catalog';
import CreateListing from './components/CreateListing';
import ChatSection from './components/ChatSection';
import Profile from './components/Profile';

import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_CHATS, USER_PROFILE } from './mockData';

function App() {
  const [activeTab, setActiveTab] = useState('feed'); // feed, catalog, create, chat, profile
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Appends new custom user item to current lists
  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  // Handles buyer sending action or clicking chat button in listings details
  const handleChatClick = (product) => {
    // Check if chat already exists for this seller & product
    const existingChat = chats.find(
      (c) => c.productId === product.id && c.sellerName === product.seller.name
    );

    if (existingChat) {
      setCurrentChatId(existingChat.id);
    } else {
      const newChatId = `chat_${Date.now()}`;
      const newChat = {
        id: newChatId,
        productId: product.id,
        sellerName: product.seller.name,
        productTitle: product.title,
        avatar: product.seller.avatar,
        messages: [
          {
            id: Date.now(),
            sender: 'seller',
            text: `Здравствуйте! Вы интересовались моим объявлением "${product.title}"?`,
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      };
      setChats([newChat, ...chats]);
      setCurrentChatId(newChatId);
    }

    // Set selected product to null to close any opened details drawers
    setSelectedProduct(null);
    setActiveTab('chat');
  };

  // Triggers video review scroll to specific item
  const handleWatchReview = (product) => {
    // Reorder products so the desired product is at index 0 (top of TikTok feed)
    const filtered = products.filter((p) => p.id !== product.id);
    setProducts([product, ...filtered]);
    setSelectedProduct(null);
    setActiveTab('feed');
  };

  // Render view depending on navigation selected tab
  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <VideoFeed
            products={products}
            onProductClick={setSelectedProduct}
            onChatClick={handleChatClick}
          />
        );
      case 'catalog':
        return (
          <Catalog
            products={products}
            categories={INITIAL_CATEGORIES}
            onProductClick={setSelectedProduct}
          />
        );
      case 'create':
        return (
          <CreateListing
            categories={INITIAL_CATEGORIES}
            onAddProduct={handleAddProduct}
          />
        );
      case 'chat':
        return (
          <ChatSection
            chats={chats}
            setChats={setChats}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
          />
        );
      case 'profile':
        return (
          <Profile
            profile={USER_PROFILE}
            products={products}
          />
        );
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-slate-100">
            <p className="text-slate-500 font-bold">Ой, что-то пошло не так...</p>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-black shadow-2xl overflow-hidden flex flex-col border-x border-neutral-800">
      {/* Top Main Brand Banner header (Except in TikTok Video Feed to avoid distraction and match branding) */}
      {activeTab !== 'feed' && (
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-1">
            <span className="text-xl font-black text-slate-900 tracking-tight flex items-center">
              Ави<span className="text-[#00B2FF]">Ток</span>
            </span>
            <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90">
              LIVE
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-400">
            Оригинальный гибрид
          </div>
        </header>
      )}

      {/* Main tab panel body content view */}
      <main className="flex-1 overflow-hidden relative bg-slate-50">
        {renderContent()}

        {/* Global Details drawer/modal overlay */}
        {selectedProduct && (
          <ProductDetailsDrawer
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onChatClick={handleChatClick}
            onWatchReview={handleWatchReview}
          />
        )}
      </main>

      {/* Navigation Panel */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={chats.length}
      />
    </div>
  );
}

export default App;

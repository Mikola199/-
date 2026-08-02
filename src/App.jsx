import React, { useState, useEffect } from 'react';
import {
  Tv,
  ShoppingBag,
  PlusSquare,
  MessageSquare,
  Heart,
  User,
  Sun,
  Moon,
  Flame,
  ShoppingCart,
  TrendingUp,
  Award,
  Bell,
  Trash2,
  X
} from 'lucide-react';

import { INITIAL_PRODUCTS, INITIAL_CHATS } from './data/mockData';
import TikTokFeed from './components/TikTokFeed';
import AvitoGrid from './components/AvitoGrid';
import ChatSystem from './components/ChatSystem';
import CreateListing from './components/CreateListing';
import ProductDetailModal from './components/ProductDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState("feed"); // feed | marketplace | create | messages | favorites
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(INITIAL_CHATS[0]?.id || null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([1, 4]); // default favorites
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userCoins, setUserCoins] = useState(1500); // Simulated gamification coins inside AviTok
  const [notifications, setNotifications] = useState([
    { id: 1, text: "🔥 Ваше видео-объявление iPhone 15 Pro Max набрало 1000 просмотров!", unread: true },
    { id: 2, text: "💬 Продавец 'SneakerHead Shop' ответил вам в чате.", unread: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Apply darkMode class to HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Likes / Favorites Toggle
  const handleToggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Add Item to Cart
  const handleAddToCart = (product) => {
    const isAlreadyInCart = cartItems.some(item => item.id === product.id);
    if (isAlreadyInCart) {
      setCartItems(cartItems.filter(item => item.id !== product.id));
    } else {
      setCartItems([...cartItems, product]);
      // Give simulated game points for shopping
      setUserCoins(prev => prev + 100);

      // Post notification
      const newNotification = {
        id: Date.now(),
        text: `🛒 Добавлено в корзину: ${product.title}. Вы получили +100 АвиМонет! 🪙`,
        unread: true
      };
      setNotifications([newNotification, ...notifications]);
    }
  };

  // Switch to TikTok Feed focused on specific product
  const handleOpenVideoFeed = (product) => {
    const productIdx = products.findIndex(p => p.id === product.id);
    if (productIdx !== -1) {
      // Re-order or rotate products list to make this product the first one
      const reordered = [
        products[productIdx],
        ...products.filter(p => p.id !== product.id)
      ];
      setProducts(reordered);
    }
    setActiveTab("feed");
  };

  // Start chat with seller
  const handleOpenChat = (product) => {
    // Check if chat already exists
    const existingChat = chats.find(c => c.productId === product.id);

    if (existingChat) {
      setActiveChatId(existingChat.id);
    } else {
      const newChat = {
        id: Date.now(),
        productId: product.id,
        productTitle: product.title,
        productPrice: `${product.price.toLocaleString('ru-RU')} ₽`,
        productImage: product.image,
        sellerName: product.sellerName,
        avatarColor: "bg-gradient-to-tr from-avito-blue to-avito-green",
        messages: [
          { id: 1, sender: "seller", text: `Здравствуйте! Вы интересовались товаром "${product.title}". Готов ответить на ваши вопросы!`, time: "Только что" }
        ]
      };
      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
    }
    setActiveTab("messages");
  };

  // Handle user sending message & simulate seller's auto reply
  const handleSendMessage = (chatId, text) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { id: Date.now(), sender: "user", text, time: "Только что" }
          ]
        };
      }
      return chat;
    });

    setChats(updatedChats);

    // Simulate Seller Auto-Reply based on the specific listing or category
    setTimeout(() => {
      const activeChatObj = chats.find(c => c.id === chatId);
      if (!activeChatObj) return;

      const productObj = products.find(p => p.id === activeChatObj.productId) || products[0];
      const replies = productObj.sellerResponses || [
        "Спасибо за интерес! Товар в наличии. Когда вам удобно встретиться или оформить доставку?",
        "Да, состояние отличное. Все проверки на месте приветствуются!",
        "Здравствуйте! Могу сделать небольшую скидку при быстрой покупке."
      ];

      // Grab random or progressive seller response
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { id: Date.now() + 1, sender: "seller", text: randomReply, time: "Только что" }
            ]
          };
        }
        return chat;
      }));

      // Trigger standard incoming notification
      const newNotification = {
        id: Date.now(),
        text: `💬 Новый ответ от ${activeChatObj.sellerName} по товару "${activeChatObj.productTitle}"`,
        unread: true
      };
      setNotifications(prev => [newNotification, ...prev]);

    }, 2000);
  };

  // Add newly created listing to products
  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
    setUserCoins(prev => prev + 500); // Give coins for publishing vertical videos

    // Post notification
    const newNotification = {
      id: Date.now(),
      text: `🎉 Видео-объявление "${newProduct.title}" успешно опубликовано! Вы получили +500 АвиМонет! 🪙`,
      unread: true
    };
    setNotifications([newNotification, ...notifications]);

    setActiveTab("feed");
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#09090D] transition-colors duration-200">

      {/* Desktop Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#121216]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 py-3 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab("feed")}>
            {/* Animated Logo */}
            <div className="relative w-9 h-9 bg-gradient-to-tr from-avito-blue to-avito-green rounded-xl flex items-center justify-center shadow-md">
              <Tv size={18} className="text-white animate-pulse" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-tiktok-pink rounded-full flex items-center justify-center text-[8px] font-black text-white">
                T
              </div>
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-gray-900 dark:text-white">
                Ави<span className="text-tiktok-pink">Ток</span>
              </span>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">Avito & TikTok Hybrid</p>
            </div>
          </div>

          {/* Gamification Streak widget */}
          <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full text-xs">
            <Flame className="text-orange-500 fill-current animate-bounce" size={14} />
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Ваш баланс монет:</span>
            <span className="font-extrabold text-orange-600 dark:text-orange-400">{userCoins} 🪙</span>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors"
            title="Переключить тему"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors relative"
            >
              <Bell size={18} />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tiktok-pink rounded-full animate-ping"></span>
              )}
            </button>

            {/* Notifications Dropdown Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#121216] border border-gray-100 dark:border-white/10 rounded-2xl p-4 shadow-xl z-50 text-xs animate-fade-in space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-2">
                  <span className="font-bold text-gray-800 dark:text-white">Уведомления</span>
                  <button
                    onClick={() => {
                      setNotifications(notifications.map(n => ({ ...n, unread: false })));
                      setShowNotifications(false);
                    }}
                    className="text-[10px] text-avito-blue hover:underline font-medium"
                  >
                    Прочитать все
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-2 rounded-xl transition-colors ${n.unread ? 'bg-avito-blue/5 border-l-2 border-l-avito-blue' : 'bg-gray-50/50 dark:bg-white/5'}`}>
                      <p className="text-gray-600 dark:text-gray-300 leading-normal">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shopping Cart button with badge */}
          <button
            onClick={() => setShowCart(true)}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors relative"
          >
            <ShoppingCart size={18} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-avito-green text-white font-extrabold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#121216]">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* User Profile Info */}
          <div className="flex items-center space-x-2 border-l border-gray-100 dark:border-white/5 pl-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-tiktok-pink to-violet-500 text-white font-bold flex items-center justify-center text-xs shadow-sm">
              ИП
            </div>
            <span className="hidden sm:inline text-xs font-bold text-gray-700 dark:text-gray-200">Иван П.</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Workspace */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-12">
        {activeTab === "feed" && (
          <TikTokFeed
            products={products}
            onOpenChat={handleOpenChat}
            onOpenProduct={setSelectedProduct}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
          />
        )}

        {activeTab === "marketplace" && (
          <AvitoGrid
            products={products}
            onOpenProduct={setSelectedProduct}
            onOpenVideoFeed={handleOpenVideoFeed}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === "create" && (
          <CreateListing onAddProduct={handleAddProduct} />
        )}

        {activeTab === "messages" && (
          <ChatSystem
            chats={chats}
            onSendMessage={handleSendMessage}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            products={products}
          />
        )}

        {activeTab === "favorites" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Избранные объявления</h1>
                <p className="text-xs text-gray-400 mt-1">Товары, которые вы сохранили для быстрого доступа</p>
              </div>
            </div>

            {favoriteProducts.length === 0 ? (
              <div className="bg-white dark:bg-[#121216] border border-gray-100 dark:border-white/5 rounded-2xl p-12 text-center text-gray-400">
                <Heart size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-semibold text-gray-500">Список избранного пуст</p>
                <p className="text-xs mt-1">Добавляйте понравившиеся товары прямо из каталога или ленты АвиТок!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favoriteProducts.map((product) => {
                  const inCart = cartItems.some(item => item.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-[#121216] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group relative"
                    >
                      <button
                        onClick={() => handleToggleFavorite(product.id)}
                        className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-red-500 border border-red-500 text-white backdrop-blur-md shadow-sm"
                      >
                        <Heart size={14} className="fill-current" />
                      </button>

                      <div className="relative aspect-square w-full" onClick={() => setSelectedProduct(product)}>
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenVideoFeed(product);
                          }}
                          className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2.5 py-1.5 rounded-full flex items-center space-x-1"
                        >
                          <Tv size={11} className="text-tiktok-cyan animate-pulse" />
                          <span>Смотреть в АвиТок</span>
                        </button>
                      </div>

                      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                        <div onClick={() => setSelectedProduct(product)} className="space-y-1">
                          <p className="text-base font-black text-gray-900 dark:text-white">
                            {product.price.toLocaleString('ru-RU')} ₽
                          </p>
                          <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug group-hover:text-avito-blue transition-colors">
                            {product.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-gray-50 dark:border-white/5">
                          <span className="text-[10px] text-gray-400 truncate max-w-[80px]">
                            {product.sellerName}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className={`text-[10px] px-2.5 py-1 rounded font-bold transition-all ${
                              inCart
                                ? 'bg-avito-green text-white'
                                : 'bg-avito-blue text-white hover:bg-avito-blue/90'
                            }`}
                          >
                            {inCart ? "В корзине" : "В корзину"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Interactive Bottom Tab Bar for Mobile & Easy Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#121216]/95 backdrop-blur-md border-t border-gray-100 dark:border-white/5 py-2 px-6 flex justify-around items-center max-w-lg mx-auto md:rounded-t-3xl md:shadow-lg">
        <button
          onClick={() => setActiveTab("feed")}
          className={`flex flex-col items-center space-y-1 ${activeTab === "feed" ? 'text-tiktok-pink' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
        >
          <Tv size={20} className={activeTab === "feed" ? "animate-bounce" : ""} />
          <span className="text-[9px] font-bold">АвиТок Feed</span>
        </button>

        <button
          onClick={() => setActiveTab("marketplace")}
          className={`flex flex-col items-center space-y-1 ${activeTab === "marketplace" ? 'text-avito-blue' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
        >
          <ShoppingBag size={20} />
          <span className="text-[9px] font-bold">Объявления</span>
        </button>

        <button
          onClick={() => setActiveTab("create")}
          className={`flex flex-col items-center space-y-1 ${activeTab === "create" ? 'text-avito-green' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
        >
          <PlusSquare size={20} />
          <span className="text-[9px] font-bold">Разместить</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`flex flex-col items-center space-y-1 ${activeTab === "messages" ? 'text-avito-blue' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
        >
          <MessageSquare size={20} />
          <span className="text-[9px] font-bold">Чат</span>
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex flex-col items-center space-y-1 ${activeTab === "favorites" ? 'text-red-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
        >
          <Heart size={20} />
          <span className="text-[9px] font-bold">Избранное</span>
        </button>
      </nav>

      {/* Full Product Detail Modal Overlay */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenChat={handleOpenChat}
          onOpenVideoFeed={handleOpenVideoFeed}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Shopping Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white dark:bg-[#121216] w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-slide-left p-6">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
              <h2 className="font-extrabold text-base text-gray-900 dark:text-white flex items-center">
                Корзина покупателя
                <span className="ml-2.5 px-2 py-0.5 bg-avito-green/10 text-avito-green text-xs rounded-full">
                  {cartItems.length}
                </span>
              </h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-2">
                  <ShoppingCart size={40} className="opacity-30" />
                  <p className="text-xs font-semibold">Ваша корзина пуста</p>
                  <p className="text-[10px] max-w-xs">Перейдите во вкладку объявлений Авито или видеороликов АвиТок, чтобы добавить товары.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 dark:bg-white/5 p-3 rounded-2xl flex space-x-3 border border-gray-100 dark:border-white/5 items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-gray-900 dark:text-white truncate">{item.title}</p>
                        <p className="text-[10px] text-gray-400">{item.sellerName}</p>
                        <p className="font-black text-xs text-avito-blue mt-0.5">{item.price.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                      title="Удалить из корзины"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Total Footer checkout */}
            <div className="border-t border-gray-100 dark:border-white/5 pt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Итого к оплате:</span>
                <span className="font-black text-lg text-gray-900 dark:text-white">
                  {cartItems.reduce((acc, current) => acc + current.price, 0).toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <button
                disabled={cartItems.length === 0}
                onClick={() => {
                  alert("🎉 Оплата совершена успешно! Товары добавлены в ваш кабинет.");
                  setCartItems([]);
                  setShowCart(false);
                }}
                className="w-full bg-avito-blue hover:bg-avito-blue/95 disabled:bg-gray-200 dark:disabled:bg-white/5 disabled:text-gray-400 text-white text-xs font-extrabold py-3.5 rounded-xl transition-transform active:scale-95"
              >
                Оформить заказ на АвиТок
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

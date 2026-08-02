import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, ShoppingCart, Play, Pause, ChevronDown, ChevronUp, Send, Check } from 'lucide-react';

export default function TikTokFeed({
  products,
  onOpenChat,
  onOpenProduct,
  favorites,
  onToggleFavorite,
  onAddToCart,
  cartItems
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState({});
  const [localLikes, setLocalLikes] = useState({});
  const videoRef = useRef(null);

  const product = products[currentIndex] || products[0];

  useEffect(() => {
    // Reset video playing state on index change
    setIsPlaying(true);
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = (id) => {
    onToggleFavorite(id);
    const updatedLikes = { ...localLikes };
    if (favorites.includes(id)) {
      updatedLikes[id] = (updatedLikes[id] || product.likes) - 1;
    } else {
      updatedLikes[id] = (updatedLikes[id] || product.likes) + 1;
    }
    setLocalLikes(updatedLikes);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const currentComments = localComments[product.id] || product.comments;
    const newComment = {
      id: Date.now(),
      user: "Вы (Покупатель)",
      text: commentText,
      time: "Только что"
    };

    setLocalComments({
      ...localComments,
      [product.id]: [newComment, ...currentComments]
    });
    setCommentText("");
  };

  const currentProductComments = localComments[product.id] || product.comments;
  const isFavorite = favorites.includes(product.id);
  const displayedLikes = localLikes[product.id] !== undefined ? localLikes[product.id] : product.likes;

  const inCart = cartItems.some(item => item.id === product.id);

  return (
    <div className="relative w-full h-[calc(100vh-130px)] md:h-[750px] bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-4xl mx-auto">
      {/* Video / Loop Animation Screen */}
      <div className="relative flex-1 bg-[#09090D] flex items-center justify-center overflow-hidden h-full">
        {/* Animated Simulated Video Loop */}
        <div
          className="absolute inset-0 opacity-80 flex flex-col items-center justify-center transition-all duration-700"
          style={{ background: product.videoTheme }}
        >
          {/* Mock Floating Tech/Aesthetic Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-64 h-64 bg-white/5 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
            <div className="absolute w-80 h-80 bg-black/20 rounded-full blur-3xl bottom-10 right-10 animate-bounce" style={{ animationDuration: '8s' }}></div>
          </div>

          {/* Simulated Video Player Graphic */}
          <div className="flex flex-col items-center justify-center z-10 text-center px-6">
            <div className={`w-32 h-32 rounded-full border-4 ${isPlaying ? 'border-tiktok-cyan animate-spin' : 'border-gray-500'} flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-300 shadow-lg mb-4`}>
              <img
                src={product.image}
                alt={product.title}
                className={`w-24 h-24 rounded-full object-cover ${isPlaying ? 'rotate-reverse animate-pulse' : ''}`}
              />
            </div>
            <span className="bg-black/60 text-xs text-tiktok-cyan font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-tiktok-cyan/30 backdrop-blur-md">
              🎥 ВИДЕО-ОБЗОР ТОВАРА
            </span>
            <p className="text-white text-lg font-bold mt-3 drop-shadow-md line-clamp-2 max-w-sm">
              {product.title}
            </p>
            <p className="text-tiktok-pink text-2xl font-black mt-1 drop-shadow-md">
              {product.price.toLocaleString('ru-RU')} ₽
            </p>

            {/* Video Action Status */}
            <div className="mt-4 flex items-center space-x-2 text-white/70 text-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Идет воспроизведение по кругу</span>
            </div>
          </div>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {!isPlaying && (
            <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-white scale-110 opacity-100 transition-all">
              <Play size={32} className="ml-1 fill-white" />
            </div>
          )}
        </div>

        {/* Big Tap to Play/Pause Trigger */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full z-10 cursor-pointer focus:outline-none"
          aria-label="Пауза / Воспроизведение"
        />

        {/* Swipe Indicators */}
        <div className="absolute top-4 left-4 z-30 flex items-center space-x-2">
          <span className="bg-black/40 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-md border border-white/10 flex items-center space-x-1">
            <span className="text-avito-green font-bold">Ави</span>
            <span className="text-tiktok-pink font-bold">Ток</span>
          </span>
          <span className="bg-white/10 text-white/90 text-xs px-2.5 py-1 rounded-full backdrop-blur-md">
            {currentIndex + 1} из {products.length}
          </span>
        </div>

        {/* Floating Vertical Navigation Keys */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-3">
          <button
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
              currentIndex === 0
                ? 'bg-black/10 text-white/30 border-white/5 cursor-not-allowed'
                : 'bg-black/60 text-white border-white/20 hover:bg-tiktok-cyan/80 hover:text-black'
            }`}
          >
            <ChevronUp size={22} />
          </button>
          <button
            disabled={currentIndex === products.length - 1}
            onClick={handleNext}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
              currentIndex === products.length - 1
                ? 'bg-black/10 text-white/30 border-white/5 cursor-not-allowed'
                : 'bg-black/60 text-white border-white/20 hover:bg-tiktok-pink/80 hover:text-white'
            }`}
          >
            <ChevronDown size={22} />
          </button>
        </div>

        {/* Bottom Left Details Panel */}
        <div className="absolute bottom-4 left-4 right-16 z-30 text-white pointer-events-none drop-shadow-lg">
          <div className="flex items-center space-x-2 mb-2 pointer-events-auto">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-avito-blue to-avito-green flex items-center justify-center text-sm font-bold text-white border border-white/20">
              {product.sellerName.substring(0, 2)}
            </div>
            <div>
              <p className="text-sm font-semibold flex items-center">
                {product.sellerName}
                <span className="ml-1.5 bg-avito-blue text-[10px] text-white px-1.5 py-0.5 rounded font-black">PRO</span>
              </p>
              <p className="text-[10px] text-white/70">★ {product.sellerRating} ({product.sellerReviewsCount} отзывов)</p>
            </div>
          </div>
          <p className="text-sm font-bold mb-1 line-clamp-1 pointer-events-auto cursor-pointer" onClick={() => onOpenProduct(product)}>
            {product.title}
          </p>
          <p className="text-xs text-white/80 line-clamp-2 max-w-sm">
            {product.videoDescription}
          </p>
          <span className="inline-block mt-2 bg-black/40 text-[10px] text-white/90 px-2 py-0.5 rounded backdrop-blur-sm">
            📍 {product.location}
          </span>
        </div>

        {/* TikTok Sidebar Floating Action Buttons */}
        <div className="absolute bottom-4 right-4 z-30 flex flex-col items-center space-y-4">
          {/* Like / Favorite */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleLike(product.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                isFavorite
                  ? 'bg-tiktok-pink text-white'
                  : 'bg-black/60 text-white hover:text-tiktok-pink border border-white/10 backdrop-blur-md'
              }`}
            >
              <Heart size={24} className={isFavorite ? 'fill-current' : ''} />
            </button>
            <span className="text-xs text-white mt-1 font-semibold drop-shadow">{displayedLikes}</span>
          </div>

          {/* Comment */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowComments(true)}
              className="w-12 h-12 rounded-full bg-black/60 hover:text-tiktok-cyan border border-white/10 backdrop-blur-md text-white flex items-center justify-center shadow-lg"
            >
              <MessageCircle size={24} />
            </button>
            <span className="text-xs text-white mt-1 font-semibold drop-shadow">{currentProductComments.length}</span>
          </div>

          {/* Write Chat with Seller */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onOpenChat(product)}
              className="w-12 h-12 rounded-full bg-avito-blue hover:scale-105 text-white flex items-center justify-center shadow-lg border border-white/20 transition-all"
              title="Написать продавцу"
            >
              <Send size={20} className="translate-x-0.5 -translate-y-0.5" />
            </button>
            <span className="text-xs text-white mt-1 font-semibold drop-shadow">Чат</span>
          </div>

          {/* Add to Cart / Buy */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onAddToCart(product)}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border transition-all ${
                inCart
                  ? 'bg-avito-green text-white border-white/30'
                  : 'bg-white hover:bg-gray-100 text-black border-transparent hover:scale-105'
              }`}
              title="Добавить в корзину"
            >
              {inCart ? <Check size={22} className="stroke-[3]" /> : <ShoppingCart size={20} />}
            </button>
            <span className="text-xs text-white mt-1 font-semibold drop-shadow">Купить</span>
          </div>
        </div>
      </div>

      {/* Side Details and Interactive Comments Sidebar (visible on desktop alongside, on mobile as a bottom slide up drawer) */}
      {showComments && (
        <div className="absolute inset-0 md:relative md:w-80 h-full bg-white dark:bg-[#121216] border-l border-gray-200 dark:border-white/10 flex flex-col z-40 animate-slide-left">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center">
              Комментарии
              <span className="ml-2 px-2 py-0.5 bg-gray-100 dark:bg-white/5 rounded-full text-xs text-gray-500">
                {currentProductComments.length}
              </span>
            </h3>
            <button
              onClick={() => setShowComments(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs font-semibold px-2 py-1 bg-gray-50 dark:bg-white/5 rounded"
            >
              Закрыть
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentProductComments.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <MessageCircle size={32} className="mb-2 opacity-50" />
                <p className="text-xs">Комментариев пока нет.<br/>Будьте первым!</p>
              </div>
            ) : (
              currentProductComments.map((comment) => (
                <div key={comment.id} className="text-xs bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-gray-800 dark:text-gray-200">{comment.user}</span>
                    <span className="text-[10px] text-gray-400">{comment.time}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{comment.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="p-4 border-t border-gray-100 dark:border-white/10 flex items-center space-x-2 bg-gray-50 dark:bg-black/20">
            <input
              type="text"
              placeholder="Оставить комментарий..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-white dark:bg-white/5 text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-tiktok-pink"
            />
            <button
              type="submit"
              className="p-2 bg-tiktok-pink text-white rounded-xl hover:opacity-90 active:scale-95 transition-all"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

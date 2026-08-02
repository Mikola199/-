import React, { useState } from 'react';
import { X, Heart, MessageSquare, Phone, Eye, Calendar, ShieldCheck, MapPin, Video, ShoppingCart } from 'lucide-react';

export default function ProductDetailModal({
  product,
  onClose,
  onOpenChat,
  onOpenVideoFeed,
  favorites,
  onToggleFavorite,
  cartItems,
  onAddToCart
}) {
  const [showPhone, setShowPhone] = useState(false);

  if (!product) return null;

  const isFavorite = favorites.includes(product.id);
  const inCart = cartItems.some(item => item.id === product.id);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#121216] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative border border-gray-100 dark:border-white/10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">

        {/* Close Button floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left Side: Product Image Carousel & TikTok Shortcut */}
        <div className="md:w-1/2 relative bg-gray-50 dark:bg-black/30 flex flex-col justify-between h-[300px] md:h-auto min-h-[300px]">
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Favorites shortcut top-left */}
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
              isFavorite
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-black/40 text-white border-white/10 hover:text-red-400'
            }`}
          >
            <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
          </button>

          {/* Watch Video Shortcut overlay bottom */}
          <div className="absolute bottom-4 left-4 right-4 space-y-3 pointer-events-auto">
            <button
              onClick={() => {
                onClose();
                onOpenVideoFeed(product);
              }}
              className="w-full bg-tiktok-pink hover:bg-tiktok-pink/90 text-white font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95 border border-tiktok-pink/20"
            >
              <Video size={16} className="text-tiktok-cyan animate-pulse" />
              <span>СМОТРЕТЬ ВИДЕО-ОБЗОР В АВИТОК</span>
            </button>
          </div>
        </div>

        {/* Right Side: Details and Actions */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Meta info / Date and Category */}
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span className="bg-gray-100 dark:bg-white/5 px-2 py-1 rounded font-medium text-gray-600 dark:text-gray-300">
                {product.category}
              </span>
              <span className="flex items-center">
                <Calendar size={11} className="mr-1" />
                {product.dateAdded}
              </span>
            </div>

            {/* Title & Price */}
            <div className="space-y-1.5">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                {product.title}
              </h1>
              <div className="flex items-baseline space-x-3">
                <p className="text-2xl font-black text-avito-blue">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>
                <span className="text-xs text-gray-400">В наличии</span>
              </div>
            </div>

            {/* Specs Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl flex items-center space-x-2 border border-gray-100 dark:border-white/5">
                <span className="text-gray-400 font-medium">Состояние:</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{product.condition}</span>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl flex items-center space-x-2 border border-gray-100 dark:border-white/5">
                <span className="text-gray-400 font-medium">Просмотры:</span>
                <span className="font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Eye size={11} className="mr-1 opacity-70" />
                  {product.views}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider">Описание товара</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto pr-1">
                {product.description}
              </p>
            </div>

            {/* Seller Info Container */}
            <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-avito-blue text-white font-bold flex items-center justify-center text-sm">
                  {product.sellerName.substring(0, 2)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">{product.sellerName}</h4>
                  <div className="flex items-center text-[10px] text-gray-500 space-x-1.5 mt-0.5">
                    <span className="text-yellow-500 font-bold">★ {product.sellerRating}</span>
                    <span>•</span>
                    <span>{product.sellerReviewsCount} отзывов</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-[10px] text-green-600 dark:text-green-400 font-semibold bg-green-500/10 px-2 py-1 rounded">
                <ShieldCheck size={12} className="mr-1" />
                Проверен
              </div>
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-white/5">
            {/* Show/Hide Phone */}
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="w-full bg-avito-green hover:bg-avito-green/95 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors"
            >
              <Phone size={16} />
              <span>{showPhone ? product.phone : "Показать номер телефона"}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenChat(product);
                }}
                className="bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-avito-blue border border-avito-blue/30 dark:border-white/10 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
              >
                <MessageSquare size={14} />
                <span>Написать в чат</span>
              </button>

              <button
                onClick={() => onAddToCart(product)}
                className={`text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-colors ${
                  inCart
                    ? 'bg-avito-green text-white hover:bg-avito-green/90'
                    : 'bg-avito-blue text-white hover:bg-avito-blue/95'
                }`}
              >
                <ShoppingCart size={14} />
                <span>{inCart ? "Добавлено" : "В корзину"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Search, MapPin, Eye, Calendar, User, Phone, Play, ChevronRight, X, MessageSquare, Star } from 'lucide-react';

function Catalog({ products, categories, onProductClick }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Top Search Banner */}
      <div className="bg-white px-4 pt-3 pb-2 border-b border-slate-200 shrink-0 shadow-xs">
        <div className="relative flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск объявлений (например, Porsche, iPhone...)"
            className="bg-transparent border-none outline-none text-sm text-slate-800 w-full placeholder-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-slate-200 rounded-full">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          )}
        </div>

        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar shrink-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isSelected
                    ? 'bg-[#00B2FF] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Products */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onProductClick(prod)}
                className="bg-white rounded-2xl border border-slate-200/85 overflow-hidden flex flex-col cursor-pointer shadow-xs hover:shadow-md transition duration-150"
              >
                {/* Image Container with Watch Review Overlaid Bubble */}
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover"
                  />
                  {/* TikTok style Badge indicating video review is available */}
                  <div className="absolute top-2 right-2 bg-black/75 hover:bg-[#00B2FF] text-white flex items-center gap-1 py-1 px-2.5 rounded-full backdrop-blur-xs transition">
                    <Play className="w-3 h-3 fill-white text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Обзор</span>
                  </div>
                </div>

                {/* Listing Details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug min-h-[2.5rem]">
                      {prod.title}
                    </h3>
                    <p className="font-extrabold text-[#00B2FF] text-base mt-1.5">
                      {prod.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex flex-col gap-1">
                    <span className="flex items-center gap-1 font-medium truncate">
                      <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                      {prod.location.split(',')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {prod.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
            <p className="font-semibold text-base">Ничего не найдено</p>
            <p className="text-xs mt-1">Попробуйте изменить параметры поиска или категорию.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductDetailsDrawer({ product, onClose, onChatClick, onWatchReview }) {
  const [showFullPhone, setShowFullPhone] = useState(false);

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-end justify-center select-none animate-fade-in">
      <div className="bg-white rounded-t-3xl max-h-[92%] w-full flex flex-col text-slate-800 pb-safe shadow-2xl animate-slide-up">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0">
          <h3 className="font-extrabold text-lg text-slate-900">Детали объявления</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
          {/* Main Visuals with Review Play Banner */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100">
            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
            <button
              onClick={onWatchReview}
              className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center gap-2 text-white hover:bg-black/45 transition"
            >
              <div className="bg-[#00B2FF] p-3 rounded-full shadow-lg scale-110 active:scale-95 transition duration-100">
                <Play className="w-6 h-6 fill-black text-black" />
              </div>
              <span className="font-extrabold text-sm uppercase tracking-wider drop-shadow-md">
                Смотреть видеообзор товара
              </span>
            </button>
          </div>

          {/* Pricing & Metadata Title */}
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 leading-snug">
              {product.title}
            </h1>
            <p className="text-2xl font-black text-[#00B2FF] mt-2">
              {product.price.toLocaleString('ru-RU')} ₽
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {product.location}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {product.date}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {product.views.toLocaleString()} просмотров
              </span>
            </div>
          </div>

          {/* Seller Block */}
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={product.seller.avatar}
                alt={product.seller.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1">
                  {product.seller.name}
                  {product.seller.isVerified && (
                    <span className="bg-[#00B2FF]/10 text-[#00B2FF] text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                      Проверен
                    </span>
                  )}
                </h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-slate-700">{product.seller.rating}</span>
                  <span className="text-xs text-slate-400">({product.seller.reviewsCount} отзывов)</span>
                </div>
              </div>
            </div>
            <div className="text-slate-400">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 mb-2 uppercase tracking-wide">
              Описание товара
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>

        {/* Bottom Actions Drawer */}
        <div className="p-4 border-t border-slate-100 shrink-0 bg-white flex gap-3">
          <button
            onClick={() => setShowFullPhone(!showFullPhone)}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Phone className="w-4 h-4 text-slate-500" />
            {showFullPhone ? product.seller.phone : 'Показать телефон'}
          </button>

          <button
            onClick={() => onChatClick(product)}
            className="flex-1 bg-[#00B2FF] hover:bg-[#0092d0] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            Написать сообщение
          </button>
        </div>
      </div>
    </div>
  );
}

export default Catalog;

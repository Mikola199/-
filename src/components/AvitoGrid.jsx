import React, { useState } from 'react';
import { Search, SlidersHorizontal, Heart, MessageSquare, Video, Filter, Grid, List } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function AvitoGrid({
  products,
  onOpenProduct,
  onOpenVideoFeed,
  favorites,
  onToggleFavorite,
  cartItems,
  onAddToCart
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [maxPrice, setMaxPrice] = useState("");
  const [viewType, setViewType] = useState("grid"); // grid | list
  const [showFilters, setShowFilters] = useState(false);

  // Filter listings
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || product.category === selectedCategory;
    const matchesPrice = !maxPrice || product.price <= parseInt(maxPrice);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white dark:bg-[#121216] p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Поиск объявлений (например: iPhone, Camry, квартира...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/5 pl-10 pr-4 py-2.5 rounded-xl text-sm border border-gray-100 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-avito-blue transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl border transition-all ${
              showFilters
                ? 'bg-avito-blue/10 border-avito-blue/30 text-avito-blue'
                : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-500 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* Categories Carousel */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-avito-blue text-white shadow-sm shadow-avito-blue/20'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Detailed Filters Drawer */}
        {showFilters && (
          <div className="pt-3 border-t border-gray-100 dark:border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500">Максимальная цена (₽)</label>
              <input
                type="number"
                placeholder="Любая цена"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg text-xs border border-gray-100 dark:border-white/5 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500">Сортировка</label>
              <select className="w-full bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg text-xs border border-gray-100 dark:border-white/5 focus:outline-none text-gray-700 dark:text-gray-200">
                <option>По умолчанию</option>
                <option>Дешевле</option>
                <option>Дороже</option>
                <option>По дате</option>
              </select>
            </div>

            <div className="flex items-end justify-between space-x-2">
              <div className="flex bg-gray-100 dark:bg-white/5 rounded-lg p-0.5 border border-gray-200/50 dark:border-white/5">
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-1.5 rounded-md ${viewType === "grid" ? 'bg-white dark:bg-white/10 text-avito-blue shadow-sm' : 'text-gray-400'}`}
                >
                  <Grid size={14} />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-1.5 rounded-md ${viewType === "list" ? 'bg-white dark:bg-white/10 text-avito-blue shadow-sm' : 'text-gray-400'}`}
                >
                  <List size={14} />
                </button>
              </div>

              <button
                onClick={() => {
                  setMaxPrice("");
                  setSelectedCategory("Все");
                  setSearchQuery("");
                }}
                className="text-xs text-red-500 hover:underline font-medium"
              >
                Сбросить фильтры
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-800 dark:text-white flex items-center">
          Рекомендации для вас
          <span className="ml-2.5 px-2 py-0.5 bg-avito-blue/10 text-avito-blue text-xs rounded-full">
            {filteredProducts.length}
          </span>
        </h2>
      </div>

      {/* Grid Content */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-[#121216] rounded-2xl border border-gray-100 dark:border-white/5 p-12 text-center text-gray-400">
          <SlidersHorizontal size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-semibold text-gray-500">Ничего не найдено</p>
          <p className="text-xs mt-1">Попробуйте изменить запрос или сбросить фильтры.</p>
        </div>
      ) : (
        <div className={viewType === "grid"
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          : "space-y-3"
        }>
          {filteredProducts.map((product) => {
            const isFavorite = favorites.includes(product.id);
            const inCart = cartItems.some(item => item.id === product.id);

            if (viewType === "list") {
              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-[#121216] rounded-2xl border border-gray-100 dark:border-white/5 p-3 flex space-x-4 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 dark:bg-white/5 rounded-xl overflow-hidden" onClick={() => onOpenProduct(product)}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />

                    {/* Live TikTok Indicator */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenVideoFeed(product);
                      }}
                      className="absolute bottom-1.5 left-1.5 bg-black/70 hover:bg-tiktok-pink text-white text-[10px] px-2 py-1 rounded-full flex items-center space-x-1 backdrop-blur-md transition-colors"
                    >
                      <Video size={10} className="text-tiktok-cyan" />
                      <span className="font-bold">АвиТок</span>
                    </button>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div onClick={() => onOpenProduct(product)}>
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate pr-4 group-hover:text-avito-blue transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm font-black text-gray-900 dark:text-white whitespace-nowrap">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">📍 {product.location} • {product.dateAdded}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">{product.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-50 dark:border-white/5">
                      <div className="flex items-center space-x-2 text-[11px] text-gray-400">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">★ {product.sellerRating}</span>
                        <span>{product.sellerName}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onToggleFavorite(product.id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isFavorite
                              ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30 text-red-500'
                              : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Heart size={14} className={isFavorite ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={() => onAddToCart(product)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
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
                </div>
              );
            }

            // Grid Layout Card
            return (
              <div
                key={product.id}
                className="bg-white dark:bg-[#121216] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-md transition-all flex flex-col cursor-pointer group relative"
              >
                {/* Favorites button floating */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product.id);
                  }}
                  className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md shadow-sm border transition-all ${
                    isFavorite
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'bg-black/40 border-white/10 text-white/90 hover:bg-black/60 hover:text-red-400'
                  }`}
                >
                  <Heart size={14} className={isFavorite ? 'fill-current' : ''} />
                </button>

                {/* Listing Image container */}
                <div className="relative aspect-square w-full bg-gray-50 dark:bg-white/5 overflow-hidden" onClick={() => onOpenProduct(product)}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* TikTok vertical video badge */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenVideoFeed(product);
                    }}
                    className="absolute bottom-2 left-2 bg-black/70 hover:bg-tiktok-pink text-white text-[10px] px-2.5 py-1.5 rounded-full flex items-center space-x-1 backdrop-blur-md border border-white/5 transition-colors"
                  >
                    <Video size={11} className="text-tiktok-cyan animate-pulse" />
                    <span className="font-extrabold tracking-wide">Смотреть АвиТок</span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div onClick={() => onOpenProduct(product)} className="space-y-1">
                    <p className="text-base font-black text-gray-900 dark:text-white leading-tight">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </p>
                    <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug group-hover:text-avito-blue transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                      📍 {product.location}
                    </p>

                    <div className="flex items-center justify-between pt-1.5 border-t border-gray-50 dark:border-white/5">
                      <span className="text-[10px] text-gray-400 truncate max-w-[80px]">
                        {product.sellerName}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

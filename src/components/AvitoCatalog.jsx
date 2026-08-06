import React from 'react';
import { Search, Play, SlidersHorizontal, MapPin, Calendar, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

function AvitoCatalog({
  listings,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onSelectListing,
  onWatchVideo
}) {
  // Filter listings based on search and category
  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Helper to format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Search Bar Block */}
      <div className="bg-white px-4 py-3 shadow-xs border-b border-gray-100 sticky top-0 z-5 shrink-0">
        <div className="relative flex items-center bg-gray-100 rounded-xl px-3 py-2 border border-transparent focus-within:border-indigo-500 focus-within:bg-white transition-all">
          <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск вещей, авто, услуг..."
            className="w-full bg-transparent text-sm font-medium focus:outline-none text-gray-800"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-gray-600 font-bold text-xs bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center transition-all ml-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Scroll Categories */}
      <div className="bg-white py-2.5 px-4 overflow-x-auto no-scrollbar flex space-x-2 shrink-0 border-b border-gray-100">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Grid of Classifieds */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-12">
        {filteredListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <p className="text-gray-500 font-medium text-sm">Ничего не найдено</p>
            <p className="text-gray-400 text-xs mt-1">Попробуйте изменить поисковый запрос</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredListings.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-100 shadow-xs flex flex-col group cursor-pointer transition-all active:scale-98"
                onClick={() => onSelectListing(item)}
              >
                {/* Product Image and Indicators */}
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Video availability label */}
                  {item.videoId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onWatchVideo(item.videoId);
                      }}
                      className="absolute bottom-2 left-2 bg-black/75 hover:bg-indigo-600 text-white text-[10px] font-bold py-1 px-2.5 rounded-full flex items-center space-x-1 backdrop-blur-xs transition-colors"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Видео</span>
                    </button>
                  )}
                  {/* Verified badge for seller */}
                  {item.seller?.isVerified && (
                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                      Проверен
                    </span>
                  )}
                </div>

                {/* Listing Details */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Price */}
                    <div className="font-extrabold text-[15px] text-gray-900 mb-1 leading-none">
                      {formatPrice(item.price)}
                    </div>
                    {/* Title */}
                    <h3 className="text-xs font-semibold text-gray-700 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Location & Date footer */}
                  <div className="mt-2.5 pt-2 border-t border-gray-50 flex flex-col space-y-0.5 text-[9px] text-gray-400 font-medium">
                    <span className="truncate flex items-center">
                      <MapPin className="w-2.5 h-2.5 text-gray-300 mr-0.5 shrink-0" />
                      {item.location.split(',')[0]}
                    </span>
                    <span className="truncate flex items-center">
                      <Calendar className="w-2.5 h-2.5 text-gray-300 mr-0.5 shrink-0" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvitoCatalog;

import React from 'react';
import { Search, MapPin, Tag, Calendar, Sparkles } from 'lucide-react';
import { MOCK_CATEGORIES } from '../mockData';

export default function Catalog({
  listings,
  onOpenDetails,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}) {
  // Filter search and categories
  const filteredListings = listings.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-lg text-left">
        <h2 className="text-2xl md:text-3.5xl font-black mb-3 tracking-tight flex items-center gap-2">
          АвиТок <Sparkles className="w-6 h-6 animate-pulse" />
        </h2>
        <p className="text-sm md:text-base text-teal-50/90 mb-6 font-light">
          Покупайте товары по видео-обзорам и классическим объявлениям в одном месте!
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl bg-white text-gray-900 rounded-2xl flex items-center shadow-md border border-neutral-100 overflow-hidden">
          <div className="pl-4 text-neutral-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Поиск объявлений (например: iPhone, BMW, квартира...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-4 text-sm focus:outline-none placeholder-neutral-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 text-xs text-neutral-400 hover:text-neutral-600 font-semibold"
            >
              Очистить
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8 -mx-4 px-4">
        {MOCK_CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer active:scale-95 border ${
              selectedCategory === category.id
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                : 'bg-white text-gray-700 hover:bg-neutral-50 border-neutral-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Main Grid View */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-extrabold text-neutral-900">
            Рекомендации для вас ({filteredListings.length})
          </h3>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-bold transition"
            >
              Сбросить фильтр
            </button>
          )}
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-100 shadow-sm p-6">
            <p className="text-neutral-500 text-sm mb-2">Ничего не найдено по вашему запросу.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-xs text-emerald-500 font-bold hover:underline"
            >
              Очистить поиск и фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredListings.map(item => (
              <div
                key={item.id}
                onClick={() => onOpenDetails(item)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col cursor-pointer group hover:-translate-y-1"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {/* Video Badge */}
                  {item.videoUrl && (
                    <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[9px] font-black uppercase px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      Видео
                    </span>
                  )}
                  {/* Category Tag */}
                  <span className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-md">
                    {MOCK_CATEGORIES.find(c => c.id === item.category)?.name || 'Объявление'}
                  </span>
                </div>

                {/* Listing Metadata details */}
                <div className="p-3.5 flex-1 flex flex-col text-left">
                  <h4 className="text-xs md:text-sm text-neutral-800 font-semibold line-clamp-2 leading-snug min-h-[36px] mb-1.5 group-hover:text-emerald-600 transition">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-base font-extrabold text-neutral-900 mb-2">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </p>

                  <div className="mt-auto space-y-1">
                    <p className="text-[10px] text-neutral-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                    <p className="text-[9px] text-neutral-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                      <span>{item.date}</span>
                    </p>
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

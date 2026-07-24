import { useState, useMemo } from 'react';
import { Listing } from '../types';
import { CATEGORIES } from '../data';
import { Search, MapPin, Heart, Play, SlidersHorizontal } from 'lucide-react';

interface AvitoGridProps {
  listings: Listing[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onOpenProduct: (product: Listing) => void;
  onOpenVideo: (listingId: string) => void;
  hideHeaderFilters?: boolean;
}

export default function AvitoGrid({
  listings,
  favorites,
  toggleFavorite,
  onOpenProduct,
  onOpenVideo,
  hideHeaderFilters = false
}: AvitoGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedLocation, setSelectedLocation] = useState('Все регионы');
  const [sortBy, setSortBy] = useState<'date' | 'price_asc' | 'price_desc'>('date');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const locations = ['Все регионы', 'Москва', 'Санкт-Петербург', 'Екатеринбург', 'Краснодар'];

  // Advanced Filtering
  const filteredListings = useMemo(() => {
    return listings
      .filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
        const matchesLocation = selectedLocation === 'Все регионы' || item.location.includes(selectedLocation);
        return matchesSearch && matchesCategory && matchesLocation;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return b.id.localeCompare(a.id); // Default/Date sorting mock
      });
  }, [listings, searchTerm, selectedCategory, selectedLocation, sortBy]);

  return (
    <div className="w-full flex flex-col bg-gray-50 min-h-full">

      {/* Filters & Search Header */}
      {!hideHeaderFilters && (
        <div className="bg-white border-b sticky top-0 z-30 shadow-xs flex flex-col">

          {/* Main Search Bar Row */}
          <div className="p-3 flex gap-2 items-center">
            <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2 flex items-center gap-2 border border-gray-200 focus-within:border-blue-500 transition-all">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Поиск по объявлениям..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm border-none outline-none text-gray-800"
              />
            </div>

            {/* Location selector pill */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold hover:bg-gray-100 transition shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span className="truncate max-w-[80px] text-gray-700">{selectedLocation}</span>
            </button>
          </div>

          {/* Quick Categories Bar */}
          <div className="flex items-center gap-2 overflow-x-auto px-3 pb-3 pt-1 no-scrollbar scroll-smooth">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sorter and Status Counter row */}
          <div className="px-3 py-2 border-t bg-gray-50/50 flex items-center justify-between">
            <span className="text-[11px] text-gray-500 font-medium">
              Найдено: {filteredListings.length}
            </span>

            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-gray-700 cursor-pointer outline-none focus:text-blue-600"
              >
                <option value="date">Сначала новые</option>
                <option value="price_asc">Дешевле</option>
                <option value="price_desc">Дороже</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Grid Content Listings */}
      {filteredListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <Search className="w-12 h-12 text-gray-300 mb-3" />
          <h3 className="text-base font-bold text-gray-700">Ничего не найдено</h3>
          <p className="text-xs text-gray-500 mt-1">Попробуйте изменить поисковый запрос или категорию фильтрации</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 p-3">
          {filteredListings.map(item => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col group hover:shadow-md transition duration-200 relative"
              >
                {/* Media Preview Image with optional Video/Play tag */}
                <div
                  onClick={() => onOpenProduct(item)}
                  className="w-full aspect-square bg-gray-100 relative overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play AviTok Tag if video is present */}
                  {item.videoUrl && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenVideo(item.id);
                      }}
                      className="absolute bottom-2 left-2 flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-black text-[9px] px-2 py-1 rounded-full shadow-lg border border-pink-400/30 hover:brightness-110 active:scale-95 transition"
                    >
                      <Play className="w-2.5 h-2.5 fill-white stroke-none animate-pulse" />
                      Смотреть
                    </button>
                  )}

                  {/* Heart / Favorite Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-md transition-all active:scale-90"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600'}`} />
                  </button>
                </div>

                {/* Details Area */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Price */}
                    <div className="text-sm font-black text-gray-900">
                      {item.price.toLocaleString('ru-RU')} ₽
                    </div>

                    {/* Title */}
                    <h4
                      onClick={() => onOpenProduct(item)}
                      className="text-xs text-gray-700 font-semibold line-clamp-2 mt-1 cursor-pointer hover:text-blue-600 transition"
                    >
                      {item.title}
                    </h4>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex flex-col gap-0.5">
                    {/* Delivery badge */}
                    {item.hasDelivery && (
                      <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 self-start px-1.5 py-0.5 rounded">
                        Доставка Авито
                      </span>
                    )}

                    {/* Location */}
                    <span className="text-[9px] text-gray-400 font-medium truncate">
                      {item.location.split(',')[0]}
                    </span>

                    {/* Date */}
                    <span className="text-[8px] text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Location Filter Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-4 text-gray-900 shadow-2xl">
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-1.5">
              <MapPin className="w-5 h-5 text-blue-600" />
              Выберите город
            </h3>

            <div className="flex flex-col gap-1">
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationModal(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition ${
                    selectedLocation === loc
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowLocationModal(false)}
              className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs rounded-xl transition"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

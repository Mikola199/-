import React, { useState } from 'react';
import { X, Phone, MessageSquare, Play, Star, MapPin, Calendar, Eye, Heart, ShieldAlert } from 'lucide-react';

function ListingDetailModal({ listing, onClose, onStartChat, onWatchVideo }) {
  const [showPhone, setShowPhone] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Helper to format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-40 flex flex-col justify-end">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Modal Container */}
      <div className="bg-white rounded-t-3xl max-h-[92%] overflow-y-auto flex flex-col animate-slide-up pb-8">

        {/* Sticky Header */}
        <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
          <span className="font-bold text-sm text-gray-800">Объявление</span>
          <button
            onClick={onClose}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 px-4 py-4 space-y-5">

          {/* Main Image Banner */}
          <div className="relative aspect-video w-full rounded-2xl bg-gray-100 overflow-hidden shadow-xs">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.videoId && (
              <button
                onClick={() => onWatchVideo(listing.videoId)}
                className="absolute top-3 right-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-md transition-colors animate-pulse"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Смотреть обзор</span>
              </button>
            )}
          </div>

          {/* Title and Price Info */}
          <div>
            <div className="text-2xl font-black text-gray-950 tracking-tight leading-none">
              {formatPrice(listing.price)}
            </div>
            <h1 className="text-lg font-bold text-gray-800 mt-2 leading-snug">
              {listing.title}
            </h1>
            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400 font-medium">
              <span className="flex items-center">
                <Eye className="w-3.5 h-3.5 mr-1 text-gray-300" />
                {listing.viewsCount} просмотров
              </span>
              <span className="flex items-center">
                <Heart className="w-3.5 h-3.5 mr-1 text-gray-300" />
                {listing.favoritesCount} в избранном
              </span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Seller Profile Card */}
          <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={listing.seller.avatar}
                alt={listing.seller.name}
                className="w-11 h-11 rounded-full object-cover border border-white shadow-xs shrink-0"
              />
              <div>
                <div className="flex items-center">
                  <span className="font-bold text-sm text-gray-800 mr-1.5">
                    {listing.seller.name}
                  </span>
                  {listing.seller.isVerified && (
                    <span className="bg-indigo-50 text-indigo-700 text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                      ✓ Паспорт проверен
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1 text-xs font-semibold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{listing.seller.rating}</span>
                  <span className="text-gray-400 font-normal ml-1">
                    ({listing.seller.reviewsCount} отзывов)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div className="space-y-2">
            <h2 className="font-bold text-sm text-gray-900 uppercase tracking-wider text-xs">
              Описание
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed font-normal whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Location and Date details */}
          <div className="space-y-2.5 text-xs text-gray-500 font-medium">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-gray-400 mr-2 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800">Адрес сделки</p>
                <p className="mt-0.5 text-gray-500">{listing.location}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="w-4 h-4 text-gray-400 mr-2 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-800">Опубликовано</p>
                <p className="mt-0.5 text-gray-500">{listing.date}</p>
              </div>
            </div>
          </div>

          {/* Safety Warning */}
          <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-100 flex items-start space-x-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-800 leading-relaxed font-medium">
              <p className="font-bold">Безопасность сделок</p>
              <p className="mt-0.5">Никогда не отправляйте предоплату незнакомцам. Договаривайтесь о личной встрече для проверки товара перед оплатой.</p>
            </div>
          </div>

        </div>

        {/* Sticky Action Footer (Phone Reveal & Active Chat Trigger) */}
        <div className="px-4 pt-3.5 border-t border-gray-100 shrink-0 sticky bottom-0 bg-white flex flex-col space-y-2.5">
          {/* Phone Number Indicator */}
          {showPhone && (
            <div className="bg-emerald-50 text-emerald-800 text-center py-2.5 rounded-xl border border-emerald-200 font-extrabold text-sm animate-fade-in">
              ☎ {listing.phone}
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>{showPhone ? 'Скрыть телефон' : 'Показать телефон'}</span>
            </button>

            <button
              onClick={() => onStartChat(listing)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Написать продавцу</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ListingDetailModal;

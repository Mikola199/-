import React, { useState } from 'react';
import { Star, Award, Settings, Wallet, Heart, Grid, Play, ShieldAlert, BadgeCheck } from 'lucide-react';

function UserProfile({ currentUser, listings, videos, onSelectListing, onWatchVideo }) {
  const [activeSubTab, setActiveSubTab] = useState('listings'); // listings or favorites

  // Get user's own listings
  const myOwnListings = listings.filter(l => currentUser.listedItems.includes(l.id) || l.seller.name.includes('Вы'));

  // Get user's favorited listings
  const favoritedListings = listings.filter(l => currentUser.savedItems.includes(l.id));

  // Helper to format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="bg-gray-50 h-full flex flex-col">
      {/* Profile Header Stats */}
      <div className="bg-white px-4 py-5 border-b border-gray-100 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-50 shadow-md shrink-0"
            />
            <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-1 border border-white">
              <BadgeCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <h2 className="font-extrabold text-base text-gray-950 flex items-center">
              {currentUser.name}
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-md ml-2 border border-emerald-100">
                Частное лицо
              </span>
            </h2>

            {/* Rating Stars */}
            <div className="flex items-center mt-1 text-xs font-semibold text-amber-500">
              <div className="flex mr-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>{currentUser.rating.toFixed(1)}</span>
              <span className="text-gray-400 font-normal ml-1">
                ({currentUser.reviewsCount} отзыва)
              </span>
            </div>
          </div>
        </div>

        {/* Balance Wallet Component */}
        <div className="bg-indigo-50/50 rounded-2xl p-3.5 border border-indigo-100/50 flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2.5">
            <Wallet className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-500 font-medium">Кошелек AviTok</p>
              <p className="text-sm font-extrabold text-indigo-950">{currentUser.balance}</p>
            </div>
          </div>
          <button
            onClick={() => alert('Пополнение кошелька временно недоступно в демо-версии')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm cursor-pointer"
          >
            Пополнить
          </button>
        </div>
      </div>

      {/* Segmented Subtabs selector */}
      <div className="bg-white border-b border-gray-100 px-4 py-1 flex shrink-0">
        <button
          onClick={() => setActiveSubTab('listings')}
          className={`flex-1 text-center py-3 text-xs font-bold border-b-2 flex items-center justify-center space-x-1.5 transition-all ${
            activeSubTab === 'listings'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Мои объявления ({myOwnListings.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`flex-1 text-center py-3 text-xs font-bold border-b-2 flex items-center justify-center space-x-1.5 transition-all ${
            activeSubTab === 'favorites'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Избранное ({favoritedListings.length})</span>
        </button>
      </div>

      {/* Subtab content stream */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-12">
        {activeSubTab === 'listings' ? (
          myOwnListings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-xs">У вас пока нет поданных объявлений</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myOwnListings.map(item => (
                <div
                  key={item.id}
                  onClick={() => onSelectListing(item)}
                  className="bg-white rounded-2xl border border-gray-100 p-2.5 flex items-center space-x-3 cursor-pointer shadow-xs active:scale-99 transition-transform"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-50"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs font-extrabold text-indigo-600 mt-1">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1.5 text-[9px] text-gray-400 font-semibold">
                      <span>{item.location.split(',')[0]}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                  {item.videoId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onWatchVideo(item.videoId);
                      }}
                      className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          favoritedListings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-xs">В избранном пока ничего нет</p>
            </div>
          ) : (
            <div className="space-y-3">
              {favoritedListings.map(item => (
                <div
                  key={item.id}
                  onClick={() => onSelectListing(item)}
                  className="bg-white rounded-2xl border border-gray-100 p-2.5 flex items-center space-x-3 cursor-pointer shadow-xs active:scale-99 transition-transform"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-50"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs font-extrabold text-indigo-600 mt-1">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1.5 text-[9px] text-gray-400 font-semibold">
                      <span>{item.location.split(',')[0]}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                  {item.videoId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onWatchVideo(item.videoId);
                      }}
                      className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default UserProfile;

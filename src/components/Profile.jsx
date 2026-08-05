import React from 'react';
import { Star, ShieldAlert, Heart, Coins, ShoppingBag, Eye, Calendar, Award, LogOut, CheckCircle } from 'lucide-react';

function Profile({ profile, products }) {
  // Count user listings matching current user name
  const userListings = products.filter(p => p.seller.name.includes('Вы'));

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full border-2 border-[#00B2FF] object-cover shadow-md"
            />
            {profile.isPremium && (
              <span className="absolute -bottom-1 -right-1 bg-[#00B2FF] text-black text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-0.5">
                <Award className="w-3 h-3" /> PRO
              </span>
            )}
          </div>
          <div>
            <h2 className="font-extrabold text-lg flex items-center gap-1">
              {profile.name}
              <CheckCircle className="w-4 h-4 text-[#00B2FF] fill-[#00B2FF]/10 shrink-0" />
            </h2>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-slate-100">{profile.rating}</span>
              <span className="text-xs text-slate-400">({profile.reviewsCount} отзывов)</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">{profile.joinedDate}</p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {/* Quick balance stats block */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
            <div className="bg-[#00B2FF]/10 p-2.5 rounded-xl text-[#00B2FF] shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Кошелек</p>
              <p className="text-base font-black text-slate-900">{profile.balance.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
            <div className="bg-purple-100 p-2.5 rounded-xl text-purple-600 shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Продажи</p>
              <p className="text-base font-black text-slate-900">{userListings.length} объявл.</p>
            </div>
          </div>
        </div>

        {/* Global Stats List Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <h3 className="font-extrabold text-xs text-slate-800 mb-3 uppercase tracking-wider">Статистика просмотров</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="border-r border-slate-100 p-2">
              <span className="text-lg font-black text-slate-900">{profile.viewsCount}</span>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Просмотры</p>
            </div>
            <div className="border-r border-slate-100 p-2">
              <span className="text-lg font-black text-slate-900">{profile.likedListingsCount}</span>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">В избранном</p>
            </div>
            <div className="p-2">
              <span className="text-lg font-black text-[#00B2FF]">{profile.rating} ★</span>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Рейтинг</p>
            </div>
          </div>
        </div>

        {/* Current Active Listings published by current user */}
        <div>
          <h3 className="font-extrabold text-sm text-slate-950 mb-2.5">
            Ваши активные объявления ({userListings.length})
          </h3>

          <div className="space-y-2">
            {userListings.map(prod => (
              <div
                key={prod.id}
                className="bg-white border border-slate-200 rounded-xl p-3 flex gap-3 shadow-xs items-center"
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="w-16 h-16 rounded-lg object-cover bg-slate-50 shrink-0 border border-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate leading-snug">
                    {prod.title}
                  </h4>
                  <p className="text-xs font-extrabold text-[#00B2FF] mt-1">
                    {prod.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                    <Eye className="w-3.5 h-3.5" /> {prod.views} просмотров
                  </p>
                </div>
              </div>
            ))}
            {userListings.length === 0 && (
              <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 p-6 text-slate-400">
                <p className="font-semibold text-xs">У вас пока нет опубликованных товаров.</p>
                <p className="text-[10px] text-slate-400 mt-1">Создайте первое объявление в меню "Создать"!</p>
              </div>
            )}
          </div>
        </div>

        {/* Support Services Links */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between py-1.5 border-b border-slate-50 cursor-pointer">
            <span className="text-xs font-bold text-slate-700">Управление продвижением (AviTok-Буст)</span>
            <span className="bg-[#00B2FF]/15 text-[#00B2FF] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              Активно
            </span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-slate-50 cursor-pointer">
            <span className="text-xs font-bold text-slate-700">Настройки приватности и звонков</span>
          </div>
          <div className="flex items-center justify-between py-1.5 cursor-pointer text-red-500">
            <span className="text-xs font-bold flex items-center gap-1">
              <LogOut className="w-4 h-4" /> Выйти из аккаунта
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

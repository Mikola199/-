import { useState } from 'react';
import { Listing } from '../types';
import { Wallet, Star, ShieldCheck, Award, ArrowUpRight, Check } from 'lucide-react';

interface ProfileProps {
  listings: Listing[];
}

export default function Profile({ listings }: ProfileProps) {
  const [copiedWallet, setCopiedWallet] = useState(false);
  const myOwnListings = listings.filter(l => l.seller.id === 'user_self');

  const handleCopyWallet = () => {
    navigator.clipboard.writeText('0xAv1T0k777B9cE24D98fF75a6c3f098').then(() => {
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    });
  };

  return (
    <div className="w-full min-h-full bg-gray-50 flex flex-col text-gray-900 pb-12">

      {/* Dynamic Profile Cover / Avatar */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-6 text-white text-center flex flex-col items-center relative shadow-md">
        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
            alt="My Avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-white/80 shadow-xl group-hover:scale-105 transition"
          />
          <div className="absolute bottom-0 right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
          </div>
        </div>

        <h2 className="text-lg font-black mt-3">Ваш Магазин</h2>
        <p className="text-xs text-blue-100 font-medium mt-0.5">В эфире АвиТок с 2024 года</p>

        {/* Dynamic Verification Badges */}
        <div className="flex gap-2 mt-4">
          <span className="bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md flex items-center gap-1 border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
            Паспорт проверен
          </span>
          <span className="bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md flex items-center gap-1 border border-white/15">
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            Рейтинг 5.0
          </span>
        </div>
      </div>

      {/* Profile Analytics Summary */}
      <div className="p-4 grid grid-cols-2 gap-3 -mt-3.5 z-10">

        {/* AviWallet Token Card */}
        <div className="bg-white rounded-2xl p-3.5 shadow-md border border-gray-100/50 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-gray-400 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider">АвиКошелек</span>
              <Wallet className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-lg font-black text-gray-900">4,500 ATK</div>
            <p className="text-[9px] text-gray-500 mt-1 truncate">Адрес: 0xAv1T...098</p>
          </div>

          <button
            onClick={handleCopyWallet}
            className="mt-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-[10px] font-bold rounded-lg text-gray-700 transition flex items-center justify-center gap-1"
          >
            {copiedWallet ? 'Адрес скопирован!' : 'Скопировать адрес'}
          </button>
        </div>

        {/* Video Views analytics */}
        <div className="bg-white rounded-2xl p-3.5 shadow-md border border-gray-100/50 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center text-gray-400 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider">Просмотры АвиТок</span>
              <Award className="w-4 h-4 text-pink-500" />
            </div>
            <div className="text-lg font-black text-pink-600">32,450</div>
            <p className="text-[9px] text-gray-500 mt-1">Охват увеличился на +24%</p>
          </div>

          <div className="mt-3.5 py-1.5 bg-pink-50 text-[10px] font-extrabold rounded-lg text-pink-600 text-center flex items-center justify-center gap-1">
            Продвинуть охваты
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>

      </div>

      {/* Main Settings/Activities Layout */}
      <div className="px-4 space-y-4">

        {/* Active Listings Grid */}
        <div>
          <h3 className="text-sm font-extrabold text-gray-800 mb-2.5">Ваши объявления ({myOwnListings.length})</h3>

          {myOwnListings.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
              <p className="text-xs text-gray-400 font-medium">У вас пока нет активных объявлений</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Создайте первое объявление в разделе "Подать объявление"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {myOwnListings.map(item => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-xs flex flex-col">
                  <div className="aspect-square bg-gray-100 relative">
                    <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1.5 left-1.5 bg-black/50 text-white font-bold text-[8px] px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                      📺 124 просм.
                    </span>
                  </div>
                  <div className="p-2 flex-1 flex flex-col justify-between">
                    <div className="text-xs font-black text-gray-900 truncate">
                      {item.price.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-[10px] text-gray-600 font-medium truncate mt-0.5">
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security / Settings checklist */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Безопасность продавца</h3>

          <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
            <span className="text-gray-600 font-medium">Безопасная сделка (Эскроу)</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">Активно</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
            <span className="text-gray-600 font-medium">Двухфакторная авторизация</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">Включена</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-gray-600 font-medium">Телефон скрыт в объявлениях</span>
            <span className="text-gray-400 font-semibold text-[10px]">По умолчанию</span>
          </div>
        </div>

      </div>

    </div>
  );
}

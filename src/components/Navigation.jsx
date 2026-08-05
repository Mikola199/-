import React, { useState } from 'react';
import { Home, Search, PlusCircle, MessageSquare, User } from 'lucide-react';

function Navigation({ activeTab, setActiveTab, unreadCount }) {
  const tabs = [
    { id: 'feed', label: 'Лента', icon: Home },
    { id: 'catalog', label: 'Каталог', icon: Search },
    { id: 'create', label: 'Создать', icon: PlusCircle },
    { id: 'chat', label: 'Чаты', icon: MessageSquare, badge: unreadCount },
    { id: 'profile', label: 'Профиль', icon: User },
  ];

  return (
    <div className="w-full h-16 bg-black/95 border-t border-neutral-800 flex items-center justify-around shrink-0 select-none pb-safe z-10">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-16 h-12 transition-all duration-150 relative ${
              isActive ? 'text-[#00B2FF] scale-110' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className="w-6 h-6 stroke-[2]" />
              {tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Navigation;

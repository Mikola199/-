import React, { useState } from 'react';
import { Film, Search, PlusCircle, MessageSquare, User, AlertCircle, ShoppingBag } from 'lucide-react';
import { MOCK_LISTINGS, MOCK_VIDEOS, MOCK_CHATS, CURRENT_USER } from './data/mockData';
import AvitoCatalog from './components/AvitoCatalog';
import TikTokFeed from './components/TikTokFeed';
import ListingDetailModal from './components/ListingDetailModal';
import CreateListingForm from './components/CreateListingForm';
import ChatInterface from './components/ChatInterface';
import UserProfile from './components/UserProfile';

function App() {
  const [activeTab, setActiveTab] = useState('catalog'); // default to Avito Catalog
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [chats, setChats] = useState(MOCK_CHATS);
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeChatId, setActiveChatId] = useState(null);

  // Global actions
  const handleLikeVideo = (videoId) => {
    setVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.id === videoId) {
          return {
            ...video,
            isLiked: !video.isLiked,
            likes: video.isLiked ? video.likes - 1 : video.likes + 1
          };
        }
        return video;
      })
    );
  };

  const handleAddComment = (videoId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      username: 'ilya_user',
      text: text,
      avatar: CURRENT_USER.avatar,
      time: 'Только что'
    };

    setVideos(prevVideos =>
      prevVideos.map(video => {
        if (video.id === videoId) {
          return {
            ...video,
            comments: [newComment, ...video.comments]
          };
        }
        return video;
      })
    );
  };

  const handleCreateListing = (newListing, newVideo) => {
    // Add to listings
    setListings(prev => [newListing, ...prev]);

    // Add to videos if user linked/recorded video
    if (newVideo) {
      setVideos(prev => [newVideo, ...prev]);
    }

    // Switch to catalog
    setActiveTab('catalog');
  };

  const handleStartChat = (listing) => {
    // Check if chat already exists
    const existingChat = chats.find(c => c.listingId === listing.id);
    if (existingChat) {
      setActiveChatId(existingChat.id);
      setActiveTab('chats');
    } else {
      const newChat = {
        id: `ch_${Date.now()}`,
        listingId: listing.id,
        sellerName: `${listing.seller.name} (${listing.title})`,
        sellerAvatar: listing.seller.avatar,
        messages: [
          { id: `m_${Date.now()}`, sender: 'user', text: `Здравствуйте! Меня интересует объявление: "${listing.title}". Продаете?`, time: 'Только что' }
        ],
        autoReplies: [
          'Здравствуйте! Да, всё в силе. Когда вам удобно посмотреть?',
          'Добрый день! Всё описано в объявлении, состояние отличное.',
          'Да, актуально. Могу сделать небольшую скидку.'
        ]
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newChat.id);
      setActiveTab('chats');
    }
    setSelectedListing(null); // close detail modal if any
  };

  const handleSendMessage = (chatId, text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text: text,
      time: 'Только что'
    };

    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id === chatId) {
          // Setup auto response
          if (chat.autoReplies && chat.autoReplies.length > 0) {
            setTimeout(() => {
              const replyText = chat.autoReplies[0];
              const replyMsg = {
                id: `m_reply_${Date.now()}`,
                sender: 'seller',
                text: replyText,
                time: 'Только что'
              };
              setChats(currentChats =>
                currentChats.map(c => {
                  if (c.id === chatId) {
                    return {
                      ...c,
                      messages: [...c.messages, replyMsg],
                      autoReplies: c.autoReplies.slice(1)
                    };
                  }
                  return c;
                })
              );
            }, 1500);
          }

          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      })
    );
  };

  const handleWatchVideo = (videoId) => {
    setSelectedListing(null);
    setActiveTab('feed');
    // We can pass videoId to the feed component to jump directly to it
    const videoIndex = videos.findIndex(v => v.id === videoId);
    if (videoIndex !== -1) {
      // We will handle resetting index or passing it inside TikTokFeed
      window.dispatchEvent(new CustomEvent('jump-to-video', { detail: { index: videoIndex } }));
    }
  };

  // Render page helper
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <TikTokFeed
            videos={videos}
            listings={listings}
            onLike={handleLikeVideo}
            onAddComment={handleAddComment}
            onSelectListing={(listingId) => {
              const listing = listings.find(l => l.id === listingId);
              if (listing) setSelectedListing(listing);
            }}
          />
        );
      case 'catalog':
        return (
          <AvitoCatalog
            listings={listings}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectListing={(listing) => setSelectedListing(listing)}
            onWatchVideo={handleWatchVideo}
          />
        );
      case 'create':
        return (
          <CreateListingForm
            onSubmit={handleCreateListing}
            listingsCount={listings.length}
            videosCount={videos.length}
          />
        );
      case 'chats':
        return (
          <ChatInterface
            chats={chats}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            onSendMessage={handleSendMessage}
          />
        );
      case 'profile':
        return (
          <UserProfile
            currentUser={CURRENT_USER}
            listings={listings}
            videos={videos}
            onSelectListing={(listing) => setSelectedListing(listing)}
            onWatchVideo={handleWatchVideo}
          />
        );
      default:
        return <div className="p-8 text-center">Раздел в разработке</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
      {/* Dynamic Header (hidden in full-screen TikTok mode for immersion) */}
      {activeTab !== 'feed' && (
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xl tracking-tighter">
              А
            </div>
            <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              АвиТок
            </span>
          </div>
          <div className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded-full border border-indigo-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            Москва и РФ
          </div>
        </header>
      )}

      {/* Main Viewport */}
      <main className="flex-1 overflow-y-auto bg-gray-50 relative">
        {renderActiveTab()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center shrink-0 z-20">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'feed' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Film className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Лента</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'catalog' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Объявления</span>
        </button>

        <button
          onClick={() => setActiveTab('create')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'create' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <PlusCircle className="w-6 h-6 mb-0.5 text-indigo-600 hover:text-indigo-700" />
          <span className="text-[10px] font-semibold text-indigo-600">Подать</span>
        </button>

        <button
          onClick={() => setActiveTab('chats')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'chats' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 mb-0.5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          </div>
          <span className="text-[10px] font-medium">Чаты</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Кабинет</span>
        </button>
      </nav>

      {/* Listing Detail Modal */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onStartChat={handleStartChat}
          onWatchVideo={handleWatchVideo}
        />
      )}
    </div>
  );
}

export default App;

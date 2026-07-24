import React, { useState, useEffect, useRef } from 'react';
import { Listing, Comment } from '../types';
import { Heart, MessageCircle, Share2, ShoppingBag, Send, X, ArrowUp, ArrowDown } from 'lucide-react';

interface TikTokFeedProps {
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onOpenProduct: (product: Listing) => void;
  initialIndex?: number;
}

export default function TikTokFeed({
  listings,
  setListings,
  favorites,
  toggleFavorite,
  onOpenProduct,
  initialIndex = 0
}: TikTokFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // We only show listings with videos in the video feed
  const feedListings = listings.filter(l => l.videoUrl);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (initialIndex < feedListings.length) {
      setCurrentIndex(initialIndex);
      // Scroll to appropriate slide
      const container = containerRef.current;
      if (container) {
        const itemHeight = container.clientHeight;
        container.scrollTo({
          top: initialIndex * itemHeight,
          behavior: 'instant' as ScrollBehavior
        });
      }
    }
  }, [initialIndex, feedListings.length]);

  useEffect(() => {
    // Play active video, pause others
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === currentIndex) {
          video.currentTime = 0;
          video.play().catch(() => {
            // Auto-play might be blocked, retry muted or just let it fail gracefully
            video.muted = true;
            video.play().catch(() => {});
          });
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex, feedListings]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollPos = container.scrollTop;
    const itemHeight = container.clientHeight || 1;
    const newIndex = Math.round(scrollPos / itemHeight);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < feedListings.length) {
      setCurrentIndex(newIndex);
    }
  };

  const currentListing = feedListings[currentIndex];

  const handleLike = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        const isFav = favorites.includes(id);
        const diff = isFav ? -1 : 1;
        return {
          ...item,
          likesCount: item.likesCount + diff
        };
      }
      return item;
    }));
    toggleFavorite(id);
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;
    const newComment: Comment = {
      id: Math.random().toString(),
      author: 'Вы',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      text: newCommentText,
      time: 'Только что',
      likes: 0
    };

    setListings(prev => prev.map(item => {
      if (item.id === currentListing.id) {
        return {
          ...item,
          comments: [newComment, ...item.comments]
        };
      }
      return item;
    }));
    setNewCommentText('');
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleShare = (listing: Listing) => {
    navigator.clipboard.writeText(`${window.location.origin}/product/${listing.id}`).then(() => {
      triggerToast('Ссылка скопирована в буфер обмена!');
    });
  };

  const navigateFeed = (dir: 'up' | 'down') => {
    const container = containerRef.current;
    if (!container) return;
    const targetIndex = dir === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex >= 0 && targetIndex < feedListings.length) {
      const itemHeight = container.clientHeight;
      container.scrollTo({
        top: targetIndex * itemHeight,
        behavior: 'smooth'
      });
      setCurrentIndex(targetIndex);
    }
  };

  if (feedListings.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-black text-white text-center">
        <ShoppingBag className="w-16 h-16 text-gray-600 mb-4 animate-bounce" />
        <h3 className="text-xl font-bold">Видео пока нет</h3>
        <p className="text-gray-400 mt-2 text-sm max-w-xs">
          Подайте объявление с видео или вернитесь в АвиТорг, чтобы исследовать товары.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-blue-600/95 backdrop-blur-md text-white font-medium px-4 py-2 rounded-xl text-sm shadow-xl flex items-center gap-2 border border-blue-400">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Controls */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-white">АвиТок Эфир</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigateFeed('up')}
            disabled={currentIndex === 0}
            className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-black/60 transition disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => navigateFeed('down')}
            disabled={currentIndex === feedListings.length - 1}
            className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-black/60 transition disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowDown className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Vertical Video Slider */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-scroll snap-y-mandatory no-scrollbar"
      >
        {feedListings.map((item, index) => {
          const isLiked = favorites.includes(item.id);
          return (
            <div
              key={item.id}
              className="w-full h-full snap-start relative flex flex-col justify-end"
            >
              {/* Actual Video Element */}
              {item.videoUrl && (
                <video
                  ref={el => { videoRefs.current[index] = el }}
                  src={item.videoUrl}
                  loop
                  muted
                  playsInline
                  autoPlay={index === currentIndex}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  onClick={(e) => {
                    const video = e.currentTarget;
                    if (video.paused) {
                      video.play().catch(() => {});
                    } else {
                      video.pause();
                    }
                  }}
                />
              )}

              {/* Black Gradient Underlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none z-10" />

              {/* Sidebar Action Buttons */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 z-20">
                {/* Seller Avatar */}
                <div className="relative group mb-1">
                  <img
                    src={item.seller.avatar}
                    alt={item.seller.name}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg"
                  />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-500 text-white font-bold text-[9px] px-1 rounded-full shadow-md">
                    +
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(item.id)}
                  className="flex flex-col items-center group"
                >
                  <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`} />
                  </div>
                  <span className="text-xs font-semibold text-white mt-1 shadow-sm">
                    {item.likesCount}
                  </span>
                </button>

                {/* Comments Button */}
                <button
                  onClick={() => setShowComments(true)}
                  className="flex flex-col items-center group"
                >
                  <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-white mt-1 shadow-sm">
                    {item.comments.length}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => handleShare(item)}
                  className="flex flex-col items-center group"
                >
                  <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-white mt-1 shadow-sm">
                    Поделиться
                  </span>
                </button>

                {/* Direct Buy / Card Callout Button */}
                <button
                  onClick={() => onOpenProduct(item)}
                  className="flex flex-col items-center group mt-2"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center shadow-xl animate-pulse group-hover:scale-110 transition border border-emerald-300">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-300 mt-1 shadow-sm">
                    Купить
                  </span>
                </button>
              </div>

              {/* Bottom Info Details overlay */}
              <div className="p-4 z-20 max-w-[80%] flex flex-col gap-1">
                {/* Verified Seller Tag */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-white tracking-wide">
                    @{item.seller.name}
                  </span>
                  {item.seller.isVerified && (
                    <span className="bg-blue-500 text-white text-[9px] font-semibold px-1 rounded flex items-center gap-0.5">
                      ✓ Проверен
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-white leading-snug drop-shadow-md">
                  {item.title}
                </h2>

                {/* Price tag */}
                <div className="text-xl font-black text-green-400 drop-shadow-md my-0.5 flex items-baseline gap-1">
                  {item.price.toLocaleString('ru-RU')} ₽
                  <span className="text-[10px] text-gray-300 font-normal">без комиссии</span>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-gray-200 line-clamp-2 leading-relaxed drop-shadow-sm mb-2">
                  {item.description}
                </p>

                {/* Tags / Location */}
                <div className="flex items-center gap-2 text-[10px] text-gray-300">
                  <span className="bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                    📍 {item.location.split(',')[0]}
                  </span>
                  <span className="bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                    🏷️ {item.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-Up Comments Bottom Drawer */}
      {showComments && currentListing && (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end transition-all">
          <div className="bg-white rounded-t-2xl max-h-[75%] h-[75%] flex flex-col text-gray-900 pb-2">

            {/* Drawer Header */}
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <span className="font-bold text-sm text-gray-800">
                Комментарии к объявлению ({currentListing.comments.length})
              </span>
              <button
                onClick={() => setShowComments(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {currentListing.comments.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                  Здесь пока пусто. Напишите первый комментарий!
                </div>
              ) : (
                currentListing.comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-9 h-9 rounded-full object-cover mt-0.5"
                    />
                    <div className="flex-1 bg-gray-50 p-3 rounded-2xl relative">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-xs text-gray-700">{comment.author}</span>
                        <span className="text-[10px] text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-xs text-gray-800 leading-normal">{comment.text}</p>

                      {/* Heart Like Inside Comment */}
                      <button className="absolute right-3 top-3 flex items-center gap-1 text-[10px] text-gray-400 hover:text-red-500 transition">
                        <Heart className="w-3 h-3" />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input Footer */}
            <div className="p-3 border-t bg-white flex gap-2 items-center">
              <input
                type="text"
                placeholder="Спросите о состоянии или предложите цену..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs border border-gray-200 focus:outline-none focus:border-blue-500 transition"
              />
              <button
                onClick={handleAddComment}
                className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

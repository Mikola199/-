import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Play, Pause, ShoppingBag, Send, X, Volume2, VolumeX } from 'lucide-react';

export default function VideoFeed({ listings, onOpenDetails, onAddComment }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likedVideos, setLikedVideos] = useState({}); // { listingId: boolean }
  const [likeCounts, setLikeCounts] = useState({}); // { listingId: count }

  const videoRefs = useRef([]);

  // Filter listings that have videos
  const feedListings = listings.filter(item => item.videoUrl);

  useEffect(() => {
    // Play the current video, pause others
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex && isPlaying) {
          video.play().catch(err => console.log('Video auto-play block:', err));
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex, isPlaying, feedListings.length]);

  const handleVideoClick = (index) => {
    if (index === currentIndex) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleLike = (e, listingId) => {
    e.stopPropagation();
    const isLiked = likedVideos[listingId];
    setLikedVideos({
      ...likedVideos,
      [listingId]: !isLiked
    });

    const currentCount = likeCounts[listingId] || feedListings.find(l => l.id === listingId)?.likes || 0;
    setLikeCounts({
      ...likeCounts,
      [listingId]: isLiked ? currentCount - 1 : currentCount + 1
    });
  };

  const handleShare = (e, item) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Посмотри на АвиТок: ${item.title} за ${item.price.toLocaleString('ru-RU')} руб.!`,
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      alert(`Ссылка скопирована: ${item.title} — ${item.price.toLocaleString('ru-RU')} руб.`);
    }
  };

  const handleSendComment = (e, listingId) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(listingId, commentText);
    setCommentText('');
  };

  const activeListing = feedListings[currentIndex];

  return (
    <div className="relative w-full h-[calc(100vh-130px)] md:h-[750px] max-w-md mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Feed Container */}
      <div className="relative flex-1 overflow-y-scroll snap-y snap-mandatory no-scrollbar h-full bg-neutral-950">
        {feedListings.map((item, index) => {
          const isLiked = !!likedVideos[item.id];
          const likesDisplay = likeCounts[item.id] !== undefined ? likeCounts[item.id] : item.likes;

          return (
            <div
              key={item.id}
              className="w-full h-full snap-start snap-always relative flex items-center justify-center bg-black"
              style={{ minHeight: '100%' }}
            >
              {/* Video Element */}
              <video
                ref={el => videoRefs.current[index] = el}
                src={item.videoUrl}
                className="w-full h-full object-cover cursor-pointer"
                loop
                muted={isMuted}
                playsInline
                onClick={() => handleVideoClick(index)}
              />

              {/* Pause/Play Overlay Indicator */}
              {currentIndex === index && !isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none"
                >
                  <Pause className="w-16 h-16 text-white/80 animate-ping absolute" />
                  <Pause className="w-16 h-16 text-white" />
                </div>
              )}

              {/* Top Mute/Volume Controller */}
              <button
                onClick={handleToggleMute}
                className="absolute top-4 right-4 bg-black/40 p-2.5 rounded-full text-white hover:bg-black/60 transition active:scale-95 z-20"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              {/* Right Side Action Buttons */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 z-10">
                {/* Seller Avatar */}
                <div
                  onClick={(e) => { e.stopPropagation(); onOpenDetails(item); }}
                  className="relative cursor-pointer group active:scale-95"
                >
                  <img
                    src={item.seller.avatar}
                    alt={item.seller.name}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                  />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-500 text-[10px] text-white px-1.5 py-0.5 rounded-full font-bold shadow-md">
                    +
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(e, item.id)}
                  className="flex flex-col items-center gap-1 active:scale-90 transition duration-150"
                >
                  <div className={`p-3 rounded-full ${isLiked ? 'bg-rose-500 text-white' : 'bg-black/50 text-white'} hover:scale-105 shadow-lg`}>
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <span className="text-white text-xs font-semibold drop-shadow">{likesDisplay}</span>
                </button>

                {/* Comments Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
                  className="flex flex-col items-center gap-1 active:scale-90 transition duration-150"
                >
                  <div className="p-3 rounded-full bg-black/50 text-white hover:scale-105 shadow-lg">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="text-white text-xs font-semibold drop-shadow">{item.comments.length}</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={(e) => handleShare(e, item)}
                  className="flex flex-col items-center gap-1 active:scale-90 transition"
                >
                  <div className="p-3 rounded-full bg-black/50 text-white hover:scale-105 shadow-lg">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <span className="text-white text-xs font-semibold drop-shadow">{item.shares}</span>
                </button>
              </div>

              {/* Bottom Info Overlay */}
              <div className="absolute left-4 bottom-4 right-16 text-white z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-bold text-sm tracking-wide">@{item.seller.name}</span>
                  <span className="text-[10px] bg-emerald-500/90 text-white px-2 py-0.5 rounded font-medium">Продавец</span>
                </div>
                <p className="text-xs text-neutral-200 line-clamp-2 mb-2 font-light">{item.description}</p>

                {/* Connected Classified Card (Avito Link) */}
                <div
                  onClick={(e) => { e.stopPropagation(); onOpenDetails(item); }}
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition p-2 rounded-xl flex items-center justify-between cursor-pointer border border-white/10 group active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
                      <p className="text-xs text-emerald-400 font-bold">{item.price.toLocaleString('ru-RU')} ₽</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white text-black font-semibold px-2.5 py-1 rounded-lg shrink-0 group-hover:scale-105 transition">
                    Купить
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-Up Comments Panel */}
      {showComments && activeListing && (
        <div className="absolute inset-x-0 bottom-0 bg-neutral-900 border-t border-neutral-800 rounded-t-2xl h-[450px] z-30 flex flex-col animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
            <span className="text-sm font-bold text-white">Комментарии ({activeListing.comments.length})</span>
            <button
              onClick={() => setShowComments(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeListing.comments.length === 0 ? (
              <p className="text-center text-neutral-500 text-xs py-8">Пока нет комментариев. Будьте первыми!</p>
            ) : (
              activeListing.comments.map((comment) => (
                <div key={comment.id} className="flex gap-2 text-left">
                  <div className="w-8 h-8 rounded-full bg-neutral-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {comment.author[0]}
                  </div>
                  <div className="bg-neutral-800 p-2.5 rounded-xl flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-neutral-200">{comment.author}</span>
                      <span className="text-[9px] text-neutral-500">{comment.date}</span>
                    </div>
                    <p className="text-xs text-neutral-300 font-light">{comment.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment Form */}
          <form
            onSubmit={(e) => handleSendComment(e, activeListing.id)}
            className="p-3 border-t border-neutral-800 flex items-center gap-2 bg-neutral-950"
          >
            <input
              type="text"
              placeholder="Добавить комментарий..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-neutral-800 text-white text-xs px-4.5 py-3 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-neutral-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-full transition active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

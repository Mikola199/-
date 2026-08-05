import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageSquare, Share2, Play, Pause, ShoppingBag, X, Send } from 'lucide-react';

function TikTokFeed({ videos, listings, onLike, onAddComment, onSelectListing }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [copiedTooltip, setCopiedTooltip] = useState(false);

  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  // Setup jump-to-video listener
  useEffect(() => {
    const handleJump = (event) => {
      const index = event.detail.index;
      if (index !== -1 && containerRef.current) {
        setActiveVideoIndex(index);
        const children = containerRef.current.children;
        if (children && children[index]) {
          children[index].scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('jump-to-video', handleJump);
    return () => window.removeEventListener('jump-to-video', handleJump);
  }, []);

  // Play/Pause current video when active index changes
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === activeVideoIndex && isPlaying) {
          video.play().catch(() => {
            // Mute and retry if browser blocks autoplay
            video.muted = true;
            setIsMuted(true);
            video.play().catch(err => console.log("Playback failed: ", err));
          });
        } else {
          video.pause();
        }
      }
    });
  }, [activeVideoIndex, isPlaying]);

  const handleScroll = (e) => {
    if (!containerRef.current) return;
    const scrollPos = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;
    const index = Math.round(scrollPos / clientHeight);
    if (index !== activeVideoIndex && index >= 0 && index < videos.length) {
      setActiveVideoIndex(index);
      setIsPlaying(true); // resume on scroll
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShare = () => {
    setCopiedTooltip(true);
    setTimeout(() => setCopiedTooltip(false), 2000);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(videos[activeVideoIndex].id, commentText);
    setCommentText('');
  };

  // Helper to format currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  const activeVideo = videos[activeVideoIndex];
  // Find linked product
  const linkedProduct = listings.find(l => l.id === activeVideo?.listingId);

  return (
    <div className="relative w-full h-full bg-black flex flex-col justify-between">
      {/* Scrollable Container with Snapping */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-scroll snap-y-mandatory no-scrollbar h-full w-full"
        style={{ scrollBehavior: 'smooth' }}
      >
        {videos.map((video, idx) => {
          const isCurrent = idx === activeVideoIndex;
          const product = listings.find(l => l.id === video.listingId);

          return (
            <div
              key={video.id}
              className="w-full h-full snap-start relative flex items-center justify-center bg-black overflow-hidden"
              style={{ height: 'calc(100vh - 58px)' }} // Subtract nav bar height
            >
              {/* Vertical Video Element */}
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={video.videoUrl}
                loop
                playsInline
                muted={isMuted}
                className="w-full h-full object-cover"
                onClick={togglePlay}
              />

              {/* Styled Interactive Fallback UI when the video is paused or if video fails to load */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-5 transition-opacity"
                >
                  <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-white backdrop-blur-xs scale-105 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Ambient Top Gradient */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-2" />

              {/* Ambient Bottom Gradient */}
              <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-2" />

              {/* Audio Status Overlay Indicator */}
              <button
                onClick={() => {
                  const targetMuted = !isMuted;
                  setIsMuted(targetMuted);
                  if (videoRefs.current[idx]) {
                    videoRefs.current[idx].muted = targetMuted;
                  }
                }}
                className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full backdrop-blur-xs text-xs font-semibold z-10 hover:bg-black/60 transition-colors"
              >
                {isMuted ? '🔇 БЕЗ ЗВУКА' : '🔊 ЗВУК ВКЛ'}
              </button>

              {/* Sidebar Action Buttons (Right Aligned) */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-5 z-10">
                {/* Profile Avatar / Seller Link */}
                <div
                  className="relative cursor-pointer group"
                  onClick={() => onSelectListing(product?.id)}
                >
                  <img
                    src={video.avatar}
                    alt={video.username}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full border border-white">
                    +
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => onLike(video.id)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div className={`p-3 rounded-full bg-black/40 backdrop-blur-xs text-white transition-all transform group-active:scale-90 ${
                    video.isLiked ? 'text-rose-500 scale-105' : 'hover:text-rose-400'
                  }`}>
                    <Heart className={`w-6 h-6 ${video.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </div>
                  <span className="text-white text-xs font-bold mt-1 shadow-sm">
                    {video.likes}
                  </span>
                </button>

                {/* Comments Button */}
                <button
                  onClick={() => setShowComments(true)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div className="p-3 rounded-full bg-black/40 backdrop-blur-xs text-white hover:text-indigo-400 transition-all">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="text-white text-xs font-bold mt-1 shadow-sm">
                    {video.comments.length}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex flex-col items-center group focus:outline-none relative"
                >
                  <div className="p-3 rounded-full bg-black/40 backdrop-blur-xs text-white hover:text-emerald-400 transition-all">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <span className="text-white text-xs font-bold mt-1 shadow-sm">
                    {video.shares}
                  </span>
                </button>
              </div>

              {/* Bottom Left Content (Linked Product + Caption) */}
              <div className="absolute left-4 bottom-4 right-16 z-10 flex flex-col space-y-3 pointer-events-auto">
                {/* Description & User Tags */}
                <div className="text-white">
                  <h3 className="font-bold text-sm text-indigo-300">
                    @{video.username}
                  </h3>
                  <p className="text-xs font-normal mt-1 leading-relaxed text-gray-200 line-clamp-2">
                    {video.description}
                  </p>
                </div>

                {/* Hybrid Integration: Linked classified product overlay card */}
                {product && (
                  <div
                    onClick={() => onSelectListing(product.id)}
                    className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 flex items-center space-x-2.5 shadow-xl border border-white/20 hover:bg-white active:scale-98 transition-all cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded-md inline-block mb-1">
                        Купить на АвиТок
                      </div>
                      <h4 className="text-xs font-bold text-gray-800 truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs font-extrabold text-indigo-600">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <ShoppingBag className="w-5 h-5 text-indigo-600 shrink-0" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Copy Link Share Tooltip Alert */}
      {copiedTooltip && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-lg z-30 transition-all animate-bounce">
          ✓ Ссылка успешно скопирована!
        </div>
      )}

      {/* Slide-Up Comments Drawer Overlay */}
      {showComments && activeVideo && (
        <div className="absolute inset-0 bg-black/50 z-30 flex flex-col justify-end">
          {/* Backdrop Click */}
          <div className="flex-1" onClick={() => setShowComments(false)} />

          {/* Drawer Body */}
          <div className="bg-white rounded-t-3xl max-h-[70%] flex flex-col animate-slide-up pb-4">
            {/* Drawer Header */}
            <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-sm text-gray-800">
                Комментарии ({activeVideo.comments.length})
              </span>
              <button
                onClick={() => setShowComments(false)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 min-h-[250px]">
              {activeVideo.comments.length === 0 ? (
                <p className="text-gray-400 text-xs text-center py-10">Будьте первым, кто оставит комментарий!</p>
              ) : (
                activeVideo.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-2.5">
                    <img
                      src={comment.avatar}
                      alt={comment.username}
                      className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                    />
                    <div className="flex-1 bg-gray-50 rounded-2xl px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-indigo-600">
                          {comment.username}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input Form Footer */}
            <form
              onSubmit={handleCommentSubmit}
              className="px-4 py-2 border-t border-gray-100 flex items-center space-x-2"
            >
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Напишите комментарий..."
                className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TikTokFeed;

import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageSquare, Share2, Volume2, VolumeX, Play, ShoppingBag, Send, X } from 'lucide-react';

function VideoItem({ product, onProductClick, onChatClick, currentActive, isMuted, toggleMute }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(product.likes);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [heartPos, setHeartPos] = useState({ x: 0, y: 0 });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(product.comments || []);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const videoRef = useRef(null);
  const clickTimeout = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (currentActive) {
        videoRef.current.currentTime = 0;
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [currentActive]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleVideoClick = (e) => {
    if (clickTimeout.current) {
      // Double tap triggered
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      handleDoubleTap(e);
    } else {
      clickTimeout.current = setTimeout(() => {
        // Single tap triggered
        handleSingleTap();
        clickTimeout.current = null;
      }, 250);
    }
  };

  const handleSingleTap = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const handleDoubleTap = (e) => {
    // Get tap coordinate within container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHeartPos({ x, y });
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);

    if (!liked) {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      username: 'Вы',
      text: newComment,
      time: 'Только что'
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText?.(window.location.href);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative w-full h-full snap-start bg-black flex items-center justify-center overflow-hidden">
      {/* HTML5 video element */}
      <video
        ref={videoRef}
        src={product.videoUrl}
        className="absolute w-full h-full object-cover cursor-pointer"
        loop
        playsInline
        muted={isMuted}
        onClick={handleVideoClick}
      />

      {/* Play/Pause overlay indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none transition-all">
          <div className="bg-black/50 p-4 rounded-full text-white animate-ping">
            <Play className="w-12 h-12 fill-white text-white" />
          </div>
        </div>
      )}

      {/* Double tap heart element */}
      {showHeartAnim && (
        <div
          className="absolute z-40 pointer-events-none animate-pulse"
          style={{
            top: heartPos.y - 40,
            left: heartPos.x - 40,
            animation: 'likeHeartAnim 0.8s ease-out forwards',
          }}
        >
          <Heart className="w-20 h-20 text-red-500 fill-red-500 stroke-[2] drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]" />
        </div>
      )}

      {/* Right Side Interaction Buttons */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 z-20">
        {/* Seller profile bubble */}
        <button
          onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
          className="relative mb-3 flex items-center justify-center"
        >
          <img
            src={product.seller.avatar}
            alt={product.seller.name}
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <span className="absolute -bottom-1.5 bg-[#00B2FF] text-white text-[10px] px-1 rounded-full font-bold">
            +
          </span>
        </button>

        {/* Like */}
        <button onClick={handleLikeToggle} className="flex flex-col items-center gap-1 group">
          <div className="p-3 bg-neutral-900/60 rounded-full hover:bg-neutral-800/80 transition backdrop-blur-md">
            <Heart className={`w-6 h-6 transition-transform group-active:scale-125 ${liked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </div>
          <span className="text-xs font-semibold text-white text-shadow-sm">{likesCount}</span>
        </button>

        {/* Comment */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowComments(true); }}
          className="flex flex-col items-center gap-1"
        >
          <div className="p-3 bg-neutral-900/60 rounded-full hover:bg-neutral-800/80 transition backdrop-blur-md">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-white text-shadow-sm">{comments.length}</span>
        </button>

        {/* Share */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowShareModal(true); }}
          className="flex flex-col items-center gap-1"
        >
          <div className="p-3 bg-neutral-900/60 rounded-full hover:bg-neutral-800/80 transition backdrop-blur-md">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-white text-shadow-sm">{product.shares}</span>
        </button>

        {/* Mute Control */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleMute(); }}
          className="flex flex-col items-center"
        >
          <div className="p-3 bg-neutral-900/60 rounded-full hover:bg-neutral-800/80 transition backdrop-blur-md">
            {isMuted ? <VolumeX className="w-6 h-6 text-red-400" /> : <Volume2 className="w-6 h-6 text-[#00B2FF]" />}
          </div>
        </button>
      </div>

      {/* Bottom Product Preview Card */}
      <div className="absolute left-4 bottom-24 right-20 z-20 text-white select-none">
        <h4 className="font-bold text-lg leading-tight mb-1 truncate text-shadow-md">
          {product.title}
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#00B2FF] text-black font-extrabold text-sm px-2.5 py-0.5 rounded">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          <span className="text-xs text-neutral-300 drop-shadow">
            {product.location.split(',')[0]}
          </span>
        </div>
        <p className="text-xs text-neutral-200 line-clamp-2 leading-relaxed bg-black/30 p-2 rounded backdrop-blur-xs">
          {product.description}
        </p>

        {/* Interactive Buy Button */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onProductClick(product)}
            className="flex-1 bg-white hover:bg-neutral-200 text-black py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Купить товар
          </button>
          <button
            onClick={() => onChatClick(product)}
            className="bg-neutral-900/85 hover:bg-neutral-800 border border-neutral-700 text-white py-2 px-3 rounded-lg font-bold text-xs transition active:scale-95"
          >
            Написать
          </button>
        </div>
      </div>

      {/* Custom Styles Inject for animations */}
      <style>{`
        @keyframes likeHeartAnim {
          0% { transform: scale(0.3) rotate(0deg); opacity: 0; }
          20% { transform: scale(1.2) rotate(-15deg); opacity: 1; }
          60% { transform: scale(1) rotate(10deg); opacity: 1; }
          100% { transform: scale(1.4) translateY(-100px) rotate(15deg); opacity: 0; }
        }
        .text-shadow-md {
          text-shadow: 1px 1px 4px rgba(0,0,0,0.8), -1px -1px 4px rgba(0,0,0,0.8);
        }
      `}</style>

      {/* COMMENTS DRAWER */}
      {showComments && (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end">
          <div className="bg-neutral-900 rounded-t-2xl max-h-[70%] flex flex-col text-white pb-safe animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <h3 className="font-bold text-base">Комментарии ({comments.length})</h3>
              <button onClick={() => setShowComments(false)} className="p-1 hover:bg-neutral-800 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {comments.map((cmt) => (
                <div key={cmt.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {cmt.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-neutral-300">{cmt.username}</span>
                      <span className="text-[10px] text-neutral-500">{cmt.time}</span>
                    </div>
                    <p className="text-sm mt-0.5 text-neutral-100">{cmt.text}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-center text-neutral-500 text-sm py-8">Пока нет комментариев. Будьте первыми!</p>
              )}
            </div>

            <form onSubmit={handleCommentSubmit} className="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Оставьте ваш комментарий..."
                className="flex-1 bg-neutral-800 border border-neutral-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00B2FF]"
              />
              <button type="submit" className="bg-[#00B2FF] hover:bg-[#0092d0] text-black p-2 rounded-lg transition active:scale-95">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-sm w-full text-white flex flex-col relative animate-fade-in">
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 p-1 hover:bg-neutral-800 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg mb-4">Поделиться обзором</h3>
            <p className="text-sm text-neutral-400 mb-4">Скопируйте ссылку или отправьте видео в социальные сети.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopyLink}
                className="w-full bg-[#00B2FF] text-black py-2.5 rounded-lg font-bold text-sm hover:bg-sky-400 transition"
              >
                {copiedLink ? '✓ Ссылка скопирована!' : 'Скопировать ссылку'}
              </button>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button onClick={() => alert('Поделились в Telegram')} className="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg text-xs text-neutral-200">
                  Telegram
                </button>
                <button onClick={() => alert('Поделились в WhatsApp')} className="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg text-xs text-neutral-200">
                  WhatsApp
                </button>
                <button onClick={() => alert('Поделились в VK')} className="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-lg text-xs text-neutral-200">
                  ВКонтакте
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoFeed({ products, onProductClick, onChatClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollPos = containerRef.current.scrollTop;
    const itemHeight = containerRef.current.clientHeight;
    const index = Math.round(scrollPos / itemHeight);
    if (index !== activeIndex && index >= 0 && index < products.length) {
      setActiveIndex(index);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="w-full h-full overflow-y-auto snap-y snap-mandatory bg-black no-scrollbar"
    >
      {products.map((prod, index) => (
        <VideoItem
          key={prod.id}
          product={prod}
          onProductClick={onProductClick}
          onChatClick={onChatClick}
          currentActive={index === activeIndex}
          isMuted={isMuted}
          toggleMute={toggleMute}
        />
      ))}
      {products.length === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center text-center text-neutral-500 p-8">
          <p className="text-lg">Нет доступных видеообзоров.</p>
          <p className="text-sm mt-1">Опубликуйте новый товар с обзором первым!</p>
        </div>
      )}
    </div>
  );
}

export default VideoFeed;

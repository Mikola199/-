import { useState } from 'react';
import { Listing } from '../types';
import { X, Heart, ShieldCheck, MapPin, Phone, MessageSquare, ArrowRight, Share2, Play } from 'lucide-react';

interface ProductDetailModalProps {
  product: Listing;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenVideo: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenVideo
}: ProductDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/product/${product.id}`).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
      {/* Sliding Dialog Box */}
      <div className="bg-white text-gray-900 rounded-t-3xl w-full max-w-md h-[90vh] flex flex-col overflow-hidden animate-slide-up shadow-2xl">

        {/* Sticky Action Header */}
        <div className="px-4 py-3 border-b flex items-center justify-between bg-white z-10 sticky top-0">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex gap-2.5">
            {/* Share action */}
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition relative"
            >
              <Share2 className="w-4.5 h-4.5 text-gray-700" />
              {copiedLink && (
                <span className="absolute -bottom-7 right-0 bg-black text-white text-[9px] px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                  Скопировано!
                </span>
              )}
            </button>

            {/* Favorite action */}
            <button
              onClick={onToggleFavorite}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <Heart className={`w-4.5 h-4.5 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">

          {/* Main Media Gallery */}
          <div className="relative aspect-video w-full bg-gray-900">
            <img
              src={product.images[activeImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />

            {/* Play Clip overlay button */}
            {product.videoUrl && (
              <button
                onClick={onOpenVideo}
                className="absolute inset-0 m-auto w-16 h-16 bg-gradient-to-tr from-red-500/90 to-pink-500/90 rounded-full flex items-center justify-center shadow-2xl border border-white/20 active:scale-95 hover:scale-105 transition-all group"
              >
                <Play className="w-6 h-6 text-white fill-white ml-1 group-hover:animate-pulse" />
              </button>
            )}

            {/* Gallery Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      activeImageIndex === idx ? 'bg-white w-3' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col gap-4">

            {/* Video Promotion Card */}
            {product.videoUrl && (
              <div
                onClick={onOpenVideo}
                className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer group active:scale-98 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-red-600">Смотреть в AviTok</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">У этого товара есть классный видеообзор!</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition" />
              </div>
            )}

            {/* Price & Name */}
            <div>
              <div className="text-2xl font-black text-gray-900 leading-none mb-1">
                {product.price.toLocaleString('ru-RU')} ₽
              </div>

              {product.hasDelivery && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 self-start px-2 py-0.5 rounded-md border border-emerald-100 mb-3 w-fit">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Доступна доставка с гарантией возврата
                </div>
              )}

              <h1 className="text-lg font-bold text-gray-900 leading-snug">
                {product.title}
              </h1>
            </div>

            {/* Parameters Table */}
            <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
              <h3 className="text-xs font-bold text-gray-800 mb-2">Характеристики</h3>
              <div className="space-y-2">
                {Object.entries(product.parameters).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-baseline gap-2 text-xs">
                    <span className="text-gray-400 font-medium whitespace-nowrap">{key}</span>
                    <div className="flex-1 border-b border-dotted border-gray-200 mx-1"></div>
                    <span className="text-gray-800 font-semibold text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Details */}
            <div>
              <h3 className="text-xs font-bold text-gray-800 mb-1.5">Описание</h3>
              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Seller Contact block */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-11 h-11 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1">
                    {product.seller.name}
                    {product.seller.isVerified && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    )}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-500 mt-0.5">
                    ⭐ {product.seller.rating.toFixed(1)}
                    <span className="text-gray-400">({product.seller.reviewsCount} отзывов)</span>
                  </div>
                </div>
              </div>

              {/* Direct Link Tag */}
              {product.seller.isVerified && (
                <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                  Документы проверены
                </span>
              )}
            </div>

            <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-2">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span>{product.location}</span>
            </div>
          </div>
        </div>

        {/* Sticky Call and Chat Buttons Footer */}
        <div className="absolute bottom-0 inset-x-0 bg-white border-t p-3 flex gap-2.5 z-20">
          <button
            onClick={() => setShowPhone(!showPhone)}
            className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-blue-500/10"
          >
            <Phone className="w-4 h-4 fill-white stroke-none" />
            <span>{showPhone ? '+7 (999) 450-20-10' : 'Позвонить'}</span>
          </button>

          <button
            onClick={() => {
              // Simulates chatting or redirect
              alert(`Открываем чат с ${product.seller.name}. Напишите приветствие!`);
            }}
            className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-emerald-500/10"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Написать</span>
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, FileText, PlusCircle, CheckCircle, Video, Image, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

function CreateListingForm({ onSubmit, listingsCount, videosCount }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('electronics');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fallback beautiful images & videos if empty
  const defaultImages = {
    electronics: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=600&q=80',
    auto: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&q=80',
    realty: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    clothing: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
    services: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
  };

  const defaultVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-smartphone-showing-a-moving-graphic-40917-large.mp4';

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (!title.trim()) {
      setError('Укажите название товара');
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      setError('Укажите корректную цену в рублях');
      return;
    }
    if (!description.trim()) {
      setError('Добавьте описание товара');
      return;
    }

    setError('');

    const newListingId = `l_user_${Date.now()}`;
    const newVideoId = videoUrl || videoUrl.trim() !== '' || description.includes('#') ? `v_user_${Date.now()}` : null;

    // Use customized image or default for category
    const finalImageUrl = imageUrl.trim() || defaultImages[category];

    // Build the listing object
    const newListing = {
      id: newListingId,
      title: title.trim(),
      price: Number(price),
      category: category,
      description: description.trim(),
      location: 'Москва, Садовое Кольцо',
      date: 'Только что',
      imageUrl: finalImageUrl,
      viewsCount: 1,
      favoritesCount: 0,
      phone: '+7 (999) 000-11-22',
      videoId: newVideoId,
      seller: {
        name: 'Илья (Вы)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 5.0,
        reviewsCount: 3,
        isVerified: true
      }
    };

    // Build the video object if relevant
    let newVideo = null;
    if (newVideoId) {
      newVideo = {
        id: newVideoId,
        listingId: newListingId,
        username: 'ilya_user',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        description: `Видео-обзор на "${title.trim()}"! Всего за ${price} руб. Напрямую от продавца! #продажа #обзор #авиток`,
        videoUrl: videoUrl.trim() || defaultVideoUrl,
        likes: 0,
        shares: 0,
        isLiked: false,
        comments: []
      };
    }

    setIsSuccess(true);
    setTimeout(() => {
      onSubmit(newListing, newVideo);
      setIsSuccess(false);
      // Clear inputs
      setTitle('');
      setPrice('');
      setCategory('electronics');
      setDescription('');
      setImageUrl('');
      setVideoUrl('');
    }, 1500);
  };

  return (
    <div className="bg-gray-50 h-full flex flex-col justify-between">
      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-12">

        {/* Banner with explanations */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 text-white shadow-md mb-5">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
            <h2 className="font-extrabold text-sm tracking-tight">Новый формат продаж!</h2>
          </div>
          <p className="text-[11px] text-indigo-100 mt-1.5 leading-relaxed">
            На <b>АвиТок</b> вы подаете не просто объявление, а можете прикрепить к нему вертикальное видео! Покупатели увидят ваш видео-обзор прямо в ленте рекомендаций и смогут сразу совершить покупку!
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center flex flex-col items-center justify-center space-y-3.5 my-8 shadow-xs animate-fade-in">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-black text-gray-800 text-base">Объявление опубликовано!</h3>
            <p className="text-gray-400 text-xs max-w-xs">Оно успешно добавлено на маркетплейс и загружено в ленту вертикальных видео-обзоров АвиТок.</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">

            {/* Display validation error */}
            {error && (
              <div className="bg-red-50 text-red-700 text-xs font-bold p-3 rounded-xl border border-red-200">
                ⚠ {error}
              </div>
            )}

            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-3.5">
              <div className="flex items-center space-x-1.5 text-indigo-600 font-bold text-xs uppercase tracking-wider pb-2 border-b border-gray-50">
                <FileText className="w-4 h-4" />
                <span>Основное</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Название товара или услуги *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например, Велосипед горный"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Цена (₽) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Например, 12500"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Категория *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-gray-800 cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Описание товара *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите состояние товара, характеристики, условия сделки..."
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-gray-800"
                />
              </div>
            </div>

            {/* Media Block (Images & Video Integration) */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs space-y-3.5">
              <div className="flex items-center space-x-1.5 text-indigo-600 font-bold text-xs uppercase tracking-wider pb-2 border-b border-gray-50">
                <Video className="w-4 h-4" />
                <span>Фото и Видео (АвиТок-Лента)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 flex items-center justify-between">
                  <span>Ссылка на фото товара</span>
                  <span className="text-[10px] font-normal text-gray-400">(опционально)</span>
                </label>
                <div className="relative flex items-center">
                  <Image className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Вставьте ссылку на картинку Unsplash"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 flex items-center justify-between">
                  <span>Добавить видео в Ленту</span>
                  <span className="text-[10px] font-normal text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-sm">Рекомендуется</span>
                </label>
                <div className="relative flex items-center">
                  <Video className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Вставьте ссылку на MP4 видео"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-gray-800"
                  />
                </div>
                <p className="text-[9px] text-gray-400 mt-1.5 leading-relaxed">
                  Оставьте пустой, чтобы сгенерировать автоматическое анимированное видео на основе описания и категории товара.
                </p>
              </div>
            </div>

            {/* Submit Actions */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Опубликовать на АвиТок</span>
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

export default CreateListingForm;

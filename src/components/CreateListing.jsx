import React, { useState } from 'react';
import { Camera, Film, PlusCircle, AlertCircle, Sparkles } from 'lucide-react';

function CreateListing({ categories, onAddProduct }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('electronics');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Москва, центр');
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Default beautiful Unsplash fallback images/videos so items are fully functional
  const fallbackImages = {
    cars: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
    realty: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
    electronics: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    fashion: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
    jobs: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80'
  };

  const fallbackVideos = {
    cars: 'https://assets.mixkit.co/videos/preview/mixkit-modern-car-driving-in-the-city-at-night-42211-large.mp4',
    realty: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-apartment-43094-large.mp4',
    electronics: 'https://assets.mixkit.co/videos/preview/mixkit-holding-and-using-a-modern-smartphone-close-up-40332-large.mp4',
    fashion: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-with-a-cool-leather-jacket-41584-large.mp4',
    jobs: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-home-42323-large.mp4'
  };

  const handleSimulatedVideoUpload = () => {
    setUploadedVideo({
      name: 'video_review_clip.mp4',
      size: '14.2 MB',
      duration: '0:15'
    });
  };

  const handleSimulatedImageUpload = () => {
    setUploadedImage({
      name: 'product_photo.jpg',
      size: '2.4 MB'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price || !description.trim()) {
      alert('Пожалуйста, заполните все обязательные поля!');
      return;
    }

    const newProd = {
      id: Date.now(),
      title,
      price: Number(price),
      category,
      location,
      date: 'Сегодня, Только что',
      views: 1,
      likes: 0,
      shares: 0,
      description,
      imageUrl: fallbackImages[category] || fallbackImages.electronics,
      videoUrl: fallbackVideos[category] || fallbackVideos.electronics,
      seller: {
        name: 'Иван Денисов (Вы)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        rating: 5.0,
        reviewsCount: 1,
        isVerified: true,
        phone: '+7 999 555-77-88'
      },
      comments: []
    };

    onAddProduct(newProd);
    setPublishedSuccess(true);

    // Clear inputs
    setTitle('');
    setPrice('');
    setDescription('');
    setUploadedVideo(null);
    setUploadedImage(null);

    setTimeout(() => {
      setPublishedSuccess(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Upper Branding Header */}
      <div className="bg-white px-4 py-4 border-b border-slate-200 shrink-0">
        <h2 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-[#00B2FF]" />
          Подать объявление с видеообзором
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Объедините силу классического объявления Авито и видеоохватов ТикТока!
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {publishedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-start gap-2.5 animate-bounce">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Объявление успешно опубликовано!</h4>
              <p className="text-xs mt-0.5">Оно появилось в каталоге товаров и в общей вертикальной видеоленте.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-xs">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Название товара / услуги *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Игровая приставка Sony PlayStation 5"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00B2FF] focus:bg-white text-slate-800 font-medium"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Категория объявления
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#00B2FF] focus:bg-white text-slate-800 font-medium cursor-pointer"
            >
              {categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Цена (в рублях) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Введите сумму"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00B2FF] focus:bg-white text-slate-800 font-bold"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Местоположение сделки
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Город, станция метро, улица"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00B2FF] focus:bg-white text-slate-800 font-medium"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Подробное описание *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Опишите состояние товара, комплектацию, причину продажи или ключевые особенности"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00B2FF] focus:bg-white text-slate-800 font-medium"
              required
            ></textarea>
          </div>

          {/* Media Attach Section (Simulated) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Image attachment button */}
            <div
              onClick={handleSimulatedImageUpload}
              className={`border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition ${
                uploadedImage
                  ? 'border-emerald-400 bg-emerald-50/50 text-emerald-800'
                  : 'border-slate-300 hover:border-[#00B2FF] bg-slate-50 hover:bg-slate-100/50 text-slate-500'
              }`}
            >
              <Camera className="w-6 h-6 mb-1 text-slate-400" />
              <span className="text-xs font-bold">Фото товара</span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {uploadedImage ? '✓ Фото прикреплено' : 'Загрузить главное фото'}
              </span>
            </div>

            {/* Video TikTok attachment button */}
            <div
              onClick={handleSimulatedVideoUpload}
              className={`border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition ${
                uploadedVideo
                  ? 'border-[#00B2FF] bg-sky-50/50 text-[#00B2FF]'
                  : 'border-slate-300 hover:border-[#00B2FF] bg-slate-50 hover:bg-slate-100/50 text-slate-500'
              }`}
            >
              <Film className="w-6 h-6 mb-1 text-slate-400" />
              <span className="text-xs font-bold">Видеообзор</span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {uploadedVideo ? '✓ Обзор прикреплен' : 'Загрузить видео TikTok'}
              </span>
            </div>
          </div>

          <div className="bg-slate-100 p-3 rounded-lg flex items-start gap-2 text-slate-500 text-[11px] leading-snug">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#00B2FF]" />
            <p>
              Важно: при отсутствии собственного фото и видео, платформа автоматически подберет подходящую
              демонстрацию для обзоров в Ленте на основе вашей категории!
            </p>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full bg-[#00B2FF] hover:bg-[#0092d0] text-white font-extrabold text-sm py-3 rounded-xl transition active:scale-95 shadow-md flex items-center justify-center gap-2"
          >
            Опубликовать объявление
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;

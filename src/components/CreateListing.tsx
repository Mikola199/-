import React, { useState } from 'react';
import { Listing } from '../types';
import { CATEGORIES } from '../data';
import { Camera, Video, Sparkles, MapPin, CheckCircle } from 'lucide-react';

interface CreateListingProps {
  onCreate: (listing: Listing) => void;
}

export default function CreateListing({ onCreate }: CreateListingProps) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Электроника');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Москва, Центр');
  const [hasDelivery, setHasDelivery] = useState(true);

  // Custom Preset Photos & Video selectors (simulating media upload)
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState(0);
  const [selectedVideoPreset, setSelectedVideoPreset] = useState(0);

  const [paramKey, setParamKey] = useState('');
  const [paramVal, setParamVal] = useState('');
  const [parameters, setParameters] = useState<{ [key: string]: string }>({
    'Состояние': 'Новое',
    'Гарантия': 'Есть'
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const photoPresets = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', // red shoe
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', // watch
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', // headphones
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800', // glasses
  ];

  const videoPresets = [
    {
      title: 'Тайпинг на клавиатуре',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-computer-keyboard-40484-large.mp4'
    },
    {
      title: 'Спортивный автомобиль',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-away-in-the-sunset-32986-large.mp4'
    },
    {
      title: 'Интерьер Квартиры',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-interior-39908-large.mp4'
    },
    {
      title: 'Девушка в стильной куртке',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-stylish-jacket-posing-40348-large.mp4'
    }
  ];

  const handleAddParameter = () => {
    if (!paramKey.trim() || !paramVal.trim()) return;
    setParameters(prev => ({
      ...prev,
      [paramKey.trim()]: paramVal.trim()
    }));
    setParamKey('');
    setParamVal('');
  };

  const handleRemoveParameter = (key: string) => {
    setParameters(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || !description.trim()) {
      alert('Пожалуйста, заполните основные поля: Название, Цена, Описание.');
      return;
    }

    const newListing: Listing = {
      id: Math.random().toString(),
      title: title.trim(),
      price: parseFloat(price) || 0,
      category,
      description: description.trim(),
      location: location.trim(),
      date: 'Только что',
      images: [photoPresets[selectedPhotoPreset]],
      videoUrl: videoPresets[selectedVideoPreset].url,
      seller: {
        id: 'user_self',
        name: 'Ваш Магазин',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        rating: 5.0,
        reviewsCount: 1,
        isVerified: true
      },
      likesCount: 0,
      viewsCount: 1,
      sharesCount: 0,
      hasDelivery,
      parameters,
      comments: []
    };

    onCreate(newListing);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      // Reset
      setTitle('');
      setPrice('');
      setDescription('');
    }, 2000);
  };

  return (
    <div className="w-full min-h-full bg-white flex flex-col text-gray-900 pb-12">

      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900">Новое объявление</h1>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1 border border-blue-100">
          <Sparkles className="w-3 h-3 text-blue-500 animate-spin" />
          Размещение с AviTok
        </span>
      </div>

      {isSuccess ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-auto">
          <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
          <h2 className="text-xl font-bold text-gray-800">Объявление успешно опубликовано!</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xs">
            Ваш товар добавлен в АвиТорг, а демонстрационное видео уже доступно в ленте АвиТок!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-5">

          {/* Main info section */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Название товара *</label>
              <input
                type="text"
                placeholder="Например: Спортивные кроссовки Nike 42"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Цена (₽) *</label>
                <input
                  type="number"
                  placeholder="1500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Категория *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 transition cursor-pointer"
                >
                  {CATEGORIES.filter(c => c !== 'Все').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Preset Photo Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-blue-500" />
              Выберите фото товара
            </label>
            <div className="grid grid-cols-4 gap-2">
              {photoPresets.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedPhotoPreset(idx)}
                  className={`aspect-square rounded-xl overflow-hidden relative border-2 transition ${
                    selectedPhotoPreset === idx ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={preset} alt="preset" className="w-full h-full object-cover" />
                  {selectedPhotoPreset === idx && (
                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center text-white">
                      <CheckCircle className="w-5 h-5 fill-blue-600 stroke-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preset Video Selector (Crucial AviTok element!) */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-pink-500" />
              Прикрепите видеообзор (AviTok Эфир)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {videoPresets.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedVideoPreset(idx)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition ${
                    selectedVideoPreset === idx
                      ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                      : 'border-gray-200 text-gray-600 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-pink-400">Пресет {idx + 1}</span>
                  <span className="text-xs truncate">{preset.title}</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 leading-snug">
              Привязанное видео будет автоматически запущено в вертикальной ленте АвиТок для привлечения тысяч потенциальных покупателей!
            </p>
          </div>

          {/* Specifications Table Creator */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Характеристики товара</label>
            <div className="space-y-2">
              {Object.entries(parameters).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg text-xs border border-gray-100">
                  <span className="font-semibold text-gray-700">{key}: <span className="font-bold text-gray-900">{val}</span></span>
                  <button
                    type="button"
                    onClick={() => handleRemoveParameter(key)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Удалить
                  </button>
                </div>
              ))}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Свойство (напр. Бренд)"
                  value={paramKey}
                  onChange={(e) => setParamKey(e.target.value)}
                  className="flex-1 bg-gray-50 rounded-lg px-2.5 py-1.5 text-xs border border-gray-200"
                />
                <input
                  type="text"
                  placeholder="Значение (напр. Nike)"
                  value={paramVal}
                  onChange={(e) => setParamVal(e.target.value)}
                  className="flex-1 bg-gray-50 rounded-lg px-2.5 py-1.5 text-xs border border-gray-200"
                />
                <button
                  type="button"
                  onClick={handleAddParameter}
                  className="bg-gray-800 text-white rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-gray-900 transition"
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Описание товара *</label>
            <textarea
              placeholder="Подробно расскажите о товаре: состояние, причина продажи, удобное время для звонков..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 transition resize-none"
            />
          </div>

          {/* Location details */}
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              Место встречи / Город
            </label>
            <input
              type="text"
              placeholder="Москва, м. Арбатская"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Delivery Toggle Checkbox */}
          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <h4 className="text-xs font-bold text-gray-800">Включить Авито Доставку</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Безопасная сделка: оплата после получения</p>
            </div>
            <input
              type="checkbox"
              checked={hasDelivery}
              onChange={(e) => setHasDelivery(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm transition active:scale-95 shadow-xl shadow-blue-500/15"
          >
            Опубликовать объявление
          </button>
        </form>
      )}
    </div>
  );
}

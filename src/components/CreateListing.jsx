import React, { useState } from 'react';
import { Camera, Video, Plus, ShieldCheck, Check } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function CreateListing({ onAddProduct }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Электроника");
  const [condition, setCondition] = useState("Новое");
  const [description, setDescription] = useState("");
  const [imageStyle, setImageStyle] = useState("linear-gradient(135deg, #667eea 0%, #764ba2 100%)");
  const [videoStyle, setVideoStyle] = useState("linear-gradient(135deg, #11998e 0%, #38ef7d 100%)");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const imagesStyles = [
    { name: "Синий шторм", style: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" },
    { name: "Огненный закат", style: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600" },
    { name: "Изумрудный луч", style: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" },
    { name: "Темная глубина", style: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    setSubmitting(true);

    setTimeout(() => {
      const selectedTheme = imagesStyles.find(x => x.style === videoStyle) || imagesStyles[0];

      const newProduct = {
        id: Date.now(),
        title,
        price: parseInt(price),
        category,
        condition,
        location: "Москва, м. Арбатская",
        sellerName: "Вы (Продавец)",
        sellerRating: 5.0,
        sellerReviewsCount: 1,
        description,
        views: 1,
        dateAdded: "Только что",
        phone: "+7 999 555-55-55",
        image: selectedTheme.image,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-with-a-black-screen-40748-large.mp4",
        likes: 0,
        commentsCount: 0,
        videoTheme: videoStyle,
        videoDescription: `🔥 Обзор на ${title}! Категория: ${category}. Состояние: ${condition}. Отличное качество! Смотрите и заказывайте!`,
        comments: [],
        sellerResponses: ["Привет! Да, все в наличии, готов отправить Авито доставкой прямо сегодня."]
      };

      onAddProduct(newProduct);
      setSubmitting(false);
      setSubmitted(true);

      // Reset form
      setTitle("");
      setPrice("");
      setCategory("Электроника");
      setCondition("Новое");
      setDescription("");
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-[#121216] max-w-xl mx-auto rounded-3xl border border-gray-100 dark:border-white/5 p-8 text-center space-y-4 shadow-md animate-fade-in">
        <div className="w-16 h-16 bg-avito-green/10 text-avito-green rounded-full flex items-center justify-center mx-auto shadow-sm">
          <Check size={32} className="stroke-[3]" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Объявление успешно размещено!</h2>
        <p className="text-xs text-gray-500 max-w-xs mx-auto">
          Ваше объявление прошло модерацию и теперь доступно в общем каталоге и в ленте коротких видео-обзоров АвиТок.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="bg-avito-blue text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-avito-blue/90"
          >
            Разместить еще одно
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#121216] max-w-2xl mx-auto rounded-3xl border border-gray-100 dark:border-white/5 p-6 md:p-8 shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-avito-blue/10 text-avito-blue rounded-xl flex items-center justify-center">
          <Plus size={20} className="stroke-[2.5]" />
        </div>
        <div>
          <h2 className="font-bold text-base text-gray-900 dark:text-white">Новое объявление с видео-обзором</h2>
          <p className="text-[10px] text-gray-400 mt-0.5">Разместите товар в каталог Авито и видеоленту АвиТок одновременно!</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Название объявления</label>
          <input
            type="text"
            required
            placeholder="Например, iPhone 15 Pro, Кроссовки Nike Air..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl text-xs border border-gray-100 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-avito-blue"
          />
        </div>

        {/* Category & Condition */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Категория</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl text-xs border border-gray-100 dark:border-white/5 focus:outline-none text-gray-700 dark:text-gray-200"
            >
              {CATEGORIES.filter(c => c !== "Все").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Состояние</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl text-xs border border-gray-100 dark:border-white/5 focus:outline-none text-gray-700 dark:text-gray-200"
            >
              <option value="Новое">Новое</option>
              <option value="Отличное">Отличное (б/у)</option>
              <option value="Хорошее">Хорошее (б/у)</option>
              <option value="Б/у">Б/у</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Цена (в рублях)</label>
          <input
            type="number"
            required
            placeholder="Укажите цену"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl text-xs border border-gray-100 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-avito-blue"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Описание товара</label>
          <textarea
            required
            rows={4}
            placeholder="Подробно опишите состояние, комплектацию и причину продажи товара..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl text-xs border border-gray-100 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-avito-blue resize-none"
          />
        </div>

        {/* Interactive Media Settings for Mock Up */}
        <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4">
          <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center">
            <Video size={14} className="mr-1.5 text-tiktok-pink animate-pulse" />
            Интерактивный АвиТок Обзор (Генератор Видео)
          </h3>

          <div className="space-y-2">
            <p className="text-[10px] text-gray-400">Выберите цветовое оформление вашего видеоролика:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {imagesStyles.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setVideoStyle(item.style)}
                  className={`p-2 rounded-xl text-left border transition-all text-[10px] ${
                    videoStyle === item.style
                      ? 'border-tiktok-pink bg-white dark:bg-white/5 ring-1 ring-tiktok-pink shadow-sm'
                      : 'border-transparent bg-white/40 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10'
                  }`}
                >
                  <div className="w-full h-8 rounded-lg mb-1" style={{ background: item.style }} />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-avito-blue hover:bg-avito-blue/95 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-transform active:scale-95 disabled:opacity-50"
        >
          {submitting ? (
            <span>Размещение на АвиТок...</span>
          ) : (
            <>
              <ShieldCheck size={16} />
              <span>Разместить на АвиТок</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
}

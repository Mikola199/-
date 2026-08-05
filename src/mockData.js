// Russian Mock Data representing listings and TikTok-style short review videos.

export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'Все категории' },
  { id: 'cars', name: 'Автомобили' },
  { id: 'realty', name: 'Недвижимость' },
  { id: 'electronics', name: 'Электроника' },
  { id: 'fashion', name: 'Одежда и обувь' },
  { id: 'jobs', name: 'Работа и услуги' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'Porsche Cayenne Coupe 3.0 AT, 2021',
    price: 9450000,
    category: 'cars',
    location: 'Москва, ул. Тверская',
    date: 'Сегодня, 14:20',
    views: 12500,
    likes: 840,
    shares: 112,
    description: 'Официальный автомобиль, идеальное состояние. Один владелец. Полный комплект документов, два ключа. Пневмоподвеска, спортивный выхлоп, панорамная крыша, премиальная акустика Bose. Любые проверки приветствуются.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-car-driving-in-the-city-at-night-42211-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80',
    seller: {
      name: 'Александр (Elite Auto)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviewsCount: 142,
      isVerified: true,
      phone: '+7 999 123-45-67',
    },
    comments: [
      { id: 101, username: 'Дмитрий', text: 'Зверь машина! Цвет просто нереальный.', time: '2ч назад' },
      { id: 102, username: 'Макс', text: 'Торг уместен у капота? Готов посмотреть сегодня.', time: '1ч назад' },
    ]
  },
  {
    id: 2,
    title: 'Студия с панорамным видом на Сити, 35 м²',
    price: 18500000,
    category: 'realty',
    location: 'Москва, Пресненская наб.',
    date: 'Вчера, 18:05',
    views: 23100,
    likes: 1250,
    shares: 420,
    description: 'Продается видовая студия на 45 этаже в башне "Федерация". Дизайнерский ремонт в стиле минимализм с использованием премиальных материалов. Панорамное остекление, умный дом. Идеально под инвестиции или для жизни.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-apartment-43094-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
    seller: {
      name: 'Sminex Premium Realty',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      rating: 5.0,
      reviewsCount: 38,
      isVerified: true,
      phone: '+7 900 555-55-11',
    },
    comments: [
      { id: 201, username: 'Ирина', text: 'Вид из окна просто завораживает! Мечта.', time: '5ч назад' },
      { id: 202, username: 'Сергей', text: 'Какая коммуналка выходит в месяц?', time: '3ч назад' },
    ]
  },
  {
    id: 3,
    title: 'iPhone 15 Pro Max 256GB Natural Titanium',
    price: 115000,
    category: 'electronics',
    location: 'Санкт-Петербург, Невский пр.',
    date: 'Сегодня, 10:15',
    views: 8900,
    likes: 540,
    shares: 34,
    description: 'Новый, запечатанный iPhone 15 Pro Max. Цвет: Натуральный Титан. Версия eSIM+eSIM. Гарантия 1 год. Чек от официального магазина. В наличии также есть другие цвета и объемы памяти. Звоните!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-and-using-a-modern-smartphone-close-up-40332-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
    seller: {
      name: 'iStore СПб',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      rating: 4.8,
      reviewsCount: 612,
      isVerified: true,
      phone: '+7 911 321-65-43',
    },
    comments: [
      { id: 301, username: 'Антон', text: 'Обмен на 14 Pro с доплатой интересен?', time: '1ч назад' },
      { id: 302, username: 'Оля', text: 'Супер! Цена отличная для Питера.', time: '30м назад' },
    ]
  },
  {
    id: 4,
    title: 'Кастомная кожаная куртка "Cyberpunk"',
    price: 18900,
    category: 'fashion',
    location: 'Казань, ул. Баумана',
    date: '3 дня назад',
    views: 4500,
    likes: 310,
    shares: 78,
    description: 'Эксклюзивная косуха ручной работы с неоновым принтом и гравировкой на спине в стиле Киберпанк. Натуральная итальянская кожа, качественная фурнитура YKK. Размер М (48). Светится в ультрафиолете!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-with-a-cool-leather-jacket-41584-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    seller: {
      name: 'Neon Craft Wear',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      rating: 4.7,
      reviewsCount: 29,
      isVerified: false,
      phone: '+7 950 444-22-11',
    },
    comments: [
      { id: 401, username: 'Кирилл', text: 'Какая длина по спине?', time: '2 дня назад' },
      { id: 402, username: 'Анна', text: 'Вау, рисунок просто шедевр!', time: '1 день назад' },
    ]
  },
  {
    id: 5,
    title: 'Ведущий Backend разработчик (Node.js / Python)',
    price: 250000, // Monthly salary
    category: 'jobs',
    location: 'Удаленно / Москва',
    date: 'Сегодня, 09:00',
    views: 3120,
    likes: 195,
    shares: 56,
    description: 'Ищем опытного Backend разработчика на проект в сфере EdTech. Стек: Node.js (NestJS), Python (FastAPI), PostgreSQL, Redis, Docker. Опыт от 3 лет. Полная удаленка, гибкий график, ДМС, оплата обучения.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-home-42323-large.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
    seller: {
      name: 'HR Tech-Solutions',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      rating: 4.6,
      reviewsCount: 15,
      isVerified: true,
      phone: '+7 800 100-20-30',
    },
    comments: [
      { id: 501, username: 'Илья Backend', text: 'Отправил резюме в ЛС, посмотрите плиз.', time: '4ч назад' },
    ]
  }
];

export const INITIAL_CHATS = [
  {
    id: 'chat_alex',
    productId: 1,
    sellerName: 'Александр (Elite Auto)',
    productTitle: 'Porsche Cayenne Coupe 2021',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    messages: [
      { id: 1, sender: 'seller', text: 'Здравствуйте! Интересует Porsche Cayenne?', time: '15:30' },
      { id: 2, sender: 'user', text: 'Добрый день! Да, подскажите, аварии или крашеные детали были?', time: '15:31' },
      { id: 3, sender: 'seller', text: 'Автомобиль полностью в родной краске, без ДТП и притертостей. Любые проверки у дилера.', time: '15:33' },
    ]
  },
  {
    id: 'chat_istore',
    productId: 3,
    sellerName: 'iStore СПб',
    productTitle: 'iPhone 15 Pro Max 256GB',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    messages: [
      { id: 1, sender: 'user', text: 'Привет! Есть ли в наличии синий цвет?', time: 'Вчера' },
      { id: 2, sender: 'seller', text: 'Приветствуем! Да, Blue Titanium в наличии по той же цене.', time: 'Вчера' },
    ]
  }
];

export const USER_PROFILE = {
  name: 'Иван Денисов',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  rating: 4.85,
  reviewsCount: 12,
  balance: 45200,
  publishedListingsCount: 3,
  likedListingsCount: 8,
  viewsCount: 1420,
  joinedDate: 'Регистрация с января 2022',
  isPremium: true
};

// Simple auto-reply generator for buyer-seller chat interaction simulation
export function getBotReply(productTitle, userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('привет') || msg.includes('здравствуй') || msg.includes('добрый')) {
    return 'Здравствуйте! Спасибо за интерес к объявлению "' + productTitle + '". Чем я могу вам помочь?';
  }
  if (msg.includes('скидк') || msg.includes('торг') || msg.includes('дешев')) {
    return 'Цена уже отличная, но небольшую скидку реальному покупателю смогу сделать на месте!';
  }
  if (msg.includes('обмен')) {
    return 'Интересует в основном прямая продажа, но можете прислать ваше предложение в подробностях.';
  }
  if (msg.includes('наличии') || msg.includes('продается') || msg.includes('актуально')) {
    return 'Да, объявление актуально! Товар в наличии, можете забирать.';
  }
  if (msg.includes('где') || msg.includes('адрес') || msg.includes('встреч')) {
    return 'Я нахожусь по адресу, указанному в объявлении. Можем договориться о просмотре на удобное время.';
  }
  if (msg.includes('телефон') || msg.includes('номер') || msg.includes('позвон')) {
    return 'Вы можете позвонить мне напрямую по номеру в профиле или написать сюда ваш телефон, я перезвоню.';
  }

  return 'Отличный вопрос! Давайте я уточню детали по поводу "' + productTitle + '" и сразу вам отвечу. Можем созвониться!';
}

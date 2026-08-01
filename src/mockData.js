// Rich mock datasets in Russian for the AviTok application.
// Contains vertical videos (for the TikTok feed) and classified listings (for the Avito catalog).

export const MOCK_CATEGORIES = [
  { id: 'all', name: 'Все' },
  { id: 'electronics', name: 'Электроника' },
  { id: 'auto', name: 'Авто и транспорт' },
  { id: 'real_estate', name: 'Недвижимость' },
  { id: 'fashion', name: 'Одежда и обувь' },
  { id: 'services', name: 'Услуги' },
  { id: 'hobbies', name: 'Хобби и отдых' }
];

export const INITIAL_LISTINGS = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max 256GB (Идеальное состояние)',
    price: 105000,
    category: 'electronics',
    location: 'Москва, м. Арбатская',
    date: 'Сегодня, 14:20',
    description: 'Продаю свой iPhone 15 Pro Max на 256 ГБ. Цвет Титановый Серый. Состояние аккумулятора 98%. Полный комплект: коробка, оригинальный провод, в подарок отдам 3 качественных чехла. Экран с первого дня в защитном стекле. Без сколов и царапин.',
    seller: {
      name: 'Алексей Д.',
      rating: 4.9,
      reviewsCount: 42,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isOnline: true
    },
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-with-a-blank-screen-34241-large.mp4',
    likes: 342,
    shares: 48,
    comments: [
      { id: 101, author: 'Игорь К.', text: 'Обмен на Samsung S24 Ultra интересует?', date: '1 час назад' },
      { id: 102, author: 'Елена В.', text: 'Торг уместен? За 95 тысяч заберу сегодня.', date: '30 минут назад' }
    ]
  },
  {
    id: 2,
    title: 'BMW 3 серии 2.0 AT, 2019, седан',
    price: 3200000,
    category: 'auto',
    location: 'Санкт-Петербург, р-н Приморский',
    date: 'Вчера, 18:05',
    description: 'Официальный дилерский автомобиль. Один владелец. Обслуживание исключительно на официальном дилере, есть вся история в сервисной книжке. В ДТП не участвовал, кузов в заводском окрасе. Богатая комплектация M-Sport: лазерные фары, проекционный дисплей, музыка Harman/Kardon.',
    seller: {
      name: 'Premium Auto',
      rating: 4.7,
      reviewsCount: 128,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      isOnline: false
    },
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-driving-in-a-futuristic-car-at-night-42171-large.mp4',
    likes: 890,
    shares: 125,
    comments: [
      { id: 201, author: 'Дмитрий С.', text: 'Красавица! Какая резина идет в комплекте?', date: 'Вчера' },
      { id: 202, author: 'Николай', text: 'Пробег какой реальный?', date: 'Вчера' }
    ]
  },
  {
    id: 3,
    title: 'Стильная 2-к квартира, 62 м², 14/25 эт.',
    price: 14500000,
    category: 'real_estate',
    location: 'Казань, ул. Сибгата Хакима',
    date: '3 дня назад',
    description: 'Продается видовая двухкомнатная квартира с дизайнерским ремонтом на набережной. Панорамное остекление, шикарный вид на Кремль и реку Казанка. Теплые полы, кондиционеры во всех комнатах, встроенная премиальная техника Bosch. Закрытый двор, охрана, подземный паркинг.',
    seller: {
      name: 'Регина Риелтор',
      rating: 5.0,
      reviewsCount: 19,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      isOnline: true
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cozy-living-room-with-a-modern-interior-41584-large.mp4',
    likes: 1245,
    shares: 310,
    comments: [
      { id: 301, author: 'Марат', text: 'Парковочное место входит в стоимость?', date: '2 дня назад' }
    ]
  },
  {
    id: 4,
    title: 'Кастомная кожаная куртка "Cyberpunk"',
    price: 18000,
    category: 'fashion',
    location: 'Екатеринбург, р-н Центральный',
    date: 'Сегодня, 11:05',
    description: 'Авторская ручная роспись на натуральной коже. Износостойкие краски, рисунок не трескается и не смывается водой. Куртка абсолютно новая, размер L. Станьте уникальным в этой шикарной косухе!',
    seller: {
      name: 'Арт-Студия Eclipse',
      rating: 4.8,
      reviewsCount: 67,
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      isOnline: true
    },
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-jacket-43026-large.mp4',
    likes: 512,
    shares: 99,
    comments: [
      { id: 401, author: 'Кирилл', text: 'А под заказ на другой размер сделаете?', date: '4 часа назад' }
    ]
  },
  {
    id: 5,
    title: 'Профессиональная видеосъемка и монтаж',
    price: 5000,
    category: 'services',
    location: 'Новосибирск, р-н Железнодорожный',
    date: 'Сегодня, 09:15',
    description: 'Создаем продающие видео для вашего бизнеса, экспертные Reels, Shorts, TikToks. Съемка рекламы, интервью, корпоративных мероприятий. Современное оборудование (Sony FX3, свет, петлички DJI Mic 2). Стоимость указана за час работы с учетом базового монтажа.',
    seller: {
      name: 'Максим Видеограф',
      rating: 4.9,
      reviewsCount: 31,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isOnline: false
    },
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-recording-with-a-professional-video-camera-34538-large.mp4',
    likes: 219,
    shares: 17,
    comments: [
      { id: 501, author: 'Ольга', text: 'Какое минимальное время заказа?', date: '3 часа назад' }
    ]
  }
];

export const MOCK_CHATS = {
  1: [
    { id: 1, sender: 'seller', text: 'Здравствуйте! Да, телефон свободен. Защитное стекло наклеено.', date: 'Вчера, 15:30' },
    { id: 2, sender: 'user', text: 'Отлично. Могу ли я приехать посмотреть сегодня вечером?', date: 'Вчера, 15:32' },
    { id: 3, sender: 'seller', text: 'Да, конечно. Буду дома после 19:00 на м. Арбатская.', date: 'Вчера, 15:35' }
  ],
  2: [
    { id: 1, sender: 'seller', text: 'Добрый день! Автомобиль находится в нашем салоне, готов к просмотру.', date: 'Вчера, 19:00' }
  ],
  3: [],
  4: [
    { id: 1, sender: 'seller', text: 'Привет! Да, можем обсудить кастомный принт. Напиши свои пожелания!', date: '3 часа назад' }
  ]
};

// Simulated smart answer system
export const BOT_RESPONSES = [
  "Привет! Спасибо за интерес к объявлению. Товар в наличии. Когда вам удобно посмотреть?",
  "Здравствуйте! Готов обсудить разумный торг. Какое у вас предложение?",
  "Добрый день! Можем отправить Авито Доставкой или встретиться лично. Что предпочтительнее?",
  "Привет! Да, все характеристики соответствуют описанию. Напишите, если хотите больше фото или видео.",
  "Здравствуйте! Буду на месте сегодня до 20:00. Приезжайте, пишите как будете подъезжать."
];

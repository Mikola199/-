// Mock data for AviTok (АвиТок) in Russian

export const CATEGORIES = [
  { id: 'all', name: 'Все' },
  { id: 'electronics', name: 'Электроника' },
  { id: 'auto', name: 'Авто' },
  { id: 'realty', name: 'Недвижимость' },
  { id: 'clothing', name: 'Одежда' },
  { id: 'services', name: 'Услуги' }
];

export const MOCK_LISTINGS = [
  {
    id: 'l1',
    title: 'iPhone 15 Pro Max 256GB, Синий титан',
    price: 115000,
    category: 'electronics',
    description: 'Идеальное состояние, без единой царапины. Использовался бережно в чехле и с защитным стеклом. Батарея 98%. Полный комплект: коробка, оригинальный кабель. В подарок отдам 3 чехла. Любые проверки на месте. Звоните или пишите!',
    location: 'Москва, м. Тверская',
    date: 'Сегодня в 14:20',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    viewsCount: 542,
    favoritesCount: 38,
    phone: '+7 (999) 123-45-67',
    videoId: 'v1',
    seller: {
      name: 'Дмитрий',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: 4.9,
      reviewsCount: 42,
      isVerified: true
    }
  },
  {
    id: 'l2',
    title: 'BMW 3 серии 2.0 AT, 2019, 85 000 км',
    price: 3450000,
    category: 'auto',
    description: 'Продаю любимый автомобиль в связи с переездом. Я второй владелец. Обслуживание строго у официального дилера, есть вся история. Не бит, не крашен, кузов покрыт керамикой. Салон чистый, не курили. Зимний комплект резины на дисках в подарок. Салонам не беспокоить!',
    location: 'Санкт-Петербург, р-н Приморский',
    date: 'Вчера в 18:05',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
    viewsCount: 1205,
    favoritesCount: 154,
    phone: '+7 (999) 765-43-21',
    videoId: 'v2',
    seller: {
      name: 'Алексей',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
      rating: 4.8,
      reviewsCount: 19,
      isVerified: true
    }
  },
  {
    id: 'l3',
    title: '1-к. квартира, 38 м², 12/17 эт.',
    price: 8900000,
    category: 'realty',
    description: 'Светлая, уютная однокомнатная квартира с дизайнерским ремонтом. Полностью укомплектована мебелью и качественной бытовой техникой (стиральная машина, посудомоечная машина, духовой шкаф, холодильник, кондиционер). Заезжай и живи! Свободная продажа, один собственник, без обременений.',
    location: 'Казань, ул. Сибгата Хакима, 15',
    date: 'Сегодня в 09:15',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    viewsCount: 310,
    favoritesCount: 45,
    phone: '+7 (999) 456-78-90',
    videoId: 'v3',
    seller: {
      name: 'Екатерина',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      rating: 5.0,
      reviewsCount: 8,
      isVerified: false
    }
  },
  {
    id: 'l4',
    title: 'Кастомные кроссовки Nike Air Force 1',
    price: 12500,
    category: 'clothing',
    description: 'Профессиональный ручной кастом оригинальных кроссовок Nike Air Force 1. Использованы качественные акриловые краски Angelus (США), рисунок не трескается и не смывается водой. Кроссовки абсолютно новые, в коробке. Размер 42 (27 см). Выделяйся из толпы!',
    location: 'Новосибирск, Центральный район',
    date: '3 дня назад',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    viewsCount: 231,
    favoritesCount: 29,
    phone: '+7 (999) 111-22-33',
    videoId: 'v4',
    seller: {
      name: 'Артур (CustomLab)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 4.7,
      reviewsCount: 31,
      isVerified: true
    }
  },
  {
    id: 'l5',
    title: 'Услуги профессионального свадебного фотографа',
    price: 4500,
    category: 'services',
    description: 'Живые, эмоциональные и качественные фотографии вашего счастливого дня! Опыт работы более 7 лет. Работаю на профессиональной технике Sony. Помогу с позированием, выбором локации и таймингом. Первая серия снимков (20-30 шт) уже через 3 дня! Полный день съемки — приятные скидки. Спешите забронировать дату!',
    location: 'Краснодар, р-н Западный',
    date: 'Сегодня в 11:00',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    viewsCount: 189,
    favoritesCount: 14,
    phone: '+7 (999) 888-99-00',
    videoId: 'v5',
    seller: {
      name: 'Мария',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      rating: 4.9,
      reviewsCount: 15,
      isVerified: false
    }
  },
  {
    id: 'l6',
    title: 'Игровой ПК Core i7 / RTX 4070 / 32GB RAM',
    price: 145000,
    category: 'electronics',
    description: 'Мощнейший игровой компьютер, собран из новых комплектующих в марте этого года. Идеален для любых игр на ультра-настройках в 2K и 4K разрешении, а также для стриминга, монтажа видео и 3D-моделирования. Полностью настроен, установлена чистая Windows 11 Pro и все драйверы. Гарантия на комплектующие 1 год!',
    location: 'Екатеринбург, р-н Ленинский',
    date: '2 дня назад',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    viewsCount: 412,
    favoritesCount: 52,
    phone: '+7 (999) 555-55-55',
    videoId: 'v6',
    seller: {
      name: 'Сергей',
      avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80',
      rating: 4.9,
      reviewsCount: 56,
      isVerified: true
    }
  }
];

export const MOCK_VIDEOS = [
  {
    id: 'v1',
    listingId: 'l1',
    username: 'dmitry_tech',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    description: 'Обзор iPhone 15 Pro Max в цвете Синий титан ⚡️ Состояние просто пушка, батарея держит отлично! Пишите в ЛС, отдаю за 115к! #iphone15promax #apple #продажа #москва #авиток',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-with-a-green-screen-closely-40916-large.mp4',
    likes: 352,
    shares: 12,
    isLiked: false,
    comments: [
      { id: 'c1_1', username: 'ivan_apple', text: 'Какая емкость батареи точная?', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', time: '1 час назад' },
      { id: 'c1_2', username: 'masha_smart', text: 'Ого, цена отличная для про макса в таком состоянии 😍', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', time: '30 мин назад' },
      { id: 'c1_3', username: 'pavel_k', text: 'Обмен на 14 Pro с доплатой интересен?', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', time: '5 мин назад' }
    ]
  },
  {
    id: 'v2',
    listingId: 'l2',
    username: 'alexey_cars',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
    description: 'Твоя будущая BMW 3! Легендарный кузов, идеальный уход, дилерское обслуживание. Звук мотора — песня 🚀 Смотри в объявлении все детали! #bmw #авторынок #купиавто #бмв3 #авиток',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dashboard-of-a-car-driving-at-night-40292-large.mp4',
    likes: 854,
    shares: 34,
    isLiked: true,
    comments: [
      { id: 'c2_1', username: 'car_lover_99', text: 'Вид шикарный! Диски оригинальные?', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80', time: '2 часа назад' },
      { id: 'c2_2', username: 'serg_piter', text: 'Пробег реальный? Готов приехать на диагностику.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', time: '1 час назад' }
    ]
  },
  {
    id: 'v3',
    listingId: 'l3',
    username: 'ekaterina_realty',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    description: 'Обзор квартиры на Сибгата Хакима! Дизайнерский ремонт, вид на город, мебель остается. Идеальный вариант под сдачу или для себя 🌆 #недвижимостьказань #купитьквартиру #казань #авиток',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-with-cozy-furniture-41712-large.mp4',
    likes: 412,
    shares: 28,
    isLiked: false,
    comments: [
      { id: 'c3_1', username: 'renat_kzn', text: 'Район топовый, цена адекватная для этого дома.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', time: '4 часа назад' },
      { id: 'c3_2', username: 'olga_v', text: 'А сколько коммуналка выходит зимой?', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', time: '2 часа назад' }
    ]
  },
  {
    id: 'v4',
    listingId: 'l4',
    username: 'art_custom_lab',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    description: 'Процесс создания кастомных Nike Air Force 1 🎨 Настоящее искусство на ваших ногах! Влагостойкие краски, оригинальная пара. Оценивайте в комментах! #nikecustom #кастомкроссовок #streetwear #авиток',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-artist-painting-on-canvas-with-brush-43187-large.mp4',
    likes: 1042,
    shares: 88,
    isLiked: false,
    comments: [
      { id: 'c4_1', username: 'sneakerhead_ru', text: 'Просто шедевр! На заказ делаете другие рисунки?', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&q=80', time: '1 день назад' },
      { id: 'c4_2', username: 'tim_style', text: 'Очень крутой кастом, цвета подобраны идеально 🔥', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', time: '12 часов назад' }
    ]
  },
  {
    id: 'v5',
    listingId: 'l5',
    username: 'maria_ph',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    description: 'Бэкстейдж с нашей свадебной фотосессии 📸 Люблю ловить ваши искренние улыбки и взгляды! Свободные даты на лето тают на глазах, пишите! #свадебныйфотограф #фотографкраснодар #идеидляфото #авиток',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-photographing-with-a-retro-camera-40078-large.mp4',
    likes: 289,
    shares: 15,
    isLiked: false,
    comments: [
      { id: 'c5_1', username: 'kristina_m', text: 'Маша, спасибо за наши нереальные свадебные фото! Ты лучшая ❤️', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', time: '2 дня назад' }
    ]
  },
  {
    id: 'v6',
    listingId: 'l6',
    username: 'sergey_builds',
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80',
    description: 'Сборка монстра на RTX 4070 👾 Все летает на ультрах, тесты в киберпанке радуют глаз! Компьютер ждет своего владельца, смотри контакты! #игровойпк #rtx4070 #сборкапк #гейминг #авиток',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-gamer-playing-on-a-glowing-keyboard-41710-large.mp4',
    likes: 671,
    shares: 41,
    isLiked: false,
    comments: [
      { id: 'c6_1', username: 'alex_cyber', text: 'Кабель-менеджмент идеальный, сборка топ!', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80', time: '1 день назад' },
      { id: 'c6_2', username: 'hard_gamer', text: 'Какая материнка стоит?', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', time: '18 часов назад' }
    ]
  }
];

export const MOCK_CHATS = [
  {
    id: 'ch1',
    listingId: 'l1',
    sellerName: 'Дмитрий (iPhone 15 Pro Max)',
    sellerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    messages: [
      { id: 'm1', sender: 'user', text: 'Здравствуйте! Телефон еще продается?', time: 'Вчера 19:30' },
      { id: 'm2', sender: 'seller', text: 'Здравствуйте! Да, актуально. Телефон в идеальном состоянии.', time: 'Вчера 19:35' },
      { id: 'm3', sender: 'user', text: 'Отлично, а где можно встретиться для проверки?', time: 'Сегодня 10:15' },
    ],
    autoReplies: [
      'Конечно, можем встретиться в центре, например, в ТЦ Охотный Ряд. Вам в какое время удобно?',
      'Да, без проблем! Могу показать телефон сегодня после 18:05.',
      'Оригинальный чек тоже сохранился, могу взять его с собой.'
    ]
  },
  {
    id: 'ch2',
    listingId: 'l2',
    sellerName: 'Алексей (BMW 3 серии)',
    sellerAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
    messages: [
      { id: 'm1_b', sender: 'user', text: 'Добрый день! Подскажите, красились ли какие-то детали машины?', time: 'Вчера 15:00' },
      { id: 'm2_b', sender: 'seller', text: 'Добрый день. Нет, кузов полностью в родной краске, любые проверки толщиномером приветствуются.', time: 'Вчера 15:10' }
    ],
    autoReplies: [
      'Готов подъехать на СТО для диагностики, но только в Приморском районе.',
      'По цене готов немного уступить у капота при реальном интересе!',
      'Машина застрахована до конца года, юридически полностью чиста.'
    ]
  }
];

export const CURRENT_USER = {
  name: 'Илья',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  rating: 5.0,
  reviewsCount: 3,
  balance: '5 400 ₽',
  listedItems: ['l4'], // user listed Force 1s
  savedItems: ['l1', 'l2']
};

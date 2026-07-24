import { Listing } from './types';

export const CATEGORIES = [
  'Все',
  'Электроника',
  'Транспорт',
  'Недвижимость',
  'Одежда и обувь',
  'Хобби и отдых',
  'Услуги',
  'Работа',
  'Для дома и дачи'
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB Titanium',
    price: 115000,
    category: 'Электроника',
    description: 'Абсолютно новый оригинальный iPhone 15 Pro Max на 256 ГБ в роскошном цвете Natural Titanium. Запечатанный, не активированный. Официальная гарантия 1 год. В подарок отдаю качественный прозрачный чехол и защитное стекло с установкой. Пишите в любое время или звоните!',
    location: 'Москва, м. Выставочная',
    date: 'Сегодня в 14:20',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-smartphone-on-a-table-41444-large.mp4',
    seller: {
      id: 's1',
      name: 'SmartStore MSK',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      rating: 4.9,
      reviewsCount: 312,
      isVerified: true,
      isFollowed: false
    },
    likesCount: 1420,
    viewsCount: 28430,
    sharesCount: 185,
    hasDelivery: true,
    parameters: {
      'Состояние': 'Новое',
      'Производитель': 'Apple',
      'Модель': 'iPhone 15 Pro Max',
      'Встроенная память': '256 ГБ',
      'Цвет': 'Натуральный титан'
    },
    comments: [
      {
        id: 'c1_1',
        author: 'Максим',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150',
        text: 'А рассрочка у вас есть? Уж очень крутой титан!',
        time: '2 часа назад',
        likes: 12
      },
      {
        id: 'c1_2',
        author: 'Алина K.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        text: 'Брала у ребят на прошлой неделе, оригинальный телефон, все супер 🔥',
        time: '1 день назад',
        likes: 45
      }
    ]
  },
  {
    id: '2',
    title: 'Porsche Taycan 4S Electric 2022',
    price: 9200000,
    category: 'Транспорт',
    description: 'Электрическое совершенство. Porsche Taycan 4S. Запас хода 450 км. Состояние нового автомобиля. Привезен из Германии, полностью растаможен, ЭПТС на руках. Оригинальный пробег 18,000 км. Родной окрас, любые проверки. Панорамная крыша, премиум акустика Bose, пневмоподвеска, спортивный хронопакет.',
    location: 'Санкт-Петербург, м. Беговая',
    date: 'Вчера в 18:05',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-away-in-the-sunset-32986-large.mp4',
    seller: {
      id: 's2',
      name: 'Status Auto',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      rating: 5.0,
      reviewsCount: 88,
      isVerified: true,
      isFollowed: true
    },
    likesCount: 8432,
    viewsCount: 154300,
    sharesCount: 1950,
    hasDelivery: false,
    parameters: {
      'Год выпуска': '2022',
      'Пробег': '18,000 км',
      'Тип двигателя': 'Электро',
      'Мощность': '530 л.с.',
      'Коробка передач': 'Автомат',
      'Привод': 'Полный'
    },
    comments: [
      {
        id: 'c2_1',
        author: 'Сергей Р.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        text: 'Звук электрокара просто космический в жизни!',
        time: '5 часов назад',
        likes: 24
      },
      {
        id: 'c2_2',
        author: 'Влад',
        avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=150',
        text: 'Обмен на двушку в Мурино с вашей доплатой рассматриваете? 😂',
        time: '1 час назад',
        likes: 189
      }
    ]
  },
  {
    id: '3',
    title: 'Кожаная куртка оверсайз Vintage 90s',
    price: 6500,
    category: 'Одежда и обувь',
    description: 'Винтажная косуха оверсайз кроя из невероятно плотной, тяжелой натуральной кожи. Настоящие 90-е, привозной винтаж. Идеальное состояние без потертостей. Круто смотрится на рост от 165 до 180 см. Подчеркнет любой стильный лук.',
    location: 'Екатеринбург, Площадь 1905 года',
    date: 'Сегодня в 09:15',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-stylish-jacket-posing-40348-large.mp4',
    seller: {
      id: 's3',
      name: 'Vintage Hub',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      rating: 4.8,
      reviewsCount: 145,
      isVerified: false,
      isFollowed: false
    },
    likesCount: 954,
    viewsCount: 12800,
    sharesCount: 78,
    hasDelivery: true,
    parameters: {
      'Размер': 'M (46-48)',
      'Материал': 'Натуральная кожа',
      'Бренд': 'Vintage',
      'Стиль': 'Ретро/Оверсайз'
    },
    comments: [
      {
        id: 'c3_1',
        author: 'Кира Ю.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        text: 'Шикарная куртка! Можно замеры в личные сообщения?',
        time: '10 минут назад',
        likes: 3
      }
    ]
  },
  {
    id: '4',
    title: 'Кастомный механический клавиатурный сет GMMK 2',
    price: 14000,
    category: 'Электроника',
    description: 'Продаю великолепную механическую клавиатуру Glorious GMMK Pro / 2 Custom. Смазанные переключатели Gateron Yellow, шумоизоляция корпуса Poron, премиальные кейкапы PBT с кириллицей. Очень тихий, сочный и «песочный» тайпинг (звучит как постукивание камней под водой). В комплекте витой кабель авиатор.',
    location: 'Краснодар, Центральный р-н',
    date: 'Вчера в 12:40',
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-computer-keyboard-40484-large.mp4',
    seller: {
      id: 's4',
      name: 'Geek Gear',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
      rating: 4.7,
      reviewsCount: 56,
      isVerified: true,
      isFollowed: false
    },
    likesCount: 320,
    viewsCount: 4120,
    sharesCount: 34,
    hasDelivery: true,
    parameters: {
      'Тип клавиатуры': 'Механическая',
      'Переключатели': 'Gateron Milky Yellow (смазаны)',
      'Формат': '75%',
      'Подключение': 'Проводное Type-C'
    },
    comments: [
      {
        id: 'c4_1',
        author: 'Данил',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        text: 'Запишите видео со звуком тайпинга плиз!',
        time: '12 часов назад',
        likes: 7
      }
    ]
  },
  {
    id: '5',
    title: 'Видовая квартира-студия 32 м² на 24 этаже',
    price: 11200000,
    category: 'Недвижимость',
    description: 'Продается стильная, светлая студия с панорамным остеклением и дизайнерским ремонтом. Из окон открывается потрясающий вид на Москва-Сити и реку. Кухня оборудована всей необходимой премиальной встроенной техникой Bosch. Подогрев полов, кондиционер, консьерж 24/7, охраняемая подземная парковка.',
    location: 'Москва, ул. Шелепихинская, 34',
    date: '3 дня назад',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-interior-39908-large.mp4',
    seller: {
      id: 's5',
      name: 'Alliance Estate',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
      rating: 4.9,
      reviewsCount: 410,
      isVerified: true,
      isFollowed: false
    },
    likesCount: 5210,
    viewsCount: 92840,
    sharesCount: 1420,
    hasDelivery: false,
    parameters: {
      'Площадь': '32 м²',
      'Этаж': '24 из 30',
      'Тип дома': 'Монолитный',
      'Высота потолков': '3.1 м',
      'Отделка': 'Дизайнерский ремонт'
    },
    comments: [
      {
        id: 'c5_1',
        author: 'Ольга',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        text: 'Какой роскошный вид из окна! Это ЖК Сердце Столицы?',
        time: '2 дня назад',
        likes: 18
      }
    ]
  }
];

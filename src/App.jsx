import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  PlusCircle,
  MessageSquare,
  User,
  Volume2,
  VolumeX,
  Play,
  MapPin,
  Tag,
  Grid,
  SlidersHorizontal,
  X,
  ChevronRight,
  Star,
  Send,
  Check,
  CheckCheck,
  Upload,
  ChevronDown,
  ShoppingBag,
  Bell,
  Sparkles,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

// INITIAL MOCK DATA
const INITIAL_LISTINGS = [
  {
    id: 'l1',
    category: 'Транспорт',
    title: 'BMW M4 Competition, 2021',
    price: 8200000,
    description: 'Идеальное состояние. Не бита, не крашена. Один владелец, обслуживание у официального дилера. Пробег 15 000 км. Полный сток, кузов в бронепленке. Мощность 510 л.с., разгон до 100 км/ч за 3.9 сек. Любые проверки приветствуются. Реальному покупателю торг у капота!',
    seller: {
      id: 's1',
      name: 'Александр',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: 4.9,
      reviewsCount: 42,
      isPro: true
    },
    location: 'Москва, Пресненский',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-road-at-sunset-10515-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=400',
    likes: 342,
    views: 4890,
    comments: [
      { id: 'c1_1', user: 'Михаил', text: 'Звук выхлопа просто космос! 🔥', time: '2ч назад' },
      { id: 'c1_2', user: 'Дмитрий', text: 'Обмен на студию в Новой Москве интересует?', time: '1ч назад' },
      { id: 'c1_3', user: 'Артур', text: 'Хорошая пушка, удачи в продаже!', time: '30м назад' }
    ],
    date: 'Сегодня, 12:40'
  },
  {
    id: 'l2',
    category: 'Электроника',
    title: 'iPhone 15 Pro 256GB Titanium',
    price: 980000,
    isKopeek: false, // Wait, 98 000 is more realistic for ruble
    priceDisplay: '98 000 ₽',
    priceVal: 98000,
    description: 'Новый, запечатанный iPhone 15 Pro на 256 гигабайт. Цвет Natural Titanium. Оригинал, не активирован, гарантия 1 год. Чек предоставляю. Привезен из Дубая. Быстрая доставка по городу или самовывоз.',
    seller: {
      id: 's2',
      name: 'Кристина (iStore)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      rating: 5.0,
      reviewsCount: 156,
      isPro: true
    },
    location: 'Санкт-Петербург, Площадь Восстания',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-smart-phone-with-a-green-screen-41774-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=400',
    likes: 1204,
    views: 12050,
    comments: [
      { id: 'c2_1', user: 'Иван', text: 'Оригинальный линк для проверки серийника дадите?', time: '1д назад' },
      { id: 'c2_2', user: 'Кристина (iStore)', text: 'Да, конечно, при встрече всё проверим!', time: '23ч назад' }
    ],
    date: 'Вчера, 18:15'
  },
  {
    id: 'l3',
    category: 'Недвижимость',
    title: 'Пентхаус 85 м² с террасой',
    price: 34500000,
    description: 'Эксклюзивный пентхаус с панорамным остеклением и огромной открытой террасой на 24 этаже. Авторский дизайн-проект в стиле минимализм. Полностью меблирован премиальной итальянской мебелью, встроенная техника Miele. Планировка: просторная кухня-гостиная, мастер-спальня с гардеробной, гостевой санузел. Прекрасный вид на закаты и город.',
    seller: {
      id: 's3',
      name: 'Century 21 Premium',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      rating: 4.8,
      reviewsCount: 89,
      isPro: false
    },
    location: 'Сочи, Курортный проспект',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-looking-at-luxury-housing-project-41584-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400',
    likes: 567,
    views: 3100,
    comments: [
      { id: 'c3_1', user: 'Елена', text: 'Вид просто завораживающий... Мечта 😍', time: '3д назад' },
      { id: 'c3_2', user: 'Григорий', text: 'Какая стоимость коммунальных платежей в месяц?', time: '2д назад' }
    ],
    date: '3 дня назад'
  },
  {
    id: 'l4',
    category: 'Одежда',
    title: 'Винтажная кожаная куртка Zara',
    price: 7500,
    description: 'Винтажная куртка из натуральной плотной кожи. Очень стильный потертый вид, фурнитура YKK, идеальная посадка. Размер M (оверсайз). Состояние отличное, без дефектов и запахов. Отправлю Авито Доставкой в день заказа.',
    seller: {
      id: 's4',
      name: 'Алексей',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      rating: 4.7,
      reviewsCount: 14,
      isPro: false
    },
    location: 'Екатеринбург, р-н Центр',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-brown-leather-jacket-40431-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400',
    likes: 89,
    views: 740,
    comments: [
      { id: 'c4_1', user: 'Маша', text: 'Подскажите замеры по плечам и длину рукава!', time: '5ч назад' }
    ],
    date: 'Вчера, 10:00'
  },
  {
    id: 'l5',
    category: 'Животные',
    title: 'Котята золотой шиншиллы ny11',
    price: 35000,
    description: 'Очаровательные шотландские котята в окрасе золотая затушеванная шиншилла (ny11). Рождены 15.10. Малыши очень ласковые, игривые, приучены к лотку и когтеточке. Имеют международный ветеринарный паспорт со всеми прививками по возрасту. Родители чемпионы породы. Звоните, отвечу на любые вопросы, вышлю доп. видео.',
    seller: {
      id: 's5',
      name: 'Мария Кот',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      rating: 4.9,
      reviewsCount: 31,
      isPro: false
    },
    location: 'Новосибирск, р-н Октябрьский',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cute-cat-resting-on-a-couch-40748-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    likes: 412,
    views: 2900,
    comments: [
      { id: 'c5_1', user: 'Ольга', text: 'Боже, какие милашки! Прямо плюшевые мишки 🥺❤️', time: '12ч назад' },
      { id: 'c5_2', user: 'Константин', text: 'Возможна ли доставка в Красноярск?', time: '10ч назад' }
    ],
    date: 'Сегодня, 09:15'
  },
  {
    id: 'l6',
    category: 'Услуги',
    title: 'Обучение игре на гитаре с нуля',
    price: 1500,
    description: 'Индивидуальные уроки игры на акустической, электрогитаре или укулеле для взрослых и детей от 7 лет. Преподаватель с высшим музыкальным образованием и опытом работы более 10 лет. Собственная уникальная методика без скучной зубрежки. Уже на первом занятии вы сыграете свою первую песню! Занятия проходят у меня в студии или онлайн через Zoom/Skype. Первое пробное занятие со скидкой 50%!',
    seller: {
      id: 's6',
      name: 'Вячеслав Мелодия',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      rating: 5.0,
      reviewsCount: 68,
      isPro: true
    },
    location: 'Краснодар, р-н Фестивальный',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-guitar-strings-being-played-43751-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=400',
    likes: 215,
    views: 1820,
    comments: [
      { id: 'c6_1', user: 'Стас', text: 'Лучший препод! За месяц научился играть фингерстайлом с полного нуля 🎸👍', time: '5д назад' },
      { id: 'c6_2', user: 'Ирина', text: 'Ребенок 8 лет ходит с огромным удовольствием! Всем рекомендую!', time: '4д назад' }
    ],
    date: '4 дня назад'
  }
];

const PRESET_VIDEOS = [
  { name: 'Спортивное Авто', url: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-road-at-sunset-10515-large.mp4' },
  { name: 'Современный Смартфон', url: 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-smart-phone-with-a-green-screen-41774-large.mp4' },
  { name: 'Роскошная Недвижимость', url: 'https://assets.mixkit.co/videos/preview/mixkit-man-looking-at-luxury-housing-project-41584-large.mp4' },
  { name: 'Модная Одежда', url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-modeling-a-brown-leather-jacket-40431-large.mp4' },
  { name: 'Домашние Животные', url: 'https://assets.mixkit.co/videos/preview/mixkit-cute-cat-resting-on-a-couch-40748-large.mp4' },
  { name: 'Музыкальные Инструменты', url: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-guitar-strings-being-played-43751-large.mp4' }
];

const INITIAL_CHATS = [
  {
    id: 'ch1',
    listingId: 'l1',
    listingTitle: 'BMW M4 Competition, 2021',
    listingPrice: '8 200 000 ₽',
    listingImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=200',
    sellerName: 'Александр',
    lastMessage: 'Добрый день! Да, машина в наличии. Готовы приехать посмотреть?',
    time: '12:45',
    unread: true,
    messages: [
      { id: 'm1', sender: 'buyer', text: 'Здравствуйте! Объявление актуально? Машина еще продается?', time: '12:42' },
      { id: 'm2', sender: 'seller', text: 'Добрый день! Да, машина в наличии. Готовы приехать посмотреть?', time: '12:45' }
    ]
  },
  {
    id: 'ch2',
    listingId: 'l2',
    listingTitle: 'iPhone 15 Pro 256GB Titanium',
    listingPrice: '98 000 ₽',
    listingImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=200',
    sellerName: 'Кристина (iStore)',
    lastMessage: 'Конечно, доставим сегодня к 19:00.',
    time: 'Вчера',
    unread: false,
    messages: [
      { id: 'm3', sender: 'buyer', text: 'Привет! Есть доставка до м. Парнас?', time: 'Вчера 15:30' },
      { id: 'm4', sender: 'seller', text: 'Здравствуйте! Да, доставляем курьером в пределах КАД бесплатно при покупке сегодня.', time: 'Вчера 15:35' },
      { id: 'm5', sender: 'buyer', text: 'Супер, давайте оформим доставку на золотой!', time: 'Вчера 15:40' },
      { id: 'm6', sender: 'seller', text: 'Конечно, доставим сегодня к 19:00.', time: 'Вчера 15:42' }
    ]
  }
];

export default function App() {
  const [listings, setListings] = useState(() => {
    const local = localStorage.getItem('avitok_listings');
    return local ? JSON.parse(local) : INITIAL_LISTINGS;
  });

  const [chats, setChats] = useState(() => {
    const local = localStorage.getItem('avitok_chats');
    return local ? JSON.parse(local) : INITIAL_CHATS;
  });

  const [favorites, setFavorites] = useState(() => {
    const local = localStorage.getItem('avitok_favorites');
    return local ? JSON.parse(local) : ['l2'];
  });

  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'catalog' | 'create' | 'chats' | 'profile'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'cheap' | 'expensive' | 'newest'
  const [showFilters, setShowFilters] = useState(false);

  // Listing Detail view overlay (Avito mode)
  const [selectedListingDetail, setSelectedListingDetail] = useState(null);

  // TikTok Feed States
  const [feedIndex, setFeedIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showCommentsId, setShowCommentsId] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  // Active Chat State
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatMessageText, setChatMessageText] = useState('');

  // Create Listing State
  const [createForm, setCreateForm] = useState({
    title: '',
    price: '',
    category: 'Транспорт',
    description: '',
    location: 'Москва',
    selectedPresetVideoIndex: 0
  });
  const [isPublishing, setIsPublishing] = useState(false);

  // Save state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('avitok_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('avitok_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('avitok_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Video autoplay/play/pause ref management
  const videoRefs = useRef({});

  // Trigger playing/pausing based on feed index and active tab
  useEffect(() => {
    if (activeTab === 'feed') {
      const activeVideo = videoRefs.current[feedIndex];
      // Pause all other videos
      Object.keys(videoRefs.current).forEach((idx) => {
        const vid = videoRefs.current[idx];
        if (vid && parseInt(idx) !== feedIndex) {
          vid.pause();
        }
      });
      if (activeVideo) {
        activeVideo.play().catch(() => {
          // Ignore autoplay blocks
        });
      }
    } else {
      // Pause all videos if switched to another tab
      Object.values(videoRefs.current).forEach((vid) => {
        if (vid) vid.pause();
      });
    }
  }, [feedIndex, activeTab]);

  // Handle Like/Favorite Action
  const toggleLike = (listingId, e) => {
    if (e) e.stopPropagation();

    // Update likes count in listings
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        const liked = favorites.includes(listingId);
        return {
          ...l,
          likes: liked ? Math.max(0, l.likes - 1) : l.likes + 1
        };
      }
      return l;
    }));

    setFavorites(prev => {
      if (prev.includes(listingId)) {
        return prev.filter(id => id !== listingId);
      } else {
        return [...prev, listingId];
      }
    });
  };

  // Add Comment
  const handleAddComment = (listingId) => {
    if (!newCommentText.trim()) return;
    const commentObj = {
      id: 'c_' + Date.now(),
      user: 'Вы (Дмитрий)',
      text: newCommentText,
      time: 'Только что'
    };
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        return { ...l, comments: [...l.comments, commentObj] };
      }
      return l;
    }));
    setNewCommentText('');
  };

  // Contact Seller -> Opens/Creates Chat
  const handleContactSeller = (listing, messagePrompt = '') => {
    // Look if chat already exists
    const existingChat = chats.find(c => c.listingId === listing.id);
    if (existingChat) {
      setActiveChatId(existingChat.id);
      setActiveTab('chats');
      setSelectedListingDetail(null); // Close detail view if open
      if (messagePrompt) {
        sendDirectMessage(existingChat.id, messagePrompt);
      }
    } else {
      // Create new chat
      const newChatId = 'ch_' + Date.now();
      const newChat = {
        id: newChatId,
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: `${listing.price.toLocaleString('ru-RU')} ₽`,
        listingImage: listing.thumbnail,
        sellerName: listing.seller.name,
        lastMessage: messagePrompt || 'Здравствуйте! Хочу приобрести этот товар.',
        time: 'Только что',
        unread: false,
        messages: [
          {
            id: 'm_init',
            sender: 'buyer',
            text: messagePrompt || 'Здравствуйте! Хочу приобрести этот товар.',
            time: 'Только что'
          }
        ]
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(newChatId);
      setActiveTab('chats');
      setSelectedListingDetail(null);

      // Simple simulated automated reply
      setTimeout(() => {
        const replyText = `Здравствуйте! Спасибо за интерес к "${listing.title}". Да, всё актуально, цена ${listing.price.toLocaleString('ru-RU')} ₽. Где вам удобнее встретиться или оформить доставку?`;
        setChats(prev => prev.map(c => {
          if (c.id === newChatId) {
            return {
              ...c,
              lastMessage: replyText,
              unread: true,
              messages: [
                ...c.messages,
                { id: 'm_reply', sender: 'seller', text: replyText, time: 'Только что' }
              ]
            };
          }
          return c;
        }));
      }, 1500);
    }
  };

  // Send message inside active chat
  const handleSendMessage = () => {
    if (!chatMessageText.trim()) return;
    sendDirectMessage(activeChatId, chatMessageText);
    setChatMessageText('');
  };

  const sendDirectMessage = (chatId, text) => {
    const messageId = 'msg_' + Date.now();
    const timeNow = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: text,
          time: timeNow,
          messages: [
            ...c.messages,
            { id: messageId, sender: 'buyer', text: text, time: timeNow }
          ]
        };
      }
      return c;
    }));

    // Generate responsive smart reply from seller after short delay
    setTimeout(() => {
      let replyText = "Отличный вопрос! Я уточню детали и напишу вам в течение 10 минут. 👍";
      if (text.toLowerCase().includes('скидк') || text.toLowerCase().includes('дешев')) {
        replyText = "Скидка возможна, но чисто символическая на бензин/доставку при быстрой покупке!";
      } else if (text.toLowerCase().includes('где') || text.toLowerCase().includes('встрет')) {
        replyText = "Я нахожусь в указанном районе, можем встретиться сегодня вечером или завтра днем.";
      } else if (text.toLowerCase().includes('состоян') || text.toLowerCase().includes('дефект')) {
        replyText = "Состояние прекрасное, полностью соответствует видео и описанию. Готов на любые тесты!";
      } else if (text.toLowerCase().includes('доставк')) {
        replyText = "Да, отправляю Авито Доставкой (СДЭК, Boxberry, Почта России) без проблем!";
      }

      const replyMsgId = 'msg_reply_' + Date.now();
      setChats(prev => prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: replyText,
            time: timeNow,
            unread: true,
            messages: [
              ...c.messages,
              { id: replyMsgId, sender: 'seller', text: replyText, time: timeNow }
            ]
          };
        }
        return c;
      }));
    }, 2000);
  };

  // Handle Create Listing Submit
  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!createForm.title || !createForm.price || !createForm.description) {
      alert('Пожалуйста, заполните все обязательные поля!');
      return;
    }

    setIsPublishing(true);

    setTimeout(() => {
      const selectedVideoPreset = PRESET_VIDEOS[createForm.selectedPresetVideoIndex];
      const newListing = {
        id: 'user_' + Date.now(),
        category: createForm.category,
        title: createForm.title,
        price: parseFloat(createForm.price),
        description: createForm.description,
        seller: {
          id: 'user_current',
          name: 'Дмитрий (Вы)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
          rating: 5.0,
          reviewsCount: 0,
          isPro: false
        },
        location: createForm.location || 'Москва',
        videoUrl: selectedVideoPreset.url,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
        likes: 0,
        views: 1,
        comments: [],
        date: 'Только что'
      };

      setListings(prev => [newListing, ...prev]);
      setIsPublishing(false);
      setActiveTab('feed'); // Go back to Feed so they see it!
      setFeedIndex(0); // View the newly posted listing at index 0

      // Reset form
      setCreateForm({
        title: '',
        price: '',
        category: 'Транспорт',
        description: '',
        location: 'Москва',
        selectedPresetVideoIndex: 0
      });
    }, 1800);
  };

  // Filter and Search Logic
  const filteredListings = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
    const matchesMinPrice = priceMin === '' || item.price >= parseFloat(priceMin);
    const matchesMaxPrice = priceMax === '' || item.price <= parseFloat(priceMax);
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  }).sort((a, b) => {
    if (sortBy === 'cheap') return a.price - b.price;
    if (sortBy === 'expensive') return b.price - a.price;
    if (sortBy === 'newest') return b.id.localeCompare(a.id); // newer items have larger string IDs
    return b.likes - a.likes; // popular is sorted by likes
  });

  return (
    <div className="flex justify-center items-center bg-slate-900 min-h-screen text-gray-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Container simulating a gorgeous modern smartphone / compact web client */}
      <div className="relative w-full max-w-md h-screen md:h-[92vh] md:max-h-[850px] md:rounded-[40px] md:border-[10px] md:border-slate-800 shadow-2xl bg-white text-slate-900 overflow-hidden flex flex-col">

        {/* Dynamic App Content Box */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-slate-50 h-full">

          {/* ==================== TIKTOK FEED TAB ==================== */}
          {activeTab === 'feed' && (
            <div className="h-full bg-black relative flex flex-col justify-between overflow-hidden">

              {/* Feed Header */}
              <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 tracking-wider">АвиТок</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded uppercase animate-pulse">LIVE</span>
                </div>
                <div className="flex space-x-3 text-white">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-teal-400" />}
                  </button>
                  <button
                    onClick={() => { setActiveTab('catalog'); }}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition flex items-center space-x-1 border border-teal-500/30"
                  >
                    <Grid className="w-5 h-5 text-teal-400" />
                  </button>
                </div>
              </div>

              {/* Feed Main Video Player Area */}
              {listings.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                  <SlidersHorizontal className="w-16 h-16 text-slate-600 mb-4 animate-bounce" />
                  <p className="text-lg font-semibold text-white">Здесь пока ничего нет</p>
                  <p className="text-sm text-gray-500 mt-2">Будьте первым, кто разместит уникальное видео-объявление!</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-full shadow-lg"
                  >
                    Разместить объявление
                  </button>
                </div>
              ) : (
                <div className="h-full w-full relative">
                  {/* Vertical Single Post Carousel wrapper */}
                  <div className="h-full w-full relative bg-slate-950">

                    {/* Current Active Post */}
                    {(() => {
                      const item = listings[feedIndex];
                      if (!item) return null;

                      return (
                        <div className="h-full w-full relative flex flex-col justify-between">

                          {/* HTML5 Loop Video */}
                          <video
                            ref={(el) => (videoRefs.current[feedIndex] = el)}
                            className="absolute inset-0 w-full h-full object-cover z-0 cursor-pointer"
                            src={item.videoUrl}
                            loop
                            muted={isMuted}
                            playsInline
                            onClick={() => {
                              const vid = videoRefs.current[feedIndex];
                              if (vid) {
                                if (vid.paused) vid.play();
                                else vid.pause();
                              }
                            }}
                          />

                          {/* Dark Shadow Bottom Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 pointer-events-none z-1" />

                          {/* Top Tag badge with Category */}
                          <div className="absolute top-20 left-4 z-10 flex items-center space-x-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs border border-white/10 shadow-lg">
                            <Tag className="w-3.5 h-3.5 text-teal-400" />
                            <span className="font-semibold">{item.category}</span>
                          </div>

                          {/* Right Interactive Sidebar Buttons (TikTok style) */}
                          <div className="absolute right-4 bottom-32 z-10 flex flex-col items-center space-y-5">

                            {/* Seller Avatar */}
                            <div
                              className="group relative cursor-pointer"
                              onClick={() => {
                                setSelectedListingDetail(item);
                              }}
                            >
                              <div className="w-12 h-12 rounded-full border-2 border-teal-400 overflow-hidden shadow-lg transition-transform group-hover:scale-110">
                                <img src={item.seller.avatar} alt={item.seller.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-black uppercase">
                                {item.seller.rating.toFixed(1)} ★
                              </span>
                            </div>

                            {/* Likes Heart Button */}
                            <button
                              onClick={(e) => toggleLike(item.id, e)}
                              className="flex flex-col items-center justify-center focus:outline-none group active:scale-95 transition-transform"
                            >
                              <div className={`p-3 rounded-full ${favorites.includes(item.id) ? 'bg-red-500/20' : 'bg-black/40'} backdrop-blur-md border border-white/5 shadow-lg mb-1 group-hover:scale-105 transition`}>
                                <Heart className={`w-6 h-6 transition-all duration-300 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`} />
                              </div>
                              <span className="text-white text-xs font-bold shadow-sm">{item.likes}</span>
                            </button>

                            {/* Comment Drawer Trigger Button */}
                            <button
                              onClick={() => setShowCommentsId(item.id)}
                              className="flex flex-col items-center justify-center focus:outline-none group active:scale-95 transition-transform"
                            >
                              <div className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/5 shadow-lg mb-1 group-hover:scale-105 transition">
                                <MessageCircle className="w-6 h-6 text-white" />
                              </div>
                              <span className="text-white text-xs font-bold shadow-sm">{item.comments.length}</span>
                            </button>

                            {/* Info Detail Toggle */}
                            <button
                              onClick={() => setSelectedListingDetail(item)}
                              className="flex flex-col items-center justify-center focus:outline-none group active:scale-95 transition-transform"
                            >
                              <div className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/5 shadow-lg mb-1 group-hover:scale-105 transition">
                                <SlidersHorizontal className="w-6 h-6 text-cyan-400" />
                              </div>
                              <span className="text-cyan-400 text-[10px] font-bold">О товаре</span>
                            </button>

                          </div>

                          {/* Swipe Navigation Indicators */}
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col space-y-2">
                            {listings.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setFeedIndex(i)}
                                className={`w-2 rounded-full transition-all duration-300 ${feedIndex === i ? 'h-6 bg-gradient-to-b from-teal-400 to-cyan-400 shadow-teal-500/50 shadow-md' : 'h-2 bg-white/40'}`}
                              />
                            ))}
                          </div>

                          {/* Bottom Content & Direct CTAs */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 pb-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-5 flex flex-col justify-end">

                            {/* Listing Title & Price Badge */}
                            <div className="flex justify-between items-start mb-2.5">
                              <div className="max-w-[70%]">
                                <h3 className="text-white font-bold text-lg leading-snug truncate drop-shadow">
                                  {item.title}
                                </h3>
                                <p className="text-gray-300 text-xs flex items-center mt-1 drop-shadow">
                                  <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1 flex-shrink-0" />
                                  <span className="truncate">{item.location}</span>
                                </p>
                              </div>
                              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-black text-base px-3.5 py-1.5 rounded-xl shadow-lg border border-teal-400/20 flex-shrink-0">
                                {item.price.toLocaleString('ru-RU')} ₽
                              </div>
                            </div>

                            {/* Short Description snippet */}
                            <p className="text-gray-300 text-xs line-clamp-2 mb-4 leading-relaxed max-w-[90%]">
                              {item.description}
                            </p>

                            {/* Direct Contact & Fast Action Buttons */}
                            <div className="grid grid-cols-2 gap-2.5">

                              {/* Option A: Direct Chat / Purchase CTA */}
                              <button
                                onClick={() => handleContactSeller(item, 'Здравствуйте! Напишите, пожалуйста, по поводу объявления. Готов купить!')}
                                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 active:scale-95 transition text-white py-3 rounded-xl font-bold text-xs shadow-lg"
                              >
                                <MessageSquare className="w-4 h-4" />
                                <span>Написать продавцу</span>
                              </button>

                              {/* Option B: Quick Deal Reservation (Fast Avito Buy) */}
                              <button
                                onClick={() => handleContactSeller(item, 'Здравствуйте! Хочу оформить безопасную доставку. Каким сервисом отправите?')}
                                className="flex items-center justify-center space-x-2 bg-white/15 hover:bg-white/25 active:scale-95 transition text-teal-300 border border-teal-500/30 py-3 rounded-xl font-bold text-xs backdrop-blur-md"
                              >
                                <ShoppingBag className="w-4 h-4 text-teal-400" />
                                <span>Оформить сделку</span>
                              </button>

                            </div>

                          </div>

                        </div>
                      );
                    })()}

                  </div>
                </div>
              )}

              {/* COMMENTS DRAWER COMPONENT */}
              {showCommentsId && (() => {
                const item = listings.find(l => l.id === showCommentsId);
                if (!item) return null;
                return (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex flex-col justify-end transition-opacity duration-300">
                    <div className="bg-white rounded-t-[30px] max-h-[75%] flex flex-col overflow-hidden shadow-2xl animate-slide-up">

                      {/* Drawer Header */}
                      <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 bg-slate-50">
                        <span className="font-bold text-slate-800 text-sm">Комментарии ({item.comments.length})</span>
                        <button
                          onClick={() => setShowCommentsId(null)}
                          className="p-1 rounded-full bg-slate-200/80 hover:bg-slate-300/80 transition"
                        >
                          <X className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>

                      {/* Comment list */}
                      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
                        {item.comments.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                            <MessageCircle className="w-12 h-12 text-slate-200 mb-2" />
                            <p className="text-xs">Комментариев пока нет. Будьте первыми!</p>
                          </div>
                        ) : (
                          item.comments.map((comm) => (
                            <div key={comm.id} className="flex space-x-3 items-start text-xs">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold uppercase shadow-sm">
                                {comm.user.charAt(0)}
                              </div>
                              <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-slate-700">{comm.user}</span>
                                  <span className="text-[10px] text-slate-400">{comm.time}</span>
                                </div>
                                <p className="text-slate-600 leading-relaxed">{comm.text}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add Comment Input */}
                      <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center space-x-2">
                        <input
                          type="text"
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          placeholder="Напишите комментарий..."
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(item.id);
                          }}
                        />
                        <button
                          onClick={() => handleAddComment(item.id)}
                          className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl shadow-md transition"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })()}

            </div>
          )}

          {/* ==================== AVITO CATALOG TAB ==================== */}
          {activeTab === 'catalog' && (
            <div className="h-full flex flex-col bg-slate-50">

              {/* Search & Header bar */}
              <div className="bg-white px-4 pt-4 pb-3 border-b border-slate-100 sticky top-0 z-10 shadow-sm">

                {/* Search input with search parameters */}
                <div className="flex items-center space-x-2.5">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Поиск по объявлениям..."
                      className="w-full bg-slate-100 pl-10 pr-4 py-2.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 border border-transparent focus:outline-none focus:border-teal-400 focus:bg-white transition-all duration-300"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>

                  {/* Filters toggle button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2.5 rounded-xl border transition ${showFilters ? 'bg-teal-50 border-teal-400 text-teal-600' : 'bg-slate-100 border-transparent text-slate-600 hover:bg-slate-200'}`}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Filters Drawer Toggle Content */}
                {showFilters && (
                  <div className="mt-3.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-3 animate-fade-in text-xs">
                    <div className="font-bold text-slate-700 mb-1">Фильтры</div>

                    {/* Price Filter inputs */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold">Цена от, ₽</label>
                        <input
                          type="number"
                          value={priceMin}
                          onChange={(e) => setPriceMin(e.target.value)}
                          placeholder="Любая"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold">Цена до, ₽</label>
                        <input
                          type="number"
                          value={priceMax}
                          onChange={(e) => setPriceMax(e.target.value)}
                          placeholder="Любая"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    {/* Sorting selections */}
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Сортировать</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-teal-500"
                      >
                        <option value="popular">По популярности</option>
                        <option value="cheap">Дешевле</option>
                        <option value="expensive">Дороже</option>
                        <option value="newest">Сначала новые</option>
                      </select>
                    </div>

                    {/* Clear Button */}
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          setPriceMin('');
                          setPriceMax('');
                          setSortBy('popular');
                          setShowFilters(false);
                        }}
                        className="text-teal-600 hover:text-teal-700 font-bold text-[11px]"
                      >
                        Сбросить фильтры
                      </button>
                    </div>

                  </div>
                )}

                {/* Category Horizontal Scrolling List */}
                <div className="flex space-x-1.5 overflow-x-auto no-scrollbar mt-3 pt-1">
                  {['Все', 'Транспорт', 'Электроника', 'Недвижимость', 'Одежда', 'Животные', 'Услуги'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

              </div>

              {/* Grid List displaying filtered products */}
              <div className="flex-1 overflow-y-auto p-4 pb-20">
                {filteredListings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                    <Search className="w-12 h-12 text-slate-200 mb-3 animate-pulse" />
                    <p className="font-bold text-sm text-slate-700">Объявлений не найдено</p>
                    <p className="text-xs text-slate-400 mt-1">Попробуйте изменить параметры поиска или фильтров.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredListings.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedListingDetail(item)}
                        className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex flex-col h-full"
                      >
                        {/* Listing cover image with video icon */}
                        <div className="relative aspect-square bg-slate-100">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <Play className="w-2.5 h-2.5 fill-current text-teal-400" />
                            <span>ВИДЕО</span>
                          </div>

                          {/* Favorite button icon on top right */}
                          <button
                            onClick={(e) => toggleLike(item.id, e)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md shadow hover:bg-white transition"
                          >
                            <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                          </button>
                        </div>

                        {/* Summary details */}
                        <div className="p-3 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] text-teal-600 font-bold uppercase tracking-wider mb-1">
                              {item.category}
                            </div>
                            <h4 className="font-bold text-xs text-slate-800 line-clamp-2 leading-snug mb-1">
                              {item.title}
                            </h4>
                          </div>
                          <div>
                            <div className="font-black text-sm text-slate-900 mt-1 mb-1.5">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                              <span className="truncate max-w-[70%]">{item.location}</span>
                              <span className="whitespace-nowrap">★ {item.seller.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================== CREATE LISTING TAB ==================== */}
          {activeTab === 'create' && (
            <div className="h-full flex flex-col bg-white">

              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center space-x-2 bg-slate-50 sticky top-0 z-10">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <h2 className="font-black text-base text-slate-800">Новое видео-объявление</h2>
              </div>

              {/* Form container */}
              <form onSubmit={handleCreateListing} className="flex-1 overflow-y-auto p-5 pb-24 space-y-4 text-xs text-slate-700">

                {/* 1. Title Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Название товара или услуги *</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Сноуборд Burton Custom M"
                    value={createForm.title}
                    onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* 2. Category Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Категория *</label>
                  <select
                    value={createForm.category}
                    onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500 cursor-pointer"
                  >
                    {['Транспорт', 'Электроника', 'Недвижимость', 'Одежда', 'Животные', 'Услуги'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Price Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Цена, ₽ *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="Укажите цену сделки"
                    value={createForm.price}
                    onChange={(e) => setCreateForm({ ...createForm, price: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* 4. Location Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Город и район</label>
                  <input
                    type="text"
                    placeholder="Например: Москва, Раменки"
                    value={createForm.location}
                    onChange={(e) => setCreateForm({ ...createForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* 5. Description textarea */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Описание объявления *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Расскажите о состоянии товара, комплектации, причинах продажи и условиях сделки..."
                    value={createForm.description}
                    onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* 6. Video Upload simulation selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Прикрепите демонстрационное видео *</label>
                  <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">
                    Поскольку платформа АвиТок работает в видеоформате, к каждому объявлению необходимо добавить видеоролик. Выберите подходящий шаблон из библиотеки или симулируйте загрузку:
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_VIDEOS.map((preset, index) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setCreateForm({ ...createForm, selectedPresetVideoIndex: index })}
                        className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition ${createForm.selectedPresetVideoIndex === index ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="font-semibold text-[10px] truncate">{preset.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Upload video file block mockup */}
                  <div className="mt-3.5 p-4 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center text-center">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="font-bold text-[10px] text-slate-600">Загрузить свое видео (MP4 / MOV)</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">До 100 МБ, соотношение 9:16</span>
                  </div>
                </div>

                {/* Publish Button */}
                <button
                  type="submit"
                  disabled={isPublishing}
                  className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold hover:from-teal-600 hover:to-cyan-600 transition shadow-lg active:scale-95 flex items-center justify-center space-x-2"
                >
                  {isPublishing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Публикация объявления...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Разместить на АвиТок</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          )}

          {/* ==================== MESSAGES / CHATS TAB ==================== */}
          {activeTab === 'chats' && (
            <div className="h-full flex flex-col bg-slate-50">

              {/* If viewing lists of chats */}
              {activeChatId === null ? (
                <div className="flex flex-col h-full">

                  {/* Header */}
                  <div className="px-5 py-4 bg-white border-b border-slate-100 sticky top-0 z-10 flex justify-between items-center shadow-sm">
                    <h2 className="font-black text-base text-slate-800 flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-teal-500" />
                      <span>Сообщения</span>
                    </h2>
                    <span className="bg-teal-100 text-teal-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {chats.filter(c => c.unread).length} новые
                    </span>
                  </div>

                  {/* List of chat items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {chats.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <MessageSquare className="w-12 h-12 text-slate-200 mb-2" />
                        <p className="text-xs">У вас пока нет активных диалогов.</p>
                      </div>
                    ) : (
                      chats.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            setActiveChatId(c.id);
                            // Mark read
                            setChats(prev => prev.map(ch => ch.id === c.id ? { ...ch, unread: false } : ch));
                          }}
                          className={`p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-sm flex items-center space-x-3 transition cursor-pointer relative ${c.unread ? 'bg-teal-50/30 border-teal-100' : ''}`}
                        >
                          {/* Seller avatar / item preview */}
                          <div className="relative">
                            <img src={c.listingImage} alt={c.listingTitle} className="w-12 h-12 rounded-xl object-cover" />
                            <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white rounded-full p-0.5 border border-white">
                              <CheckCheck className="w-2.5 h-2.5" />
                            </div>
                          </div>

                          {/* Detail summary text */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-0.5">
                              <span className="font-bold text-xs text-slate-800 truncate">{c.sellerName}</span>
                              <span className="text-[10px] text-slate-400">{c.time}</span>
                            </div>
                            <div className="text-[10px] font-semibold text-teal-600 mb-1 truncate">{c.listingTitle} ({c.listingPrice})</div>
                            <p className="text-slate-500 text-xs truncate max-w-[95%]">{c.lastMessage}</p>
                          </div>

                          {/* Unread circle icon indicators */}
                          {c.unread && (
                            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 absolute top-4 right-4 animate-ping" />
                          )}

                        </div>
                      ))
                    )}
                  </div>

                </div>
              ) : (
                /* Chat view Detail panel */
                (() => {
                  const chat = chats.find(c => c.id === activeChatId);
                  if (!chat) return null;
                  return (
                    <div className="flex flex-col h-full bg-slate-100">

                      {/* Back button header */}
                      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">

                        <div className="flex items-center space-x-3 min-w-0">
                          <button
                            onClick={() => setActiveChatId(null)}
                            className="p-1.5 rounded-xl hover:bg-slate-100 transition flex-shrink-0"
                          >
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                          </button>
                          <div className="min-w-0">
                            <h3 className="font-bold text-xs text-slate-800 truncate">{chat.sellerName}</h3>
                            <p className="text-[10px] text-teal-600 truncate font-semibold">{chat.listingTitle}</p>
                          </div>
                        </div>

                        {/* Right side thumbnail shortcut */}
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                          <img src={chat.listingImage} alt="item" className="w-full h-full object-cover" />
                        </div>

                      </div>

                      {/* Messages body scrolling list */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 flex flex-col-reverse">

                        {/* We reverse messages inside the list block to facilitate scroll positioning */}
                        {[...chat.messages].reverse().map((m) => (
                          <div
                            key={m.id}
                            className={`flex flex-col max-w-[80%] text-xs ${m.sender === 'buyer' ? 'self-end items-end' : 'self-start items-start'}`}
                          >
                            <div className={`p-3 rounded-2xl ${m.sender === 'buyer' ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'} shadow-sm`}>
                              <p className="leading-relaxed">{m.text}</p>
                            </div>
                            <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
                          </div>
                        ))}

                      </div>

                      {/* Message bottom bar input */}
                      <div className="p-3 border-t border-slate-100 bg-white flex items-center space-x-2">
                        <input
                          type="text"
                          value={chatMessageText}
                          onChange={(e) => setChatMessageText(e.target.value)}
                          placeholder="Напишите сообщение..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendMessage();
                          }}
                        />
                        <button
                          onClick={handleSendMessage}
                          className="p-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl shadow-md transition"
                        >
                          <Send className="w-4.5 h-4.5" />
                        </button>
                      </div>

                    </div>
                  );
                })()
              )}

            </div>
          )}

          {/* ==================== PROFILE TAB ==================== */}
          {activeTab === 'profile' && (
            <div className="h-full flex flex-col bg-slate-50 overflow-y-auto pb-20 no-scrollbar">

              {/* Profile card summary info */}
              <div className="bg-white p-5 border-b border-slate-100 text-center relative shadow-sm">

                {/* Decorative background element */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 z-0" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-sm text-slate-800">Дмитрий Семенов</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">На АвиТок с 2024 года</p>

                  {/* Rating star ratings review bar */}
                  <div className="flex items-center space-x-1 mt-2.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-[11px] text-slate-700">5.0</span>
                    <span className="text-[10px] text-slate-400">(12 отзывов)</span>
                  </div>
                </div>

              </div>

              {/* Favorites vs User listings tabs selector */}
              <div className="p-4 space-y-4">

                {/* Favorites List section */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-xs text-slate-800 flex items-center space-x-1.5">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      <span>Избранное ({favorites.length})</span>
                    </h3>
                  </div>

                  {favorites.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 bg-white border border-slate-100 rounded-2xl shadow-sm text-xs">
                      <Heart className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                      Ничего не добавлено в избранное.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2.5">
                      {listings.filter(l => favorites.includes(l.id)).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedListingDetail(item)}
                          className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm flex flex-col cursor-pointer"
                        >
                          <div className="relative aspect-video">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute top-1.5 left-1.5 bg-black/40 text-[8px] font-bold text-white px-1.5 py-0.2 rounded-full">
                              ВИДЕО
                            </div>
                          </div>
                          <div className="p-2.5 text-[10px]">
                            <h4 className="font-bold text-slate-800 truncate">{item.title}</h4>
                            <div className="font-black text-slate-900 mt-0.5">{item.price.toLocaleString('ru-RU')} ₽</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* My Active Listings section */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-xs text-slate-800 flex items-center space-x-1.5">
                      <Tag className="w-4 h-4 text-teal-500" />
                      <span>Мои объявления ({listings.filter(l => l.seller.id === 'user_current').length})</span>
                    </h3>
                  </div>

                  {listings.filter(l => l.seller.id === 'user_current').length === 0 ? (
                    <div className="p-8 text-center text-slate-400 bg-white border border-slate-100 rounded-2xl shadow-sm text-xs">
                      <PlusCircle className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                      Вы еще не опубликовали ни одного видео-объявления.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {listings.filter(l => l.seller.id === 'user_current').map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedListingDetail(item)}
                          className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center space-x-3">
                            <img src={item.thumbnail} alt={item.title} className="w-11 h-11 rounded-lg object-cover" />
                            <div>
                              <h4 className="font-bold text-xs text-slate-800 truncate max-w-[150px]">{item.title}</h4>
                              <p className="text-[10px] text-teal-600 font-semibold">{item.price.toLocaleString('ru-RU')} ₽</p>
                            </div>
                          </div>

                          <div className="text-right text-[9px] text-slate-400">
                            <div>Просмотры: {item.views}</div>
                            <div>Лайки: {item.likes}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

        {/* ==================== GLOBAL APP BOTTOM NAVBAR NAVIGATION ==================== */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white border-t border-slate-100 flex justify-around py-2.5 shadow-xl">

          <button
            onClick={() => { setActiveTab('feed'); }}
            className={`flex flex-col items-center justify-center space-y-0.5 focus:outline-none w-14 transition ${activeTab === 'feed' ? 'text-teal-500' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Sparkles className="w-5.5 h-5.5" />
            <span className="text-[9px] font-bold">Лента</span>
          </button>

          <button
            onClick={() => { setActiveTab('catalog'); }}
            className={`flex flex-col items-center justify-center space-y-0.5 focus:outline-none w-14 transition ${activeTab === 'catalog' ? 'text-teal-500' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Grid className="w-5.5 h-5.5" />
            <span className="text-[9px] font-bold">Каталог</span>
          </button>

          <button
            onClick={() => { setActiveTab('create'); }}
            className={`flex flex-col items-center justify-center space-y-0.5 focus:outline-none w-14 transition ${activeTab === 'create' ? 'text-teal-500' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <PlusCircle className="w-5.5 h-5.5" />
            <span className="text-[9px] font-bold">Подать</span>
          </button>

          <button
            onClick={() => { setActiveTab('chats'); }}
            className={`flex flex-col items-center justify-center space-y-0.5 focus:outline-none w-14 transition ${activeTab === 'chats' ? 'text-teal-500' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <div className="relative">
              <MessageSquare className="w-5.5 h-5.5" />
              {chats.some(c => c.unread) && (
                <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-red-500" />
              )}
            </div>
            <span className="text-[9px] font-bold">Сообщения</span>
          </button>

          <button
            onClick={() => { setActiveTab('profile'); }}
            className={`flex flex-col items-center justify-center space-y-0.5 focus:outline-none w-14 transition ${activeTab === 'profile' ? 'text-teal-500' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <User className="w-5.5 h-5.5" />
            <span className="text-[9px] font-bold">Профиль</span>
          </button>

        </div>

        {/* ==================== DETAIL OVERLAY MODAL (Avito Product Detail View) ==================== */}
        {selectedListingDetail && (() => {
          const item = selectedListingDetail;
          return (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col justify-end">
              <div className="bg-white rounded-t-[35px] max-h-[90%] flex flex-col overflow-hidden shadow-2xl animate-slide-up text-slate-800">

                {/* Header title */}
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center space-x-2">
                    <span className="bg-teal-100 text-teal-700 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                      {item.category}
                    </span>
                    <span className="text-slate-400 text-xs">Детали объявления</span>
                  </div>
                  <button
                    onClick={() => setSelectedListingDetail(null)}
                    className="p-1 rounded-full bg-slate-200/80 hover:bg-slate-300/80 transition"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                {/* Main scroll content detailing seller info, description etc. */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5 bg-white text-xs">

                  {/* Embedded Loop Video demo inside detail modal */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-inner group">
                    <video
                      className="w-full h-full object-cover"
                      src={item.videoUrl}
                      loop
                      muted={isMuted}
                      autoPlay
                      playsInline
                    />
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="absolute bottom-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition backdrop-blur-md"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Pricing and title information */}
                  <div>
                    <h2 className="font-black text-lg text-slate-900 leading-snug mb-1">{item.title}</h2>
                    <div className="text-xl font-black text-teal-600 mb-2">{item.price.toLocaleString('ru-RU')} ₽</div>
                    <p className="text-slate-400 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      <span>{item.location}</span>
                    </p>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Seller details */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={item.seller.avatar} alt="avatar" className="w-11 h-11 rounded-full object-cover shadow-sm border border-white" />
                      <div>
                        <div className="font-bold text-slate-800 flex items-center space-x-1">
                          <span>{item.seller.name}</span>
                          {item.seller.isPro && (
                            <span className="bg-cyan-100 text-cyan-700 font-bold px-1.5 py-0.2 rounded text-[8px] uppercase">PRO</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1.5 mt-0.5 text-slate-400 text-[10px]">
                          <span className="text-yellow-500 font-bold">★ {item.seller.rating.toFixed(1)}</span>
                          <span>•</span>
                          <span>{item.seller.reviewsCount} отзывов</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleContactSeller(item, 'Здравствуйте! Пишу по объявлению с видео-ленты. Хочу купить.')}
                      className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-xl text-[10px] shadow-sm transition"
                    >
                      Диалог
                    </button>
                  </div>

                  {/* Description text content */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs mb-1.5">Описание</h4>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-2xl border border-slate-50">
                      {item.description}
                    </p>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Fast direct purchase or dialog CTA buttons */}
                  <div className="grid grid-cols-2 gap-3.5 pt-1">
                    <button
                      onClick={() => handleContactSeller(item, 'Здравствуйте! Расскажите подробнее о товаре.')}
                      className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl shadow hover:from-teal-600 hover:to-cyan-600 transition text-xs"
                    >
                      Связаться
                    </button>

                    <button
                      onClick={() => toggleLike(item.id)}
                      className={`w-full py-3 font-bold rounded-xl border transition text-xs flex items-center justify-center space-x-1.5 ${favorites.includes(item.id) ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span>{favorites.includes(item.id) ? 'В избранном' : 'В избранное'}</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
}

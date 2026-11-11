import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Heart,
  MessageSquare,
  PlusCircle,
  MapPin,
  Eye,
  Share2,
  Phone,
  ArrowLeft,
  Send,
  Volume2,
  VolumeX,
  Star,
  CheckCheck,
  Video,
  ShoppingBag,
  Sparkles,
  X,
  ChevronUp,
  ChevronDown,
  Info,
  Check,
  Truck,
  Disc,
  Music,
  UserCheck,
  UserPlus,
  SlidersHorizontal,
  ArrowUpDown,
  Tag,
  Copy
} from 'lucide-react';

// --- MOCK INITIAL DATA ---
const INITIAL_LISTINGS = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB • Идеал",
    price: 95000,
    category: "Электроника",
    description: "Продаю свой iPhone 15 Pro Max на 256 ГБ в идеальном состоянии! Цвет натуральный титан. Состояние аккумулятора 98%, без царапин, сколов и потертостей. Всегда носился в оригинальном чехле и с защитным стеклом премиум-класса. Не вскрывался, все функции (FaceID, TrueTone) работают идеально. Полный комплект с коробкой и оригинальным запечатанным проводом. Пишите, отвечу быстро!",
    location: "Москва, ст. м. Тверская",
    date: "Сегодня, 12:45",
    views: 1240,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-light-looking-at-phone-41858-large.mp4",
    seller: {
      name: "Дмитрий",
      rating: 4.9,
      reviews: 32,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 2,
    title: "BMW M4 Competition (2021)",
    price: 7200000,
    category: "Транспорт",
    description: "В продаже злая BMW M4 Competition в шикарном заводском цвете. Мощность 510 л.с., задний привод. Реальный пробег 28 000 км. Полностью обслужена исключительно у официального дилера, есть вся история сервиса. На гарантии. Без ДТП, сколов и окрасов. Весь кузов с первого дня в матовой полиуретановой бронепленке. Салон кожа Nappa, музыка Harman/Kardon, карбоновый пакет. Вживую выглядит просто невероятно! Готов на любые проверки. Реальному покупателю разумный торг у капота.",
    location: "Санкт-Петербург, р-н Центральный",
    date: "Вчера, 18:15",
    views: 4320,
    imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-a-racing-video-game-41618-large.mp4",
    seller: {
      name: "Александр",
      rating: 4.8,
      reviews: 14,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 3,
    title: "Дизайнерская студия у воды в ЖК «Маяк»",
    price: 12500000,
    category: "Недвижимость",
    description: "Современная, безумно светлая студия площадью 34 кв.м на 18 этаже с потрясающим панорамным видом на канал имени Москвы! Выполнен качественный дизайнерский ремонт по проекту известного бюро. Делали для себя, использовались премиальные отделочные материалы. Полностью укомплектована мебелью индивидуального изготовления и встроенной немецкой техникой (плита, духовка, посудомоечная машина, встроенный холодильник, кондиционер). Закрытая охраняемая территория, консьерж-сервис, подземный паркинг. 1 взрослый собственник. Быстрый выход на сделку.",
    location: "Химки, ул. Кудрявцева, 10",
    date: "2 дня назад",
    views: 890,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-home-41620-large.mp4",
    seller: {
      name: "Екатерина",
      rating: 5.0,
      reviews: 47,
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 4,
    title: "Индивидуальный пошив костюмов премиум",
    price: 15000,
    category: "Услуги",
    description: "Создаем идеальные мужские и женские костюмы по вашим индивидуальным меркам! Огромный выбор итальянских и английских тканей высшего качества (Loro Piana, Vitale Barberis, Scabal). Срок пошива всего 10-14 дней. Безупречная посадка с первой примерки гарантирована. Наша мастерская находится в самом центре Москвы. У нас вы можете заказать: деловые костюмы, смокинги, пальто, рубашки. Запишитесь на первую бесплатную консультацию и обмер прямо сейчас!",
    location: "Москва, ул. Петровка, 15",
    date: "Сегодня, 10:20",
    views: 340,
    imageUrl: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-tailor-working-on-a-sewing-machine-41611-large.mp4",
    seller: {
      name: "Ателье «Элита»",
      rating: 4.7,
      reviews: 89,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    }
  },
  {
    id: 5,
    title: "Винтажная кожаная куртка-косуха L",
    price: 8500,
    category: "Одежда",
    description: "Винтажная мужская кожаная куртка-косуха из толстой, но очень мягкой и приятной на ощупь натуральной воловьей кожи. Цвет глубокий темно-коричневый с легким благородным эффектом потертости. Размер L (48-50). Отличное винтажное состояние, все замки, клепки и фурнитура оригинальные, работают идеально. Подкладка чистая, без дефектов. Идеально сидит по фигуре, дополняя байкерский, рокерский или повседневный стиль. Могу отправить Авито Доставкой или СДЭКом.",
    location: "Екатеринбург, р-н Ленинский",
    date: "3 дня назад",
    views: 156,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-serving-freshly-brewed-coffee-42417-large.mp4",
    seller: {
      name: "Артем",
      rating: 4.6,
      reviews: 19,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    }
  }
];

const INITIAL_CHATS = [
  {
    id: 101,
    listingId: 1,
    listingTitle: "iPhone 15 Pro Max 256GB • Идеал",
    listingPrice: 95000,
    seller: {
      name: "Дмитрий",
      rating: 4.9,
      reviews: 32,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    },
    messages: [
      { id: 1, sender: 'seller', text: 'Здравствуйте! Интересует айфон?', timestamp: 'Вчера, 14:00' },
      { id: 2, sender: 'user', text: 'Добрый день! Да, актуально?', timestamp: 'Вчера, 14:02' },
      { id: 3, sender: 'seller', text: 'Да, всё в силе. Готов встретиться сегодня.', timestamp: 'Вчера, 14:05' }
    ],
    isTyping: false
  }
];

const CATEGORIES = ["Все", "Электроника", "Транспорт", "Недвижимость", "Услуги", "Одежда"];

const PRESET_ASSETS = [
  {
    category: "Электроника",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-light-looking-at-phone-41858-large.mp4"
  },
  {
    category: "Транспорт",
    imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-a-racing-video-game-41618-large.mp4"
  },
  {
    category: "Недвижимость",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-at-home-41620-large.mp4"
  },
  {
    category: "Услуги",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-tailor-working-on-a-sewing-machine-41611-large.mp4"
  },
  {
    category: "Одежда",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-serving-freshly-brewed-coffee-42417-large.mp4"
  }
];

export default function App() {
  // --- LOCALSTORAGE PERSISTENT STATES ---
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('avitok_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('avitok_favorites');
    return saved ? JSON.parse(saved) : [1, 3];
  });

  const [following, setFollowing] = useState(() => {
    const saved = localStorage.getItem('avitok_following');
    return saved ? JSON.parse(saved) : ["Дмитрий"];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('avitok_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('avitok_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  // Synchronize state to LocalStorage
  useEffect(() => {
    localStorage.setItem('avitok_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('avitok_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('avitok_following', JSON.stringify(following));
  }, [following]);

  useEffect(() => {
    localStorage.setItem('avitok_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('avitok_chats', JSON.stringify(chats));
  }, [chats]);

  // --- GENERAL INTERFACE STATES ---
  const [currentTab, setCurrentTab] = useState('listings'); // 'feed' | 'listings' | 'create' | 'chats' | 'favorites'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedListing, setSelectedListing] = useState(null);
  const [showBetaGuide, setShowBetaGuide] = useState(true); // default true for first launch, can toggle

  // Catalog Filter & Sorting states
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'price_asc' | 'price_desc'
  const [conditionFilter, setConditionFilter] = useState('all'); // 'all' | 'new' | 'used'
  const [phoneCallModal, setPhoneCallModal] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Chat Messenger States
  const [activeChatId, setActiveChatId] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [offerPriceInput, setOfferPriceInput] = useState('');
  const [showOfferDrawer, setShowOfferDrawer] = useState(false);

  // Delivery & Orders States
  const [deliveryListing, setDeliveryListing] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('cdek'); // 'cdek' | 'pochta' | 'courier'
  const [deliveryCity, setDeliveryCity] = useState('Москва, Тверская ул., д. 4 (ПВЗ)');
  const [deliveryName, setDeliveryName] = useState('Иван Петров');
  const [deliveryPhone, setDeliveryPhone] = useState('+7 (926) 555-01-23');
  const [orderSuccessModal, setOrderSuccessModal] = useState(null);
  const [showOrdersList, setShowOrdersList] = useState(false);

  // TikTok Feed States
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [videoComments, setVideoComments] = useState({
    1: [
      { id: 1, user: "Никита", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80", text: "Аппарат пушка! И ценник адекватный.", date: "2 ч. назад" },
      { id: 2, user: "Мария", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80", text: "Обмен на Samsung S23 Ultra не интересует?", date: "1 ч. назад" }
    ],
    2: [
      { id: 1, user: "Игорь", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80", text: "Звук выхлопа просто космос!", date: "Вчера" }
    ]
  });
  const [newCommentText, setNewCommentText] = useState('');
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Create Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Электроника');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newVideo, setNewVideo] = useState('');
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);

  // References
  const videoRefs = useRef({});
  const chatEndRef = useRef(null);

  // Scroll to chat bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats, activeChatId]);

  // Handle playing/pausing of videos in short feed
  useEffect(() => {
    if (currentTab === 'feed') {
      Object.keys(videoRefs.current).forEach((key) => {
        const index = parseInt(key, 10);
        const videoElement = videoRefs.current[index];
        if (videoElement) {
          if (index === currentVideoIndex) {
            videoElement.play().catch((err) => console.log("Auto-play error:", err));
          } else {
            videoElement.pause();
          }
        }
      });
    } else {
      Object.values(videoRefs.current).forEach((vid) => {
        if (vid) vid.pause();
      });
    }
  }, [currentTab, currentVideoIndex]);

  // --- ACTIONS ---

  // Heart pop animation state (double tap)
  const [heartPops, setHeartPops] = useState([]);
  const lastTapRef = useRef(0);
  const touchStartYRef = useRef(0);

  // Toggle follow seller
  const toggleFollow = (sellerName, e) => {
    if (e) e.stopPropagation();
    if (following.includes(sellerName)) {
      setFollowing(following.filter(name => name !== sellerName));
    } else {
      setFollowing([...following, sellerName]);
    }
  };

  // Open Avito Delivery Checkout
  const handleOpenDelivery = (listing, e) => {
    if (e) e.stopPropagation();
    setDeliveryListing(listing);
  };

  // Submit Avito Delivery Order
  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!deliveryListing) return;

    const deliveryFees = { cdek: 350, pochta: 290, courier: 590 };
    const fee = deliveryFees[deliveryMethod] || 350;
    const orderNumber = `AV-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: Date.now(),
      orderNumber,
      listingId: deliveryListing.id,
      title: deliveryListing.title,
      price: deliveryListing.price,
      deliveryFee: fee,
      totalAmount: deliveryListing.price + fee,
      imageUrl: deliveryListing.imageUrl,
      sellerName: deliveryListing.seller.name,
      deliveryMethod,
      deliveryAddress: deliveryCity,
      recipientName: deliveryName,
      recipientPhone: deliveryPhone,
      status: "Оплачен (деньги заморожены)",
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
    };

    setOrders([newOrder, ...orders]);
    setOrderSuccessModal(newOrder);
    setDeliveryListing(null);
  };

  // Reset demo data to default state
  const resetDemoData = () => {
    if (window.confirm("Вы уверены, что хотите сбросить все данные до начального состояния?")) {
      localStorage.removeItem('avitok_listings');
      localStorage.removeItem('avitok_favorites');
      localStorage.removeItem('avitok_following');
      localStorage.removeItem('avitok_orders');
      localStorage.removeItem('avitok_chats');
      setListings(INITIAL_LISTINGS);
      setFavorites([1, 3]);
      setFollowing(["Дмитрий"]);
      setOrders([]);
      setChats(INITIAL_CHATS);
      setActiveChatId(null);
      alert("Данные успешно сброшены!");
    }
  };

  // Toggle Favorite
  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Trigger heart pop on double tap/click
  const handleVideoAreaClick = (e, item) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
      const y = e.clientY ? e.clientY - rect.top : rect.height / 2;

      const heartId = Date.now();
      setHeartPops(prev => [...prev, { id: heartId, x, y }]);
      setTimeout(() => {
        setHeartPops(prev => prev.filter(h => h.id !== heartId));
      }, 900);

      if (!favorites.includes(item.id)) {
        setFavorites(prev => [...prev, item.id]);
      }
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
      // Single tap: toggle play/pause after timeout if not double tap
      setTimeout(() => {
        if (Date.now() - lastTapRef.current >= DOUBLE_TAP_DELAY && lastTapRef.current !== 0) {
          const vid = videoRefs.current[currentVideoIndex];
          if (vid) {
            if (vid.paused) vid.play();
            else vid.pause();
          }
        }
      }, DOUBLE_TAP_DELAY);
    }
  };

  // Touch swipe handling for TikTok vertical scrolling
  const handleTouchStart = (e) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (feedListings.length <= 1) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;
    const SWIPE_THRESHOLD = 50;

    if (diff > SWIPE_THRESHOLD && currentVideoIndex < feedListings.length - 1) {
      // Swipe Up -> Next Video
      setCurrentVideoIndex(prev => prev + 1);
    } else if (diff < -SWIPE_THRESHOLD && currentVideoIndex > 0) {
      // Swipe Down -> Prev Video
      setCurrentVideoIndex(prev => prev - 1);
    }
  };

  // Mouse wheel scroll handling for feed
  const wheelLockRef = useRef(false);
  const handleWheel = (e) => {
    if (currentTab !== 'feed' || wheelLockRef.current || feedListings.length <= 1) return;
    if (Math.abs(e.deltaY) > 30) {
      wheelLockRef.current = true;
      if (e.deltaY > 0 && currentVideoIndex < feedListings.length - 1) {
        setCurrentVideoIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentVideoIndex > 0) {
        setCurrentVideoIndex(prev => prev - 1);
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 400);
    }
  };

  // Open Chat with Seller
  const startChatWithSeller = (listing) => {
    const existingChat = chats.find(c => c.listingId === listing.id);
    if (existingChat) {
      setActiveChatId(existingChat.id);
    } else {
      const newChat = {
        id: Date.now(),
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: listing.price,
        seller: listing.seller,
        messages: [
          { id: 1, sender: 'seller', text: `Здравствуйте! Вас заинтересовало объявление "${listing.title}" за ${listing.price.toLocaleString('ru-RU')} ₽?`, timestamp: 'Только что' }
        ],
        isTyping: false
      };
      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
    }
    setSelectedListing(null);
    setCurrentTab('chats');
  };

  // Send Message in Chat
  const sendMessage = (textToSend = null) => {
    const text = textToSend || messageInput;
    if (!text.trim() || !activeChatId) return;

    setChats(prevChats => prevChats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [
            ...c.messages,
            { id: Date.now(), sender: 'user', text, timestamp: 'Только что' }
          ],
          isTyping: true
        };
      }
      return c;
    }));

    if (!textToSend) {
      setMessageInput('');
    }

    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;

    const listing = listings.find(l => l.id === chat.listingId);
    const category = listing ? listing.category : 'Другое';

    let responseText = "Здравствуйте! Спасибо за интерес. Да, всё в силе. Когда вам было бы удобно встретиться?";
    if (category === "Электроника") {
      responseText = "Привет! Да, телефон в идеале. Любые проверки на месте. Готов уступить 2000 рублей при встрече сегодня у ТЦ Европейский.";
    } else if (category === "Транспорт") {
      responseText = "Добрый день! Машина полностью исправна, кузов в идеале. Осмотр в Приморском районе. Готов на диагностику на любом профильном сервисе.";
    } else if (category === "Недвижимость") {
      responseText = "Приветствую. Да, квартира реальная, все документы готовы к сделке. Показ возможен завтра после 15:00. Звоните, если хотите договориться подробнее!";
    } else if (category === "Услуги") {
      responseText = "Здравствуйте! Спасибо за обращение. Пошив занимает 10 рабочих дней. Напишите, пожалуйста, ваш номер телефона, я перезвоню и запишу вас на замер.";
    } else if (category === "Одежда") {
      responseText = "Привет! Замеры: плечи 46см, длина 65см. Отправлю Авито Доставкой сразу в день заказа. Пиши, если оформляешь!";
    }

    setTimeout(() => {
      setChats(prevChats => prevChats.map(c => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: [
              ...c.messages,
              { id: Date.now() + 1, sender: 'seller', text: responseText, timestamp: 'Только что' }
            ],
            isTyping: false
          };
        }
        return c;
      }));
    }, 1500);
  };

  // Submit New Listing
  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim() || !newDescription.trim()) return;

    const preset = PRESET_ASSETS.find(p => p.category === newCategory) || PRESET_ASSETS[0];
    const finalImage = newImage.trim() || preset.imageUrl;
    const finalVideo = newVideo.trim() || preset.videoUrl;

    const newListing = {
      id: Date.now(),
      title: newTitle,
      price: parseFloat(newPrice),
      category: newCategory,
      description: newDescription,
      location: "Москва, Центр",
      date: "Только что",
      views: 1,
      imageUrl: finalImage,
      videoUrl: finalVideo,
      seller: {
        name: "Вы (Продавец)",
        rating: 5.0,
        reviews: 0,
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      }
    };

    setListings([newListing, ...listings]);
    setShowCreateSuccess(true);

    setNewTitle('');
    setNewPrice('');
    setNewDescription('');
    setNewImage('');
    setNewVideo('');

    setTimeout(() => {
      setShowCreateSuccess(false);
      setCurrentTab('listings');
    }, 2000);
  };

  // Post Video Comment
  const addVideoComment = (listingId) => {
    if (!newCommentText.trim()) return;
    const currentComments = videoComments[listingId] || [];
    const updatedComments = [
      ...currentComments,
      {
        id: Date.now(),
        user: "Вы",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        text: newCommentText,
        date: "Только что"
      }
    ];

    setVideoComments({
      ...videoComments,
      [listingId]: updatedComments
    });
    setNewCommentText('');
  };

  // Trigger Mock Share Pop-up
  const triggerShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  // Filter and sort listings based on query, category, condition, and sort mode
  const filteredListings = listings
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
      const isNew = item.title.toLowerCase().includes('новый') || item.description.toLowerCase().includes('запечатан') || item.id === 1 || item.id === 4;
      const matchesCondition = conditionFilter === 'all' || (conditionFilter === 'new' ? isNew : !isNew);
      return matchesSearch && matchesCategory && matchesCondition;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0; // default order
    });

  // Filtered favorite listings
  const favoriteListings = listings.filter(item => favorites.includes(item.id));

  // Video feed filter
  const feedListings = listings.filter(item => !!item.videoUrl);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-950 border-x border-slate-800 relative shadow-2xl overflow-hidden font-sans">

      {/* --- TOP STATUS BAR / HEADER --- */}
      {currentTab !== 'feed' && (
        <header className="flex flex-col shrink-0 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent tracking-tight">AviTok</span>
              <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-blue-500/20">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Бета v1.1</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOrdersList(true)}
                className="relative p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-1 text-[11px] font-bold"
                title="Мои заказы с доставкой"
              >
                <Truck className="w-3.5 h-3.5 text-blue-400" />
                <span>Заказы</span>
                {orders.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
              </button>

              <button
                onClick={() => setShowBetaGuide(!showBetaGuide)}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold ${
                  showBetaGuide
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Инструкция тестирования"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Гид</span>
              </button>
              <button
                onClick={resetDemoData}
                className="text-[10px] font-medium bg-red-950/30 text-red-400 border border-red-900/30 px-2 py-1 rounded hover:bg-red-950/60"
              >
                Сброс
              </button>
            </div>
          </div>

          {/* --- COLLAPSIBLE BETA-TESTING USER GUIDE --- */}
          {showBetaGuide && (
            <div className="mx-4 mb-3 p-3 bg-blue-950/25 border border-blue-500/20 rounded-xl space-y-2 animate-slide-up text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Руководство для бета-тестера:
                </span>
                <button
                  onClick={() => setShowBetaGuide(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <ul className="text-[10px] text-slate-300 space-y-1.5 list-disc pl-3">
                <li><strong className="text-white">Лента (TikTok):</strong> Вертикальные ролики, лайки, комментарии. Кнопка <span className="text-blue-400">"Купить товар"</span> мгновенно откроет детальнее!</li>
                <li><strong className="text-white">Объявления (Avito):</strong> Удобный поиск по тексту, горизонтальные фильтры, карточки с подробным описанием и кнопкой вызова чата.</li>
                <li><strong className="text-white">Создать:</strong> Заполните форму для размещения. Если фото/видео не указаны, сработает автоматический подбор красивых медиа!</li>
                <li><strong className="text-white">Сообщения:</strong> Напишите продавцу! Кнопки быстрого ответа помогут мгновенно получить уникальный ответ от продавца в реальном времени.</li>
              </ul>

              <p className="text-[9px] text-slate-400 italic">Все внесённые изменения сохраняются на вашем устройстве с помощью LocalStorage.</p>
            </div>
          )}
        </header>
      )}

      {/* --- MAIN INTERFACE CONTENT PANELS --- */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative bg-slate-950">

        {/* TAB 1: TIKTOK SHORT FEED */}
        {currentTab === 'feed' && (
          <div
            className="h-full w-full bg-black relative flex flex-col justify-between overflow-hidden select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            {feedListings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                <Video className="w-16 h-16 mb-4 text-slate-600 animate-bounce" />
                <p className="text-lg font-bold">Видео пока нет</p>
                <p className="text-sm mt-2">Добавьте своё первое объявление с коротким видеороликом!</p>
              </div>
            ) : (
              <div className="h-full w-full relative">
                {feedListings.map((item, idx) => {
                  if (idx !== currentVideoIndex) return null;
                  const isFollowingSeller = following.includes(item.seller.name);
                  return (
                    <div
                      key={item.id}
                      className="absolute inset-0 w-full h-full bg-black flex items-center justify-center cursor-pointer"
                      onClick={(e) => handleVideoAreaClick(e, item)}
                    >
                      <video
                        ref={(el) => { videoRefs.current[idx] = el; }}
                        className="w-full h-full object-cover"
                        src={item.videoUrl}
                        loop
                        playsInline
                        muted={isMuted}
                      />

                      {/* Heart Pop Animation overlay */}
                      {heartPops.map(hp => (
                        <div
                          key={hp.id}
                          style={{ left: `${hp.x - 40}px`, top: `${hp.y - 40}px` }}
                          className="absolute pointer-events-none z-30 animate-heart-pop"
                        >
                          <Heart className="w-20 h-20 text-rose-500 fill-rose-500 drop-shadow-[0_10px_20px_rgba(244,63,94,0.6)]" />
                        </div>
                      ))}

                      {/* Header overlay */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/70 via-black/30 to-transparent p-2 rounded-xl">
                        <div className="flex items-center gap-2">
                          <button
                            className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/50 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentTab('listings');
                            }}
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Поиск</span>
                          </button>

                          <button
                            className="p-1.5 bg-blue-600/80 hover:bg-blue-500 text-white rounded-full backdrop-blur-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowBetaGuide(!showBetaGuide);
                            }}
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-300 bg-black/40 px-2 py-1 rounded-full backdrop-blur-md">
                            {currentVideoIndex + 1} / {feedListings.length}
                          </span>
                          <button
                            className="p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-white hover:bg-slate-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMuted(!isMuted);
                            }}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Right Hand Interaction Bar */}
                      <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 z-20">
                        {/* Seller Avatar with Follow Toggle */}
                        <div className="relative mb-1">
                          <img
                            src={item.seller.avatarUrl}
                            alt={item.seller.name}
                            className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover shadow-lg"
                          />
                          <button
                            onClick={(e) => toggleFollow(item.seller.name, e)}
                            className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-bold p-1 rounded-full text-white shadow-md transition-all ${
                              isFollowingSeller
                                ? 'bg-emerald-500 hover:bg-emerald-600 scale-90'
                                : 'bg-rose-500 hover:bg-rose-600 scale-100 animate-pulse'
                            }`}
                            title={isFollowingSeller ? "Вы подписаны" : "Подписаться"}
                          >
                            {isFollowingSeller ? (
                              <Check className="w-2.5 h-2.5" />
                            ) : (
                              <PlusCircle className="w-2.5 h-2.5" />
                            )}
                          </button>
                        </div>

                        {/* Likes */}
                        <button
                          className="flex flex-col items-center gap-1 group"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id, e);
                          }}
                        >
                          <div className={`p-3 rounded-full transition-all duration-200 shadow-md ${favorites.includes(item.id) ? 'bg-rose-500 text-white scale-110' : 'bg-slate-900/75 text-slate-200 hover:bg-slate-800'}`}>
                            <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                          </div>
                          <span className="text-[11px] font-medium text-slate-200 drop-shadow">
                            {favorites.includes(item.id) ? '1.4к' : '1.3к'}
                          </span>
                        </button>

                        {/* Comments */}
                        <button
                          className="flex flex-col items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowCommentsDrawer(true);
                          }}
                        >
                          <div className="p-3 rounded-full bg-slate-900/75 text-slate-200 hover:bg-slate-800 shadow-md">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] font-medium text-slate-200 drop-shadow">
                            {(videoComments[item.id] || []).length + 4}
                          </span>
                        </button>

                        {/* Share */}
                        <button
                          className="flex flex-col items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerShare();
                          }}
                        >
                          <div className="p-3 rounded-full bg-slate-900/75 text-slate-200 hover:bg-slate-800 shadow-md">
                            <Share2 className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-medium text-slate-200 drop-shadow">Поделиться</span>
                        </button>

                        {/* Animated Rotating Vinyl Disk */}
                        <div className="pt-2 flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 p-1 flex items-center justify-center animate-spin-slow shadow-xl">
                            <img
                              src={item.seller.avatarUrl}
                              className="w-full h-full rounded-full object-cover"
                              alt="track"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Context Info Overlay */}
                      <div className="absolute bottom-3 left-3 right-20 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 rounded-xl flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">@{item.seller.name}</span>
                          {isFollowingSeller && (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-medium">Подписка</span>
                          )}
                          <span className="text-[10px] text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded-md font-semibold">Рейтинг {item.seller.rating} ★</span>
                        </div>

                        <p className="text-xs text-slate-100 line-clamp-2">
                          {item.title} — {item.description}
                        </p>

                        {/* Audio track ticker marquee */}
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-medium">
                          <Music className="w-3 h-3 text-blue-400 shrink-0" />
                          <span className="truncate">Оригинальный звук — {item.seller.name} • {item.category}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>

                        {/* Product Action Buttons */}
                        <div className="flex gap-2 mt-1">
                          <button
                            className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs px-2.5 py-2.5 rounded-lg border border-slate-700/80 shadow-lg active:scale-95 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedListing(item);
                            }}
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                            <span>Товар: {item.price.toLocaleString('ru-RU')} ₽</span>
                          </button>

                          <button
                            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-2.5 py-2.5 rounded-lg shadow-lg active:scale-95 transition-all border border-blue-400/30"
                            onClick={(e) => handleOpenDelivery(item, e)}
                          >
                            <Truck className="w-3.5 h-3.5 text-sky-200" />
                            <span>Доставка</span>
                          </button>
                        </div>
                      </div>

                      {/* Video scroll navigation arrows */}
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                        <button
                          disabled={currentVideoIndex === 0}
                          className="p-2 rounded-full bg-slate-900/60 text-slate-300 hover:text-white disabled:opacity-20 disabled:pointer-events-none backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentVideoIndex(currentVideoIndex - 1);
                          }}
                          title="Предыдущее видео"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <button
                          disabled={currentVideoIndex === feedListings.length - 1}
                          className="p-2 rounded-full bg-slate-900/60 text-slate-300 hover:text-white disabled:opacity-20 disabled:pointer-events-none backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentVideoIndex(currentVideoIndex + 1);
                          }}
                          title="Следующее видео"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Simulated comments drawer */}
            {showCommentsDrawer && (
              <div className="absolute inset-x-0 bottom-0 bg-slate-900 rounded-t-2xl z-30 flex flex-col h-3/5 border-t border-slate-700 animate-slide-up">
                <div className="flex items-center justify-between p-4 border-b border-slate-800">
                  <span className="font-bold text-sm">Комментарии ({ (videoComments[feedListings[currentVideoIndex]?.id] || []).length + 4 })</span>
                  <button
                    className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                    onClick={() => setShowCommentsDrawer(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                  <div className="flex gap-2 text-xs">
                    <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-300">Анна К. <span className="text-[10px] text-slate-500 font-normal">3 ч. назад</span></p>
                      <p className="text-slate-100 mt-1">Торг есть? С доставкой отправите?</p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-300">Сергей <span className="text-[10px] text-slate-500 font-normal">5 ч. назад</span></p>
                      <p className="text-slate-100 mt-1">Дороговато что-то, вчера за такую же цену лучший вариант видел.</p>
                    </div>
                  </div>

                  {/* Dynamic User Comments */}
                  {(videoComments[feedListings[currentVideoIndex]?.id] || []).map(comment => (
                    <div key={comment.id} className="flex gap-2 text-xs">
                      <img src={comment.avatar} className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-300">{comment.user} <span className="text-[10px] text-slate-500 font-normal">{comment.date}</span></p>
                        <p className="text-slate-100 mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input Footer */}
                <div className="p-3 border-t border-slate-800 bg-slate-900 flex gap-2">
                  <input
                    type="text"
                    placeholder="Написать комментарий..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 bg-slate-850 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addVideoComment(feedListings[currentVideoIndex]?.id);
                    }}
                  />
                  <button
                    onClick={() => addVideoComment(feedListings[currentVideoIndex]?.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all"
                  >
                    Отправить
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AVITO CLASSIFIEDS */}
        {currentTab === 'listings' && (
          <div className="p-4 space-y-4">

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск объявлений (например, iPhone, BMW...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md scale-105'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sub-filters & Sorting toolbar */}
            <div className="flex items-center justify-between gap-2 text-xs">
              {/* Condition filter pills */}
              <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                <button
                  onClick={() => setConditionFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-all ${conditionFilter === 'all' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Все
                </button>
                <button
                  onClick={() => setConditionFilter('new')}
                  className={`px-2.5 py-1 rounded-md transition-all ${conditionFilter === 'new' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Новое
                </button>
                <button
                  onClick={() => setConditionFilter('used')}
                  className={`px-2.5 py-1 rounded-md transition-all ${conditionFilter === 'used' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Б/у
                </button>
              </div>

              {/* Sorting select */}
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px]">
                <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="default" className="bg-slate-900 text-white">По новизне</option>
                  <option value="price_asc" className="bg-slate-900 text-white">Дешевле</option>
                  <option value="price_desc" className="bg-slate-900 text-white">Дороже</option>
                </select>
              </div>
            </div>

            {/* Grid List */}
            {filteredListings.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-base font-bold">Ничего не найдено</p>
                <p className="text-xs mt-1">Попробуйте ввести другой поисковый запрос</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3.5">
                {filteredListings.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedListing(item)}
                    className="bg-slate-900 rounded-xl overflow-hidden cursor-pointer border border-slate-800 hover:border-slate-700 transition-all flex flex-col group"
                  >
                    {/* Listing Image */}
                    <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Favorite/Heart Overlay */}
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-all ${
                          favorites.includes(item.id)
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-950/60 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                      </button>

                      {/* Badges Overlay */}
                      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 flex-wrap">
                        {item.videoUrl && (
                          <div className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md text-[9px] text-blue-400 px-1.5 py-0.5 rounded font-bold border border-blue-500/30">
                            <Video className="w-2.5 h-2.5" />
                            <span>Видео</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 bg-indigo-950/80 backdrop-blur-md text-[9px] text-indigo-300 px-1.5 py-0.5 rounded font-bold border border-indigo-500/30">
                          <Truck className="w-2.5 h-2.5" />
                          <span>Доставка</span>
                        </div>
                      </div>
                    </div>

                    {/* Listing Details */}
                    <div className="p-3 flex-1 flex flex-col justify-between gap-1.5 bg-slate-900">
                      <div>
                        <p className="text-[13px] font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-sm font-black text-white mt-0.5">
                          {item.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>

                      <div className="text-[10px] text-slate-400 space-y-0.5 mt-auto">
                        <div className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                          <span className="truncate">{item.location.split(',')[0]}</span>
                        </div>
                        <p>{item.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CREATE NEW LISTING */}
        {currentTab === 'create' && (
          <div className="p-5 space-y-6">
            <div>
              <h2 className="text-lg font-black bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">Разместить объявление</h2>
              <p className="text-xs text-slate-400">Объявление автоматически получит короткое видео на вкладке ленты!</p>
            </div>

            {showCreateSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-xl text-center space-y-3 animate-pulse">
                <Sparkles className="w-12 h-12 mx-auto text-emerald-400" />
                <h3 className="font-bold text-sm">Объявление успешно опубликовано!</h3>
                <p className="text-xs text-slate-300">Оно появилось в каталоге Авито и нашей TikTok ленте.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateListing} className="space-y-4">

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Название объявления *</label>
                  <input
                    type="text"
                    required
                    placeholder="Например, Sony PlayStation 5"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Цена (₽) *</label>
                    <input
                      type="number"
                      required
                      placeholder="50000"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Категория *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      {CATEGORIES.filter(c => c !== 'Все').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Описание *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Опишите состояние товара, комплектацию и условия сделки..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                  ></textarea>
                </div>

                {/* Optional Media Fields */}
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-3">
                  <p className="text-[10px] text-blue-300 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Авто-подбор картинок и видео по категории:</span>
                  </p>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Своя ссылка на фото (необязательно)</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Своя ссылка на видео (необязательно)</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newVideo}
                        onChange={(e) => setNewVideo(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Подать объявление</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: CHATS MESSENGER */}
        {currentTab === 'chats' && (
          <div className="h-full flex flex-col">
            {!activeChatId ? (
              // Chat List view
              <div className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar">
                <h2 className="text-base font-black px-1">Мои сообщения</h2>

                {chats.length === 0 ? (
                  <div className="h-4/5 flex flex-col items-center justify-center text-slate-400 text-center p-6">
                    <MessageSquare className="w-12 h-12 mb-2 text-slate-700" />
                    <p className="font-bold">Сообщений пока нет</p>
                    <p className="text-xs mt-1">Откройте интересующее объявление и напишите продавцу!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {chats.map(chat => {
                      const lastMsg = chat.messages[chat.messages.length - 1];
                      return (
                        <div
                          key={chat.id}
                          onClick={() => setActiveChatId(chat.id)}
                          className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl cursor-pointer border border-slate-800 hover:border-slate-700 transition-colors"
                        >
                          <img
                            src={chat.seller.avatarUrl}
                            alt={chat.seller.name}
                            className="w-11 h-11 rounded-full object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white">{chat.seller.name}</span>
                              <span className="text-[9px] text-slate-400">{lastMsg ? lastMsg.timestamp : ''}</span>
                            </div>
                            <p className="text-[10px] font-bold text-blue-400 truncate mt-0.5">
                              {chat.listingTitle} — {chat.listingPrice.toLocaleString('ru-RU')} ₽
                            </p>
                            <p className="text-xs text-slate-300 truncate mt-1">
                              {chat.isTyping ? (
                                <span className="text-blue-400 font-medium italic animate-pulse">печатает...</span>
                              ) : (
                                lastMsg ? lastMsg.text : 'Нет сообщений'
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              // Individual Chat Window view
              (() => {
                const chat = chats.find(c => c.id === activeChatId);
                if (!chat) return null;
                return (
                  <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between p-3 bg-slate-900 border-b border-slate-800 shrink-0">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => setActiveChatId(null)}
                          className="p-1 hover:bg-slate-800 rounded-full text-slate-300"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2">
                          <img
                            src={chat.seller.avatarUrl}
                            alt={chat.seller.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <p className="font-bold text-xs">{chat.seller.name}</p>
                            <span className="text-[9px] text-blue-400 font-medium">Рейтинг {chat.seller.rating} ★</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right max-w-[120px] truncate">
                        <p className="text-[10px] font-bold text-slate-200 truncate">{chat.listingTitle}</p>
                        <p className="text-[10px] text-slate-400">{chat.listingPrice.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    </div>

                    {/* Chat Messages Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-slate-950">
                      {chat.messages.map(msg => {
                        const isUser = msg.sender === 'user';
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                              isUser
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-bl-none'
                            }`}>
                              <p>{msg.text}</p>
                              <div className="flex justify-end items-center gap-0.5 mt-1 text-[8px] text-slate-400">
                                <span>{msg.timestamp}</span>
                                {isUser && <CheckCheck className="w-3 h-3 text-blue-300" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {chat.isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-slate-900 border border-slate-800 rounded-xl rounded-bl-none px-4 py-2.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Direct Delivery Banner & Quick Response Chips */}
                    <div className="px-3 py-1.5 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between gap-2 shrink-0">
                      <div className="overflow-x-auto no-scrollbar flex gap-1.5 py-0.5">
                        <button
                          onClick={() => setShowOfferDrawer(true)}
                          className="bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold px-2.5 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          <span>Предложить цену</span>
                        </button>
                        <button
                          onClick={() => {
                            const relatedListing = listings.find(l => l.id === chat.listingId);
                            if (relatedListing) handleOpenDelivery(relatedListing);
                          }}
                          className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] font-bold px-2.5 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1"
                        >
                          <Truck className="w-3 h-3" />
                          <span>Купить с доставкой</span>
                        </button>
                        <button
                          onClick={() => sendMessage("Здравствуйте! Объявление актуально?")}
                          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[10px] font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap"
                        >
                          Актуально?
                        </button>
                        <button
                          onClick={() => sendMessage("Какое окончательное состояние?")}
                          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[10px] font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap"
                        >
                          Какое состояние?
                        </button>
                      </div>
                    </div>

                    {/* Chat Input Bar */}
                    <div className="p-3 border-t border-slate-800 bg-slate-900 flex gap-2 shrink-0">
                      <input
                        type="text"
                        placeholder="Напишите сообщение..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') sendMessage();
                        }}
                      />
                      <button
                        onClick={() => sendMessage()}
                        className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-xl shadow-md active:scale-95 transition-all shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* TAB 5: FAVORITES / LIKED ITEMS */}
        {currentTab === 'favorites' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-base font-black">Избранное</h2>
              <span className="bg-rose-500/10 text-rose-400 text-xs px-2 py-0.5 rounded-full font-bold">
                {favoriteListings.length}
              </span>
            </div>

            {favoriteListings.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <Heart className="w-12 h-12 text-slate-700 mx-auto" />
                <p className="font-bold">В избранном пусто</p>
                <p className="text-xs">Добавляйте понравившиеся объявления, кликая по сердечку!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {favoriteListings.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedListing(item)}
                    className="flex gap-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg shrink-0 bg-slate-950"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        <p className="text-sm font-black text-white mt-0.5">
                          {item.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="truncate">{item.location.split(',')[0]}</span>
                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="text-rose-500 hover:text-rose-400 p-1 rounded-full hover:bg-slate-800/50"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* --- FLOATING DETAILED CLASSIFIED VIEW MODAL --- */}
      {selectedListing && (
        <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col overflow-y-auto no-scrollbar animate-slide-up">
          {/* Header Controls */}
          <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-3.5 flex items-center justify-between z-10">
            <button
              onClick={() => setSelectedListing(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 px-3 py-1.5 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Назад</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => toggleFavorite(selectedListing.id, e)}
                className={`p-2 rounded-full ${favorites.includes(selectedListing.id) ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(selectedListing.id) ? 'fill-current' : ''}`} />
              </button>
              <button onClick={triggerShare} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4 space-y-4 pb-24">
            {/* Main Picture */}
            <div className="aspect-[4/3] w-full bg-black rounded-xl overflow-hidden border border-slate-800">
              <img
                src={selectedListing.imageUrl}
                alt={selectedListing.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title, Category & Stats */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                {selectedListing.category}
              </span>
              <h1 className="text-base font-black text-white leading-snug mt-1.5">
                {selectedListing.title}
              </h1>
              <div className="text-xl font-black text-white">
                {selectedListing.price.toLocaleString('ru-RU')} ₽
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-y border-slate-800/60 py-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {selectedListing.location}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {selectedListing.views} просмотров
                </span>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Описание товара</h3>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                {selectedListing.description}
              </p>
            </div>

            {/* Seller profile section */}
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedListing.seller.avatarUrl}
                  alt={selectedListing.seller.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="font-bold text-xs flex items-center gap-1.5 text-white">
                    <span>{selectedListing.seller.name}</span>
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1 rounded">Частное лицо</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold mt-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{selectedListing.seller.rating}</span>
                    <span className="text-slate-400 font-normal">({selectedListing.seller.reviews} отзывов)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Persistent Action footer */}
          <div className="fixed bottom-0 inset-x-0 bg-slate-900/95 border-t border-slate-800 p-3.5 flex flex-col gap-2 max-w-md mx-auto z-20 shrink-0">
            <button
              onClick={(e) => handleOpenDelivery(selectedListing, e)}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all border border-blue-400/30"
            >
              <Truck className="w-4 h-4 text-sky-200" />
              <span>Купить с Авито Доставкой</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setPhoneCallModal(selectedListing)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Позвонить</span>
              </button>
              <button
                onClick={() => startChatWithSeller(selectedListing)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-700"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                <span>Написать</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- AVITO DELIVERY CHECKOUT MODAL --- */}
      {deliveryListing && (
        <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col justify-end animate-slide-up">
          <div className="bg-slate-900 border-t border-slate-800 rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto no-scrollbar space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white">Авито Доставка</h3>
              </div>
              <button
                onClick={() => setDeliveryListing(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product summary card */}
            <div className="flex gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <img
                src={deliveryListing.imageUrl}
                alt={deliveryListing.title}
                className="w-16 h-16 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{deliveryListing.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Продавец: {deliveryListing.seller.name}</p>
                <p className="text-sm font-black text-blue-400 mt-1">{deliveryListing.price.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>

            {/* Buyer protection guarantee badge */}
            <div className="bg-blue-950/30 border border-blue-500/30 p-2.5 rounded-xl flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-300">
                <span className="font-bold text-white">Безопасная сделка:</span> Деньги замораживаются банком и перечисляются продавцу только после того, как вы проверите товар в пункте выдачи.
              </div>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3.5">
              {/* Delivery method choice */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Способ доставки</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('cdek')}
                    className={`p-2.5 rounded-xl text-left border flex flex-col justify-between transition-all ${
                      deliveryMethod === 'cdek'
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold">СДЭК</span>
                    <span className="text-[10px] text-slate-300 mt-1">350 ₽ • 2-3 дня</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pochta')}
                    className={`p-2.5 rounded-xl text-left border flex flex-col justify-between transition-all ${
                      deliveryMethod === 'pochta'
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold">Почта РФ</span>
                    <span className="text-[10px] text-slate-300 mt-1">290 ₽ • 3-5 дней</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('courier')}
                    className={`p-2.5 rounded-xl text-left border flex flex-col justify-between transition-all ${
                      deliveryMethod === 'courier'
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold">Курьер</span>
                    <span className="text-[10px] text-slate-300 mt-1">590 ₽ • завтра</span>
                  </button>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Адрес пункта выдачи или доставки *</label>
                <input
                  type="text"
                  required
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">Получатель (ФИО) *</label>
                  <input
                    type="text"
                    required
                    value={deliveryName}
                    onChange={(e) => setDeliveryName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">Номер телефона *</label>
                  <input
                    type="tel"
                    required
                    value={deliveryPhone}
                    onChange={(e) => setDeliveryPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Cost summary calculation */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Стоимость товара:</span>
                  <span className="text-white">{deliveryListing.price.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Доставка ({deliveryMethod === 'cdek' ? 'СДЭК' : deliveryMethod === 'pochta' ? 'Почта РФ' : 'Курьер'}):</span>
                  <span className="text-white">{(deliveryMethod === 'cdek' ? 350 : deliveryMethod === 'pochta' ? 290 : 590).toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="border-t border-slate-800 pt-1.5 flex justify-between font-black text-sm">
                  <span className="text-white">Итого к оплате:</span>
                  <span className="text-blue-400">
                    {(deliveryListing.price + (deliveryMethod === 'cdek' ? 350 : deliveryMethod === 'pochta' ? 290 : 590)).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Оплатить заказ с защитой</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- ORDER CONFIRMATION SUCCESS MODAL --- */}
      {orderSuccessModal && (
        <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4 text-center animate-slide-up">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Заказ оформлен!</h3>
              <p className="text-xs text-blue-400 font-mono mt-1">№ {orderSuccessModal.orderNumber}</p>
              <p className="text-xs text-slate-300 mt-2">
                Деньги безопасно зарезервированы. Продавец оповещён и готовит посылку к отправке.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left text-xs space-y-1">
              <p className="font-bold text-white truncate">{orderSuccessModal.title}</p>
              <p className="text-slate-400">Сумма с доставкой: <span className="text-blue-400 font-bold">{orderSuccessModal.totalAmount.toLocaleString('ru-RU')} ₽</span></p>
              <p className="text-slate-400">Куда: <span className="text-slate-200">{orderSuccessModal.deliveryAddress}</span></p>
            </div>
            <button
              onClick={() => setOrderSuccessModal(null)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs transition-all"
            >
              Отлично
            </button>
          </div>
        </div>
      )}

      {/* --- ORDERS LIST DRAWER / MODAL --- */}
      {showOrdersList && (
        <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col animate-slide-up">
          <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-3.5 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-400" />
              <h2 className="font-black text-sm text-white">Мои заказы с доставкой ({orders.length})</h2>
            </div>
            <button
              onClick={() => setShowOrdersList(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3">
            {orders.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <Truck className="w-12 h-12 text-slate-700 mx-auto" />
                <p className="font-bold">У вас пока нет заказов</p>
                <p className="text-xs">Нажмите «Купить с Авито Доставкой» на любом товаре, чтобы оформить безопасную покупку!</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-blue-400 font-bold">{order.orderNumber}</span>
                    <span className="text-slate-400">{order.date}</span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <img src={order.imageUrl} className="w-14 h-14 object-cover rounded-lg shrink-0 bg-slate-950" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-white truncate">{order.title}</p>
                      <p className="text-[11px] text-slate-400">Продавец: {order.sellerName}</p>
                      <p className="text-xs font-black text-white mt-0.5">{order.totalAmount.toLocaleString('ru-RU')} ₽</p>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg text-[10px] text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Check className="w-3 h-3" />
                      {order.status}
                    </span>
                    <span className="text-slate-400 truncate max-w-[150px]">{order.deliveryAddress}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* --- OFFER PRICE BARGAINING MODAL --- */}
      {showOfferDrawer && (
        <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 max-w-sm w-full space-y-3.5 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-indigo-400" />
                <span>Предложить свою цену</span>
              </h3>
              <button onClick={() => setShowOfferDrawer(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Укажите сумму, за которую вы готовы приобрести данный товар. Продавец получит ваше предложение.
            </p>
            <div className="space-y-1">
              <input
                type="number"
                placeholder="Например, 85000"
                value={offerPriceInput}
                onChange={(e) => setOfferPriceInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-bold"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOfferDrawer(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-semibold"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  if (offerPriceInput.trim()) {
                    sendMessage(`Предлагаю купить за ${parseInt(offerPriceInput, 10).toLocaleString('ru-RU')} ₽. Что скажете?`);
                    setOfferPriceInput('');
                    setShowOfferDrawer(false);
                  }
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold"
              >
                Отправить оффер
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PHONE CALL MODAL --- */}
      {phoneCallModal && (
        <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4 text-center animate-slide-up">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">{phoneCallModal.seller.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Рейтинг {phoneCallModal.seller.rating} ★ ({phoneCallModal.seller.reviews} отзывов)</p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mt-3 flex items-center justify-between">
                <span className="font-mono text-base font-bold text-emerald-400">
                  +7 (999) 123-45-{phoneCallModal.id}{phoneCallModal.id}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`+799912345${phoneCallModal.id}${phoneCallModal.id}`);
                    setCopiedPhone(true);
                    setTimeout(() => setCopiedPhone(false), 2000);
                  }}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                  title="Скопировать"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Звоните с 9:00 до 22:00 по московскому времени. Скажите, что звоните по объявлению на АвиТок.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPhoneCallModal(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-semibold"
              >
                Закрыть
              </button>
              <a
                href={`tel:+799912345${phoneCallModal.id}${phoneCallModal.id}`}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Набрать номер</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- COPY SHARE TOAST BANNER --- */}
      {showShareToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg z-50 animate-pulse border border-blue-400/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ссылка скопирована в буфер обмена!</span>
        </div>
      )}

      {/* --- PERSISTENT MOBILE BOTTOM NAVIGATION BAR --- */}
      <nav className="h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-around shrink-0 z-40">

        {/* TAB 1: TikTok Feed mode */}
        <button
          onClick={() => setCurrentTab('feed')}
          className={`flex flex-col items-center gap-1 transition-all ${
            currentTab === 'feed' ? 'text-blue-400 font-black scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Video className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-blue-500 w-1.5 h-1.5 rounded-full animate-ping"></span>
          </div>
          <span className="text-[10px]">Лента</span>
        </button>

        {/* TAB 2: Avito Classifieds grid */}
        <button
          onClick={() => {
            setCurrentTab('listings');
            setSelectedListing(null);
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            currentTab === 'listings' ? 'text-blue-400 font-black scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px]">Объявления</span>
        </button>

        {/* TAB 3: Create new Listing form */}
        <button
          onClick={() => setCurrentTab('create')}
          className={`flex flex-col items-center gap-1 transition-all ${
            currentTab === 'create' ? 'text-blue-400 font-black scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="bg-blue-600 hover:bg-blue-500 text-white p-1 rounded-full shadow-md">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-semibold">Создать</span>
        </button>

        {/* TAB 4: Messenger chats */}
        <button
          onClick={() => setCurrentTab('chats')}
          className={`flex flex-col items-center gap-1 transition-all relative ${
            currentTab === 'chats' ? 'text-blue-400 font-black scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            {chats.some(c => c.isTyping) ? (
              <span className="absolute -top-1 -right-1 bg-blue-500 w-2 h-2 rounded-full animate-ping"></span>
            ) : (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-[8px] text-white px-1 rounded-full font-bold">1</span>
            )}
          </div>
          <span className="text-[10px]">Сообщения</span>
        </button>

        {/* TAB 5: Favorites list */}
        <button
          onClick={() => setCurrentTab('favorites')}
          className={`flex flex-col items-center gap-1 transition-all ${
            currentTab === 'favorites' ? 'text-blue-400 font-black scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-[8px] text-white px-1 rounded-full font-bold">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px]">Избранное</span>
        </button>

      </nav>

    </div>
  );
}

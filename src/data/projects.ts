export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  link: string;
  category: "React / Next.js" | "Vue / Nuxt";
  gradient: string;
};

export const projects: Project[] = [
  {
    id: "dev-flow",
    title: "Dev Flow",
    tagline: "Developer community и Q&A-платформа",
    description:
      "Платформа вопросов и ответов для разработчиков в духе Stack Overflow. Пользователи регистрируются, публикуют вопросы, отвечают друг другу, ищут по тегам и сохраняют интересные материалы в коллекции.",
    features: [
      "Авторизация и профили пользователей",
      "Публикация и поиск вопросов",
      "Работа с тегами и ответами",
      "Персональные коллекции",
    ],
    stack: ["React", "Next.js"],
    link: "https://dev-flow-eight-sepia.vercel.app",
    category: "React / Next.js",
    gradient: "from-framer-blue to-framer-purple",
  },
  {
    id: "proshop",
    title: "ProShop",
    tagline: "E-commerce с пользовательской и админ-частью",
    description:
      "Полноценный интернет-магазин: каталог товаров, корзина и оформление заказа на клиентской стороне, плюс административная панель для управления товарами и заказами через REST API.",
    features: [
      "Каталог и корзина",
      "Оформление заказов",
      "Управление профилем",
      "Админ-панель товаров",
    ],
    stack: ["React", "Redux", "REST API"],
    link: "https://proshop-three.vercel.app",
    category: "React / Next.js",
    gradient: "from-framer-purple to-framer-pink",
  },
  {
    id: "house-marketplace",
    title: "House Marketplace",
    tagline: "Маркетплейс объявлений о недвижимости",
    description:
      "Сервис для размещения и управления объявлениями о продаже и аренде недвижимости: регистрация, личный кабинет, создание и редактирование объявлений с загрузкой изображений.",
    features: [
      "Авторизация через Firebase",
      "Создание и редактирование объявлений",
      "Загрузка изображений",
      "Личный кабинет пользователя",
    ],
    stack: ["React", "Firebase"],
    link: "https://house-marketplace-kohl-tau.vercel.app",
    category: "React / Next.js",
    gradient: "from-framer-pink to-framer-red",
  },
  {
    id: "next-pizza",
    title: "Next Pizza",
    tagline: "SSR e-commerce с динамическими страницами",
    description:
      "Интернет-магазин пиццы с серверным рендерингом: каталог товаров с конструктором, динамические страницы карточек товара и корзина с подсчётом стоимости.",
    features: [
      "Server-side rendering",
      "Каталог и конструктор товара",
      "Динамические страницы",
      "Корзина",
    ],
    stack: ["Next.js", "React"],
    link: "https://next-pizza-silk.vercel.app",
    category: "React / Next.js",
    gradient: "from-framer-red to-framer-orange",
  },
  {
    id: "github-finder",
    title: "GitHub Finder",
    tagline: "Поиск пользователей GitHub по API",
    description:
      "Небольшое SPA-приложение для поиска пользователей GitHub с выводом карточки профиля, публичных репозиториев и статистики через публичное GitHub API.",
    features: ["Поиск по логину", "Карточка профиля", "Список репозиториев"],
    stack: ["React"],
    link: "https://github-finder-app-one-woad.vercel.app",
    category: "React / Next.js",
    gradient: "from-framer-orange to-framer-teal",
  },
  {
    id: "feedback-app",
    title: "Feedback App",
    tagline: "Приложение для сбора и рейтинга отзывов",
    description:
      "Интерфейс для добавления, редактирования и удаления отзывов с рейтингом и подсчётом среднего балла — практика работы с формами, контекстом и локальным состоянием React.",
    features: ["CRUD-операции над отзывами", "Рейтинг и средний балл", "Context API"],
    stack: ["React"],
    link: "https://feedback-fed.netlify.app",
    category: "React / Next.js",
    gradient: "from-framer-teal to-framer-blue",
  },
  {
    id: "notes",
    title: "Notes",
    tagline: "SPA для заметок и задач с undo/redo",
    description:
      "Приложение для управления заметками и Todo с ручной реализацией undo/redo, восстановлением черновиков и версионным сохранением. Дополнено keyboard-навигацией, focus trap, unit-тестами и Docker-сборкой.",
    features: [
      "Undo/redo и draft recovery",
      "Versioned persistence",
      "Keyboard interactions + focus trap",
      "Unit-тесты (Vitest) и Docker",
    ],
    stack: ["Nuxt 4", "Vue 3", "Pinia", "TypeScript", "Vitest"],
    link: "https://nebus-eta.vercel.app",
    category: "Vue / Nuxt",
    gradient: "from-framer-blue to-framer-teal",
  },
  {
    id: "online-bank",
    title: "Online Bank",
    tagline: "Интерфейс интернет-банка",
    description:
      "Банковский интерфейс с авторизацией и управлением счетами: финансовый дашборд с балансом и графиками, история транзакций и переводы между счетами.",
    features: ["Авторизация", "Финансовый дашборд", "История транзакций"],
    stack: ["Vue 3"],
    link: "https://vue-online-bank-e52b4.web.app",
    category: "Vue / Nuxt",
    gradient: "from-framer-purple to-framer-blue",
  },
  {
    id: "live-chat",
    title: "Live Chat",
    tagline: "Чат в реальном времени",
    description:
      "Приложение чата с обменом сообщениями в реальном времени, списком онлайн-пользователей и хранением истории переписки на Firebase Realtime Database.",
    features: ["Real-time обмен сообщениями", "Список онлайн-пользователей", "Firebase Realtime DB"],
    stack: ["Vue 3", "Firebase"],
    link: "https://live-chat-3994e.web.app",
    category: "Vue / Nuxt",
    gradient: "from-framer-pink to-framer-purple",
  },
  {
    id: "weather-widget",
    title: "Weather Widget",
    tagline: "Виджет погоды по городам",
    description:
      "Компактный виджет прогноза погоды: поиск города, вывод текущей температуры и условий через внешнее погодное API с анимированными переходами между состояниями.",
    features: ["Поиск по городу", "Текущая погода и прогноз", "Интеграция с Weather API"],
    stack: ["Vue 3"],
    link: "https://weather-widget-72c14.web.app",
    category: "Vue / Nuxt",
    gradient: "from-framer-teal to-framer-purple",
  },
  {
    id: "vue-crm",
    title: "Vue CRM",
    tagline: "CRM для учёта категорий и записей",
    description:
      "Учебная CRM-система на Vue 2: авторизация, учёт категорий с лимитами, история операций и постраничная навигация по записям.",
    features: ["Авторизация", "Учёт категорий и лимитов", "История операций", "Пагинация"],
    stack: ["Vue 2"],
    link: "https://vue-crm-51864.web.app",
    category: "Vue / Nuxt",
    gradient: "from-framer-orange to-framer-pink",
  },
  {
    id: "vue-store",
    title: "Vue Store",
    tagline: "Интернет-магазин на Vue 2",
    description:
      "Классический интернет-магазин на Vue 2 с каталогом товаров, фильтрацией, корзиной и оформлением заказа — база для отработки паттернов Vuex и компонентной архитектуры.",
    features: ["Каталог и фильтры", "Корзина", "Vuex store"],
    stack: ["Vue 2"],
    link: "https://vue-store-b2a1b.web.app",
    category: "Vue / Nuxt",
    gradient: "from-framer-red to-framer-blue",
  },
];

export const projectCategories = ["Все", "React / Next.js", "Vue / Nuxt"] as const;

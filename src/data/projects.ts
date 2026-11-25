import type { L } from "../i18n";

export type ProjectCategory = "React / Next.js" | "Vue / Nuxt";

export type Project = {
  id: string;
  title: string;
  tagline: L;
  description: L;
  features: L<string[]>;
  stack: string[];
  link: string;
  /** what `link` opens: a live demo (default) or the source code */
  linkType?: "demo" | "code";
  /** screenshot of the live app in public/projects (800×500); without one the
      card falls back to a gradient tile */
  preview?: string;
  /** year the repository went up on GitHub */
  year: number;
  category: ProjectCategory;
  gradient: string;
};

// React / Next.js first: Vue / Nuxt is the production stack (see experience
// and cases), React is what grows outside work — these show that, newest first
export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Arc. Portfolio",
    tagline: { ru: "Этот сайт — React + TypeScript", en: "This site — React + TypeScript" },
    description: {
      ru: "Сайт, который вы сейчас смотрите. В работе я пишу на Vue / Nuxt, а этот проект — моя площадка для React: архитектура, анимации, доступность и производительность доведены до продакшен-уровня.",
      en: "The site you're looking at. At work I write Vue / Nuxt; this project is my React playground, with architecture, animation, accessibility and performance taken to production level.",
    },
    features: {
      ru: [
        "Пререндер русской и английской версий: быстрая первая отрисовка и SEO",
        "Анимации на Framer Motion: shared layout, spring-физика, ⌘K-палитра",
        "Доступность: клавиатура, фокус, prefers-reduced-motion",
        "Производительность: ленивые чанки, оптимизация рендеринга под Safari / iOS",
      ],
      en: [
        "Prerendered Russian and English versions: fast first paint and SEO",
        "Framer Motion animation: shared layout, spring physics, a ⌘K palette",
        "Accessibility: keyboard, focus, prefers-reduced-motion",
        "Performance: lazy chunks, rendering tuned for Safari / iOS",
      ],
    },
    stack: ["React", "TypeScript", "Framer Motion", "Vite", "Tailwind"],
    link: "https://github.com/Sergey-Kukharenko/portfolio",
    linkType: "code",
    preview: "/projects/portfolio.jpg",
    year: 2026,
    category: "React / Next.js",
    gradient: "from-framer-pink to-framer-blue",
  },
  {
    id: "dev-flow",
    title: "Dev Flow",
    tagline: { ru: "Developer community и Q&A-платформа", en: "Developer community and Q&A platform" },
    description: {
      ru: "Платформа вопросов и ответов для разработчиков в духе Stack Overflow. Пользователи регистрируются, публикуют вопросы, отвечают друг другу, ищут по тегам и сохраняют интересные материалы в коллекции.",
      en: "A Stack Overflow–style Q&A platform for developers. Users sign up, post questions, answer each other, search by tags and save useful material to collections.",
    },
    features: {
      ru: ["Авторизация и профили пользователей", "Публикация и поиск вопросов", "Работа с тегами и ответами", "Персональные коллекции"],
      en: ["Auth and user profiles", "Posting and searching questions", "Tags and answers", "Personal collections"],
    },
    stack: ["React", "Next.js"],
    link: "https://dev-flow-eight-sepia.vercel.app",
    preview: "/projects/dev-flow.jpg",
    year: 2026,
    category: "React / Next.js",
    gradient: "from-framer-blue to-framer-purple",
  },
  {
    id: "next-pizza",
    title: "Next Pizza",
    tagline: { ru: "SSR e-commerce с динамическими страницами", en: "SSR e-commerce with dynamic pages" },
    description: {
      ru: "Интернет-магазин пиццы с серверным рендерингом: каталог товаров с конструктором, динамические страницы карточек товара и корзина с подсчётом стоимости.",
      en: "A server-rendered pizza store: a catalog with a product builder, dynamic product pages and a cart that tallies the total.",
    },
    features: {
      ru: ["Server-side rendering", "Каталог и конструктор товара", "Динамические страницы", "Корзина"],
      en: ["Server-side rendering", "Catalog and product builder", "Dynamic pages", "Cart"],
    },
    stack: ["Next.js", "React"],
    link: "https://next-pizza-silk.vercel.app",
    preview: "/projects/next-pizza.jpg",
    year: 2025,
    category: "React / Next.js",
    gradient: "from-framer-red to-framer-orange",
  },
  {
    id: "proshop",
    title: "ProShop",
    tagline: { ru: "E-commerce с пользовательской и админ-частью", en: "E-commerce with a storefront and an admin panel" },
    description: {
      ru: "Полноценный интернет-магазин: каталог товаров, корзина и оформление заказа на клиентской стороне, плюс административная панель для управления товарами и заказами через REST API.",
      en: "A full online store: product catalog, cart and checkout on the client side, plus an admin panel to manage products and orders over a REST API.",
    },
    features: {
      ru: ["Каталог и корзина", "Оформление заказов", "Управление профилем", "Админ-панель товаров"],
      en: ["Catalog and cart", "Checkout", "Profile management", "Product admin panel"],
    },
    stack: ["React", "Redux", "REST API"],
    link: "https://proshop-three.vercel.app",
    preview: "/projects/proshop.jpg",
    year: 2022,
    category: "React / Next.js",
    gradient: "from-framer-purple to-framer-pink",
  },
  {
    id: "house-marketplace",
    title: "House Marketplace",
    tagline: { ru: "Маркетплейс объявлений о недвижимости", en: "Real estate listings marketplace" },
    description: {
      ru: "Сервис для размещения и управления объявлениями о продаже и аренде недвижимости: регистрация, личный кабинет, создание и редактирование объявлений с загрузкой изображений.",
      en: "A service for posting and managing property listings for sale and rent: sign-up, a personal dashboard, creating and editing listings with image uploads.",
    },
    features: {
      ru: ["Авторизация через Firebase", "Создание и редактирование объявлений", "Загрузка изображений", "Личный кабинет пользователя"],
      en: ["Firebase auth", "Creating and editing listings", "Image uploads", "User dashboard"],
    },
    stack: ["React", "Firebase"],
    link: "https://house-marketplace-kohl-tau.vercel.app",
    preview: "/projects/house-marketplace.jpg",
    year: 2022,
    category: "React / Next.js",
    gradient: "from-framer-pink to-framer-red",
  },
  {
    id: "github-finder",
    title: "GitHub Finder",
    tagline: { ru: "Поиск пользователей GitHub по API", en: "GitHub user search over the API" },
    description: {
      ru: "Небольшое SPA-приложение для поиска пользователей GitHub с выводом карточки профиля, публичных репозиториев и статистики через публичное GitHub API.",
      en: "A small SPA that searches GitHub users and shows their profile card, public repositories and stats via the public GitHub API.",
    },
    features: {
      ru: ["Поиск по логину", "Карточка профиля", "Список репозиториев"],
      en: ["Search by username", "Profile card", "Repository list"],
    },
    stack: ["React"],
    link: "https://github-finder-app-one-woad.vercel.app",
    preview: "/projects/github-finder.jpg",
    year: 2022,
    category: "React / Next.js",
    gradient: "from-framer-orange to-framer-teal",
  },
  {
    id: "feedback-app",
    title: "Feedback App",
    tagline: { ru: "Приложение для сбора и рейтинга отзывов", en: "App for collecting and rating feedback" },
    description: {
      ru: "Интерфейс для добавления, редактирования и удаления отзывов с рейтингом и подсчётом среднего балла — практика работы с формами, контекстом и локальным состоянием React.",
      en: "An interface for adding, editing and deleting reviews with ratings and an average score — practice with forms, context and local React state.",
    },
    features: {
      ru: ["CRUD-операции над отзывами", "Рейтинг и средний балл", "Context API"],
      en: ["CRUD for reviews", "Ratings and average score", "Context API"],
    },
    stack: ["React"],
    link: "https://feedback-fed.netlify.app",
    preview: "/projects/feedback-app.jpg",
    year: 2022,
    category: "React / Next.js",
    gradient: "from-framer-teal to-framer-blue",
  },
  {
    id: "notes",
    title: "Notes",
    tagline: { ru: "SPA для заметок и задач с undo/redo", en: "Notes and to-do SPA with undo/redo" },
    description: {
      ru: "Приложение для управления заметками и Todo с ручной реализацией undo/redo, восстановлением черновиков и версионным сохранением. Дополнено keyboard-навигацией, focus trap, unit-тестами и Docker-сборкой.",
      en: "A notes and to-do app with hand-built undo/redo, draft recovery and versioned persistence. Rounded out with keyboard navigation, a focus trap, unit tests and a Docker build.",
    },
    features: {
      ru: ["Undo/redo и draft recovery", "Versioned persistence", "Keyboard interactions + focus trap", "Unit-тесты (Vitest) и Docker"],
      en: ["Undo/redo and draft recovery", "Versioned persistence", "Keyboard interactions + focus trap", "Unit tests (Vitest) and Docker"],
    },
    stack: ["Nuxt 4", "Vue 3", "Pinia", "TypeScript", "Vitest"],
    link: "https://nebus-eta.vercel.app",
    preview: "/projects/notes.jpg",
    year: 2026,
    category: "Vue / Nuxt",
    gradient: "from-framer-blue to-framer-teal",
  },
  {
    id: "online-bank",
    title: "Online Bank",
    tagline: { ru: "Интерфейс интернет-банка", en: "Online banking interface" },
    description: {
      ru: "Банковский интерфейс с авторизацией и управлением счетами: финансовый дашборд с балансом и графиками, история транзакций и переводы между счетами.",
      en: "A banking interface with auth and account management: a finance dashboard with balance and charts, transaction history and transfers between accounts.",
    },
    features: {
      ru: ["Авторизация", "Финансовый дашборд", "История транзакций"],
      en: ["Auth", "Finance dashboard", "Transaction history"],
    },
    stack: ["Vue 3"],
    link: "https://vue-online-bank-e52b4.web.app",
    preview: "/projects/online-bank.jpg",
    year: 2021,
    category: "Vue / Nuxt",
    gradient: "from-framer-purple to-framer-blue",
  },
  {
    id: "live-chat",
    title: "Live Chat",
    tagline: { ru: "Чат в реальном времени", en: "Real-time chat" },
    description: {
      ru: "Приложение чата с обменом сообщениями в реальном времени, списком онлайн-пользователей и хранением истории переписки на Firebase Realtime Database.",
      en: "A chat app with real-time messaging, a list of online users and message history stored in Firebase Realtime Database.",
    },
    features: {
      ru: ["Real-time обмен сообщениями", "Список онлайн-пользователей", "Firebase Realtime DB"],
      en: ["Real-time messaging", "Online users list", "Firebase Realtime DB"],
    },
    stack: ["Vue 3", "Firebase"],
    link: "https://live-chat-3994e.web.app",
    preview: "/projects/live-chat.jpg",
    year: 2021,
    category: "Vue / Nuxt",
    gradient: "from-framer-pink to-framer-purple",
  },
];

/** Filter values; "all" is labelled per language in the UI dictionary. */
export const projectCategories = ["all", "React / Next.js", "Vue / Nuxt"] as const;
export type ProjectFilter = (typeof projectCategories)[number];

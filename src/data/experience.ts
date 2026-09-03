export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  url?: string;
  points: string[];
  stack: string[];
  gradient: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "flowwow",
    company: "ФЛАУВАУ",
    role: "Senior Frontend Developer",
    period: "Октябрь 2025 — настоящее время",
    duration: "1 год",
    url: "https://flowwow.com",
    points: [
      "Развитие и поддержка frontend-части e-commerce продукта с выходом на международный рынок",
      "Миграция продукта на Nuxt 4: перенос модулей, формирование новой масштабируемой архитектуры",
      "Внедрил регламенты технического взаимодействия (тех.груминги, формализация контрактов API) — устранил задержки в коммуникации Frontend / Backend / QA",
      "Реализовал разделение продукта на русскую и международную версии под специфику разных рынков",
      "Рефакторинг сложных участков legacy-кода, глубокая оптимизация клиентской логики",
    ],
    stack: ["Nuxt 2", "Nuxt 4", "Vue", "TypeScript", "JavaScript"],
    gradient: "from-framer-blue to-framer-teal",
  },
  {
    id: "myflowers",
    company: "Myflowers",
    role: "Senior Frontend Developer",
    period: "Июнь 2023 — Октябрь 2025",
    duration: "2 года 5 месяцев",
    url: "https://myflowers.co.uk",
    points: [
      "Разработал интернет-магазин на Nuxt 3 для рынка Великобритании (myflowers.co.uk)",
      "Участвовал в миграции русской версии проекта на Nuxt 3",
      "Принимал архитектурные решения по frontend-части приложения",
      "Проводил code review и контролировал качество кода в команде",
      "Взаимодействовал с backend-разработчиками, дизайнерами и бизнесом, участвовал в найме",
    ],
    stack: ["Nuxt 3", "Vue 3", "TypeScript", "JavaScript", "REST API"],
    gradient: "from-framer-purple to-framer-pink",
  },
  {
    id: "irg",
    company: "Inventive Retail Group",
    role: "Lead Frontend Developer",
    period: "Апрель 2018 — Июнь 2023",
    duration: "5 лет 3 месяца",
    url: "https://inventive.ru",
    points: [
      "Руководил frontend-разработкой в команде из 4 инженеров в e-commerce проектах компании",
      "Развитие крупных интернет-магазинов: street-beat.ru, re-store.ru, galaxystore.ru",
      "Спроектировал архитектуру frontend-приложений на Vue, руководил миграцией legacy-проектов",
      "Организовал процессы code review, декомпозицию задач и техническое планирование",
      "Найм и менторинг frontend-разработчиков, оптимизация производительности и UX",
      "Дополнительно разработал внутренний корпоративный портал сотрудников на React",
    ],
    stack: ["Vue", "Nuxt", "TypeScript", "JavaScript", "Vuex", "React", "Redux", "Zustand"],
    gradient: "from-framer-pink to-framer-red",
  },
  {
    id: "dst",
    company: "Digital Space Technologies",
    role: "Frontend Developer",
    period: "Январь 2017 — Апрель 2018",
    duration: "1 год 4 месяца",
    url: "https://dstglobal.net",
    points: [
      "Разрабатывал и поддерживал клиентские сайты и промо-проекты",
      "Реализовывал адаптивные и кроссбраузерные интерфейсы",
      "Создавал интерактивные элементы, калькуляторы и конфигураторы",
      "Интегрировал frontend с CMS (WordPress, Bitrix)",
    ],
    stack: ["HTML5", "CSS3", "SCSS", "JavaScript", "WordPress", "Bitrix"],
    gradient: "from-framer-red to-framer-orange",
  },
  {
    id: "ventra",
    company: "Ventra Employment",
    role: "HTML/CSS Developer, Frontend Developer, UX/UI Designer",
    period: "Сентябрь 2016 — Январь 2017",
    duration: "5 месяцев",
    url: "https://www.ventra.ru",
    points: [
      "Работал над внутренним проектом Samsung",
      "Разрабатывал новые страницы и UI-компоненты, улучшал пользовательские сценарии",
      "Проводил рефакторинг структуры и логики страниц",
      "Обеспечивал адаптивность и кроссбраузерную работу интерфейсов",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "SVG-анимации"],
    gradient: "from-framer-orange to-framer-teal",
  },
  {
    id: "mokselle",
    company: "Mokselle",
    role: "HTML/CSS Developer, Frontend Developer",
    period: "Июнь 2015 — Сентябрь 2016",
    duration: "1 год 4 месяца",
    url: "https://mokselle.ru",
    points: [
      "Разрабатывал сайты и landing-pages для коммерческих клиентов",
      "Реализовывал адаптивные интерфейсы и интерактивную логику, анимации",
      "Участвовал в полном цикле разработки: от вёрстки до внедрения логики интерфейса",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "jQuery", "Git"],
    gradient: "from-framer-teal to-framer-blue",
  },
  {
    id: "nc9",
    company: "nc9.ru",
    role: "HTML/CSS Developer",
    period: "Сентябрь 2014 — Июнь 2015",
    duration: "10 месяцев",
    url: "http://www.nc9.ru",
    points: [
      "Верстал коммерческие сайты и лендинги по дизайн-макетам",
      "Обеспечивал кроссбраузерную совместимость (включая IE8+)",
      "Реализовывал адаптивную и блочную вёрстку, подключал JS-логику",
      "Первый коммерческий опыт разработки в реальных клиентских проектах",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "jQuery"],
    gradient: "from-framer-blue to-framer-purple",
  },
];

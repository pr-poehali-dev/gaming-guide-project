import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "catalog" | "guides" | "story" | "secrets" | "forum";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/76ffde4c-5cc6-4362-9f06-8715109f5a84/files/7b78e71e-4b08-428b-8366-f64a4eebf070.jpg";

const GAMES = [
  { id: 1, title: "Cyberpunk 2077", genre: "RPG", platform: "PC", rating: 9.1, img: HERO_IMAGE, desc: "Мегаполис будущего, где каждый выбор имеет цену." },
  { id: 2, title: "Elden Ring", genre: "Action", platform: "PS5", rating: 9.8, img: HERO_IMAGE, desc: "Открытый мир, созданный Миядзаки и Мартином." },
  { id: 3, title: "God of War", genre: "Action", platform: "PS5", rating: 9.5, img: HERO_IMAGE, desc: "Кратос и Атрей против скандинавских богов." },
  { id: 4, title: "The Witcher 3", genre: "RPG", platform: "PC", rating: 9.7, img: HERO_IMAGE, desc: "Геральт ищет приёмную дочь в мире войны." },
  { id: 5, title: "Hollow Knight", genre: "Indie", platform: "PC", rating: 9.3, img: HERO_IMAGE, desc: "Рыцарь-жук исследует подземное королевство." },
  { id: 6, title: "Sekiro", genre: "Action", platform: "Xbox", rating: 9.4, img: HERO_IMAGE, desc: "Синоби мстит за поруганную честь своего господина." },
];

const GENRES = ["Все", "RPG", "Action", "Indie"];
const PLATFORMS = ["Все", "PC", "PS5", "Xbox"];

const GUIDES = [
  {
    id: 1, game: "Elden Ring", title: "Как пройти первого босса", video: true,
    steps: ["Подберите оружие у стартового костра", "Изучите паттерны атак Маргита", "Используйте призыв Жеребца", "Атакуйте после каждой серии ударов"],
  },
  {
    id: 2, game: "Cyberpunk 2077", title: "Лучшее начало игры", video: true,
    steps: ["Выберите класс Nomad для лучшей истории", "Прокачайте хакинг в первую очередь", "Не игнорируйте побочные задания V", "Посетите Джеки как можно раньше"],
  },
  {
    id: 3, game: "God of War", title: "Валькирии: полное руководство", video: false,
    steps: ["Сначала пройдите основной сюжет", "Экипируйтесь набором Иви", "Изучите паузу после красной атаки", "Держитесь ближнего боя"],
  },
];

const CHARACTERS = [
  { name: "Геральт из Ривии", game: "The Witcher 3", role: "Главный герой", desc: "Ведьмак-мутант, охотник на чудовищ. Холодный снаружи, сострадательный внутри." },
  { name: "V", game: "Cyberpunk 2077", role: "Наёмник", desc: "Наёмник Найт-Сити, который борется за выживание с чипом легенды в голове." },
  { name: "Кратос", game: "God of War", role: "Бог войны", desc: "Бывший спартанский воин, убивший греческих богов. Теперь отец и беженец." },
];

const SECRETS = [
  { game: "Elden Ring", title: "Секретный грааль Годрика", desc: "В начале игры можно найти OP-меч, о котором никто не знает", hint: "Идите на север от стартового костра, к скале у обрыва. Там лестница вниз...", difficulty: "Легко" },
  { game: "Cyberpunk 2077", title: "Пистолет Джонни Сильверхенда", desc: "Личный пистолет Сильверхенда с уникальными характеристиками", hint: "После миссии с концертом — не уходите сразу. Осмотрите гримёрку.", difficulty: "Средне" },
  { game: "The Witcher 3", title: "Комната Цири", desc: "Секретная комната с дневником и артефактами Цири", hint: "В Каэр Морхене есть потайная дверь за большим гобеленом...", difficulty: "Сложно" },
  { game: "God of War", title: "Тайный грот Тора", desc: "Скрытое место с мощной экипировкой и лором", hint: "Ищите трещину в скале к западу от Хейма. Нужен конкретный артефакт.", difficulty: "Сложно" },
];

const FORUM_POSTS = [
  { id: 1, author: "DarkBlade99", avatar: "🎮", title: "Elden Ring — лучшие билды 2024", replies: 47, views: 1240, time: "2ч назад", hot: true },
  { id: 2, author: "NeonSerpent", avatar: "🐍", title: "Помогите пройти финального босса в Sekiro", replies: 23, views: 890, time: "5ч назад", hot: false },
  { id: 3, author: "CyberQueen_X", avatar: "🌸", title: "Топ-10 пасхалок в Cyberpunk, которые вы пропустили", replies: 89, views: 3400, time: "1д назад", hot: true },
  { id: 4, author: "VoidWalker", avatar: "⚡", title: "God of War Ragnarok — обсуждение концовки (СПОЙЛЕРЫ)", replies: 156, views: 5600, time: "2д назад", hot: true },
  { id: 5, author: "PixelGhost", avatar: "👻", title: "Hollow Knight 2 — что известно на данный момент", replies: 34, views: 2100, time: "3д назад", hot: false },
];

const DIFFICULTY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Легко: { bg: "rgba(0,255,135,0.1)", text: "var(--neon-green)", border: "rgba(0,255,135,0.3)" },
  Средне: { bg: "rgba(255,165,0,0.1)", text: "#ffa500", border: "rgba(255,165,0,0.3)" },
  Сложно: { bg: "rgba(255,55,95,0.1)", text: "#ff375f", border: "rgba(255,55,95,0.3)" },
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("Все");
  const [platformFilter, setPlatformFilter] = useState("Все");
  const [expandedSecret, setExpandedSecret] = useState<number | null>(null);
  const [expandedGuide, setExpandedGuide] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredGames = GAMES.filter((g) => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genreFilter === "Все" || g.genre === genreFilter;
    const matchPlatform = platformFilter === "Все" || g.platform === platformFilter;
    return matchSearch && matchGenre && matchPlatform;
  });

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "catalog", label: "Каталог", icon: "Grid3x3" },
    { id: "guides", label: "Прохождение", icon: "BookOpen" },
    { id: "story", label: "Сюжет", icon: "Scroll" },
    { id: "secrets", label: "Пасхалки", icon: "Eye" },
    { id: "forum", label: "Форум", icon: "MessageSquare" },
  ];

  return (
    <div className="min-h-screen font-rubik" style={{ backgroundColor: "var(--dark-bg)", color: "#e2e8f0" }}>
      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{
          background: "rgba(13, 15, 20, 0.93)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--dark-border)",
          boxShadow: "0 2px 20px rgba(0, 255, 135, 0.05)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center animate-glow-pulse"
            style={{ background: "var(--neon-green)", color: "#000" }}
          >
            <Icon name="Gamepad2" size={18} />
          </div>
          <span
            className="text-xl font-bold tracking-widest"
            style={{ fontFamily: "Orbitron, sans-serif", color: "var(--neon-green)" }}
          >
            NEXUS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                letterSpacing: "0.05em",
                color: activeSection === item.id ? "var(--neon-green)" : "#94a3b8",
                background: activeSection === item.id ? "rgba(0,255,135,0.08)" : "transparent",
                borderBottom: activeSection === item.id ? "2px solid var(--neon-green)" : "2px solid transparent",
              }}
            >
              <Icon name={item.icon} size={15} />
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: "var(--neon-green)" }}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed top-[57px] left-0 right-0 z-40 py-3 animate-fade-in"
          style={{ background: "rgba(13,15,20,0.97)", borderBottom: "1px solid var(--dark-border)" }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 w-full px-6 py-3 text-sm transition-colors"
              style={{
                color: activeSection === item.id ? "var(--neon-green)" : "#94a3b8",
                fontFamily: "Rajdhani, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}

      <main className="pt-16">
        {/* ═══ HOME ═══ */}
        {activeSection === "home" && (
          <div>
            <div className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO_IMAGE})`, filter: "brightness(0.22) saturate(0.6)" }}
              />
              <div className="absolute inset-0 bg-grid-pattern" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(0,255,135,0.05) 0%, rgba(191,90,242,0.06) 100%)" }}
              />
              <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-6">
                <div
                  className="text-xs tracking-[0.4em] mb-6 px-4 py-2 rounded-full border"
                  style={{ color: "var(--neon-green)", borderColor: "rgba(0,255,135,0.3)", background: "rgba(0,255,135,0.05)", fontFamily: "Rajdhani, sans-serif" }}
                >
                  ⬡ ГЕЙМЕРСКИЙ ПОРТАЛ
                </div>
                <h1
                  className="text-5xl md:text-8xl font-black tracking-tight mb-4 neon-glow-green"
                  style={{ fontFamily: "Orbitron, sans-serif", color: "var(--neon-green)" }}
                >
                  NEXUS
                </h1>
                <p
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ color: "var(--neon-purple)", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.1em" }}
                >
                  GAMES PORTAL
                </p>
                <p className="text-lg md:text-xl max-w-2xl mb-12" style={{ color: "#94a3b8" }}>
                  Каталог игр, гайды, сюжеты, пасхалки и форум —<br />
                  <span style={{ color: "#cbd5e1" }}>всё для настоящих геймеров в одном месте</span>
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setActiveSection("catalog")}
                    className="flex items-center gap-2 px-8 py-4 rounded font-bold text-base transition-all duration-200 hover:scale-105"
                    style={{ background: "var(--neon-green)", color: "#0d0f14", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.1em", boxShadow: "0 0 20px rgba(0,255,135,0.4)" }}
                  >
                    <Icon name="Grid3x3" size={18} />
                    КАТАЛОГ ИГР
                  </button>
                  <button
                    onClick={() => setActiveSection("forum")}
                    className="flex items-center gap-2 px-8 py-4 rounded font-bold text-base transition-all duration-200 hover:scale-105"
                    style={{ background: "transparent", color: "var(--neon-purple)", border: "1px solid var(--neon-purple)", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.1em", boxShadow: "0 0 15px rgba(191,90,242,0.2)" }}
                  >
                    <Icon name="MessageSquare" size={18} />
                    ФОРУМ
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-8 mt-20 max-w-lg">
                  {[{ val: "240+", label: "Игр" }, { val: "1.2K", label: "Гайдов" }, { val: "45K", label: "Геймеров" }].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-3xl font-black neon-glow-green" style={{ fontFamily: "Orbitron, sans-serif", color: "var(--neon-green)" }}>
                        {s.val}
                      </div>
                      <div className="text-sm mt-1" style={{ color: "#64748b", fontFamily: "Rajdhani, sans-serif" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "var(--neon-green)", opacity: 0.5 }}>
                <Icon name="ChevronDown" size={24} />
              </div>
            </div>

            {/* Featured games */}
            <div className="px-6 py-16 max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 rounded" style={{ background: "var(--neon-green)" }} />
                <h2 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "Orbitron, sans-serif", color: "#e2e8f0" }}>
                  ГОРЯЧИЕ ИГРЫ
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {GAMES.slice(0, 3).map((game) => (
                  <div
                    key={game.id}
                    className="rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] group"
                    style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
                    onClick={() => setActiveSection("catalog")}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={game.img} alt={game.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(19,22,30,0.9), transparent)" }} />
                      <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold" style={{ background: "rgba(0,255,135,0.15)", color: "var(--neon-green)", border: "1px solid rgba(0,255,135,0.3)", fontFamily: "Rajdhani" }}>{game.genre}</div>
                      <div className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold" style={{ background: "rgba(13,15,20,0.8)", color: "#94a3b8", fontFamily: "Rajdhani" }}>{game.platform}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-base" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e2e8f0" }}>{game.title}</h3>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={12} style={{ color: "var(--neon-green)" }} />
                          <span className="text-sm font-bold" style={{ color: "var(--neon-green)", fontFamily: "Orbitron" }}>{game.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: "#64748b" }}>{game.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick nav */}
            <div className="px-6 pb-16 max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: "guides" as Section, icon: "BookOpen", label: "Прохождение", color: "var(--neon-green)" },
                  { id: "story" as Section, icon: "Scroll", label: "Сюжет", color: "var(--neon-purple)" },
                  { id: "secrets" as Section, icon: "Eye", label: "Пасхалки", color: "#ff6b6b" },
                  { id: "forum" as Section, icon: "MessageSquare", label: "Форум", color: "#0a84ff" },
                ].map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() => setActiveSection(tile.id)}
                    className="p-6 rounded-lg flex flex-col items-center gap-3 transition-all duration-200 hover:scale-105"
                    style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: `${tile.color}18`, border: `1px solid ${tile.color}40` }}
                    >
                      <Icon name={tile.icon} size={22} style={{ color: tile.color }} />
                    </div>
                    <span className="font-semibold text-sm tracking-wide" style={{ fontFamily: "Rajdhani, sans-serif", color: "#cbd5e1" }}>
                      {tile.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CATALOG ═══ */}
        {activeSection === "catalog" && (
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded" style={{ background: "var(--neon-green)" }} />
              <h2 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "Orbitron, sans-serif", color: "#e2e8f0" }}>КАТАЛОГ ИГР</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#64748b" }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск по названию..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", color: "#e2e8f0" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--neon-green)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--dark-border)")}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenreFilter(g)}
                    className="px-4 py-2 rounded text-sm font-semibold transition-all"
                    style={{
                      background: genreFilter === g ? "var(--neon-green)" : "var(--dark-card)",
                      color: genreFilter === g ? "#0d0f14" : "#94a3b8",
                      border: `1px solid ${genreFilter === g ? "var(--neon-green)" : "var(--dark-border)"}`,
                      fontFamily: "Rajdhani",
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatformFilter(p)}
                    className="px-4 py-2 rounded text-sm font-semibold transition-all"
                    style={{
                      background: platformFilter === p ? "var(--neon-purple)" : "var(--dark-card)",
                      color: platformFilter === p ? "#fff" : "#94a3b8",
                      border: `1px solid ${platformFilter === p ? "var(--neon-purple)" : "var(--dark-border)"}`,
                      fontFamily: "Rajdhani",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 text-sm" style={{ color: "#64748b", fontFamily: "Rajdhani" }}>
              Найдено: <span style={{ color: "var(--neon-green)" }}>{filteredGames.length}</span> игр
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={game.img} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(19,22,30,1) 0%, rgba(19,22,30,0.4) 50%, transparent 100%)" }} />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <span className="px-2 py-1 rounded text-xs font-bold" style={{ background: "rgba(0,255,135,0.15)", color: "var(--neon-green)", border: "1px solid rgba(0,255,135,0.3)", fontFamily: "Rajdhani" }}>{game.genre}</span>
                      <span className="px-2 py-1 rounded text-xs font-bold" style={{ background: "rgba(191,90,242,0.15)", color: "var(--neon-purple)", border: "1px solid rgba(191,90,242,0.3)", fontFamily: "Rajdhani" }}>{game.platform}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-base leading-tight" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e2e8f0", letterSpacing: "0.03em" }}>{game.title}</h3>
                      <div className="flex items-center gap-1 px-2 py-1 rounded ml-3 flex-shrink-0" style={{ background: "rgba(0,255,135,0.1)" }}>
                        <Icon name="Star" size={11} style={{ color: "var(--neon-green)" }} />
                        <span className="text-xs font-bold" style={{ color: "var(--neon-green)", fontFamily: "Orbitron" }}>{game.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{game.desc}</p>
                    <button
                      className="mt-4 w-full py-2 rounded text-sm font-semibold transition-all hover:opacity-90"
                      style={{ background: "rgba(0,255,135,0.08)", color: "var(--neon-green)", border: "1px solid rgba(0,255,135,0.2)", fontFamily: "Rajdhani", letterSpacing: "0.08em" }}
                    >
                      ПОДРОБНЕЕ
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-20" style={{ color: "#64748b" }}>
                <Icon name="Search" size={40} className="mx-auto mb-4 opacity-30" />
                <p style={{ fontFamily: "Rajdhani" }}>Игры не найдены. Попробуйте изменить фильтры.</p>
              </div>
            )}
          </div>
        )}

        {/* ═══ GUIDES ═══ */}
        {activeSection === "guides" && (
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded" style={{ background: "var(--neon-green)" }} />
              <h2 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "Orbitron, sans-serif", color: "#e2e8f0" }}>ПРОХОЖДЕНИЕ</h2>
            </div>
            <div className="space-y-4">
              {GUIDES.map((guide, i) => (
                <div key={guide.id} className="rounded-lg overflow-hidden" style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}>
                  <button
                    className="w-full p-5 flex items-center justify-between text-left transition-colors hover:bg-white/[0.02]"
                    onClick={() => setExpandedGuide(expandedGuide === i ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.2)" }}>
                        <Icon name="BookOpen" size={18} style={{ color: "var(--neon-green)" }} />
                      </div>
                      <div>
                        <div className="text-xs mb-1" style={{ color: "var(--neon-purple)", fontFamily: "Rajdhani", letterSpacing: "0.08em" }}>{guide.game}</div>
                        <div className="font-bold" style={{ fontFamily: "Rajdhani, sans-serif", color: "#e2e8f0", letterSpacing: "0.03em" }}>{guide.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {guide.video && (
                        <span className="px-2 py-1 rounded text-xs font-bold flex items-center gap-1" style={{ background: "rgba(255,55,95,0.1)", color: "#ff375f", border: "1px solid rgba(255,55,95,0.3)", fontFamily: "Rajdhani" }}>
                          <Icon name="Play" size={10} />ВИДЕО
                        </span>
                      )}
                      <Icon name={expandedGuide === i ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: "#64748b" }} />
                    </div>
                  </button>
                  {expandedGuide === i && (
                    <div className="px-5 pb-5 animate-fade-in">
                      <div className="h-px mb-5" style={{ background: "var(--dark-border)" }} />
                      <div className="space-y-3">
                        {guide.steps.map((step, si) => (
                          <div key={si} className="flex items-start gap-4">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: "var(--neon-green)", color: "#0d0f14", fontFamily: "Orbitron" }}>
                              {si + 1}
                            </div>
                            <p className="pt-1 text-sm leading-relaxed" style={{ color: "#cbd5e1" }}>{step}</p>
                          </div>
                        ))}
                      </div>
                      {guide.video && (
                        <div className="mt-5 rounded-lg p-4 flex items-center gap-3 cursor-pointer transition-all hover:opacity-90" style={{ background: "rgba(255,55,95,0.06)", border: "1px solid rgba(255,55,95,0.2)" }}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#ff375f" }}>
                            <Icon name="Play" size={16} style={{ color: "#fff" }} />
                          </div>
                          <div>
                            <div className="text-sm font-bold" style={{ color: "#ff375f", fontFamily: "Rajdhani" }}>Смотреть видео-гайд</div>
                            <div className="text-xs" style={{ color: "#64748b" }}>Пошаговый разбор с комментариями</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ STORY ═══ */}
        {activeSection === "story" && (
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded" style={{ background: "var(--neon-purple)" }} />
              <h2 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "Orbitron, sans-serif", color: "#e2e8f0" }}>СЮЖЕТ И ПЕРСОНАЖИ</h2>
            </div>

            <div className="rounded-lg p-6 mb-8 relative overflow-hidden" style={{ background: "var(--dark-card)", border: "1px solid rgba(191,90,242,0.2)" }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2" style={{ background: "var(--neon-purple)", filter: "blur(40px)" }} />
              <div className="relative">
                <div className="text-xs mb-3 tracking-widest" style={{ color: "var(--neon-purple)", fontFamily: "Rajdhani" }}>◈ ВСЕЛЕННАЯ ИГР</div>
                <p className="text-base leading-relaxed" style={{ color: "#94a3b8" }}>
                  Каждая великая игра — это история. Здесь собраны лучшие сюжеты, незабываемые персонажи и поворотные моменты, которые навсегда остаются в памяти.
                </p>
              </div>
            </div>

            <h3 className="text-base font-bold mb-5 tracking-wide" style={{ fontFamily: "Orbitron, sans-serif", color: "#e2e8f0" }}>КУЛЬТОВЫЕ ПЕРСОНАЖИ</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {CHARACTERS.map((char) => (
                <div key={char.name} className="rounded-lg p-5" style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(191,90,242,0.1)", border: "1px solid rgba(191,90,242,0.3)" }}>
                    <Icon name="User" size={22} style={{ color: "var(--neon-purple)" }} />
                  </div>
                  <div className="text-xs mb-1 tracking-wider" style={{ color: "var(--neon-purple)", fontFamily: "Rajdhani" }}>{char.game}</div>
                  <h4 className="font-bold text-base mb-1" style={{ fontFamily: "Rajdhani", color: "#e2e8f0" }}>{char.name}</h4>
                  <div className="text-xs mb-3 px-2 py-0.5 rounded inline-block" style={{ background: "rgba(0,255,135,0.08)", color: "var(--neon-green)", fontFamily: "Rajdhani" }}>{char.role}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{char.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-base font-bold mb-5 tracking-wide" style={{ fontFamily: "Orbitron, sans-serif", color: "#e2e8f0" }}>КЛЮЧЕВЫЕ СОБЫТИЯ</h3>
            <div className="relative pl-6">
              <div className="absolute left-2 top-2 bottom-2 w-px" style={{ background: "var(--dark-border)" }} />
              {[
                { game: "The Witcher 3", event: "Начало охоты", desc: "Геральт получает первый след Дикой охоты" },
                { game: "God of War", event: "Путь Кратоса", desc: "Отец и сын начинают своё путешествие к горе" },
                { game: "Elden Ring", event: "Падение Эрдтри", desc: "Безродный пробуждается в разрушенном Межгорье" },
              ].map((ev, i) => (
                <div key={i} className="relative mb-6 pl-6">
                  <div className="absolute left-[-17px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ background: "var(--dark-bg)", borderColor: "var(--neon-purple)" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "var(--neon-purple)" }} />
                  </div>
                  <div className="text-xs mb-1" style={{ color: "var(--neon-purple)", fontFamily: "Rajdhani", letterSpacing: "0.08em" }}>{ev.game}</div>
                  <div className="font-bold text-sm mb-1" style={{ fontFamily: "Rajdhani", color: "#e2e8f0" }}>{ev.event}</div>
                  <p className="text-sm" style={{ color: "#64748b" }}>{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ SECRETS ═══ */}
        {activeSection === "secrets" && (
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 rounded" style={{ background: "#ff6b6b" }} />
              <h2 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "Orbitron, sans-serif", color: "#e2e8f0" }}>ПАСХАЛКИ И СЕКРЕТЫ</h2>
            </div>
            <p className="mb-8 text-sm ml-4" style={{ color: "#64748b" }}>Нажмите на карточку, чтобы раскрыть подсказку</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SECRETS.map((secret, i) => {
                const dc = DIFFICULTY_COLORS[secret.difficulty] || DIFFICULTY_COLORS["Легко"];
                return (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
                    style={{
                      background: "var(--dark-card)",
                      border: `1px solid ${expandedSecret === i ? "rgba(255,107,107,0.4)" : "var(--dark-border)"}`,
                      boxShadow: expandedSecret === i ? "0 0 20px rgba(255,107,107,0.08)" : "none",
                    }}
                    onClick={() => setExpandedSecret(expandedSecret === i ? null : i)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-lg" style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)" }}>🥚</div>
                          <div>
                            <div className="text-xs mb-1 tracking-wider" style={{ color: "#ff6b6b", fontFamily: "Rajdhani" }}>{secret.game}</div>
                            <h3 className="font-bold text-sm" style={{ fontFamily: "Rajdhani", color: "#e2e8f0" }}>{secret.title}</h3>
                            <p className="text-xs mt-1" style={{ color: "#64748b" }}>{secret.desc}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: dc.bg, color: dc.text, border: `1px solid ${dc.border}`, fontFamily: "Rajdhani" }}>{secret.difficulty}</span>
                          <Icon name={expandedSecret === i ? "EyeOff" : "Eye"} size={16} style={{ color: "#64748b" }} />
                        </div>
                      </div>
                      {expandedSecret === i && (
                        <div className="mt-4 p-4 rounded-lg animate-fade-in" style={{ background: "rgba(255,107,107,0.06)", border: "1px solid rgba(255,107,107,0.15)" }}>
                          <div className="text-xs mb-2 flex items-center gap-1" style={{ color: "#ff6b6b", fontFamily: "Rajdhani" }}>
                            <Icon name="Lightbulb" size={12} />ПОДСКАЗКА
                          </div>
                          <p className="text-sm italic leading-relaxed" style={{ color: "#94a3b8" }}>{secret.hint}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ FORUM ═══ */}
        {activeSection === "forum" && (
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 rounded" style={{ background: "#0a84ff" }} />
                <h2 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "Orbitron, sans-serif", color: "#e2e8f0" }}>ФОРУМ</h2>
              </div>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm transition-all hover:opacity-90"
                style={{ background: "var(--neon-green)", color: "#0d0f14", fontFamily: "Rajdhani", letterSpacing: "0.08em" }}
              >
                <Icon name="Plus" size={16} />
                НОВАЯ ТЕМА
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 p-5 rounded-lg" style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}>
              {[
                { val: "1,247", label: "Тем", icon: "MessageSquare", color: "#0a84ff" },
                { val: "45,891", label: "Сообщений", icon: "MessagesSquare", color: "var(--neon-green)" },
                { val: "12,430", label: "Участников", icon: "Users", color: "var(--neon-purple)" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <Icon name={stat.icon} size={20} className="mx-auto mb-2" style={{ color: stat.color }} />
                  <div className="font-bold text-lg" style={{ fontFamily: "Orbitron", color: stat.color }}>{stat.val}</div>
                  <div className="text-xs" style={{ color: "#64748b", fontFamily: "Rajdhani" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {FORUM_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg p-4 cursor-pointer transition-all duration-200 group"
                  style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl" style={{ background: "var(--dark-border)" }}>
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm" style={{ fontFamily: "Rajdhani", color: "#e2e8f0", letterSpacing: "0.02em" }}>{post.title}</h3>
                          {post.hot && (
                            <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: "rgba(255,107,107,0.1)", color: "#ff6b6b", border: "1px solid rgba(255,107,107,0.3)", fontFamily: "Rajdhani" }}>
                              🔥 HOT
                            </span>
                          )}
                        </div>
                        <span className="text-xs flex-shrink-0" style={{ color: "#475569", fontFamily: "Rajdhani" }}>{post.time}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs" style={{ color: "#475569", fontFamily: "Rajdhani" }}>{post.author}</span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-xs" style={{ color: "#475569" }}>
                            <Icon name="MessageCircle" size={12} />{post.replies}
                          </span>
                          <span className="flex items-center gap-1 text-xs" style={{ color: "#475569" }}>
                            <Icon name="Eye" size={12} />{post.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 py-8 px-6 text-center" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <div className="text-lg font-bold tracking-widest mb-2" style={{ fontFamily: "Orbitron, sans-serif", color: "var(--neon-green)" }}>
          NEXUS GAMES
        </div>
        <p className="text-xs" style={{ color: "#475569", fontFamily: "Rajdhani" }}>© 2024 Геймерский Портал · Все права защищены</p>
      </footer>
    </div>
  );
}
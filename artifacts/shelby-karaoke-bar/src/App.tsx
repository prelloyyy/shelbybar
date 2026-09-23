import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  Mic2,
  Music2,
  Phone,
  Plus,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import smokeImage from '@assets/image_1790195298619.png';
import barImage from '@assets/image_1790195370683.png';
import friendsImage from '@assets/image_1790195584156.png';
import afterMidnightImage from '@assets/image_1790195712617.png';
import hallVideo from '@assets/video_2026-09-23_23-30-41_1790195522389.mp4';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();
const phoneHref = 'tel:+79191660331';

type MenuItem = {
  name: string;
  details?: string;
  price: string;
};

type MenuCategory = {
  number: string;
  name: string;
  items: MenuItem[];
};

const kitchenMenu: MenuCategory[] = [
  {
    number: '01',
    name: 'Фирменное блюдо',
    items: [{ name: 'Стейк «Шелби»', details: 'стейк из свиной корейки с грибным соусом и картофельными дольками', price: '550 ₽' }],
  },
  {
    number: '02',
    name: 'Фирменные бургеры',
    items: [
      { name: 'Фирменный бургер с говядиной', details: '300 г', price: '690 ₽' },
      { name: 'Фирменный бургер с бараниной', details: '300 г', price: '690 ₽' },
    ],
  },
  {
    number: '03',
    name: 'Бургеры',
    items: [
      { name: 'Бургер с говяжьей котлетой', details: '300 г', price: '500 ₽' },
      { name: 'Бургер с куриной котлетой', details: '300 г', price: '500 ₽' },
    ],
  },
  {
    number: '04',
    name: 'Шаурма',
    items: [
      { name: 'Шаурма с курицей', details: '300 г', price: '390 ₽' },
      { name: 'Шаурма со свининой', details: '320 г', price: '410 ₽' },
    ],
  },
  {
    number: '05',
    name: 'Салаты',
    items: [
      { name: 'Цезарь с курицей / креветками', price: '400 ₽' },
      { name: 'Греческий', price: '400 ₽' },
    ],
  },
  {
    number: '06',
    name: 'Горячие закуски',
    items: [
      { name: 'Жареная брынза', details: '200 г', price: '350 ₽' },
      { name: 'Жареный сулугуни', details: '200 г', price: '350 ₽' },
      { name: 'Картошка фри', details: '180 г', price: '200 ₽' },
      { name: 'Крылья Баффало', details: '250 г', price: '400 ₽' },
      { name: 'Чесночные гренки', details: '200 г', price: '300 ₽' },
      { name: 'Кольца кальмара', details: '150 г', price: '350 ₽' },
      { name: 'Луковые кольца', details: '110 г', price: '250 ₽' },
      { name: 'Креветки закусочные (вареные / жареные)', details: '200 г', price: '550 ₽' },
      { name: 'Долма в виноградных листьях', details: '200 г', price: '500 ₽' },
      { name: 'Наггетсы', details: '200 г', price: '300 ₽' },
      { name: 'Начос в ассортименте', price: '300 ₽' },
      { name: 'Дополнительный соус на выбор', price: '100 ₽' },
    ],
  },
  {
    number: '07',
    name: 'Холодные закуски',
    items: [
      { name: 'Мясное ассорти', details: '250 г', price: '700 ₽' },
      { name: 'Сырное ассорти', details: '350 г', price: '600 ₽' },
      { name: 'Ассорти солений', details: '430 г', price: '450 ₽' },
      { name: 'Овощное ассорти', details: '370 г', price: '500 ₽' },
      { name: 'Селёдочка с луком', details: '170 г', price: '400 ₽' },
      { name: 'Фруктовое ассорти', details: '280 г', price: '600 ₽' },
      { name: 'Ореховое ассорти', price: '600 ₽' },
    ],
  },
];

const barMenu: MenuCategory[] = [
  {
    number: '01',
    name: 'Фирменные напитки',
    items: [
      { name: '«Красная вдова»', details: '130 мл', price: '550 ₽' },
      { name: '«Голливудская ночь»', details: '130 мл', price: '550 ₽' },
      { name: '«Шоу-стоппер»', details: '130 мл', price: '550 ₽' },
      { name: '«Peaky Fizz»', details: '200 мл', price: '550 ₽' },
      { name: 'Шот «Пуля Шелби» (Shelby’s Bullet)', details: '50 мл', price: '500 ₽' },
      { name: 'Шот «Поцелуй Полли» (Polly’s Kiss)', details: '50 мл', price: '500 ₽' },
      { name: 'Шот «Гангстер» (Gangster’s Shot)', details: '50 мл', price: '500 ₽' },
    ],
  },
  {
    number: '02',
    name: 'Классические напитки',
    items: [
      { name: 'Джин-тоник', details: '200 мл', price: '400 ₽' },
      { name: 'Виски-хайбол', details: '200 мл', price: '400 ₽' },
      { name: 'Коньяк-сода', details: '200 мл', price: '400 ₽' },
      { name: 'Виски-кола', details: '200 мл', price: '400 ₽' },
    ],
  },
  {
    number: '03',
    name: 'Настойки и авторское вино',
    items: [
      { name: 'Настойка домашняя (вишня / клюква / смородина)', details: '50 мл', price: '300 ₽' },
      { name: 'Настойка малиновая', details: '50 мл', price: '300 ₽' },
      { name: 'Фирменная настойка «Шелби»', details: '50 мл', price: '350 ₽' },
      { name: 'Сет настоек', price: '900 ₽' },
      { name: 'Авторское ягодное вино', details: '150 мл', price: '400 ₽' },
    ],
  },
  {
    number: '04',
    name: 'Виски',
    items: [
      { name: 'Jameson', details: '50 мл', price: '400 ₽' },
      { name: 'Jack Daniel’s', details: '50 мл', price: '400 ₽' },
      { name: 'Ballantine’s', details: '50 мл', price: '400 ₽' },
    ],
  },
  {
    number: '05',
    name: 'Водка',
    items: [
      { name: 'Царская', details: '50 мл', price: '200 ₽' },
      { name: 'Царская', details: '500 мл', price: '2000 ₽' },
      { name: 'Онегин', details: '50 мл', price: '750 ₽' },
      { name: 'Онегин', details: '500 мл', price: '2250 ₽' },
    ],
  },
  {
    number: '06',
    name: 'Пиво',
    items: [
      { name: 'Krone Blanche Biere', details: '450 мл', price: '280 ₽' },
      { name: 'Spaten', details: '450 мл', price: '280 ₽' },
      { name: 'Corona Extra', details: '355 мл', price: '300 ₽' },
      { name: 'Крушовице', details: '450 мл', price: '280 ₽' },
    ],
  },
  {
    number: '07',
    name: 'Безалкогольные лимонады',
    items: [
      { name: 'Клубничный лимонад', details: '200 мл', price: '350 ₽' },
      { name: 'Малиновый мохито', details: '200 мл', price: '350 ₽' },
      { name: 'Манго-лайм', details: '200 мл', price: '350 ₽' },
      { name: 'Чёрная смородина с мятой', details: '200 мл', price: '350 ₽' },
      { name: 'Гранатовый спритц', details: '200 мл', price: '350 ₽' },
    ],
  },
  {
    number: '08',
    name: 'Лимонады в графинах',
    items: [
      { name: 'Малиновый мохито', details: '1 л', price: '700 ₽' },
      { name: 'Клубничный бриз', details: '1 л', price: '700 ₽' },
      { name: 'Манго-голубика', details: '1 л', price: '700 ₽' },
    ],
  },
  {
    number: '09',
    name: 'Чай',
    items: [
      { name: 'Чай (эрл грей / сенча)', details: '600 мл', price: '400 ₽' },
      { name: 'Чай авторский с ягодным пюре и мёдом', details: '600 мл', price: '500 ₽' },
    ],
  },
  {
    number: '10',
    name: 'Сок',
    items: [
      { name: 'Сок в ассортименте', details: '200 мл', price: '90 ₽' },
      { name: 'Сок в графине в ассортименте', details: '700 мл', price: '300 ₽' },
    ],
  },
];

const navItems = [
  { href: '#about', label: 'О нас' },
  { href: '#menu', label: 'Меню' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#contacts', label: 'Контакты' },
];

type GalleryTile = {
  code: string;
  label: string;
  media?: {
    kind: 'image' | 'video';
    src: string;
    alt: string;
  };
};

const galleryTiles: GalleryTile[] = [
  {
    code: '01 / room',
    label: 'Зал',
    media: {
      kind: 'video',
      src: hallVideo,
      alt: 'Видео из зала караоке-бара Шелби',
    },
  },
  {
    code: '02 / bar',
    label: 'Бар',
    media: {
      kind: 'image',
      src: barImage,
      alt: 'Авторский коктейль в баре Шелби',
    },
  },
  {
    code: '03 / sound',
    label: 'Громче',
  },
  {
    code: '04 / night',
    label: 'После полуночи',
    media: {
      kind: 'image',
      src: afterMidnightImage,
      alt: 'Гости танцуют после полуночи в Шелби',
    },
  },
  {
    code: '05 / friends',
    label: 'Свои люди',
    media: {
      kind: 'image',
      src: friendsImage,
      alt: 'Гости отдыхают в атмосфере Шелби',
    },
  },
  {
    code: '06 / smoke',
    label: 'Дым',
    media: {
      kind: 'image',
      src: smokeImage,
      alt: 'Дым и свет в караоке-зале Шелби',
    },
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header({ menuOpen, onToggle }: { menuOpen: boolean; onToggle: () => void }) {
  const closeOnNavigate = () => {
    if (menuOpen) onToggle();
  };
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand-mark" href="#top" aria-label="Шелби, на главную">
          <strong>ШЕЛБИ</strong>
          <span>Караоке-бар</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-book" href={phoneHref}>
          <Phone aria-hidden="true" /> Забронировать стол
        </a>
        <button className="menu-toggle" type="button" onClick={onToggle} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}>
          {menuOpen ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
        </button>
      </div>
      {menuOpen && (
        <div id="mobile-navigation" className="mobile-panel">
          <nav aria-label="Мобильная навигация">
            {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeOnNavigate}>{item.label}</a>)}
          </nav>
          <a className="mobile-phone" href={phoneHref}><Phone size={16} aria-hidden="true" /> +7 (919) 166-03-31</a>
        </div>
      )}
    </header>
  );
}

function MenuCategoryList({ categories, isBar }: { categories: MenuCategory[]; isBar: boolean }) {
  return (
    <div className="menu-grid" role="list">
      {categories.map((category, index) => (
        <details className="menu-category" key={category.name} open={index === 0}>
          <summary>
            <span className="category-title">
              <span className="category-number">{category.number}</span>
              <span className="category-name">{category.name}{isBar && index === 0 ? ' 18+' : ''}</span>
            </span>
            <Plus className="category-plus" size={20} aria-hidden="true" />
          </summary>
          <div className="menu-items">
            {category.items.map((item) => (
              <div className="menu-item" role="listitem" key={`${category.name}-${item.name}-${item.details ?? ''}`}>
                <div className="menu-item-name">
                  {item.name}
                  {item.details && <span className="menu-item-desc">{item.details}</span>}
                </div>
                <span className="menu-item-price">{item.price}</span>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTab, setMenuTab] = useState<'kitchen' | 'bar'>('kitchen');
  useReveal();

  useEffect(() => {
    document.title = 'Шелби — караоке-бар в Липецке';
    const description = 'Караоке-бар Шелби в Липецке — караоке, авторский бар, кухня, банкеты';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  return (
    <div id="top">
      <Header menuOpen={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-scratch" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-kicker reveal"><span /> Липецк / 50 лет НЛМК</div>
            <h1 id="hero-title" className="reveal reveal-delay-1">ШЕЛБИ</h1>
            <p className="hero-subtitle reveal reveal-delay-2">Караоке-бар в стиле лихих времён</p>
            <div className="hero-meta reveal reveal-delay-2">
              <div><strong>Где</strong>ул. 50 лет НЛМК, 2А</div>
              <div><strong>Когда</strong>Ежедневно до 02:00</div>
            </div>
            <div className="hero-actions reveal reveal-delay-3">
              <a className="button-primary" href={phoneHref}><Phone size={16} aria-hidden="true" /> Забронировать стол</a>
              <a className="button-ghost" href="#menu">Открыть меню <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-stamp" aria-hidden="true">Sing<br />loud</div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="shell">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">01 / О баре</span>
                <h2 id="about-title">Вход<br />только своим</h2>
              </div>
              <p>Место, где ночь не заканчивается на последнем припеве. За тяжёлой дверью — свой ритм, свой бар и столы, за которыми начинаются лучшие истории.</p>
            </div>
            <div className="about-layout">
              <div className="about-copy reveal reveal-delay-1">
                <p className="lead">Караоке-бар с атмосферой закрытого гангстерского клуба.</p>
                <p>Авторские коктейли и настойки, кухня, кальяны и музыка, которую хочется петь громче. Собирайте компанию для вечеринки, дня рождения или корпоратива — в «Шелби» всегда найдётся повод поднять бокал.</p>
                <div className="perks-grid" aria-label="Особенности бара">
                  <div className="perk"><Mic2 size={21} aria-hidden="true" /><h3>Караоке</h3><p>Пойте так, будто зал принадлежит вам.</p></div>
                  <div className="perk"><Sparkles size={21} aria-hidden="true" /><h3>Кальянная карта</h3><p>Дымный финал длинного вечера.</p></div>
                  <div className="perk"><Music2 size={21} aria-hidden="true" /><h3>Авторский бар</h3><p>Напитки с характером и своей историей.</p></div>
                  <div className="perk"><CalendarDays size={21} aria-hidden="true" /><h3>Банкеты</h3><p>Дни рождения и корпоративы без сценария.</p></div>
                </div>
              </div>
              <div className="about-card reveal reveal-delay-2" aria-label="Атмосфера бара">
                <div className="about-card-label">ночь<br />на нашей<br />стороне</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section menu-section" id="menu" aria-labelledby="menu-title">
          <div className="shell">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">02 / Меню</span>
                <h2 id="menu-title">Сначала<br />закажите ещё</h2>
              </div>
              <p>Плотная кухня для долгих ночей и бар, который не просит объяснять свой выбор. Листайте, выбирайте, звоните — остальное уже за нами.</p>
            </div>
            <div className="menu-intro reveal reveal-delay-1">
              <div className="menu-tabs" role="tablist" aria-label="Раздел меню">
                <button className="menu-tab" type="button" role="tab" aria-selected={menuTab === 'kitchen'} onClick={() => setMenuTab('kitchen')}>Кухня</button>
                <button className="menu-tab" type="button" role="tab" aria-selected={menuTab === 'bar'} onClick={() => setMenuTab('bar')}>Бар</button>
              </div>
              {menuTab === 'bar' && <div className="age-note"><strong>18+</strong> Ответственный выбор</div>}
            </div>
            <div role="tabpanel" aria-label={menuTab === 'kitchen' ? 'Меню кухни' : 'Барная карта'}>
              <MenuCategoryList categories={menuTab === 'kitchen' ? kitchenMenu : barMenu} isBar={menuTab === 'bar'} />
            </div>
          </div>
        </section>

        <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
          <div className="shell">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">03 / Галерея</span>
                <h2 id="gallery-title">Здесь<br />громче</h2>
              </div>
              <p>Тёплый свет, следы ночи и тот самый момент перед первым припевом. Смотрите, как это бывает у нас.</p>
            </div>
            <div className="gallery-grid reveal reveal-delay-1" aria-label="Галерея атмосферы Шелби">
              {galleryTiles.map((tile) => (
                <div className={`gallery-tile${tile.media ? ' has-media' : ''}`} key={tile.label}>
                  {tile.media?.kind === 'video' ? (
                    <video className="gallery-media" src={tile.media.src} autoPlay muted loop playsInline preload="metadata" aria-label={tile.media.alt} />
                  ) : tile.media ? (
                    <img className="gallery-media" src={tile.media.src} alt={tile.media.alt} loading="lazy" />
                  ) : null}
                  <small>{tile.code}</small>
                  <span>{tile.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section booking-section" id="contacts" aria-labelledby="booking-title">
          <div className="shell booking-layout">
            <div className="booking-copy reveal">
              <span className="eyebrow">04 / Контакты</span>
              <h2 id="booking-title">Забронировать<br />стол</h2>
              <p>Лучшие столы не ждут случайных гостей. Позвоните — мы подберём место для вашей компании и ответим на вопросы.</p>
              <div className="contact-list">
                <a className="contact-item" href="https://yandex.ru/maps/?ll=39.594675%2C52.593719&z=16&text=%D0%B3.%20%D0%9B%D0%B8%D0%BF%D0%B5%D1%86%D0%BA%2C%20%D1%83%D0%BB.%2050%20%D0%BB%D0%B5%D1%82%20%D0%9D%D0%9B%D0%9C%D0%9A%2C%202%D0%90" target="_blank" rel="noreferrer"><MapPin size={19} aria-hidden="true" /><span><strong>г. Липецк, ул. 50 лет НЛМК, 2А</strong></span><ArrowUpRight size={15} aria-hidden="true" /></a>
                <a className="contact-item" href={phoneHref}><Phone size={19} aria-hidden="true" /><span><strong>+7 (919) 166-03-31</strong></span><ArrowUpRight size={15} aria-hidden="true" /></a>
                <div className="contact-item"><Clock3 size={19} aria-hidden="true" /><span>Режим работы: <strong>ежедневно до 02:00</strong></span></div>
              </div>
              <a className="button-primary" href={phoneHref}><Phone size={16} aria-hidden="true" /> Позвонить и забронировать</a>
              <div className="socials" aria-label="Социальные сети">
                <a href="https://t.me/s/shelbybarlip" target="_blank" rel="noreferrer" aria-label="Telegram"><Send size={17} aria-hidden="true" /></a>
                <a href="https://wa.me/79191660331" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Phone size={17} aria-hidden="true" /></a>
                <a href="https://vk.ru/shelbi48" target="_blank" rel="noreferrer" aria-label="VK"><span aria-hidden="true" style={{ fontWeight: 800, fontSize: '0.7rem' }}>VK</span></a>
              </div>
            </div>
            <div className="map-frame reveal reveal-delay-1">
              <iframe title="Карта расположения караоке-бара Шелби" src="https://yandex.ru/map-widget/v1/?ll=39.594675%2C52.593719&z=16&pt=39.594675%2C52.593719%2Cpm2rdm" loading="lazy" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="footer-copy"><strong>ШЕЛБИ</strong>Караоке-бар в Липецке · © 2024</div>
          <div className="footer-links">
            <a href="https://t.me/s/shelbybarlip" target="_blank" rel="noreferrer">Telegram</a>
            <a href="https://wa.me/79191660331" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://vk.ru/shelbi48" target="_blank" rel="noreferrer">VK</a>
          </div>
          <div className="footer-age">18+</div>
        </div>
      </footer>

      <a className="floating-call" href={phoneHref} aria-label="Позвонить и забронировать стол"><Phone aria-hidden="true" /></a>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
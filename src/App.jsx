import { useEffect, useMemo, useState } from "react";
import { Search, Plus, Bell, ChevronDown, SlidersHorizontal, BookOpen, BookCheck, Bookmark, TrendingUp, Sparkles, ArrowUpRight, X } from "lucide-react";
import Sidebar from "./components/layout/Sidebar.jsx";
import BookCard from "./components/books/BookCard.jsx";
import AddBookModal from "./components/common/AddBookModal.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import { starterBooks } from "./data/books.js";
import { getProfile } from "./services/profileService";
import { hasUnreadNotifications } from "./services/notificationService"; 


const STORAGE_KEY = "bookshelf-books-v1";

function readSavedBooks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterBooks;
  } catch {
    return starterBooks;
  }
}

export default function App() {
  const [books, setBooks] = useState(readSavedBooks);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [toast, setToast] = useState("");
  const [profile, setProfile] = useState(getProfile);
  const [unreadNotifications, setUnreadNotifications] = useState(hasUnreadNotifications());


 useEffect(() => {
    // profil guncelleme dinleyicisi
    const handleProfileUpdate = () => setProfile(getProfile());
    window.addEventListener("profileUpdated", handleProfileUpdate);
    
    // bildirim guncelleme dinleyicisi
    const handleNotifUpdate = () => setUnreadNotifications(hasUnreadNotifications());
    window.addEventListener("notificationsUpdated", handleNotifUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
      window.removeEventListener("notificationsUpdated", handleNotifUpdate);
    };
  }, []);


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const categories = useMemo(() => [...new Set(books.map((book) => book.category))].sort(), [books]);
  const stats = useMemo(() => ({
    total: books.length,
    read: books.filter((book) => book.status === "read").length,
    reading: books.filter((book) => book.status === "reading").length,
    toRead: books.filter((book) => book.status === "to-read").length
  }), [books]);

  const visibleBooks = useMemo(() => books.filter((book) => {
    const search = query.trim().toLocaleLowerCase("tr-TR");
    const matchesQuery = !search || `${book.title} ${book.author} ${book.category}`.toLocaleLowerCase("tr-TR").includes(search);
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    const matchesPage = activePage !== "reading" || book.status !== "read";
    return matchesQuery && matchesStatus && matchesCategory && matchesPage;
  }), [books, query, statusFilter, categoryFilter, activePage]);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function addBook(book) {
    setBooks((current) => [book, ...current]);
    notify("Kitap kütüphanene eklendi.");
  }

  function changeStatus(id, status) {
    setBooks((current) => current.map((book) => book.id === id ? { ...book, status } : book));
    notify("Okuma durumu güncellendi.");
  }

  function deleteBook(id) {
    const book = books.find((item) => item.id === id);
    if (!book || !window.confirm(`“${book.title}” kitabını kütüphanenden silmek istiyor musun?`)) return;
    setBooks((current) => current.filter((item) => item.id !== id));
    notify("Kitap kütüphanenden silindi.");
  }

  const pageTitle = activePage === "reading" ? "Okuma listem" : activePage === "library" ? "Kitaplığım" : activePage === "stats" ? "İstatistikler" : activePage === "profile" ? "Profil Yönetimi" : activePage === "notifications" ? "Bildirimler ve Öneriler" : "Kitaplığın seni bekliyor.";
  const isDashboard = activePage === "dashboard";

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Kütüphanem</span>
            <span className="breadcrumb-slash">/</span>
            <strong>{isDashboard ? "Genel Bakış" : pageTitle}</strong>
          </div>
          <div className="topbar-actions">
            <span className="today-label">Kişisel okuma alanın</span>
            <button 
              className="icon-button notification-button" 
              aria-label="Bildirimler" 
              onClick={() => setActivePage("notifications")}
            >
              <Bell size={18} /> 
              {unreadNotifications && <i />} {/* okunmamis bildirim varsa noktayi gosterir */}
            </button>
            {/* sag ustteki dinamik ve tiklanabilir profil ikonu*/}
            <div 
              className="top-avatar" 
              onClick={() => setActivePage("profile")} 
              style={{ 
                backgroundColor: profile.avatarBg || '#6366f1', 
                color: '#fff', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 'bold',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                fontSize: '14px'
              }}
            >
              {profile.avatar}
            </div>
          </div>
        </header>

        <div className="page-content">
          {/* profil sayfası gosterimi */}
          {activePage === "profile" && <ProfilePage />}

          {/* bildirimler sayfasi gosterimi */}
          {activePage === "notifications" && <NotificationsPage />}

          {/* diger sayfalar (dashboard, library, reading, stats) */}
          {activePage !== "profile" && activePage !== "notifications" && (
            <>
              <section className="welcome-row">
                <div>
                  <div className="eyebrow"><Sparkles size={13} /> OKUMA YOLCULUĞUN</div>
                  <h1>{isDashboard ? <>Her kitap, <em>yeni bir dünya.</em></> : pageTitle}</h1>
                  <p className="welcome-copy">{isDashboard ? "Koleksiyonuna göz at, kaldığın yerden devam et." : activePage === "stats" ? "Okuma alışkanlığının küçük bir özeti." : "Kitaplarını keşfet, düzenle ve okuma hedeflerini takip et."}</p>
                </div>
                <button className="button button-primary add-book-button" onClick={() => setIsModalOpen(true)}><Plus size={17} /> Yeni kitap ekle</button>
              </section>

              {isDashboard && <section className="stats-grid" aria-label="Kütüphane istatistikleri">
                <StatCard icon={<BookOpen size={18} />} label="Toplam kitap" value={stats.total} helper="Koleksiyonundaki kitaplar" tone="lavender" />
                <StatCard icon={<BookCheck size={18} />} label="Okunan kitap" value={stats.read} helper={`${stats.total ? Math.round((stats.read / stats.total) * 100) : 0}% tamamlandı`} tone="mint" />
                <StatCard icon={<Bookmark size={18} />} label="Okunacak" value={stats.toRead} helper="Sıradaki keşiflerin" tone="peach" />
                <StatCard icon={<TrendingUp size={18} />} label="Şu an okuyorsun" value={stats.reading} helper="Devam eden yolculuk" tone="blue" />
              </section>}

              {isDashboard && <section className="feature-banner">
                <div className="banner-copy">
                  <span className="banner-tag">KÜÇÜK BİR HATIRLATMA</span>
                  <h2>Günde 10 sayfa,<br />yılda binlerce kelime.</h2>
                  <p>Okuma alışkanlığı, küçük adımlarla büyür. Bugün kendine biraz zaman ayır.</p>
                  <button className="banner-link" onClick={() => { setActivePage("reading"); setStatusFilter("all"); }}>Okuma listeme git <ArrowUpRight size={15} /></button>
                </div>
                <div className="banner-art" aria-hidden="true">
                  <div className="sun-disc" /><div className="plant plant-one" /><div className="plant plant-two" />
                  <div className="stack-book stack-book-one" /><div className="stack-book stack-book-two" /><div className="stack-book stack-book-three" />
                  <div className="open-book"><span /><span /></div>
                </div>
              </section>}

              <section className="library-section">
                <div className="section-heading">
                  <div>
                    <h2>{activePage === "reading" ? "Sıradaki kitapların" : activePage === "stats" ? "Koleksiyon özeti" : "Kitap koleksiyonun"}</h2>
                    <p>{visibleBooks.length} kitap gösteriliyor</p>
                  </div>
                  <button className="text-button" onClick={() => { setActivePage("library"); setStatusFilter("all"); setCategoryFilter("all"); }}>Tüm kitaplar <ArrowUpRight size={15} /></button>
                </div>

                {activePage === "stats" && <div className="stats-detail">
                  <div className="progress-heading"><span>Okuma ilerlemesi</span><strong>{stats.total ? Math.round((stats.read / stats.total) * 100) : 0}%</strong></div>
                  <div className="progress-track"><div className="progress-fill" style={{ width: `${stats.total ? (stats.read / stats.total) * 100 : 0}%` }} /></div>
                  <p>{stats.read} / {stats.total} kitap tamamlandı. Her yeni sayfa seni hedefine biraz daha yaklaştırır.</p>
                </div>}

                <div className="filter-bar">
                  <div className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Kitap veya yazar ara..." aria-label="Kitap veya yazar ara" />{query && <button aria-label="Aramayı temizle" onClick={() => setQuery("")}><X size={14} /></button>}</div>
                  <div className="filter-select-wrap"><SlidersHorizontal size={15} /><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Okuma durumuna göre filtrele"><option value="all">Tüm durumlar</option><option value="read">Okundu</option><option value="reading">Okunuyor</option><option value="to-read">Okunacak</option></select><ChevronDown className="select-chevron" size={14} /></div>
                  <div className="filter-select-wrap category-filter"><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Kategoriye göre filtrele"><option value="all">Tüm kategoriler</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select><ChevronDown className="select-chevron" size={14} /></div>
                </div>

                {visibleBooks.length ? <div className="book-grid">{visibleBooks.map((book) => <BookCard key={book.id} book={book} onStatusChange={changeStatus} onDelete={deleteBook} />)}</div> : <div className="empty-state"><div className="empty-icon"><BookOpen size={25} /></div><h3>Burada henüz kitap yok</h3><p>Aramanı veya filtrelerini değiştirebilir ya da koleksiyonuna yeni bir kitap ekleyebilirsin.</p><button className="button button-primary" onClick={() => { setQuery(""); setStatusFilter("all"); setCategoryFilter("all"); if (!books.length) setIsModalOpen(true); }}>Kitapları göster</button></div>}
              </section>
            </>
          )}

          <footer className="footer"><span>© 2026 BookShelf</span><span>Sevdiğin hikâyelere yer aç.</span></footer>
        </div>
      </main>
      {isModalOpen && <AddBookModal onClose={() => setIsModalOpen(false)} onAdd={addBook} />}
      {toast && <div className="toast" role="status"><span className="toast-check">✓</span>{toast}</div>}
    </div>
  );
}

function StatCard({ icon, label, value, helper, tone }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-helper">{helper}</div></article>;
}
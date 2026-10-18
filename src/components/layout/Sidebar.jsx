import { useState, useEffect } from "react";
import { BookOpen, LayoutDashboard, Bookmark, ChartNoAxesColumn, Settings, LibraryBig, User, Bell, Book } from "lucide-react"; // <-- Buraya Bell eklendi
import { quotes } from "../../data/quotes";
import { getProfile } from "../../services/profileService"; // Profil servisinden veri çekmek için import edildi


export default function Sidebar({ activePage, onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [userProfile, setUserProfile] = useState(getProfile);

  // Profil güncellendiğinde Sidebar'ın anında yenilenmesini sağlayan dinleyici
  useEffect(() => {
    const handleUpdate = () => {
      setUserProfile(getProfile()); // Veriyi yeniden oku ve state'i güncelle
    };

    window.addEventListener("profileUpdated", handleUpdate);
    return () => window.removeEventListener("profileUpdated", handleUpdate);
  }, []);

  // Dinamik alıntı akışı için zamanlayıcı
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Yumuşak geçiş için fade out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFade(true); // Fade in
      }, 300);
    }, 7000); // 7 saniyede bir değiştir

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentIndex];

  const items = [
    { label: "Genel Bakış", icon: LayoutDashboard, page: "dashboard" },
    { label: "Kitaplığım", icon: BookOpen, page: "library" },
    { label: "Okuma Listem", icon: Bookmark, page: "reading" },
    { label: "İstatistikler", icon: ChartNoAxesColumn, page: "stats" },
    { label: "Bildirimler", icon: Bell, page: "notifications" },
    { label: "Profilim", icon: User, page: "profile" }
  ];

  return (
    <aside className="sidebar">
      <div 
      className="brand" 
      onClick={() => onNavigate("dashboard")} // Ana sayfaya yönlendirir
      style={{ cursor: 'pointer' }}
      >
        <div className="brand-mark"><LibraryBig size={21} strokeWidth={2.1} /></div>
        <span>Book<span className="brand-accent">Shelf</span></span>
      </div>
      <div className="nav-caption">KÜTÜPHANE</div>
      <nav className="side-nav" aria-label="Ana menü">
        {items.map(({ label, icon: Icon, page }) => (
          <button
            key={page}
            className={`nav-item ${activePage === page ? "active" : ""}`}
            onClick={() => onNavigate(page)}
            type="button"
          >
            <Icon size={18} />
            <span>{label}</span>
            {page === "library" && <span className="nav-count">06</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        {/* Dinamik Alıntı Kutusu */}
        <div 
          className="sidebar-note" 
          style={{ 
            height: '180px',                  /* Kutunun yüksekliği sabitlendi */
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',               /* Taşmalar engellendi */
            transition: 'opacity 0.3s ease-in-out', 
            opacity: fade ? 1 : 0 
          }}
        >
          <div className="note-icon">< Book size={18} /></div>
          <p className="note-title">Kendine bir sayfa ayır </p>
          <p className="note-copy" style={{ fontStyle: 'italic', margin: '4px 0' }}>
            "{currentQuote.quote}"
          </p>
          <p style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>
            <strong>{currentQuote.book}</strong> — {currentQuote.author}
          </p>
        </div>

        <button className="nav-item settings-item" type="button" onClick={() => alert("Ayarlar bölümü sonraki geliştirme adımında eklenecek.")}>
          <Settings size={18} /><span>Ayarlar</span>
        </button>
        
      </div>
    </aside>
  );
}
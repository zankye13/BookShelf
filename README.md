# BookShelf - Kişisel Kitaplık ve Sosyal Takip Platformu

**BookShelf**, kullanıcıların kişisel kitap koleksiyonlarını kategorize etmelerine, okuma durumlarını takip etmelerine, kitaplar hakkında özel okuma notları saklamalarına ve diğer kullanıcılarla kitap önerileri paylaşmalarına olanak tanıyan modern bir web uygulamasıdır. 

Proje, React bileşen mimarisi ve olay güdümlü (event-driven) durum yönetimi prensipleri doğrultusunda geliştirilmiştir.

---

## Öne Çıkan Özellikler

* **CRUD ve Koleksiyon Yönetimi:** Kitap ekleme, silme, okuma durumlarını (`Okunacak`, `Okunuyor`, `Okundu`) güncelleme ve katalog üzerinde anlık arama/kategorik filtreleme.
* **Detay & Okuma Notları Modalı:** Kitap kartlarındaki detay seçeneği aracılığıyla erişilen, arka kapak yazısını ve kişiye özel favori alıntı/notları içeren dinamik portal yapısı.
* **Sosyal Öneri Sistemi:** Kullanıcılar arasında kitap tavsiyesi gönderilmesini sağlayan modal arayüzü ve entegre iş mantığı.
* **Anlık Bildirim & Senkronizasyon:** Custom Event mekanizması sayesinde sayfa yenilenmesine ihtiyaç duymaksızın bildirim durumunun ve okunmamış rozetlerinin tüm bileşenlerde eşzamanlı güncellenmesi.
* **Veri Kalıcılığı:** Tüm koleksiyon, bildirim ve profil verilerinin `localStorage` üzerinde yerel olarak saklanması.

---

## Mimari ve Proje Yapısı

Uygulama, sorumlulukların ayrılması (*Separation of Concerns*) prensibine sadık kalınarak katmanlı bir mimariyle kurgulanmıştır. İş mantığı (*Business Logic*) UI bileşenlerinden soyutlanarak servis katmanına aktarılmıştır.

```text
bookshelf/
├── node_modules/
├── src/
│   ├── components/
│   │   ├── books/
│   │   │   ├── BookCard.jsx            # Kitap kartı bileşeni
│   │   │   ├── BookDetailModal.jsx     # Arka kapak ve notlar portalı
│   │   │   └── QuoteCard.jsx           # Günün alıntısı kart bileşeni
│   │   ├── common/
│   │   │   └── AddBookModal.jsx        # Ortak kitap ekleme modalı
│   │   ├── layout/
│   │   │   └── Sidebar.jsx             # Ana navigasyon paneli
│   │   ├── notifications/
│   │   │   ├── NotificationPanel.jsx   # Bildirim paneli bileşeni
│   │   │   └── RecommendBookModal.jsx  # Arkadaşa kitap önerme modalı
│   │   └── profile/
│   │       └── ProfileForm.jsx         # Profil düzenleme formu bileşeni
│   ├── context/                        # Context API yapılandırması
│   ├── data/
│   │   ├── books.js                    # Başlangıç kitap verileri
│   │   └── quotes.js                   # Motivasyonel alıntı verileri
│   ├── pages/
│   │   ├── NotificationsPage.jsx       # Bildirimler sayfası
│   │   └── ProfilePage.jsx             # Profil yönetimi sayfası
│   ├── services/
│   │   ├── notificationService.js      # Bildirim ve öneri servis katmanı
│   │   └── profileService.js           # Profil verileri servis katmanı
│   ├── App.jsx                         # Ana durum (State) ve olay dinleyici yönetimi
│   ├── main.jsx                        # React uygulama giriş noktası
│   └── styles.css                      # Global CSS ve stil tanımları
├── package.json
└── README.md
```

### Teknik Mimari Notları
1. **React Portals (`createPortal`):** Modalların (`BookDetailModal` vb.) HTML ağacında doğrudan `document.body` altında işlenmesi sağlanarak, parent bileşenlerdeki `overflow`, `position: relative` veya `hover` dönüşümlerinden kaynaklanabilecek görsel hatalar (glitch) engellenmiştir.
2. **Event-Driven State Sync:** Servis katmanında gerçekleşen veri güncellemeleri sonrası `window.dispatchEvent` ile özel olaylar (`notificationsUpdated`, `profileUpdated`) fırlatılır. `App.jsx` üzerindeki dinleyiciler bu olayları yakalayarak ilgili state'leri reaktif biçimde günceller.

---

## Kullanılan Teknolojiler

* **Core:** React.js (v18+)
* **Build Tool:** Vite / Create React App
* **Icons:** Lucide React
* **Styling:** Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
* **Storage:** Web Storage API (`localStorage`)

---

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayabilirsiniz.

### Önkoşullar
* Node.js (v16.0 veya üzeri)
* npm veya yarn

### Adımlar

1. Projeyi klonlayın veya dizine geçin:
   ```bash
   cd bookshelf
   ```

2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirici sunucusunu başlatın:
   ```bash
   npm run dev
   ```
   *(Create React App altyapısı kullanıyorsanız: `npm start`)*

4. Tarayıcınızda açın:
   `http://localhost:PORT` (veya terminalde belirtilen yerel port).

---

## Lisans

Bu proje eğitim ve kişisel gelişim amacıyla geliştirilmiştir. Tüm hakları saklıdır.
const NOTIFS_KEY = "bookshelf-notifications-v1";
const FRIENDS_KEY = "bookshelf-friends-v1";

export function getFriends() {
  try {
    const saved = localStorage.getItem(FRIENDS_KEY);
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Ahmet Yılmaz", avatar: "A" },
      { id: 2, name: "Zeynep Demir", avatar: "Z" },
      { id: 3, name: "Can Kaya", avatar: "C" }
    ];
  } catch {
    return [];
  }
}

export function getNotifications() {
  try {
    const saved = localStorage.getItem(NOTIFS_KEY);
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Zeynep Demir sana 'Küçük Prens' kitabını önerdi.", read: false, date: "Bugün" }
    ];
  } catch {
    return [];
  }
}

// okunmamıs bildirim var mi kontrolu
export function hasUnreadNotifications() {
  const notifications = getNotifications();
  return notifications.some(n => !n.read);
}

// tek bir bildirimi okundu olarak isaretleme (Sayfa yenilenmeden anında turuncu noktayı siler)
export function markNotificationAsRead(id) {
  try {
    const notifications = getNotifications();
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    
    // uygulamaya bildirimlerin guncellendigini haber verir
    window.dispatchEvent(new Event("notificationsUpdated"));
    return updated;
  } catch {
    return getNotifications();
  }
}

// tum bildirimleri okundu olarak isaretleme
export function markAllNotificationsAsRead() {
  try {
    const notifications = getNotifications();
    const updated = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    
    // uygulamaya bildirimlerin güncellendigini haber verir
    window.dispatchEvent(new Event("notificationsUpdated"));
    return updated;
  } catch {
    return getNotifications();
  }
}

// kitap onerisi gonderme
export function sendBookRecommendation(friendName, bookTitle) {
  try {
    const notifications = getNotifications();
    const newNotif = {
      id: Date.now(),
      text: `${friendName} kişisine "${bookTitle}" kitabını önerdin!`,
      read: false,
      date: "Az önce"
    };
    const updated = [newNotif, ...notifications];
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    
    // yeni bildirim gelince bildirim simgesinde turuncu noktanın hemen belirmesini saglar
    window.dispatchEvent(new Event("notificationsUpdated"));
    return true;
  } catch {
    return false;
  }
}